import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLockBody } from '../../hooks/useLockBody'
import { cn } from '../../utils/format'

const SIZES = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' }

export default function Modal({ open, onClose, title, size = 'md', children, className }) {
  const ref = useRef(null)
  useLockBody(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className="absolute inset-0 bg-bark/70 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
          <motion.div
            ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title}
            initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn('relative max-h-[92dvh] w-full overflow-y-auto bg-cream shadow-2xl outline-none', SIZES[size], className)}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b-4 border-gold bg-bark px-5 py-4 text-cream">
              <h2 className="text-2xl">{title}</h2>
              <button onClick={onClose} aria-label="Fermer" className="grid h-9 w-9 place-items-center transition-colors hover:bg-white/10"><X size={20} /></button>
            </div>
            <div className="p-5 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
