import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiDownload, FiArrowUpRight } from "react-icons/fi";
import { SiLinkedin, SiGithub, SiMedium } from "react-icons/si";
import { useLang } from "../../i18n/LanguageContext";

const SOCIAL_LINKS = [
  {
    icon: <SiLinkedin size={20} />,
    label: "LinkedIn",
    handle: "/in/benmishali",
    href: "https://www.linkedin.com/in/ben-mishali/",
    color: "#0077b5",
    descKey: "contact.linkedinDesc",
  },
  {
    icon: <SiGithub size={20} />,
    label: "GitHub",
    handle: "@ben9992",
    href: "https://github.com/ben9992",
    color: "#f0f6fc",
    descKey: "contact.githubDesc",
  },
  {
    icon: <SiMedium size={20} />,
    label: "Medium",
    handle: "@benmishali",
    href: "https://medium.com/@benmishali",
    color: "#00ab6c",
    descKey: "contact.mediumDesc",
  },
  {
    icon: <FiMail size={20} />,
    label: "Email",
    handle: "benm.dev.io@gmail.com",
    href: "mailto:benm.dev.io@gmail.com",
    color: "#818cf8",
    descKey: "contact.emailDesc",
  },
];

function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("benm.dev.io@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ background: "var(--bg-alt)", padding: "96px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 100,
            background: "var(--accent-soft)", border: "1px solid var(--accent-strong)",
            fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            {t("contact.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 16,
          }}>
            {t("contact.titleA")}{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--accent-2), var(--accent-3))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {t("contact.titleB")}
            </span>
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 16, color: "var(--muted)",
            maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.65,
          }}>
            {t("contact.subtitle")}
          </p>

          {/* Primary CTA */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <motion.a
              href="mailto:benm.dev.io@gmail.com"
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px var(--accent-glow)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                fontSize: 15, fontWeight: 600, fontFamily: "Inter, sans-serif",
                color: "white", textDecoration: "none",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                boxShadow: "0 0 20px var(--accent-strong), 0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <FiMail size={16} /> {t("contact.sendEmail")}
            </motion.a>
            <motion.a
              href={`${process.env.PUBLIC_URL}/Ben Mishali - EN 2026.pdf`}
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                fontSize: 15, fontWeight: 600, fontFamily: "Inter, sans-serif",
                color: "var(--text-3)", textDecoration: "none",
                background: "var(--surface-2)",
                border: "1px solid var(--border-3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--accent-glow)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.borderColor = "var(--border-3)"; }}
            >
              <FiDownload size={16} /> {t("contact.downloadResume")}
            </motion.a>
          </div>

          {/* Copy email */}
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.02 }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13, color: "var(--muted-2)",
              transition: "color 0.2s ease",
              padding: "4px 8px",
              borderRadius: 6,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent-2)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted-2)"}
          >
            {copied ? t("contact.copied") : "benm.dev.io@gmail.com"}
          </motion.button>
        </motion.div>

        {/* Social links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
        }}>
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.07 }}
              whileHover={{ y: -3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "24px 16px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border-2)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${link.color}35`;
                e.currentTarget.style.background = `${link.color}08`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-2)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <div style={{ color: link.color }}>{link.icon}</div>
              <div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                  color: "var(--text-2)", marginBottom: 2, textAlign: "center",
                }}>
                  {link.label}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--muted-2)", textAlign: "center",
                }}>
                  {t(link.descKey)}
                </div>
              </div>
              <FiArrowUpRight size={12} style={{ color: "var(--muted-3)", position: "absolute", top: 12, insetInlineEnd: 12 }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
