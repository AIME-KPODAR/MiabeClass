import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  CheckCheck,
  Wallet,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { API_URL } from "../lib/api";
import { type Lang, tr } from "../lib/prefs";

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

const POLL_MS = 30_000;

function timeAgo(date: string, lang: Lang): string {
  const d = new Date(date);
  const min = Math.floor((Date.now() - d.getTime()) / 60000);
  if (min < 1) return tr(lang, "Just now", "À l'instant");
  if (min < 60) return tr(lang, `${min} min ago`, `Il y a ${min} min`);
  const h = Math.floor(min / 60);
  if (h < 24) return tr(lang, `${h}h ago`, `Il y a ${h} h`);
  const days = Math.floor(h / 24);
  if (days < 7) return tr(lang, `${days}d ago`, `Il y a ${days} j`);
  return d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TypeIcon({ type }: { type: string }) {
  const cls = "h-4 w-4 text-brand-primary";
  const t = type.toLowerCase();
  if (t.includes("urgent") || t.includes("alert") || t.includes("warning"))
    return <AlertTriangle className={cls} />;
  if (t.includes("event") || t.includes("exam") || t.includes("calendar"))
    return <CalendarDays className={cls} />;
  if (t.includes("fee") || t.includes("payment"))
    return <Wallet className={cls} />;
  return <Bell className={cls} />;
}

/**
 * Cloche de notifications.
 * - compteur de non lues rafraîchi toutes les 30 s (et quand l'onglet redevient actif)
 * - la cloche sonne quand une nouvelle notification arrive
 * - liste déroulante, « tout lire », fermeture au clic extérieur / Échap
 */
export function NotificationBell({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ApiNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ring, setRing] = useState(false);
  const prev = useRef<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const fetchCount = useCallback(async () => {
    try {
      const r = await fetch(`${API_URL}/notifications/count`);
      if (!r.ok) throw new Error();
      const j: { success: boolean; count: number } = await r.json();
      if (!j.success) return;
      if (prev.current !== null && j.count > prev.current) {
        setRing(true);
        window.setTimeout(() => setRing(false), 1500);
      }
      prev.current = j.count;
      setUnread(j.count);
    } catch {
      /* API injoignable : on garde la dernière valeur */
    }
  }, []);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const r = await fetch(`${API_URL}/notifications`);
      if (!r.ok) throw new Error();
      const j: { success: boolean; notifications: ApiNotification[] } =
        await r.json();
      if (!j.success) throw new Error();
      setItems(j.notifications);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
    const id = window.setInterval(fetchCount, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchCount();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchCount]);

  useEffect(() => {
    if (open) {
      fetchList();
      fetchCount();
    }
  }, [open, fetchList, fetchCount]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markRead = async (id: number) => {
    try {
      const r = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "PATCH",
      });
      if (!r.ok) throw new Error();
      setItems((c) => c.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
      setUnread((c) => {
        const v = Math.max(0, c - 1);
        prev.current = v;
        return v;
      });
    } catch {
      /* ignore */
    }
  };

  const markAll = async () => {
    try {
      const r = await fetch(`${API_URL}/notifications/read-all`, {
        method: "PATCH",
      });
      if (!r.ok) throw new Error();
      setItems((c) => c.map((n) => ({ ...n, is_read: true })));
      setUnread(0);
      prev.current = 0;
    } catch {
      /* ignore */
    }
  };

  const label = tr(
    lang,
    unread > 0 ? `Notifications, ${unread} unread` : "Notifications",
    unread > 0
      ? `Notifications, ${unread} non lue${unread > 1 ? "s" : ""}`
      : "Notifications",
  );

  return (
    <div className="relative" ref={box}>
      <style>{`@keyframes miabe-ring{0%,100%{transform:rotate(0)}15%{transform:rotate(16deg)}30%{transform:rotate(-14deg)}45%{transform:rotate(10deg)}60%{transform:rotate(-8deg)}75%{transform:rotate(4deg)}}`}</style>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="true"
        className={`relative grid h-9 w-9 place-items-center rounded-lg border bg-white text-brand-secondary transition-colors hover:border-brand-primary/20 hover:text-brand-primary ${
          open ? "border-brand-primary/30 text-brand-primary" : "border-brand-secondary/10"
        }`}
      >
        <Bell
          className="h-[18px] w-[18px]"
          style={ring ? { animation: "miabe-ring 1.2s ease-in-out" } : undefined}
          fill={unread > 0 ? "currentColor" : "none"}
          fillOpacity={unread > 0 ? 0.15 : 0}
        />
        {unread > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white"
          >
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      <span className="sr-only" aria-live="polite">
        {unread > 0 ? label : ""}
      </span>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-brand-secondary/10 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-secondary/5 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-brand-secondary">
                Notifications
              </h3>
              <p className="text-[11px] text-brand-secondary/50">
                {unread}{" "}
                {tr(lang, "unread", unread > 1 ? "non lues" : "non lue")}
              </p>
            </div>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAll}
                className="flex items-center gap-1 text-[10px] font-bold text-brand-primary hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                {tr(lang, "Mark all read", "Tout lire")}
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {loading && items.length === 0 ? (
              <p className="px-4 py-8 text-center text-xs text-brand-secondary/50">
                {tr(lang, "Loading notifications...", "Chargement des notifications...")}
              </p>
            ) : error ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-red-500">
                  {tr(lang, "Unable to load notifications.", "Impossible de charger les notifications.")}
                </p>
                <button
                  type="button"
                  onClick={fetchList}
                  className="mt-3 text-[11px] font-bold text-brand-primary hover:underline"
                >
                  {tr(lang, "Try again", "Réessayer")}
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell className="mx-auto h-8 w-8 text-brand-secondary/20" />
                <p className="mt-3 text-xs font-medium text-brand-secondary/50">
                  {tr(lang, "No notifications", "Aucune notification")}
                </p>
              </div>
            ) : (
              items.slice(0, 8).map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => !n.is_read && markRead(n.id)}
                  className={`flex w-full gap-3 border-b border-brand-secondary/5 px-4 py-4 text-left transition hover:bg-slate-50 ${
                    n.is_read ? "bg-white" : "bg-brand-primary/[0.03]"
                  }`}
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                    <TypeIcon type={n.type} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-brand-secondary">
                        {n.title}
                      </p>
                      {!n.is_read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      )}
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-brand-secondary/60">
                      {n.message}
                    </p>
                    <p className="mt-2 text-[10px] font-medium text-brand-secondary/35">
                      {timeAgo(n.created_at, lang)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-brand-secondary/5 p-3">
            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-slate-50 py-2 text-center text-[11px] font-bold text-brand-primary transition hover:bg-brand-primary/5"
            >
              {tr(lang, "View all notifications", "Voir toutes les notifications")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
