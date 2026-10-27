import { useId, useState } from "react";

export type Series = {
  name: string;
  color: string;
  values: number[];
  /** suffixe affiché dans l'infobulle, ex. "%" */
  unit?: string;
};

const W = 800;
const H = 300;
const PAD = 24;

/** Courbe lissée (Catmull-Rom → Bézier) */
function smoothPath(pts: [number, number][]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M${pts[0][0]},${pts[0][1]}`;
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * Graphique en courbes 100 % piloté par les données :
 * échelle calculée sur les valeurs, survol avec infobulle, étiquettes dynamiques.
 */
export function LineChart({
  labels,
  series,
  emptyText = "—",
}: {
  labels: string[];
  series: Series[];
  emptyText?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const n = labels.length;
  const all = series.flatMap((s) => s.values).filter(Number.isFinite);

  if (n === 0 || all.length === 0) {
    return (
      <div className="grid aspect-[21/9] w-full place-items-center rounded-xl bg-slate-50 text-xs text-brand-secondary/50">
        {emptyText}
      </div>
    );
  }

  let min = Math.floor(Math.min(...all) / 5) * 5 - 5;
  let max = Math.ceil(Math.max(...all) / 5) * 5 + 5;
  if (min < 0 && Math.min(...all) >= 0) min = 0;
  if (max === min) max = min + 10;

  const x = (i: number) => (n === 1 ? W / 2 : (i * W) / (n - 1));
  const y = (v: number) =>
    H - PAD - ((v - min) / (max - min)) * (H - PAD * 2);

  const gridLines = [0, 1, 2, 3, 4].map((k) => ({
    y: PAD + (k * (H - PAD * 2)) / 4,
    v: Math.round(max - (k * (max - min)) / 4),
  }));

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - r.left) / r.width;
    setHover(Math.max(0, Math.min(n - 1, Math.round(rel * (n - 1)))));
  };

  return (
    <div>
      <div
        className="relative"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        onTouchMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const rel = (e.touches[0].clientX - r.left) / r.width;
          setHover(
            Math.max(0, Math.min(n - 1, Math.round(rel * (n - 1)))),
          );
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="aspect-[21/9] w-full rounded-xl bg-slate-50"
          preserveAspectRatio="none"
          role="img"
          aria-label={series.map((s) => s.name).join(", ")}
        >
          <defs>
            {series.map((s, i) => (
              <linearGradient
                key={s.name}
                id={`${uid}g${i}`}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {gridLines.map((g) => (
            <line
              key={g.y}
              x1="0"
              x2={W}
              y1={g.y}
              y2={g.y}
              stroke="#e2e8f0"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {series.map((s, i) => {
            const pts = s.values.map((v, k) => [x(k), y(v)] as [number, number]);
            const line = smoothPath(pts);
            return (
              <g key={s.name}>
                {pts.length > 1 && (
                  <path
                    d={`${line} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`}
                    fill={`url(#${uid}g${i})`}
                  />
                )}
                <path
                  d={line}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
          {hover !== null && (
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1="0"
              y2={H}
              stroke="#94a3b8"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {/* repères de l'axe Y (HTML, non déformés) */}
        {gridLines.map((g) => (
          <span
            key={g.y}
            className="pointer-events-none absolute left-2 text-[9px] font-medium text-brand-secondary/35"
            style={{ top: `${(g.y / H) * 100}%`, transform: "translateY(-120%)" }}
          >
            {g.v}
          </span>
        ))}

        {hover !== null &&
          series.map((s) =>
            s.values[hover] === undefined ? null : (
              <span
                key={s.name}
                className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                style={{
                  left: `${(x(hover) / W) * 100}%`,
                  top: `${(y(s.values[hover]) / H) * 100}%`,
                  background: s.color,
                }}
              />
            ),
          )}

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 min-w-[120px] rounded-lg border border-brand-secondary/10 bg-white px-3 py-2 text-[11px] shadow-lg"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              transform:
                hover > n / 2 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
            }}
          >
            <p className="mb-1 font-bold text-brand-secondary">{labels[hover]}</p>
            {series.map((s) => (
              <p key={s.name} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-brand-secondary/60">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: s.color }}
                  />
                  {s.name}
                </span>
                <span className="font-bold text-brand-secondary">
                  {s.values[hover]}
                  {s.unit ?? ""}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-between px-1 text-[10px] font-medium text-brand-secondary/45">
        {labels.map((l, i) => (
          <span key={`${l}-${i}`} className={hover === i ? "text-brand-primary" : ""}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
