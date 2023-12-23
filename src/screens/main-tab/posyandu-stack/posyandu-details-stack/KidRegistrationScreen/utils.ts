import { registerNewKid } from '@/client/supabase/queries/kid-info'
import { sexSchema } from '@/design-system/forms/SexSelectionFormInput'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export function useRegisterKidMutation({
  onSuccess,
}: {
  onSuccess: (newKidId: string) => void
}) {
  return useMutation({
    mutationFn: registerNewKid,
    onSuccess: data => {
      // Invalidate cache for posyandy kid list (Not yet implemented)
      // Invalidate cache for get kid info
      onSuccess(data)
    },
  })
}

// Forms
export const kidRegistrationFormSchema = z.object({
  name: z.string().min(1),
  sex: sexSchema,
  birthCity: z.string().min(1),
  birthProvince: z.string().min(1),
  dateOfBirth: z.date(),
})

export type KidRegistrationFormValues = z.infer<
  typeof kidRegistrationFormSchema
>
