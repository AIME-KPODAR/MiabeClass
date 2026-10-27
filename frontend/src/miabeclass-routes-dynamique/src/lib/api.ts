import { useCallback, useEffect, useRef, useState } from "react";

/**
 * URL de l'API. Définir VITE_API_URL dans .env pour changer
 * (ex. VITE_API_URL=http://12.0.0.153:3000/api).
 */
export const API_URL: string =
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_URL ?? "http://localhost:3000/api";

/** L'API peut répondre `{ success, data }` ou directement l'objet. */
function unwrap<T>(json: unknown): T {
  if (json && typeof json === "object" && "data" in json) {
    return (json as { data: T }).data;
  }
  return json as T;
}

export type ApiState<T> = {
  data: T;
  /** true = données venant de l'API ; false = données de secours (API injoignable) */
  live: boolean;
  loading: boolean;
  reload: () => void;
};

/**
 * Charge `path` depuis l'API. Si l'API est injoignable, `fallback` est utilisé
 * pour que l'interface reste utilisable (mode démo). Rafraîchit toutes les
 * `refreshMs` ms si fourni.
 */
export function useApi<T>(
  path: string,
  fallback: T,
  refreshMs?: number,
): ApiState<T> {
  const [data, setData] = useState<T>(fallback);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const alive = useRef(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}${path}`);
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      if (!alive.current) return;
      setData(unwrap<T>(json));
      setLive(true);
    } catch {
      if (!alive.current) return;
      setLive(false);
    } finally {
      if (alive.current) setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    alive.current = true;
    load();
    let id: number | undefined;
    if (refreshMs) id = window.setInterval(load, refreshMs);
    return () => {
      alive.current = false;
      if (id) window.clearInterval(id);
    };
  }, [load, refreshMs]);

  return { data, live, loading, reload: load };
}

/** Envoie une écriture à l'API. Renvoie true si le serveur a accepté. */
export async function apiSend(
  method: "POST" | "PATCH" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.ok;
  } catch {
    return false;
  }
}
