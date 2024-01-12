import {
  GrowthInterpretationSeverity,
  GrowthType,
} from '@/client/denyut-posyandu-be/__generated__/graphql'
import { getGrowthInterpretation } from '@/client/denyut-posyandu-be/queries/get-growth-interpretation'
import { Database } from '@/client/supabase/types'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { tokens } from '@/design-system/tokens/tokens'
import { useQuery } from '@tanstack/react-query'
import { useGrowthDetailsContext } from '../../utils'

export type GrowthMeasurementTypes = keyof Pick<
  Database['public']['Tables']['KidBodilyGrowth']['Row'],
  'weight' | 'height' | 'headCirc' | 'armCirc'
>

export const PAGER_VIEW_NAMES: GrowthMeasurementTypes[] = [
  'weight',
  'height',
  'headCirc',
  'armCirc',
]

export function getGrowthMeasurementTypeLabel(
  inValue: GrowthMeasurementTypes,
): string {
  switch (inValue) {
    case 'weight':
      return 'Berat Badan'
    case 'height':
      return 'Tinggi Badan'
    case 'headCirc':
      return 'Lingkar Kepala'
    case 'armCirc':
      return 'Lingkar Lengan'
  }
}

export function getGrowthMeasurementTypeUnit(
  inValue: GrowthMeasurementTypes,
): string {
  switch (inValue) {
    case 'weight':
      return 'kg'
    case 'height':
      return 'cm'
    case 'headCirc':
      return 'cm'
    case 'armCirc':
      return 'cm'
  }
}

function getPosyanduBEGrowhtTypeFromGrowthMeasurementTypes(
  inValue: GrowthMeasurementTypes,
): GrowthType {
  switch (inValue) {
    case 'weight':
      return GrowthType.Weight
    case 'height':
      return GrowthType.Height
    case 'headCirc':
      return GrowthType.Headcirc
    case 'armCirc':
      return GrowthType.Armcirc
  }
}

function getGrowthInterpretationQueryKey(
  inRecordId: string,
  inGrowthType: GrowthType,
) {
  return ['growthInterpretation', inRecordId, inGrowthType]
}

export function useGrowthInterpretation(
  inMeasurementType: GrowthMeasurementTypes,
) {
  const {
    session: { access_token: authToken },
  } = useProtectedAuthContext()

  const growthType =
    getPosyanduBEGrowhtTypeFromGrowthMeasurementTypes(inMeasurementType)

  const {
    growthDetails: { recordId },
  } = useGrowthDetailsContext()

  return useQuery({
    queryKey: getGrowthInterpretationQueryKey(recordId, growthType),
    queryFn: () => {
      return getGrowthInterpretation({
        authToken,
        recordId,
        growthType,
      })
    },
  })
}

export function getInterpretationSource(
  inMeasurementType: GrowthMeasurementTypes,
) {
  if (inMeasurementType === 'weight') return 'KMS'

  return 'WHO'
}

export function getSeverityStyle(severity: GrowthInterpretationSeverity): {
  backgroundColor: string
  color: string
} {
  switch (severity) {
    case GrowthInterpretationSeverity.Normal:
      return {
        backgroundColor: tokens.colors.primary.extraLight,
        color: tokens.colors.primary.dark,
      }
    case GrowthInterpretationSeverity.Warning:
      return {
        backgroundColor: tokens.colors.warning.extraLight,
        color: tokens.colors.warning.dark,
      }
    case GrowthInterpretationSeverity.Severe:
      return {
        backgroundColor: tokens.colors.destructive.extraLight,
        color: tokens.colors.destructive.dark,
      }
  }
}
