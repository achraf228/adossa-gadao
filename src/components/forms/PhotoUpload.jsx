import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw, Trash2, Upload, AlertCircle } from 'lucide-react'
import { IMAGE_TYPES, validateFile } from '../../utils/validators'
import { cn } from '../../utils/format'

/** Sélection de fichier(s) avec prévisualisation, remplacement et suppression. Contrôlé (value/onChange). */
export default function PhotoUpload({ label, value, onChange, error, multiple = false, types = IMAGE_TYPES, maxMb = 5, hint, max = 6 }) {
  const files = useMemo(() => (value ? (Array.isArray(value) ? value : [value]) : []), [value])
  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files])
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews])
  const [localError, setLocalError] = useState(null)
  const inputRef = useRef(null)
  const shownError = localError || error

  const handle = (e) => {
    const picked = [...e.target.files]
    e.target.value = ''
    if (!picked.length) return
    const bad = picked.map((f) => validateFile(f, { types, maxMb })).find(Boolean)
    if (bad) return setLocalError(bad)
    setLocalError(null)
    onChange(multiple ? [...files, ...picked].slice(0, max) : picked[0])
  }
  const removeAt = (i) => { setLocalError(null); onChange(multiple ? files.filter((_, idx) => idx !== i) : null) }
  const accept = types.join(',')

  return (
    <div>
      <span className="mb-1.5 block text-xs font-bold tracking-wide text-bark">{label}</span>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handle} className="sr-only" tabIndex={-1} aria-label={label} />
      {previews.length > 0 && (
        <ul className={cn('mb-3 grid gap-3', multiple ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1')}>
          <AnimatePresence>
            {previews.map((p, i) => (
              <motion.li key={p.url} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative overflow-hidden border border-brown/30 bg-sand">
                {p.file.type.startsWith('video') ? (
                  <video src={p.url} muted className="h-40 w-full object-cover" />
                ) : p.file.type === 'application/pdf' ? (
                  <div className="grid h-40 place-items-center text-sm font-bold text-brown">PDF</div>
                ) : (
                  <img src={p.url} alt={`Prévisualisation : ${p.file.name}`} className={cn('w-full object-cover', multiple ? 'h-32' : 'h-56 sm:h-64')} />
                )}
                <div className="flex items-center justify-between gap-2 bg-bark px-2.5 py-1.5 text-xs text-cream">
                  <span className="truncate">{p.file.name}</span>
                  <span className="flex shrink-0 gap-1">
                    {!multiple && <button type="button" onClick={() => inputRef.current?.click()} aria-label="Remplacer le fichier" className="p-1 hover:text-gold"><RefreshCw size={15} /></button>}
                    <button type="button" onClick={() => removeAt(i)} aria-label={`Supprimer ${p.file.name}`} className="p-1 hover:text-gold"><Trash2 size={15} /></button>
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
      {(multiple ? files.length < max : files.length === 0) && (
        <button type="button" onClick={() => inputRef.current?.click()} className={cn('flex w-full flex-col items-center gap-1.5 border-2 border-dashed bg-white px-4 py-6 text-sm text-bark/70 transition-colors hover:border-gold hover:bg-gold/5', shownError ? 'border-wine' : 'border-brown/40')}>
          <Upload size={22} className="text-brown" />
          <span className="font-medium">{multiple ? 'Ajouter des fichiers' : 'Choisir un fichier'}</span>
          <span className="text-xs text-bark/55">{hint || `${types.map((t) => t.split('/')[1].toUpperCase()).join(', ')} · ${maxMb} Mo max`}</span>
        </button>
      )}
      {shownError && <p role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-wine"><AlertCircle size={14} className="mt-px shrink-0" />{shownError}</p>}
    </div>
  )
}
