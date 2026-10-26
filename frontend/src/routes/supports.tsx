import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  BookOpen,
  FileText,
  GraduationCap,
  HardDrive,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/supports")({
  component: RouteComponent,
});

type Lang = "en" | "fr";

const LANG_KEY = "miabe-lang";

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

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = (
      typeof window !== "undefined"
        ? window.localStorage.getItem(LANG_KEY)
        : null
    ) as Lang | null;

    if (stored === "en" || stored === "fr") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_KEY, lang);
    }
  }, [lang]);

  return [lang, setLang];
}

type Support = {
  id: number;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  category: {
    en: string;
    fr: string;
  };
  categoryKey: string;
  type: string;
  size: string;
  icon:
    | "network"
    | "maintenance"
    | "computer"
    | "programming"
    | "embedded"
    | "exercise";
};

const supportsData: Support[] = [
  {
    id: 1,
    title: {
      en: "Introduction to Computer Networks",
      fr: "Introduction aux réseaux informatiques",
    },
    description: {
      en: "Course material covering networking basics, equipment and key networking concepts.",
      fr: "Support de cours présentant les bases des réseaux, les équipements et les principaux concepts.",
    },
    category: {
      en: "Networking",
      fr: "Réseaux",
    },
    categoryKey: "networking",
    type: "PDF",
    size: "2.4 MB",
    icon: "network",
  },
  {
    id: 2,
    title: {
      en: "Computer Maintenance",
      fr: "Maintenance informatique",
    },
    description: {
      en: "Practical guide covering computer diagnosis, maintenance and troubleshooting.",
      fr: "Guide pratique consacré au diagnostic, à l’entretien et au dépannage des ordinateurs.",
    },
    category: {
      en: "Maintenance",
      fr: "Maintenance",
    },
    categoryKey: "maintenance",
    type: "PDF",
    size: "3.1 MB",
    icon: "maintenance",
  },
  {
    id: 3,
    title: {
      en: "Computer Architecture",
      fr: "Architecture des ordinateurs",
    },
    description: {
      en: "Course covering hardware components, how they work and how they interact.",
      fr: "Cours sur les composants matériels, leur fonctionnement et leur interaction.",
    },
    category: {
      en: "Computer Science",
      fr: "Informatique",
    },
    categoryKey: "computer-science",
    type: "PDF",
    size: "4.2 MB",
    icon: "computer",
  },
  {
    id: 4,
    title: {
      en: "C Programming",
      fr: "Programmation en langage C",
    },
    description: {
      en: "Learning material for beginners who want to discover programming with C.",
      fr: "Support d’apprentissage destiné aux débutants souhaitant découvrir la programmation en C.",
    },
    category: {
      en: "Programming",
      fr: "Programmation",
    },
    categoryKey: "programming",
    type: "PDF",
    size: "2.8 MB",
    icon: "programming",
  },
  {
    id: 5,
    title: {
      en: "Embedded Systems and IoT",
      fr: "Systèmes embarqués et IoT",
    },
    description: {
      en: "Introduction to embedded systems, microcontrollers and the Internet of Things.",
      fr: "Introduction aux systèmes embarqués, aux microcontrôleurs et à l’Internet des objets.",
    },
    category: {
      en: "Embedded Systems",
      fr: "Systèmes embarqués",
    },
    categoryKey: "embedded",
    type: "PDF",
    size: "5.6 MB",
    icon: "embedded",
  },
  {
    id: 6,
    title: {
      en: "Networking Exercises",
      fr: "Exercices de réseaux",
    },
    description: {
      en: "A collection of exercises to strengthen knowledge of IP addressing and networking.",
      fr: "Série d’exercices permettant de renforcer les connaissances en adressage IP et réseaux.",
    },
    category: {
      en: "Networking",
      fr: "Réseaux",
    },
    categoryKey: "networking",
    type: "PDF",
    size: "1.8 MB",
    icon: "exercise",
  },
];

