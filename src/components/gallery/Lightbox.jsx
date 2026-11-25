import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ImagePlaceholder from '../common/ImagePlaceholder'
import { useLockBody } from '../../hooks/useLockBody'
import { cn } from '../../utils/format'

const slide = {
  enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
}

function Media({ item }) {
  if (item.type === 'video' && item.videoSrc) return <video key={item.videoSrc} src={item.videoSrc} controls autoPlay className="max-h-[70dvh] w-full bg-black" />
  const ratio = item.type === 'poster' ? 'aspect-[3/4] max-h-[70dvh]' : 'aspect-[4/3] max-h-[70dvh]'
  return (
    <div className={cn('mx-auto w-full', ratio, item.type === 'poster' ? 'max-w-md' : 'max-w-4xl')}>
      <ImagePlaceholder src={item.src} alt={item.title} tone={item.tone} kind={item.type} label={item.type === 'video' ? 'Vidéo à fournir par le comité' : item.type === 'poster' ? 'Affiche à fournir' : 'Photo à fournir'} />
    </div>
  )
}

export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null && index >= 0
  const [dir, setDir] = useState(0)
  const ref = useRef(null)
  useLockBody(open)

  const go = (delta) => { setDir(delta); onIndex((index + delta + items.length) % items.length) }
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && items.length > 1) go(1)
      if (e.key === 'ArrowLeft' && items.length > 1) go(-1)
    }
    document.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  })

  const item = open ? items[index] : null
  const label = { photo: 'Photo', video: 'Vidéo', poster: 'Affiche' }
  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-[80] flex flex-col bg-bark/95 outline-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className="flex items-center justify-between px-4 py-3 text-cream sm:px-6">
            <p className="text-sm font-medium">{label[item.type]}{item.year ? ` · ${item.year}` : ''} <span className="text-cream/60">— {index + 1} / {items.length}</span></p>
            <button onClick={onClose} aria-label="Fermer" className="grid h-11 w-11 place-items-center hover:bg-white/10"><X size={24} /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
            {items.length > 1 && <button onClick={() => go(-1)} aria-label="Précédent" className="absolute left-1 z-10 grid h-12 w-12 place-items-center bg-bark/70 text-cream hover:bg-gold hover:text-bark sm:left-4"><ChevronLeft size={26} /></button>}
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div key={item.id} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="w-full">
                <Media item={item} />
              </motion.div>
            </AnimatePresence>
            {items.length > 1 && <button onClick={() => go(1)} aria-label="Suivant" className="absolute right-1 z-10 grid h-12 w-12 place-items-center bg-bark/70 text-cream hover:bg-gold hover:text-bark sm:right-4"><ChevronRight size={26} /></button>}
          </div>
          <p className="px-4 py-4 text-center text-sm text-cream/90">{item.title}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
