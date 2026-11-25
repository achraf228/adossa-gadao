import { useMemo, useState } from 'react'
import { Download, SearchX } from 'lucide-react'
import { toast } from 'sonner'
import HeroSection from '../../components/layout/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import Button from '../../components/common/Button'
import DataTable from '../../components/common/DataTable'
import DemoNotice from '../../components/common/DemoNotice'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import MediaGallery from '../../components/gallery/MediaGallery'
import Reveal from '../../components/animations/Reveal'
import { getArchiveMedia, getCommuniques } from '../../services/publicService'
import { useResource } from '../../hooks/useResource'
import { usePageTitle } from '../../hooks/usePageTitle'
import { cn } from '../../utils/format'

const TYPES = [{ v: 'all', l: 'Tous les médias' }, { v: 'photo', l: 'Photos' }, { v: 'video', l: 'Vidéos' }, { v: 'poster', l: 'Affiches' }]

function Chip({ active, onClick, children }) {
  return <button onClick={onClick} aria-pressed={active} className={cn('min-h-10 px-4 text-sm font-bold transition-colors', active ? 'bg-bark text-gold' : 'bg-white text-bark ring-1 ring-brown/30 hover:bg-gold/20')}>{children}</button>
}

export default function Archives() {
  usePageTitle('Archives', 'Photos, vidéos et affiches de chaque édition d’Adossa-Gadao.')
  const media = useResource(getArchiveMedia)
  const docs = useResource(getCommuniques)
  const [year, setYear] = useState('all')
  const [type, setType] = useState('all')

  const years = useMemo(() => [...new Set((media.data || []).map((m) => m.year))].sort((a, b) => b - a), [media.data])
  const filtered = useMemo(() => (media.data || []).filter((m) => (year === 'all' || m.year === year) && (type === 'all' || m.type === type)), [media.data, year, type])
  const reset = () => { setYear('all'); setType('all') }

  const download = (d) => { if (d.file) window.open(d.file, '_blank', 'noopener'); }

  return (
    <>
      <HeroSection tone="bark" title="Archives" size="md" description="Chaque édition conserve ses photos, vidéos et affiches." />

      <section className="bg-cream py-12 sm:py-16" aria-labelledby="galerie-archives">
        <div className="container-x">
          <h2 id="galerie-archives" className="sr-only">Galerie des archives</h2>
          <DemoNotice className="mb-6" children="Médias d’exemple : les années et visuels affichés sont fictifs en attendant les archives officielles du comité." />
          <Reveal className="mb-8 grid gap-4" aria-label="Filtres">
            <div role="group" aria-label="Filtrer par année" className="flex flex-wrap gap-2">
              <Chip active={year === 'all'} onClick={() => setYear('all')}>Toutes les années</Chip>
              {years.map((y) => <Chip key={y} active={year === y} onClick={() => setYear(y)}>{y}</Chip>)}
            </div>
            <div role="group" aria-label="Filtrer par type" className="flex flex-wrap gap-2">
              {TYPES.map((t) => <Chip key={t.v} active={type === t.v} onClick={() => setType(t.v)}>{t.l}</Chip>)}
            </div>
            <p className="text-sm text-bark/70" aria-live="polite">{filtered.length} média{filtered.length > 1 ? 's' : ''}</p>
          </Reveal>
          <AsyncView status={media.status} error={media.error} reload={media.reload} empty={<EmptyState title="Aucune archive pour le moment" text="Les médias de chaque édition seront ajoutés ici." />}>
            {filtered.length ? <MediaGallery items={filtered} /> : (
              <EmptyState icon={SearchX} title="Aucun résultat" text="Aucun média ne correspond à ces filtres." action={<Button variant="dark" onClick={reset}>Réinitialiser les filtres</Button>} />
            )}
          </AsyncView>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="communiques">
        <div className="container-x">
          <SectionTitle id="communiques" title="Communiqués passés" />
          <AsyncView status={docs.status} error={docs.error} reload={docs.reload} empty={<EmptyState title="Aucun communiqué" text="Les communiqués officiels passés apparaîtront ici." />}>
            <DataTable dark caption="Communiqués officiels passés" rows={docs.data || []}
              columns={[
                { key: 'year', header: 'Édition', render: (d) => <span className="font-display text-2xl">{d.year}</span> },
                { key: 'title', header: 'Document' },
                { key: 'action', header: 'Action', className: 'text-right', render: (d) => d.file
                  ? <Button size="sm" icon={Download} onClick={() => download(d)}>Télécharger</Button>
                  : <Button size="sm" variant="outlineDark" disabled icon={Download} title="Fichier non disponible">Bientôt disponible</Button> },
              ]} />
          </AsyncView>
        </div>
      </section>
    </>
  )
}
