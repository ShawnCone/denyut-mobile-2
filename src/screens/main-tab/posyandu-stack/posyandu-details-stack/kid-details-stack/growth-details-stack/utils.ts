import { getGrowthRecordDetails } from '@/client/supabase/queries/growth-record'
import { useQuery } from '@tanstack/react-query'

export function getGrowthDetailsQueryKey(recordId: string) {
  return ['growth-record', recordId]
}

export function useGrowthDetailsQuery(recordId: string) {
  return useQuery({
    queryKey: getGrowthDetailsQueryKey(recordId),
    queryFn: () => getGrowthRecordDetails({ recordId }),
  })
}
