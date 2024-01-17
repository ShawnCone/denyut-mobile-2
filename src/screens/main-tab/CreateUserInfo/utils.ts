import {
  CreateUserInfoType,
  createUserInfo,
} from '@/client/supabase/queries/userInfo'
import { uploadAvatar } from '@/client/supabase/storage/avatar'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { getUseUserInfoQueryKey } from '@/context/UserInfoContext'
import { sexSchema } from '@/design-system/forms/SexSelectionFormInput'
import { CANNOT_BE_EMPTY } from '@/forms/error-messages'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { DELETED_AVATAR_PLACEHOLDER_VALUE } from '../profile-stack/UpdateProfile/utils'

type useCreateUserInfoParams = {
  onSuccess?: () => void
  onError?: () => void
}

// Maybe this should be in the client folder?
export function useCreateUserInfoMutation({
  onSuccess,
  onError,
}: useCreateUserInfoParams) {
  const queryClient = useQueryClient()
  const { user } = useProtectedAuthContext()
  return useMutation({
    mutationFn: async ({
      newUserInfo,
      localAvatarUri,
    }: {
      newUserInfo: CreateUserInfoType
      localAvatarUri?: string
    }) => {
      if (
        localAvatarUri &&
        localAvatarUri !== DELETED_AVATAR_PLACEHOLDER_VALUE
      ) {
        uploadAvatar({
          avatarType: 'user',
          id: user.id,
          localImageUri: localAvatarUri,
        })
      }

      createUserInfo(newUserInfo)
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
export const createProfileFormSchema = z.object({
  name: z.string().min(1, {
    message: CANNOT_BE_EMPTY,
  }),
  sex: sexSchema,
  address: z.string().min(1),
  localAvatarUri: z.string().optional(),
})

export type CreateProfileFormValues = z.infer<typeof createProfileFormSchema>
