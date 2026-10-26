import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Cookie,
  FileText,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const Route = createFileRoute("/privacyPolicy")({
  component: PrivacyPolicyPage,
});

type Lang = "en" | "fr";

const LANG_KEY = "miabe-lang";

/* =========================
   LANGUAGE SWITCHER
========================= */

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

/* =========================
   LANGUAGE HOOK
========================= */

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
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return [lang, setLang];
}

/* =========================
   TRANSLATIONS
========================= */

const T = {
  en: {
    platform: "Educational platform",

    backHome: "Back home",

    badge: "Privacy & data protection",

    title: "Privacy Policy",

    subtitle:
      "Your privacy and the protection of your personal data are important to MiabeClass.",

    lastUpdate: "Last updated: September 5, 2026",

    introTitle: "1. Introduction",

    intro1:
      "Welcome to MiabeClass. We place great importance on protecting your personal data. This privacy policy explains what information may be collected when you use our platform, why it is collected, and how it may be used.",

    intro2:
      "By using MiabeClass, you acknowledge the practices described in this policy, subject to the rights granted to you by applicable legislation.",

    collectedTitle: "2. Data we may collect",

    collectedIntro:
      "Depending on the features you use, MiabeClass may collect different categories of information:",

    accountData: "Account information:",
    accountText:
      "name, email address and other information necessary to create and manage your account.",

    usageData: "Usage data:",
    usageText:
      "pages viewed, courses accessed and interactions with the platform.",

    technicalData: "Technical data:",
    technicalText:
      "device type, browser, operating system and technical information required for the service to function.",

    messagesData: "Messages:",
    messagesText:
      "information you provide when using the contact form or communicating with our team.",

    usageTitle: "3. How do we use your data?",

    usageIntro: "The information collected may be used in particular to:",

    usage1: "create and manage your user account;",
    usage2: "allow you to access educational resources;",
    usage3: "improve the user experience;",
    usage4: "ensure the security and proper operation of the platform;",
    usage5: "respond to your support requests;",
    usage6: "detect and prevent fraudulent or abusive activities;",
    usage7: "analyze platform usage in order to improve it.",

    protectionTitle: "4. Protection of your data",

    protectionText:
      "MiabeClass implements reasonable technical and organizational measures designed to protect personal information against unauthorized access, loss, alteration or disclosure.",

    protectionHighlight:
      "Data security is an important part of the design and development of MiabeClass.",

    sharingTitle: "5. Data sharing",

    sharing1:
      "MiabeClass does not sell your personal data. However, certain information may be processed by technical service providers when necessary for the operation of certain services.",

    sharing2:
      "When necessary, we seek to limit the information shared to the data strictly required to provide the relevant service.",

    cookiesTitle: "6. Cookies and similar technologies",

    cookies1:
      "MiabeClass may use cookies or similar technologies to maintain certain features, remember preferences and improve the browsing experience.",

    cookies2:
      "Where required by applicable regulations, appropriate consent or preference-management mechanisms may be provided to users.",

    retentionTitle: "7. Data retention",

    retentionText:
      "We retain personal information for as long as necessary for the purposes for which it was collected, or for any period required by applicable legal obligations.",

    rightsTitle: "8. Your rights",

    rightsIntro:
      "Depending on applicable legislation, you may have various rights regarding your personal data, including:",

    right1: "request access to your data;",
    right2: "request correction of inaccurate information;",
    right3: "request deletion of certain data;",
    right4: "request restriction of certain processing activities;",
    right5: "object to certain processing activities where applicable.",

    rightsContact:
      "To exercise your rights or obtain further information, you can contact the MiabeClass team.",

    minorsTitle: "9. Protection of minors",

    minorsText:
      "As MiabeClass is an educational platform, certain features may be used by underage learners. When data relating to minors is processed, applicable legal requirements must be respected.",

    changesTitle: "10. Changes to this policy",

    changes1:
      "This privacy policy may be updated to reflect changes to MiabeClass, its features or applicable legal requirements.",

    changes2:
      "The last updated date displayed at the top of this page indicates the version currently published.",

    contactTitle: "11. Contact us",

    contactText:
      "For any questions regarding this privacy policy or the processing of your data, you can contact MiabeClass.",

    team: "MiabeClass Team",

    email: "Email",

    location: "Location",

    back: "Back to MiabeClass",

    footer: "© 2026 MiabeClass. Educational resources and digital learning.",
  },

  fr: {
    platform: "Plateforme éducative",

    backHome: "Retour à l'accueil",

    badge: "Confidentialité et protection des données",

    title: "Politique de confidentialité",

    subtitle:
      "Votre confidentialité et la protection de vos données personnelles sont importantes pour MiabeClass.",

    lastUpdate: "Dernière mise à jour : 5 septembre 2026",

    introTitle: "1. Introduction",

    intro1:
      "Bienvenue sur MiabeClass. Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique quelles informations peuvent être collectées lorsque vous utilisez notre plateforme, pourquoi elles sont collectées et comment elles peuvent être utilisées.",

    intro2:
      "En utilisant MiabeClass, vous acceptez les pratiques décrites dans cette politique, sous réserve des droits qui vous sont accordés par la législation applicable.",

    collectedTitle: "2. Données que nous pouvons collecter",

    collectedIntro:
      "Selon les fonctionnalités que vous utilisez, MiabeClass peut être amené à collecter différentes catégories d'informations :",

    accountData: "Informations de compte :",
    accountText:
      "nom, adresse email et autres informations nécessaires à la création et à la gestion de votre compte.",

    usageData: "Données d'utilisation :",
    usageText:
      "pages consultées, cours consultés et interactions avec la plateforme.",

    technicalData: "Données techniques :",
    technicalText:
      "type d'appareil, navigateur, système d'exploitation et informations techniques nécessaires au fonctionnement du service.",

    messagesData: "Messages :",
    messagesText:
      "informations que vous nous transmettez lorsque vous utilisez le formulaire de contact ou communiquez avec notre équipe.",

    usageTitle: "3. Comment utilisons-nous vos données ?",

    usageIntro:
      "Les informations collectées peuvent être utilisées notamment pour :",

    usage1: "créer et gérer votre compte utilisateur ;",
    usage2: "vous permettre d'accéder aux ressources pédagogiques ;",
    usage3: "améliorer l'expérience utilisateur ;",
    usage4: "assurer la sécurité et le bon fonctionnement de la plateforme ;",
    usage5: "répondre à vos demandes d'assistance ;",
    usage6: "détecter et prévenir les activités frauduleuses ou abusives ;",
    usage7: "analyser l'utilisation de la plateforme afin de l'améliorer.",

    protectionTitle: "4. Protection de vos données",

    protectionText:
      "MiabeClass met en œuvre des mesures techniques et organisationnelles raisonnables destinées à protéger les informations personnelles contre les accès non autorisés, la perte, la modification ou la divulgation.",

    protectionHighlight:
      "La sécurité des données constitue une partie importante de la conception et de l'évolution de MiabeClass.",

    sharingTitle: "5. Partage des données",

    sharing1:
      "MiabeClass ne vend pas vos données personnelles. Certaines informations peuvent toutefois être traitées par des prestataires techniques lorsque cela est nécessaire au fonctionnement de certains services.",

    sharing2:
      "Lorsque cela est nécessaire, nous cherchons à limiter les informations communiquées aux données strictement nécessaires à la réalisation du service concerné.",

    cookiesTitle: "6. Cookies et technologies similaires",

    cookies1:
      "MiabeClass peut utiliser des cookies ou des technologies similaires afin de maintenir certaines fonctionnalités, mémoriser des préférences et améliorer l'expérience de navigation.",

    cookies2:
      "Lorsque la réglementation applicable l'exige, les mécanismes appropriés de consentement ou de gestion des préférences pourront être proposés aux utilisateurs.",

    retentionTitle: "7. Conservation des données",

    retentionText:
      "Nous conservons les informations personnelles pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, ou pendant toute durée requise par les obligations légales applicables.",

    rightsTitle: "8. Vos droits",

    rightsIntro:
      "Selon la législation applicable, vous pouvez disposer de différents droits concernant vos données personnelles, notamment :",

    right1: "demander l'accès à vos données ;",
    right2: "demander la rectification d'informations incorrectes ;",
    right3: "demander la suppression de certaines données ;",
    right4: "demander la limitation de certains traitements ;",
    right5: "vous opposer à certains traitements lorsque cela est applicable.",

    rightsContact:
      "Pour exercer vos droits ou obtenir davantage d'informations, vous pouvez contacter l'équipe MiabeClass.",

    minorsTitle: "9. Protection des mineurs",

    minorsText:
      "MiabeClass étant une plateforme éducative, certaines fonctionnalités peuvent être utilisées par des apprenants mineurs. Lorsque des données concernant des mineurs sont traitées, les exigences légales applicables doivent être respectées.",

    changesTitle: "10. Modification de cette politique",

    changes1:
      "Cette politique de confidentialité peut être mise à jour afin de tenir compte de l'évolution de MiabeClass, de ses fonctionnalités ou des exigences légales applicables.",

    changes2:
      "La date de dernière mise à jour affichée en haut de cette page permet de connaître la version actuellement publiée.",

    contactTitle: "11. Nous contacter",

    contactText:
      "Pour toute question concernant cette politique de confidentialité ou le traitement de vos données, vous pouvez contacter MiabeClass.",

    team: "Équipe MiabeClass",

    email: "Email",

    location: "Localisation",

    back: "Retour à MiabeClass",

    footer:
      "© 2026 MiabeClass. Ressources pédagogiques et apprentissage numérique.",
  },
};

