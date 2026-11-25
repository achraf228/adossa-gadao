export const cn = (...c) => c.filter(Boolean).join(' ')

export const formatDate = (iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  iso ? new Intl.DateTimeFormat('fr-FR', opts).format(new Date(iso)) : '—'

export const pad = (n) => String(n).padStart(2, '0')
