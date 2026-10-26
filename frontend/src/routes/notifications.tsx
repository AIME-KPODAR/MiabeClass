import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Check,
  CheckCheck,
  ChevronLeft,
  Clock,
  CreditCard,
  Info,
  Search,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/notifications")({
  component: RouteComponent,
});

/* =========================================================
   TYPES
========================================================= */

type Lang = "en" | "fr";
type Theme = "light" | "dark";
type Filter = "all" | "unread";

type NotificationType =
  "course" | "system" | "security" | "payment" | "info" | "success" | "warning";

type ApiNotification = {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  first_name: string;
  last_name: string;
  email: string;
};

type NotificationsResponse = {
  success: boolean;
  count: number;
  notifications: ApiNotification[];
};

type NotificationCountResponse = {
  success: boolean;
  count: number;
};

/* =========================================================
   CONSTANTS
========================================================= */

const LANG_KEY = "miabe-lang";
const THEME_KEY = "miabe-theme";

/*
 * Adresse du backend MiabeClass.
 *
 * Le frontend est actuellement accessible sur :
 * http://12.0.0.153:8080
 *
 * Le backend écoute sur :
 * http://12.0.0.153:3000
 */
/*const API_URL = "http://12.0.0.153:3000/api";*/
const API_URL = "http://localhost:3000/api";

/* =========================================================
   TRANSLATIONS
========================================================= */

const T = {
  en: {
    back: "Back",
    title: "Notifications",
    subtitle:
      "Stay informed about your courses, account and important updates.",
    all: "All",
    unread: "Unread",
    markAll: "Mark all as read",
    search: "Search notifications...",
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This week",
    noNotifications: "No notifications found",
    noNotificationsText:
      "There are no notifications matching your current filter.",
    unreadCount: "unread notifications",
    read: "Read",
    unreadLabel: "Unread",
    settings: "Notification settings",
    emptySearch: "No notification matches your search.",
    allCaughtUp: "You're all caught up!",
    allCaughtUpText: "You have no unread notifications at the moment.",
    loading: "Loading notifications...",
    error: "Unable to load notifications.",
    retry: "Try again",
    footerDescription:
      "Your digital learning platform for a better educational experience.",
    quickLinks: "Quick links",
    security: "Security",
    privacy: "Privacy",
    status: "System status",
    contact: "Contact",
    supports: "Resources",
    faq: "FAQ",
    copyright: "© 2026 MiabeClass. All rights reserved.",
  },

  fr: {
    back: "Retour",
    title: "Notifications",
    subtitle:
      "Restez informé de vos cours, de votre compte et des mises à jour importantes.",
    all: "Toutes",
    unread: "Non lues",
    markAll: "Tout marquer comme lu",
    search: "Rechercher une notification...",
    today: "Aujourd'hui",
    yesterday: "Hier",
    thisWeek: "Cette semaine",
    noNotifications: "Aucune notification",
    noNotificationsText: "Aucune notification ne correspond au filtre actuel.",
    unreadCount: "notifications non lues",
    read: "Lue",
    unreadLabel: "Non lue",
    settings: "Paramètres des notifications",
    emptySearch: "Aucune notification ne correspond à votre recherche.",
    allCaughtUp: "Vous êtes à jour !",
    allCaughtUpText: "Vous n'avez actuellement aucune notification non lue.",
    loading: "Chargement des notifications...",
    error: "Impossible de charger les notifications.",
    retry: "Réessayer",
    footerDescription:
      "Votre plateforme d'apprentissage numérique pour une meilleure expérience éducative.",
    quickLinks: "Liens rapides",
    security: "Sécurité",
    privacy: "Confidentialité",
    status: "État du système",
    contact: "Contact",
    supports: "Supports",
    faq: "FAQ",
    copyright: "© 2026 MiabeClass. Tous droits réservés.",
  },
};

/* =========================================================
   LANGUAGE
========================================================= */

