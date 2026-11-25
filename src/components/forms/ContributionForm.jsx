import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import DemoNotice from '../common/DemoNotice'
import PhotoUpload from './PhotoUpload'
import SubmitResult from './SubmitResult'
import { shareMemory, submitContribution } from '../../services/publicService'
import { EMAIL_RE, MEDIA_TYPES } from '../../utils/validators'

/** kind="contribution" : proposer un contenu au comité · kind="memory" : partager un souvenir. */
export default function ContributionForm({ kind = 'contribution', onDone }) {
  const isMemory = kind === 'memory'
  const { register, control, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { type: 'testimony', name: '', email: '', message: '', files: [] } })
  const [result, setResult] = useState(null)
  const type = isMemory ? 'memory' : watch('type')
  const needsFiles = type === 'photo' || type === 'video'

  const onSubmit = async (v) => {
    const fd = new FormData()
    ;['type', 'name', 'email', 'message'].forEach((k) => fd.append(k, v[k]))
    v.files.forEach((f) => fd.append('files[]', f))
    try {
      const res = await (isMemory ? shareMemory : submitContribution)(fd)
      setResult(res)
      toast.success(res.simulated ? 'Envoi simulé (démonstration)' : 'Merci pour votre partage !')
    } catch (e) { toast.error(e.message) }
  }

  if (result) return <SubmitResult title="Merci pour votre partage" simulated={result.simulated} realText="Le comité examinera votre envoi avant publication." onReset={() => { setResult(null); reset() }} resetLabel="Faire un nouvel envoi" />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      {!isMemory && (
        <FormInput as="select" label="Type de contenu" {...register('type')}>
          <option value="testimony">Témoignage</option><option value="photo">Photo</option><option value="video">Vidéo</option>
        </FormInput>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput label="Votre nom" autoComplete="name" error={errors.name?.message} {...register('name', { required: 'Indiquez votre nom.', minLength: { value: 2, message: 'Au moins 2 caractères.' } })} />
        <FormInput label="Votre e-mail" type="email" autoComplete="email" error={errors.email?.message} {...register('email', { required: 'Indiquez votre e-mail pour que le comité puisse vous répondre.', pattern: { value: EMAIL_RE, message: 'Format invalide, exemple : vous@exemple.com.' } })} />
      </div>
      <FormInput as="textarea" label={needsFiles ? 'Description (facultatif)' : 'Votre témoignage ou votre histoire'} error={errors.message?.message}
        {...register('message', { validate: (v) => needsFiles || v.trim().length >= 20 || 'Écrivez au moins 20 caractères.' })} />
      <Controller control={control} name="files" rules={{ validate: (v) => !needsFiles || v.length > 0 || 'Ajoutez au moins un fichier.' }}
        render={({ field, fieldState }) => (
          <PhotoUpload label={needsFiles ? 'Fichiers' : 'Photos ou vidéos (facultatif)'} multiple types={MEDIA_TYPES} maxMb={25} hint="JPG, PNG, WEBP, MP4, WEBM · 25 Mo max" value={field.value} onChange={field.onChange} error={fieldState.error?.message} />
        )} />
      <DemoNotice />
      <div className="flex flex-wrap justify-end gap-3">
        {onDone && <Button variant="outlineDark" onClick={onDone}>Annuler</Button>}
        <Button type="submit" loading={isSubmitting}>{isMemory ? 'Partager mon souvenir' : 'Envoyer au comité'}</Button>
      </div>
    </form>
  )
}
