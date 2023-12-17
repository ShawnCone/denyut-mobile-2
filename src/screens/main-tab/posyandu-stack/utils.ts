import { getPosyanduInfo } from '@/client/supabase/queries/posyandu'
import { useQuery } from '@tanstack/react-query'

export function usePosyanduInfo(posyanduId: string) {
  return useQuery({
    queryKey: ['posyandu-info', posyanduId],
    queryFn: () => getPosyanduInfo({ posyanduId }),
  })
}
