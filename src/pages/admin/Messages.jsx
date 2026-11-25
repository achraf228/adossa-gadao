import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, MailOpen, Reply } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import StatusBadge from '../../components/admin/StatusBadge'
import ReplyModal from '../../components/admin/ReplyModal'
import Button from '../../components/common/Button'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { getMessages, setMessageRead } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { cn, formatDate } from '../../utils/format'

export default function Messages() {
  const { data, setData, status, error, reload } = useResource(getMessages)
  const [selectedId, setSelectedId] = useState(null)
  const [reply, setReply] = useState(null)
  const selected = data?.find((m) => m.id === selectedId)

  const mark = async (m, read, silent = false) => {
    try { await setMessageRead(m.id, read); setData((l) => l.map((x) => (x.id === m.id ? { ...x, read } : x))); if (!silent) toast.success(read ? 'Marqué comme lu' : 'Marqué comme non lu') }
    catch (e) { toast.error(e.message) }
  }
  const open = (m) => { setSelectedId(m.id); if (!m.read) mark(m, true, true) }

  return (
    <>
      <PageHeader title="Messages"><span className="bg-white px-3 py-2 text-sm"><b>{(data || []).filter((m) => !m.read).length}</b> non lu(s)</span></PageHeader>
      <AsyncView status={status} error={error} reload={reload} empty={<EmptyState icon={Mail} title="Boîte vide" text="Les messages envoyés au comité apparaîtront ici." />}>
        <div className="grid gap-5 lg:grid-cols-[22rem_1fr]">
          <ul className="grid content-start gap-2" aria-label="Liste des messages">
            {data?.map((m) => (
              <li key={m.id}><button onClick={() => open(m)} aria-current={m.id === selectedId} className={cn('w-full border-l-4 bg-white p-4 text-left transition-colors hover:bg-gold/10', m.id === selectedId ? 'border-gold' : 'border-transparent')}>
                <span className="flex items-center justify-between gap-2"><span className={cn('truncate text-sm', !m.read && 'font-bold')}>{m.from}</span>{!m.read && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" aria-label="Non lu" />}</span>
                <span className={cn('mt-0.5 block truncate text-sm', !m.read ? 'font-bold' : 'text-bark/70')}>{m.subject}</span>
                <span className="mt-1 block text-xs text-bark/55">{formatDate(m.date)}</span>
              </button></li>
            ))}
          </ul>
          <article className="min-h-64 bg-white p-6" aria-live="polite">
            {!selected ? <EmptyState icon={MailOpen} title="Sélectionnez un message" text="Cliquez sur un message pour le lire." className="border-0" /> : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-3xl">{selected.subject}</h2><p className="mt-1 text-sm text-bark/70">{selected.from} &lt;{selected.email}&gt; · {formatDate(selected.date)}</p></div><StatusBadge status={selected.read ? 'read' : 'unread'} /></div>
                <p className="mt-5 leading-relaxed">{selected.body}</p>
                <div className="mt-6 flex flex-wrap gap-3"><Button icon={Reply} onClick={() => setReply(selected)}>Répondre</Button><Button variant="outlineDark" onClick={() => mark(selected, !selected.read)}>Marquer comme {selected.read ? 'non lu' : 'lu'}</Button></div>
              </>
            )}
          </article>
        </div>
      </AsyncView>
      <ReplyModal message={reply} onClose={() => setReply(null)} />
    </>
  )
}
