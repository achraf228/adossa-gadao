import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../../components/admin/PageHeader'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import FormInput from '../../components/common/FormInput'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { AsyncView } from '../../components/common/StateBlock'
import PhotoUpload from '../../components/forms/PhotoUpload'
import { createEdition, getEditions, saveEdition } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { cn } from '../../utils/format'

const POSTER_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

export default function Editions() {
  const { data, setData, status, error, reload } = useResource(getEditions)
  const [selectedId, setSelectedId] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const selected = data?.find((e) => e.id === selectedId)

  const { register, control, handleSubmit, reset, getValues, formState: { errors, isSubmitting, isDirty } } =
    useForm({ defaultValues: { year: '', theme: '', startDate: '', endDate: '', status: 'draft', poster: null, posterName: '', program: [] } })
  const { fields, append, remove, move } = useFieldArray({ control, name: 'program', keyName: 'fid' })

  useEffect(() => { if (!selectedId && data?.length) setSelectedId(data[0].id) }, [data, selectedId])
  useEffect(() => {
    if (selected) reset({ year: selected.year, theme: selected.theme, startDate: selected.startDate, endDate: selected.endDate, status: selected.status, poster: null, posterName: selected.posterName, program: selected.program })
  }, [selectedId]) // eslint-disable-line react-hooks/exhaustive-deps

  const persist = async (v, nextStatus, message) => {
    const payload = {
      ...selected, year: Number(v.year), theme: v.theme, startDate: v.startDate, endDate: v.endDate, status: nextStatus,
      posterName: v.poster?.name || v.posterName,
      program: v.program.map((p, i) => ({ id: p.id, label: `Jour ${i + 1}`, title: p.title })),
    }
    try {
      await saveEdition(payload)
      setData((list) => list.map((e) => (e.id === payload.id ? payload : e)))
      reset({ ...v, status: nextStatus, poster: null, posterName: payload.posterName, program: payload.program })
      toast.success(message)
    } catch (e) { toast.error(e.message) }
  }

  const run = (nextStatus) => handleSubmit((v) => {
    if (nextStatus === 'draft-keep') return persist(v, v.status, 'Édition enregistrée')
    setConfirm({ nextStatus, v })
  })()

  const newEdition = async () => {
    const year = Math.max(...data.map((e) => e.year), new Date().getFullYear()) + 1
    try {
      const created = await createEdition({ year, theme: '', startDate: '', endDate: '', status: 'draft', posterName: '', program: [] })
      setData((l) => [created, ...l]); setSelectedId(created.id); toast.success(`Édition ${year} créée en brouillon`)
    } catch (e) { toast.error(e.message) }
  }

  const confirmText = { published: ['Publier l’édition', 'Publier', 'Cette édition deviendra visible sur le site public. Continuer ?', false], archived: ['Archiver l’édition', 'Archiver', 'L’édition sera rangée dans les archives. Continuer ?', true] }[confirm?.nextStatus] || []

  return (
    <>
      <PageHeader title="Éditions" />
      <AsyncView status={status} error={error} reload={reload}>
        <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
          <aside aria-label="Liste des éditions">
            <h2 className="mb-3 text-2xl">Liste</h2>
            <ul className="grid gap-2">
              {data?.map((e) => (
                <li key={e.id}><button onClick={() => setSelectedId(e.id)} aria-current={e.id === selectedId} className={cn('flex w-full items-center justify-between border-l-4 bg-white px-4 py-3 text-left transition-colors hover:bg-gold/10', e.id === selectedId ? 'border-gold shadow-md' : 'border-transparent')}>
                  <span className="font-display text-3xl">{e.year}</span><StatusBadge status={e.status} />
                </button></li>
              ))}
            </ul>
            <Button className="mt-4 w-full" icon={Plus} onClick={newEdition}>Nouvelle édition</Button>
          </aside>

          {selected && (
            <form onSubmit={(e) => e.preventDefault()} noValidate className="grid gap-5 bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between"><h2 className="text-3xl">Édition {selected.year}</h2><StatusBadge status={getValues('status')} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput label="Année" type="number" error={errors.year?.message} {...register('year', { required: 'Indiquez l’année.', min: { value: 2000, message: 'Année invalide.' }, max: { value: 2100, message: 'Année invalide.' }, validate: (v) => !data.some((e) => e.id !== selectedId && e.year === Number(v)) || 'Cette année existe déjà.' })} />
                <FormInput label="Statut" as="select" {...register('status')}><option value="draft">Brouillon</option><option value="published">Publiée</option><option value="archived">Archivée</option></FormInput>
              </div>
              <FormInput label="Thème" error={errors.theme?.message} {...register('theme', { required: 'Renseignez le thème de l’édition.' })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput label="Début" type="date" error={errors.startDate?.message} {...register('startDate')} />
                <FormInput label="Fin" type="date" error={errors.endDate?.message} {...register('endDate', { validate: (v) => !v || !getValues('startDate') || v >= getValues('startDate') || 'La fin doit suivre le début.' })} />
              </div>

              <fieldset>
                <legend className="mb-2 text-2xl">Programme</legend>
                {fields.length === 0 && <p className="mb-3 bg-sand/50 px-3 py-4 text-center text-sm">Aucun jour pour l’instant. Ajoutez le premier jour du programme.</p>}
                <ul className="grid gap-2">
                  {fields.map((f, i) => (
                    <li key={f.fid} className="flex items-start gap-2 border border-sand p-2">
                      <span className="mt-2 w-14 shrink-0 text-sm font-bold">Jour {i + 1}</span>
                      <FormInput className="flex-1" label={`Titre du jour ${i + 1}`} error={errors.program?.[i]?.title?.message} {...register(`program.${i}.title`, { required: 'Titre requis.' })} />
                      <span className="mt-6 flex">
                        <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Monter le jour ${i + 1}`} className="p-2 hover:bg-gold/20 disabled:opacity-30"><ArrowUp size={16} /></button>
                        <button type="button" onClick={() => move(i, i + 1)} disabled={i === fields.length - 1} aria-label={`Descendre le jour ${i + 1}`} className="p-2 hover:bg-gold/20 disabled:opacity-30"><ArrowDown size={16} /></button>
                        <button type="button" onClick={() => remove(i)} aria-label={`Supprimer le jour ${i + 1}`} className="p-2 text-wine hover:bg-wine/10"><Trash2 size={16} /></button>
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant="outlineDark" size="sm" icon={Plus} className="mt-3" onClick={() => append({ id: `p-${Date.now()}`, title: '' })}>Ajouter un jour</Button>
              </fieldset>

              <Controller control={control} name="poster" render={({ field }) => (
                <PhotoUpload label="Affiche officielle" types={POSTER_TYPES} maxMb={10} hint="JPG, PNG, WEBP ou PDF · 10 Mo max" value={field.value} onChange={field.onChange} />
              )} />
              {selected.posterName && <p className="-mt-3 text-xs text-bark/70">Affiche enregistrée : {selected.posterName}</p>}

              <div className="flex flex-wrap gap-3 border-t border-sand pt-5">
                <Button loading={isSubmitting} onClick={() => run('draft-keep')}>Enregistrer</Button>
                <Button variant="dark" onClick={() => run('published')} disabled={selected.status === 'published'}>Publier</Button>
                <Button variant="outlineDark" onClick={() => run('archived')} disabled={selected.status === 'archived'}>Archiver l’édition</Button>
              </div>
            </form>
          )}
        </div>
      </AsyncView>
      <ConfirmDialog open={!!confirm} title={confirmText[0]} confirmLabel={confirmText[1]} message={confirmText[2]} danger={confirmText[3]}
        onCancel={() => setConfirm(null)} onConfirm={async () => { await persist(confirm.v, confirm.nextStatus, confirm.nextStatus === 'published' ? 'Édition publiée' : 'Édition archivée'); setConfirm(null) }} />
    </>
  )
}
