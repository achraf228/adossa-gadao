import Modal from './Modal'
import Button from './Button'

/** Confirmation avant action sensible. */
export default function ConfirmDialog({ open, title = 'Confirmer l’action', message, confirmLabel = 'Confirmer', danger = false, loading = false, onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <p className="text-sm leading-relaxed text-bark/80">{message}</p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="outlineDark" onClick={onCancel}>Annuler</Button>
        <Button variant={danger ? 'danger' : 'gold'} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  )
}
