import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiTerminal, FiTrendingUp } from "react-icons/fi";
import { useAudience } from "./AudienceContext";

/** Compact three-way toggle for the navbar. Icon-only below the label breakpoint. */
const OPTIONS = [
  { id: "hr", icon: <FiUsers size={13} />, label: "HR" },
  { id: "tech", icon: <FiTerminal size={13} />, label: "Tech" },
  { id: "exec", icon: <FiTrendingUp size={13} />, label: "Exec" },
];

function AudienceSwitch({ compact = false }) {
  const { audience, setAudience } = useAudience();

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 2,
      padding: 3, borderRadius: 10,
      background: "var(--surface-2)",
      border: "1px solid var(--border-2)",
    }}>
      {OPTIONS.map((o) => {
        const on = audience === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setAudience(o.id)}
            title={`View as ${o.label}`}
            aria-pressed={on}
            style={{
              position: "relative",
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: compact ? "6px 10px" : "5px 11px",
              borderRadius: 8, border: "none", cursor: "pointer",
              background: "transparent",
              fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
              color: on ? "var(--on-accent)" : "var(--muted)",
              transition: "color 0.2s ease",
            }}
          >
            {on && (
              <motion.span
                layoutId="audience-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{
                  position: "absolute", inset: 0, borderRadius: 8,
                  background: "var(--accent)",
                  zIndex: 0,
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1, display: "flex" }}>{o.icon}</span>
            <span className="aud-label" style={{ position: "relative", zIndex: 1 }}>{o.label}</span>
          </button>
        );
      })}

      <style>{`
        @media (max-width: 1250px) { .aud-label { display: none; } }
      `}</style>
    </div>
  );
}

export default AudienceSwitch;
