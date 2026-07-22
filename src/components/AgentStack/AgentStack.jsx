import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiUser, FiExternalLink, FiPlay } from "react-icons/fi";
import { ClaudeLogo, CursorLogo, McpLogo, SddLogo } from "../icons/AiLogos";

/**
 * The stack reads top-down: the spec layer governs, the agents below execute.
 * Ordering here is deliberate — it is the order work actually flows through.
 */
const LAYERS = [
  {
    layer: "Spec Layer",
    tool: "SDD Framework",
    Logo: SddLogo,
    color: "#a78bfa",
    role: "Owns the contract",
    detail: "Turns a ticket into a reviewed spec before any agent writes code. Every layer below executes against it.",
    tags: ["Spec → Plan → PR", "Human gates", "Purpose-built"],
  },
  {
    layer: "Orchestration Layer",
    tool: "Claude Code",
    Logo: ClaudeLogo,
    color: "#d97757",
    role: "Terminal-native multi-agent execution",
    detail: "The large autonomous work — refactors, migrations, independent review. Sub-agents fan out across isolated worktrees.",
    tags: ["Sub-agents", "Worktrees", "Large refactors", "Code review"],
  },
  {
    layer: "IDE Layer",
    tool: "Cursor",
    Logo: CursorLogo,
    color: "#e2e8f0",
    role: "In-editor feature work",
    detail: "The daily driver for scoped feature work — tight edit loops where the engineer stays in the diff.",
    tags: ["Daily features", "Background agents", "Tight feedback loop"],
  },
  {
    layer: "Context Layer",
    tool: "MCP",
    Logo: McpLogo,
    color: "#c084fc",
    role: "The wiring between agents and reality",
    detail: "One shared view of Jira, Confluence, designs and the repo — so no agent is guessing at context.",
    tags: ["Jira · Confluence", "Design files", "Shared context"],
  },
];

const PIPELINE = [
  { step: "Intake", agent: "Intake agent", detail: "Pull the ticket, spec and design.", human: false, color: "#818cf8" },
  { step: "Refine", agent: "Refiner agent", detail: "Brief → spec with acceptance criteria.", human: true, color: "#a78bfa" },
  { step: "Plan", agent: "Planner + architect", detail: "Design it; a simplifier trims it back.", human: true, color: "#c084fc" },
  { step: "Implement", agent: "Implementer agent", detail: "Execute in an isolated worktree.", human: false, color: "#f472b6" },
  { step: "Test", agent: "Test author", detail: "Tests for the criteria in the spec.", human: false, color: "#fb923c" },
  { step: "Review", agent: "Clean-context reviewer", detail: "Reviewed by an agent that never saw it built.", human: true, color: "#34d399" },
  { step: "Ship", agent: "Shipper agent", detail: "PR opened, spec and plan attached.", human: false, color: "#38bdf8" },
];

function SectionHeading({ badge, title, subtitle, inView, refEl }) {
  return (
    <motion.div
      ref={refEl}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: 56 }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "5px 14px", borderRadius: 100,
        background: "var(--accent-soft)", border: "1px solid var(--accent-strong)",
        fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
        color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
      }}>
        {badge}
      </div>
      <h2 style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
        fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 12,
      }}>
        {title}
      </h2>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--muted)",
        maxWidth: 620, lineHeight: 1.7,
      }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

