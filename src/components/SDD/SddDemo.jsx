import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay, FiRotateCcw, FiArrowLeft, FiCheck, FiUser, FiFastForward, FiChevronRight,
} from "react-icons/fi";
import { RUNS, LOG_STYLES } from "./sddRuns";
import { SddLogo } from "../icons/AiLogos";

/**
 * A replay of a real SDD run.
 *
 * State machine:
 *   idle → running → (gate → running)* → done
 *
 * A single timer advances one log line at a time. When a stage's lines are
 * exhausted the stage completes; if it carries a human gate we stop and wait
 * for the visitor to approve, which is the whole point of the demonstration.
 */

const SPEEDS = [
  { label: "1×", factor: 1 },
  { label: "4×", factor: 0.25 },
  { label: "Instant", factor: 0 },
];

const BG = "#0a0a0f";
const PANEL = "#0f0f1a";

function useRunPlayer(run) {
  const [status, setStatus] = useState("idle"); // idle | running | gate | done
  const [stageIdx, setStageIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const timer = useRef(null);

  const reset = useCallback(() => {
    clearTimeout(timer.current);
    setStatus("idle");
    setStageIdx(0);
    setLineIdx(0);
  }, []);

  // Any change of run starts from scratch.
  useEffect(() => reset(), [run.id, reset]);
  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (status !== "running") return;
    const stage = run.stages[stageIdx];
    if (!stage) return;

    if (lineIdx < stage.logs.length) {
      const delay = stage.logs[lineIdx].ms * speed;
      timer.current = setTimeout(() => setLineIdx((i) => i + 1), delay);
      return () => clearTimeout(timer.current);
    }

    // Stage finished.
    if (stage.gate) { setStatus("gate"); return; }
    if (stageIdx === run.stages.length - 1) { setStatus("done"); return; }
    setStageIdx((i) => i + 1);
    setLineIdx(0);
  }, [status, stageIdx, lineIdx, speed, run]);

  const start = () => { if (status === "idle") setStatus("running"); };

  const approve = () => {
    if (status !== "gate") return;
    if (stageIdx === run.stages.length - 1) { setStatus("done"); return; }
    setStageIdx((i) => i + 1);
    setLineIdx(0);
    setStatus("running");
  };

  return { status, stageIdx, lineIdx, speed, setSpeed, start, approve, reset };
}

/** Stage status for the rail: done | active | gate | pending */
function stageState(i, stageIdx, status) {
  if (status === "idle") return "pending";
  if (status === "done") return "done";
  if (i < stageIdx) return "done";
  if (i > stageIdx) return "pending";
  return status === "gate" ? "gate" : "active";
}

