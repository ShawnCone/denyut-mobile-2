import {
  GrowthInterpretationSeverity,
  GrowthType,
} from '@/client/denyut-posyandu-be/__generated__/graphql'
import { getGrowthInterpretation } from '@/client/denyut-posyandu-be/queries/get-growth-interpretation'
import { getWeightEvaluation } from '@/client/denyut-posyandu-be/queries/get-weight-evaluation'

import { useProtectedAuthContext } from '@/context/AuthContext'
import { tokens } from '@/design-system/tokens/tokens'
import { useQuery } from '@tanstack/react-query'
import { GrowthMeasurementTypes, useGrowthDetailsContext } from '../../utils'

export const PAGER_VIEW_NAMES: GrowthMeasurementTypes[] = [
  'weight',
  'height',
  'headCirc',
  'armCirc',
]

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

// Converts supabase column -> graphql Enum
export function getPosyanduBEGrowthTypeFromGrowthMeasurementTypes(
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
    getPosyanduBEGrowthTypeFromGrowthMeasurementTypes(inMeasurementType)

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

function getWeightEvaluationQueryKey(inRecordId: string) {
  return ['weightEvaluation', inRecordId]
}

export function useWeightEvaluation() {
  const {
    session: { access_token: authToken },
  } = useProtectedAuthContext()

  const {
    growthDetails: { recordId },
  } = useGrowthDetailsContext()

  return useQuery({
    queryKey: getWeightEvaluationQueryKey(recordId),
    queryFn: () => {
      return getWeightEvaluation({
        authToken,
        recordId,
      })
    },
  })
}
