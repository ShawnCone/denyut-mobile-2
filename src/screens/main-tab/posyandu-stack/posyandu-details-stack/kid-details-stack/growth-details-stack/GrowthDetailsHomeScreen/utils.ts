import { deleteGrowthRecord } from '@/client/supabase/queries/growth-record'
import { useKidInfoContext } from '@/context/KidInfoContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getGrowthHistoryQueryKey } from '../../KidDetailsHomeScreen/utils'

export function useDeleteGrowthDetailsMutation({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const queryClient = useQueryClient()
  const { kidInfo } = useKidInfoContext()

  return useMutation({
    mutationFn: deleteGrowthRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getGrowthHistoryQueryKey(kidInfo.id),
      })
      onSuccess()
    },
  })
}
