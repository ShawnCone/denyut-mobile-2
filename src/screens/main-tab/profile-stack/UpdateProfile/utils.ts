import {
  UpdateUserInfoType,
  updateUserInfo,
} from '@/client/supabase/queries/userInfo'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { getUseUserInfoQueryKey } from '@/context/UserInfoContext'
import { sexSchema } from '@/design-system/forms/SexSelectionFormInput'
import { CANNOT_BE_EMPTY } from '@/forms/error-messages'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

type useUpdateProfileParams = {
  onSuccess?: () => void
  onError?: () => void
}

export function useUpdateProfileQuery({
  onSuccess,
  onError,
}: useUpdateProfileParams) {
  const { user } = useProtectedAuthContext()
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
  name: z.string().min(1, { message: CANNOT_BE_EMPTY }),
  sex: sexSchema,
  address: z.string().min(1, {
    message: CANNOT_BE_EMPTY,
  }),
})

export type UpdateProfileFormValues = z.infer<typeof UpdateProfileFormSchema>
