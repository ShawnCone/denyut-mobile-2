import { searchPosyandu } from '@/client/supabase/queries/posyandu'
import { useQuery } from '@tanstack/react-query'

export function usePosyanduSearch(keyword: string) {
  return useQuery({
    queryKey: ['posyandu-search', keyword],
    queryFn: () => searchPosyandu({ keyword }),
    gcTime: 0, // Always search for new one every time, no caching (Might change this later)
  })
}
