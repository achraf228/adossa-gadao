import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { pad } from '../../utils/format'

function Unit({ value, label }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center border border-gold/40 bg-bark/40 px-2 py-4 backdrop-blur-sm sm:px-6 sm:py-6">
      <div className="h-[1em] overflow-hidden font-display text-5xl leading-none text-gold sm:text-7xl" aria-hidden>
        <motion.span key={value} className="block" initial={{ y: '-60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>{pad(value)}</motion.span>
      </div>
      <span className="mt-2 text-[11px] font-bold tracking-widest text-cream/80 uppercase sm:text-xs">{label}</span>
    </div>
  )
}

export default function Countdown({ start, end }) {
  const { phase, days, hours, minutes, seconds } = useCountdown(start, end)
  if (phase === 'ongoing') return <p role="status" className="mt-10 inline-block bg-gold px-6 py-4 font-display text-3xl text-bark sm:text-5xl">L’édition a commencé !</p>
  if (phase === 'finished') return <p role="status" className="mt-10 inline-block border border-gold px-6 py-4 font-display text-3xl text-gold sm:text-4xl">Cette édition est terminée — retrouvez-la dans les archives</p>
  return (
    <div className="mt-10" role="timer" aria-label={`${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes avant le début de l’édition`}>
      <div className="flex max-w-2xl gap-2 sm:gap-4">
        <Unit value={days} label="jours" /><Unit value={hours} label="heures" /><Unit value={minutes} label="minutes" /><Unit value={seconds} label="secondes" />
      </div>
    </div>
  )
}
