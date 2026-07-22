import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CgFileDocument } from "react-icons/cg";
import { FiPlay } from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import AudienceSwitch from "../audience/AudienceSwitch";
import { useAudience } from "../audience/AudienceContext";
import LanguageSwitch from "../i18n/LanguageSwitch";
import { useLang } from "../i18n/LanguageContext";

const MotionLink = motion(Link);

// `key` maps to the audience visibility map — a nav item for a section the
// current audience doesn't render would scroll nowhere.
const NAV_ITEMS = [
  { tk: "nav.about", href: "#about", key: "about" },
  { tk: "nav.projects", href: "#projects", key: "projects" },
  { tk: "nav.agentStack", href: "#agent-stack", key: "agentStack" },
  { tk: "nav.experience", href: "#experience", key: "experience" },
  { tk: "nav.skills", href: "#skills", key: "skills" },
  { tk: "nav.articles", href: "#articles", key: "articles" },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { visible } = useAudience();
  const { t } = useLang();
  const navItems = NAV_ITEMS.filter((i) => visible[i.key]);
  // Section to scroll to once we're back on the home route.
  const pendingScroll = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // The sections only exist on "/", so a nav click from /resume has to land
  // there first and scroll afterwards.
  useEffect(() => {
    if (pathname !== "/" || !pendingScroll.current) return;
    const href = pendingScroll.current;
    pendingScroll.current = null;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [pathname]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      pendingScroll.current = href;
      navigate("/");
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled
            ? "var(--nav-bg)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            whileHover={{ scale: 1.02 }}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: "white", fontFamily: "Inter, sans-serif",
              boxShadow: "0 0 20px var(--accent-glow)",
            }}>BM</div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em" }}>
              Ben Mishali
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden-mobile">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                whileHover={{ color: "var(--accent-2)" }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--text-3)",
                  textDecoration: "none",
                  padding: "7px 10px",
                  whiteSpace: "nowrap",
                  borderRadius: 8,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => e.target.style.background = "var(--accent-soft)"}
                onMouseLeave={e => e.target.style.background = "transparent"}
              >
                {t(item.tk)}
              </motion.a>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginInlineStart: 6, marginInlineEnd: 2 }}>
              <AudienceSwitch />
              <LanguageSwitch />
            </div>
            <motion.a
              href="/sdd"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 12px", marginInlineStart: 6, whiteSpace: "nowrap",
                borderRadius: 10,
                fontSize: 13.5, fontWeight: 600, fontFamily: "Inter, sans-serif",
                color: "var(--accent-2)", textDecoration: "none",
                background: "var(--accent-mid)",
                border: "1px solid var(--accent-strong)",
              }}
            >
              <FiPlay size={12} /> {t("nav.liveDemo")}
            </motion.a>
            <MotionLink
              to="/resume"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                marginInlineStart: 6,
                whiteSpace: "nowrap",
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                color: "white",
                textDecoration: "none",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                boxShadow: "0 0 16px var(--accent-strong)",
              }}
            >
              <CgFileDocument size={15} /> {t("nav.resume")}
            </MotionLink>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{ background: "none", border: "none", color: "var(--text-3)", cursor: "pointer", padding: 4 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "16px 24px 24px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 16 }}>
              <div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700,
                  color: "var(--muted-2)", letterSpacing: "0.12em",
                  textTransform: "uppercase", marginBottom: 8,
                }}>
                  {t("nav.viewingAs")}
                </div>
                <AudienceSwitch compact />
              </div>
              <div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700,
                  color: "var(--muted-2)", letterSpacing: "0.12em",
                  textTransform: "uppercase", marginBottom: 8,
                }}>
                  {t("nav.language")}
                </div>
                <LanguageSwitch compact />
              </div>
            </div>
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--text-3)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {t(item.tk)}
              </motion.a>
            ))}
            <MotionLink
              to="/resume"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 16,
                padding: "10px 20px",
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                color: "white",
                textDecoration: "none",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              <CgFileDocument size={15} /> {t("nav.resume")}
            </MotionLink>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 940px) { .show-mobile { display: none !important; } }
        @media (max-width: 939px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </>
  );
}

export default NavBar;
