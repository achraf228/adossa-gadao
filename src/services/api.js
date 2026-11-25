import axios from 'axios'

/** Laisser VITE_API_URL vide = mode démonstration : aucune requête réseau, données locales. */
export const API_URL = import.meta.env.VITE_API_URL || ''
export const IS_DEMO = !API_URL

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { Accept: 'application/json' },
})

// Phase 2 (Laravel) : ajouter ici l'intercepteur de jeton (Sanctum) et la gestion des erreurs 401/422.
api.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(new Error(err.response?.data?.message || 'Le serveur est injoignable. Réessayez dans un instant.')),
)

/** Simule une réponse serveur en mode démonstration. */
export const demo = (value, ms = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(value === undefined ? undefined : structuredClone(value)), ms))
