import {
  UpdateUserInfoType,
  updateUserInfo,
} from '@/client/supabase/queries/userInfo'
import { useProtectedAuth } from '@/context/AuthContext'
import { getUseUserInfoQueryKey } from '@/context/UserInfoContext'
import { sexSchema } from '@/design-system/forms/SexSelectionFormInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

type useUpdateProfileParams = {
  onSuccess?: () => void
  onError?: () => void
}

export function useUpdateProfile({
  onSuccess,
  onError,
}: useUpdateProfileParams) {
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
      onSuccess?.()
      queryClient.invalidateQueries({
        queryKey: getUseUserInfoQueryKey(user),
      })
    },
    onError,
  })
}

// Forms
export const UpdateProfileFormSchema = z.object({
  name: z.string().min(1),
  sex: sexSchema,
  address: z.string().min(1),
})

export type UpdateProfileFormValues = z.infer<typeof UpdateProfileFormSchema>
