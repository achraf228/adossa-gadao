import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import DemoNotice from '../common/DemoNotice'
import SubmitResult from './SubmitResult'
import { register as registerUser } from '../../services/publicService'
import { EMAIL_RE, NAME_RE } from '../../utils/validators'

export default function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: '', email: '', password: '', confirm: '', terms: false } })
  const [result, setResult] = useState(null)
  const onSubmit = async (v) => {
    try { const res = await registerUser({ name: v.name, email: v.email, password: v.password }); setResult(res); toast.success(res.simulated ? 'Inscription simulée (démonstration)' : 'Compte créé') }
    catch (e) { toast.error(e.message) }
  }
  if (result) return <SubmitResult title="Compte créé" simulated={result.simulated} realText="Vous pouvez maintenant vous connecter." />
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <FormInput label="Nom complet" autoComplete="name" error={errors.name?.message} {...register('name', { required: 'Indiquez votre nom.', minLength: { value: 3, message: 'Au moins 3 caractères.' }, pattern: { value: NAME_RE, message: 'Utilisez uniquement des lettres.' } })} />
      <FormInput label="E-mail" type="email" autoComplete="email" error={errors.email?.message} {...register('email', { required: 'Saisissez votre e-mail.', pattern: { value: EMAIL_RE, message: 'Format invalide, exemple : vous@exemple.com.' } })} />
      <FormInput label="Mot de passe" type="password" autoComplete="new-password" hint="8 caractères minimum, avec une lettre et un chiffre." error={errors.password?.message}
        {...register('password', { required: 'Choisissez un mot de passe.', minLength: { value: 8, message: '8 caractères minimum.' }, validate: (v) => (/[A-Za-z]/.test(v) && /\d/.test(v)) || 'Ajoutez au moins une lettre et un chiffre.' })} />
      <FormInput label="Confirmer le mot de passe" type="password" autoComplete="new-password" error={errors.confirm?.message} {...register('confirm', { required: 'Confirmez le mot de passe.', validate: (v) => v === watch('password') || 'Les mots de passe ne correspondent pas.' })} />
      <label className="flex items-start gap-2.5 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#E58A13]" {...register('terms', { required: 'Acceptez les conditions pour continuer.' })} />J’accepte que le comité conserve mes informations pour gérer mon compte.</label>
      {errors.terms && <p role="alert" className="-mt-2 text-xs font-medium text-wine">{errors.terms.message}</p>}
      <Button type="submit" variant="dark" loading={isSubmitting} className="w-full">Créer mon compte</Button>
      <p className="text-center text-sm">Déjà membre ? <Link to="/connexion" className="font-bold text-wine hover:underline">Se connecter</Link></p>
      <DemoNotice />
    </form>
  )
}
