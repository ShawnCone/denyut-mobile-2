import {
  joinPosyandu,
  searchPosyandu,
} from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const POSYANDU_SEARCH_QUERY_KEY = 'posyandu-search'

export function usePosyanduSearchQuery(keyword: string) {
  const { user } = useProtectedAuthContext()

  return useQuery({
    queryKey: [POSYANDU_SEARCH_QUERY_KEY, keyword],
    queryFn: () => searchPosyandu({ keyword, userId: user.id }),
    gcTime: 0, // Always search for new one every time, no caching (Might change this later)
  })
}

type useJoinPosyanduParams = {
  onError?: (error: Error) => void
  onSuccess?: () => void
}
export function useJoinPosyandu({ onSuccess, onError }: useJoinPosyanduParams) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: joinPosyandu,
    onError,
    onSuccess: () => {
      onSuccess?.()
      queryClient.invalidateQueries({
        queryKey: [POSYANDU_SEARCH_QUERY_KEY],
      })
    },
  })
}
