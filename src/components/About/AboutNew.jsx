import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAudience } from "../../audience/AudienceContext";
import { useLang } from "../../i18n/LanguageContext";
import {
  FiCpu, FiUsers, FiTrendingUp, FiBook, FiExternalLink,
  FiBriefcase, FiMapPin, FiClock, FiAward, FiTarget, FiCode,
} from "react-icons/fi";

/** The at-a-glance panel — everything a recruiter needs in one pass. */
const QUICK_FACTS = [
  { icon: <FiBriefcase size={14} />, k: "Role" },
  { icon: <FiMapPin size={14} />, k: "Team" },
  { icon: <FiClock size={14} />, k: "Experience" },
  { icon: <FiAward size={14} />, k: "Education" },
  { icon: <FiTarget size={14} />, k: "Focus" },
  { icon: <FiCode size={14} />, k: "Stack" },
];

const HIGHLIGHT_CARDS = [
  {
    icon: <FiCpu size={20} />,
    title: "Spec-Driven Development",
    color: "#a78bfa",
    points: [
      "Built the SDD framework: ticket → spec → plan → PR",
      "A purpose-built agent per stage, human gates where they matter",
      "Specs as reviewable artifacts, not throwaway chat history",
    ],
  },
  {
    icon: <FiUsers size={20} />,
    title: "AI Enablement at Scale",
    color: "#818cf8",
    points: [
      "Rolled a layered agent stack out to a 40-person global R&D org",
      "Review standards that hold AI-authored code to the same bar",
      "Coaching team leaders to run AI-assisted delivery themselves",
    ],
  },
  {
    icon: <FiTrendingUp size={20} />,
    title: "Architecture & Delivery",
    color: "#34d399",
    points: [
      "Microservices, distributed systems, cloud-native design",
      "DevOps depth: Jenkins, GitLab, Kubernetes, Rancher, JFrog",
      "Real-time C++/Qt through to Angular, React, Node.js and .NET",
    ],
  },
  {
    icon: <FiBook size={20} />,
    title: "Leadership & Learning",
    color: "#f472b6",
    points: [
      "Cross-border budgets, hiring, capacity planning and KPIs",
      "9 published technical articles · 9 completed courses",
      "Coaching team leaders and growing engineers into leadership",
    ],
  },
];

/**
 * HR mode trades sentences for keywords: same four themes, rendered as chips a
 * recruiter can scan in seconds rather than bullets they have to read.
 */
const HIGHLIGHT_KEYWORDS = {
  "Spec-Driven Development": ["SDD framework", "Agentic workflows", "Spec → plan → PR", "Human gates", "Multi-agent orchestration"],
  "AI Enablement at Scale": ["Claude Code", "Cursor", "MCP", "Org-wide rollout", "AI code review", "Team-leader coaching"],
  "Architecture & Delivery": ["Microservices", "Distributed systems", "Cloud-native", "Kubernetes", "CI/CD", "C++ · .NET · Angular · React"],
  "Leadership & Learning": ["40 engineers", "2 countries", "Budgets & hiring", "KPIs", "MBA", "9 articles"],
};

/** Exec mode leads with the outcome, not the mechanism. */
const HIGHLIGHT_OUTCOMES = {
  "Spec-Driven Development": [
    "Built the delivery framework the whole org ships through",
    "Repeatable ticket-to-PR pipeline replacing ad-hoc AI use",
    "Quality gates a human owns, at the decisions that matter",
  ],
  "AI Enablement at Scale": [
    "40-engineer org moved to an AI-native workflow",
    "One standard for AI-authored code across every team",
    "Team leaders now run it themselves — not dependent on me",
  ],
  "Architecture & Delivery": [
    "Public-safety platforms in production across multiple countries",
    "Desktop, web and mobile delivered from one R&D org",
    "Real-time systems background behind the architecture calls",
  ],
  "Leadership & Learning": [
    "Cross-border budgets, hiring and capacity across two sites",
    "KPI frameworks for delivery predictability",
    "MBA in technology management alongside the engineering",
  ],
};

