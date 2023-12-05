import {
  UpdateUserInfoType,
  updateUserInfo,
} from '@/client/supabase/queries/userInfo'
import { useProtectedAuth } from '@/context/AuthContext'
import { getUseUserInfoQueryKey } from '@/context/UserInfoContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

export function useUpdateProfile() {
  const { user } = useProtectedAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      newUserInfo,
    }: {
      newUserInfo: UpdateUserInfoType
    }) => {
      return updateUserInfo({ userIdToUpdate: user.id, newUserInfo })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseUserInfoQueryKey(user),
      })
    },
  })
}

// Forms
export const UpdateProfileFormSchema = z.object({
  name: z.string().min(1),
})

export type UpdateProfileFormValues = z.infer<typeof UpdateProfileFormSchema>
