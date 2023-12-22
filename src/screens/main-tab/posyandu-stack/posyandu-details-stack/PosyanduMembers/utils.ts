import {
  getPosyanduMembers,
  getUserIsPosyanduAdmin,
} from '@/client/supabase/queries/posyandu-members'
import { useQuery } from '@tanstack/react-query'

export function usePosyanduMembersQuery(posyanduId: string) {
  return useQuery({
    queryKey: ['posyandu-members', posyanduId],
    queryFn: () => getPosyanduMembers(posyanduId),
  })
}

export function useUserIsPosyanduAdminQuery(
  posyanduId: string,
  userId: string,
) {
  return useQuery({
    queryKey: ['user-is-posyandu-admin', posyanduId, userId],
    queryFn: () => getUserIsPosyanduAdmin({ posyanduId, userId }),
  })
}
