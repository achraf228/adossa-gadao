import { Link } from 'react-router-dom'
import { cn } from '../../utils/format'

export default function Logo({ to = '/', suffix = 'GADAO', prefix = 'ADOSSA', className, size = 'text-2xl' }) {
  return (
    <Link to={to} aria-label="ADOSSA-GADAO, retour à l’accueil" className={cn('font-display tracking-wide whitespace-nowrap', size, className)}>
      <span className="text-white">{prefix}</span> <span className="text-gold">{suffix}</span>
    </Link>
  )
}
