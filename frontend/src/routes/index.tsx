import { Link, createFileRoute, type LinkProps } from "@tanstack/react-router";
import { BookOpen, CalendarClock, ClipboardCheck, MessageSquare } from "lucide-react";

import { AppShell, Main } from "../components/AppShell";
import { LineChart } from "../components/LineChart";
import { useApi } from "../lib/api";
import { demoDashboard, type Dashboard } from "../lib/demo-data";
import {
  fmtCompact,
  fmtMoney,
  fmtNumber,
  fmtPercent,
  loc,
} from "../lib/format";
import { type Lang, tr, usePrefs } from "../lib/prefs";
import { useCountUp } from "../lib/useCountUp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MiabeClass — Digital Education Platform for Modern Schools" },
      {
        name: "description",
        content:
          "MiabeClass unifies student, teacher, and parent workflows: enrollment, attendance, grades, coursework, messaging, analytics, and secure school fee payments.",
      },
    ],
  }),
});

const REFRESH_MS = 60_000;

const COURSE_COLORS = [
  "bg-brand-primary/5 text-brand-primary",
  "bg-amber-500/10 text-amber-600",
  "bg-rose-500/10 text-rose-600",
  "bg-yellow-500/10 text-yellow-600",
  "bg-green-500/10 text-green-600",
];

const NOTICE_STYLE = {
  urgent: { border: "border-brand-primary", text: "text-brand-primary" },
  event: { border: "border-white/20", text: "text-white/40" },
  holiday: { border: "border-white/20", text: "text-white/40" },
} as const;

function Stat({
  label,
  value,
  format,
  delta,
  tone = "accent",
}: {
  label: string;
  /** valeur finale ; le chiffre affiché défile de 0 jusqu'à elle */
  value: number;
  format: (n: number) => string;
  delta: string;
  tone?: "accent" | "muted" | "amber" | "red";
}) {
  const toneClass = {
    accent: "text-brand-accent",
    amber: "text-amber-500",
    red: "text-red-500",
    muted: "text-brand-secondary/60",
  }[tone];
  const shown = useCountUp(value);
  return (
    <div className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">
        {label}
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums">{format(shown)}</span>
        <span className={`text-xs font-medium ${toneClass}`}>{delta}</span>
      </div>
    </div>
  );
}

