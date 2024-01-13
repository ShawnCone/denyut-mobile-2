import { SingleMonthGrowthData } from '@/client/denyut-posyandu-be/__generated__/graphql'
import { sexSchemaType } from '@/design-system/forms/SexSelectionFormInput'
import { tokens } from '@/design-system/tokens/tokens'

export function getSexGraphColor(inSex: sexSchemaType): {
  dark: string
  light: string
} {
  switch (inSex) {
    case 'male':
      return {
        dark: '#0097D7',
        light: '#80CBEB',
      }
    case 'female':
      return {
        dark: '#E47DB2',
        light: '#F2BED8',
      }
  }
}

export type GraphSDType = Extract<
  keyof SingleMonthGrowthData,
  'SD0' | 'SD1' | 'SD1neg' | 'SD2' | 'SD2neg' | 'SD3' | 'SD3neg'
>

export function getLineColorForStandardCurves(inCurveMode: GraphSDType) {
  if (inCurveMode === 'SD3' || inCurveMode === 'SD3neg') {
    return tokens.colors.destructive.normal
  }

  if (inCurveMode === 'SD2' || inCurveMode === 'SD2neg') {
    return tokens.colors.warning.normal
  }

  if (inCurveMode === 'SD1' || inCurveMode === 'SD1neg') {
    return tokens.colors.primary.normal
  }
  return tokens.colors.neutral.normal
}
