import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAudience } from "../../audience/AudienceContext";
import { useLang } from "../../i18n/LanguageContext";

const TIMELINE = [
  {
    period: "2025 — Present",
    role: "VP of R&D (30–40% hands-on)",
    company: "KabatOne (formerly CityShob)",
    type: "current",
    description: "Leading a 40-person global R&D organization across Israel and Mexico, and owning the AI-driven development strategy for public-safety and command-and-control platforms.",
    achievements: [
      "Built a Spec-Driven Development framework and rolled it out org-wide",
      "Drove adoption of the agent stack — Claude Code, Cursor, MCP — across every discipline",
      "Own the R&D roadmap, architecture, and delivery for desktop, web and mobile",
      "Manage cross-border budgets, hiring, capacity planning and KPI frameworks",
    ],
    skills: ["Spec-Driven Development", "Agentic Workflows", "Claude Code", "Cursor", "MCP", "Architecture"],
  },
  {
    period: "2022 — 2025",
    role: "Software Team Leader (70% hands-on)",
    company: "Fibernet Ltd",
    type: "promotion",
    description: "Led a team of 5 engineers delivering enterprise software across multiple platforms, and was an early adopter of AI-assisted development inside the team's day-to-day workflow.",
    achievements: [
      "Led a team of 5 engineers using Agile methodologies",
      "Designed and built enterprise software across multiple platforms",
      "Delivered MEAN-stack web applications on Linux and Windows",
      "Built and maintained CI/CD infrastructure for reliable delivery",
    ],
    skills: ["Angular", "Node.js", "MongoDB", "MoIP / AVoIP", "CI/CD", "Agile"],
  },
  {
    period: "2017 — 2022",
    role: "Software Engineer",
    company: "Elbit Systems",
    type: "senior",
    description: "Built real-time C++/Qt systems and the DevOps infrastructure behind them — the systems-level foundation behind how I reason about what agents can and cannot be trusted to build.",
    achievements: [
      "Developed real-time C++ applications, improving system response times",
      "Integrated QML and C++ for Qt-framework UI development",
      "Built and optimized DevOps infrastructure for Elbit's private environment",
      "Managed a team of IDF engineers, coordinating project deliverables",
    ],
    skills: ["C++", "Qt / QML", "RabbitMQ", "Cassandra", "Jenkins", "Azure DevOps"],
  },
  {
    period: "Education",
    role: "BSc Computer Engineering + MBA",
    company: "Ruppin Academic Center",
    type: "early",
    description: "Computer Engineering foundations paired with an MBA specialized in technology — the combination behind both the architecture decisions and the org-level rollouts.",
    achievements: [
      "BSc Computer Engineering · MBA specialized in Technologies",
      "Management Course, Fibernet Ltd (2024)",
      "9 published technical articles · 9 completed courses",
    ],
    skills: ["Computer Engineering", "MBA", "Technology Management", "Mentoring"],
  },
];

const TYPE_STYLES = {
  current: { dotColor: "#6366f1", dotGlow: "rgba(99,102,241,0.5)", badge: "Current Role", badgeBg: "rgba(99,102,241,0.12)", badgeColor: "#818cf8" },
  promotion: { dotColor: "#10b981", dotGlow: "rgba(16,185,129,0.5)", badge: "Promotion", badgeBg: "rgba(16,185,129,0.1)", badgeColor: "#34d399" },
  senior: { dotColor: "#f59e0b", dotGlow: "rgba(245,158,11,0.4)", badge: null, badgeBg: null, badgeColor: null },
  early: { dotColor: "#475569", dotGlow: "rgba(71,85,105,0.3)", badge: null, badgeBg: null, badgeColor: null },
};

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const styles = TYPE_STYLES[item.type];
  // HR mode drops the prose and the bullets — role, dates and skills carry it.
  const { isHR } = useAudience();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", gap: 28, position: "relative" }}
    >
      {/* Timeline dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 14, height: 14,
          borderRadius: "50%",
          background: styles.dotColor,
          boxShadow: `0 0 12px ${styles.dotGlow}`,
          border: "2px solid var(--bg)",
          zIndex: 1,
          marginTop: 4,
        }} />
        {index < TIMELINE.length - 1 && (
          <div style={{
            flex: 1,
            width: 1,
            background: "var(--border)",
            marginTop: 4,
            marginBottom: -4,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 48 }}>
        {/* Period */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          fontWeight: 500,
          color: "var(--muted-2)",
          marginBottom: 6,
          letterSpacing: "0.05em",
        }}>
          {item.period}
        </div>

        <div style={{
          padding: "24px 28px",
          borderRadius: 16,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          transition: "all 0.3s ease",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${styles.dotColor}30`;
            e.currentTarget.style.background = "var(--surface-2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--surface)";
          }}
        >
          {/* Role + Badge */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
            <h3 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.01em",
            }}>
              {item.role}
            </h3>
            {styles.badge && (
              <span style={{
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                color: styles.badgeColor,
                background: styles.badgeBg,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                {styles.badge}
              </span>
            )}
          </div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: styles.dotColor,
            marginBottom: 12,
          }}>
            {item.company}
          </div>

          {!isHR && (
            <>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                lineHeight: 1.65,
                color: "var(--muted)",
                marginBottom: 16,
              }}>
                {item.description}
              </p>

              {/* Achievements */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                {item.achievements.map((a) => (
                  <li key={a} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: styles.dotColor, fontSize: 12, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{a}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.skills.map((s) => (
              <span key={s} style={{
                padding: "3px 9px",
                borderRadius: 5,
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
                color: "var(--muted-2)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Experience() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" style={{ background: "var(--bg-alt)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 60 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 100,
            background: "var(--accent-soft)", border: "1px solid var(--accent-strong)",
            fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            {t("experience.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 12,
          }}>
            {t("experience.title")}
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--muted)", maxWidth: 480, lineHeight: 1.6,
          }}>
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <div>
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.role + item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
