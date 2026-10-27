import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Database,
  Gauge,
  Globe2,
  HardDrive,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/systemStatus")({
  component: SystemStatusPage,
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
   TYPES
========================= */

type ServiceStatus = "operational" | "maintenance" | "incident";

type Service = {
  key: string;
  name: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  status: ServiceStatus;
  uptime: string;
  icon: typeof Globe2;
};

/* =========================
   SERVICES
========================= */

const services: Service[] = [
  {
    key: "platform",
    name: {
      en: "MiabeClass Platform",
      fr: "Plateforme MiabeClass",
    },
    description: {
      en: "General access to the platform",
      fr: "Accès général à la plateforme",
    },
    status: "operational",
    uptime: "99.99%",
    icon: Globe2,
  },
  {
    key: "authentication",
    name: {
      en: "Authentication",
      fr: "Authentification",
    },
    description: {
      en: "Login and account management",
      fr: "Connexion et gestion des comptes",
    },
    status: "operational",
    uptime: "99.98%",
    icon: ShieldCheck,
  },
  {
    key: "database",
    name: {
      en: "Database",
      fr: "Base de données",
    },
    description: {
      en: "Data storage and retrieval",
      fr: "Stockage et récupération des données",
    },
    status: "operational",
    uptime: "99.99%",
    icon: Database,
  },
  {
    key: "supports",
    name: {
      en: "Learning resources",
      fr: "Supports pédagogiques",
    },
    description: {
      en: "Access to courses and documents",
      fr: "Accès aux cours et documents",
    },
    status: "operational",
    uptime: "99.97%",
    icon: HardDrive,
  },
  {
    key: "search",
    name: {
      en: "Search",
      fr: "Recherche",
    },
    description: {
      en: "Search for courses and resources",
      fr: "Recherche des cours et ressources",
    },
    status: "operational",
    uptime: "99.96%",
    icon: Search,
  },
  {
    key: "api",
    name: {
      en: "API",
      fr: "API",
    },
    description: {
      en: "Communication between services",
      fr: "Communication entre les services",
    },
    status: "operational",
    uptime: "99.99%",
    icon: Settings,
  },
];

/* =========================
   PAGE
========================= */

