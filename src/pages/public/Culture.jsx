import { useState } from 'react'
import { ArrowRight, Send } from 'lucide-react'
import HeroSection from '../../components/layout/HeroSection'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Modal from '../../components/common/Modal'
import SectionTitle from '../../components/common/SectionTitle'
import ImagePlaceholder from '../../components/common/ImagePlaceholder'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { ToProvide } from '../../components/common/Badge'
import Reveal from '../../components/animations/Reveal'
import MediaGallery from '../../components/gallery/MediaGallery'
import ContributionForm from '../../components/forms/ContributionForm'
import { CULTURE_SECTIONS } from '../../data/site'
import { getCultureGallery } from '../../services/publicService'
import { useResource } from '../../hooks/useResource'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Culture() {
  usePageTitle('Culture Tem', 'Le peuple Tem (Kotokoli) et ses traditions : histoire d’Adossa-Gadao, Gadao, Kosso, tenues et symboles.')
  const [detail, setDetail] = useState(null)
  const [contribute, setContribute] = useState(false)
  const gallery = useResource(getCultureGallery)

  return (
    <>
      <HeroSection tone="brown" title="Culture Tem" size="md"
        description="Le peuple Tem (Kotokoli) et ses traditions, racontés pour les générations d’aujourd’hui et de demain."
        art={<ImagePlaceholder tone="bark" label="Photo à fournir" showLabel={false} />} />

      <section className="bg-cream py-16 sm:py-20" aria-labelledby="decouvrir">
        <div className="container-x">
          <SectionTitle id="decouvrir" title="Découvrir la culture" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {CULTURE_SECTIONS.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 2) * 0.1}>
                <Card hover className="flex h-full flex-col overflow-hidden sm:flex-row">
                  <div className="aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-110"><ImagePlaceholder src={s.image} alt={s.title} tone={s.tone} label="Photo à fournir" /></div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-3xl">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-bark/75">{s.text}</p>
                    {!s.provided && <div className="mt-3"><ToProvide>Texte à fournir</ToProvide></div>}
                    <button onClick={() => setDetail(s)} className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-wine">
                      Découvrir davantage <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="galerie">
        <div className="container-x">
          <SectionTitle id="galerie" title="Galerie culturelle" subtitle="Photos et vidéos : cliquez pour agrandir ou lire." />
          <AsyncView status={gallery.status} error={gallery.error} reload={gallery.reload}
            empty={<EmptyState title="Aucun média pour le moment" text="Les photos et vidéos de la culture Tem apparaîtront ici." />}>
            <MediaGallery items={gallery.data || []} />
          </AsyncView>
        </div>
      </section>

      <section className="bg-bark py-16 text-cream sm:py-20" aria-labelledby="contribuer">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Reveal>
            <h2 id="contribuer" className="text-4xl sm:text-5xl">Contribuer</h2>
            <p className="mt-3 max-w-xl text-lg text-cream/85">Vous détenez une histoire, une photo ou un témoignage ? Proposez-le au comité pour enrichir cette page.</p>
          </Reveal>
          <Reveal delay={0.1}><Button size="lg" icon={Send} onClick={() => setContribute(true)}>Proposer un contenu</Button></Reveal>
        </div>
      </section>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.title || ''}>
        {detail && (
          <div className="grid gap-4">
            <div className="aspect-[16/9] overflow-hidden"><ImagePlaceholder src={detail.image} alt={detail.title} tone={detail.tone} label="Photo à fournir" /></div>
            <p className="leading-relaxed">{detail.text}</p>
            {!detail.provided && <p className="bg-gold/15 px-3 py-2 text-sm">Le texte complet de cette rubrique sera rédigé par le comité d’organisation. Vous pouvez aider en proposant un témoignage ou une photo.</p>}
            <div className="flex flex-wrap justify-end gap-3">
              <Button variant="outlineDark" onClick={() => setDetail(null)}>Fermer</Button>
              <Button onClick={() => { setDetail(null); setContribute(true) }}>Proposer un contenu</Button>
            </div>
          </div>
        )}
      </Modal>
      <Modal open={contribute} onClose={() => setContribute(false)} title="Proposer un contenu" size="lg">
        <ContributionForm kind="contribution" onDone={() => setContribute(false)} />
      </Modal>
    </>
  )
}
