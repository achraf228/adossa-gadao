import { motion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/** Apparition au défilement, jouée une seule fois. `prefers-reduced-motion` géré par MotionConfig (main.jsx). */
export default function Reveal({ children, delay = 0, y = 24, x = 0, as = 'div', className, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
