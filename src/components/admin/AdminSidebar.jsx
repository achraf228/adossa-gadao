import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Gauge, CalendarRange, UserCheck, FileText, Images, Mail, Users, Settings, X, ExternalLink } from 'lucide-react'
import Logo from '../common/Logo'
import { useLockBody } from '../../hooks/useLockBody'
import { cn } from '../../utils/format'

export const ADMIN_NAV = [
  { to: '/admin', end: true, label: 'Tableau de bord', icon: Gauge },
  { to: '/admin/editions', label: 'Éditions', icon: CalendarRange },
  { to: '/admin/candidatures', label: 'Candidatures', icon: UserCheck },
  { to: '/admin/contenus', label: 'Contenus', icon: FileText },
  { to: '/admin/medias', label: 'Médias', icon: Images },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/membres', label: 'Membres', icon: Users },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

function Content({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-bark text-cream">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5"><Logo to="/admin" prefix="ADMIN" suffix="GADAO" /></div>
      <nav aria-label="Navigation administration" className="flex-1 overflow-y-auto py-4">
        <ul>
          {ADMIN_NAV.map(({ to, end, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} end={end} onClick={onNavigate} className={({ isActive }) => cn('relative flex min-h-11 items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors', isActive ? 'bg-white/10 text-gold' : 'text-cream/80 hover:bg-white/5 hover:text-white')}>
                {({ isActive }) => (<>{isActive && <motion.span layoutId="admin-active" className="absolute inset-y-0 left-0 w-1 bg-gold" />}<Icon size={18} />{label}</>)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <NavLink to="/" className="flex items-center gap-2 border-t border-white/10 px-5 py-4 text-xs text-cream/70 hover:text-gold"><ExternalLink size={14} />Voir le site public</NavLink>
    </div>
  )
}

export default function AdminSidebar({ open, onClose }) {
  useLockBody(open)
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 lg:block"><Content /></aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.28 }} className="absolute inset-y-0 left-0 w-72 max-w-[85vw]">
              <Content onNavigate={onClose} />
              <button onClick={onClose} aria-label="Fermer le menu" className="absolute top-3 right-3 grid h-10 w-10 place-items-center text-cream"><X size={22} /></button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
