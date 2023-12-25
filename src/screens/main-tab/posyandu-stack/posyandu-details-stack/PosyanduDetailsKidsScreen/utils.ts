import { getPosyanduKids } from '@/client/supabase/queries/kid-info'
import { useQuery } from '@tanstack/react-query'

function getPosyanduKidsQueryKey(posyanduId: string) {
  return ['getPosyanduKids', posyanduId]
}

export function useGetPosyanduKidsQuery({
  posyanduId,
}: {
  posyanduId: string
}) {
  return useQuery({
    queryKey: getPosyanduKidsQueryKey(posyanduId),
    queryFn: () => getPosyanduKids({ posyanduId }),
  })
}
