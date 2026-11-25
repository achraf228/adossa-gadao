import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Newspaper, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import NewsModal from '../../components/admin/NewsModal'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import FormInput from '../../components/common/FormInput'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { deleteNews, getCultureTexts, getNews, updateCultureText, updateNews } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { cn, formatDate } from '../../utils/format'

function CultureEditor({ section, onSaved }) {
  const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm({ defaultValues: { title: section.title, text: section.text } })
  const submit = async (v) => {
    try {
      const patch = { ...v, provided: !/à fournir/i.test(v.text) }
      await updateCultureText(section.id, patch); onSaved(section.id, patch); reset(v); toast.success(`« ${v.title} » enregistré`)
    } catch (e) { toast.error(e.message) }
  }
  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-3 border-t-4 border-gold bg-white p-5">
      <div className="flex items-center justify-between"><h3 className="text-2xl">{section.title}</h3>{!section.provided && <Badge tone="todo">Texte à fournir</Badge>}</div>
      <FormInput label="Titre" error={errors.title?.message} {...register('title', { required: 'Le titre est requis.' })} />
      <FormInput as="textarea" label="Texte" error={errors.text?.message} {...register('text', { required: 'Le texte est requis.' })} />
      <Button type="submit" loading={isSubmitting} disabled={!isDirty} className="justify-self-start">Enregistrer</Button>
    </form>
  )
}

export default function Contenus() {
  const [tab, setTab] = useState('culture')
  const culture = useResource(getCultureTexts)
  const news = useResource(getNews)
  const [newsOpen, setNewsOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  const togglePublish = async (n) => {
    try { await updateNews(n.id, { published: !n.published }); news.setData((l) => l.map((x) => (x.id === n.id ? { ...x, published: !n.published } : x))); toast.success(n.published ? 'Actualité dépubliée' : 'Actualité publiée') }
    catch (e) { toast.error(e.message) }
  }
  const remove = async () => {
    try { await deleteNews(toDelete.id); news.setData((l) => l.filter((x) => x.id !== toDelete.id)); toast.success('Actualité supprimée') } catch (e) { toast.error(e.message) }
    setToDelete(null)
  }

  return (
    <>
      <PageHeader title="Contenus">{tab === 'news' && <Button icon={Plus} onClick={() => setNewsOpen(true)}>Nouvelle actualité</Button>}</PageHeader>
      <div role="tablist" aria-label="Type de contenu" className="mb-5 flex gap-2">
        {[['culture', 'Textes culturels'], ['news', 'Actualités']].map(([v, l]) => <button key={v} role="tab" aria-selected={tab === v} onClick={() => setTab(v)} className={cn('min-h-10 px-4 text-sm font-bold', tab === v ? 'bg-bark text-gold' : 'bg-white ring-1 ring-brown/30 hover:bg-gold/20')}>{l}</button>)}
      </div>

      {tab === 'culture' ? (
        <AsyncView status={culture.status} error={culture.error} reload={culture.reload}>
          <div className="grid gap-5 lg:grid-cols-2">{culture.data?.map((s) => <CultureEditor key={s.id} section={s} onSaved={(id, p) => culture.setData((l) => l.map((x) => (x.id === id ? { ...x, ...p } : x)))} />)}</div>
        </AsyncView>
      ) : (
        <AsyncView status={news.status} error={news.error} reload={news.reload} empty={<EmptyState icon={Newspaper} title="Aucune actualité" text="Créez la première actualité du site." action={<Button icon={Plus} onClick={() => setNewsOpen(true)}>Nouvelle actualité</Button>} />}>
          <ul className="grid gap-3">
            {news.data?.map((n) => (
              <li key={n.id} className="flex flex-wrap items-start justify-between gap-3 bg-white p-5">
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-2xl">{n.title}</h3><Badge tone={n.published ? 'green' : 'gold'}>{n.published ? 'Publiée' : 'Brouillon'}</Badge></div><p className="mt-1 text-xs text-bark/60">{formatDate(n.date)}</p><p className="mt-2 text-sm">{n.body}</p></div>
                <div className="flex gap-2"><Button size="sm" variant="outlineDark" onClick={() => togglePublish(n)}>{n.published ? 'Dépublier' : 'Publier'}</Button><Button size="sm" variant="ghost" aria-label={`Supprimer ${n.title}`} onClick={() => setToDelete(n)}><Trash2 size={16} /></Button></div>
              </li>
            ))}
          </ul>
        </AsyncView>
      )}
      <NewsModal open={newsOpen} onClose={() => setNewsOpen(false)} onCreated={(item) => news.setData((l) => [item, ...(l || [])])} />
      <ConfirmDialog open={!!toDelete} danger title="Supprimer l’actualité" confirmLabel="Supprimer" message={`Supprimer « ${toDelete?.title} » ? Cette action est définitive.`} onCancel={() => setToDelete(null)} onConfirm={remove} />
    </>
  )
}
