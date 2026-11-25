import { cn } from '../../utils/format'

const TONES = {
  gold: 'bg-gold text-bark',
  dark: 'bg-bark text-cream',
  wine: 'bg-wine text-cream',
  green: 'bg-emerald-700 text-white',
  sand: 'bg-sand text-brown',
  todo: 'border border-dashed border-wine/60 bg-wine/5 text-wine',
}
export default function Badge({ tone = 'sand', className, children }) {
  return <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold tracking-wide whitespace-nowrap', TONES[tone], className)}>{children}</span>
}
/** Marque un contenu non fourni, de façon visible. */
export const ToProvide = ({ children = 'À compléter' }) => <Badge tone="todo">{children}</Badge>
