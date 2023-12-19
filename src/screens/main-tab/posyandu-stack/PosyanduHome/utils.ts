import { getUserPosyanduList } from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { useQuery } from '@tanstack/react-query'

// Query function to get list of posyandu of a user
function generateUserIdPosyanduListQueryKey(userId: string) {
  return ['user', userId, 'posyandu-list']
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
