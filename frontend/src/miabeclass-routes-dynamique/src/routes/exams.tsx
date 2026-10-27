import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, DoorOpen, Timer } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell, Main, PageHeader, btnGhost, card, inputCls } from "../components/AppShell";
import { useApi } from "../lib/api";
import { demoExams, demoResults, type Exam, type ExamResult } from "../lib/demo-data";
import { daysUntil, fmtDate, fmtTime, loc } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/exams")({
  component: ExamsPage,
  head: () => ({ meta: [{ title: "Exams — MiabeClass" }] }),
});

const hm = (min: number) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, "0")}`;

function ExamsPage() {
  const { lang } = usePrefs();
  const exams = useApi<Exam[]>("/exams", demoExams, 5 * 60_000);
  const results = useApi<ExamResult[]>("/exams/results", demoResults, 5 * 60_000);
  const [tab, setTab] = useState<"upcoming" | "results">("upcoming");
  const [classe, setClasse] = useState("all");

  const classes = useMemo(
    () => [...new Set([...exams.data.map((e) => e.classe), ...results.data.map((r) => r.classe)])],
    [exams.data, results.data],
  );

  const upcoming = useMemo(
    () =>
      exams.data
        .filter((e) => (classe === "all" || e.classe === classe) && daysUntil(e.date) >= 0)
        .sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [exams.data, classe],
  );
  const done = useMemo(
    () =>
      results.data
        .filter((r) => classe === "all" || r.classe === classe)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [results.data, classe],
  );

  const overallAvg = done.length
    ? done.reduce((a, r) => a + r.average * r.students, 0) / done.reduce((a, r) => a + r.students, 0)
    : 0;
  const next = upcoming[0];

  const countdown = (iso: string) => {
    const d = daysUntil(iso);
    if (d === 0) return { text: tr(lang, "Today", "Aujourd'hui"), cls: "bg-red-500/10 text-red-600" };
    if (d === 1) return { text: tr(lang, "Tomorrow", "Demain"), cls: "bg-amber-500/10 text-amber-600" };
    return {
      text: tr(lang, `In ${d} days`, `Dans ${d} jours`),
      cls: d <= 7 ? "bg-amber-500/10 text-amber-600" : "bg-slate-100 text-brand-secondary",
    };
  };

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={exams.live}
          title={tr(lang, "Exams", "Examens")}
          subtitle={
            next
              ? tr(
                  lang,
                  `Next: ${loc(next.subject, lang)} — ${countdown(next.date).text.toLowerCase()}`,
                  `Prochain : ${loc(next.subject, lang)} — ${countdown(next.date).text.toLowerCase()}`,
                )
              : tr(lang, "No upcoming exam", "Aucun examen à venir")
          }
          actions={
            <select value={classe} onChange={(e) => setClasse(e.target.value)} className={`${inputCls} w-52`}>
              <option value="all">{tr(lang, "All classes", "Toutes les classes")}</option>
              {classes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          }
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { l: tr(lang, "Upcoming", "À venir"), v: String(upcoming.length) },
            { l: tr(lang, "Published results", "Résultats publiés"), v: String(done.length) },
            { l: tr(lang, "Overall average", "Moyenne générale"), v: done.length ? `${overallAvg.toFixed(1)}/20` : "—" },
          ].map((s) => (
            <div key={s.l} className={`${card} p-5`}>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">{s.l}</span>
              <p className="mt-1 text-3xl font-bold">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex gap-2">
          {(["upcoming", "results"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${tab === t ? "bg-brand-primary text-white" : btnGhost}`}
            >
              {t === "upcoming" ? tr(lang, "Schedule", "Calendrier") : tr(lang, "Results", "Résultats")}
            </button>
          ))}
        </div>

        {tab === "upcoming" ? (
          upcoming.length === 0 ? (
            <div className={`${card} p-10 text-center text-sm text-brand-secondary/50`}>
              {tr(lang, "No upcoming exam.", "Aucun examen à venir.")}
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((e) => {
                const c = countdown(e.date);
                return (
                  <article key={e.id} className={`${card} flex flex-col gap-3 p-5 sm:flex-row sm:items-center`}>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-primary/5 text-center text-brand-primary">
                      <div>
                        <p className="text-lg font-bold leading-none">{new Date(e.date).getDate()}</p>
                        <p className="text-[10px] font-bold uppercase">{fmtDate(lang, e.date, { month: "short" })}</p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold">{loc(e.subject, lang)} <span className="font-normal text-brand-secondary/50">• {e.classe}</span></h2>
                      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-secondary/60">
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" />{fmtDate(lang, e.date, { weekday: "long" })} {fmtTime(lang, e.date)}</span>
                        <span className="inline-flex items-center gap-1"><Timer className="h-3 w-3" />{hm(e.durationMin)}</span>
                        <span className="inline-flex items-center gap-1"><DoorOpen className="h-3 w-3" />{e.room}</span>
                      </p>
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase ${c.cls}`}>{c.text}</span>
                  </article>
                );
              })}
            </div>
          )
        ) : done.length === 0 ? (
          <div className={`${card} p-10 text-center text-sm text-brand-secondary/50`}>
            {tr(lang, "No result published yet.", "Aucun résultat publié.")}
          </div>
        ) : (
          <div className={`${card} overflow-x-auto`}>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-brand-secondary/5 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-brand-secondary/50">
                <tr>
                  <th className="px-5 py-3">{tr(lang, "Subject", "Matière")}</th>
                  <th className="px-5 py-3">{tr(lang, "Class", "Classe")}</th>
                  <th className="px-5 py-3">{tr(lang, "Average", "Moyenne")}</th>
                  <th className="px-5 py-3">{tr(lang, "Best / Lowest", "Max / Min")}</th>
                  <th className="px-5 py-3">{tr(lang, "Students", "Élèves")}</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-secondary/5">
                {done.map((r) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3 font-medium">{loc(r.subject, lang)}</td>
                    <td className="px-5 py-3">{r.classe}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-12 font-bold">{r.average.toFixed(1)}</span>
                        <div className="h-1.5 w-24 rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${r.average >= 14 ? "bg-brand-accent" : r.average >= 10 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${Math.min(100, (r.average / 20) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-brand-secondary/70">{r.best} / {r.lowest}</td>
                    <td className="px-5 py-3">{r.students}</td>
                    <td className="px-5 py-3 text-xs text-brand-secondary/60">{fmtDate(lang, r.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Main>
    </AppShell>
  );
}
