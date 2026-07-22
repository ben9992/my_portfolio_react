import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";

// Values live here; labels and descriptions come from the string catalogue.
const METRICS = [
  { value: 40, suffix: "+" },
  { value: 7, suffix: "" },
  { value: 9, suffix: "+" },
  { value: 2, suffix: "" },
  { value: 9, suffix: "" },
  { value: 4, suffix: "" },
];

function Counter({ value, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span style={{
      fontFamily: "Inter, sans-serif",
      fontSize: "clamp(2rem, 4vw, 2.75rem)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      background: "linear-gradient(135deg, var(--accent-2), var(--accent))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {count}{suffix}
    </span>
  );
}

function Metrics() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="metrics"
      ref={ref}
      style={{
        background: "var(--bg)",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top separator line */}
      <div style={{
        position: "absolute",
        top: 0, left: "10%", right: "10%",
        height: 1,
        background: "linear-gradient(90deg, transparent, var(--accent-strong), transparent)",
      }} />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px",
            borderRadius: 100,
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-strong)",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            color: "var(--accent-2)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            {t("metrics.eyebrow")}
          </div>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--text)",
          }}>
            {t("metrics.title")}
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 1,
          background: "var(--border)",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}>
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: "var(--bg)",
                padding: "40px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                transition: "background 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
            >
              {/* Top accent line on hover */}
              <div style={{
                position: "absolute",
                top: 0, left: "20%", right: "20%",
                height: 2,
                background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)",
                borderRadius: 1,
              }} />

              <Counter value={metric.value} suffix={metric.suffix} inView={isInView} />

              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-2)",
                marginTop: 8,
                marginBottom: 6,
              }}>
                {t(`metrics.items.${i}.label`)}
              </div>
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                color: "var(--muted-2)",
                lineHeight: 1.5,
              }}>
                {t(`metrics.items.${i}.desc`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "10%", right: "10%",
        height: 1,
        background: "linear-gradient(90deg, transparent, var(--accent-strong), transparent)",
      }} />
    </section>
  );
}

export default Metrics;
