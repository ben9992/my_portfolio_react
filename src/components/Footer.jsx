import React from "react";
import { SiLinkedin, SiGithub, SiMedium } from "react-icons/si";
import { FiMail } from "react-icons/fi";
import { useLang } from "../i18n/LanguageContext";

const LINKS = [
  { icon: <SiLinkedin size={16} />, href: "https://www.linkedin.com/in/ben-mishali/", label: "LinkedIn" },
  { icon: <SiGithub size={16} />, href: "https://github.com/ben9992", label: "GitHub" },
  { icon: <SiMedium size={16} />, href: "https://medium.com/@benmishali", label: "Medium" },
  { icon: <FiMail size={16} />, href: "mailto:benm.dev.io@gmail.com", label: "Email" },
];

function Footer() {
  const { t } = useLang();
  return (
    <footer style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border)",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 1152,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}>
        <div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14, fontWeight: 600, color: "var(--text-2)", marginBottom: 4,
          }}>
            Ben Mishali
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--muted-3)" }}>
            {t("footer.role")}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {LINKS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36,
                borderRadius: 8,
                background: "var(--surface-2)",
                border: "1px solid var(--border-2)",
                color: "var(--muted-2)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-2)"; e.currentTarget.style.borderColor = "var(--accent-strong)"; e.currentTarget.style.background = "var(--accent-soft)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-2)"; e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.background = "var(--surface-2)"; }}
            >
              {icon}
            </a>
          ))}
        </div>

        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--muted-4)" }}>
          © {new Date().getFullYear()} Ben Mishali. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
