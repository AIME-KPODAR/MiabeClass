import { useEffect, useRef, useState } from "react";

/**
 * Fait défiler un nombre de sa valeur affichée jusqu'à `target`
 * (de 0 au premier affichage, puis de l'ancienne valeur à la nouvelle
 * quand les données sont rafraîchies). Respecte « réduire les animations ».
 */
export function useCountUp(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);
  const shown = useRef(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || duration <= 0) {
      shown.current = target;
      setValue(target);
      return;
    }
    const from = shown.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const v = from + (target - from) * eased;
      shown.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