function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-brand-secondary/10 bg-white p-0.5 text-[11px] font-bold uppercase tracking-wider dark:border-white/10 dark:bg-slate-900">
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-md px-2.5 py-1 transition-all ${
            lang === l
              ? "bg-brand-primary text-white"
              : "text-brand-secondary/60 hover:text-brand-secondary dark:text-white/50 dark:hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function useLang(): [Lang, (lang: Lang) => void] {
  const [lang, setLang] = useState<Lang>("fr");

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

/* =========================================================
   THEME
========================================================= */

function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (
      typeof window !== "undefined"
        ? window.localStorage.getItem(THEME_KEY)
        : null
    ) as Theme | null;

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  return [theme, setTheme];
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-secondary/10 bg-white text-brand-secondary transition hover:bg-brand-primary/5 dark:border-white/10 dark:bg-slate-900 dark:text-white"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <span className="text-sm">☾</span>
      ) : (
        <span className="text-sm">☀</span>
      )}
    </button>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function normalizeNotificationType(type: string): NotificationType {
  switch (type.toLowerCase()) {
    case "course":
      return "course";

    case "system":
      return "system";

    case "security":
      return "security";

    case "payment":
      return "payment";

    case "success":
      return "success";

    case "warning":
      return "warning";

    case "info":
    default:
      return "info";
  }
}

function getDateGroup(dateString: string): "today" | "yesterday" | "week" {
  const date = new Date(dateString);
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const sevenDaysAgo = new Date(startOfToday);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  if (date >= startOfToday) {
    return "today";
  }

  if (date >= startOfYesterday) {
    return "yesterday";
  }

  if (date >= sevenDaysAgo) {
    return "week";
  }

  return "week";
}

function formatNotificationTime(dateString: string, lang: Lang): string {
  const date = new Date(dateString);
  const now = new Date();

  const difference = now.getTime() - date.getTime();

  const minutes = Math.floor(difference / (1000 * 60));

  const hours = Math.floor(difference / (1000 * 60 * 60));

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return lang === "fr" ? "À l'instant" : "Just now";
  }

  if (minutes < 60) {
    return lang === "fr" ? `Il y a ${minutes} min` : `${minutes} min ago`;
  }

  if (hours < 24) {
    return lang === "fr" ? `Il y a ${hours} h` : `${hours}h ago`;
  }

  if (days < 7) {
    return lang === "fr" ? `Il y a ${days} j` : `${days}d ago`;
  }

  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   NOTIFICATION ICON
========================================================= */

function NotificationIcon({ type }: { type: NotificationType }) {
  const base = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl";

  switch (type) {
    case "course":
      return (
        <div
          className={`${base} bg-blue-500/10 text-blue-600 dark:text-blue-400`}
        >
          <BookOpen size={21} />
        </div>
      );

    case "system":
      return (
        <div
          className={`${base} bg-purple-500/10 text-purple-600 dark:text-purple-400`}
        >
          <Settings size={21} />
        </div>
      );

    case "security":
      return (
        <div
          className={`${base} bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`}
        >
          <ShieldCheck size={21} />
        </div>
      );

    case "payment":
      return (
        <div
          className={`${base} bg-orange-500/10 text-orange-600 dark:text-orange-400`}
        >
          <CreditCard size={21} />
        </div>
      );

    case "warning":
      return (
        <div
          className={`${base} bg-orange-500/10 text-orange-600 dark:text-orange-400`}
        >
          <Info size={21} />
        </div>
      );

    case "success":
      return (
        <div
          className={`${base} bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`}
        >
          <CheckCheck size={21} />
        </div>
      );

    default:
      return (
        <div className={`${base} bg-brand-primary/10 text-brand-primary`}>
          <Info size={21} />
        </div>
      );
  }
}

/* =========================================================
   NOTIFICATION CARD
========================================================= */

