/**
 * Único punto donde se arma la base de la API.
 *
 * `VITE_API_URL` es la base del backend **incluyendo el prefijo del router**
 * (ver `render.yml` y `.env.example`), por ejemplo:
 *
 *     VITE_API_URL="https://api-pasword.onrender.com/router"
 *
 * Por eso `apiUrl("generate")` produce `.../router/generate` y NO
 * `.../routergenerate` ni `.../router/router/generate`.
 */
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export { API_BASE };

/** Concatena la base con un path, normalizando las barras. */
export function apiUrl(path: string): string {
  return `${API_BASE}/${path.replace(/^\/+/, "")}`;
}
