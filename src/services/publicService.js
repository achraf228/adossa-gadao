import { api, demo, IS_DEMO } from './api'
import { ARCHIVE_MEDIA, CULTURE_GALLERY, PAST_COMMUNIQUES } from '../data/archives'
import { DISCUSSIONS_DEMO, MEMORIES_DEMO } from '../data/community'

/* Toutes les écritures renvoient { simulated: true } en mode démonstration :
   l'interface doit alors indiquer que rien n'est enregistré sur un serveur. */
const write = (method, url, payload, ms = 1100) =>
  IS_DEMO ? demo({ simulated: true }, ms) : api[method](url, payload).then((r) => ({ ...r.data, simulated: false }))
const read = (url, fallback, ms = 500) => (IS_DEMO ? demo(fallback, ms) : api.get(url).then((r) => r.data))

export const getArchiveMedia = () => read('/archives/media', ARCHIVE_MEDIA)
export const getCommuniques = () => read('/archives/communiques', PAST_COMMUNIQUES)
export const getCultureGallery = () => read('/culture/gallery', CULTURE_GALLERY, 300)
export const getCandidates = () =>
  read('/candidates', [1, 2, 3, 4].map((n) => ({ id: `c${n}`, name: `Candidate ${n}`, info: 'Présentation à venir', photo: null, tone: ['brown', 'gold', 'wine', 'bark'][n - 1] })))
export const getDiscussions = () => read('/discussions', DISCUSSIONS_DEMO)
export const getMemories = () => read('/memories', MEMORIES_DEMO)

export const subscribeNewsletter = (email) => write('post', '/newsletter', { email }, 900)
export const submitCandidature = (formData) => write('post', '/candidatures', formData, 1400)
export const submitContribution = (formData) => write('post', '/contributions', formData, 1300)
export const shareMemory = (formData) => write('post', '/memories', formData, 1300)
export const postReply = (discussionId, text) => write('post', `/discussions/${discussionId}/replies`, { text }, 600)
export const login = (credentials) => write('post', '/auth/login', credentials, 1000)
export const register = (payload) => write('post', '/auth/register', payload, 1200)