function StageRail({ run, stageIdx, status }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {run.stages.map((s, i) => {
        const st = stageState(i, stageIdx, status);
        const color =
          st === "done" ? "#4ade80" :
          st === "gate" ? "#fbbf24" :
          st === "active" ? "#818cf8" : "#334155";

        return (
          <div
            key={s.id}
            style={{
              display: "flex", alignItems: "center", gap: 11,
              padding: "9px 12px",
              borderRadius: 10,
              background: st === "active" || st === "gate" ? "rgba(255,255,255,0.04)" : "transparent",
              border: `1px solid ${st === "active" || st === "gate" ? `${color}30` : "transparent"}`,
              transition: "all 0.25s ease",
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
              border: `1.5px solid ${color}`,
              background: st === "done" ? color : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: BG, fontSize: 10,
            }}>
              {st === "done" && <FiCheck size={11} strokeWidth={3} />}
              {st === "active" && (
                <motion.div
                  animate={{ scale: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: color }}
                />
              )}
              {st === "gate" && <FiUser size={9} color={color} />}
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600,
                color: st === "pending" ? "#475569" : "#e2e8f0",
              }}>
                {s.name}
              </div>
              <div style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 10,
                color: st === "pending" ? "#334155" : "#64748b",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {s.agent}
              </div>
            </div>

            {s.gate && (
              <span title="Human gate" style={{ color: st === "pending" ? "#334155" : "#fbbf24", display: "flex" }}>
                <FiUser size={11} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LogLine({ line }) {
  const s = LOG_STYLES[line.t] || LOG_STYLES.out;
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      style={{ display: "flex", gap: 10, padding: "2.5px 0" }}
    >
      <span style={{ color: s.color, width: 10, flexShrink: 0, fontWeight: 700 }}>{s.mark}</span>
      <span style={{ color: s.color, wordBreak: "break-word" }}>{line.text}</span>
    </motion.div>
  );
}

function DiffBody({ body }) {
  return body.split("\n").map((l, i) => {
    let color = "#94a3b8";
    if (l.startsWith("+++") || l.startsWith("---")) color = "#c084fc";
    else if (l.startsWith("@@")) color = "#38bdf8";
    else if (l.startsWith("+")) color = "#4ade80";
    else if (l.startsWith("-")) color = "#f87171";
    return <div key={i} style={{ color, whiteSpace: "pre-wrap" }}>{l || " "}</div>;
  });
}

function ArtifactPanel({ run, unlocked, active, setActive }) {
  const art = run.artifacts[active];
  if (!unlocked.length) {
    return (
      <div style={{
        padding: "40px 24px", textAlign: "center",
        fontFamily: "Inter, sans-serif", fontSize: 13, color: "#475569",
      }}>
        Artifacts appear here as each agent produces them.
      </div>
    );
  }
  return (
    <>
      <div style={{
        display: "flex", gap: 4, padding: "8px 10px", flexWrap: "wrap",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {unlocked.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            style={{
              padding: "5px 12px", borderRadius: 7, cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: 11.5, fontWeight: 600,
              border: "1px solid " + (active === k ? "rgba(99,102,241,0.4)" : "transparent"),
              background: active === k ? "rgba(99,102,241,0.14)" : "transparent",
              color: active === k ? "#a5b4fc" : "#64748b",
            }}
          >
            {run.artifacts[k].label}
          </button>
        ))}
      </div>
      <div style={{
        padding: "16px 18px", overflow: "auto", flex: 1,
        fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, lineHeight: 1.65,
      }}>
        {art?.lang === "diff"
          ? <DiffBody body={art.body} />
          : <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "#94a3b8" }}>{art?.body}</pre>}
      </div>
    </>
  );
}

function SddDemo() {
  const [runId, setRunId] = useState(RUNS[0].id);
  const run = useMemo(() => RUNS.find((r) => r.id === runId), [runId]);
  const { status, stageIdx, lineIdx, speed, setSpeed, start, approve, reset } = useRunPlayer(run);
  const [activeArtifact, setActiveArtifact] = useState(null);
  const logRef = useRef(null);

  const stage = run.stages[stageIdx];

  // Artifacts unlock as their stage completes.
  const unlocked = useMemo(() => {
    const out = [];
    run.stages.forEach((s, i) => {
      const finished = status === "done" || i < stageIdx || (i === stageIdx && lineIdx >= s.logs.length);
      if (finished && s.artifact) out.push(s.artifact);
    });
    return out;
  }, [run, stageIdx, lineIdx, status]);

  // Follow the newest artifact unless the visitor has picked one.
  useEffect(() => {
    if (unlocked.length) setActiveArtifact(unlocked[unlocked.length - 1]);
  }, [unlocked.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setActiveArtifact(null); }, [runId]);

  // Keep the log pinned to the newest line.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lineIdx, stageIdx]);

  const visibleLines = stage ? stage.logs.slice(0, lineIdx) : [];

  return (
    // Logs, diffs and code are English artifacts — keep this view LTR even
    // when the rest of the site is in Hebrew.
    <div dir="ltr" style={{ minHeight: "100vh", background: BG, padding: "28px 20px 60px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, flexWrap: "wrap", marginBottom: 22,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11,
              background: "rgba(167,139,250,0.14)", border: "1px solid rgba(167,139,250,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa",
            }}>
              <SddLogo size={21} />
            </div>
            <div>
              <h1 style={{
                fontFamily: "Inter, sans-serif", fontSize: 19, fontWeight: 700,
                color: "#f8fafc", letterSpacing: "-0.02em",
              }}>
                SDD — live run
              </h1>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#64748b" }}>
                A ticket goes in. A reviewed pull request comes out.
              </div>
            </div>
          </div>

          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 9,
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
              color: "#94a3b8", textDecoration: "none",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <FiArrowLeft size={14} /> Portfolio
          </Link>
        </div>

        {/* ── Ticket picker ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          {RUNS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRunId(r.id)}
              style={{
                flex: "1 1 300px", textAlign: "start", cursor: "pointer",
                padding: "13px 16px", borderRadius: 13,
                background: r.id === runId ? "rgba(99,102,241,0.09)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${r.id === runId ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)"}`,
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, fontWeight: 700,
                  color: "#818cf8", padding: "2px 7px", borderRadius: 5, background: "rgba(99,102,241,0.14)",
                }}>
                  {r.key}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10.5, color: "#475569" }}>
                  {r.type}
                </span>
              </div>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 600,
                color: "#e2e8f0", marginBottom: 2,
              }}>
                {r.title}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#64748b" }}>
                {r.summary}
              </div>
            </button>
          ))}
        </div>

        {/* ── Controls ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
          padding: "11px 14px", marginBottom: 14,
          borderRadius: 12, background: PANEL, border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <motion.button
            whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={start}
            disabled={status !== "idle"}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 9, border: "none",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
              cursor: status === "idle" ? "pointer" : "default",
              color: status === "idle" ? "#fff" : "#475569",
              background: status === "idle"
                ? "linear-gradient(135deg, #6366f1, #818cf8)"
                : "rgba(255,255,255,0.04)",
              boxShadow: status === "idle" ? "0 0 18px rgba(99,102,241,0.3)" : "none",
            }}
          >
            <FiPlay size={13} /> Run the ticket
          </motion.button>

          <button
            onClick={reset}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 14px", borderRadius: 9, cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
              color: "#94a3b8", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <FiRotateCcw size={13} /> Reset
          </button>

          <div style={{ display: "flex", gap: 3, marginLeft: "auto", alignItems: "center" }}>
            <FiFastForward size={12} color="#475569" style={{ marginRight: 5 }} />
            {SPEEDS.map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.factor)}
                style={{
                  padding: "5px 11px", borderRadius: 7, cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: 11.5, fontWeight: 600,
                  border: "1px solid " + (speed === s.factor ? "rgba(99,102,241,0.4)" : "transparent"),
                  background: speed === s.factor ? "rgba(99,102,241,0.14)" : "transparent",
                  color: speed === s.factor ? "#a5b4fc" : "#64748b",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="sdd-grid">
          {/* Left: pipeline */}
          <div style={{
            background: PANEL, borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)", padding: "14px 12px",
            alignSelf: "start",
          }}>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700,
              color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0 6px 10px",
            }}>
              Pipeline
            </div>
            <StageRail run={run} stageIdx={stageIdx} status={status} />
            <div style={{
              marginTop: 12, paddingTop: 11, borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 7, padding: "11px 6px 0",
            }}>
              <FiUser size={11} color="#fbbf24" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#64748b" }}>
                = human gate ({run.stages.filter((s) => s.gate).length} in this run)
              </span>
            </div>
          </div>

          {/* Centre: log */}
          <div style={{
            background: PANEL, borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", minHeight: 460, overflow: "hidden",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444", "#f59e0b", "#4ade80"].map((c) => (
                  <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.55 }} />
                ))}
              </div>
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#64748b", marginLeft: 6,
              }}>
                {status === "idle" ? `sdd run ${run.key}` : `${stage?.agent} · ${stage?.name}`}
              </span>
            </div>

            <div ref={logRef} style={{
              flex: 1, overflow: "auto", padding: "14px 16px",
              fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, lineHeight: 1.6,
            }}>
              {status === "idle" ? (
                <div style={{ color: "#475569" }}>
                  <div style={{ color: "#818cf8" }}>$ sdd run {run.key}</div>
                  <div style={{ marginTop: 12, lineHeight: 1.8 }}>
                    {run.body}
                  </div>
                  <div style={{ marginTop: 12, color: "#334155" }}>
                    repo: {run.repo}
                  </div>
                  <div style={{ marginTop: 18, color: "#64748b" }}>
                    Press <span style={{ color: "#a5b4fc" }}>Run the ticket</span> to start.
                  </div>
                </div>
              ) : (
                <>
                  {run.stages.slice(0, stageIdx).map((s) => (
                    <div key={s.id} style={{ opacity: 0.34, marginBottom: 10 }}>
                      <div style={{ color: "#818cf8" }}>▸ {s.name} · {s.agent}</div>
                      {s.logs.map((l, i) => <LogLine key={i} line={l} />)}
                    </div>
                  ))}
                  <div>
                    <div style={{ color: "#818cf8", marginBottom: 3 }}>▸ {stage?.name} · {stage?.agent}</div>
                    {visibleLines.map((l, i) => <LogLine key={i} line={l} />)}
                    {status === "running" && (
                      <motion.span
                        animate={{ opacity: [1, 0.15, 1] }}
                        transition={{ repeat: Infinity, duration: 0.9 }}
                        style={{
                          display: "inline-block", width: 7, height: 13,
                          background: "#818cf8", marginLeft: 20, verticalAlign: "middle",
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Gate / done bar */}
            <AnimatePresence>
              {status === "gate" && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    borderTop: "1px solid rgba(251,191,36,0.3)",
                    background: "rgba(251,191,36,0.07)", padding: "13px 16px",
                    display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 7,
                      fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
                      color: "#fbbf24", marginBottom: 3,
                    }}>
                      <FiUser size={13} /> {stage?.gateLabel}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#94a3b8", lineHeight: 1.5 }}>
                      {stage?.gateNote}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={approve}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "9px 18px", borderRadius: 9, border: "none", cursor: "pointer",
                      fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
                      color: "#1a1205", background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    }}
                  >
                    Approve <FiChevronRight size={14} />
                  </motion.button>
                </motion.div>
              )}

              {status === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    borderTop: "1px solid rgba(74,222,128,0.3)",
                    background: "rgba(74,222,128,0.07)", padding: "13px 16px",
                    display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                  }}
                >
                  <FiCheck size={15} color="#4ade80" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#94a3b8" }}>
                    Run complete — <strong style={{ color: "#e2e8f0" }}>
                      {run.stages.length} agents, {run.stages.filter((s) => s.gate).length} human gates
                    </strong>. Every artifact on the right is reviewable.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: artifacts */}
          <div style={{
            background: PANEL, borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", minHeight: 460, maxHeight: 640, overflow: "hidden",
          }}>
            <ArtifactPanel
              run={run}
              unlocked={unlocked}
              active={activeArtifact || unlocked[unlocked.length - 1]}
              setActive={setActiveArtifact}
            />
          </div>
        </div>

        <p style={{
          marginTop: 16, fontFamily: "Inter, sans-serif", fontSize: 11.5,
          color: "#475569", lineHeight: 1.6, maxWidth: 760,
        }}>
          These are recorded runs, replayed — so the demo is deterministic and works offline.
          The specs, plans, diffs and review findings are the real output shape of the framework:
          in particular, the blocking defect the review agent raises in each run is one a
          single-process test suite cannot catch.
        </p>
      </div>

      <style>{`
        .sdd-grid {
          display: grid;
          grid-template-columns: 232px minmax(0, 1fr) minmax(0, 0.92fr);
          gap: 14px;
          align-items: stretch;
        }
        @media (max-width: 1080px) {
          .sdd-grid { grid-template-columns: 210px minmax(0, 1fr); }
          .sdd-grid > :last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 720px) {
          .sdd-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default SddDemo;
