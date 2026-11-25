import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, ExternalLink } from 'lucide-react'
import AdminSidebar, { ADMIN_NAV } from '../components/admin/AdminSidebar'
import PageTransition from '../components/animations/PageTransition'
import { usePageTitle } from '../hooks/usePageTitle'

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const current = ADMIN_NAV.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)))
  usePageTitle(`Admin · ${current?.label || ''}`)
  return (
    <div className="min-h-dvh bg-[#F5EBD7]">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b-4 border-gold bg-bark px-4 text-cream sm:px-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} aria-label="Ouvrir le menu" className="grid h-11 w-11 place-items-center hover:bg-white/10 lg:hidden"><Menu size={24} /></button>
            <p className="font-display text-2xl">{current?.label}</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-cream/70">Administrateur (démo)</span>
            <Link to="/" className="inline-flex items-center gap-1.5 font-bold text-gold hover:underline"><ExternalLink size={14} />Voir le site</Link>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8"><PageTransition key={pathname}><Outlet /></PageTransition></main>
      </div>
    </div>
  )
}
