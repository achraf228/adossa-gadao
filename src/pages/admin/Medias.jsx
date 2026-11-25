import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Images, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import FormInput from '../../components/common/FormInput'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import ImagePlaceholder from '../../components/common/ImagePlaceholder'
import DemoNotice from '../../components/common/DemoNotice'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import PhotoUpload from '../../components/forms/PhotoUpload'
import Lightbox from '../../components/gallery/Lightbox'
import { addMedia, deleteMedia, getMedia } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { MEDIA_TYPES } from '../../utils/validators'
import { cn } from '../../utils/format'

const TABS = [['all', 'Tous'], ['photo', 'Photos'], ['video', 'Vidéos'], ['poster', 'Affiches']]
const LABEL = { photo: 'Photo', video: 'Vidéo', poster: 'Affiche' }

export default function Medias() {
  const { data, setData, status, error, reload } = useResource(getMedia)
  const [tab, setTab] = useState('all')
  const [adding, setAdding] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [index, setIndex] = useState(null)
  const { register, control, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { type: 'photo', year: new Date().getFullYear(), title: '', file: null } })

  const items = (data || []).filter((m) => tab === 'all' || m.type === tab)

  const submit = async (v) => {
    const isVideo = v.file.type.startsWith('video')
    const url = URL.createObjectURL(v.file)
    try {
      const item = await addMedia({ type: v.type, year: Number(v.year), title: v.title || v.file.name, src: isVideo ? null : url, videoSrc: isVideo ? url : null, tone: 'brown' })
      setData((l) => [item, ...(l || [])]); toast.success('Média ajouté (aperçu local)'); reset(); setAdding(false)
    } catch (e) { toast.error(e.message) }
  }
  const remove = async () => {
    try { await deleteMedia(toDelete.id); setData((l) => l.filter((m) => m.id !== toDelete.id)); toast.success('Média supprimé') } catch (e) { toast.error(e.message) }
    setToDelete(null)
  }

  return (
    <>
      <PageHeader title="Médias"><Button icon={Plus} onClick={() => setAdding(true)}>Ajouter un média</Button></PageHeader>
      <div role="group" aria-label="Filtrer par type" className="mb-5 flex flex-wrap gap-2">
        {TABS.map(([v, l]) => <button key={v} aria-pressed={tab === v} onClick={() => setTab(v)} className={cn('min-h-10 px-4 text-sm font-bold', tab === v ? 'bg-bark text-gold' : 'bg-white ring-1 ring-brown/30 hover:bg-gold/20')}>{l}</button>)}
      </div>
      <AsyncView status={status} error={error} reload={reload} empty={<EmptyState icon={Images} title="Aucun média" text="Ajoutez des photos, vidéos ou affiches." action={<Button icon={Plus} onClick={() => setAdding(true)}>Ajouter un média</Button>} />}>
        {items.length === 0 ? <EmptyState title="Aucun média de ce type" /> : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {items.map((m, i) => (
              <li key={m.id} className="group relative bg-white">
                <button onClick={() => setIndex(i)} aria-label={`Agrandir : ${m.title}`} className="block aspect-[4/3] w-full overflow-hidden"><div className="h-full w-full transition-transform duration-500 group-hover:scale-105"><ImagePlaceholder src={m.src} tone={m.tone} kind={m.type} label={LABEL[m.type]} /></div></button>
                <div className="flex items-center justify-between gap-2 p-2.5"><div className="min-w-0"><p className="truncate text-xs font-bold">{m.title}</p><div className="mt-1 flex gap-1"><Badge tone="dark">{LABEL[m.type]}</Badge><Badge tone="gold">{m.year}</Badge></div></div>
                  <button onClick={() => setToDelete(m)} aria-label={`Supprimer ${m.title}`} className="shrink-0 p-2 text-wine hover:bg-wine/10"><Trash2 size={17} /></button></div>
              </li>
            ))}
          </ul>
        )}
      </AsyncView>

      <Modal open={adding} onClose={() => setAdding(false)} title="Ajouter un média" size="md">
        <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput as="select" label="Type" {...register('type')}><option value="photo">Photo</option><option value="video">Vidéo</option><option value="poster">Affiche</option></FormInput>
            <FormInput label="Année" type="number" error={errors.year?.message} {...register('year', { required: 'Indiquez l’année.', min: { value: 1990, message: 'Année invalide.' }, max: { value: 2100, message: 'Année invalide.' } })} />
          </div>
          <FormInput label="Titre (facultatif)" {...register('title')} />
          <Controller control={control} name="file" rules={{ required: 'Sélectionnez un fichier.' }} render={({ field, fieldState }) => (
            <PhotoUpload label="Fichier" types={MEDIA_TYPES} maxMb={25} hint="JPG, PNG, WEBP, MP4, WEBM · 25 Mo max" value={field.value} onChange={field.onChange} error={fieldState.error?.message} />)} />
          <DemoNotice children="Mode démonstration : le média n’est conservé que dans cette session, il n’est pas téléversé sur un serveur." />
          <div className="flex justify-end gap-3"><Button variant="outlineDark" onClick={() => setAdding(false)}>Annuler</Button><Button type="submit" loading={isSubmitting}>Ajouter</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={!!toDelete} danger title="Supprimer le média" confirmLabel="Supprimer" message={`Supprimer « ${toDelete?.title} » ? Cette action est définitive.`} onCancel={() => setToDelete(null)} onConfirm={remove} />
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  )
}