const translations = {
  en: {
    platform: "Educational platform",
    backHome: "Back to home",
    badge: "Learning resources",
    title: "Educational resources",
    subtitle:
      "Find courses, practical guides, exercises and learning resources available on MiabeClass.",
    available: "Available resources",
    supportCount: "resources available",
    searchPlaceholder: "Search for a resource...",
    all: "All",
    networking: "Networking",
    maintenance: "Maintenance",
    computerScience: "Computer Science",
    programming: "Programming",
    embedded: "Embedded Systems",
    resourcesTitle: "Available resources",
    found: "resource found",
    foundPlural: "resources found",
    noResultTitle: "No resource found",
    noResultText: "Try another keyword or select a different category.",
    reset: "Reset filters",
    consult: "View resource",
    download: "Download",
    fileType: "File type",
    size: "Size",
    learnTitle: "Learn at your own pace",
    learnText:
      "Use MiabeClass resources to deepen your knowledge, review your courses and prepare for your assessments.",
    help: "Need help?",
    footer: "Learn, practice and progress with MiabeClass.",
    copyright: "© 2026 MiabeClass. All rights reserved.",
    privacy: "Privacy",
    security: "Security",
    status: "System status",
    contact: "Contact",
    faq: "FAQ",
  },
  fr: {
    platform: "Plateforme éducative",
    backHome: "Retour à l’accueil",
    badge: "Ressources pédagogiques",
    title: "Supports pédagogiques",
    subtitle:
      "Retrouvez les cours, fiches, exercices et ressources pédagogiques disponibles sur MiabeClass.",
    available: "Supports disponibles",
    supportCount: "supports disponibles",
    searchPlaceholder: "Rechercher un support...",
    all: "Tous",
    networking: "Réseaux",
    maintenance: "Maintenance",
    computerScience: "Informatique",
    programming: "Programmation",
    embedded: "Systèmes embarqués",
    resourcesTitle: "Ressources disponibles",
    found: "support trouvé",
    foundPlural: "supports trouvés",
    noResultTitle: "Aucun support trouvé",
    noResultText:
      "Essayez un autre mot-clé ou sélectionnez une autre catégorie.",
    reset: "Réinitialiser les filtres",
    consult: "Consulter",
    download: "Télécharger",
    fileType: "Type de fichier",
    size: "Taille",
    learnTitle: "Apprenez à votre rythme",
    learnText:
      "Utilisez les supports MiabeClass pour approfondir vos connaissances, réviser vos cours et vous préparer à vos évaluations.",
    help: "Besoin d’aide ?",
    footer: "Apprenez, pratiquez et progressez avec MiabeClass.",
    copyright: "© 2026 MiabeClass. Tous droits réservés.",
    privacy: "Confidentialité",
    security: "Sécurité",
    status: "État du système",
    contact: "Contact",
    faq: "FAQ",
  },
};

function SupportIcon({ type }: { type: Support["icon"] }) {
  const iconClass = "h-7 w-7 text-brand-primary";

  switch (type) {
    case "network":
      return <GraduationCap className={iconClass} />;
    case "maintenance":
      return <HardDrive className={iconClass} />;
    case "computer":
      return <BookOpen className={iconClass} />;
    case "programming":
      return <FileText className={iconClass} />;
    case "embedded":
      return <HardDrive className={iconClass} />;
    case "exercise":
      return <FileText className={iconClass} />;
    default:
      return <BookOpen className={iconClass} />;
  }
}

