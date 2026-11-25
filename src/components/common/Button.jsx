import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/format'

const MotionLink = motion.create(Link)

const VARIANTS = {
  gold: 'bg-gold text-bark hover:bg-[#f29a2a]',
  dark: 'bg-bark text-cream hover:bg-brown',
  wine: 'bg-wine text-cream hover:bg-[#b3242a]',
  outline: 'border border-cream/80 text-cream hover:bg-cream hover:text-bark',
  outlineDark: 'border border-bark text-bark hover:bg-bark hover:text-cream',
  light: 'bg-cream text-bark hover:bg-white',
  danger: 'bg-wine text-cream hover:bg-[#b3242a]',
  ghost: 'text-bark hover:bg-bark/10',
}
const SIZES = { sm: 'min-h-9 px-3 py-1.5 text-xs', md: 'min-h-11 px-5 py-2.5 text-sm', lg: 'min-h-12 px-7 py-3 text-sm' }

export default function Button({ variant = 'gold', size = 'md', to, href, loading = false, disabled, icon: Icon, className, children, type = 'button', ...rest }) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-colors duration-200 select-none',
    'disabled:cursor-not-allowed disabled:opacity-50', VARIANTS[variant], SIZES[size], className,
  )
  const motionProps = disabled || loading ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.96 }, transition: { type: 'spring', stiffness: 500, damping: 30 } }
  const content = (
    <>
      {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : Icon && <Icon size={16} aria-hidden />}
      {children}
    </>
  )
  if (to) return <MotionLink to={to} className={cls} {...motionProps} {...rest}>{content}</MotionLink>
  if (href) return <motion.a href={href} className={cls} {...motionProps} {...rest}>{content}</motion.a>
  return <motion.button type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cls} {...motionProps} {...rest}>{content}</motion.button>
}
