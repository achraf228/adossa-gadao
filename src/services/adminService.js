import { api, demo, IS_DEMO } from './api'
import { EDITIONS_DEMO } from '../data/editions'
import { CANDIDATURES_DEMO, MESSAGES_DEMO, MEMBERS_DEMO, NEWS_DEMO, SETTINGS_DEMO, VISITS_DEMO } from '../data/admin'
import { ARCHIVE_MEDIA } from '../data/archives'
import { CULTURE_SECTIONS } from '../data/site'

/* Base en mémoire (mode démonstration) : les modifications persistent le temps de la session,
   pour que le tableau de bord et les autres pages restent cohérents. Rechargement = remise à zéro. */
const db = {
  editions: structuredClone(EDITIONS_DEMO),
  candidatures: structuredClone(CANDIDATURES_DEMO),
  messages: structuredClone(MESSAGES_DEMO),
  members: structuredClone(MEMBERS_DEMO),
  news: structuredClone(NEWS_DEMO),
  media: structuredClone(ARCHIVE_MEDIA),
  settings: structuredClone(SETTINGS_DEMO),
  culture: structuredClone(CULTURE_SECTIONS),
}

const list = (key, url) => (IS_DEMO ? demo(db[key], 350) : api.get(url).then((r) => r.data))

function update(key, url, id, patch) {
  if (!IS_DEMO) return api.patch(`${url}/${id}`, patch).then((r) => r.data)
  db[key] = db[key].map((x) => (x.id === id ? { ...x, ...patch } : x))
  return demo(db[key].find((x) => x.id === id), 250)
}
function create(key, url, item) {
  if (!IS_DEMO) return api.post(url, item).then((r) => r.data)
  const created = { id: `${key}-${Date.now()}`, ...item }
  db[key] = [created, ...db[key]]
  return demo(created, 250)
}
function remove(key, url, id) {
  if (!IS_DEMO) return api.delete(`${url}/${id}`).then((r) => r.data)
  db[key] = db[key].filter((x) => x.id !== id)
  return demo({ id }, 250)
}

export const getStats = async () => {
  const [c, m, u] = await Promise.all([list('candidatures', '/admin/candidatures'), list('messages', '/admin/messages'), list('members', '/admin/members')])
  return { pending: c.filter((x) => x.status === 'pending').length, unread: m.filter((x) => !x.read).length, members: u.length, visits: VISITS_DEMO }
}

export const getEditions = () => list('editions', '/admin/editions')
export const saveEdition = (e) => (db.editions.some((x) => x.id === e.id) || !IS_DEMO ? update('editions', '/admin/editions', e.id, e) : create('editions', '/admin/editions', e))
export const createEdition = (e) => create('editions', '/admin/editions', e)

export const getCandidatures = () => list('candidatures', '/admin/candidatures')
export const setCandidatureStatus = (id, status) => update('candidatures', '/admin/candidatures', id, { status })

export const getMessages = () => list('messages', '/admin/messages')
export const setMessageRead = (id, read) => update('messages', '/admin/messages', id, { read })
export const replyToMessage = (id, text) => (IS_DEMO ? demo({ simulated: true }, 700) : api.post(`/admin/messages/${id}/reply`, { text }).then((r) => r.data))

export const getMembers = () => list('members', '/admin/members')

export const getNews = () => list('news', '/admin/news')
export const createNews = (n) => create('news', '/admin/news', { date: new Date().toISOString().slice(0, 10), published: false, ...n })
export const updateNews = (id, patch) => update('news', '/admin/news', id, patch)
export const deleteNews = (id) => remove('news', '/admin/news', id)

export const getCultureTexts = () => list('culture', '/admin/culture')
export const updateCultureText = (id, patch) => update('culture', '/admin/culture', id, patch)

export const getMedia = () => list('media', '/admin/media')
export const addMedia = (m) => create('media', '/admin/media', m)
export const deleteMedia = (id) => remove('media', '/admin/media', id)

export const getSettings = () => (IS_DEMO ? demo(db.settings, 300) : api.get('/admin/settings').then((r) => r.data))
export const saveSettings = (s) => {
  if (!IS_DEMO) return api.put('/admin/settings', s).then((r) => r.data)
  db.settings = { ...db.settings, ...s }
  return demo(db.settings, 600)
}
