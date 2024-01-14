import { editGrowthRecord } from '@/client/supabase/queries/growth-record'
import {
  denyutNumberSchema,
  optionalDenyutNumberSchema,
} from '@/utils/customZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getGrowthDetailsQueryKey, useGrowthDetailsContext } from '../utils'

export function useEditGrowthRecordMutation({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editGrowthRecord,
    onSuccess: (_data, { recordId }) => {
      queryClient.invalidateQueries({
        queryKey: getGrowthDetailsQueryKey(recordId),
      })
      onSuccess?.()
    },
  })
}

// Form
const editGrowthDetailsFormSchema = z.object({
  weight: denyutNumberSchema,
  height: denyutNumberSchema,
  headCirc: optionalDenyutNumberSchema,
  armCirc: optionalDenyutNumberSchema,
  outpostRecordMonthIdx: z.number(),
  outpostRecordYear: z.number(),
  measurementDate: z.date(),
})

export type EditGrowthDetailsFormValues = z.infer<
  typeof editGrowthDetailsFormSchema
>

export function useEditGrowthDetailsForm() {
  const { growthDetails } = useGrowthDetailsContext()

  return useForm<EditGrowthDetailsFormValues>({
    resolver: zodResolver(editGrowthDetailsFormSchema),
    defaultValues: {
      weight: growthDetails.weight,
      height: growthDetails.height,
      headCirc: growthDetails.headCirc ?? undefined,
      armCirc: growthDetails.armCirc ?? undefined,
      outpostRecordMonthIdx: growthDetails.outpostRecordMonthIdx,
      outpostRecordYear: growthDetails.outpostRecordYear,
      measurementDate: new Date(growthDetails.measurementDate),
    },
  })
}
