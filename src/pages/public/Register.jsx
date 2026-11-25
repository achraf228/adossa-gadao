import RegisterForm from '../../components/forms/RegisterForm'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Register() {
  usePageTitle('Inscription')
  return (
    <section className="bg-brown py-14 sm:py-20">
      <div className="container-x max-w-md">
        <h1 className="mb-6 text-5xl text-cream">Créer un compte</h1>
        <div className="border-t-4 border-gold bg-cream p-6 shadow-2xl sm:p-8"><RegisterForm /></div>
      </div>
    </section>
  )
}
