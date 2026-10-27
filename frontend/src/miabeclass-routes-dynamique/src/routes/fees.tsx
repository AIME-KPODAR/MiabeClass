import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell, Main, PageHeader, btnGhost, btnPrimary, card, inputCls } from "../components/AppShell";
import { apiSend, useApi } from "../lib/api";
import { demoDashboard, demoPayments, type Payment } from "../lib/demo-data";
import { fmtDate, fmtMoney } from "../lib/format";
import { tr, usePrefs } from "../lib/prefs";

export const Route = createFileRoute("/fees")({
  component: FeesPage,
  head: () => ({ meta: [{ title: "Fee Management — MiabeClass" }] }),
});

type Status = Payment["status"];

const STATUS_STYLE: Record<Status, string> = {
  paid: "bg-brand-accent/10 text-brand-accent",
  pending: "bg-amber-500/10 text-amber-600",
  late: "bg-red-500/10 text-red-600",
};

function FeesPage() {
  const { lang } = usePrefs();
  const { data, live } = useApi<Payment[]>("/fees/payments", demoPayments, 60_000);
  const { data: dash } = useApi("/dashboard", demoDashboard);
  const [items, setItems] = useState<Payment[]>(data);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: "", label: "", amount: "", status: "paid" as Status });
  const [saving, setSaving] = useState(false);

  useEffect(() => setItems(data), [data]);

  const label: Record<Status, string> = {
    paid: tr(lang, "Paid", "Payé"),
    pending: tr(lang, "Pending", "En attente"),
    late: tr(lang, "Late", "En retard"),
  };

  const sum = (s: Status) => items.filter((p) => p.status === s).reduce((a, p) => a + p.amount, 0);
  const paid = sum("paid");
  const pending = sum("pending");
  const late = sum("late");
  const total = paid + pending + late;
  const pct = total ? Math.round((paid / total) * 100) : 0;

  const list = useMemo(
    () =>
      [...items]
        .filter((p) => filter === "all" || p.status === filter)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [items, filter],
  );
  const listTotal = list.reduce((a, p) => a + p.amount, 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.student.trim() || !form.label.trim() || !(amount > 0)) return;
    setSaving(true);
    const payment: Payment = {
      id: Date.now(),
      student: form.student.trim(),
      label: form.label.trim(),
      receipt: String(Date.now()).slice(-6),
      amount,
      status: form.status,
      date: new Date().toISOString(),
    };
    await apiSend("POST", "/fees/payments", payment); // si l'API est hors-ligne, l'écran se met à jour quand même
    setItems((c) => [payment, ...c]);
    setForm({ student: "", label: "", amount: "", status: "paid" });
    setShowForm(false);
    setSaving(false);
  };

  const tabs: Array<"all" | Status> = ["all", "paid", "pending", "late"];

  return (
    <AppShell>
      <Main>
        <PageHeader
          lang={lang}
          live={live}
          title={tr(lang, "Fee Management", "Gestion des frais")}
          subtitle={tr(
            lang,
            `Annual target: ${fmtMoney(lang, dash.fees.expected)}`,
            `Objectif annuel : ${fmtMoney(lang, dash.fees.expected)}`,
          )}
          actions={
            <button type="button" className={btnPrimary} onClick={() => setShowForm((v) => !v)}>
              <Plus className="h-4 w-4" />
              {tr(lang, "Record a payment", "Enregistrer un paiement")}
            </button>
          }
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { l: tr(lang, "Collected", "Encaissé"), v: paid, c: "text-brand-accent" },
            { l: tr(lang, "Pending", "En attente"), v: pending, c: "text-amber-500" },
            { l: tr(lang, "Late", "En retard"), v: late, c: "text-red-500" },
          ].map((s) => (
            <div key={s.l} className={`${card} p-5`}>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary/40">{s.l}</span>
              <p className={`mt-1 text-2xl font-bold ${s.c}`}>{fmtMoney(lang, s.v)}</p>
            </div>
          ))}
        </div>

        <div className={`${card} mb-6 p-5`}>
          <div className="mb-2 flex justify-between text-xs font-bold">
            <span>{tr(lang, "Collection rate", "Taux de recouvrement")}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-accent transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {showForm && (
          <form onSubmit={submit} className={`${card} mb-6 grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-5`}>
            <input required value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} placeholder={tr(lang, "Student", "Élève")} className={inputCls} />
            <input required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder={tr(lang, "Description", "Libellé")} className={inputCls} />
            <input required type="number" min={1} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder={tr(lang, "Amount (XOF)", "Montant (FCFA)")} className={inputCls} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Status })} className={inputCls}>
              {(Object.keys(label) as Status[]).map((s) => (
                <option key={s} value={s}>{label[s]}</option>
              ))}
            </select>
            <button type="submit" disabled={saving} className={btnPrimary}>
              {saving ? tr(lang, "Saving…", "Enregistrement…") : tr(lang, "Save", "Enregistrer")}
            </button>
          </form>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                filter === t ? "bg-brand-primary text-white" : btnGhost
              }`}
            >
              {t === "all" ? tr(lang, "All", "Tous") : label[t]}{" "}
              <span className="opacity-60">({t === "all" ? items.length : items.filter((p) => p.status === t).length})</span>
            </button>
          ))}
        </div>

        <div className={`${card} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-brand-secondary/5 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-brand-secondary/50">
                <tr>
                  <th className="px-5 py-3">{tr(lang, "Receipt", "Reçu")}</th>
                  <th className="px-5 py-3">{tr(lang, "Student", "Élève")}</th>
                  <th className="px-5 py-3">{tr(lang, "Description", "Libellé")}</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">{tr(lang, "Status", "Statut")}</th>
                  <th className="px-5 py-3 text-right">{tr(lang, "Amount", "Montant")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-secondary/5">
                {list.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 text-xs text-brand-secondary/60">n°{p.receipt}</td>
                    <td className="px-5 py-3 font-medium">{p.student}</td>
                    <td className="px-5 py-3 text-brand-secondary/70">{typeof p.label === "string" ? p.label : p.label[lang]}</td>
                    <td className="px-5 py-3 text-xs text-brand-secondary/60">{fmtDate(lang, p.date)}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_STYLE[p.status]}`}>{label[p.status]}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-bold">{fmtMoney(lang, p.amount)}</td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-brand-secondary/50">
                      {tr(lang, "No payment.", "Aucun paiement.")}
                    </td>
                  </tr>
                )}
              </tbody>
              {list.length > 0 && (
                <tfoot className="border-t border-brand-secondary/10 bg-slate-50/50">
                  <tr>
                    <td colSpan={5} className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-secondary/50">Total</td>
                    <td className="px-5 py-3 text-right font-bold">{fmtMoney(lang, listTotal)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </Main>
    </AppShell>
  );
}
