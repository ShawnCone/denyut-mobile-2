import {
  joinPosyandu,
  searchPosyandu,
} from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { USER_POSYANDU_LIST_QUERY_KEY } from '../PosyanduHome/utils'

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
  posyanduId: string
}

const JOIN_POSYANDU_MUTATION_KEY = 'join-posyandu'

export function useJoinPosyandu({
  onSuccess,
  onError,
  posyanduId,
}: useJoinPosyanduParams) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [JOIN_POSYANDU_MUTATION_KEY, posyanduId],
    mutationFn: joinPosyandu,
    onError,
    onSuccess: () => {
      onSuccess?.()
      queryClient.invalidateQueries({
        queryKey: [POSYANDU_SEARCH_QUERY_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [USER_POSYANDU_LIST_QUERY_KEY],
      })
    },
  })
}
