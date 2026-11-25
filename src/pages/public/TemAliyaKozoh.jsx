import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CalendarClock, Crown, ScrollText, UserRound } from 'lucide-react'
import HeroSection from '../../components/layout/HeroSection'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import FormInput from '../../components/common/FormInput'
import DemoNotice from '../../components/common/DemoNotice'
import SectionTitle from '../../components/common/SectionTitle'
import ImagePlaceholder from '../../components/common/ImagePlaceholder'
import { AsyncView, EmptyState } from '../../components/common/StateBlock'
import { ToProvide } from '../../components/common/Badge'
import Reveal from '../../components/animations/Reveal'
import PhotoUpload from '../../components/forms/PhotoUpload'
import SubmitResult from '../../components/forms/SubmitResult'
import { IMAGES } from '../../data/site'
import { getCandidates, submitCandidature } from '../../services/publicService'
import { useResource } from '../../hooks/useResource'
import { usePageTitle } from '../../hooks/usePageTitle'
import { NAME_RE, PHONE_RE, validateBirthDate } from '../../utils/validators'

function CandidatureForm() {
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: '', birthDate: '', city: '', phone: '', photo: null } })
  const [result, setResult] = useState(null)

  const onSubmit = async (v) => {
    const fd = new FormData()
    Object.entries(v).forEach(([k, val]) => val && fd.append(k, val))
    try {
      const res = await submitCandidature(fd)
      setResult(res)
      toast.success(res.simulated ? 'Candidature simulée (démonstration)' : 'Candidature envoyée')
    } catch (e) { toast.error(e.message) }
  }

  if (result) return <SubmitResult title="Candidature reçue" simulated={result.simulated} realText="Le comité examinera votre dossier et vous contactera." onReset={() => { setResult(null); reset() }} resetLabel="Envoyer une autre candidature" />
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput label="Nom et prénom" autoComplete="name" error={errors.name?.message} {...register('name', { required: 'Indiquez votre nom et prénom.', minLength: { value: 5, message: 'Saisissez votre nom ET votre prénom.' }, pattern: { value: NAME_RE, message: 'Utilisez uniquement des lettres, espaces, tirets ou apostrophes.' } })} />
        <FormInput label="Date de naissance" type="date" autoComplete="bday" error={errors.birthDate?.message} {...register('birthDate', { validate: validateBirthDate })} />
        <FormInput label="Quartier ou ville" error={errors.city?.message} {...register('city', { required: 'Indiquez votre quartier ou votre ville.', minLength: { value: 2, message: 'Au moins 2 caractères.' } })} />
        <FormInput label="Téléphone" type="tel" autoComplete="tel" placeholder="+228 90 00 00 00" error={errors.phone?.message} {...register('phone', { required: 'Indiquez un numéro de téléphone.', pattern: { value: PHONE_RE, message: 'Numéro invalide : 8 à 15 chiffres, avec ou sans indicatif (+228).' } })} />
      </div>
      <Controller control={control} name="photo" rules={{ required: 'Ajoutez une photo pour votre candidature.' }}
        render={({ field, fieldState }) => <PhotoUpload label="Photo" value={field.value} onChange={field.onChange} error={fieldState.error?.message} />} />
      <DemoNotice />
      <Button type="submit" variant="wine" size="lg" loading={isSubmitting} className="justify-self-start">{isSubmitting ? 'Envoi en cours…' : 'Envoyer ma candidature'}</Button>
    </form>
  )
}

export default function TemAliyaKozoh() {
  usePageTitle('Tem Aliya Kozoh', 'Le défilé de beauté en tenue traditionnelle pour les filles, dans le cadre d’Adossa-Gadao.')
  const candidates = useResource(getCandidates)

  return (
    <>
      <HeroSection tone="wine" title="Tem Aliya Kozoh"
        description="Le défilé de beauté en tenue traditionnelle pour les filles, dans le cadre d’Adossa-Gadao."
        art={<ImagePlaceholder src={IMAGES.aliyaHero} tone="bark" kind="photo" label="Photo du défilé à fournir" />}
        actions={<Button href="#inscription" variant="light" size="lg" icon={Crown}>Déposer ma candidature</Button>} />

      <section className="bg-cream py-16 sm:py-20" aria-labelledby="reglement">
        <div className="container-x">
          <SectionTitle id="reglement" title="Règlement et calendrier" />
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal><Card accent hover={false} className="h-full p-7">
              <ScrollText className="text-wine" size={28} /><h3 className="mt-3 text-3xl">Règlement</h3>
              <p className="mt-3 text-sm text-bark/75">Le règlement du concours sera publié ici dès sa validation.</p>
              <div className="mt-4"><ToProvide>À rédiger par le comité</ToProvide></div>
            </Card></Reveal>
            <Reveal delay={0.1}><Card accent hover={false} className="h-full p-7">
              <CalendarClock className="text-wine" size={28} /><h3 className="mt-3 text-3xl">Calendrier</h3>
              <dl className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-sand pb-3"><dt className="font-bold">Date du défilé</dt><dd><ToProvide /></dd></div>
                <div className="flex items-center justify-between gap-3"><dt className="font-bold">Clôture des inscriptions</dt><dd><ToProvide /></dd></div>
              </dl>
            </Card></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="candidates">
        <div className="container-x">
          <SectionTitle id="candidates" title="Les candidates" />
          <AsyncView status={candidates.status} error={candidates.error} reload={candidates.reload}
            empty={<EmptyState icon={UserRound} title="Les candidates seront présentées ici" text="Aucune candidate n’est encore publiée. Revenez après la clôture des inscriptions." />}>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {candidates.data?.map((c, i) => (
                <Reveal as="li" key={c.id} delay={i * 0.08}>
                  <Card className="overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden"><div className="h-full w-full transition-transform duration-700 group-hover:scale-110"><ImagePlaceholder src={c.photo} tone={c.tone} label="Photo" /></div></div>
                    <div className="border-t-4 border-wine p-4"><h3 className="text-2xl">{c.name}</h3><p className="mt-1 text-xs text-bark/65">{c.info}</p></div>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </AsyncView>
        </div>
      </section>

      <section id="inscription" className="scroll-mt-20 bg-sand/50 py-16 sm:py-20" aria-labelledby="form-title">
        <div className="container-x max-w-3xl">
          <SectionTitle id="form-title" title="Inscription" subtitle="Remplissez le formulaire pour envoyer votre candidature au comité." />
          <Reveal><div className="bg-white p-6 shadow-lg shadow-bark/10 sm:p-8"><CandidatureForm /></div></Reveal>
        </div>
      </section>
    </>
  )
}
