import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Charge une ressource asynchrone et expose les états : loading | success | error | empty.
 * `setData` permet des mises à jour locales (optimistes) de l'interface.
 */
export function useResource(fetcher) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const fetchRef = useRef(fetcher)
  fetchRef.current = fetcher

  const load = useCallback(() => {
    let alive = true
    setStatus('loading')
    fetchRef.current()
      .then((res) => {
        if (!alive) return
        setData(res)
        setStatus(Array.isArray(res) && res.length === 0 ? 'empty' : 'success')
      })
      .catch((e) => {
        if (!alive) return
        setError(e)
        setStatus('error')
      })
    return () => { alive = false }
  }, [])

  useEffect(() => load(), [load])

  const set = useCallback((next) => {
    setData((prev) => {
      const value = typeof next === 'function' ? next(prev) : next
      setStatus(Array.isArray(value) && value.length === 0 ? 'empty' : 'success')
      return value
    })
  }, [])

  return { data, setData: set, status, error, reload: load }
}
