import type { Lang } from "./prefs";

/** Texte simple ou bilingue (l'API peut renvoyer l'un ou l'autre). */
export type Loc = string | { en: string; fr: string };

export const loc = (v: Loc, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

const locale = (lang: Lang) => (lang === "fr" ? "fr-FR" : "en-US");

export const fmtNumber = (lang: Lang, n: number) =>
  new Intl.NumberFormat(locale(lang)).format(n);

export const fmtCompact = (lang: Lang, n: number) =>
  new Intl.NumberFormat(locale(lang), {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const fmtPercent = (lang: Lang, n: number, digits = 1) =>
  `${new Intl.NumberFormat(locale(lang), {
    maximumFractionDigits: digits,
  }).format(n)}${lang === "fr" ? " %" : "%"}`;

/** Montants en francs CFA (XOF). */
export const fmtMoney = (lang: Lang, n: number) =>
  new Intl.NumberFormat(locale(lang), {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtDate = (
  lang: Lang,
  iso: string,
  opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
) => new Date(iso).toLocaleDateString(locale(lang), opts);

export const fmtTime = (lang: Lang, iso: string) =>
  new Date(iso).toLocaleTimeString(locale(lang), {
    hour: "2-digit",
    minute: "2-digit",
  });

/** Nombre de jours (arrondi supérieur) entre maintenant et `iso`. */
export const daysUntil = (iso: string, now = new Date()) => {
  const a = new Date(iso);
  a.setHours(0, 0, 0, 0);
  const b = new Date(now);
  b.setHours(0, 0, 0, 0);
  return Math.round((a.getTime() - b.getTime()) / 86_400_000);
};

export const daysFromNow = (n: number, hour = 8, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

export const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
