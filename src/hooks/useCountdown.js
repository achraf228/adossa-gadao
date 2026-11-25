import { useEffect, useState } from 'react'

/** Compte à rebours actualisé chaque seconde. phase : upcoming | ongoing | finished. */
export function useCountdown(startIso, endIso) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const start = new Date(startIso).getTime()
  const end = new Date(endIso).getTime()
  const phase = now < start ? 'upcoming' : now <= end ? 'ongoing' : 'finished'
  const diff = Math.max(0, start - now)
  const s = Math.floor(diff / 1000)
  return { phase, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 }
}