function SystemStatusPage() {
  const [lang, setLang] = useLang();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const t =
    lang === "fr"
      ? {
          platform: "Plateforme éducative",
          backHome: "Retour à l'accueil",

          badge: "État du système",
          title: "État du système",
          subtitle:
            "Consultez l'état des principaux services de MiabeClass et vérifiez leur disponibilité.",

          allOperational: "Tous les systèmes sont opérationnels",
          attention: "Certains services nécessitent une attention",
          normal: "MiabeClass fonctionne normalement.",

          services: "Services",
          servicesDescription:
            "État actuel des principaux services MiabeClass.",
          availability: "Disponibilité",

          operational: "Opérationnel",
          maintenance: "Maintenance",
          incident: "Incident",

          globalAvailability: "Disponibilité globale",
          globalDescription: "Disponibilité moyenne des services",

          responseTime: "Temps de réponse",
          responseDescription: "Temps de réponse moyen récent",

          incidents: "Historique des incidents",
          incidentsDescription:
            "Les derniers événements importants de la plateforme.",
          noIncident: "Aucun incident récent",
          noIncidentDescription:
            "Aucun incident majeur n'a été enregistré récemment.",
          systemOperational: "Système opérationnel",

          maintenanceTitle: "Maintenance programmée",
          maintenanceText:
            "Les opérations de maintenance importantes seront annoncées à l'avance afin de minimiser leur impact sur l'utilisation de MiabeClass.",

          lastCheck: "Dernière vérification",
          refresh: "Actualiser l'état",

          footer:
            "© 2026 MiabeClass. Ressources pédagogiques et apprentissage numérique.",
        }
      : {
          platform: "Educational platform",
          backHome: "Back home",

          badge: "System status",
          title: "System Status",
          subtitle:
            "Check the status of MiabeClass services and monitor their availability.",

          allOperational: "All systems are operational",
          attention: "Some services require attention",
          normal: "MiabeClass is operating normally.",

          services: "Services",
          servicesDescription:
            "Current status of the main MiabeClass services.",
          availability: "Availability",

          operational: "Operational",
          maintenance: "Maintenance",
          incident: "Incident",

          globalAvailability: "Global availability",
          globalDescription: "Average service availability",

          responseTime: "Response time",
          responseDescription: "Recent average response time",

          incidents: "Incident history",
          incidentsDescription:
            "Recent important events affecting the platform.",
          noIncident: "No recent incidents",
          noIncidentDescription:
            "No major incidents have been recorded recently.",
          systemOperational: "System operational",

          maintenanceTitle: "Scheduled maintenance",
          maintenanceText:
            "Important maintenance operations will be announced in advance to minimize their impact on MiabeClass users.",

          lastCheck: "Last checked",
          refresh: "Refresh status",

          footer:
            "© 2026 MiabeClass. Educational resources and digital learning.",
        };

  const allOperational = services.every(
    (service) => service.status === "operational",
  );

  const statusConfig = {
    operational: {
      label: t.operational,
      badge: "bg-green-100 text-green-700",
      dot: "bg-green-500",
    },
    maintenance: {
      label: t.maintenance,
      badge: "bg-orange-100 text-orange-700",
      dot: "bg-orange-500",
    },
    incident: {
      label: t.incident,
      badge: "bg-red-100 text-red-700",
      dot: "bg-red-500",
    },
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

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
            <Activity className="h-8 w-8" />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Gauge className="h-4 w-4" />
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
        <div className="mx-auto max-w-5xl space-y-8">
          {/* ================= GLOBAL STATUS ================= */}

          <section
            className={`rounded-3xl border p-6 shadow-sm md:p-8 ${
              allOperational
                ? "border-green-200 bg-green-50"
                : "border-orange-200 bg-orange-50"
            }`}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                  allOperational
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {allOperational ? (
                  <CheckCircle2 className="h-8 w-8" />
                ) : (
                  <AlertCircle className="h-8 w-8" />
                )}
              </div>

              <div>
                <h2
                  className={`text-2xl font-bold ${
                    allOperational ? "text-green-900" : "text-orange-900"
                  }`}
                >
                  {allOperational ? t.allOperational : t.attention}
                </h2>

                <p
                  className={`mt-2 ${
                    allOperational ? "text-green-700" : "text-orange-700"
                  }`}
                >
                  {t.normal}
                </p>
              </div>
            </div>
          </section>

          {/* ================= SERVICES ================= */}

          <section>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.services}
              </h2>

              <p className="mt-1 text-slate-500">{t.servicesDescription}</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {services.map((service, index) => {
                const status = statusConfig[service.status];
                const Icon = service.icon;

                return (
                  <div
                    key={service.key}
                    className={`flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between ${
                      index !== services.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-brand-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {service.name[lang]}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {service.description[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="hidden text-sm text-slate-400 sm:block">
                        {t.availability}: {service.uptime}
                      </span>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${status.badge}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${status.dot}`}
                        />

                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= METRICS ================= */}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Availability */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {t.globalAvailability}
                  </p>

                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    99.99%
                  </p>
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[99.99%] rounded-full bg-green-500" />
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {t.globalDescription}
              </p>
            </section>

            {/* Response time */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{t.responseTime}</p>

                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    142 ms
                  </p>
                </div>
              </div>

              <div className="mt-6 flex h-12 items-end gap-1">
                {[45, 60, 50, 75, 55, 70, 65, 80, 58, 72, 66, 78].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t bg-brand-primary/20"
                      style={{
                        height: `${height / 2}px`,
                      }}
                    />
                  ),
                )}
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {t.responseDescription}
              </p>
            </section>
          </div>

          {/* ================= INCIDENT HISTORY ================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {t.incidents}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.incidentsDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {t.noIncident}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.noIncidentDescription}
                  </p>

                  <p className="mt-2 text-xs font-medium text-green-600">
                    {t.systemOperational}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= MAINTENANCE ================= */}

          <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <Wrench className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-blue-900">
                  {t.maintenanceTitle}
                </h2>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  {t.maintenanceText}
                </p>
              </div>
            </div>
          </section>

          {/* ================= LAST UPDATE ================= */}

          <section className="text-center">
            <p className="text-sm text-slate-400">
              {t.lastCheck}:{" "}
              {lastUpdated.toLocaleTimeString(
                lang === "fr" ? "fr-FR" : "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-brand-primary transition hover:bg-brand-primary/5"
            >
              <RefreshCw className="h-4 w-4" />
              {t.refresh}
            </button>
          </section>

          {/* ================= BACK HOME ================= */}

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
