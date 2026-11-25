import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import PageHeader from '../../components/admin/PageHeader'
import Button from '../../components/common/Button'
import FormInput from '../../components/common/FormInput'
import DemoNotice from '../../components/common/DemoNotice'
import { AsyncView } from '../../components/common/StateBlock'
import { getSettings, saveSettings } from '../../services/adminService'
import { useResource } from '../../hooks/useResource'
import { EMAIL_RE, PHONE_RE } from '../../utils/validators'
import { cn } from '../../utils/format'

function Toggle({ label, hint, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-sand py-3">
      <div><p className="text-sm font-bold">{label}</p>{hint && <p className="text-xs text-bark/60">{hint}</p>}</div>
      <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={cn('relative h-7 w-12 shrink-0 transition-colors', checked ? 'bg-gold' : 'bg-bark/25')}>
        <span className={cn('absolute top-1 left-1 h-5 w-5 bg-white shadow transition-transform', checked && 'translate-x-5')} />
      </button>
    </div>
  )
}

export default function Parametres() {
  const { data, status, error, reload } = useResource(getSettings)
  const { register, control, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm()
  useEffect(() => { if (data) reset(data) }, [data, reset])

  const submit = async (v) => {
    try { const saved = await saveSettings(v); reset(saved); toast.success('Paramètres enregistrés') } catch (e) { toast.error(e.message) }
  }

  return (
    <>
      <PageHeader title="Paramètres" />
      <DemoNotice className="mb-5" />
      <AsyncView status={status} error={error} reload={reload}>
        <form onSubmit={handleSubmit(submit)} noValidate className="grid max-w-3xl gap-6">
          <section className="grid gap-4 border-t-4 border-gold bg-white p-6" aria-labelledby="s1">
            <h2 id="s1" className="text-2xl">Informations du comité</h2>
            <FormInput label="Nom du comité" error={errors.committeeName?.message} {...register('committeeName', { required: 'Le nom du comité est requis.' })} />
            <FormInput as="textarea" label="Adresse" className="[&_textarea]:min-h-20" hint="Facultatif" {...register('address')} />
          </section>
          <section className="grid gap-4 border-t-4 border-gold bg-white p-6 sm:grid-cols-2" aria-labelledby="s2">
            <h2 id="s2" className="text-2xl sm:col-span-2">Coordonnées</h2>
            <FormInput label="E-mail de contact" type="email" error={errors.email?.message} {...register('email', { required: 'L’e-mail est requis.', pattern: { value: EMAIL_RE, message: 'Format invalide.' } })} />
            <FormInput label="Téléphone" type="tel" hint="Facultatif" error={errors.phone?.message} {...register('phone', { validate: (v) => !v || PHONE_RE.test(v) || 'Numéro invalide.' })} />
          </section>
          <section className="border-t-4 border-gold bg-white p-6" aria-labelledby="s3">
            <h2 id="s3" className="mb-2 text-2xl">Paramètres généraux</h2>
            {[['newsletterEnabled', 'Lettre d’information', 'Afficher le formulaire d’inscription sur le site.'], ['registrationsOpen', 'Candidatures Tem Aliya Kozoh ouvertes', 'Autoriser l’envoi de nouvelles candidatures.'], ['maintenance', 'Mode maintenance', 'Masquer le site public aux visiteurs.']].map(([name, label, hint]) => (
              <Controller key={name} control={control} name={name} render={({ field }) => <Toggle label={label} hint={hint} checked={!!field.value} onChange={field.onChange} />} />
            ))}
          </section>
          <div className="flex gap-3"><Button type="submit" loading={isSubmitting} disabled={!isDirty}>Enregistrer</Button><Button variant="outlineDark" disabled={!isDirty} onClick={() => reset(data)}>Annuler les modifications</Button></div>
        </form>
      </AsyncView>
    </>
  )
}
