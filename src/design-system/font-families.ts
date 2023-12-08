export const fontFamilies = {
  'Lato-thin': require('../../assets/fonts/Lato-Thin.ttf'),
  'Lato-light': require('../../assets/fonts/Lato-Light.ttf'),
  'Lato-lightItalic': require('../../assets/fonts/Lato-LightItalic.ttf'),
  'Lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
  'Lato-regularItalic': require('../../assets/fonts/Lato-Italic.ttf'),
  'Lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
  'Lato-boldItalic': require('../../assets/fonts/Lato-BoldItalic.ttf'),
}

export type FontFamiliesNames = keyof typeof fontFamilies

export const fontFamiliesNames = Object.keys(
  fontFamilies,
) as FontFamiliesNames[]