const ARTICLES = [
  {
    title: "Cross Platform Desktop Applications With Electron.js: Zero To Hero",
    desc: "Building cross-platform desktop apps with Electron.js and web technologies.",
    link: "https://medium.com/@benmishali/cross-platform-desktop-applications-with-electron-js-zero-to-hero-e37c7f3f6359",
  },
  {
    title: "Node.js Unit Testing with Jest",
    desc: "Jest is a testing framework for JavaScript developed by Facebook.",
    link: "https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0",
  },
  {
    title: "Design Patterns in Node.js",
    desc: "Reusable solutions to common programming problems, applied to Node.js.",
    link: "https://medium.com/@ben.dev.io/design-patterns-in-node-js-227673162879",
  },
  {
    title: "Node.js for Real-Time Communication",
    desc: "Why Node.js is the ideal choice for real-time communication and how to implement it.",
    link: "https://medium.com/@ben.dev.io/node-js-for-real-time-communication-cf71f985f983",
  },
  {
    title: "Clean Architecture in Node.js",
    desc: "Implementing Clean Architecture in Node.js projects with code samples.",
    link: "https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3",
  },
  {
    title: "Angular vs React vs Vue: Which Framework to Pick?",
    desc: "Comparing the three most popular frontend frameworks with pros and cons.",
    link: "https://medium.com/@ben.dev.io/angular-react-vue-which-framework-to-pick-for-front-end-development-e7c0579fedf8",
  },
  {
    title: "Best Practices for Building Large-Scale Node.js Applications",
    desc: "Common challenges and best practices for large-scale Node.js systems.",
    link: "https://medium.com/@ben.dev.io/best-practices-for-building-large-scale-node-js-applications-b45ab29b757a",
  },
  {
    title: "Distributed Architecture using Node.js",
    desc: "Design and implementation of distributed software systems with Node.js.",
    link: "https://medium.com/@ben.dev.io/distributed-architecture-using-node-js-6931d30424a9",
  },
  {
    title: "KPIs For Software Development",
    desc: "Essential KPIs for software development teams, with tools to measure them.",
    link: "https://medium.com/@ben.dev.io/kpis-for-software-development-d1b52e585b5e",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { isHR, isExec } = useAudience();
  const { t } = useLang();

  const headline = t(isHR ? "about.headlineHR" : isExec ? "about.headlineExec" : "about.headlineTech");

  const intro = t(isHR ? "about.introHR" : isExec ? "about.introExec" : "about.introTech");

  return (
    <section id="about" style={{ background: "var(--bg-alt)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 100,
            background: "var(--accent-soft)", border: "1px solid var(--accent-strong)",
            fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            {t("about.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 14,
          }}>
            {headline}
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 16, color: "var(--text-3)",
            maxWidth: 640, lineHeight: 1.75,
          }}>
            {intro}
          </p>
        </motion.div>

        {/* Quick facts — the recruiter's 15-second pass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border-2)",
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          {QUICK_FACTS.map((f) => (
            <div key={f.k} style={{
              background: "var(--bg-alt)",
              padding: "20px 22px",
              display: "flex", flexDirection: "column", gap: 7,
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 7,
                color: "var(--muted-2)",
                fontFamily: "Inter, sans-serif", fontSize: 10.5, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                <span style={{ color: "var(--accent-2)", display: "flex" }}>{f.icon}</span>
                {t(`about.fact${f.k}`)}
              </div>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 600,
                color: "var(--text-2)", lineHeight: 1.45,
              }}>
                {t(`about.fact${f.k}Value`)}
              </div>
            </div>
          ))}
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {HIGHLIGHT_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              style={{
                padding: "26px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border-2)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${card.color}30`;
                e.currentTarget.style.background = "var(--surface-2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-2)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 100, height: 100,
                background: `radial-gradient(circle, ${card.color}08 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <div style={{
                width: 40, height: 40,
                borderRadius: 10,
                background: `${card.color}15`,
                border: `1px solid ${card.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: card.color, marginBottom: 16,
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: "Inter, sans-serif", fontSize: 14,
                fontWeight: 700, color: "var(--text-2)", marginBottom: 14, letterSpacing: "-0.01em",
              }}>
                {card.title}
              </h3>
              {isHR ? (
                // Keywords, not prose — scannable in a few seconds.
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(HIGHLIGHT_KEYWORDS[card.title] || card.points).map((k) => (
                    <span key={k} style={{
                      padding: "5px 10px", borderRadius: 6,
                      fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
                      color: card.color,
                      background: `${card.color}14`,
                      border: `1px solid ${card.color}2e`,
                    }}>
                      {k}
                    </span>
                  ))}
                </div>
              ) : (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {(isExec ? (HIGHLIGHT_OUTCOMES[card.title] || card.points) : card.points).map((p) => (
                    <li key={p} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: card.color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>●</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "var(--muted)", lineHeight: 1.55 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Articles() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="articles" style={{ background: "var(--bg)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 100,
            background: "var(--accent-soft)", border: "1px solid var(--accent-strong)",
            fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            {t("articles.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 12,
          }}>
            {t("articles.title")}
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--muted)", maxWidth: 480, lineHeight: 1.6,
          }}>
            {t("articles.subtitle")}
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 12,
        }}>
          {ARTICLES.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "20px 22px",
                borderRadius: 14,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.25s ease",
                position: "relative",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--accent-strong)";
                e.currentTarget.style.background = "rgba(99,102,241,0.04)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <FiExternalLink
                size={12}
                style={{ color: "var(--muted-3)", position: "absolute", top: 14, insetInlineEnd: 14 }}
              />
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                color: "var(--text-2)", lineHeight: 1.4, paddingRight: 16,
              }}>
                {article.title}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--muted-2)", lineHeight: 1.5,
              }}>
                {article.desc}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600,
                color: "var(--accent)", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 4,
              }}>
                {t("articles.readOn")}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
