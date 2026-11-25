import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { MessageSquare, MessagesSquare, Quote, Send } from 'lucide-react'
import HeroSection from '../../components/layout/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Modal from '../../components/common/Modal'
import FormInput from '../../components/common/FormInput'
import DemoNotice from '../../components/common/DemoNotice'
import ImagePlaceholder from '../../components/common/ImagePlaceholder'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import Reveal from '../../components/animations/Reveal'
import LoginForm from '../../components/forms/LoginForm'
import ContributionForm from '../../components/forms/ContributionForm'
import { getDiscussions, getMemories, postReply } from '../../services/publicService'
import { useResource } from '../../hooks/useResource'
import { usePageTitle } from '../../hooks/usePageTitle'
import { formatDate } from '../../utils/format'

function Thread({ thread, onReply }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { text: '' } })
  const submit = async ({ text }) => {
    try {
      const res = await postReply(thread.id, text)
      onReply(thread.id, { id: `local-${Date.now()}`, author: 'Vous', date: new Date().toISOString(), text })
      reset()
      toast.success(res.simulated ? 'Réponse ajoutée localement (démonstration)' : 'Réponse publiée')
    } catch (e) { toast.error(e.message) }
  }
  return (
    <div>
      <p className="text-sm text-bark/70">{thread.author} · {formatDate(thread.date)}</p>
      {thread.replies.length === 0 ? <p className="my-5 bg-sand/50 px-4 py-6 text-center text-sm">Aucune réponse pour l’instant. Lancez la conversation !</p> : (
        <ol className="my-5 grid gap-3">
          {thread.replies.map((r) => (
            <li key={r.id} className="border-l-4 border-gold bg-white p-4"><p className="text-xs font-bold">{r.author} <span className="font-normal text-bark/60">· {formatDate(r.date)}</span></p><p className="mt-1 text-sm">{r.text}</p></li>
          ))}
        </ol>
      )}
      <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-3">
        <FormInput as="textarea" label="Votre réponse" error={errors.text?.message} {...register('text', { required: 'Écrivez votre réponse.', minLength: { value: 3, message: 'Réponse trop courte.' } })} />
        <DemoNotice />
        <Button type="submit" icon={Send} loading={isSubmitting} className="justify-self-end">Répondre</Button>
      </form>
    </div>
  )
}

export default function Communaute() {
  usePageTitle('Communauté', 'Un espace pour échanger, partager et rester en lien, au-delà des trois jours de fête.')
  const discussions = useResource(getDiscussions)
  const memories = useResource(getMemories)
  const [openId, setOpenId] = useState(null)
  const [share, setShare] = useState(false)
  const open = discussions.data?.find((d) => d.id === openId)

  const addReply = (id, reply) => discussions.setData((list) => list.map((d) => (d.id === id ? { ...d, replies: [...d.replies, reply] } : d)))

  return (
    <>
      <HeroSection tone="brown" title="Communauté" size="md" description="Un espace pour échanger, partager et rester en lien, au-delà des trois jours de fête." />

      <section className="bg-cream py-16 sm:py-20" aria-labelledby="discussions">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div>
            <SectionTitle id="discussions" title="Discussions" />
            <AsyncView status={discussions.status} error={discussions.error} reload={discussions.reload} empty={<EmptyState icon={MessagesSquare} title="Aucune discussion" text="Les sujets lancés par la communauté apparaîtront ici." />}>
              <ul className="grid gap-3">
                {discussions.data?.map((d, i) => (
                  <Reveal as="li" key={d.id} delay={i * 0.07}>
                    <Card hover className="block">
                      <button onClick={() => setOpenId(d.id)} className="flex w-full items-start justify-between gap-4 p-5 text-left">
                        <span><span className="block font-bold">{d.subject}</span><span className="mt-1 block text-sm text-bark/65">{d.author} · {formatDate(d.date)}</span></span>
                        <span className="flex shrink-0 items-center gap-1.5 bg-sand px-2.5 py-1 text-xs font-bold text-brown"><MessageSquare size={14} />{d.replies.length} réponse{d.replies.length > 1 ? 's' : ''}</span>
                      </button>
                    </Card>
                  </Reveal>
                ))}
              </ul>
            </AsyncView>
          </div>

          <div>
            <SectionTitle title="Espace membre" as="h2" />
            <Reveal><div className="border-t-4 border-gold bg-white p-6 shadow-lg shadow-bark/10"><LoginForm compact /></div></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="souvenirs">
        <div className="container-x">
          <SectionTitle id="souvenirs" title="Mur de souvenirs" />
          <AsyncView status={memories.status} error={memories.error} reload={memories.reload} empty={<EmptyState icon={Quote} title="Le mur est encore vide" text="Soyez le premier à partager un souvenir." action={<Button onClick={() => setShare(true)}>Partager un souvenir</Button>} />}>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {memories.data?.map((m, i) => (
                <Reveal as="li" key={m.id} delay={i * 0.08}>
                  {m.kind === 'quote' ? (
                    <figure className="flex aspect-[4/3] flex-col justify-center bg-wine p-6 text-cream"><Quote className="text-gold" size={28} /><blockquote className="mt-2 text-sm leading-relaxed">{m.text}</blockquote><figcaption className="mt-3 text-xs font-bold text-gold">{m.author}</figcaption></figure>
                  ) : (
                    <div className="group aspect-[4/3] overflow-hidden"><div className="h-full w-full transition-transform duration-700 group-hover:scale-110"><ImagePlaceholder src={m.src} tone={m.tone} label={m.title} /></div></div>
                  )}
                </Reveal>
              ))}
            </ul>
            <div className="mt-8"><Button size="lg" onClick={() => setShare(true)}>Partager un souvenir</Button></div>
          </AsyncView>
        </div>
      </section>

      <Modal open={!!open} onClose={() => setOpenId(null)} title={open?.subject || ''} size="lg">{open && <Thread thread={open} onReply={addReply} />}</Modal>
      <Modal open={share} onClose={() => setShare(false)} title="Partager un souvenir" size="lg"><ContributionForm kind="memory" onDone={() => setShare(false)} /></Modal>
    </>
  )
}
