import { CalendarPlus, Download, MapPin, Users } from 'lucide-react'
import { toast } from 'sonner'
import HeroSection from '../../components/layout/HeroSection'
import Countdown from '../../components/cards/Countdown'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import SectionTitle from '../../components/common/SectionTitle'
import ImagePlaceholder from '../../components/common/ImagePlaceholder'
import Pattern from '../../components/common/Pattern'
import { ToProvide } from '../../components/common/Badge'
import Reveal from '../../components/animations/Reveal'
import { EDITION_DATES, PROGRAM_2027 } from '../../data/editions'
import { IMAGES, SITE } from '../../data/site'
import { downloadIcs } from '../../utils/ics'
import { usePageTitle } from '../../hooks/usePageTitle'
import { cn } from '../../utils/format'

const TONES = {
  gold: { box: 'bg-gold text-bark', mute: 'text-bark/80', tag: 'bg-bark text-gold' },
  bark: { box: 'bg-bark text-cream', mute: 'text-cream/80', tag: 'bg-gold text-bark' },
  wine: { box: 'bg-wine text-cream', mute: 'text-cream/85', tag: 'bg-cream text-wine' },
}

export default function Edition2027() {
  usePageTitle('Édition 2027', 'Programme, compte à rebours et informations officielles de l’édition 2027 d’Adossa-Gadao, du 8 au 10 janvier 2027.')

  const downloadPoster = () => IMAGES.poster2027
    ? window.open(IMAGES.poster2027, '_blank', 'noopener')
    : toast.info('L’affiche officielle n’est pas encore publiée par le comité.')

  const addToCalendar = () => {
    downloadIcs({ title: 'ADOSSA-GADAO 2027', description: `Fête traditionnelle Tem, préfecture de Tchaoudjo. Contact : ${SITE.email}`, startDate: EDITION_DATES.startDay, endDate: EDITION_DATES.endDay, filename: 'adossa-gadao-2027.ics' })
    toast.success('Fichier agenda téléchargé (8 – 10 janvier 2027).')
  }

  return (
    <>
      <HeroSection tone="brown" eyebrow="Édition en cours" title="ADOSSA-GADAO 2027" size="md">
        <Countdown start={EDITION_DATES.start} end={EDITION_DATES.end} />
      </HeroSection>

      <section id="programme" className="scroll-mt-20 bg-cream py-16 sm:py-20" aria-labelledby="prog">
        <div className="container-x">
          <SectionTitle id="prog" title="Programme" subtitle="Trois journées de fête, du 8 au 10 janvier 2027." />
          <ul className="grid gap-5 md:grid-cols-3">
            {PROGRAM_2027.map((d, i) => {
              const t = TONES[d.tone]
              return (
                <Reveal as="li" key={d.id} delay={i * 0.12}>
                  <Card className={cn('relative h-full overflow-hidden p-7', t.box)}>
                    <Pattern className="absolute -right-10 -bottom-10 h-48 w-48 opacity-[0.12]" />
                    <span className={cn('inline-block px-2.5 py-1 text-xs font-bold', t.tag)}>Jour {i + 1}</span>
                    <h3 className="relative mt-4 text-3xl sm:text-4xl">{d.day}</h3>
                    <p className={cn('relative mt-3 leading-relaxed', t.mute)}>{d.description}</p>
                  </Card>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-sand/50 py-16 sm:py-20" aria-labelledby="infos">
        <div className="container-x">
          <SectionTitle id="infos" title="Informations" />
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal><Card accent hover={false} className="flex h-full flex-col p-6">
              <h3 className="text-2xl">Communiqué officiel</h3>
              <div className="mt-4 aspect-[3/4] max-h-72 w-full overflow-hidden"><ImagePlaceholder src={IMAGES.poster2027} kind="poster" tone="brown" label="Affiche officielle" /></div>
              <Button className="mt-5 w-full" icon={Download} onClick={downloadPoster}>Télécharger l’affiche</Button>
            </Card></Reveal>

            <Reveal delay={0.1}><Card accent hover={false} className="flex h-full flex-col p-6">
              <h3 className="text-2xl">Infos pratiques</h3>
              <dl className="mt-4 grid flex-1 gap-4 text-sm">
                {[['Lieu', MapPin], ['Accès et transport', MapPin], ['Hébergement', MapPin]].map(([label]) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-sand pb-3"><dt className="font-bold">{label}</dt><dd><ToProvide /></dd></div>
                ))}
              </dl>
              <Button className="mt-5 w-full" variant="dark" icon={CalendarPlus} onClick={addToCalendar}>Ajouter à mon agenda</Button>
            </Card></Reveal>

            <Reveal delay={0.2}><Card accent hover={false} className="h-full p-6">
              <h3 className="text-2xl">Organisation</h3>
              <Users className="mt-4 text-gold" size={28} />
              <p className="mt-3 text-sm leading-relaxed">{SITE.committee}.</p>
              <p className="mt-4 text-sm">Contact : <a href={`mailto:${SITE.email}`} className="font-bold text-wine underline-offset-4 hover:underline">{SITE.email}</a></p>
            </Card></Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
