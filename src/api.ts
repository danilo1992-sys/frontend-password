const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export { API_BASE };

/**
 * Concatena la base con un path.
 *
 * `router: false` sirve para endpoints que NO viven bajo el prefijo del router
 * (p. ej. `/phishing/check`, que se monta en la raíz de la API): en ese caso
 * se omite el `/router` final de la base si lo tiene.
 */
export function apiUrl(
  path: string,
  { router = true }: { router?: boolean } = {},
): string {
  const base = router ? API_BASE : API_BASE.replace(/\/router\/?$/, "");
  return `${base}/${path.replace(/^\/+/, "")}`;
}
