import { deleteKidProfile } from '@/client/supabase/queries/kid-info'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosyanduKidsQueryKey } from '../../PosyanduDetailsKidsScreen/utils'

type DeleteKidProfileParams = {
  onSuccess: () => void
}

export function useDeleteKidProfileMutation({
  onSuccess,
}: DeleteKidProfileParams) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteKidProfile,
    onSuccess: () => {
      // Invalidate posyandu kids query
      queryClient.invalidateQueries({
        queryKey: getPosyanduKidsQueryKey(),
      })

      onSuccess()
    },
  })
}
