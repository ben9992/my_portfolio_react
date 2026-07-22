import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiDocker, SiKubernetes, SiElasticsearch, SiPython, SiAngular, SiDotnet, SiAmazonaws, SiMarkdown, SiTypescript, SiGit } from "react-icons/si";
import { ClaudeLogo, CursorLogo, McpLogo, SddLogo } from "../icons/AiLogos";
import { useLang } from "../../i18n/LanguageContext";

const PROJECTS = [
  {
    tag: "AI Dev Framework",
    title: "SDD — Spec-Driven Development Framework",
    subtitle: "A framework that turns a ticket into a reviewed PR, agent by agent",
    problem: "AI assistants were used ad-hoc across the org — great demos, inconsistent results. Everyone prompted differently, and there was no repeatable path from requirement to code a reviewer could trust.",
    solution: "Built SDD: work decomposed into explicit stages — intake, spec, architecture, plan, implement, test, independent review — each run by a purpose-built agent with its own context and guardrails, with human gates at the decisions that matter.",
    impact: [
      "Adopted across a 40-person R&D org in Israel and Mexico",
      "A repeatable ticket → spec → plan → PR pipeline",
      "Specs and plans are reviewable artifacts, not chat history",
      "Clean-context review agent catches defects before human review",
    ],
    tech: [
      { icon: <SddLogo size={13} />, name: "SDD" },
      { icon: <ClaudeLogo size={13} />, name: "Claude Code" },
      { icon: <SiMarkdown size={13} />, name: "Agent Specs" },
      { icon: <SiTypescript size={13} />, name: "TypeScript" },
      { icon: <SiGit size={13} />, name: "Git Worktrees" },
    ],
    architecture: "Composable agent definitions (role, model tier, tool scope) driven by an orchestrator that chains intake → refine → plan → implement → test → review, with MCP servers bridging Jira/Confluence/Git, per-stage human gates, and isolated Git worktrees so parallel agents never collide.",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(99,102,241,0.05))",
  },
  {
    tag: "Agent Stack",
    title: "Building the Agent Stack for a 40-Person R&D Org",
    subtitle: "Layered agent tooling, not one tool forced to do everything",
    problem: "Handing engineers an AI assistant does not make an org AI-driven. Teams reached for whichever tool was already open — a terminal agent for a two-line fix, an editor agent for a cross-service refactor — and got the worst of both.",
    solution: "Rolled out a deliberate agent stack: Claude Code for large autonomous work and review, Cursor for the in-editor loop, MCP giving both the same view of Jira, Confluence and the repo — all governed by SDD so every layer executes against one spec.",
    impact: [
      "A clear org-wide rule for which layer owns which class of task",
      "MCP-backed shared context — agents stop guessing at requirements",
      "Review standards that hold AI-authored code to the same bar",
      "Team leaders trained to run and coach AI-assisted delivery",
    ],
    tech: [
      { icon: <ClaudeLogo size={13} />, name: "Claude Code" },
      { icon: <CursorLogo size={13} />, name: "Cursor" },
      { icon: <McpLogo size={13} />, name: "MCP" },
      { icon: <SiGit size={13} />, name: "GitLab CI" },
      { icon: <SiPython size={13} />, name: "Python" },
    ],
    architecture: "Shared agent and skill definitions versioned in Git, MCP integrations into Jira, Confluence and the codebase, CI hooks that run review agents on every merge request, and per-layer routing rules deciding whether a ticket goes to orchestration or stays in the editor.",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.05))",
  },
  {
    tag: "Public Safety Platform",
    title: "Command-and-Control Platform",
    subtitle: "AI-driven situational awareness for public safety operations",
    problem: "Public safety organizations needed a unified platform to manage incidents, resources, and communications across distributed teams in real time.",
    solution: "Led the R&D of a full-stack command-and-control platform with real-time data ingestion, AI-driven decision support, and role-based dashboards — built and shipped with a 40-person global team across Israel and Mexico.",
    impact: [
      "Deployed to public safety agencies across multiple countries",
      "Real-time incident management with sub-second data refresh",
      "AI-driven recommendations for resource allocation",
      "Unified MoIP / AVoIP communications layer",
    ],
    tech: [
      { icon: <SiAngular size={13} />, name: "Angular" },
      { icon: <SiNodedotjs size={13} />, name: "Node.js" },
      { icon: <SiDotnet size={13} />, name: ".NET" },
      { icon: <SiElasticsearch size={13} />, name: "Elasticsearch" },
      { icon: <SiDocker size={13} />, name: "Docker" },
    ],
    architecture: "Angular micro-frontend SPA, .NET Core microservices, Elasticsearch for real-time event analytics, RabbitMQ for inter-service messaging, Kubernetes orchestration.",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, var(--halo), rgba(167,139,250,0.05))",
  },
  {
    tag: "AI-Driven Development",
    title: "AI-Powered Analytics & Decision Support",
    subtitle: "Machine learning pipelines for operational intelligence",
    problem: "Operations teams were manually reviewing vast streams of event data, missing critical patterns and slow to respond to evolving situations.",
    solution: "Designed and shipped AI-driven analytics features including behavioral pattern detection, automated alerting, and ML-based decision support — integrated directly into the core platform.",
    impact: [
      "Significantly reduced manual review time for operators",
      "Automated detection of critical event patterns",
      "ML pipelines processing high-volume real-time event streams",
      "Cross-country team collaboration (Israel + Mexico)",
    ],
    tech: [
      { icon: <SiPython size={13} />, name: "Python" },
      { icon: <SiElasticsearch size={13} />, name: "Elasticsearch" },
      { icon: <SiKubernetes size={13} />, name: "Kubernetes" },
      { icon: <SiReact size={13} />, name: "React" },
      { icon: <SiNodedotjs size={13} />, name: "Node.js" },
    ],
    architecture: "Python ML inference pipeline, Elasticsearch aggregations for real-time analytics, Kafka event streaming, React + Node.js BFF, deployed on Kubernetes.",
    color: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.05))",
  },
  {
    tag: "Cross-Platform Desktop",
    title: "Cross-Platform Desktop Application (Electron.js)",
    subtitle: "Native-feel desktop apps using web technologies",
    problem: "Building desktop applications traditionally required platform-specific expertise (Windows, macOS, Linux) leading to high duplication of effort and inconsistent user experiences.",
    solution: "Built and architected cross-platform desktop applications using Electron.js, sharing code across platforms with a single codebase — covering the full stack from UI to native OS integrations.",
    impact: [
      "Single codebase running on Windows, macOS, and Linux",
      "Shared with the engineering community via technical articles",
      "Reduced platform-specific maintenance overhead",
      "Applied in production software engineering projects",
    ],
    tech: [
      { icon: <SiReact size={13} />, name: "React" },
      { icon: <SiNodedotjs size={13} />, name: "Node.js" },
      { icon: <SiDocker size={13} />, name: "Docker" },
      { icon: <SiAmazonaws size={13} />, name: "AWS" },
    ],
    architecture: "Electron.js shell with React renderer, Node.js main process for OS integrations, packaged with electron-builder for all platforms, CI/CD via GitLab.",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(251,191,36,0.04))",
  },
];

