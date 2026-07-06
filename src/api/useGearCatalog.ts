import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useGearStore } from '@/store/useGearStore'
import { fetchGearList } from '@/api/gearApi'

export function useGearCatalog() {
  const { setGearList, setLoading, setError } = useGearStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['gearList'],
    queryFn: fetchGearList,
  })

  useEffect(() => {
    if (data) {
      setGearList(data)
    }
  }, [data, setGearList])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    if (error) {
      setError(error.message)
    } else {
      setError(null)
    }
  }, [error, setError])

  return { isLoading, error }
}