function LayerRow({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { Logo } = item;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 20,
        padding: "22px 26px",
        borderRadius: 16,
        background: "var(--surface)",
        border: "1px solid var(--border-2)",
        transition: "all 0.3s ease",
        // Each layer sits slightly narrower than the one above it — the stack reads as a stack.
        marginInlineStart: `${index * 14}px`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.color}45`;
        e.currentTarget.style.background = "var(--surface-2)";
        e.currentTarget.style.boxShadow = `0 0 40px ${item.color}12`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.background = "var(--surface)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Logo tile */}
      <div style={{
        width: 52, height: 52, flexShrink: 0,
        borderRadius: 13,
        background: `${item.color}15`,
        border: `1px solid ${item.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: item.color,
      }}>
        <Logo size={26} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700,
            color: "var(--text)", letterSpacing: "-0.01em",
          }}>
            {item.tool}
          </span>
          <span style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600,
            color: item.color, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "2px 8px", borderRadius: 5, background: `${item.color}12`,
          }}>
            {item.layer}
          </span>
        </div>
        <div style={{
          fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
          color: item.color, marginBottom: 10,
        }}>
          {item.role}
        </div>
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.65,
          color: "var(--muted)", marginBottom: 12,
        }}>
          {item.detail}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map((t) => (
            <span key={t} style={{
              padding: "3px 9px", borderRadius: 5,
              fontSize: 11, fontWeight: 500, fontFamily: "Inter, sans-serif",
              color: "var(--muted-2)", background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PipelineStep({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{
        flex: "1 1 150px",
        minWidth: 150,
        padding: "18px 18px 16px",
        borderRadius: 14,
        background: "var(--surface)",
        border: "1px solid var(--border-2)",
        position: "relative",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.color}45`;
        e.currentTarget.style.background = "var(--surface-2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.background = "var(--surface)";
      }}
    >
      {/* Stage index rail */}
      <div style={{
        height: 2, width: 28, borderRadius: 2, marginBottom: 12,
        background: `linear-gradient(90deg, ${item.color}, ${item.color}20)`,
      }} />

      <div style={{
        fontFamily: "JetBrains Mono, monospace", fontSize: 10,
        color: "var(--muted-3)", marginBottom: 6, letterSpacing: "0.08em",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div style={{
        fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700,
        color: "var(--text)", marginBottom: 4, letterSpacing: "-0.01em",
      }}>
        {item.step}
      </div>

      <div style={{
        fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
        color: item.color, marginBottom: 8,
      }}>
        {item.agent}
      </div>

      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 11.5, lineHeight: 1.55, color: "var(--muted)",
      }}>
        {item.detail}
      </p>

      {item.human && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12,
          padding: "3px 8px", borderRadius: 5,
          background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.22)",
          fontSize: 10, fontWeight: 600, fontFamily: "Inter, sans-serif", color: "#4ade80",
        }}>
          <FiUser size={10} /> Human gate
        </div>
      )}
    </motion.div>
  );
}

function AgentStack() {
  const stackRef = useRef(null);
  const stackInView = useInView(stackRef, { once: true, margin: "-100px" });
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* ---------- Agent Stack ---------- */}
      <section id="agent-stack" style={{ background: "var(--bg-alt)", padding: "96px 24px", position: "relative", overflow: "hidden" }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "50vw", height: "50vh",
          background: "radial-gradient(ellipse, rgba(167,139,250,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1152, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHeading
            refEl={stackRef}
            inView={stackInView}
            badge="The Agent Stack"
            title="No single agent runs the whole job"
            subtitle="These tools aren't competitors — they're layers. Picking the right layer for each task is the whole discipline."
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {LAYERS.map((item, i) => (
              <LayerRow key={item.tool} item={item} index={i} />
            ))}
          </div>

          {/* Selection rationale */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              marginTop: 32,
              padding: "20px 26px",
              borderRadius: 16,
              background: "var(--surface)",
              border: "1px dashed var(--border-2)",
              display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20,
            }}
          >
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
              color: "var(--muted-2)", letterSpacing: "0.1em", textTransform: "uppercase",
              flexShrink: 0,
            }}>
              Why this shape
            </span>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 12.5, lineHeight: 1.65,
              color: "var(--muted)", flex: "1 1 320px", minWidth: 0,
            }}>
              The 2026 landscape has no shortage of capable agents. Three criteria decided it: does it run
              unattended on a large task, does it leave a reviewable artifact, does it read the same context
              everything else reads. Two layers that clear that bar beat five that overlap.
            </p>
            <a
              href="https://www.verdent.ai/guides/claude-code-alternatives-2026"
              target="_blank"
              rel="noreferrer"
              style={{
                marginInlineStart: "auto",
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                color: "var(--accent)", textDecoration: "none",
              }}
            >
              Landscape reference <FiExternalLink size={11} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------- Agentic Workflows ---------- */}
      <section id="agentic-workflows" style={{ background: "var(--bg)", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <SectionHeading
            refEl={flowRef}
            inView={flowInView}
            badge="Agentic Workflows"
            title="One ticket, seven agents, three human gates"
            subtitle="An agentic workflow isn't a longer prompt — it's a pipeline. Each stage runs in its own context, hands a concrete artifact to the next, and stops where human judgement changes the outcome."
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {PIPELINE.map((item, i) => (
              <PipelineStep key={item.step} item={item} index={i} inView={flowInView} />
            ))}
          </div>

          {/* Run it yourself — the claim above, demonstrated */}
          <motion.a
            href="/sdd"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={flowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            whileHover={{ scale: 1.005 }}
            style={{
              display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
              marginTop: 20, padding: "20px 26px",
              borderRadius: 16, textDecoration: "none",
              background: "linear-gradient(135deg, var(--accent-mid), rgba(167,139,250,0.05))",
              border: "1px solid var(--accent-strong)",
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-2)",
            }}>
              <FiPlay size={18} />
            </div>
            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700,
                color: "var(--text)", marginBottom: 3,
              }}>
                Don't take the diagram's word for it — run a ticket
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.55 }}>
                Watch the pipeline execute end to end: read the spec it writes, the plan the
                simplifier cuts down, the diff, and the defect the review agent catches.
              </div>
            </div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "10px 18px", borderRadius: 10, flexShrink: 0,
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#fff",
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            }}>
              Open the demo <FiExternalLink size={13} />
            </span>
          </motion.a>

          {/* Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={flowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            {[
              {
                title: "Fresh context beats long context",
                body: "An agent that has to rediscover the code finds what an agent defending its own work will not.",
                color: "#34d399",
              },
              {
                title: "Artifacts, not chat history",
                body: "Every stage emits something reviewable. If it only lives in a transcript, it can't be corrected or reused.",
                color: "#818cf8",
              },
              {
                title: "Gate decisions, not keystrokes",
                body: "Humans approve scope, architecture and merge. Gate more than that and you've built supervision, not leverage.",
                color: "#f59e0b",
              },
            ].map((p) => (
              <div key={p.title} style={{
                padding: "22px 24px",
                borderRadius: 14,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}>
                <div style={{
                  width: 24, height: 2, borderRadius: 2, marginBottom: 14,
                  background: `linear-gradient(90deg, ${p.color}, ${p.color}20)`,
                }} />
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 700,
                  color: "var(--text-2)", marginBottom: 8, letterSpacing: "-0.01em",
                }}>
                  {p.title}
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.65, color: "var(--muted)" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default AgentStack;
