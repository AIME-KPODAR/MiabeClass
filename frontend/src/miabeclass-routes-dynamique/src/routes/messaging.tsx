import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AppShell, Main, PageHeader, btnPrimary, card, inputCls } from "../components/AppShell";
import { apiSend, useApi } from "../lib/api";
import { demoConversations, type Conversation } from "../lib/demo-data";
import { fmtTime, initials, loc, norm } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/messaging")({
  component: MessagingPage,
  head: () => ({ meta: [{ title: "Messaging — MiabeClass" }] }),
});

function MessagingPage() {
  const { lang } = usePrefs();
  const { data, live } = useApi<Conversation[]>("/messages", demoConversations, 20_000);
  const [convs, setConvs] = useState<Conversation[]>(data);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const end = useRef<HTMLDivElement>(null);

  // Nouvelles données serveur : la conversation ouverte reste « lue »
  useEffect(() => {
    setConvs(data.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const active = convs.find((c) => c.id === activeId) ?? null;
  const totalUnread = convs.reduce((a, c) => a + c.unread, 0);

  const list = useMemo(
    () => convs.filter((c) => norm(c.with).includes(norm(q))),
    [convs, q],
  );

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [active?.messages.length, activeId]);

  const open = (c: Conversation) => {
    setActiveId(c.id);
    if (c.unread > 0) {
      setConvs((cur) => cur.map((x) => (x.id === c.id ? { ...x, unread: 0 } : x)));
      apiSend("PATCH", `/messages/${c.id}/read`);
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!active || !text) return;
    const msg = { id: Date.now(), mine: true, text, at: new Date().toISOString() };
    setConvs((cur) =>
      cur.map((c) => (c.id === active.id ? { ...c, messages: [...c.messages, msg] } : c)),
    );
    setDraft("");
    await apiSend("POST", `/messages/${active.id}`, { text });
  };

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={live}
          title={tr(lang, "Messaging", "Messagerie")}
          subtitle={
            totalUnread > 0
              ? tr(lang, `${totalUnread} unread message(s)`, `${totalUnread} message(s) non lu(s)`)
              : tr(lang, "You are all caught up", "Vous êtes à jour")
          }
        />

        <div className={`${card} grid h-[70vh] min-h-[480px] overflow-hidden md:grid-cols-[320px_1fr]`}>
          {/* liste */}
          <div className={`${active ? "hidden md:flex" : "flex"} min-h-0 flex-col border-r border-brand-secondary/5`}>
            <div className="border-b border-brand-secondary/5 p-3">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr(lang, "Search…", "Rechercher…")} className={inputCls} />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {list.map((c) => {
                const last = c.messages[c.messages.length - 1];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => open(c)}
                    className={`flex w-full items-center gap-3 border-b border-brand-secondary/5 px-4 py-3.5 text-left transition hover:bg-slate-50 ${
                      c.id === activeId ? "bg-brand-primary/[0.05]" : ""
                    }`}
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 text-xs font-bold">
                      {initials(c.with)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold">{c.with}</p>
                        {last && <span className="shrink-0 text-[10px] text-brand-secondary/40">{fmtTime(lang, last.at)}</span>}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className={`truncate text-xs ${c.unread ? "font-semibold text-brand-secondary" : "text-brand-secondary/55"}`}>
                          {last ? `${last.mine ? tr(lang, "You: ", "Vous : ") : ""}${last.text}` : ""}
                        </p>
                        {c.unread > 0 && (
                          <span className="grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-brand-primary px-1 text-[9px] font-bold text-white">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              {list.length === 0 && (
                <p className="p-8 text-center text-xs text-brand-secondary/50">{tr(lang, "No conversation.", "Aucune conversation.")}</p>
              )}
            </div>
          </div>

          {/* fil */}
          <div className={`${active ? "flex" : "hidden md:flex"} min-h-0 flex-col`}>
            {active ? (
              <>
                <div className="flex items-center gap-3 border-b border-brand-secondary/5 px-4 py-3">
                  <button type="button" onClick={() => setActiveId(null)} aria-label={tr(lang, "Back", "Retour")} className="md:hidden">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 text-xs font-bold">
                    {initials(active.with)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{active.with}</p>
                    <p className="text-[11px] text-brand-secondary/50">{loc(active.role, lang)}</p>
                  </div>
                </div>
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/50 p-4">
                  {active.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.mine ? "rounded-br-sm bg-brand-primary text-white" : "rounded-bl-sm bg-white shadow-sm ring-1 ring-brand-secondary/5"}`}>
                        <p className="whitespace-pre-wrap break-words">{m.text}</p>
                        <p className={`mt-1 text-[10px] ${m.mine ? "text-white/60" : "text-brand-secondary/40"}`}>{fmtTime(lang, m.at)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={end} />
                </div>
                <form onSubmit={send} className="flex gap-2 border-t border-brand-secondary/5 p-3">
                  <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={tr(lang, "Write a message…", "Écrire un message…")} className={inputCls} />
                  <button type="submit" disabled={!draft.trim()} className={btnPrimary} aria-label={tr(lang, "Send", "Envoyer")}>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="grid flex-1 place-items-center p-8 text-center text-sm text-brand-secondary/50">
                {tr(lang, "Select a conversation to start.", "Sélectionnez une conversation pour commencer.")}
              </div>
            )}
          </div>
        </div>
      </Main>
    </AppShell>
  );
}
