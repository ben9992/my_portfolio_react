import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STRINGS } from "./strings";

export const LANGUAGES = {
  en: { id: "en", label: "EN", name: "English", dir: "ltr" },
  he: { id: "he", label: "עב", name: "עברית", dir: "rtl" },
};

const STORAGE_KEY = "bm.lang";
const DEFAULT_LANG = "en";

const LanguageContext = createContext(null);

function readStored() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v && LANGUAGES[v] ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

/** Walks a dotted path; falls back to English, then to the key itself. */
function lookup(lang, key) {
  const read = (dict) => key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), dict);
  const hit = read(STRINGS[lang]);
  if (hit !== undefined) return hit;
  const fallback = read(STRINGS[DEFAULT_LANG]);
  return fallback !== undefined ? fallback : key;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStored);
  const dir = LANGUAGES[lang].dir;

  const setLang = useCallback((id) => {
    if (!LANGUAGES[id]) return;
    setLangState(id);
    try { window.localStorage.setItem(STORAGE_KEY, id); } catch { /* non-fatal */ }
  }, []);

  // Direction and lang live on <html> so the whole document flips, including
  // scrollbars, text alignment and logical CSS properties.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo(() => ({
    lang,
    dir,
    isRTL: dir === "rtl",
    setLang,
    t: (key) => lookup(lang, key),
    /** Arrays come back whole — used for bullet lists. */
    tList: (key) => {
      const v = lookup(lang, key);
      return Array.isArray(v) ? v : [];
    },
  }), [lang, dir, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside a LanguageProvider");
  return ctx;
}
