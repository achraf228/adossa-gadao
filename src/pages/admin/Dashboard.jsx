import { useState } from 'react'
import { Eye, Mail, Plus, UserCheck, Users } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import StatCard from '../../components/admin/StatCard'
import StatusBadge from '../../components/admin/StatusBadge'
import NewsModal from '../../components/admin/NewsModal'
import ReplyModal from '../../components/admin/ReplyModal'
import Button from '../../components/common/Button'
import DataTable from '../../components/common/DataTable'
import DemoNotice from '../../components/common/DemoNotice'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { getCandidatures, getEditions, getMessages, getStats } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { useCandidatureActions } from '../../hooks/useCandidatureActions'
import { formatDate } from '../../utils/format'

export default function Dashboard() {
  const stats = useResource(getStats)
  const cands = useResource(getCandidatures)
  const msgs = useResource(getMessages)
  const editions = useResource(getEditions)
  const [newsOpen, setNewsOpen] = useState(false)
  const [reply, setReply] = useState(null)
  const { validate, refuse, dialog } = useCandidatureActions(cands.setData)

  const current = editions.data?.find((e) => e.year === 2027)
  const pending = (cands.data || []).filter((c) => c.status === 'pending')
  const unread = (msgs.data || []).filter((m) => !m.read).length
  const s = stats.data
  const pendingNow = cands.data ? pending.length : s?.pending

  return (
    <>
      <PageHeader title="Tableau de bord">
        <span className="flex items-center gap-2 bg-white px-3 py-2 text-sm">Édition en cours <b className="font-display text-xl">2027</b>{current && <StatusBadge status={current.status} />}</span>
        <Button icon={Plus} onClick={() => setNewsOpen(true)}>Nouvelle actualité</Button>
      </PageHeader>
      <DemoNotice className="mb-6" />

      <AsyncView status={stats.status} error={stats.error} reload={stats.reload}>
        {s && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <StatCard label="Candidatures en attente" value={pendingNow ?? s.pending} icon={UserCheck} />
            <StatCard label="Messages non lus" value={msgs.data ? unread : s.unread} icon={Mail} delay={0.08} />
            <StatCard label="Membres inscrits" value={s.members} icon={Users} delay={0.16} />
            <StatCard label="Visites du mois" value={s.visits} icon={Eye} delay={0.24} />
          </div>
        )}
      </AsyncView>

      <section className="mt-10" aria-labelledby="cv">
        <h2 id="cv" className="mb-3 text-3xl">Candidatures à valider</h2>
        <AsyncView status={cands.status} error={cands.error} reload={cands.reload}>
          <DataTable caption="Candidatures à valider" rows={pending}
            empty={<EmptyState icon={UserCheck} title="Tout est à jour" text="Aucune candidature en attente de validation." />}
            columns={[
              { key: 'name', header: 'Nom', render: (c) => <b>{c.name}</b> },
              { key: 'city', header: 'Quartier' },
              { key: 'date', header: 'Reçue le', render: (c) => formatDate(c.date) },
              { key: 'status', header: 'Statut', render: (c) => <StatusBadge status={c.status} /> },
              { key: 'action', header: 'Action', render: (c) => (
                <span className="flex gap-2"><Button size="sm" onClick={() => validate(c)}>Valider</Button><Button size="sm" variant="outlineDark" onClick={() => refuse(c)}>Refuser</Button></span>) },
            ]} />
        </AsyncView>
      </section>

      <section className="mt-10" aria-labelledby="dm">
        <h2 id="dm" className="mb-3 text-3xl">Derniers messages</h2>
        <AsyncView status={msgs.status} error={msgs.error} reload={msgs.reload}>
          <DataTable caption="Derniers messages" rows={(msgs.data || []).slice(0, 5)}
            empty={<EmptyState icon={Mail} title="Aucun message" text="Les messages reçus apparaîtront ici." />}
            columns={[
              { key: 'from', header: 'De', render: (m) => <span className={m.read ? '' : 'font-bold'}>{m.from}</span> },
              { key: 'subject', header: 'Objet' },
              { key: 'action', header: 'Action', render: (m) => <Button size="sm" variant="outlineDark" onClick={() => setReply(m)}>Répondre</Button> },
            ]} />
        </AsyncView>
      </section>

      {dialog}
      <NewsModal open={newsOpen} onClose={() => setNewsOpen(false)} />
      <ReplyModal message={reply} onClose={() => setReply(null)} />
    </>
  )
}
