import { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '../../utils/format'

/** Champ de formulaire accessible (input, textarea ou select) compatible react-hook-form. */
const FormInput = forwardRef(function FormInput({ label, error, hint, as: Tag = 'input', id, className, children, ...rest }, ref) {
  const uid = useId()
  const fid = id || uid
  return (
    <div className={className}>
      <label htmlFor={fid} className="mb-1.5 block text-xs font-bold tracking-wide text-bark">{label}</label>
      <Tag
        ref={ref} id={fid} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        className={cn('input-base', Tag === 'textarea' && 'min-h-28 resize-y', error && 'input-error')} {...rest}
      >
        {children}
      </Tag>
      {hint && !error && <p id={`${fid}-hint`} className="mt-1 text-xs text-bark/60">{hint}</p>}
      {error && <p id={`${fid}-err`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-wine"><AlertCircle size={14} className="mt-px shrink-0" />{error}</p>}
    </div>
  )
})
export default FormInput