function RouteComponent() {
  const [lang, setLang] = useLang();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const t = translations[lang];

  const categories = [
    { key: "all", label: t.all },
    { key: "networking", label: t.networking },
    { key: "maintenance", label: t.maintenance },
    { key: "computer-science", label: t.computerScience },
    { key: "programming", label: t.programming },
    { key: "embedded", label: t.embedded },
  ];

  const filteredSupports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return supportsData.filter((support) => {
      const title = support.title[lang].toLowerCase();
      const description = support.description[lang].toLowerCase();
      const categoryName = support.category[lang].toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch);

      const matchesCategory =
        category === "all" || support.categoryKey === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, lang]);

  return (
    <main className="min-h-screen bg-slate-50 text-brand-secondary">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-brand-secondary/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="MiabeClass"
              className="h-10 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-sm font-bold text-brand-secondary">
                MiabeClass
              </p>
              <p className="text-xs text-brand-secondary/50">{t.platform}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />

            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-secondary/70 transition hover:bg-slate-50 hover:text-brand-secondary sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/10 bg-brand-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <BookOpen className="h-4 w-4" />
              {t.badge}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-brand-secondary md:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-brand-secondary/60">
              {t.subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-brand-primary/30 focus-within:shadow-md">
              <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent px-3 py-3 text-brand-secondary outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((item) => {
              const active = category === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setCategory(item.key)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-brand-primary text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-brand-primary/30 hover:text-brand-primary"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Results heading */}
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-secondary">
                {t.resourcesTitle}
              </h2>

              <p className="mt-1 text-sm text-brand-secondary/50">
                {filteredSupports.length}{" "}
                {filteredSupports.length === 1 ? t.found : t.foundPlural}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-sm text-brand-secondary/40 sm:flex">
              <FileText className="h-4 w-4" />
              PDF
            </div>
          </div>

          {/* Results */}
          {filteredSupports.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-brand-secondary">
                {t.noResultTitle}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-brand-secondary/50">
                {t.noResultText}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="mt-6 rounded-xl bg-brand-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
              >
                {t.reset}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSupports.map((support) => (
                <article
                  key={support.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Card top */}
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <SupportIcon type={support.icon} />
                    </div>

                    <span className="rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs font-bold text-brand-primary">
                      {support.type}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                      {support.category[lang]}
                    </span>

                    <h3 className="mt-2 text-xl font-bold leading-7 text-brand-secondary">
                      {support.title[lang]}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-brand-secondary/55">
                      {support.description[lang]}
                    </p>

                    {/* File information */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-brand-secondary/40">
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {support.type}
                      </span>

                      <span>{support.size}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        {t.consult}
                      </button>

                      <button
                        type="button"
                        aria-label={t.download}
                        title={t.download}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-brand-secondary/60 transition hover:border-brand-primary/20 hover:bg-brand-primary/5 hover:text-brand-primary"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Information CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-brand-secondary p-8 text-white md:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <h2 className="text-2xl font-bold">{t.learnTitle}</h2>

                <p className="mt-2 leading-7 text-white/65">{t.learnText}</p>
              </div>

              <Link
                to="/faq"
                className="shrink-0 rounded-xl bg-white px-6 py-3 text-center font-semibold text-brand-secondary transition hover:bg-slate-100"
              >
                {t.help}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <img
                src="/logo.png"
                alt="MiabeClass"
                className="h-9 w-auto object-contain"
              />

              <p className="mt-3 max-w-xs text-sm leading-6 text-brand-secondary/50">
                {t.footer}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-brand-secondary/55">
              <Link
                to="/privacyPolicy"
                className="transition hover:text-brand-primary"
              >
                {t.privacy}
              </Link>

              <Link
                to="/securitySettings"
                className="transition hover:text-brand-primary"
              >
                {t.security}
              </Link>

              <Link
                to="/systemStatus"
                className="transition hover:text-brand-primary"
              >
                {t.status}
              </Link>

              <Link
                to="/contacts"
                className="transition hover:text-brand-primary"
              >
                {t.contact}
              </Link>

              <Link to="/faq" className="transition hover:text-brand-primary">
                {t.faq}
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-brand-secondary/40">
            {t.copyright}
          </div>
        </div>
      </footer>
    </main>
  );
}
