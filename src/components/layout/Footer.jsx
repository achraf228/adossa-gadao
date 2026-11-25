import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import Logo from '../common/Logo'
import { NAV, SITE } from '../../data/site'

export default function Footer() {
  return (
    <footer className="bg-bark text-cream">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo size="text-3xl" />
          <p className="mt-2 text-sm text-cream/80">{SITE.slogan}</p>
        </div>
        <nav aria-label="Navigation secondaire">
          <h2 className="mb-3 text-xl text-gold">Explorer</h2>
          <ul className="grid gap-1.5 text-sm">
            {NAV.map((l) => <li key={l.to}><Link to={l.to} className="text-cream/80 transition-colors hover:text-gold">{l.label}</Link></li>)}
            <li><Link to="/connexion" className="text-cream/80 transition-colors hover:text-gold">Espace membre</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-xl text-gold">Contact</h2>
          <p className="text-sm text-cream/80">Comité d’organisation</p>
          <a href={`mailto:${SITE.email}`} className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-cream transition-colors hover:text-gold"><Mail size={16} />{SITE.email}</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-4 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} ADOSSA-GADAO · Comité d’organisation · {SITE.email}</p>
          <Link to="/admin" className="transition-colors hover:text-gold">Administration (démo)</Link>
        </div>
      </div>
    </footer>
  )
}
