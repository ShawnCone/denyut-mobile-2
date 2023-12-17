import {
  joinPosyandu,
  searchPosyandu,
} from '@/client/supabase/queries/posyandu-info'
import { useMutation, useQuery } from '@tanstack/react-query'

export function usePosyanduSearchQuery(keyword: string) {
  return useQuery({
    queryKey: ['posyandu-search', keyword],
    queryFn: () => searchPosyandu({ keyword }),
    gcTime: 0, // Always search for new one every time, no caching (Might change this later)
  })
}

type useJoinPosyanduParams = {
  onError?: (error: Error) => void
  onSuccess?: () => void
}
export function useJoinPosyandu({ onSuccess, onError }: useJoinPosyanduParams) {
  return useMutation({
    mutationFn: joinPosyandu,
    onError,
    onSuccess,
  })
}
