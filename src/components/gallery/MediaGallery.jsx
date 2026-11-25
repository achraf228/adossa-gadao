import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, Play } from 'lucide-react'
import ImagePlaceholder from '../common/ImagePlaceholder'
import Badge from '../common/Badge'
import Lightbox from './Lightbox'
import { cn } from '../../utils/format'

const LABEL = { photo: 'Photo', video: 'Vidéo', poster: 'Affiche' }

/** Grille responsive de médias + lightbox (photos, vidéos, affiches). */
export default function MediaGallery({ items, className }) {
  const [index, setIndex] = useState(null)
  return (
    <>
      <ul className={cn('grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4', className)}>
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li key={item.id} layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}>
              <button onClick={() => setIndex(i)} aria-label={`Ouvrir : ${item.title}`} className="group relative block aspect-[4/3] w-full overflow-hidden bg-sand text-left">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  <ImagePlaceholder src={item.src} alt={item.title} tone={item.tone} kind={item.type} label={item.type === 'poster' ? 'Affiche' : item.type === 'video' ? 'Vidéo' : 'Photo'} />
                </div>
                <div className="absolute inset-x-0 top-0 flex justify-between p-2"><Badge tone="dark">{LABEL[item.type]}</Badge>{item.year && <Badge tone="gold">{item.year}</Badge>}</div>
                <div className="absolute inset-0 flex items-center justify-center bg-bark/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-bark">{item.type === 'video' ? <Play size={24} /> : <Maximize2 size={22} />}</span>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  )
}
