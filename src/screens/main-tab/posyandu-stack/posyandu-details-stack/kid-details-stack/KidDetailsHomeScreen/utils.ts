import { getKidGrowthRecordList } from '@/client/supabase/queries/growth-record'
import { deleteKidProfile } from '@/client/supabase/queries/kid-info'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

function getGrowthHistoryQueryKey(kidId: string) {
  return ['growth-history', kidId]
}

export function useGetGrowthHistoryQuery(kidId: string) {
  return useQuery({
    queryKey: getGrowthHistoryQueryKey(kidId),
    queryFn: () => getKidGrowthRecordList({ kidId }),
  })
}
