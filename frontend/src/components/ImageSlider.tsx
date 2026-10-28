import { Link, type LinkProps } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { type Lang, tr } from "../lib/prefs";

type Slide = {
  src: string;
  alt: { en: string; fr: string };
  /** légende optionnelle (la 1re image contient déjà son texte) */
  caption?: { title: { en: string; fr: string }; text: { en: string; fr: string } };
  to?: LinkProps["to"];
  /** couleur du point radio */
  color: string;
};

/**
 * Pour utiliser vos propres photos : remplacez les fichiers dans /public/slider
 * (même nom) ou changez `src` ci-dessous. Ratio conseillé : 1024×300.
 */
const SLIDES: Slide[] = [
  {
    src: "/slider/slide-1.jpg",
    alt: { en: "MiabeClass — Learn, teach, share", fr: "MiabeClass — Apprenez, enseignez, partagez" },
    color: "#f59e0b",
  },
  {
    src: "/slider/slide-2.svg",
    alt: { en: "Courses and learning materials", fr: "Cours et supports d'apprentissage" },
    caption: {
      title: { en: "Learn", fr: "Apprenez" },
      text: { en: "Courses, live classes and resources for every level.", fr: "Cours, classes en direct et ressources pour chaque niveau." },
    },
    to: "/courses",
    color: "#4f46e5",
  },
  {
    src: "/slider/slide-3.svg",
    alt: { en: "Teachers", fr: "Enseignants" },
    caption: {
      title: { en: "Teach", fr: "Enseignez" },
      text: { en: "Manage classes, timetables and attendance in one place.", fr: "Gérez classes, emplois du temps et présences au même endroit." },
    },
    to: "/teachers",
    color: "#10b981",
  },
  {
    src: "/slider/slide-4.svg",
    alt: { en: "Messaging", fr: "Messagerie" },
    caption: {
      title: { en: "Share", fr: "Partagez" },
      text: { en: "Stay in touch with teachers, parents and staff.", fr: "Restez en contact avec enseignants, parents et personnel." },
    },
    to: "/messaging",
    color: "#f43f5e",
  },
  {
    src: "/slider/slide-5.svg",
    alt: { en: "Digital library", fr: "Bibliothèque numérique" },
    caption: {
      title: { en: "Digital Library", fr: "Bibliothèque numérique" },
      text: { en: "Borrow books and follow your loans online.", fr: "Empruntez des livres et suivez vos prêts en ligne." },
    },
    to: "/library",
    color: "#0ea5e9",
  },
  {
    src: "/slider/slide-6.svg",
    alt: { en: "Exams", fr: "Examens" },
    caption: {
      title: { en: "Exams", fr: "Examens" },
      text: { en: "Upcoming dates, countdowns and published results.", fr: "Dates à venir, comptes à rebours et résultats publiés." },
    },
    to: "/exams",
    color: "#8b5cf6",
  },
];

const DELAY_MS = 4500;

export function ImageSlider({ lang }: { lang: Lang }) {
  const n = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const f = () => setReduced(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const running = !hover && !paused && !reduced;

  // `index` dans les dépendances : la minuterie repart à zéro après un clic manuel
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % n), DELAY_MS);
    return () => window.clearTimeout(id);
  }, [running, index, n]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={tr(lang, "Highlights", "À la une")}
      className="mb-10 sm:mb-12"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onKeyDown={onKey}
    >
      <div
        className="group relative overflow-hidden rounded-2xl border border-brand-secondary/5 bg-white shadow-sm"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={running ? "off" : "polite"}
        >
          {SLIDES.map((s, i) => {
            const inner = (
              <>
                <img
                  src={s.src}
                  alt={s.alt[lang]}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                {s.caption && (
                  <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/40 via-black/10 to-transparent px-6 text-white sm:px-12">
                    <h2 className="font-display text-2xl font-bold drop-shadow sm:text-4xl">
                      {s.caption.title[lang]}
                    </h2>
                    <p className="mt-1 max-w-md text-xs drop-shadow sm:mt-2 sm:text-base">
                      {s.caption.text[lang]}
                    </p>
                  </div>
                )}
              </>
            );
            const cls = "relative block aspect-[16/7] w-full shrink-0 sm:aspect-[1024/300]";
            return (
              <div
                key={s.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${n}`}
                aria-hidden={i !== index}
                className="w-full shrink-0"
              >
                {s.to ? (
                  <Link to={s.to} tabIndex={i === index ? 0 : -1} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* flèches */}
        {(["prev", "next"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(index + (d === "next" ? 1 : -1))}
            aria-label={d === "next" ? tr(lang, "Next slide", "Diapositive suivante") : tr(lang, "Previous slide", "Diapositive précédente")}
            className={`absolute top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-brand-secondary opacity-0 shadow transition hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:grid ${
              d === "next" ? "right-3" : "left-3"
            }`}
          >
            {d === "next" ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        ))}
      </div>

      {/* points radio colorés */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <div
          role="radiogroup"
          aria-label={tr(lang, "Choose a slide", "Choisir une diapositive")}
          className="flex items-center gap-2.5"
        >
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.src}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={`${tr(lang, "Slide", "Diapositive")} ${i + 1}`}
                onClick={() => go(i)}
                className="grid h-5 w-5 place-items-center rounded-full transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: s.color }}
              >
                <span
                  className="block rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: s.color,
                    background: active ? s.color : "transparent",
                    width: active ? 14 : 10,
                    height: active ? 14 : 10,
                    boxShadow: active ? `0 0 0 4px ${s.color}33` : "none",
                  }}
                />
              </button>
            );
          })}
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? tr(lang, "Play slideshow", "Lancer le diaporama") : tr(lang, "Pause slideshow", "Mettre en pause")}
            className="grid h-6 w-6 place-items-center rounded-full text-brand-secondary/50 hover:text-brand-primary"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    </section>
  );
}
