import { ArrowRight, Archive, CalendarDays, Crown, Landmark } from 'lucide-react'
import HeroSection from '../../components/layout/HeroSection'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import SectionTitle from '../../components/common/SectionTitle'
import Reveal from '../../components/animations/Reveal'
import NewsletterForm from '../../components/forms/NewsletterForm'
import homeBackground from '../../assets/images/Accueil_Bg.png'
import { EXPLORE } from '../../data/site'
import { EDITION_DATES } from '../../data/editions'
import { usePageTitle } from '../../hooks/usePageTitle'

const ICONS = { landmark: Landmark, calendar: CalendarDays, crown: Crown, archive: Archive }

export default function Home() {
  usePageTitle(null, 'ADOSSA-GADAO : le site de référence sur la fête du peuple Tem (Kotokoli), préfecture de Tchaoudjo, Togo.')
  return (
    <>
      <HeroSection
        eyebrow="Fête traditionnelle Tem · Préfecture de Tchaoudjo, Togo"
        title={<img src="/logo-adossa-gadao.png" alt="ADOSSA-GADAO" className="block h-auto w-full" />}
        titleClassName="max-w-[30rem] text-[0px] leading-none"
        backgroundImage={homeBackground}
        description="Célébrer l’héritage, bâtir demain ! Le site de référence sur la fête du peuple Tem (Kotokoli), d’une édition à l’autre."
        actions={<><Button to="/edition-2027" size="lg">Voir l’édition 2027</Button><Button to="/culture" variant="outline" size="lg">Découvrir la culture Tem</Button></>}
      />

      <section className="bg-gold text-bark" aria-label="Prochaine édition">
        <div className="container-x flex flex-col items-start justify-between gap-5 py-7 sm:flex-row sm:items-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase">Prochaine édition</p>
            <p className="mt-1 font-display text-4xl sm:text-5xl">8 – 10 janvier 2027</p>
          </Reveal>
          <Reveal delay={0.1}><Button to="/edition-2027#programme" variant="dark" size="lg">Voir le programme</Button></Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20" aria-labelledby="explorer">
        <div className="container-x">
          <SectionTitle id="explorer" title="Explorer" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE.map((c, i) => {
              const Icon = ICONS[c.icon]
              return (
                <Reveal as="li" key={c.to} delay={i * 0.09}>
                  <Card to={c.to} accent className="h-full p-6">
                    <Icon className="mb-4 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" size={30} />
                    <h3 className="text-2xl">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bark/75">{c.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-wine">Découvrir <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" /></span>
                  </Card>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="communaute">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
          <Reveal>
            <h2 id="communaute" className="text-4xl sm:text-5xl">Rejoindre la communauté</h2>
            <p className="mt-4 max-w-sm text-bark/75">Recevez les annonces de chaque édition et partagez vos souvenirs.</p>
          </Reveal>
          <Reveal delay={0.1}><NewsletterForm /></Reveal>
        </div>
      </section>
    </>
  )
}
