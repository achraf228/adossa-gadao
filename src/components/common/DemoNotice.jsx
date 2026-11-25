import { Info } from 'lucide-react'
import { IS_DEMO } from '../../services/api'
import { cn } from '../../utils/format'

/** Rappelle honnêtement que le backend n'est pas connecté. */
export default function DemoNotice({ children = 'Mode démonstration : données fictives, aucune information n’est enregistrée sur un serveur.', className }) {
  if (!IS_DEMO) return null
  return (
    <p role="note" className={cn('flex items-start gap-2 border-l-4 border-gold bg-gold/10 px-3 py-2 text-xs text-bark/80', className)}>
      <Info size={14} className="mt-0.5 shrink-0 text-gold" />{children}
    </p>
  )
}
