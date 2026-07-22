import React from "react";
import { motion } from "framer-motion";
import { useLang, LANGUAGES } from "./LanguageContext";

/** Compact EN / עב toggle. Mirrors the audience switch so the bar reads as one control group. */
function LanguageSwitch({ compact = false }) {
  const { lang, setLang } = useLang();

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 2,
      padding: 3, borderRadius: 10,
      background: "var(--surface-2)",
      border: "1px solid var(--border-2)",
    }}>
      {Object.values(LANGUAGES).map((l) => {
        const on = lang === l.id;
        return (
          <button
            key={l.id}
            onClick={() => setLang(l.id)}
            title={l.name}
            aria-label={`Switch to ${l.name}`}
            aria-pressed={on}
            lang={l.id}
            style={{
              position: "relative",
              padding: compact ? "6px 12px" : "5px 10px",
              borderRadius: 8, border: "none", cursor: "pointer",
              background: "transparent",
              fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700,
              color: on ? "var(--on-accent)" : "var(--muted)",
              transition: "color 0.2s ease",
              minWidth: 34,
            }}
          >
            {on && (
              <motion.span
                layoutId="lang-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{
                  position: "absolute", inset: 0, borderRadius: 8,
                  background: "var(--accent)", zIndex: 0,
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{l.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
