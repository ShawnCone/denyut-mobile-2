import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { fontFamilyNameEnum, fontFamilyNameType } from './tokens/font-families'
import { fontSizing } from './tokens/font-sizing'

// Applies for paragraph and caption variants
type TypographyWeight = 'regular' | 'bold' | 'light'
type TypographyItalic = 'italic' | 'normal'
type TypographyStyling =
  | {
      weight: TypographyWeight
      italic?: TypographyItalic
    }
  | {
      weight?: TypographyWeight
      italic: TypographyItalic
    }
  | {
      weight: TypographyWeight
      italic: TypographyItalic
    }

export type TypographyVariants =
  | {
      size:
        | 'Heading1'
        | 'Heading2'
        | 'Heading3'
        | 'Heading4'
        | 'Heading5'
        | 'Heading6'
    }
  | {
      size: 'paragraph' | 'paragraphS' | 'caption' | 'captionS'
      textStyling?: TypographyStyling
    }

function getFontFamilyFromTypographyStyling({
  weight,
  italic,
}: TypographyStyling): fontFamilyNameType {
  if (weight === 'bold') {
    return italic === 'italic'
      ? fontFamilyNameEnum['Lato-boldItalic']
      : fontFamilyNameEnum['Lato-bold']
  }

  if (weight === 'light') {
    return italic === 'italic'
      ? fontFamilyNameEnum['Lato-lightItalic']
      : fontFamilyNameEnum['Lato-light']
  }

  return italic === 'italic'
    ? fontFamilyNameEnum['Lato-regularItalic']
    : fontFamilyNameEnum['Lato-regular']
}

type TypographyVariantStyleValues = {
  fontFamily: fontFamilyNameType
  fontSize: number
  lineHeight: number
}

function getVariantStyle(
  variant: TypographyVariants,
): TypographyVariantStyleValues {
  switch (variant.size) {
    case 'Heading1':
      return {
        fontFamily: fontFamilyNameEnum['Lato-bold'],
        fontSize: fontSizing['6XL'].fontSize,
        lineHeight: fontSizing['6XL'].lineHeight,
      }
    case 'Heading2':
      return {
        fontFamily: fontFamilyNameEnum['Lato-bold'],
        fontSize: fontSizing['5XL'].fontSize,
        lineHeight: fontSizing['5XL'].lineHeight,
      }
    case 'Heading3':
      return {
        fontFamily: fontFamilyNameEnum['Lato-bold'],
        fontSize: fontSizing['4XL'].fontSize,
        lineHeight: fontSizing['4XL'].lineHeight,
      }
    case 'Heading4':
      return {
        fontFamily: fontFamilyNameEnum['Lato-bold'],
        fontSize: fontSizing['3XL'].fontSize,
        lineHeight: fontSizing['3XL'].lineHeight,
      }
    case 'Heading5':
      return {
        fontFamily: fontFamilyNameEnum['Lato-regular'],
        fontSize: fontSizing['XXL'].fontSize,
        lineHeight: fontSizing['XXL'].lineHeight,
      }
    case 'Heading6':
      return {
        fontFamily: fontFamilyNameEnum['Lato-regular'],
        fontSize: fontSizing['XL'].fontSize,
        lineHeight: fontSizing['XL'].lineHeight,
      }
    case 'paragraph':
      return {
        fontFamily: variant.textStyling
          ? getFontFamilyFromTypographyStyling(variant.textStyling)
          : fontFamilyNameEnum['Lato-regular'],
        fontSize: fontSizing['L'].fontSize,
        lineHeight: fontSizing['L'].lineHeight,
      }
    case 'paragraphS':
      return {
        fontFamily: variant.textStyling
          ? getFontFamilyFromTypographyStyling(variant.textStyling)
          : fontFamilyNameEnum['Lato-regular'],
        fontSize: fontSizing['M'].fontSize,
        lineHeight: fontSizing['M'].lineHeight,
      }
    case 'caption':
      return {
        fontFamily: variant.textStyling
          ? getFontFamilyFromTypographyStyling(variant.textStyling)
          : fontFamilyNameEnum['Lato-regular'],
        fontSize: fontSizing['S'].fontSize,
        lineHeight: fontSizing['S'].lineHeight,
      }
    case 'captionS':
      return {
        fontFamily: variant.textStyling
          ? getFontFamilyFromTypographyStyling(variant.textStyling)
          : fontFamilyNameEnum['Lato-regular'],
        fontSize: fontSizing['XS'].fontSize,
        lineHeight: fontSizing['XS'].lineHeight,
      }
  }
}

const DEFAULT_VARIANT: TypographyVariants = {
  size: 'paragraph',
}

export type TypographyProps = TextProps & {
  variant?: TypographyVariants
}

function Typography({ variant, style, ...rest }: TypographyProps) {
  const variantToUse = variant ? variant : DEFAULT_VARIANT
  const variantStyle: StyleProp<TextStyle> = getVariantStyle(variantToUse)

  const finalStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    variantStyle,
    style,
  ])

  return <Text style={finalStyle} {...rest} />
}

export default Typography
