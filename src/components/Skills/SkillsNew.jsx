import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";
import {
  DiJavascript1, DiReact, DiNodejs, DiHtml5, DiCss3, DiAngularSimple, DiNpm,
  DiMongodb, DiMsqlServer, DiJenkins, DiDocker, DiGroovy, DiPython,
} from "react-icons/di";
import {
  SiTypescript, SiQt, SiCsharp, SiDotnet,
  SiRabbitmq, SiApachecassandra, SiElasticsearch,
  SiJfrog, SiKubernetes, SiRancher, SiGitlab,
  SiUbuntu, SiCentos, SiWindows11, SiVisualstudiocode, SiVisualstudio, SiPostman, SiJira,
  SiGithub, SiBitbucket, SiAzuredevops, SiGitkraken,
  SiMarkdown,
} from "react-icons/si";
import { CgCPlusPlus } from "react-icons/cg";
import { FiGitBranch, FiShield } from "react-icons/fi";
import { SddLogo, ClaudeLogo, CursorLogo, McpLogo } from "../icons/AiLogos";

const SKILL_GROUPS = [
  {
    category: "AI-Driven Development",
    color: "#a78bfa",
    level: 95,
    icons: [
      { icon: <SddLogo size={22} />, name: "SDD", color: "#a78bfa" },
      { icon: <ClaudeLogo size={22} />, name: "Claude Code", color: "#d97757" },
      { icon: <CursorLogo size={22} />, name: "Cursor", color: "#e2e8f0" },
      { icon: <McpLogo size={22} />, name: "MCP", color: "#c084fc" },
      { icon: <SiMarkdown size={22} />, name: "Agent Specs", color: "#e2e8f0" },
      { icon: <FiGitBranch size={22} />, name: "Worktrees", color: "#f97316" },
      { icon: <FiShield size={22} />, name: "AI Code Review", color: "#34d399" },
      { icon: <DiPython size={22} />, name: "Python", color: "#ffd43b" },
    ],
  },
  {
    category: "Web Ecosystems",
    color: "#61dafb",
    level: 95,
    icons: [
      { icon: <DiAngularSimple size={22} />, name: "Angular", color: "#dd0031" },
      { icon: <DiReact size={22} />, name: "React", color: "#61dafb" },
      { icon: <DiNodejs size={22} />, name: "Node.js", color: "#339933" },
      { icon: <DiNpm size={22} />, name: "NPM", color: "#cb3837" },
      { icon: <DiJavascript1 size={22} />, name: "JavaScript", color: "#f7df1e" },
      { icon: <SiTypescript size={22} />, name: "TypeScript", color: "#3178c6" },
      { icon: <DiHtml5 size={22} />, name: "HTML5", color: "#e34f26" },
      { icon: <DiCss3 size={22} />, name: "CSS3", color: "#1572b6" },
    ],
  },
  {
    category: "Native Ecosystems",
    color: "#00599c",
    level: 88,
    icons: [
      { icon: <CgCPlusPlus size={22} />, name: "C++", color: "#00599c" },
      { icon: <SiQt size={22} />, name: "Qt", color: "#41cd52" },
      { icon: <SiCsharp size={22} />, name: "C#", color: "#239120" },
      { icon: <SiDotnet size={22} />, name: ".NET", color: "#512bd4" },
      { icon: <DiPython size={22} />, name: "Python", color: "#ffd43b" },
    ],
  },
  {
    category: "Databases & Messaging",
    color: "#005571",
    level: 87,
    icons: [
      { icon: <DiMsqlServer size={22} />, name: "SQL Server", color: "#cc2927" },
      { icon: <DiMongodb size={22} />, name: "MongoDB", color: "#47a248" },
      { icon: <SiElasticsearch size={22} />, name: "Elasticsearch", color: "#005571" },
      { icon: <SiRabbitmq size={22} />, name: "RabbitMQ", color: "#ff6600" },
      { icon: <SiApachecassandra size={22} />, name: "Cassandra", color: "#1287b1" },
    ],
  },
  {
    category: "DevOps & CI/CD",
    color: "#326ce5",
    level: 90,
    icons: [
      { icon: <DiJenkins size={22} />, name: "Jenkins", color: "#d33833" },
      { icon: <DiDocker size={22} />, name: "Docker", color: "#2496ed" },
      { icon: <SiKubernetes size={22} />, name: "Kubernetes", color: "#326ce5" },
      { icon: <SiRancher size={22} />, name: "Rancher", color: "#0075a8" },
      { icon: <SiGitlab size={22} />, name: "GitLab CI", color: "#fc6d26" },
      { icon: <DiGroovy size={22} />, name: "Groovy", color: "#4298b8" },
      { icon: <SiJfrog size={22} />, name: "JFrog", color: "#41bf47" },
    ],
  },
  {
    category: "DevTools | IDEs | OS",
    color: "#007acc",
    level: 85,
    icons: [
      { icon: <SiUbuntu size={22} />, name: "Ubuntu", color: "#e95420" },
      { icon: <SiCentos size={22} />, name: "CentOS", color: "#262577" },
      { icon: <SiWindows11 size={22} />, name: "Windows", color: "#0078d4" },
      { icon: <SiVisualstudiocode size={22} />, name: "VS Code", color: "#007acc" },
      { icon: <SiVisualstudio size={22} />, name: "Visual Studio", color: "#5c2d91" },
      { icon: <SiPostman size={22} />, name: "Postman", color: "#ff6c37" },
      { icon: <SiJira size={22} />, name: "Jira", color: "#0052cc" },
    ],
  },
  {
    category: "Source Control",
    color: "#fc6d26",
    level: 95,
    icons: [
      { icon: <SiGitlab size={22} />, name: "GitLab", color: "#fc6d26" },
      { icon: <SiGithub size={22} />, name: "GitHub", color: "#f0f6fc" },
      { icon: <SiBitbucket size={22} />, name: "Bitbucket", color: "#0052cc" },
      { icon: <SiAzuredevops size={22} />, name: "Azure DevOps", color: "#0078d7" },
      { icon: <SiGitkraken size={22} />, name: "GitKraken", color: "#179287" },
    ],
  },
];

