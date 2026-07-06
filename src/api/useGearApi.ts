import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchGearList, fetchGearBySlug, submitBooking } from './gearApi'

export function useGearList() {
  return useQuery({
    queryKey: ['gearList'],
    queryFn: fetchGearList,
  })
}

export function useGearBySlug(slug: string) {
  return useQuery({
    queryKey: ['gear', slug],
    queryFn: () => fetchGearBySlug(slug),
    enabled: !!slug,
  })
}

export function useSubmitBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}
