import { useState } from 'react'
import { toast } from 'sonner'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { setCandidatureStatus } from '../services/adminService'

/** Valider / refuser une candidature (refus avec confirmation). `dialog` est à rendre dans la page. */
export function useCandidatureActions(setData) {
  const [target, setTarget] = useState(null)
  const [busy, setBusy] = useState(false)

  const apply = async (c, status) => {
    setBusy(true)
    try {
      await setCandidatureStatus(c.id, status)
      setData((list) => list.map((x) => (x.id === c.id ? { ...x, status } : x)))
      toast.success(status === 'validated' ? `${c.name} : candidature validée` : `${c.name} : candidature refusée`)
    } catch (e) { toast.error(e.message) } finally { setBusy(false); setTarget(null) }
  }

  const dialog = (
    <ConfirmDialog open={!!target} danger title="Refuser la candidature" confirmLabel="Refuser" loading={busy}
      message={`Voulez-vous vraiment refuser la candidature de ${target?.name} ?`} onConfirm={() => apply(target, 'refused')} onCancel={() => setTarget(null)} />
  )
  return { validate: (c) => apply(c, 'validated'), refuse: setTarget, dialog }
}
