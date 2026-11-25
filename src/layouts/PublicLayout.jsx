import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/layout/Footer'
import PageTransition from '../components/animations/PageTransition'

export default function PublicLayout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:font-bold">Aller au contenu</a>
      <Navbar />
      <main id="contenu" className="flex-1">
        <PageTransition key={pathname}><Outlet /></PageTransition>
      </main>
      <Footer />
    </div>
  )
}
