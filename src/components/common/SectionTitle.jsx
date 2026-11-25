import Reveal from '../animations/Reveal'
import { cn } from '../../utils/format'

export default function SectionTitle({ title, subtitle, light = false, center = false, as: Tag = 'h2', className, id }) {
  return (
    <Reveal className={cn('mb-8 sm:mb-10', center && 'text-center', className)}>
      <Tag id={id} className={cn('text-4xl sm:text-5xl', light ? 'text-cream' : 'text-bark')}>{title}</Tag>
      {subtitle && <p className={cn('mt-3 max-w-xl text-base', center && 'mx-auto', light ? 'text-cream/80' : 'text-bark/75')}>{subtitle}</p>}
    </Reveal>
  )
}
