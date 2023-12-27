import { addNewGrowthRecord } from '@/client/supabase/queries/growth-record'
import { denyutNumberSchema } from '@/utils/customZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Queries and mutations
export function useCreateGrowthRecordMutation({
  onSuccess,
}: {
  onSuccess: (recordId: string) => void
}) {
  return useMutation({
    mutationFn: addNewGrowthRecord,
    onSuccess: data => {
      // Invalidate growth record list query
      onSuccess(data)
    },
  })
}

// Form
const createGrowthRecordFormSchema = z.object({
  weight: denyutNumberSchema(),
  height: denyutNumberSchema(),
  headCirc: denyutNumberSchema(),
  armCirc: denyutNumberSchema(true),
  outpostRecordMonthIdx: z.number(),
  outpostRecordYear: z.number(),
  measurementDate: z.date(),
})

export type CreateGrowthRecordFormValues = z.infer<
  typeof createGrowthRecordFormSchema
>

export function useCreateGrowthRecordForm() {
  return useForm<CreateGrowthRecordFormValues>({
    resolver: zodResolver(createGrowthRecordFormSchema),
    defaultValues: {
      outpostRecordMonthIdx: new Date().getMonth(),
      outpostRecordYear: new Date().getFullYear(),
      measurementDate: new Date(),
    },
  })
}
