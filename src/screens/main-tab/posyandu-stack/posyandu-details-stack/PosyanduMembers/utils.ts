import {
  acceptUserToPosyandu,
  getPosyanduMembers,
  getUserIsPosyanduAdmin,
  removeMemberFromPosyandu,
} from '@/client/supabase/queries/posyandu-members'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function generatePosyanduMembersQueryKey(posyanduId: string) {
  return ['posyandu-members', posyanduId]
}

export function usePosyanduMembersQuery(posyanduId: string) {
  return useQuery({
    queryKey: generatePosyanduMembersQueryKey(posyanduId),
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

export function useKickRejectUserFromPosyanduMutation({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeMemberFromPosyandu,
    onSuccess: (_, { posyanduId }) => {
      // Invalidate posyandu members query
      queryClient.invalidateQueries({
        queryKey: generatePosyanduMembersQueryKey(posyanduId),
      })
      onSuccess?.()
    },
  })
}

export function useAcceptUserToPosyanduMutation({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: acceptUserToPosyandu,
    onSuccess: (_, { posyanduId }) => {
      // Invalidate posyandu members query
      queryClient.invalidateQueries({
        queryKey: generatePosyanduMembersQueryKey(posyanduId),
      })
      onSuccess?.()
    },
  })
}
