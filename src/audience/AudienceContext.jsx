import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { THEMES, VISIBLE, AUDIENCES, DEFAULT_AUDIENCE } from "./themes";

const STORAGE_KEY = "bm.audience";
const AudienceContext = createContext(null);

function readStored() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v && AUDIENCES[v] ? v : null;
  } catch {
    return null; // private mode — fall through to the picker
  }
}

export function AudienceProvider({ children }) {
  // null means "not chosen yet", which is what opens the picker.
  const [chosen, setChosen] = useState(readStored);
  const active = chosen || DEFAULT_AUDIENCE;

  const setAudience = useCallback((id) => {
    if (!AUDIENCES[id]) return;
    setChosen(id);
    try { window.localStorage.setItem(STORAGE_KEY, id); } catch { /* non-fatal */ }
  }, []);

  // Paint tokens onto :root so inline styles and plain CSS both see them.
  useEffect(() => {
    const theme = THEMES[active];
    const root = document.documentElement;
    Object.entries(theme).forEach(([k, v]) => {
      if (k.startsWith("--")) root.style.setProperty(k, v);
    });
    root.style.colorScheme = theme.scheme;
    document.body.style.background = theme["--bg"];
  }, [active]);

  const value = useMemo(() => ({
    audience: active,
    hasChosen: Boolean(chosen),
    setAudience,
    visible: VISIBLE[active],
    isHR: active === "hr",
    isTech: active === "tech",
    isExec: active === "exec",
  }), [active, chosen, setAudience]);

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used inside an AudienceProvider");
  return ctx;
}

/** Pick the entry matching the active audience; `tech` is the fallback. */
export function useVariant(variants) {
  const { audience } = useAudience();
  return variants[audience] !== undefined ? variants[audience] : variants.tech;
}
