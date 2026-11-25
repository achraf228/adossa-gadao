export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^\+?[0-9\s().-]{8,18}$/
export const NAME_RE = /^[\p{L}][\p{L}\s'’.-]+$/u

export const MAX_IMAGE_MB = 5
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MEDIA_TYPES = [...IMAGE_TYPES, 'video/mp4', 'video/webm']

/** Retourne un message d'erreur ou null. */
export function validateFile(file, { types = IMAGE_TYPES, maxMb = MAX_IMAGE_MB } = {}) {
  if (!file) return null
  if (!types.includes(file.type)) return 'Format non accepté. Utilisez ' + types.map((t) => t.split('/')[1].toUpperCase()).join(', ') + '.'
  if (file.size > maxMb * 1024 * 1024) return `Fichier trop lourd (maximum ${maxMb} Mo).`
  return null
}

export function validateBirthDate(value) {
  if (!value) return 'Indiquez votre date de naissance.'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return 'Date invalide.'
  if (d > new Date()) return 'La date de naissance ne peut pas être dans le futur.'
  if (d.getFullYear() < 1920) return 'Vérifiez l’année de naissance.'
  return true
}
