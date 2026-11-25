import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/format'

const MotionLink = motion.create(Link)

/** Carte réutilisable. `to` la rend cliquable ; `accent` ajoute le filet doré de la maquette. */
export default function Card({ to, accent = false, hover = true, className, children, ...rest }) {
  const Comp = to ? MotionLink : motion.div
  return (
    <Comp
      {...(to ? { to } : {})}
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('group block bg-white transition-shadow duration-300', hover && 'hover:shadow-xl hover:shadow-bark/15', accent && 'border-t-4 border-gold', className)}
      {...rest}
    >
      {children}
    </Comp>
  )
}
