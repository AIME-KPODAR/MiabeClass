import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, HelpCircle, Search } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

type Lang = "en" | "fr";

const LANG_KEY = "miabe-lang";

/* =========================================================
   LANGUAGE TOGGLE
   Même design que la page d'accueil
========================================================= */

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

/* =========================================================
   LANGUAGE HOOK
========================================================= */

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(LANG_KEY) as Lang | null)
        : null;

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

/* =========================================================
   FAQ TYPE
========================================================= */

type FAQ = {
  question: string;
  answer: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const T = {
  en: {
    learningPlatform: "LEARNING PLATFORM",

    backHome: "Back to home",

    badge: "HELP CENTER",

    title: "MiabeClass Help Center",

    subtitle:
      "Find quick answers to the most frequently asked questions about MiabeClass.",

    searchPlaceholder: "Search for a question...",

    faqTitle: "Frequently asked questions",

    faqSubtitle: "Click on a question to display the answer.",

    noResultTitle: "No question found",

    noResultText: "Try searching with another keyword.",

    contactTitle: "Can't find your answer?",

    contactText:
      "Our team is here to help. Contact us if you are experiencing a problem or have a question.",

    contactButton: "Contact MiabeClass",

    footer: "MiabeClass — Digital learning platform for students and teachers.",

    faqs: [
      {
        question: "What is MiabeClass?",
        answer:
          "MiabeClass is an educational platform designed to make courses, teaching materials and learning resources easier to access. It allows learners to access their content from different devices.",
      },
      {
        question: "How do I create a MiabeClass account?",
        answer:
          "To create an account, go to the registration page, enter the requested information and confirm your registration. You will then be able to access the features available on the platform.",
      },
      {
        question: "How can I access a course?",
        answer:
          "From your MiabeClass space, search for the course you are interested in or browse the different categories. Select the course to access its content.",
      },
      {
        question: "Can I access courses from my phone?",
        answer:
          "Yes. MiabeClass is designed to work on computers, tablets and smartphones. You can therefore access your learning resources from your preferred device.",
      },
      {
        question: "How can I search for a course or document?",
        answer:
          "Use the search bar available on the platform. Enter the course title, subject name or a keyword to quickly find the resource you are looking for.",
      },
      {
        question: "Can I access PDF learning materials?",
        answer:
          "Yes. When PDF materials are available for a course, you can open them directly from the platform to view the educational content.",
      },
      {
        question:
          "What should I do if I cannot find the course I am looking for?",
        answer:
          "First, check the spelling of your search and try different keywords. If the course is still unavailable, contact the MiabeClass team for assistance.",
      },
      {
        question: "What should I do if a resource does not open?",
        answer:
          "Check your Internet connection and try refreshing the page. If the problem persists, contact MiabeClass support and provide the name of the resource concerned.",
      },
      {
        question: "Are my personal data protected?",
        answer:
          "MiabeClass is designed to implement security measures intended to protect user data and limit unauthorized access.",
      },
      {
        question: "How can I contact MiabeClass?",
        answer:
          "If you need assistance or your question is not covered in this FAQ, use the contact options available on the platform to reach the MiabeClass team.",
      },
    ],
  },

  fr: {
    learningPlatform: "PLATEFORME D'APPRENTISSAGE",

    backHome: "Retour à l'accueil",

    badge: "CENTRE D'AIDE",

    title: "Centre d'aide MiabeClass",

    subtitle:
      "Retrouvez rapidement les réponses aux questions les plus fréquentes concernant MiabeClass.",

    searchPlaceholder: "Rechercher une question...",

    faqTitle: "Questions fréquentes",

    faqSubtitle: "Cliquez sur une question pour afficher la réponse.",

    noResultTitle: "Aucune question trouvée",

    noResultText: "Essayez avec un autre mot-clé.",

    contactTitle: "Vous ne trouvez pas votre réponse ?",

    contactText:
      "Notre équipe est là pour vous aider. Contactez-nous si vous rencontrez un problème ou si vous avez une question.",

    contactButton: "Contacter MiabeClass",

    footer:
      "MiabeClass — Plateforme d'apprentissage numérique pour les étudiants et les enseignants.",

    faqs: [
      {
        question: "Qu’est-ce que MiabeClass ?",
        answer:
          "MiabeClass est une plateforme éducative destinée à faciliter l’accès aux cours, supports pédagogiques et ressources d’apprentissage. Elle permet aux apprenants de consulter leurs contenus depuis différents appareils.",
      },
      {
        question: "Comment créer un compte MiabeClass ?",
        answer:
          "Pour créer un compte, rendez-vous sur la page d’inscription, renseignez les informations demandées puis validez votre inscription. Vous pourrez ensuite accéder aux fonctionnalités disponibles sur la plateforme.",
      },
      {
        question: "Comment accéder à un cours ?",
        answer:
          "Depuis votre espace MiabeClass, recherchez le cours qui vous intéresse ou parcourez les différentes catégories. Sélectionnez ensuite le cours pour consulter son contenu.",
      },
      {
        question: "Puis-je consulter les cours sur mon téléphone ?",
        answer:
          "Oui. MiabeClass est conçu pour être utilisé sur ordinateur, tablette et smartphone. Vous pouvez donc consulter vos ressources pédagogiques depuis votre appareil.",
      },
      {
        question: "Comment rechercher un cours ou un document ?",
        answer:
          "Utilisez la barre de recherche disponible sur la plateforme. Saisissez le titre du cours, le nom d’une matière ou un mot-clé afin de retrouver rapidement la ressource recherchée.",
      },
      {
        question: "Puis-je consulter les supports PDF ?",
        answer:
          "Oui. Lorsque des supports PDF sont disponibles pour un cours, vous pouvez les ouvrir directement depuis la plateforme afin de consulter le contenu pédagogique.",
      },
      {
        question: "Que faire si je ne trouve pas le cours que je recherche ?",
        answer:
          "Vérifiez d’abord l’orthographe de votre recherche et essayez différents mots-clés. Si le cours reste introuvable, vous pouvez contacter l’équipe MiabeClass afin de demander de l’aide.",
      },
      {
        question: "Que faire si une ressource ne s’ouvre pas ?",
        answer:
          "Vérifiez votre connexion Internet et essayez de recharger la page. Si le problème persiste, contactez le support MiabeClass en indiquant le nom de la ressource concernée.",
      },
      {
        question: "Mes données personnelles sont-elles protégées ?",
        answer:
          "MiabeClass doit mettre en place des mesures de sécurité permettant de protéger les données des utilisateurs et de limiter les accès non autorisés.",
      },
      {
        question: "Comment contacter MiabeClass ?",
        answer:
          "Si vous avez besoin d’assistance ou si votre question ne figure pas dans cette FAQ, utilisez les moyens de contact disponibles sur la plateforme pour joindre l’équipe MiabeClass.",
      },
    ],
  },
};

/* =========================================================
   FAQ PAGE
========================================================= */

function FAQPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredFAQs = t.faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-secondary">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-brand-secondary/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="MiabeClass"
              className="h-10 w-auto object-contain"
            />

            <div>
              <div className="text-lg font-black tracking-tight">
                MiabeClass
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-secondary/50">
                {t.learningPlatform}
              </div>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switch */}
            <LangToggle lang={lang} setLang={setLang} />

            {/* Back home */}
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg border border-brand-secondary/10 bg-white px-3 py-2 text-sm font-semibold text-brand-secondary transition hover:border-brand-primary/30 hover:text-brand-primary sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main>
        <section className="relative overflow-hidden border-b border-brand-secondary/10 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <HelpCircle className="h-8 w-8" />
              </div>

              {/* Badge */}
              <div className="mb-5 inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-bold tracking-widest text-brand-primary">
                {t.badge}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black tracking-tight text-brand-secondary sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-brand-secondary/60 sm:text-lg">
                {t.subtitle}
              </p>

              {/* Search */}
              <div className="mx-auto mt-9 max-w-2xl">
                <div className="flex items-center rounded-2xl border border-brand-secondary/10 bg-white p-2 shadow-lg">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center text-brand-secondary/40">
                    <Search className="h-5 w-5" />
                  </div>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setOpenIndex(null);
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent px-2 py-3 text-sm text-brand-secondary outline-none placeholder:text-brand-secondary/35 sm:text-base"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setOpenIndex(null);
                      }}
                      className="mr-2 rounded-lg px-3 py-2 text-xs font-bold text-brand-secondary/50 transition hover:bg-slate-100 hover:text-brand-secondary"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FAQ LIST
        =================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-brand-secondary sm:text-3xl">
              {t.faqTitle}
            </h2>

            <p className="mt-2 text-sm text-brand-secondary/55">
              {t.faqSubtitle}
            </p>
          </div>

          {filteredFAQs.length === 0 ? (
            /* No results */
            <div className="rounded-2xl border border-brand-secondary/10 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-brand-secondary">
                {t.noResultTitle}
              </h3>

              <p className="mt-2 text-sm text-brand-secondary/55">
                {t.noResultText}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                      isOpen
                        ? "border-brand-primary/30 shadow-md"
                        : "border-brand-secondary/10 shadow-sm hover:border-brand-primary/20"
                    }`}
                  >
                    {/* Question */}
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`font-bold transition-colors ${
                          isOpen ? "text-brand-primary" : "text-brand-secondary"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                          isOpen
                            ? "bg-brand-primary text-white"
                            : "bg-brand-primary/10 text-brand-primary"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {/* Answer */}
                    {isOpen && (
                      <div className="border-t border-brand-secondary/10 px-5 pb-6 pt-5 sm:px-6">
                        <p className="text-sm leading-7 text-brand-secondary/65 sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* =================================================
              CONTACT CTA
          ================================================= */}

          <div className="mt-14 overflow-hidden rounded-3xl bg-brand-primary p-8 text-white shadow-xl sm:p-10">
            <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <HelpCircle className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-black sm:text-3xl">
                  {t.contactTitle}
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
                  {t.contactText}
                </p>
              </div>

              <Link
                to="/contacts"
                className="inline-flex shrink-0 items-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-primary transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t.contactButton}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-brand-secondary/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-xs leading-5 text-brand-secondary/50">
            {t.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
