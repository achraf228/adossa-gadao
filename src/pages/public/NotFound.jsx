import HeroSection from '../../components/layout/HeroSection'
import Button from '../../components/common/Button'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page introuvable')
  return (
    <HeroSection tone="bark" eyebrow="Erreur 404" title="Page introuvable" description="Cette page n’existe pas ou a été déplacée. Revenez à l’accueil ou explorez la culture Tem."
      actions={<><Button to="/" size="lg">Retour à l’accueil</Button><Button to="/culture" variant="outline" size="lg">Découvrir la culture Tem</Button></>} />
  )
}
