import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/contacts")({
  component: ContactsPage,
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
   TRANSLATIONS
========================================================= */

const T = {
  en: {
    backHome: "Back to home",
    learnplatform: "LEARNING PLATFORM",

    badge: "CONTACT US",

    title: "We are here to help",
    subtitle:
      "Have a question, a suggestion or need assistance? Our team is available to help you.",

    contactTitle: "Contact information",
    contactSubtitle:
      "You can contact us directly using one of the methods below.",

    email: "Email",
    emailValue: "miabeclasstg@gmail.com",
    emailDescription: "Send us an email anytime",

    phone: "Phone",
    phoneValue: "+228 97 95 37 54",
    phoneDescription: "Monday to Friday",

    location: "Location",
    locationValue: "Lomé, Togo",
    locationDescription: "Our main location",

    hours: "Opening hours",
    hoursValue: "08h00 – 18h00",
    hoursDescription: "Monday to Saturday",

    formTitle: "Send us a message",
    formSubtitle:
      "Fill in the form below and our team will get back to you as soon as possible.",

    firstName: "First name",
    lastName: "Last name",
    emailAddress: "Email address",
    subject: "Subject",
    message: "Message",

    firstNamePlaceholder: "Your first name",
    lastNamePlaceholder: "Your last name",
    emailPlaceholder: "your@email.com",
    subjectPlaceholder: "How can we help you?",
    messagePlaceholder: "Write your message here...",

    sendMessage: "Send message",
    sending: "Sending...",

    required: "Please fill in all required fields.",

    success:
      "Your message has been sent successfully. We will get back to you soon.",

    faqTitle: "Looking for quick answers?",
    faqSubtitle: "Check our frequently asked questions before contacting us.",

    faqButton: "View FAQ",

    supportTitle: "Need technical support?",
    supportSubtitle:
      "If you are experiencing a problem with the MiabeClass platform, our support team can help you.",

    supportButton: "Get support",

    footer: "MiabeClass — Digital learning platform for students and teachers.",
  },

  fr: {
    backHome: "Retour à l'accueil",
    learnplatform: "PLATEFORME D'APPRENTISSAGE",

    badge: "CONTACTEZ-NOUS",

    title: "Nous sommes là pour vous aider",
    subtitle:
      "Une question, une suggestion ou besoin d'assistance ? Notre équipe est disponible pour vous aider.",

    contactTitle: "Informations de contact",
    contactSubtitle:
      "Vous pouvez nous contacter directement en utilisant l'un des moyens ci-dessous.",

    email: "E-mail",
    emailValue: "miabeclasstg@gmail.com",
    emailDescription: "Envoyez-nous un e-mail à tout moment",

    phone: "Téléphone",
    phoneValue: "+228 97 95 37 54",
    phoneDescription: "Du lundi au vendredi",

    location: "Localisation",
    locationValue: "Lomé, Togo",
    locationDescription: "Notre localisation principale",

    hours: "Heures d'ouverture",
    hoursValue: "08h00 – 18h00",
    hoursDescription: "Du lundi au samedi",

    formTitle: "Envoyez-nous un message",
    formSubtitle:
      "Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les meilleurs délais.",

    firstName: "Prénom",
    lastName: "Nom",
    emailAddress: "Adresse e-mail",
    subject: "Objet",
    message: "Message",

    firstNamePlaceholder: "Votre prénom",
    lastNamePlaceholder: "Votre nom",
    emailPlaceholder: "votre@email.com",
    subjectPlaceholder: "Comment pouvons-nous vous aider ?",
    messagePlaceholder: "Écrivez votre message ici...",

    sendMessage: "Envoyer le message",
    sending: "Envoi en cours...",

    required: "Veuillez remplir tous les champs obligatoires.",

    success:
      "Votre message a été envoyé avec succès. Nous vous répondrons bientôt.",

    faqTitle: "Vous cherchez une réponse rapide ?",
    faqSubtitle: "Consultez notre foire aux questions avant de nous contacter.",

    faqButton: "Consulter la FAQ",

    supportTitle: "Besoin d'assistance technique ?",
    supportSubtitle:
      "Si vous rencontrez un problème avec la plateforme MiabeClass, notre équipe d'assistance peut vous aider.",

    supportButton: "Obtenir de l'aide",

    footer:
      "MiabeClass — Plateforme d'apprentissage numérique pour les étudiants et les enseignants.",
  },
};

/* =========================================================
   CONTACT PAGE
========================================================= */

function ContactsPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert(t.required);
      return;
    }

    setSending(true);

    setTimeout(() => {
      setSending(false);

      alert(t.success);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
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
                {t.learnplatform}
              </div>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Même switch que la page d'accueil */}
            <LangToggle lang={lang} setLang={setLang} />

            {/* Back */}
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
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-bold tracking-widest text-brand-primary">
                {t.badge}
              </div>

              <h1 className="text-4xl font-black tracking-tight text-brand-secondary sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-brand-secondary/60 sm:text-lg">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTACT INFORMATION
        =================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-brand-secondary sm:text-3xl">
              {t.contactTitle}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-secondary/60">
              {t.contactSubtitle}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Email */}
            <a
              href="mailto:miabeclasstg@gmail.com"
              className="group rounded-2xl border border-brand-secondary/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                <Mail className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-brand-secondary">{t.email}</h3>

              <p className="mt-2 break-all text-sm font-semibold text-brand-primary">
                {t.emailValue}
              </p>

              <p className="mt-2 text-xs leading-5 text-brand-secondary/50">
                {t.emailDescription}
              </p>
            </a>

            {/* Phone */}
            <a
              href="tel:+22897953754"
              className="group rounded-2xl border border-brand-secondary/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                <Phone className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-brand-secondary">{t.phone}</h3>

              <p className="mt-2 text-sm font-semibold text-brand-primary">
                {t.phoneValue}
              </p>

              <p className="mt-2 text-xs leading-5 text-brand-secondary/50">
                {t.phoneDescription}
              </p>
            </a>

            {/* Location */}
            <div className="rounded-2xl border border-brand-secondary/10 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <MapPin className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-brand-secondary">{t.location}</h3>

              <p className="mt-2 text-sm font-semibold text-brand-primary">
                {t.locationValue}
              </p>

              <p className="mt-2 text-xs leading-5 text-brand-secondary/50">
                {t.locationDescription}
              </p>
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-brand-secondary/10 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Clock className="h-5 w-5" />
              </div>

              <h3 className="font-bold text-brand-secondary">{t.hours}</h3>

              <p className="mt-2 text-sm font-semibold text-brand-primary">
                {t.hoursValue}
              </p>

              <p className="mt-2 text-xs leading-5 text-brand-secondary/50">
                {t.hoursDescription}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            FORM + SIDE INFORMATION
        =================================================== */}

        <section className="border-y border-brand-secondary/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-20">
            {/* FORM */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-black text-brand-secondary sm:text-3xl">
                  {t.formTitle}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-secondary/60">
                  {t.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First name + Last name */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-bold text-brand-secondary"
                    >
                      {t.firstName}
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t.firstNamePlaceholder}
                      className="w-full rounded-xl border border-brand-secondary/15 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-brand-secondary/30 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-bold text-brand-secondary"
                    >
                      {t.lastName}
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t.lastNamePlaceholder}
                      className="w-full rounded-xl border border-brand-secondary/15 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-brand-secondary/30 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-brand-secondary"
                  >
                    {t.emailAddress}
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="w-full rounded-xl border border-brand-secondary/15 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-brand-secondary/30 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold text-brand-secondary"
                  >
                    {t.subject}
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.subjectPlaceholder}
                    className="w-full rounded-xl border border-brand-secondary/15 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-brand-secondary/30 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-brand-secondary"
                  >
                    {t.message}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows={6}
                    className="w-full resize-none rounded-xl border border-brand-secondary/15 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-brand-secondary/30 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Send className="h-4 w-4" />

                  {sending ? t.sending : t.sendMessage}
                </button>
              </form>
            </div>

            {/* SIDE CARD */}
            <div className="lg:pt-16">
              <div className="rounded-3xl bg-brand-primary p-7 text-white shadow-lg sm:p-9">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <MessageCircle className="h-7 w-7" />
                </div>

                <h3 className="text-2xl font-black">{t.supportTitle}</h3>

                <p className="mt-4 text-sm leading-7 text-white/75">
                  {t.supportSubtitle}
                </p>

                <a
                  href="mailto:miabeclasstg@gmail.com"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-primary transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Mail className="h-4 w-4" />
                  {t.supportButton}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FAQ CTA
        =================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand-secondary/10 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              <MessageCircle className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-2xl font-black text-brand-secondary sm:text-3xl">
              {t.faqTitle}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-brand-secondary/60">
              {t.faqSubtitle}
            </p>

            <Link
              to="/faq"
              className="mt-7 inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {t.faqButton}
            </Link>
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
