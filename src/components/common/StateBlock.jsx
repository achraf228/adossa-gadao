import { Inbox, Loader2, TriangleAlert } from 'lucide-react'
import Button from './Button'
import { cn } from '../../utils/format'

export function Loader({ label = 'Chargement…', className }) {
  return (
    <div role="status" className={cn('flex flex-col items-center justify-center gap-3 py-16 text-brown', className)}>
      <Loader2 className="animate-spin" size={32} /><span className="text-sm font-medium">{label}</span>
    </div>
  )
}

export function EmptyState({ icon: Icon = Inbox, title, text, action, className }) {
  return (
    <div className={cn('flex flex-col items-center border-2 border-dashed border-brown/30 bg-white/60 px-6 py-14 text-center', className)}>
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-sand text-brown"><Icon size={26} /></span>
      <h3 className="text-2xl text-bark">{title}</h3>
      {text && <p className="mt-2 max-w-md text-sm text-bark/70">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorState({ message = 'Une erreur est survenue.', onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center border-2 border-wine/30 bg-wine/5 px-6 py-12 text-center">
      <TriangleAlert className="mb-3 text-wine" size={32} />
      <p className="font-bold text-wine">{message}</p>
      {onRetry && <Button className="mt-4" variant="wine" onClick={onRetry}>Réessayer</Button>}
    </div>
  )
}

/** Affiche le bon état selon `status` : loading | error | empty | success. */
export function AsyncView({ status, error, reload, empty, children, loadingLabel }) {
  if (status === 'loading') return <Loader label={loadingLabel} />
  if (status === 'error') return <ErrorState message={error?.message} onRetry={reload} />
  if (status === 'empty') return empty
  return children
}
