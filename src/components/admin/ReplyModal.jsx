import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Modal from '../common/Modal'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import DemoNotice from '../common/DemoNotice'
import { replyToMessage } from '../../services/adminService'

export default function ReplyModal({ message, onClose }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { text: '' } })
  const submit = async ({ text }) => {
    try { const r = await replyToMessage(message.id, text); toast.success(r?.simulated ? 'Réponse simulée (démonstration)' : 'Réponse envoyée'); reset(); onClose() }
    catch (e) { toast.error(e.message) }
  }
  return (
    <Modal open={!!message} onClose={onClose} title="Répondre" size="md">
      {message && (
        <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
          <p className="text-sm"><b>À :</b> {message.from} &lt;{message.email}&gt;<br /><b>Objet :</b> Re : {message.subject}</p>
          <FormInput as="textarea" label="Votre réponse" error={errors.text?.message} {...register('text', { required: 'Écrivez votre réponse.', minLength: { value: 5, message: 'Réponse trop courte.' } })} />
          <DemoNotice children="Mode démonstration : la réponse n’est pas envoyée par e-mail." />
          <div className="flex justify-end gap-3"><Button variant="outlineDark" onClick={onClose}>Annuler</Button><Button type="submit" loading={isSubmitting}>Envoyer la réponse</Button></div>
        </form>
      )}
    </Modal>
  )
}
