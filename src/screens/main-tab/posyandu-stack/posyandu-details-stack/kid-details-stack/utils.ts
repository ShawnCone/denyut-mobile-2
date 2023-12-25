import { getKidInfo } from '@/client/supabase/queries/kid-info'
import { useQuery } from '@tanstack/react-query'

export function getKidInfoQueryKey(kidId: string) {
  return ['kid-info', kidId]
}

export function useKidInfoQuery(kidId: string) {
  return useQuery({
    queryKey: getKidInfoQueryKey(kidId),
    queryFn: () => getKidInfo({ kidId }),
  })
}
