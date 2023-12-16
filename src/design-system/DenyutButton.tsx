import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import Typography, { TypographyVariants } from './Typography'
import { tokens } from './tokens/tokens'

type ButtonVariants = 'primary' | 'secondary' | 'destructive'
const DEFAULT_BUTTON_VARIANT: ButtonVariants = 'primary'

type ButtonSizes = 'small' | 'medium'
const DEFAULT_BUTTON_SIZE: ButtonSizes = 'medium'

type DenyutButtonProps = PressableProps & {
  variant?: ButtonVariants
  size?: ButtonSizes
  title: string
}

function getButtonTextColor(variant: ButtonVariants): string {
  switch (variant) {
    case 'primary':
      return tokens.colors.neutral.extraLight
    case 'secondary':
      return tokens.colors.primary.dark
    case 'destructive':
      return tokens.colors.neutral.extraLight
  }
}

function getPressableStyle(
  variant: ButtonVariants,
  size: ButtonSizes,
  isDisabled: boolean,
): StyleProp<ViewStyle> {
  const sizeStyle: StyleProp<ViewStyle> = {
    paddingVertical: size === 'small' ? tokens.padding.S : tokens.padding.M,
    paddingHorizontal: size === 'small' ? tokens.padding.M : tokens.padding.L,
    borderRadius: tokens.borderRadius.M,
  }

  switch (variant) {
    case 'primary':
      return {
        ...sizeStyle,
        backgroundColor: isDisabled
          ? tokens.colors.primary.light
          : tokens.colors.primary.dark,
      }
    case 'secondary':
      return {
        ...sizeStyle,
        backgroundColor: isDisabled
          ? tokens.colors.neutral.light
          : tokens.colors.neutral.white,
        borderColor: tokens.colors.primary.dark,
        borderWidth: tokens.borderWidth.L,
      }
    case 'destructive':
      return {
        ...sizeStyle,
        backgroundColor: tokens.colors.destructive.dark,
      }
  }
}

function DenyutButton({
  variant,
  size,
  title,
  style,
  disabled,
  ...rest
}: DenyutButtonProps) {
  const variantToUse = variant ? variant : DEFAULT_BUTTON_VARIANT
  const sizeToUse = size ? size : DEFAULT_BUTTON_SIZE // Not yet, control padding and width with this

  const pressableStyle: StyleProp<ViewProps> = StyleSheet.flatten([
    getPressableStyle(variantToUse, sizeToUse, disabled || false),
    typeof style === 'function' ? {} : style, // Ignore if function type
  ])

  const typographyVariant: TypographyVariants =
    sizeToUse === 'small' ? { size: 'paragraphS' } : { size: 'paragraph' }

  const typographyStyle: StyleProp<TextStyle> = {
    color: getButtonTextColor(variantToUse),
    textAlign: 'center',
  }

  return (
    <Pressable style={pressableStyle} {...rest}>
      <Typography variant={typographyVariant} style={typographyStyle}>
        {title}
      </Typography>
    </Pressable>
  )
}

export default DenyutButton