function SkillCard({ group, index }) {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "28px",
        borderRadius: 16,
        background: "var(--surface)",
        border: "1px solid var(--border-2)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${group.color}30`;
        e.currentTarget.style.background = "var(--surface-2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.background = "var(--surface)";
      }}
    >
      {/* BG glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle, ${group.color}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Header + progress */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--text-2)",
          letterSpacing: "-0.01em",
          marginBottom: 10,
        }}>
          {group.category}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", color: "var(--muted-2)", fontWeight: 500 }}>{t("skills.proficiency")}</span>
          <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", color: group.color, fontWeight: 700 }}>{group.level}%</span>
        </div>
        <div style={{ height: 3, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${group.level}%` } : {}}
            transition={{ duration: 1, delay: index * 0.07 + 0.3, ease: "easeOut" }}
            style={{ height: "100%", background: `linear-gradient(90deg, ${group.color}, ${group.color}80)`, borderRadius: 3 }}
          />
        </div>
      </div>

      {/* Icon grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {group.icons.map(({ icon, name, color }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.12, y: -2 }}
            title={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 12px",
              borderRadius: 10,
              background: "var(--surface-3)",
              border: "1px solid var(--border)",
              cursor: "default",
              transition: "all 0.2s ease",
              color,
              minWidth: 52,
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${color}40`}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {icon}
            <span style={{ fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 500, color: "var(--muted-2)", whiteSpace: "nowrap" }}>
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsNew() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" style={{ background: "var(--bg)", padding: "96px 24px" }}>
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
            padding: "5px 14px", borderRadius: 100,
            background: "var(--accent-soft)", border: "1px solid var(--accent-strong)",
            fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            {t("skills.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 12,
          }}>
            {t("skills.title")}
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 15, color: "var(--muted)", maxWidth: 520, lineHeight: 1.6,
          }}>
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsNew;
