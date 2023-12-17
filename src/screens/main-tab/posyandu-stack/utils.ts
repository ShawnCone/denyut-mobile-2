import { getPosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import { useQuery } from '@tanstack/react-query'

export function usePosyanduInfoQuery(posyanduId: string) {
  return useQuery({
    queryKey: ['posyandu-info', posyanduId],
    queryFn: () => getPosyanduInfo({ posyanduId }),
  })
}
