import { useEffect } from 'react'

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ADOSSA-GADAO` : 'ADOSSA-GADAO · Fête traditionnelle Tem'
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
