import { Link, createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell, Main, PageHeader, btnPrimary, card, inputCls } from "../components/AppShell";
import { useApi } from "../lib/api";
import { demoTeachers, type Teacher } from "../lib/demo-data";
import { fmtPercent, initials, loc, norm } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/teachers")({
  component: TeachersPage,
  head: () => ({ meta: [{ title: "Teachers — MiabeClass" }] }),
});

function TeachersPage() {
  const { lang } = usePrefs();
  const { data, live } = useApi<Teacher[]>("/teachers", demoTeachers, 60_000);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "leave">("all");

  const list = useMemo(
    () =>
      data.filter(
        (t) =>
          (status === "all" || t.status === status) &&
          norm(`${t.name} ${loc(t.subject, lang)} ${t.classes.join(" ")}`).includes(norm(q)),
      ),
    [data, q, status, lang],
  );

  const avg = data.length
    ? data.reduce((a, t) => a + t.attendance, 0) / data.length
    : 0;
  const onLeave = data.filter((t) => t.status === "leave").length;

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={live}
          title={tr(lang, "Teachers", "Enseignants")}
          subtitle={tr(lang, "Staff directory and attendance", "Annuaire du personnel et présence")}
          actions={
            <Link to="/newTeacherEnrollment" className={btnPrimary}>
              <UserPlus className="h-4 w-4" />
              {tr(lang, "New Enrollment Teacher", "Nouvelle inscription Enseignant(e)")}
            </Link>
          }
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { l: tr(lang, "Teachers", "Enseignants"), v: String(data.length) },
            { l: tr(lang, "Average attendance", "Présence moyenne"), v: fmtPercent(lang, avg) },
            { l: tr(lang, "On leave", "En congé"), v: String(onLeave) },
          ].map((s) => (
            <div key={s.l} className={`${card} p-5`}>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">{s.l}</span>
              <p className="mt-1 text-3xl font-bold">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-secondary/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr(lang, "Search name, subject, class…", "Rechercher nom, matière, classe…")}
              className={`${inputCls} pl-10`}
            />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={`${inputCls} sm:w-48`}>
            <option value="all">{tr(lang, "All statuses", "Tous les statuts")}</option>
            <option value="active">{tr(lang, "Active", "En poste")}</option>
            <option value="leave">{tr(lang, "On leave", "En congé")}</option>
          </select>
        </div>

        {list.length === 0 ? (
          <div className={`${card} p-10 text-center text-sm text-brand-secondary/50`}>
            {tr(lang, "No teacher found.", "Aucun enseignant trouvé.")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t) => (
              <article key={t.id} className={`${card} p-5`}>
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 font-display text-sm font-bold">
                    {initials(t.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold">{t.name}</h2>
                    <p className="truncate text-xs text-brand-secondary/60">{loc(t.subject, lang)}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                      t.status === "active"
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {t.status === "active" ? tr(lang, "Active", "En poste") : tr(lang, "On leave", "En congé")}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[11px] font-medium text-brand-secondary/60">
                    <span>{tr(lang, "Attendance", "Présence")}</span>
                    <span className="font-bold text-brand-secondary">{fmtPercent(lang, t.attendance, 0)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${t.attendance >= 95 ? "bg-brand-accent" : t.attendance >= 90 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(100, t.attendance)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.classes.map((c) => (
                    <span key={c} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold">{c}</span>
                  ))}
                </div>

                <div className="mt-4 space-y-1.5 border-t border-brand-secondary/5 pt-4 text-xs text-brand-secondary/60">
                  <a href={`mailto:${t.email}`} className="flex items-center gap-2 hover:text-brand-primary">
                    <Mail className="h-3.5 w-3.5" /> <span className="truncate">{t.email}</span>
                  </a>
                  <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-brand-primary">
                    <Phone className="h-3.5 w-3.5" /> {t.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </Main>
    </AppShell>
  );
}
