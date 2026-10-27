import { createFileRoute } from "@tanstack/react-router";
import { Radio, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell, Main, PageHeader, card, inputCls } from "../components/AppShell";
import { useApi } from "../lib/api";
import { demoCourses, type Course } from "../lib/demo-data";
import { fmtNumber, loc, norm } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
  head: () => ({ meta: [{ title: "Courses — MiabeClass" }] }),
});

const COLORS = [
  "bg-brand-primary/5 text-brand-primary",
  "bg-amber-500/10 text-amber-600",
  "bg-rose-500/10 text-rose-600",
  "bg-yellow-500/10 text-yellow-600",
  "bg-green-500/10 text-green-600",
];

function CoursesPage() {
  const { lang } = usePrefs();
  const { data, live } = useApi<Course[]>("/courses", demoCourses, 60_000);
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState("all");
  const [onlyLive, setOnlyLive] = useState(false);

  const grades = useMemo(() => [...new Set(data.map((c) => c.grade))], [data]);

  const list = useMemo(
    () =>
      data.filter(
        (c) =>
          (grade === "all" || c.grade === grade) &&
          (!onlyLive || c.live) &&
          norm(`${loc(c.title, lang)} ${c.teacher} ${c.grade}`).includes(norm(q)),
      ),
    [data, q, grade, onlyLive, lang],
  );

  const totalResources = list.reduce((a, c) => a + c.resources, 0);
  const liveCount = data.filter((c) => c.live).length;

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={live}
          title={tr(lang, "Courses", "Cours")}
          subtitle={tr(
            lang,
            `${fmtNumber(lang, data.length)} courses • ${liveCount} live now`,
            `${fmtNumber(lang, data.length)} cours • ${liveCount} en direct`,
          )}
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-secondary/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr(lang, "Search a course or teacher…", "Rechercher un cours ou un enseignant…")}
              className={`${inputCls} pl-10`}
            />
          </div>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className={`${inputCls} sm:w-52`}>
            <option value="all">{tr(lang, "All levels", "Tous les niveaux")}</option>
            {grades.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setOnlyLive((v) => !v)}
            aria-pressed={onlyLive}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 ring-inset transition-all ${
              onlyLive
                ? "bg-brand-accent/10 text-brand-accent ring-brand-accent/30"
                : "bg-white ring-brand-secondary/10 hover:bg-slate-50"
            }`}
          >
            <Radio className="h-4 w-4" />
            {tr(lang, "Live now", "En direct")}
          </button>
        </div>

        <p className="mb-4 text-xs text-brand-secondary/50">
          {tr(
            lang,
            `${list.length} result(s) • ${fmtNumber(lang, totalResources)} resources`,
            `${list.length} résultat(s) • ${fmtNumber(lang, totalResources)} ressources`,
          )}
        </p>

        {list.length === 0 ? (
          <div className={`${card} p-10 text-center text-sm text-brand-secondary/50`}>
            {tr(lang, "No course matches your search.", "Aucun cours ne correspond à votre recherche.")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => {
              const title = loc(c.title, lang);
              return (
                <article key={c.id} className={`${card} flex flex-col p-5`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${COLORS[i % COLORS.length]}`}>
                      {title.trim()[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold leading-snug">{title}</h2>
                      <p className="mt-1 text-xs text-brand-secondary/60">{c.grade} • {c.teacher}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-brand-secondary">
                      {tr(lang, `${c.resources} Resources`, `${c.resources} ressources`)}
                    </span>
                    {c.live && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase text-brand-accent">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent" />
                        {tr(lang, "Live now", "En direct")}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Main>
    </AppShell>
  );
}