/* =========================
   PAGE
========================= */

function PrivacyPolicyPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];

  return (
    <main className="min-h-screen bg-slate-50 text-brand-secondary">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.png"
              alt="MiabeClass"
              className="h-10 w-auto object-contain"
            />

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-bold text-brand-secondary">
                MiabeClass
              </p>

              <p className="truncate text-xs text-brand-secondary/55">
                {t.platform}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <LangToggle lang={lang} setLang={setLang} />

            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-secondary transition hover:bg-slate-100 sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="border-b border-slate-200 bg-white px-6 py-14 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Lock className="h-4 w-4" />
            {t.badge}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-brand-secondary md:text-5xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-secondary/65">
            {t.subtitle}
          </p>

          <p className="mt-5 text-sm font-medium text-brand-secondary/50">
            {t.lastUpdate}
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Introduction */}
            <section className="p-6 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {t.introTitle}
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">{t.intro1}</p>

                  <p className="mt-4 leading-8 text-slate-600">{t.intro2}</p>
                </div>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Données collectées */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.collectedTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {t.collectedIntro}
              </p>

              <div className="mt-6 grid gap-4">
                <PrivacyItem title={t.accountData} text={t.accountText} />

                <PrivacyItem title={t.usageData} text={t.usageText} />

                <PrivacyItem title={t.technicalData} text={t.technicalText} />

                <PrivacyItem title={t.messagesData} text={t.messagesText} />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Utilisation */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.usageTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">{t.usageIntro}</p>

              <ul className="mt-6 space-y-3">
                {[
                  t.usage1,
                  t.usage2,
                  t.usage3,
                  t.usage4,
                  t.usage5,
                  t.usage6,
                  t.usage7,
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-slate-100" />

            {/* Protection */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.protectionTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {t.protectionText}
              </p>

              <div className="mt-6 flex gap-4 rounded-2xl bg-brand-primary/5 p-5">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand-primary" />

                <p className="font-medium leading-7 text-brand-secondary">
                  {t.protectionHighlight}
                </p>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Partage */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.sharingTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">{t.sharing1}</p>

              <p className="mt-4 leading-8 text-slate-600">{t.sharing2}</p>
            </section>

            <div className="border-t border-slate-100" />

            {/* Cookies */}
            <section className="p-6 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Cookie className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {t.cookiesTitle}
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">{t.cookies1}</p>

                  <p className="mt-4 leading-8 text-slate-600">{t.cookies2}</p>
                </div>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Conservation */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.retentionTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">{t.retentionText}</p>
            </section>

            <div className="border-t border-slate-100" />

            {/* Droits */}
            <section className="p-6 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <UserCheck className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {t.rightsTitle}
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">
                    {t.rightsIntro}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[t.right1, t.right2, t.right3, t.right4, t.right5].map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-slate-600"
                        >
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-primary" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>

                  <p className="mt-6 leading-8 text-slate-600">
                    {t.rightsContact}
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Mineurs */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.minorsTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">{t.minorsText}</p>
            </section>

            <div className="border-t border-slate-100" />

            {/* Modifications */}
            <section className="p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.changesTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">{t.changes1}</p>

              <p className="mt-4 leading-8 text-slate-600">{t.changes2}</p>
            </section>

            <div className="border-t border-slate-100" />

            {/* Contact */}
            <section className="bg-slate-50 p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.contactTitle}
              </h2>

              <p className="mt-4 leading-8 text-slate-600">{t.contactText}</p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-semibold text-slate-900">{t.team}</p>

                <p className="mt-2 text-slate-600">
                  {t.email}: miabeclasstg@gmail.com
                </p>

                <p className="mt-1 text-slate-600">{t.location}: Lomé, Togo</p>

                <Link
                  to="/contacts"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {lang === "fr" ? "Nous contacter" : "Contact us"}
                </Link>
              </div>
            </section>
          </article>

          {/* ================= BACK ================= */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-brand-primary transition hover:bg-brand-primary/5"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-brand-secondary/50">{t.footer}</p>
        </div>
      </footer>
    </main>
  );
}

/* =========================
   PRIVACY ITEM
========================= */

function PrivacyItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />

        <p className="leading-7 text-slate-600">
          <strong className="text-slate-900">{title}</strong> {text}
        </p>
      </div>
    </div>
  );
}