function NotificationCard({
  notification,
  lang,
  onRead,
}: {
  notification: ApiNotification;
  lang: Lang;
  onRead: (id: number) => void;
}) {
  const t = T[lang];

  const notificationType = normalizeNotificationType(notification.type);

  return (
    <article
      className={`group relative rounded-2xl border p-5 transition-all ${
        notification.is_read
          ? "border-brand-secondary/10 bg-white hover:border-brand-primary/20 hover:shadow-sm dark:border-white/10 dark:bg-slate-900"
          : "border-brand-primary/20 bg-brand-primary/[0.035] shadow-sm dark:border-brand-primary/30 dark:bg-brand-primary/[0.08]"
      }`}
    >
      {!notification.is_read && (
        <span className="absolute left-0 top-5 h-10 w-1 rounded-r-full bg-brand-primary" />
      )}

      <div className="flex gap-4">
        <NotificationIcon type={notificationType} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-brand-secondary dark:text-white">
                  {notification.title}
                </h3>

                {!notification.is_read && (
                  <span className="h-2 w-2 rounded-full bg-brand-primary" />
                )}
              </div>

              <p className="mt-1 text-sm leading-6 text-brand-secondary/65 dark:text-white/60">
                {notification.message}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-xs text-brand-secondary/45 dark:text-white/40">
              <Clock size={13} />

              <span>
                {formatNotificationTime(notification.created_at, lang)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                notification.is_read
                  ? "bg-brand-secondary/5 text-brand-secondary/55 dark:bg-white/5 dark:text-white/45"
                  : "bg-brand-primary/10 text-brand-primary"
              }`}
            >
              {notification.is_read ? t.read : t.unreadLabel}
            </span>

            <div className="ml-auto flex items-center gap-1">
              {!notification.is_read && (
                <button
                  type="button"
                  onClick={() => onRead(notification.id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-secondary/60 transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-white/50"
                >
                  <Check size={14} />

                  {t.read}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

function RouteComponent() {
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useTheme();

  const [notifications, setNotifications] = useState<ApiNotification[]>([]);

  const [filter, setFilter] = useState<Filter>("all");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  const t = T[lang];

  /* =======================================================
     FETCH NOTIFICATIONS
  ======================================================= */

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/notifications`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: NotificationsResponse = await response.json();

      if (!data.success) {
        throw new Error("API notification error");
      }

      setNotifications(data.notifications);
    } catch (error) {
      console.error("Erreur notifications :", error);

      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     FETCH UNREAD COUNT
  ======================================================= */

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`${API_URL}/notifications/count`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: NotificationCountResponse = await response.json();

      if (data.success) {
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error("Erreur compteur notifications :", error);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  /* =======================================================
     REFRESH COUNT
  ======================================================= */

  useEffect(() => {
    const interval = window.setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     FILTERED NOTIFICATIONS
  ======================================================= */

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesFilter = filter === "all" || !notification.is_read;

      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [notifications, filter, search]);

  /* =======================================================
     GROUP BY DATE
  ======================================================= */

  const groups = useMemo(() => {
    const today = filteredNotifications.filter(
      (notification) => getDateGroup(notification.created_at) === "today",
    );

    const yesterday = filteredNotifications.filter(
      (notification) => getDateGroup(notification.created_at) === "yesterday",
    );

    const week = filteredNotifications.filter(
      (notification) => getDateGroup(notification.created_at) === "week",
    );

    return [
      {
        label: t.today,
        items: today,
      },
      {
        label: t.yesterday,
        items: yesterday,
      },
      {
        label: t.thisWeek,
        items: week,
      },
    ].filter((group) => group.items.length > 0);
  }, [filteredNotifications, t.today, t.yesterday, t.thisWeek]);

  /* =======================================================
     MARK ONE AS READ
  ======================================================= */

  const markAsRead = async (id: number) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                is_read: true,
                read_at: new Date().toISOString(),
              }
            : notification,
        ),
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (error) {
      console.error("Erreur lors du marquage de la notification :", error);
    } finally {
      setActionLoading(false);
    }
  };

  /* =======================================================
     MARK ALL AS READ
  ======================================================= */

  const markAllAsRead = async () => {
    if (unreadCount === 0) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: true,
          read_at: new Date().toISOString(),
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Erreur lors du marquage global :", error);
    } finally {
      setActionLoading(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 text-brand-secondary transition-colors dark:bg-slate-950 dark:text-white">
      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header className="sticky top-0 z-40 border-b border-brand-secondary/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label="MiabeClass"
            >
              <img
                src="/logo.png"
                alt="MiabeClass"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <div className="hidden h-6 w-px bg-brand-secondary/10 sm:block dark:bg-white/10" />

            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm font-medium text-brand-secondary/60 transition hover:text-brand-primary sm:flex dark:text-white/50"
            >
              <ChevronLeft size={17} />

              {t.back}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <LangToggle lang={lang} setLang={setLang} />

            <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
              MC
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HERO */}

        <section className="mb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <Bell size={25} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {t.title}
                  </h1>

                  {unreadCount > 0 && (
                    <p className="mt-1 text-sm font-medium text-brand-primary">
                      {unreadCount} {t.unreadCount}
                    </p>
                  )}
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-brand-secondary/60 dark:text-white/55">
                {t.subtitle}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                disabled={actionLoading}
                onClick={markAllAsRead}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary shadow-sm transition hover:bg-brand-primary/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-primary/25 dark:bg-slate-900"
              >
                <CheckCheck size={17} />

                {actionLoading ? "..." : t.markAll}
              </button>
            )}
          </div>
        </section>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="mb-8 rounded-2xl border border-brand-secondary/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}

            <div className="relative flex-1 lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/35 dark:text-white/35"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search}
                className="h-11 w-full rounded-xl border border-brand-secondary/10 bg-slate-50 pl-10 pr-10 text-sm outline-none transition placeholder:text-brand-secondary/35 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-white/30"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-secondary/40 hover:text-brand-secondary dark:text-white/40 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* FILTERS */}

            <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-950">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  filter === "all"
                    ? "bg-white text-brand-secondary shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-brand-secondary/50 hover:text-brand-secondary dark:text-white/45 dark:hover:text-white"
                }`}
              >
                {t.all}
              </button>

              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  filter === "unread"
                    ? "bg-white text-brand-secondary shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-brand-secondary/50 hover:text-brand-secondary dark:text-white/45 dark:hover:text-white"
                }`}
              >
                {t.unread}

                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <section className="rounded-3xl border border-brand-secondary/10 bg-white px-6 py-16 text-center shadow-sm dark:border-white/10 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              <Bell size={30} className="animate-pulse" />
            </div>

            <h2 className="mt-5 text-xl font-bold">{t.loading}</h2>
          </section>
        ) : error ? (
          /* =================================================
             ERROR
          ================================================= */

          <section className="rounded-3xl border border-red-500/10 bg-white px-6 py-16 text-center shadow-sm dark:border-red-500/20 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <Bell size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold">{t.error}</h2>

            <button
              type="button"
              onClick={fetchNotifications}
              className="mt-6 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {t.retry}
            </button>
          </section>
        ) : groups.length > 0 ? (
          /* =================================================
             NOTIFICATION LIST
          ================================================= */

          <div className="space-y-9">
            {groups.map((group) => (
              <section key={group.label}>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-brand-secondary/45 dark:text-white/40">
                    {group.label}
                  </h2>

                  <div className="h-px flex-1 bg-brand-secondary/10 dark:bg-white/10" />
                </div>

                <div className="space-y-3">
                  {group.items.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      lang={lang}
                      onRead={markAsRead}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <section className="rounded-3xl border border-brand-secondary/10 bg-white px-6 py-16 text-center shadow-sm dark:border-white/10 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              {filter === "unread" && !search ? (
                <CheckCheck size={30} />
              ) : (
                <Bell size={30} />
              )}
            </div>

            <h2 className="mt-5 text-xl font-bold">
              {filter === "unread" && !search
                ? t.allCaughtUp
                : t.noNotifications}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-secondary/55 dark:text-white/50">
              {filter === "unread" && !search
                ? t.allCaughtUpText
                : search
                  ? t.emptySearch
                  : t.noNotificationsText}
            </p>

            {(filter === "unread" || search) && (
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
                className="mt-6 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {t.all}
              </button>
            )}
          </section>
        )}

        {/* =================================================
            SETTINGS CTA
        ================================================= */}

        <section className="mt-10 overflow-hidden rounded-3xl bg-brand-primary p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Settings size={21} />
              </div>

              <div>
                <h2 className="font-bold">{t.settings}</h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-white/75">
                  {lang === "fr"
                    ? "Gérez les alertes et les informations que vous souhaitez recevoir."
                    : "Manage the alerts and information you want to receive."}
                </p>
              </div>
            </div>

            <Link
              to="/securitySettings"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-primary transition hover:bg-white/90"
            >
              <Settings size={16} />

              {lang === "fr" ? "Configurer" : "Configure"}
            </Link>
          </div>
        </section>
      </main>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="mt-12 border-t border-brand-secondary/10 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <img
                src="/logo.png"
                alt="MiabeClass"
                className="h-9 w-auto object-contain"
              />

              <p className="mt-3 text-sm leading-6 text-brand-secondary/55 dark:text-white/45">
                {t.footerDescription}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold">{t.quickLinks}</h3>

              <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-brand-secondary/55 dark:text-white/45">
                <Link
                  to="/securitySettings"
                  className="transition hover:text-brand-primary"
                >
                  {t.security}
                </Link>

                <Link
                  to="/privacyPolicy"
                  className="transition hover:text-brand-primary"
                >
                  {t.privacy}
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

                <Link
                  to="/supports"
                  className="transition hover:text-brand-primary"
                >
                  {t.supports}
                </Link>

                <Link to="/faq" className="transition hover:text-brand-primary">
                  {t.faq}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-brand-secondary/10 pt-6 text-xs text-brand-secondary/40 dark:border-white/10 dark:text-white/35">
            {t.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
