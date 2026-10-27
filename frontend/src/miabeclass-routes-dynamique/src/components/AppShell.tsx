import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { type ReactNode, useState } from "react";

import { type Lang, tr, usePrefs } from "../lib/prefs";
import { NotificationBell } from "./NotificationBell";

export const NAV = [
  { to: "/", en: "Dashboard", fr: "Tableau de bord" },
  { to: "/teachers", en: "Teachers", fr: "Enseignants" },
  { to: "/courses", en: "Courses", fr: "Cours" },
  { to: "/timetable", en: "Timetable", fr: "Emploi du temps" },
  { to: "/exams", en: "Exams", fr: "Examens" },
  { to: "/fees", en: "Fee Management", fr: "Gestion des frais" },
  { to: "/library", en: "Library", fr: "Bibliothèque" },
  { to: "/messaging", en: "Messaging", fr: "Messagerie" },
] as const;

function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-brand-secondary/10 bg-white p-0.5 text-[11px] font-bold uppercase tracking-wider">
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-md px-2.5 py-1 transition-all ${
            lang === l
              ? "bg-brand-primary text-white"
              : "text-brand-secondary/60 hover:text-brand-secondary"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

const linkBase = "transition-colors whitespace-nowrap";

/** Layout commun : barre de navigation (avec cloche), contenu, pied de page. */
export function AppShell({ children }: { children: ReactNode }) {
  const { lang, theme, setLang, setTheme } = usePrefs();
  const [menu, setMenu] = useState(false);
  const isDark = theme === "dark";

  const footer = {
    copy: tr(
      lang,
      `© ${new Date().getFullYear()} MiabeClass Digital Education Systems. All rights reserved.`,
      `© ${new Date().getFullYear()} MiabeClass Systèmes d'Éducation Numérique. Tous droits réservés.`,
    ),
    links: [
      { to: "/securitySettings", en: "Security Settings", fr: "Paramètres de sécurité" },
      { to: "/privacyPolicy", en: "Privacy Policy", fr: "Politique de confidentialité" },
      { to: "/systemStatus", en: "System Status", fr: "État du système" },
      { to: "/contacts", en: "Contacts", fr: "Contacts" },
      { to: "/supports", en: "Supports", fr: "Supports" },
      { to: "/faq", en: "FAQ", fr: "FAQ" },
    ] as const,
  };

  return (
    <div className="min-h-screen bg-surface-bg font-sans text-brand-secondary">
      <nav className="sticky top-0 z-50 w-full border-b border-brand-secondary/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="MiabeClass logo"
              className="h-8 w-8 shrink-0 rounded-lg object-contain"
            />
            <span className="truncate font-display text-lg font-bold tracking-tight text-brand-secondary sm:text-xl">
              MiabeClass
            </span>
          </Link>

          <div className="hidden items-center gap-5 text-[13px] font-medium xl:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className={`${linkBase} hover:text-brand-primary`}
                activeProps={{ className: `${linkBase} text-brand-primary` }}
              >
                {n[lang]}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <NotificationBell lang={lang} />
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={tr(
                lang,
                isDark ? "Switch to light mode" : "Switch to dark mode",
                isDark ? "Passer en mode clair" : "Passer en mode sombre",
              )}
              className="grid h-9 w-9 place-items-center rounded-lg border border-brand-secondary/10 bg-white text-brand-secondary transition-colors hover:text-brand-primary"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <LangToggle lang={lang} setLang={setLang} />
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-label="Menu"
              aria-expanded={menu}
              className="grid h-9 w-9 place-items-center rounded-lg border border-brand-secondary/10 bg-white text-brand-secondary xl:hidden"
            >
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menu && (
          <div className="border-t border-brand-secondary/5 bg-white xl:hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-4 sm:px-6">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMenu(false)}
                  activeOptions={{ exact: n.to === "/" }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-50"
                  activeProps={{
                    className:
                      "rounded-lg px-3 py-2.5 text-sm font-semibold bg-brand-primary/10 text-brand-primary",
                  }}
                >
                  {n[lang]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {children}

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-brand-secondary/5 px-4 py-10 text-center text-xs text-brand-secondary/40 sm:flex-row sm:px-6 sm:py-12 sm:text-left">
        <p>{footer.copy}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footer.links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-brand-secondary">
              {l[lang]}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

/** En-tête de page standard. */
export function PageHeader({
  title,
  subtitle,
  actions,
  live,
  lang,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** true = données de l'API, false = mode démo, undefined = ne rien afficher */
  live?: boolean;
  lang: Lang;
}) {
  return (
    <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-brand-secondary/60 sm:text-base">
            {subtitle}
          </p>
        )}
        {live === false && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {tr(
              lang,
              "Demo data — API unreachable",
              "Données de démonstration — API injoignable",
            )}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </section>
  );
}

export const card =
  "rounded-2xl border border-brand-secondary/5 bg-white shadow-sm";
export const inputCls =
  "w-full rounded-xl border border-brand-secondary/10 bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-brand-secondary/35 focus:border-brand-primary/40";
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-brand-secondary/10 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

export function Main({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {children}
    </main>
  );
}
