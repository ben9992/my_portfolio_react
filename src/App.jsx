import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Metrics from "./components/Metrics/Metrics";
import Projects from "./components/Projects/Projects";
import AgentStack from "./components/AgentStack/AgentStack";
import Experience from "./components/Experience/Experience";
import SkillsNew from "./components/Skills/SkillsNew";
import About, { Articles } from "./components/About/AboutNew";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";
import Resume from "./components/Resume/Resume";
import SddDemo from "./components/SDD/SddDemo";
import ScrollToTop from "./components/ScrollToTop";
import { AudienceProvider, useAudience } from "./audience/AudienceContext";
import AudiencePicker from "./audience/AudiencePicker";
import { LanguageProvider } from "./i18n/LanguageContext";

import "./App.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Preloader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#0a0a0f",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{
              width: 36, height: 36,
              borderRadius: "50%",
              border: "2px solid rgba(99,102,241,0.15)",
              borderTopColor: "#6366f1",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomePage() {
  // Which sections render is part of what choosing an audience decides.
  const { visible } = useAudience();
  return (
    <main>
      <Hero />
      {visible.about && <About />}
      {visible.metrics && <Metrics />}
      {visible.projects && <Projects />}
      {visible.agentStack && <AgentStack />}
      {visible.experience && <Experience />}
      {visible.skills && <SkillsNew />}
      {visible.articles && <Articles />}
      {visible.contact && <Contact />}
    </main>
  );
}

/**
 * The SDD demo is a full-screen app view with its own header, so it renders
 * without the site chrome.
 */
function Shell({ loading }) {
  const { pathname } = useLocation();
  const bare = pathname === "/sdd";

  return (
    <div className="App" id={loading ? "no-scroll" : "scroll"}>
      {!bare && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sdd" element={<SddDemo />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!bare && <Footer />}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <LanguageProvider>
      <AudienceProvider>
        <Router>
          <Preloader visible={loading} />
          {!loading && <AudiencePicker />}
          <Shell loading={loading} />
        </Router>
      </AudienceProvider>
    </LanguageProvider>
  );
}

export default App;
