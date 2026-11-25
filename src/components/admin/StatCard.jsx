import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

export default function StatCard({ label, value, icon: Icon, delay = 0 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(value)
    const c = animate(0, value, { duration: 1, delay, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [value, delay])
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.45 }} className="border-t-4 border-gold bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><p className="text-xs font-bold tracking-wide text-bark/70">{label}</p>{Icon && <Icon size={18} className="text-brown" />}</div>
      <p className="mt-2 font-display text-5xl text-bark" aria-label={`${label} : ${value}`}>{String(n).padStart(2, '0')}</p>
    </motion.div>
  )
}
