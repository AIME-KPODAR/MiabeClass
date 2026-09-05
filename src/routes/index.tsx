import { createFileRoute, Link } from "@tanstack/react-router";
import { Bold } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MiabeClass — Digital Education Platform for Modern Schools" },
      {
        name: "description",
        content:
          "MiabeClass unifies student, teacher, and parent workflows: enrollment, attendance, grades, coursework, messaging, analytics, and secure school fee payments.",
      },
    ],
  }),
});

type Lang = "en" | "fr";

const T = {
  en: {
    nav: {
      dashboard: "Dashboard",
      institutions: "Teacher",
      records: "Courses",
      fees: "Fee Management",
      notif: "Notifications",
    },
    hero: {
      school: "MiabeClass",
      term: "Academic Year 2023/2024 • Term 2",
      report: "New Enrollment Teacher",
      enroll: "New Enrollment Student",
    },
    stats: {
      students: "Total Students",
      teachers: "Teacher Attendance",
      stable: "Stable",
      fees: "Testimony",
      target: "72% Target",
      requests: "Open Requests",
      tickets: "Parent Tickets",
    },
    courses: {
      title: "Course Management & Materials",
      viewAll: "View All",
      resources: (n: number) => `${n} Resources`,
      materials: (n: number) => `${n} Materials`,
      live: "Live now",
      c1: {
        title: "Advanced Mathematics: Calculus III",
        meta: "Grade 12 • Dr. Sarah Jenkins",
      },
      c2: {
        title: "Quantum Physics Principles",
        meta: "Grade 11 • Prof. Marcus Aurel",
      },
      c3: {
        title: "World Literature: 19th Century",
        meta: "Grade 10 • Elena Rodriguez",
      },
      c4: {
        title: "Advanced Chimie",
        meta: "Grade 12 • Dr. TONE Jonas",
      },
      c5: {
        title: "Geometrics Principles",
        meta: "Troisième • Prof. KPODAR Aimé",
      },
    },
    analytics: {
      title: "Institutional Performance Analytics",
      performance: "Performance",
      attendance: "Attendance",
    },
    notices: {
      title: "Recent School Notices",
      urgent: "Urgent",
      urgentMsg: "Parent-Teacher Conference rescheduled for Friday, Oct 12.",
      event: "Event",
      eventMsg: "Annual Science Fair registration now open for Grades 6-12.",
      holiday: "Holiday",
      holidayMsg: "School will be closed for National Heritage Day.",
      broadcast: "Broadcasting System",
    },
    fees: {
      title: "Testimony Status",
      pending: "12,400 pending this month",
      tuition: "Courses Testimony - Leo Vance",
      library: "Library Testimony - Maya Ito",
      receipt: (n: string) => `Receipt n°${n}`,
    },
    quick: {
      library: "Digital Library",
      messaging: "Messaging",
      timetable: "Timetable",
      exams: "Exams",
    },
    footer: {
      copy: "© 2024 MiabeClass Digital Education Systems. All rights reserved.",
      privacy: "Privacy Policy",
      security: "Security Settings",
      status: "System Status",
      contact: "Contacts",
      support: "Supports",
      FAQ: "FAQ",
    },
  },
  fr: {
    nav: {
      dashboard: "Tableau de bord",
      institutions: "Enseignant(e)",
      records: "Cours",
      fees: "Gestion des frais",
      notif: "Notifications",
    },
    hero: {
      school: "MiabeClass",
      term: "Année scolaire 2023/2024 • Trimestre 2",
      report: "Nouvelle inscription Enseignant(e)",
      enroll: "Nouvelle inscription Elève",
    },
    stats: {
      students: "Total des élèves",
      teachers: "Présence enseignants",
      stable: "Stable",
      fees: "Témoignages",
      target: "72 % de l'objectif",
      requests: "Demandes ouvertes",
      tickets: "Tickets parents",
    },
    courses: {
      title: "Gestion des cours et supports",
      viewAll: "Tout voir",
      resources: (n: number) => `${n} ressources`,
      materials: (n: number) => `${n} supports`,
      live: "En direct",
      c1: {
        title: "Mathématiques avancées : Calcul III",
        meta: "Terminale • Dr Sarah Jenkins",
      },
      c2: {
        title: "Principes de physique quantique",
        meta: "Première • Pr Marcus Aurel",
      },
      c3: {
        title: "Littérature mondiale : XIXᵉ siècle",
        meta: "Seconde • Elena Rodriguez",
      },
      c4: {
        title: "Chimie Avancée ",
        meta: "Grade 12 • Dr. TONE Jonas",
      },
      c5: {
        title: "Principes Géométriques",
        meta: "Troisième • Prof. KPODAR Aimé",
      },
    },
    analytics: {
      title: "Analyses de performance de l'établissement",
      performance: "Performance",
      attendance: "Assiduité",
    },
    notices: {
      title: "Avis récents de l'école",
      urgent: "Urgent",
      urgentMsg: "Réunion parents-enseignants reportée au vendredi 12 octobre.",
      event: "Événement",
      eventMsg:
        "Inscriptions à la Foire annuelle des sciences ouvertes pour la 6ᵉ à la Terminale.",
      holiday: "Congé",
      holidayMsg: "L'école sera fermée pour la Journée du patrimoine national.",
      broadcast: "Système de diffusion",
    },
    fees: {
      title: "État des témoignages",
      pending: "12 400  en attente ce mois-ci",
      tuition: "Témoignage des coures - Leo Vance",
      library: "Témoignage de la bibliothèque - Maya Ito",
      receipt: (n: string) => `Reçu n°${n}`,
    },
    quick: {
      library: "Bibliothèque numérique",
      messaging: "Messagerie",
      timetable: "Emploi du temps",
      exams: "Examens",
    },
    footer: {
      copy: "© 2024 MiabeClass Systèmes d'Éducation Numérique. Tous droits réservés.",
      privacy: "Politique de confidentialité",
      security: "Paramètres de sécurité",
      status: "État du système",
      contact: "Contacts",
      support: "Supports",
      FAQ: "FAQ",
    },
  },
} as const;

