import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import DemoNotice from '../common/DemoNotice'
import SubmitResult from './SubmitResult'
import { subscribeNewsletter } from '../../services/publicService'
import { EMAIL_RE } from '../../utils/validators'

export default function NewsletterForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { email: '' } })
  const [result, setResult] = useState(null)

  const onSubmit = async ({ email }) => {
    try {
      const res = await subscribeNewsletter(email)
      setResult(res)
      toast.success(res.simulated ? 'Inscription simulée (démonstration)' : 'Inscription enregistrée')
    } catch (e) { toast.error(e.message) }
  }

  if (result) return <SubmitResult title="Merci !" simulated={result.simulated} realText="Vous recevrez les annonces de chaque édition." onReset={() => { setResult(null); reset() }} resetLabel="Inscrire une autre adresse" />
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <FormInput className="flex-1" label="Adresse e-mail" type="email" autoComplete="email" placeholder="vous@exemple.com" error={errors.email?.message}
          {...register('email', { required: 'Saisissez votre adresse e-mail.', pattern: { value: EMAIL_RE, message: 'Format invalide, exemple : vous@exemple.com.' } })} />
        <Button type="submit" variant="wine" loading={isSubmitting} className="sm:mb-px">S’inscrire à la lettre d’information</Button>
      </div>
      <DemoNotice className="mt-3" />
    </form>
  )
}
