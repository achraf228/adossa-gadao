import { motion } from 'framer-motion'
import Pattern from '../common/Pattern'
import { EASE } from '../animations/Reveal'
import { cn } from '../../utils/format'

const TONES = { brown: 'bg-brown', wine: 'bg-wine', bark: 'bg-bark' }
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }

/** Hero réutilisable : séquence d'apparition au chargement + motif décoratif en dérive lente. */
export default function HeroSection({ eyebrow, title, description, actions, tone = 'brown', art, backgroundImage, children, size = 'lg', titleClassName }) {
  return (
    <section
      className={cn('relative isolate overflow-hidden text-cream', TONES[tone], size === 'lg' ? 'py-16 sm:py-24 lg:py-28' : 'py-14 sm:py-20')}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(43, 23, 12, 0.62), rgba(43, 23, 12, 0.62)), url("${backgroundImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      } : undefined}
    >
      <motion.div aria-hidden className="absolute inset-y-0 -left-14 right-0 -z-10 text-gold opacity-[0.07]" animate={{ x: [0, 56] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        <Pattern />
      </motion.div>
      {art && (
        <motion.div aria-hidden initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: EASE }}
          className="absolute inset-y-0 right-0 -z-10 w-full opacity-25 lg:w-[52%] lg:opacity-100"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}>
          {art}
        </motion.div>
      )}
      <motion.div variants={container} initial="hidden" animate="show" className="container-x">
        {eyebrow && <motion.p variants={rise} className="mb-4 text-[11px] font-bold tracking-[0.22em] text-gold uppercase">{eyebrow}</motion.p>}
        <h1 className={cn('overflow-hidden pb-1 text-[clamp(3.25rem,13vw,8.5rem)] leading-[0.92]', titleClassName)}>
          <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>{title}</motion.span>
        </h1>
        {description && <motion.p variants={rise} className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">{description}</motion.p>}
        {actions && <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">{actions}</motion.div>}
        {children && <motion.div variants={rise}>{children}</motion.div>}
      </motion.div>
    </section>
  )
}
