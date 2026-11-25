export const EDITION_DATES = {
  year: 2027,
  start: '2027-01-08T00:00:00Z', // heure de Lomé (UTC+0)
  end: '2027-01-10T23:59:59Z',
  startDay: '2027-01-08',
  endDay: '2027-01-10',
  label: '8 – 10 janvier 2027',
}

export const PROGRAM_2027 = [
  { id: 'd1', day: 'Vendredi 8 janvier', title: 'Célébration de Maouloud', description: 'Célébration de Maouloud, festivités liées à l’anniversaire du prophète Mohamed.', tone: 'gold' },
  { id: 'd2', day: 'Samedi 9 janvier', title: 'Apothéose de la fête Gadao-Adossa', description: 'Apothéose de la fête Gadao-Adossa : moisson et initiation pour l’immunisation contre le couteau.', tone: 'bark' },
  { id: 'd3', day: 'Dimanche 10 janvier', title: 'Kosso', description: 'Kosso, danse des femmes dignitaires Tem.', tone: 'wine' },
]

/** Données de démonstration — structure à aligner avec l'API Laravel. */
export const EDITIONS_DEMO = [
  { id: 'e2027', year: 2027, theme: 'Célébrer l’héritage, bâtir demain !', startDate: '2027-01-08', endDate: '2027-01-10', status: 'draft', posterName: '',
    program: [
      { id: 'p1', label: 'Jour 1', title: 'Célébration de Maouloud' },
      { id: 'p2', label: 'Jour 2', title: 'Apothéose de la fête Gadao-Adossa' },
      { id: 'p3', label: 'Jour 3', title: 'Kosso' },
    ] },
  { id: 'e2026', year: 2026, theme: 'Thème à renseigner', startDate: '', endDate: '', status: 'archived', posterName: '', program: [] },
  { id: 'e2025', year: 2025, theme: 'Thème à renseigner', startDate: '', endDate: '', status: 'archived', posterName: '', program: [] },
]
