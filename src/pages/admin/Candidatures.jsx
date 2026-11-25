import { useState } from 'react'
import { UserCheck } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import DataTable from '../../components/common/DataTable'
import ImagePlaceholder from '../../components/common/ImagePlaceholder'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { getCandidatures } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { useCandidatureActions } from '../../hooks/useCandidatureActions'
import { cn, formatDate } from '../../utils/format'

const FILTERS = [['all', 'Toutes'], ['pending', 'En attente'], ['validated', 'Validées'], ['refused', 'Refusées']]

export default function Candidatures() {
  const { data, setData, status, error, reload } = useResource(getCandidatures)
  const [filter, setFilter] = useState('all')
  const [detail, setDetail] = useState(null)
  const { validate, refuse, dialog } = useCandidatureActions(setData)

  const rows = (data || []).filter((c) => filter === 'all' || c.status === filter)
  const live = detail && data?.find((c) => c.id === detail.id)

  return (
    <>
      <PageHeader title="Candidatures" />
      <div role="group" aria-label="Filtrer par statut" className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map(([v, l]) => <button key={v} aria-pressed={filter === v} onClick={() => setFilter(v)} className={cn('min-h-10 px-4 text-sm font-bold', filter === v ? 'bg-bark text-gold' : 'bg-white ring-1 ring-brown/30 hover:bg-gold/20')}>{l}</button>)}
      </div>
      <AsyncView status={status} error={error} reload={reload} empty={<EmptyState icon={UserCheck} title="Aucune candidature" text="Les candidatures envoyées depuis la page Tem Aliya Kozoh apparaîtront ici." />}>
        <DataTable caption="Liste des candidatures" rows={rows}
          empty={<EmptyState title="Aucun résultat" text="Aucune candidature pour ce statut." />}
          columns={[
            { key: 'name', header: 'Nom', render: (c) => <b>{c.name}</b> },
            { key: 'city', header: 'Quartier' },
            { key: 'date', header: 'Reçue le', render: (c) => formatDate(c.date) },
            { key: 'status', header: 'Statut', render: (c) => <StatusBadge status={c.status} /> },
            { key: 'action', header: 'Action', render: (c) => (
              <span className="flex flex-wrap gap-2">
                <Button size="sm" variant="outlineDark" onClick={() => setDetail(c)}>Détails</Button>
                {c.status === 'pending' && <><Button size="sm" onClick={() => validate(c)}>Valider</Button><Button size="sm" variant="outlineDark" onClick={() => refuse(c)}>Refuser</Button></>}
              </span>) },
          ]} />
      </AsyncView>

      <Modal open={!!live} onClose={() => setDetail(null)} title="Détail de la candidature" size="md">
        {live && (
          <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
            <div className="aspect-[3/4] overflow-hidden"><ImagePlaceholder src={live.photo} tone="brown" label="Photo reçue" /></div>
            <div>
              <h3 className="text-3xl">{live.name}</h3><div className="mt-2"><StatusBadge status={live.status} /></div>
              <dl className="mt-4 grid gap-2 text-sm">
                {[['Quartier / ville', live.city], ['Téléphone', live.phone], ['Date de naissance', formatDate(live.birthDate)], ['Reçue le', formatDate(live.date)]].map(([k, v]) => <div key={k} className="flex justify-between gap-3 border-b border-sand pb-1.5"><dt className="font-bold">{k}</dt><dd>{v}</dd></div>)}
              </dl>
              {live.status === 'pending' && <div className="mt-5 flex gap-2"><Button onClick={() => validate(live)}>Valider</Button><Button variant="outlineDark" onClick={() => refuse(live)}>Refuser</Button></div>}
            </div>
          </div>
        )}
      </Modal>
      {dialog}
    </>
  )
}
