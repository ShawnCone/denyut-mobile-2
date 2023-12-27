import {
  addNewGrowthRecord,
  getLatestGrowthRecord,
} from '@/client/supabase/queries/growth-record'
import { useKidInfoContext } from '@/context/KidInfoContext'
import {
  denyutNumberSchema,
  optionalDenyutNumberSchema,
} from '@/utils/customZodSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getGrowthHistoryQueryKey } from '../utils'

// Queries and mutations
export function useCreateGrowthRecordMutation({
  onSuccess,
}: {
  onSuccess: (recordId: string) => void
}) {
  const { kidInfo } = useKidInfoContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addNewGrowthRecord,
    onSuccess: data => {
      // Invalidate growth record list query
      queryClient.invalidateQueries({
        queryKey: getGrowthHistoryQueryKey(kidInfo.id),
      })
      onSuccess(data)
    },
  })
}

function getLatestGrowthRecordQueryKey(kidId: string) {
  return ['most-recent-growth-record', kidId]
}

export function useGetLatestGrowthRecordQuery({ kidId }: { kidId: string }) {
  return useQuery({
    queryKey: getLatestGrowthRecordQueryKey(kidId),
    queryFn: () => getLatestGrowthRecord({ kidId }),
  })
}

// Form
const createGrowthRecordFormSchema = z.object({
  weight: denyutNumberSchema,
  height: denyutNumberSchema,
  headCirc: optionalDenyutNumberSchema,
  armCirc: optionalDenyutNumberSchema,
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
