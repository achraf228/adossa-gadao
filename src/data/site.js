import adossaImage from '../assets/images/adossa.png'
import gadaoImage from '../assets/images/gadao.png'
import kossoImage from '../assets/images/koso.png'
import tembissaouImage from '../assets/images/tembissaou.png'

export const SITE = {
  name: 'ADOSSA-GADAO',
  slogan: 'Célébrer l’héritage, bâtir demain !',
  email: 'adossagadao1@gmail.com',
  committee: 'Comité d’organisation de la fête traditionnelle de la préfecture de Tchaoudjo',
}

export const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/culture', label: 'Culture' },
  { to: '/edition-2027', label: 'Édition 2027' },
  { to: '/tem-aliya-kozoh', label: 'Tem Aliya Kozoh' },
  { to: '/archives', label: 'Archives' },
  { to: '/communaute', label: 'Communauté' },
]

export const EXPLORE = [
  { to: '/culture', icon: 'landmark', title: 'Culture Tem', text: 'Histoire, rites, Kosso et tenues traditionnelles.' },
  { to: '/edition-2027', icon: 'calendar', title: 'Édition en cours', text: 'Dates, programme et communiqués officiels.' },
  { to: '/tem-aliya-kozoh', icon: 'crown', title: 'Tem Aliya Kozoh', text: 'Le défilé de beauté en tenue traditionnelle.' },
  { to: '/archives', icon: 'archive', title: 'Archives', text: 'Photos, vidéos et affiches de chaque année.' },
]

/** Emplacements d'images. Renseigner `src` (URL ou import) quand les photos officielles seront disponibles. */
export const IMAGES = {
  hero: null,
  aliyaHero: null,
  poster2027: null,
}

export const CULTURE_SECTIONS = [
  { id: 'histoire', title: 'Histoire d’Adossa-Gadao', text: 'Texte à fournir par le comité.', tone: 'brown', image: adossaImage, provided: false },
  { id: 'gadao', title: 'Le Gadao', text: 'Festivités liées à la moisson et à l’initiation.', tone: 'gold', image: gadaoImage, provided: false },
  { id: 'kosso', title: 'Le Kosso', text: 'Danse des femmes dignitaires Tem.', tone: 'wine', image: kossoImage, provided: false },
  { id: 'tenues', title: 'Tenues et symboles', text: 'Texte à fournir par le comité.', tone: 'bark', image: tembissaouImage, provided: false },
]
