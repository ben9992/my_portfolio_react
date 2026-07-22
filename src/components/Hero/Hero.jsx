import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { SddLogo, ClaudeLogo, CursorLogo, McpLogo } from "../icons/AiLogos";
import mePhoto from "../../assets/avatar.png";
import resumePdf from "../../assets/Ben Mishali - EN 2026.pdf";
import { useAudience } from "../../audience/AudienceContext";
import { useLang } from "../../i18n/LanguageContext";

const AGENT_STACK = [
  { Logo: SddLogo, name: "SDD", color: "var(--accent-3)" },
  { Logo: ClaudeLogo, name: "Claude Code", color: "#d97757" },
  { Logo: CursorLogo, name: "Cursor", color: "var(--text-2)" },
  { Logo: McpLogo, name: "MCP", color: "#c084fc" },
];

/** Greets by the visitor's own clock, so it reads as written for them. */
function greetingKey(hour) {
  if (hour < 5) return "hero.night";
  if (hour < 12) return "hero.morning";
  if (hour < 18) return "hero.afternoon";
  return "hero.evening";
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Hero() {
  const canvasRef = useRef(null);
  // Computed once per mount — it must not change while someone is reading.
  const helloKey = useMemo(() => greetingKey(new Date().getHours()), []);
  const { visible } = useAudience();
  const { t, tList } = useLang();

  // Subtle animated grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gridSize = 60;
      // Canvas cannot resolve var(), so read the token off :root each frame —
      // that way the grid re-colours when the audience theme changes.
      const css = getComputedStyle(document.documentElement);
      const gridColor = css.getPropertyValue("--grid").trim() || "rgba(99,102,241,0.06)";
      const dotColor = css.getPropertyValue("--accent").trim() || "#6366f1";
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      // Floating dots
      const dots = [
        { x: 0.15, y: 0.3, r: 1.5 }, { x: 0.7, y: 0.15, r: 2 },
        { x: 0.85, y: 0.6, r: 1.5 }, { x: 0.35, y: 0.75, r: 1 },
        { x: 0.55, y: 0.45, r: 2.5 }, { x: 0.92, y: 0.35, r: 1 },
        { x: 0.08, y: 0.65, r: 1.5 }, { x: 0.45, y: 0.1, r: 1 },
      ];
      dots.forEach((d, i) => {
        const pulse = Math.sin(t * 0.02 + i * 0.8) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(d.x * canvas.width, d.y * canvas.height, d.r, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2 + pulse * 0.4;
        ctx.fillStyle = dotColor;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  // Never scroll to a section the current audience does not render — pick the
  // first target that is actually on the page.
  const PRIMARY_CTA = [
    { key: "projects", href: "#projects", tk: "hero.viewProjects" },
    { key: "experience", href: "#experience", tk: "hero.viewExperience" },
    { key: "about", href: "#about", tk: "hero.learnMore" },
  ];
  const primary = PRIMARY_CTA.find((c) => visible[c.key]) || PRIMARY_CTA[2];

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // A missing target means a visibility rule changed without this link
    // following it — loud in dev, harmless in production.
    else if (process.env.NODE_ENV !== "production") {
      console.warn(`[Hero] scroll target ${id} is not rendered for this audience`);
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "-20%", left: "50%",
        transform: "translateX(-50%)",
        width: "80vw", height: "60vh",
        background: "radial-gradient(ellipse, var(--halo) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "120px 24px 80px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>

          {/* Left: content */}
          <div style={{ flex: "1 1 480px", minWidth: 0 }}>
            {/* Status badge */}
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" animate="show"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28 }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 14px",
                borderRadius: 100,
                background: "var(--accent-mid)",
                border: "1px solid var(--accent-strong)",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                color: "var(--accent-2)",
                letterSpacing: "0.02em",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 6px rgba(74,222,128,0.8)",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
                {t("hero.badge")}
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              variants={fadeUp} custom={0.8} initial="hidden" animate="show"
              style={{
                display: "flex", alignItems: "center", gap: 9, marginBottom: 10,
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                fontWeight: 500,
                color: "var(--text-3)",
              }}
            >
              <motion.span
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.6, delay: 1, repeat: Infinity, repeatDelay: 4 }}
                style={{ display: "inline-block", transformOrigin: "70% 70%", fontSize: "1.15em" }}
                role="img"
                aria-label="waving hand"
              >
                👋
              </motion.span>
              {t(helloKey)} {t("hero.greetingTail")}
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="show"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              {t("hero.name")}
            </motion.h1>
            <motion.h1
              variants={fadeUp} custom={1.5} initial="hidden" animate="show"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 24,
                background: "linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 50%, var(--accent-3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("hero.title")}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="show"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--text-3)",
                maxWidth: 520,
                marginBottom: 40,
              }}
            >
              {t("hero.blurb")}
            </motion.p>

            {/* Tags */}
            <motion.div
              variants={fadeUp} custom={2.5} initial="hidden" animate="show"
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}
            >
              {tList("hero.tags").map((tag) => (
                <span key={tag} style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                  color: "var(--muted)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-2)",
                }}>{tag}</span>
              ))}
            </motion.div>

            {/* Agent stack strip */}
            <motion.div
              variants={fadeUp} custom={2.8} initial="hidden" animate="show"
              style={{
                display: "flex", alignItems: "center", flexWrap: "wrap", gap: 14,
                padding: "12px 16px",
                marginBottom: 36,
                borderRadius: 12,
                width: "fit-content",
                background: "var(--surface)",
                border: "1px solid var(--border-2)",
              }}
            >
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600,
                color: "var(--muted-2)", letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                {t("hero.agentStack")}
              </span>
              <div style={{ width: 1, height: 18, background: "var(--border-2)" }} />
              {AGENT_STACK.map(({ Logo, name, color }) => (
                <motion.div
                  key={name}
                  whileHover={{ y: -2, scale: 1.04 }}
                  title={name}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    color,
                    cursor: "default",
                  }}
                >
                  <Logo size={17} />
                  <span style={{
                    fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-3)",
                    whiteSpace: "nowrap",
                  }}>
                    {name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate="show"
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px var(--accent-glow)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection(primary.href)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 26px",
                  borderRadius: 12,
                  fontSize: 14, fontWeight: 600, fontFamily: "Inter, sans-serif",
                  color: "white", border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  boxShadow: "0 0 20px var(--accent-strong), 0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                {t(primary.tk)} <FiArrowRight size={15} />
              </motion.button>

              <motion.a
                href={resumePdf}
                download="Ben Mishali - EN 2026.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 26px",
                  borderRadius: 12,
                  fontSize: 14, fontWeight: 600, fontFamily: "Inter, sans-serif",
                  color: "var(--text-3)", textDecoration: "none",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--accent-glow)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.borderColor = "var(--border-3)"; }}
              >
                <FiDownload size={15} /> {t("hero.downloadResume")}
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("#contact")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 26px",
                  borderRadius: 12,
                  fontSize: 14, fontWeight: 600, fontFamily: "Inter, sans-serif",
                  color: "var(--text-3)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-3)",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--accent-glow)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.borderColor = "var(--border-3)"; }}
              >
                <FiMail size={15} /> {t("hero.contactMe")}
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp} custom={3.5} initial="hidden" animate="show"
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              <span style={{ fontSize: 12, fontFamily: "Inter, sans-serif", color: "var(--muted-2)", fontWeight: 500 }}>
                {t("hero.findMe")}
              </span>
              <div style={{ width: 1, height: 16, background: "var(--border-3)" }} />
              {[
                { icon: <SiLinkedin size={17} />, href: "https://www.linkedin.com/in/ben-mishali/", label: "LinkedIn" },
                { icon: <SiGithub size={17} />, href: "https://github.com/ben9992", label: "GitHub" },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, color: "var(--accent-2)" }}
                  aria-label={label}
                  style={{
                    color: "var(--muted-2)",
                    transition: "color 0.2s ease",
                    display: "flex",
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: "0 0 auto", position: "relative" }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: "absolute",
              inset: -2,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(167,139,250,0.3), var(--accent-mid))",
              zIndex: 0,
              animation: "spin 8s linear infinite",
            }} />
            {/* Inner mask */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: 280,
              height: 280,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid var(--bg)",
            }}>
              {/* A background rather than an <img> so the crop can be zoomed
                  onto the face — matches the framing used on the PDF CV. */}
              <div
                role="img"
                aria-label="Ben Mishali — VP of R&D"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fff",
                  backgroundImage: `url(${mePhoto})`,
                  backgroundSize: "215%",
                  backgroundPosition: "50% 9%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            {/* Floating badge - experience */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                position: "absolute",
                bottom: 20, insetInlineEnd: -20,
                background: "var(--nav-bg)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-3)",
                borderRadius: 12,
                padding: "10px 16px",
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Inter, sans-serif", color: "var(--accent-2)", lineHeight: 1 }}>9+</div>
              <div style={{ fontSize: 11, fontWeight: 500, fontFamily: "Inter, sans-serif", color: "var(--muted)", marginTop: 2 }}>{t("hero.yearsExp")}</div>
            </motion.div>

            {/* Floating badge - team size */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{
                position: "absolute",
                top: 30, insetInlineStart: -20,
                background: "var(--nav-bg)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-3)",
                borderRadius: 12,
                padding: "10px 16px",
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Inter, sans-serif", color: "#4ade80", lineHeight: 1 }}>40+</div>
              <div style={{ fontSize: 11, fontWeight: 500, fontFamily: "Inter, sans-serif", color: "var(--muted)", marginTop: 2 }}>{t("hero.personRnd")}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
        }}
        onClick={() => scrollToSection("#metrics")}
      >
        <span style={{ fontSize: 11, fontFamily: "Inter, sans-serif", color: "var(--muted-2)", letterSpacing: "0.1em", fontWeight: 500 }}>
          {t("hero.scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            width: 20, height: 32,
            border: "1.5px solid var(--border-3)",
            borderRadius: 10,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 5,
          }}
        >
          <div style={{
            width: 3, height: 6,
            background: "var(--accent)",
            borderRadius: 3,
          }} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default Hero;
