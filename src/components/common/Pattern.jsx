import { useId } from 'react'

/** Motif géométrique décoratif (losanges). Pure décoration : ne prétend représenter aucun motif traditionnel précis. */
export default function Pattern({ className = '', size = 56 }) {
  const id = useId()
  const h = size / 2
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M${h} 4 L${size - 4} ${h} L${h} ${size - 4} L4 ${h}Z`} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d={`M${h} ${h - 9} L${h + 9} ${h} L${h} ${h + 9} L${h - 9} ${h}Z`} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
