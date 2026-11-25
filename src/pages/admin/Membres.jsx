import { useState } from 'react'
import { Search, Users } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import DataTable from '../../components/common/DataTable'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { getMembers } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { formatDate } from '../../utils/format'

export default function Membres() {
  const { data, status, error, reload } = useResource(getMembers)
  const [q, setQ] = useState('')
  const [detail, setDetail] = useState(null)
  const rows = (data || []).filter((m) => `${m.name} ${m.email} ${m.city}`.toLowerCase().includes(q.trim().toLowerCase()))

  return (
    <>
      <PageHeader title="Membres" />
      <div className="relative mb-5 max-w-sm"><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-bark/50" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Rechercher un membre" placeholder="Rechercher par nom, e-mail ou ville" className="input-base pl-9" /></div>
      <AsyncView status={status} error={error} reload={reload} empty={<EmptyState icon={Users} title="Aucun membre" text="Les membres inscrits apparaîtront ici." />}>
        <DataTable caption="Liste des membres" rows={rows} empty={<EmptyState icon={Search} title="Aucun résultat" text={`Aucun membre ne correspond à « ${q} ».`} />}
          columns={[
            { key: 'name', header: 'Nom', render: (m) => <b>{m.name}</b> },
            { key: 'email', header: 'E-mail' },
            { key: 'city', header: 'Ville' },
            { key: 'role', header: 'Rôle', render: (m) => <Badge tone={m.role === 'Membre' ? 'sand' : 'gold'}>{m.role}</Badge> },
            { key: 'action', header: 'Profil', render: (m) => <Button size="sm" variant="outlineDark" onClick={() => setDetail(m)}>Consulter</Button> },
          ]} />
      </AsyncView>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Profil du membre" size="sm">
        {detail && (<div><div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-bark font-display text-3xl text-gold">{detail.name.split(' ').map((w) => w[0]).slice(-2).join('')}</div>
          <h3 className="text-3xl">{detail.name}</h3>
          <dl className="mt-4 grid gap-2 text-sm">{[['E-mail', detail.email], ['Ville', detail.city], ['Rôle', detail.role], ['Inscrit le', formatDate(detail.joined)]].map(([k, v]) => <div key={k} className="flex justify-between gap-3 border-b border-sand pb-1.5"><dt className="font-bold">{k}</dt><dd>{v}</dd></div>)}</dl></div>)}
      </Modal>
    </>
  )
}
