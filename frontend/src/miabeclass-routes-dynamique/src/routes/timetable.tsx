import { createFileRoute } from "@tanstack/react-router";
import { Clock, DoorOpen, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell, Main, PageHeader, card, inputCls } from "../components/AppShell";
import { useApi } from "../lib/api";
import { demoSlots, type Slot } from "../lib/demo-data";
import { loc } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/timetable")({
  component: TimetablePage,
  head: () => ({ meta: [{ title: "Timetable — MiabeClass" }] }),
});

const DAYS: Array<{ n: Slot["day"]; en: string; fr: string }> = [
  { n: 1, en: "Monday", fr: "Lundi" },
  { n: 2, en: "Tuesday", fr: "Mardi" },
  { n: 3, en: "Wednesday", fr: "Mercredi" },
  { n: 4, en: "Thursday", fr: "Jeudi" },
  { n: 5, en: "Friday", fr: "Vendredi" },
];

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function TimetablePage() {
  const { lang } = usePrefs();
  const { data, live } = useApi<Slot[]>("/timetable", demoSlots, 5 * 60_000);
  const [classe, setClasse] = useState("all");
  const [now, setNow] = useState(() => new Date());
  const [dayTab, setDayTab] = useState<number | null>(null); // affichage mobile

  // met à jour « cours en cours » chaque minute
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const todayN = now.getDay(); // 0 = dimanche
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const activeDay = dayTab ?? (todayN >= 1 && todayN <= 5 ? todayN : 1);

  const classes = useMemo(() => [...new Set(data.map((s) => s.classe))], [data]);
  const slots = useMemo(
    () => data.filter((s) => classe === "all" || s.classe === classe),
    [data, classe],
  );

  const times = useMemo(
    () => [...new Set(slots.map((s) => `${s.start}-${s.end}`))].sort(),
    [slots],
  );

  const isCurrent = (s: Slot) =>
    s.day === todayN && nowMin >= toMin(s.start) && nowMin < toMin(s.end);

  const current = slots.find(isCurrent);
  const upcoming = useMemo(() => {
    // prochain cours : on cherche sur les 7 prochains jours
    for (let off = 0; off < 7; off++) {
      const d = ((todayN + off) % 7) as number;
      const cand = slots
        .filter((s) => s.day === d && (off > 0 || toMin(s.start) > nowMin))
        .sort((a, b) => toMin(a.start) - toMin(b.start))[0];
      if (cand) return { slot: cand, off };
    }
    return null;
  }, [slots, todayN, nowMin]);

  const dayName = (n: number) => {
    const d = DAYS.find((x) => x.n === n);
    return d ? d[lang] : "";
  };

  const hoursPerWeek =
    slots.reduce((a, s) => a + (toMin(s.end) - toMin(s.start)), 0) / 60;

  const cell = (s: Slot) => (
    <div
      key={s.id}
      className={`rounded-xl border p-3 text-left ${
        isCurrent(s)
          ? "border-brand-accent bg-brand-accent/10"
          : "border-brand-secondary/5 bg-slate-50"
      }`}
    >
      <p className="text-xs font-bold leading-snug">{loc(s.subject, lang)}</p>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-brand-secondary/60">
        <User className="h-3 w-3" /> {s.teacher}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-brand-secondary/60">
        <DoorOpen className="h-3 w-3" /> {s.room} • {s.classe}
      </p>
      {isCurrent(s) && (
        <span className="mt-2 inline-block rounded-full bg-brand-accent px-2 py-0.5 text-[9px] font-bold uppercase text-white">
          {tr(lang, "Now", "En cours")}
        </span>
      )}
    </div>
  );

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={live}
          title={tr(lang, "Timetable", "Emploi du temps")}
          subtitle={tr(
            lang,
            `${slots.length} sessions • ${hoursPerWeek.toFixed(1)} h per week`,
            `${slots.length} séances • ${hoursPerWeek.toFixed(1)} h par semaine`,
          )}
          actions={
            <select value={classe} onChange={(e) => setClasse(e.target.value)} className={`${inputCls} w-52`}>
              <option value="all">{tr(lang, "All classes", "Toutes les classes")}</option>
              {classes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          }
        />

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={`${card} p-5`}>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">
              {tr(lang, "Current class", "Cours en cours")}
            </span>
            {current ? (
              <>
                <p className="mt-1 text-lg font-bold">{loc(current.subject, lang)}</p>
                <p className="text-xs text-brand-secondary/60">
                  {current.start}–{current.end} • {current.room} • {current.teacher}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-brand-secondary/50">
                {tr(lang, "No class right now", "Aucun cours en ce moment")}
              </p>
            )}
          </div>
          <div className={`${card} p-5`}>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">
              {tr(lang, "Next class", "Prochain cours")}
            </span>
            {upcoming ? (
              <>
                <p className="mt-1 text-lg font-bold">{loc(upcoming.slot.subject, lang)}</p>
                <p className="flex items-center gap-1 text-xs text-brand-secondary/60">
                  <Clock className="h-3 w-3" />
                  {upcoming.off === 0
                    ? tr(lang, "Today", "Aujourd'hui")
                    : upcoming.off === 1
                      ? tr(lang, "Tomorrow", "Demain")
                      : dayName(upcoming.slot.day)}{" "}
                  {upcoming.slot.start}–{upcoming.slot.end} • {upcoming.slot.room}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-brand-secondary/50">—</p>
            )}
          </div>
        </div>

        {/* Mobile : un jour à la fois */}
        <div className="md:hidden">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {DAYS.map((d) => (
              <button
                key={d.n}
                type="button"
                onClick={() => setDayTab(d.n)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold ${
                  activeDay === d.n
                    ? "bg-brand-primary text-white"
                    : "bg-white ring-1 ring-inset ring-brand-secondary/10"
                }`}
              >
                {d[lang]}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {slots
              .filter((s) => s.day === activeDay)
              .sort((a, b) => toMin(a.start) - toMin(b.start))
              .map((s) => (
                <div key={s.id} className="flex gap-3">
                  <div className="w-14 shrink-0 pt-3 text-[11px] font-bold text-brand-secondary/50">
                    {s.start}
                    <br />
                    {s.end}
                  </div>
                  <div className="flex-1">{cell(s)}</div>
                </div>
              ))}
            {slots.filter((s) => s.day === activeDay).length === 0 && (
              <p className={`${card} p-8 text-center text-sm text-brand-secondary/50`}>
                {tr(lang, "No class this day.", "Aucun cours ce jour-là.")}
              </p>
            )}
          </div>
        </div>

        {/* Bureau : grille hebdomadaire */}
        <div className={`${card} hidden overflow-x-auto md:block`}>
          <table className="w-full min-w-[820px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-brand-secondary/5 bg-slate-50/50">
                <th className="w-28 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-brand-secondary/40">
                  {tr(lang, "Time", "Horaire")}
                </th>
                {DAYS.map((d) => (
                  <th
                    key={d.n}
                    className={`px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wider ${
                      d.n === todayN ? "text-brand-primary" : "text-brand-secondary/40"
                    }`}
                  >
                    {d[lang]}
                    {d.n === todayN && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-primary align-middle" />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((t) => (
                <tr key={t} className="border-b border-brand-secondary/5 last:border-0">
                  <td className="px-4 py-3 align-top text-xs font-bold text-brand-secondary/60">{t.replace("-", " – ")}</td>
                  {DAYS.map((d) => (
                    <td key={d.n} className={`space-y-2 px-3 py-3 align-top ${d.n === todayN ? "bg-brand-primary/[0.02]" : ""}`}>
                      {slots.filter((s) => s.day === d.n && `${s.start}-${s.end}` === t).map(cell)}
                    </td>
                  ))}
                </tr>
              ))}
              {times.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-brand-secondary/50">
                    {tr(lang, "No timetable available.", "Aucun emploi du temps disponible.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Main>
    </AppShell>
  );
}
