import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import DemoNotice from '../common/DemoNotice'
import { login } from '../../services/publicService'
import { EMAIL_RE } from '../../utils/validators'

export default function LoginForm({ compact = false }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: { email: '', password: '' } })
  const [info, setInfo] = useState(null)

  const onSubmit = async (v) => {
    try {
      const res = await login(v)
      if (res.simulated) { setInfo('Connexion simulée : aucun compte réel n’existe tant que le backend Laravel n’est pas connecté.'); toast.info('Connexion simulée (démonstration)') }
      else toast.success('Connexion réussie')
    } catch (e) { toast.error(e.message) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <FormInput label="E-mail" type="email" autoComplete="email" error={errors.email?.message} {...register('email', { required: 'Saisissez votre e-mail.', pattern: { value: EMAIL_RE, message: 'Format invalide, exemple : vous@exemple.com.' } })} />
      <FormInput label="Mot de passe" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password', { required: 'Saisissez votre mot de passe.', minLength: { value: 8, message: '8 caractères minimum.' } })} />
      {info && <p role="status" className="bg-gold/15 px-3 py-2 text-sm">{info}</p>}
      <Button type="submit" variant="dark" loading={isSubmitting} className="w-full">Se connecter</Button>
      <Link to="/inscription" className="text-center text-sm font-bold text-wine underline-offset-4 hover:underline">Créer un compte</Link>
      {!compact && <DemoNotice />}
    </form>
  )
}
