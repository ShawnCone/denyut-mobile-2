import { getUserPosyanduList } from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { useQuery } from '@tanstack/react-query'

export const USER_POSYANDU_LIST_QUERY_KEY = 'user-posyandu-list'

// Query function to get list of posyandu of a user
export function generateUserIdPosyanduListQueryKey(userId: string) {
  return [USER_POSYANDU_LIST_QUERY_KEY, userId]
}

export function useUserPosyanduListQuery() {
  const {
    user: { id: userId },
  } = useProtectedAuthContext()

  const queryKey = generateUserIdPosyanduListQueryKey(userId)
  return useQuery({
    queryKey,
    queryFn: () => getUserPosyanduList({ userId }),
  })
}
