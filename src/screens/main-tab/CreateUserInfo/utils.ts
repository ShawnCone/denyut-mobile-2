import { createUserInfo } from '@/client/supabase/queries/userInfo'
import { useProtectedAuth } from '@/context/AuthContext'
import { getUseUserInfoQueryKey } from '@/context/UserInfoContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

type useCreateUserInfoParams = {
  onSuccess?: () => void
  onError?: () => void
}

// Maybe this should be in the client folder?
export function useCreateUserInfo({
  onSuccess,
  onError,
}: useCreateUserInfoParams) {
  const queryClient = useQueryClient()
  const { user } = useProtectedAuth()
  return useMutation({
    mutationFn: createUserInfo,
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
export const SEX_OPTIONS = ['male', 'female'] as const
export const sexSchema = z.enum(SEX_OPTIONS)

export const createProfileFormSchema = z.object({
  name: z.string().min(1),
  sex: sexSchema,
  address: z.string().min(1),
})

export type CreateProfileFormValues = z.infer<typeof createProfileFormSchema>
