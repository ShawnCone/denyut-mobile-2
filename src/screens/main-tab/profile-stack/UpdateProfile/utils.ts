import {
  UpdateUserInfoType,
  updateUserInfo,
} from '@/client/supabase/queries/userInfo'
import {
  deleteAvatar,
  getAvatarStoragePathFromId,
  uploadAvatar,
} from '@/client/supabase/storage/avatar'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { getUseUserInfoQueryKey } from '@/context/UserInfoContext'
import { sexSchema } from '@/design-system/forms/SexSelectionFormInput'
import { CANNOT_BE_EMPTY } from '@/forms/error-messages'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

// string value for deleted avatar
export const DELETED_AVATAR_PLACEHOLDER_VALUE = 'deleted-avatar-placeholder'

type useUpdateProfileParams = {
  onSuccess?: () => void
  onError?: () => void
}

export function useUpdateProfileMutation({
  onSuccess,
  onError,
}: useUpdateProfileParams) {
  const { user } = useProtectedAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      newUserInfo,
      localAvatarUri,
    }: {
      newUserInfo: UpdateUserInfoType
      localAvatarUri?: string
    }) => {
      // Upload avatar
      if (localAvatarUri) {
        if (localAvatarUri === DELETED_AVATAR_PLACEHOLDER_VALUE) {
          // Delete avatar if applicable
          try {
            await deleteAvatar({
              avatarType: 'user',
              storagePath: getAvatarStoragePathFromId({
                id: user.id,
              }),
            })
          } catch {
            console.error('Unable to delete avatar, but ignored')
          }
        } else {
          await uploadAvatar({
            avatarType: 'user',
            id: user.id,
            localImageUri: localAvatarUri,
          })
        }
      }
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
  localAvatarUri: z.string().optional(),
})

export type UpdateProfileFormValues = z.infer<typeof UpdateProfileFormSchema>
