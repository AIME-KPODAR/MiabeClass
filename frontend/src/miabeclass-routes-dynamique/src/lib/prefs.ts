import { useEffect, useSyncExternalStore } from "react";

export type Lang = "en" | "fr";
export type Theme = "light" | "dark";

const LANG_KEY = "miabe-lang";
const THEME_KEY = "miabe-theme";

type State = { lang: Lang; theme: Theme };

const SERVER: State = { lang: "en", theme: "light" };
let state: State = SERVER;
let inited = false;
const subs = new Set<() => void>();

function emit() {
  subs.forEach((f) => f());
}

function applyTheme() {
  document.documentElement.classList.toggle("dark", state.theme === "dark");
}

function init() {
  if (inited || typeof window === "undefined") return;
  inited = true;
  try {
    const l = window.localStorage.getItem(LANG_KEY);
    const th = window.localStorage.getItem(THEME_KEY);
    state = {
      lang: l === "fr" || l === "en" ? l : "en",
      theme:
        th === "dark" || th === "light"
          ? th
          : window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
    };
  } catch {
    /* localStorage indisponible : on garde les valeurs par défaut */
  }
  applyTheme();
  emit();
}

function persist() {
  try {
    window.localStorage.setItem(LANG_KEY, state.lang);
    window.localStorage.setItem(THEME_KEY, state.theme);
  } catch {
    /* ignore */
  }
}

/** Langue + thème partagés par toutes les pages (même clés que l'existant). */
export function usePrefs() {
  useEffect(init, []);
  const s = useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => state,
    () => SERVER,
  );
  return {
    lang: s.lang,
    theme: s.theme,
    setLang: (lang: Lang) => {
      state = { ...state, lang };
      persist();
      emit();
    },
    setTheme: (theme: Theme) => {
      state = { ...state, theme };
      applyTheme();
      persist();
      emit();
    },
  };
}

/** Petit helper de traduction en ligne. */
export const tr = (lang: Lang, en: string, fr: string) =>
  lang === "fr" ? fr : en;