function Stat({
  label,
  value,
  delta,
  deltaTone = "accent",
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone?: "accent" | "muted" | "amber";
}) {
  const toneClass =
    deltaTone === "accent"
      ? "text-brand-accent"
      : deltaTone === "amber"
        ? "text-amber-500"
        : "text-brand-secondary/60";
  return (
    <div className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">
        {label}
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-xs font-medium ${toneClass}`}>{delta}</span>
      </div>
    </div>
  );
}

function CourseRow({
  letter,
  color,
  title,
  meta,
  chips,
}: {
  letter: string;
  color: string;
  title: string;
  meta: string;
  chips: Array<{ label: string; tone?: "default" | "live" }>;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 py-4 sm:flex sm:items-center sm:gap-4 sm:px-6 sm:py-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}
      >
        <span className="text-lg font-bold sm:text-xl">{letter}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold">{title}</h3>
        <p className="truncate text-xs text-brand-secondary/60">{meta}</p>
      </div>
      <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:justify-end">
        {chips.map((c) => (
          <span
            key={c.label}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase whitespace-nowrap ${
              c.tone === "live"
                ? "bg-brand-accent/10 text-brand-accent"
                : "bg-slate-100 text-brand-secondary"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnalyticsChart() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full aspect-[21/9] rounded-xl bg-slate-50"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 120, 180, 240].map((y) => (
        <line
          key={y}
          x1="0"
          x2="800"
          y1={y}
          y2={y}
          stroke="#e2e8f0"
          strokeDasharray="4 6"
        />
      ))}
      <path
        d="M0,200 C80,180 140,120 220,140 C300,160 360,80 440,90 C520,100 580,60 660,70 C720,78 760,55 800,50 L800,300 L0,300 Z"
        fill="url(#g1)"
      />
      <path
        d="M0,200 C80,180 140,120 220,140 C300,160 360,80 440,90 C520,100 580,60 660,70 C720,78 760,55 800,50"
        fill="none"
        stroke="#4f46e5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M0,230 C90,220 160,190 240,200 C320,210 380,170 460,175 C540,180 600,150 680,145 C740,141 780,130 800,125 L800,300 L0,300 Z"
        fill="url(#g2)"
      />
      <path
        d="M0,230 C90,220 160,190 240,200 C320,210 380,170 460,175 C540,180 600,150 680,145 C740,141 780,130 800,125"
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuickLink({ letter, label }: { letter: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-secondary/5 bg-white p-4 text-center hover:border-brand-primary/20 transition-all cursor-pointer">
      <div className="h-10 w-10 rounded-full bg-slate-50 grid place-items-center mb-2 font-bold text-brand-primary">
        {letter}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tight">
        {label}
      </span>
    </div>
  );
}

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
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-md transition-all ${
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

type Theme = "light" | "dark";
const LANG_KEY = "miabe-lang";

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(LANG_KEY)) as Lang | null;
    if (stored === "en" || stored === "fr") setLang(stored);
  }, []);
  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);
  return [lang, setLang];
}

function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("miabe-theme")) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("miabe-theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-9 w-9 rounded-lg border border-brand-secondary/10 bg-white grid place-items-center text-brand-secondary hover:text-brand-primary transition-colors"
    >
      {isDark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function Index() {
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useTheme();
  const t = T[lang];

  return (
    <div className="min-h-screen bg-surface-bg font-sans text-brand-secondary">
      <nav className="sticky top-0 z-50 w-full border-b border-brand-secondary/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="MiabeClass logo"
              className="h-8 w-8 shrink-0 rounded-lg object-contain"
            />
            <span className="truncate font-display text-lg sm:text-xl font-bold tracking-tight text-brand-secondary">
              MiabeClass
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#dashboard" className="text-brand-primary">
              {t.nav.dashboard}
            </a>
            <a
              href="#courses"
              className="hover:text-brand-primary transition-colors"
            >
              {t.nav.institutions}
            </a>
            <a
              href="#analytics"
              className="hover:text-brand-primary transition-colors"
            >
              {t.nav.records}
            </a>
            <a
              href="#fees"
              className="hover:text-brand-primary transition-colors"
            >
              {t.nav.fees}
            </a>
            <a
              href="#notif"
              className="hover:text-brand-primary transition-colors"
            >
              {t.nav.notif}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <LangToggle lang={lang} setLang={setLang} />
            <div className="hidden sm:grid size-10 shrink-0 overflow-hidden rounded-full border border-brand-secondary/10 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 place-items-center font-display font-bold text-brand-secondary text-sm">
              MC
            </div>
          </div>
        </div>
      </nav>

      <main
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
        id="dashboard"
      >
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:mb-12">
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
              {t.hero.school}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-brand-secondary/60">
              {t.hero.term}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/newTeacherEnrollment"
              className="flex-1 sm:flex-none rounded-xl bg-white px-4 sm:px-5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-brand-secondary/10 hover:bg-slate-50 transition-all"
            >
              {t.hero.report}
            </Link>
            <Link
              to="/newStudentEnrollment"
              className="flex-1 sm:flex-none rounded-xl bg-brand-primary px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary/90 transition-all inline-flex items-center justify-center"
            >
              {t.hero.enroll}
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label={t.stats.students} value="1,284" delta="+4.2%" />
          <Stat label={t.stats.teachers} value="98.2%" delta={t.stats.stable} />
          <Stat
            label={t.stats.fees}
            value="42k"
            delta={t.stats.target}
            deltaTone="amber"
          />
          <Stat
            label={t.stats.requests}
            value="12"
            delta={t.stats.tickets}
            deltaTone="muted"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8" id="courses">
            <div className="rounded-2xl border border-brand-secondary/5 bg-white overflow-hidden shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-secondary/5 bg-slate-50/50 px-6 py-4">
                <h2 className="font-display font-bold">{t.courses.title}</h2>
                <a href="#" className="text-xs font-bold text-brand-primary">
                  {t.courses.viewAll}
                </a>
              </div>
              <div className="divide-y divide-brand-secondary/5">
                <CourseRow
                  letter="M"
                  color="bg-brand-primary/5 text-brand-primary"
                  title={t.courses.c1.title}
                  meta={t.courses.c1.meta}
                  chips={[
                    { label: t.courses.resources(3) },
                    { label: t.courses.live, tone: "live" },
                  ]}
                />
                <CourseRow
                  letter="P"
                  color="bg-amber-500/10 text-amber-600"
                  title={t.courses.c2.title}
                  meta={t.courses.c2.meta}
                  chips={[{ label: t.courses.materials(12) }]}
                />
                <CourseRow
                  letter="L"
                  color="bg-rose-500/10 text-rose-600"
                  title={t.courses.c3.title}
                  meta={t.courses.c3.meta}
                  chips={[{ label: t.courses.resources(8) }]}
                />
                <CourseRow
                  letter="C"
                  color="bg-yellow-500/10 text-yellow-600"
                  title={t.courses.c4.title}
                  meta={t.courses.c4.meta}
                  chips={[
                    { label: t.courses.resources(10) },
                    { label: t.courses.live, tone: "live" },
                  ]}
                />
                <CourseRow
                  letter="G"
                  color="bg-green-500/10 text-gris-600"
                  title={t.courses.c5.title}
                  meta={t.courses.c5.meta}
                  chips={[{ label: t.courses.resources(6) }]}
                />
              </div>
            </div>

            <div
              className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm"
              id="analytics"
            >
              <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-display font-bold">{t.analytics.title}</h2>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                    {t.analytics.performance}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                    {t.analytics.attendance}
                  </span>
                </div>
              </div>
              <AnalyticsChart />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-brand-secondary p-6 text-white">
              <h2 className="font-display text-lg font-bold">
                {t.notices.title}
              </h2>
              <div className="mt-6 space-y-4">
                <div className="border-l-2 border-brand-primary pl-4">
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                    {t.notices.urgent}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {t.notices.urgentMsg}
                  </p>
                </div>
                <div className="border-l-2 border-white/20 pl-4">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                    {t.notices.event}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {t.notices.eventMsg}
                  </p>
                </div>
                <div className="border-l-2 border-white/20 pl-4">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                    {t.notices.holiday}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {t.notices.holidayMsg}
                  </p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-xl bg-white/10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                {t.notices.broadcast}
              </button>
            </div>

            <div
              className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm"
              id="fees"
            >
              <h2 className="font-display font-bold">{t.fees.title}</h2>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative flex-1 h-2 rounded-full bg-slate-100">
                  <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-brand-accent" />
                </div>
                <span className="text-sm font-bold">72%</span>
              </div>
              <p className="mt-2 text-xs text-brand-secondary/60">
                {t.fees.pending}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-brand-secondary/5 p-3">
                  <div>
                    <p className="text-xs font-bold">{t.fees.tuition}</p>
                    <p className="text-[10px] text-brand-secondary/50">
                      {t.fees.receipt("8829")}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-accent">
                    +1,200k
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-brand-secondary/5 p-3">
                  <div>
                    <p className="text-xs font-bold">{t.fees.library}</p>
                    <p className="text-[10px] text-brand-secondary/50">
                      {t.fees.receipt("8830")}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-accent">
                    +1,500k
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <QuickLink letter="B" label={t.quick.library} />
              <QuickLink letter="M" label={t.quick.messaging} />
              <QuickLink letter="T" label={t.quick.timetable} />
              <QuickLink letter="E" label={t.quick.exams} />
            </div>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 border-t border-brand-secondary/5 text-brand-secondary/40 text-xs flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
        <p>{t.footer.copy}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-secondary">
            {t.footer.privacy}
          </a>
          <a href="#" className="hover:text-brand-secondary">
            {t.footer.security}
          </a>
          <a href="#" className="hover:text-brand-secondary">
            {t.footer.status}
          </a>
          <a href="#" className="hover:text-brand-secondary">
            {t.footer.contact}
          </a>
          <a href="#" className="hover:text-brand-secondary">
            {t.footer.support}
          </a>
          <a href="#" className="hover:text-brand-secondary">
            {t.footer.FAQ}
          </a>
        </div>
      </footer>
    </div>
  );
}
