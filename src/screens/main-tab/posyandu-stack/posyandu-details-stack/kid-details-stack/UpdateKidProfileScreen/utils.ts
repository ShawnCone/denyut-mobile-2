import { updateKidProfile } from '@/client/supabase/queries/kid-info'
import { useKidInfoContext } from '@/context/KidInfoContext'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import { sexSchema } from '@/design-system/forms/SexSelectionFormInput'
import { CANNOT_BE_EMPTY } from '@/forms/error-messages'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getPosyanduKidsQueryKey } from '../../PosyanduDetailsKidsScreen/utils'
import { getKidInfoQueryKey } from '../utils'

// Mutation
export function useUpdateKidProfileMutation({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const queryClient = useQueryClient()

  const { posyanduInfo } = usePosyanduInfoContext()

  return useMutation({
    mutationFn: updateKidProfile,
    onSuccess: data => {
      // Invalidate cache for get kid info
      queryClient.invalidateQueries({
        queryKey: getKidInfoQueryKey(data),
      })

      // Invalidate cache for posyandu kids
      queryClient.invalidateQueries({
        queryKey: getPosyanduKidsQueryKey(posyanduInfo.id),
      })

      onSuccess()
    },
  })
}

// Form
const updateKidProfileFormSchema = z.object({
  name: z.string().min(1, {
    message: CANNOT_BE_EMPTY,
  }),
  sex: sexSchema,
  birthCity: z.string().min(1, {
    message: CANNOT_BE_EMPTY,
  }),
  birthProvince: z.string().min(1, {
    message: CANNOT_BE_EMPTY,
  }),
  dateOfBirth: z.date(),
})

export type UpdateKidProfileFormValues = z.infer<
  typeof updateKidProfileFormSchema
>

export function useUpdateKidProfileForm() {
  const { kidInfo } = useKidInfoContext()

  return useForm<UpdateKidProfileFormValues>({
    resolver: zodResolver(updateKidProfileFormSchema),
    defaultValues: {
      name: kidInfo.name,
      sex: kidInfo.sex,
      birthCity: kidInfo.birthCity,
      birthProvince: kidInfo.birthProvince,
      dateOfBirth: new Date(kidInfo.dateOfBirth),
    },
  })
}
