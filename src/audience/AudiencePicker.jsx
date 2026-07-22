import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiTerminal, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { useAudience } from "./AudienceContext";
import { THEMES } from "./themes";
import { useLang } from "../i18n/LanguageContext";

/**
 * First-visit question: who's reading this?
 *
 * The choice changes the theme, the copy density and which sections render.
 * It is stored, so it is asked once. Each card previews its own palette so the
 * visitor can see what they're choosing before they choose it.
 */

const CHOICES = [
  { id: "hr", icon: <FiUsers size={22} /> },
  { id: "tech", icon: <FiTerminal size={22} /> },
  { id: "exec", icon: <FiTrendingUp size={22} /> },
];

function Swatches({ id }) {
  const t = THEMES[id];
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 14 }}>
      {[t["--bg"], t["--bg-alt"], t["--accent"], t["--text"]].map((c, i) => (
        <span
          key={i}
          style={{
            width: 20, height: 8, borderRadius: 3,
            background: c,
            border: "1px solid rgba(128,128,128,0.28)",
          }}
        />
      ))}
    </div>
  );
}

function AudiencePicker() {
  const { hasChosen, setAudience } = useAudience();
  const { t } = useLang();

  return (
    <AnimatePresence>
      {!hasChosen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed", inset: 0, zIndex: 5000,
            background: "rgba(4,4,8,0.86)",
            backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, overflowY: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 940, width: "100%" }}
          >
            <div style={{ textAlign: "center", marginBottom: 34 }}>
              <div style={{
                display: "inline-block", padding: "5px 14px", borderRadius: 100,
                background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
                fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
                color: "#a5b4fc", letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: 18,
              }}>
                {t("picker.eyebrow")}
              </div>
              <h1 style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 800, letterSpacing: "-0.03em", color: "#f8fafc",
                marginBottom: 12, lineHeight: 1.15,
              }}>
                {t("picker.title")}
              </h1>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: 14.5, color: "#94a3b8",
                maxWidth: 480, margin: "0 auto", lineHeight: 1.6,
              }}>
                {t("picker.subtitle")}
              </p>
            </div>

            <div className="ap-grid">
              {CHOICES.map((c, i) => (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.09, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setAudience(c.id)}
                  style={{
                    textAlign: "start", cursor: "pointer",
                    padding: "26px 24px 22px",
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "inherit",
                    transition: "border-color 0.25s ease, background 0.25s ease",
                    display: "flex", flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                    e.currentTarget.style.background = "rgba(99,102,241,0.09)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, marginBottom: 18,
                    background: "rgba(99,102,241,0.14)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#a5b4fc",
                  }}>
                    {c.icon}
                  </div>

                  <div style={{
                    fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 700,
                    color: "#f8fafc", marginBottom: 5, letterSpacing: "-0.015em",
                  }}>
                    {t(`picker.${c.id}Label`)}
                  </div>
                  <div style={{
                    fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600,
                    color: "#818cf8", marginBottom: 10,
                  }}>
                    {t(`picker.${c.id}Line`)}
                  </div>
                  <div style={{
                    fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#94a3b8",
                    lineHeight: 1.6, flex: 1,
                  }}>
                    {t(`picker.${c.id}Detail`)}
                  </div>

                  <Swatches id={c.id} />

                  <div style={{
                    display: "flex", alignItems: "center", gap: 6, marginTop: 16,
                    fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700,
                    color: "#a5b4fc",
                  }}>
                    {t("picker.cta")} <FiArrowRight size={13} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <style>{`
            .ap-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
            }
            @media (max-width: 820px) {
              .ap-grid { grid-template-columns: 1fr; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AudiencePicker;
