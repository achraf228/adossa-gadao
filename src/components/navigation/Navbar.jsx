import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Menu, X } from 'lucide-react'
import Logo from '../common/Logo'
import Button from '../common/Button'
import { NAV } from '../../data/site'
import { cn } from '../../utils/format'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      setShowScrollTop(window.scrollY > 320)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header className={cn('sticky top-0 z-50 border-b transition-all duration-300', scrolled ? 'border-gold/30 bg-bark/95 shadow-lg shadow-black/30 backdrop-blur' : 'border-transparent bg-bark')}>
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => {
                  if (pathname === l.to) window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={({ isActive }) => cn('relative py-1 text-xs font-bold tracking-wide transition-colors', isActive ? 'text-gold' : 'text-white hover:text-gold')}
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 h-0.5 bg-gold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  </>
                )}
              </NavLink>
            ))}
            <Button to="/connexion" size="sm">Espace membre</Button>
          </nav>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} className="grid h-11 w-11 place-items-center text-white lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                {open ? <X size={26} /> : <Menu size={26} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav id="mobile-menu" aria-label="Navigation mobile" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden border-t border-white/10 bg-bark lg:hidden">
              <ul className="container-x flex flex-col py-3">
                {NAV.map((l, i) => (
                  <motion.li key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      onClick={() => {
                        setOpen(false)
                        if (pathname === l.to) window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={({ isActive }) => cn('block border-b border-white/10 py-3.5 font-display text-2xl tracking-wide', isActive ? 'text-gold' : 'text-white')}
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
                <li className="pt-4 pb-2"><Button to="/connexion" className="w-full">Espace membre</Button></li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            aria-label="Retour en haut"
            title="Retour en haut"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-gold text-bark shadow-lg transition-colors hover:bg-cream"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
