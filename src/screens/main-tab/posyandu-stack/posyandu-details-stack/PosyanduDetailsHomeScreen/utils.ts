import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import { removeMemberFromPosyandu } from '@/client/supabase/queries/posyandu-members'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateUserIdPosyanduListQueryKey } from '../../PosyanduHome/utils'

export function formatPosyanduInfoLocation(posyanduInfo: PosyanduInfo) {
  return `${posyanduInfo.rw ? `RW ${posyanduInfo.rw},` : ''} ${
    posyanduInfo.kelurahan ? `${posyanduInfo.kelurahan},` : ''
  } ${posyanduInfo.kecamatan ? `${posyanduInfo.kecamatan},` : ''} ${
    posyanduInfo.city
  }, ${posyanduInfo.province}`
}

type useLeavePosyanduParams = {
  onSuccess: () => void
}

export function useLeavePosyanduMutation({
  onSuccess,
}: useLeavePosyanduParams) {
  const { user } = useProtectedAuthContext()
  const { posyanduInfo } = usePosyanduInfoContext()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () =>
      removeMemberFromPosyandu({
        userId: user.id,
        posyanduId: posyanduInfo.id,
      }),
    onSuccess: () => {
      // Invalidate cache for posyandu list
      queryClient.invalidateQueries({
        queryKey: generateUserIdPosyanduListQueryKey(user.id),
      })
      onSuccess()
    },
  })
}
