import { createFileRoute } from "@tanstack/react-router";
import { BookCheck, BookOpen, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell, Main, PageHeader, btnGhost, btnPrimary, card, inputCls } from "../components/AppShell";
import { apiSend, useApi } from "../lib/api";
import { demoBooks, type Book } from "../lib/demo-data";
import { daysUntil, daysFromNow, fmtDate, loc, norm } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
  head: () => ({ meta: [{ title: "Digital Library — MiabeClass" }] }),
});

const LOAN_DAYS = 14;

function LibraryPage() {
  const { lang } = usePrefs();
  const { data, live } = useApi<Book[]>("/library/books", demoBooks, 60_000);
  const [books, setBooks] = useState<Book[]>(data);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [tab, setTab] = useState<"all" | "mine">("all");
  const [busy, setBusy] = useState<number | null>(null);

  useEffect(() => setBooks(data), [data]);

  const categories = useMemo(
    () => [...new Set(books.map((b) => loc(b.category, lang)))],
    [books, lang],
  );

  const list = useMemo(
    () =>
      books.filter(
        (b) =>
          (tab === "all" || b.borrowed) &&
          (cat === "all" || loc(b.category, lang) === cat) &&
          norm(`${b.title} ${b.author}`).includes(norm(q)),
      ),
    [books, q, cat, tab, lang],
  );

  const mine = books.filter((b) => b.borrowed);
  const availableTotal = books.reduce((a, b) => a + b.available, 0);

  const toggle = async (b: Book) => {
    setBusy(b.id);
    const action = b.borrowed ? "return" : "borrow";
    await apiSend("POST", `/library/books/${b.id}/${action}`);
    setBooks((cur) =>
      cur.map((x) =>
        x.id !== b.id
          ? x
          : action === "borrow"
            ? { ...x, borrowed: true, available: Math.max(0, x.available - 1), dueDate: daysFromNow(LOAN_DAYS) }
            : { ...x, borrowed: false, available: Math.min(x.copies, x.available + 1), dueDate: undefined },
      ),
    );
    setBusy(null);
  };

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={live}
          title={tr(lang, "Digital Library", "Bibliothèque numérique")}
          subtitle={tr(
            lang,
            `${books.length} titles • ${availableTotal} copies available • ${mine.length} on loan to you`,
            `${books.length} titres • ${availableTotal} exemplaires disponibles • ${mine.length} emprunté(s) par vous`,
          )}
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-secondary/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr(lang, "Title or author…", "Titre ou auteur…")} className={`${inputCls} pl-10`} />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${inputCls} sm:w-52`}>
            <option value="all">{tr(lang, "All categories", "Toutes les catégories")}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex gap-2">
          {(["all", "mine"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${tab === t ? "bg-brand-primary text-white" : btnGhost}`}
            >
              {t === "all" ? tr(lang, "Catalogue", "Catalogue") : tr(lang, `My loans (${mine.length})`, `Mes emprunts (${mine.length})`)}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className={`${card} p-10 text-center text-sm text-brand-secondary/50`}>
            {tab === "mine"
              ? tr(lang, "You have no book on loan.", "Vous n'avez aucun livre emprunté.")
              : tr(lang, "No book matches your search.", "Aucun livre ne correspond à votre recherche.")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((b) => {
              const left = b.dueDate ? daysUntil(b.dueDate) : null;
              const out = b.available === 0 && !b.borrowed;
              return (
                <article key={b.id} className={`${card} flex flex-col p-5`}>
                  <div className="mb-4 grid h-28 place-items-center rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 text-brand-primary">
                    {b.borrowed ? <BookCheck className="h-9 w-9" /> : <BookOpen className="h-9 w-9" />}
                  </div>
                  <span className="mb-2 w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase">{loc(b.category, lang)}</span>
                  <h2 className="text-sm font-semibold leading-snug">{b.title}</h2>
                  <p className="mt-1 text-xs text-brand-secondary/60">{b.author}</p>

                  <p className={`mt-3 text-[11px] font-bold ${out ? "text-red-500" : "text-brand-accent"}`}>
                    {out
                      ? tr(lang, "Unavailable", "Indisponible")
                      : tr(lang, `${b.available}/${b.copies} available`, `${b.available}/${b.copies} disponible(s)`)}
                  </p>
                  {b.borrowed && b.dueDate && left !== null && (
                    <p className={`mt-1 text-[11px] ${left < 0 ? "font-bold text-red-500" : "text-brand-secondary/60"}`}>
                      {left < 0
                        ? tr(lang, `Overdue by ${-left} day(s)`, `En retard de ${-left} jour(s)`)
                        : tr(lang, `Due ${fmtDate(lang, b.dueDate)} (${left} d)`, `À rendre le ${fmtDate(lang, b.dueDate)} (${left} j)`)}
                    </p>
                  )}

                  <div className="mt-auto pt-4">
                    <button
                      type="button"
                      disabled={busy === b.id || out}
                      onClick={() => toggle(b)}
                      className={`w-full ${b.borrowed ? btnGhost : btnPrimary}`}
                    >
                      {b.borrowed ? tr(lang, "Return", "Rendre") : tr(lang, "Borrow", "Emprunter")}
                    </button>
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
