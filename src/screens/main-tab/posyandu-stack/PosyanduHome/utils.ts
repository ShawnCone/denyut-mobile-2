import { getUserPosyanduList } from '@/client/supabase/queries/posyandu'
import { useQuery } from '@tanstack/react-query'

// Query function to get list of posyandu of a user
function generateUserIdPosyanduListQueryKey(userId: string) {
  return ['user', userId, 'posyandu-list']
}

export function useUserPosyanduListQuery(userId: string) {
  const queryKey = generateUserIdPosyanduListQueryKey(userId)
  return useQuery({
    queryKey,
    queryFn: () => getUserPosyanduList({ userId }),
  })
}
