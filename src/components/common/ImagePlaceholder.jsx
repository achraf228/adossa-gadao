import { Image as ImageIcon, Play, FileText } from 'lucide-react'
import Pattern from './Pattern'
import { cn } from '../../utils/format'

const TONES = {
  brown: 'bg-brown text-gold',
  bark: 'bg-bark text-gold',
  gold: 'bg-gold text-bark',
  wine: 'bg-wine text-sand',
  sand: 'bg-sand text-brown',
}
const ICONS = { photo: ImageIcon, video: Play, poster: FileText }

/** Affiche `src` si fourni, sinon un emplacement clairement identifié « à fournir ». */
export default function ImagePlaceholder({ src, alt = '', label = 'Photo à fournir', tone = 'brown', kind = 'photo', className, imgClassName, showLabel = true }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={cn('h-full w-full object-cover', imgClassName)} />
  const Icon = ICONS[kind] || ImageIcon
  return (
    <div role="img" aria-label={label} className={cn('relative flex h-full w-full items-center justify-center overflow-hidden', TONES[tone], className)}>
      <Pattern className="absolute inset-0 opacity-[0.14]" />
      <div className="relative flex flex-col items-center gap-2 px-3 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-current/60"><Icon size={20} /></span>
        {showLabel && <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">{label}</span>}
      </div>
    </div>
  )
}
