/** Médias de démonstration (aucune image réelle fournie). `src: null` = emplacement à fournir. */
const T = ['brown', 'gold', 'wine', 'bark', 'sand']
let i = 0
const m = (type, year, title) => ({ id: `m${++i}`, type, year, title, src: null, videoSrc: null, tone: T[i % T.length] })

export const ARCHIVE_MEDIA = [
  m('photo', 2026, 'Photo 2026 · à fournir'), m('photo', 2026, 'Photo 2026 · à fournir'),
  m('video', 2026, 'Vidéo 2026 · à fournir'), m('poster', 2026, 'Affiche 2026 · à fournir'),
  m('photo', 2025, 'Photo 2025 · à fournir'), m('photo', 2025, 'Photo 2025 · à fournir'),
  m('video', 2025, 'Vidéo 2025 · à fournir'), m('poster', 2025, 'Affiche 2025 · à fournir'),
  m('photo', 2024, 'Photo 2024 · à fournir'), m('video', 2024, 'Vidéo 2024 · à fournir'),
  m('poster', 2024, 'Affiche 2024 · à fournir'),
]

export const CULTURE_GALLERY = [
  { id: 'g1', type: 'photo', year: null, title: 'Photo à fournir', src: null, tone: 'brown' },
  { id: 'g2', type: 'photo', year: null, title: 'Photo à fournir', src: null, tone: 'gold' },
  { id: 'g3', type: 'video', year: null, title: 'Vidéo à fournir', src: null, videoSrc: null, tone: 'bark' },
  { id: 'g4', type: 'photo', year: null, title: 'Photo à fournir', src: null, tone: 'wine' },
]

export const PAST_COMMUNIQUES = [
  { id: 'c1', year: 2026, title: 'Communiqué officiel', file: null },
  { id: 'c2', year: 2025, title: 'Communiqué officiel', file: null },
  { id: 'c3', year: 2024, title: 'Communiqué officiel', file: null },
]
