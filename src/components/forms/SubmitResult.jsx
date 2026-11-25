import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Button from '../common/Button'

/** Confirmation affichée après envoi. Honnête : indique si l'envoi n'était qu'une simulation. */
export default function SubmitResult({ title, simulated, realText, onReset, resetLabel = 'Envoyer une autre demande' }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status" className="flex flex-col items-center py-6 text-center">
      <CheckCircle2 size={44} className="text-emerald-700" />
      <h3 className="mt-3 text-3xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-bark/75">
        {simulated ? 'Mode démonstration : le serveur n’est pas encore connecté, rien n’a été enregistré ni envoyé.' : realText}
      </p>
      {onReset && <Button className="mt-5" variant="outlineDark" onClick={onReset}>{resetLabel}</Button>}
    </motion.div>
  )
}
