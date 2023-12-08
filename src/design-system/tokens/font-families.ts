import { z } from 'zod'

const fontFamiliesNames = [
  'Lato-thin',
  'Lato-light',
  'Lato-lightItalic',
  'Lato-regular',
  'Lato-regularItalic',
  'Lato-bold',
  'Lato-boldItalic',
] as const

const fontFamilyZodSchema = z.enum(fontFamiliesNames)
// Using zod, for now, but can be changed later if necessary
export const fontFamilyNameEnum = fontFamilyZodSchema.Values
export type fontFamilyNameType = z.infer<typeof fontFamilyZodSchema>

export const fontFamilies: Record<fontFamilyNameType, any> = {
  'Lato-thin': require('../../../assets/fonts/Lato-Thin.ttf'),
  'Lato-light': require('../../../assets/fonts/Lato-Light.ttf'),
  'Lato-lightItalic': require('../../../assets/fonts/Lato-LightItalic.ttf'),
  'Lato-regular': require('../../../assets/fonts/Lato-Regular.ttf'),
  'Lato-regularItalic': require('../../../assets/fonts/Lato-Italic.ttf'),
  'Lato-bold': require('../../../assets/fonts/Lato-Bold.ttf'),
  'Lato-boldItalic': require('../../../assets/fonts/Lato-BoldItalic.ttf'),
} as const