function ProjectCard({ project, index }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: 20,
        border: "1px solid var(--border-2)",
        overflow: "hidden",
        background: "var(--card)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.color}40`;
        e.currentTarget.style.boxShadow = `0 0 40px ${project.color}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${project.color}, ${project.color}40, transparent)`,
      }} />

      <div style={{ padding: "32px 36px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <span style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              color: project.color,
              background: `${project.color}15`,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}>
              {project.tag}
            </span>
            <h3 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 6,
            }}>
              {project.title}
            </h3>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "var(--muted)",
              fontWeight: 400,
            }}>
              {project.subtitle}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: project.color,
              flexShrink: 0,
              cursor: "pointer",
              marginInlineStart: 16,
            }}
          >
            <FiArrowUpRight size={16} />
          </motion.div>
        </div>

        {/* Problem/Solution - always visible */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}>
          {[
            { label: t("projects.problem"), text: project.problem, color: "#ef4444" },
            { label: t("projects.solution"), text: project.solution, color: project.color },
          ].map(({ label, text, color }) => (
            <div key={label} style={{
              padding: "16px 20px",
              borderRadius: 12,
              background: "var(--surface-3)",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                {label}
              </div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--text-3)",
              }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.tech.map(({ icon, name }) => (
            <span key={name} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
              color: "var(--muted)",
              background: "var(--surface-2)",
              border: "1px solid var(--border-2)",
            }}>
              {icon} {name}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            color: "var(--accent)",
            padding: 0,
          }}
        >
          {expanded ? <><FiChevronUp size={14} /> {t("projects.hideDetails")}</> : <><FiChevronDown size={14} /> {t("projects.showDetails")}</>}
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: 20 }}>
                {/* Impact */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, fontFamily: "Inter, sans-serif",
                    color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
                  }}>
                    {t("projects.impact")}
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {project.impact.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#10b981", fontSize: 14, flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-3)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture */}
                <div style={{
                  padding: "14px 18px",
                  borderRadius: 10,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, fontFamily: "Inter, sans-serif",
                    color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6,
                  }}>
                    {t("projects.architecture")}
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                    {project.architecture}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Projects() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" style={{ background: "var(--bg)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 60 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px",
            borderRadius: 100,
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-strong)",
            fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: 16,
          }}>
            {t("projects.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)",
            marginBottom: 12,
          }}>
            {t("projects.title")}
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--muted)",
            maxWidth: 520, lineHeight: 1.6,
          }}>
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
