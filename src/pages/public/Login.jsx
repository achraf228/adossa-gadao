import HeroSection from '../../components/layout/HeroSection'
import LoginForm from '../../components/forms/LoginForm'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function Login() {
  usePageTitle('Connexion')
  return (
    <section className="bg-brown py-14 sm:py-20">
      <div className="container-x max-w-md">
        <h1 className="mb-6 text-5xl text-cream">Espace membre</h1>
        <div className="border-t-4 border-gold bg-cream p-6 shadow-2xl sm:p-8"><LoginForm /></div>
        <p className="mt-5 text-center text-sm text-cream/80">Vous gérez le site ? <Link to="/admin" className="font-bold text-gold underline-offset-4 hover:underline">Ouvrir l’administration (démo)</Link></p>
      </div>
    </section>
  )
}
