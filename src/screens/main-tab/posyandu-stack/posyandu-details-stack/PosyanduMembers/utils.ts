import { getPosyanduMembers } from '@/client/supabase/queries/posyandu-members'
import { useQuery } from '@tanstack/react-query'

export function usePosyanduMembersQuery(posyanduId: string) {
  return useQuery({
    queryKey: ['posyandu-members', posyanduId],
    queryFn: () => getPosyanduMembers(posyanduId),
  })
}