function CourseRow({
  letter,
  color,
  title,
  meta,
  chips,
}: {
  letter: string;
  color: string;
  title: string;
  meta: string;
  chips: Array<{ label: string; live?: boolean }>;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 py-4 sm:flex sm:items-center sm:gap-4 sm:px-6 sm:py-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}
      >
        <span className="text-lg font-bold sm:text-xl">{letter}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold">{title}</h3>
        <p className="truncate text-xs text-brand-secondary/60">{meta}</p>
      </div>
      <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:justify-end">
        {chips.map((c) => (
          <span
            key={c.label}
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
              c.live
                ? "bg-brand-accent/10 text-brand-accent"
                : "bg-slate-100 text-brand-secondary"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuickLink({
  to,
  icon,
  label,
}: {
  to: LinkProps["to"];
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center rounded-2xl border border-brand-secondary/5 bg-white p-4 text-center transition-all hover:border-brand-primary/20"
    >
      <div className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-brand-primary">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tight">
        {label}
      </span>
    </Link>
  );
}

function trend(lang: Lang, now: number, prev: number, stableLabel: string) {
  if (!prev) return { text: stableLabel, tone: "muted" as const };
  const pct = ((now - prev) / prev) * 100;
  if (Math.abs(pct) < 0.5) return { text: stableLabel, tone: "accent" as const };
  const sign = pct > 0 ? "+" : "";
  return {
    text: `${sign}${fmtPercent(lang, Math.round(pct * 10) / 10)}`,
    tone: pct > 0 ? ("accent" as const) : ("red" as const),
  };
}

function Index() {
  const { lang } = usePrefs();
  const { data: d, live, loading } = useApi<Dashboard>(
    "/dashboard",
    demoDashboard,
    REFRESH_MS,
  );
  // Tant que l'API n'a pas répondu, les compteurs restent à 0 ; ils défilent ensuite jusqu'à la vraie valeur.
  const s = loading
    ? { ...d.stats, students: 0, teacherAttendance: 0, testimonies: 0, openRequests: 0 }
    : d.stats;

  const real = d.stats;
  const studentsTrend = trend(lang, real.students, real.studentsPrev, tr(lang, "Stable", "Stable"));
  // Écart de présence en points (pas en %) pour les enseignants
  const attDiff = Math.round((real.teacherAttendance - real.teacherAttendancePrev) * 10) / 10;
  const attDelta =
    Math.abs(attDiff) < 0.5
      ? tr(lang, "Stable", "Stable")
      : `${attDiff > 0 ? "+" : ""}${fmtNumber(lang, attDiff)} pt`;
  const targetPct = real.testimoniesTarget
    ? Math.round((real.testimonies / real.testimoniesTarget) * 100)
    : 0;

  const feesPct = d.fees.expected
    ? Math.min(100, Math.round((d.fees.collected / d.fees.expected) * 100))
    : 0;
  const pending = Math.max(0, d.fees.expected - d.fees.collected);

  const noticeLabel = {
    urgent: tr(lang, "Urgent", "Urgent"),
    event: tr(lang, "Event", "Événement"),
    holiday: tr(lang, "Holiday", "Congé"),
  };

  return (
    <AppShell>
      <Main>
        <section className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
              MiabeClass
            </h1>
            <p className="mt-2 text-sm text-brand-secondary/60 sm:text-base">
              {loc(d.term, lang)}
            </p>
            {!live && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {tr(
                  lang,
                  "Demo data — API unreachable",
                  "Données de démonstration — API injoignable",
                )}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/newTeacherEnrollment"
              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-brand-secondary/10 transition-all hover:bg-slate-50 sm:flex-none sm:px-5"
            >
              {tr(lang, "New Enrollment Teacher", "Nouvelle inscription Enseignant(e)")}
            </Link>
            <Link
              to="/newStudentEnrollment"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-primary/90 sm:flex-none sm:px-5"
            >
              {tr(lang, "New Enrollment Student", "Nouvelle inscription Elève")}
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label={tr(lang, "Total Students", "Total des élèves")}
            value={s.students}
            format={(n) => fmtNumber(lang, Math.round(n))}
            delta={studentsTrend.text}
            tone={studentsTrend.tone}
          />
          <Stat
            label={tr(lang, "Teacher Attendance", "Présence enseignants")}
            value={s.teacherAttendance}
            format={(n) => fmtPercent(lang, Math.round(n * 10) / 10)}
            delta={attDelta}
            tone={attDiff < -0.5 ? "red" : "accent"}
          />
          <Stat
            label={tr(lang, "Testimony", "Témoignages")}
            value={s.testimonies}
            format={(n) => fmtCompact(lang, Math.round(n))}
            delta={tr(lang, `${targetPct}% Target`, `${targetPct} % de l'objectif`)}
            tone={targetPct >= 100 ? "accent" : "amber"}
          />
          <Stat
            label={tr(lang, "Open Requests", "Demandes ouvertes")}
            value={s.openRequests}
            format={(n) => fmtNumber(lang, Math.round(n))}
            delta={tr(lang, "Parent Tickets", "Tickets parents")}
            tone="muted"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-brand-secondary/5 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-secondary/5 bg-slate-50/50 px-6 py-4">
                <h2 className="font-display font-bold">
                  {tr(lang, "Course Management & Materials", "Gestion des cours et supports")}
                </h2>
                <Link to="/courses" className="text-xs font-bold text-brand-primary">
                  {tr(lang, "View All", "Tout voir")}
                </Link>
              </div>
              <div className="divide-y divide-brand-secondary/5">
                {d.courses.slice(0, 5).map((c, i) => {
                  const title = loc(c.title, lang);
                  return (
                    <CourseRow
                      key={c.id}
                      letter={title.trim()[0]?.toUpperCase() ?? "?"}
                      color={COURSE_COLORS[i % COURSE_COLORS.length]}
                      title={title}
                      meta={`${c.grade} • ${c.teacher}`}
                      chips={[
                        {
                          label: tr(
                            lang,
                            `${c.resources} Resources`,
                            `${c.resources} ressources`,
                          ),
                        },
                        ...(c.live
                          ? [{ label: tr(lang, "Live now", "En direct"), live: true }]
                          : []),
                      ]}
                    />
                  );
                })}
                {d.courses.length === 0 && (
                  <p className="px-6 py-8 text-center text-xs text-brand-secondary/50">
                    {tr(lang, "No courses yet", "Aucun cours pour le moment")}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm" id="analytics">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display font-bold">
                  {tr(lang, "Institutional Performance Analytics", "Analyses de performance de l'établissement")}
                </h2>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                    {tr(lang, "Performance", "Performance")}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                    {tr(lang, "Attendance", "Assiduité")}
                  </span>
                </div>
              </div>
              <LineChart
                emptyText={tr(lang, "No data yet", "Pas encore de données")}
                labels={d.analytics.map((a) => loc(a.label, lang))}
                series={[
                  {
                    name: tr(lang, "Performance", "Performance"),
                    color: "#4f46e5",
                    values: d.analytics.map((a) => a.performance),
                    unit: "%",
                  },
                  {
                    name: tr(lang, "Attendance", "Assiduité"),
                    color: "#10b981",
                    values: d.analytics.map((a) => a.attendance),
                    unit: "%",
                  },
                ]}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-brand-secondary p-6 text-white">
              <h2 className="font-display text-lg font-bold">
                {tr(lang, "Recent School Notices", "Avis récents de l'école")}
              </h2>
              <div className="mt-6 space-y-4">
                {d.notices.slice(0, 4).map((n) => (
                  <div key={n.id} className={`border-l-2 pl-4 ${NOTICE_STYLE[n.type].border}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${NOTICE_STYLE[n.type].text}`}>
                      {noticeLabel[n.type]}
                    </p>
                    <p className="mt-1 text-sm font-medium">{loc(n.message, lang)}</p>
                  </div>
                ))}
                {d.notices.length === 0 && (
                  <p className="text-sm text-white/50">
                    {tr(lang, "No notices", "Aucun avis")}
                  </p>
                )}
              </div>
              <Link
                to="/notifications"
                className="mt-6 block w-full rounded-xl bg-white/10 py-3 text-center text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/20"
              >
                {tr(lang, "Broadcasting System", "Système de diffusion")}
              </Link>
            </div>

            <div className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm" id="fees">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold">
                  {tr(lang, "Testimony Status", "État des témoignages")}
                </h2>
                <Link to="/fees" className="text-xs font-bold text-brand-primary">
                  {tr(lang, "Details", "Détails")}
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className="relative h-2 flex-1 rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={feesPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-brand-accent transition-all duration-700"
                    style={{ width: `${feesPct}%` }}
                  />
                </div>
                <span className="text-sm font-bold">{feesPct}%</span>
              </div>
              <p className="mt-2 text-xs text-brand-secondary/60">
                {tr(
                  lang,
                  `${fmtMoney(lang, pending)} pending this month`,
                  `${fmtMoney(lang, pending)} en attente ce mois-ci`,
                )}
              </p>
              <div className="mt-6 space-y-3">
                {d.recentPayments.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-brand-secondary/5 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold">
                        {loc(p.label, lang)} - {p.student}
                      </p>
                      <p className="text-[10px] text-brand-secondary/50">
                        {tr(lang, `Receipt n°${p.receipt}`, `Reçu n°${p.receipt}`)}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-brand-accent">
                      +{fmtMoney(lang, p.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <QuickLink to="/library" icon={<BookOpen className="h-4 w-4" />} label={tr(lang, "Digital Library", "Bibliothèque numérique")} />
              <QuickLink to="/messaging" icon={<MessageSquare className="h-4 w-4" />} label={tr(lang, "Messaging", "Messagerie")} />
              <QuickLink to="/timetable" icon={<CalendarClock className="h-4 w-4" />} label={tr(lang, "Timetable", "Emploi du temps")} />
              <QuickLink to="/exams" icon={<ClipboardCheck className="h-4 w-4" />} label={tr(lang, "Exams", "Examens")} />
            </div>
          </div>
        </div>
      </Main>
    </AppShell>
  );
}
