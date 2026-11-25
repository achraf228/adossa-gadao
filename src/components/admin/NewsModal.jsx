import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Modal from '../common/Modal'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import { createNews } from '../../services/adminService'

export default function NewsModal({ open, onClose, onCreated }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { title: '', body: '' } })
  const submit = async (v) => {
    try { const item = await createNews(v); onCreated?.(item); toast.success('Actualité enregistrée en brouillon'); reset(); onClose() }
    catch (e) { toast.error(e.message) }
  }
  return (
    <Modal open={open} onClose={onClose} title="Nouvelle actualité">
      <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
        <FormInput label="Titre" error={errors.title?.message} {...register('title', { required: 'Donnez un titre à l’actualité.', minLength: { value: 5, message: 'Au moins 5 caractères.' } })} />
        <FormInput as="textarea" label="Contenu" error={errors.body?.message} {...register('body', { required: 'Rédigez le contenu.', minLength: { value: 20, message: 'Au moins 20 caractères.' } })} />
        <div className="flex justify-end gap-3"><Button variant="outlineDark" onClick={onClose}>Annuler</Button><Button type="submit" loading={isSubmitting}>Enregistrer</Button></div>
      </form>
    </Modal>
  )
}
