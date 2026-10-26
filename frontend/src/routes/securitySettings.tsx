import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  KeyRound,
  Laptop,
  Lightbulb,
  LogOut,
  Lock,
  Monitor,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const Route = createFileRoute("/securitySettings")({
  component: SecuritySettingsPage,
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

/* =========================
   LANGUAGE
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

    badge: "Account security",
    title: "Security Settings",
    subtitle:
      "Protect your MiabeClass account and manage your security preferences.",

    accountTitle: "Account security",
    accountDescription:
      "Manage the main security options associated with your account.",

    passwordTitle: "Password",
    passwordDescription:
      "Use a strong and unique password to protect your account.",
    change: "Change",

    currentPassword: "Current password",
    currentPasswordPlaceholder: "Enter your current password",

    newPassword: "New password",
    newPasswordPlaceholder: "Enter your new password",

    confirmPassword: "Confirm new password",
    confirmPasswordPlaceholder: "Confirm your new password",

    savePassword: "Save password",
    cancel: "Cancel",

    twoFactorTitle: "Two-factor authentication",
    twoFactorDescription:
      "Add an additional layer of security when signing in to your account.",
    enabled: "Enabled",
    disabled: "Disabled",
    activate: "Enable",
    deactivate: "Disable",

    alertsTitle: "Security alerts",
    alertsDescription:
      "Receive notifications when unusual activity is detected on your account.",

    sessionsTitle: "Sessions and devices",
    sessionsDescription:
      "Review the devices that are currently connected to your account.",

    currentDevice: "Current computer",
    currentSession: "Current session",
    browser: "Web browser",
    currentDeviceText: "This is the device you are currently using.",
    recentActivity: "Recent activity",

    mobileDevice: "Mobile device",
    mobileApp: "MiabeClass mobile application",
    lastActivity: "Last activity: recently",
    disconnect: "Disconnect",

    disconnectAllTitle: "Sign out of all devices",
    disconnectAllDescription:
      "This will sign out your account from all currently connected devices, except the current session when applicable.",
    disconnectAll: "Sign out all devices",

    tipsTitle: "Tips to protect your account",
    tip1: "Use a unique and strong password.",
    tip2: "Never share your password with anyone.",
    tip3: "Enable two-factor authentication.",
    tip4: "Sign out of devices you do not recognize.",
    tip5: "Avoid signing in from public or shared computers.",

    securityMessageTitle: "Keep your account secure",
    securityMessage:
      "Review your security settings regularly and make sure you recognize all active sessions.",

    footer: "© 2026 MiabeClass. Educational resources and digital learning.",
  },

  fr: {
    platform: "Plateforme éducative",
    backHome: "Retour à l'accueil",

    badge: "Sécurité du compte",
    title: "Paramètres de sécurité",
    subtitle:
      "Protégez votre compte MiabeClass et gérez vos préférences de sécurité.",

    accountTitle: "Sécurité du compte",
    accountDescription:
      "Gérez les principales options de sécurité associées à votre compte.",

    passwordTitle: "Mot de passe",
    passwordDescription:
      "Utilisez un mot de passe fort et unique pour protéger votre compte.",
    change: "Modifier",

    currentPassword: "Mot de passe actuel",
    currentPasswordPlaceholder: "Saisissez votre mot de passe actuel",

    newPassword: "Nouveau mot de passe",
    newPasswordPlaceholder: "Saisissez votre nouveau mot de passe",

    confirmPassword: "Confirmer le nouveau mot de passe",
    confirmPasswordPlaceholder: "Confirmez votre nouveau mot de passe",

    savePassword: "Enregistrer le mot de passe",
    cancel: "Annuler",

    twoFactorTitle: "Authentification à deux facteurs",
    twoFactorDescription:
      "Ajoutez une couche de sécurité supplémentaire lors de la connexion à votre compte.",
    enabled: "Activée",
    disabled: "Désactivée",
    activate: "Activer",
    deactivate: "Désactiver",

    alertsTitle: "Alertes de sécurité",
    alertsDescription:
      "Recevez une notification lorsqu'une activité inhabituelle est détectée sur votre compte.",

    sessionsTitle: "Sessions et appareils",
    sessionsDescription:
      "Consultez les appareils actuellement connectés à votre compte.",

    currentDevice: "Ordinateur actuel",
    currentSession: "Session actuelle",
    browser: "Navigateur Web",
    currentDeviceText:
      "Il s'agit de l'appareil que vous utilisez actuellement.",
    recentActivity: "Activité récente",

    mobileDevice: "Appareil mobile",
    mobileApp: "Application mobile MiabeClass",
    lastActivity: "Dernière activité : récemment",
    disconnect: "Déconnecter",

    disconnectAllTitle: "Déconnecter tous les appareils",
    disconnectAllDescription:
      "Cette action déconnectera votre compte de tous les appareils actuellement connectés, sauf la session actuelle lorsque cela est applicable.",
    disconnectAll: "Tout déconnecter",

    tipsTitle: "Conseils pour protéger votre compte",
    tip1: "Utilisez un mot de passe unique et sécurisé.",
    tip2: "Ne partagez jamais votre mot de passe.",
    tip3: "Activez l'authentification à deux facteurs.",
    tip4: "Déconnectez les appareils que vous ne reconnaissez pas.",
    tip5: "Évitez de vous connecter depuis des ordinateurs publics ou partagés.",

    securityMessageTitle: "Protégez votre compte",
    securityMessage:
      "Vérifiez régulièrement vos paramètres de sécurité et assurez-vous de reconnaître toutes les sessions actives.",

    footer:
      "© 2026 MiabeClass. Ressources pédagogiques et apprentissage numérique.",
  },
};

/* =========================
   PAGE
========================= */

function SecuritySettingsPage() {
  const [lang, setLang] = useLang();
  const t = T[lang];

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityAlertsEnabled, setSecurityAlertsEnabled] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

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
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* ================= ACCOUNT SECURITY ================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {t.accountTitle}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.accountDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

            <div className="flex flex-col gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <KeyRound className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {t.passwordTitle}
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {t.passwordDescription}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="shrink-0 rounded-xl bg-brand-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
              >
                {showPasswordForm ? t.cancel : t.change}
              </button>
            </div>

            {/* ================= PASSWORD FORM ================= */}

            {showPasswordForm && (
              <div className="border-b border-slate-100 bg-slate-50 p-6 md:p-7">
                <div className="max-w-xl space-y-5">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {t.currentPassword}
                    </label>

                    <input
                      id="currentPassword"
                      type="password"
                      placeholder={t.currentPasswordPlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {t.newPassword}
                    </label>

                    <input
                      id="newPassword"
                      type="password"
                      placeholder={t.newPasswordPlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {t.confirmPassword}
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder={t.confirmPasswordPlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    />
                  </div>

                  <button
                    type="button"
                    className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-800"
                  >
                    {t.savePassword}
                  </button>
                </div>
              </div>
            )}

            {/* ================= TWO FACTOR ================= */}

            <div className="flex flex-col gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Lock className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {t.twoFactorTitle}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        twoFactorEnabled
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {twoFactorEnabled ? t.enabled : t.disabled}
                    </span>
                  </div>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {t.twoFactorDescription}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`shrink-0 rounded-xl px-5 py-2.5 font-semibold transition ${
                  twoFactorEnabled
                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {twoFactorEnabled ? t.deactivate : t.activate}
              </button>
            </div>

            {/* ================= SECURITY ALERTS ================= */}

            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Bell className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {t.alertsTitle}
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {t.alertsDescription}
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={securityAlertsEnabled}
                onClick={() => setSecurityAlertsEnabled(!securityAlertsEnabled)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  securityAlertsEnabled ? "bg-brand-primary" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    securityAlertsEnabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ================= SESSIONS ================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Monitor className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {t.sessionsTitle}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.sessionsDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Current device */}

            <div className="flex flex-col gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Laptop className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {t.currentDevice}
                    </h3>

                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {t.currentSession}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">{t.browser}</p>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.currentDeviceText}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {t.recentActivity}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile device */}

            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Smartphone className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {t.mobileDevice}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">{t.mobileApp}</p>

                  <p className="mt-1 text-xs text-slate-400">
                    {t.lastActivity}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                {t.disconnect}
              </button>
            </div>
          </section>

          {/* ================= DISCONNECT ALL ================= */}

          <section className="rounded-3xl border border-red-100 bg-red-50 p-6 md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <LogOut className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-red-900">
                    {t.disconnectAllTitle}
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-red-700">
                    {t.disconnectAllDescription}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
              >
                {t.disconnectAll}
              </button>
            </div>
          </section>

          {/* ================= SECURITY TIPS ================= */}

          <section className="rounded-3xl border border-brand-primary/10 bg-brand-primary/5 p-6 md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-primary shadow-sm">
                <Lightbulb className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-brand-secondary">
                  {t.tipsTitle}
                </h2>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-brand-secondary/75">
                  {[t.tip1, t.tip2, t.tip3, t.tip4, t.tip5].map(
                    (tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />
                        <span>{tip}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* ================= SECURITY MESSAGE ================= */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  {t.securityMessageTitle}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {t.securityMessage}
                </p>
              </div>
            </div>
          </section>

          {/* ================= BACK ================= */}

          <div className="flex justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-brand-primary transition hover:bg-brand-primary/5"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backHome}
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
