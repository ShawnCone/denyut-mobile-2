import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type ButtonVariants = 'primary' | 'secondary' | 'destructive'
const DEFAULT_BUTTON_VARIANT: ButtonVariants = 'primary'

type ButtonSizes = 'small' | 'medium' | 'large' | 'responsive'
const DEFAULT_BUTTON_SIZE: ButtonSizes = 'responsive'

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
  isDisabled: boolean,
): StyleProp<ViewStyle> {
  const baseStyle: StyleProp<ViewStyle> = {
    paddingVertical: tokens.padding.M,
    paddingHorizontal: tokens.padding.L,
    borderRadius: tokens.borderRadius.M,
  }

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: isDisabled
          ? tokens.colors.primary.light
          : tokens.colors.primary.dark,
      }
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: isDisabled
          ? tokens.colors.primary.light
          : tokens.colors.primary.extraLight,
        borderColor: tokens.colors.primary.dark,
        borderWidth: 1.5,
      }
    case 'destructive':
      return {
        ...baseStyle,
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
  //   const sizeToUse = size ? size : DEFAULT_BUTTON_SIZE // Not yet, control padding and width with this

  const pressableStyle: StyleProp<ViewProps> = StyleSheet.flatten([
    getPressableStyle(variantToUse, disabled || false),
    typeof style === 'function' ? {} : style, // Ignore if function type
  ])

  return (
    <Pressable style={pressableStyle} {...rest}>
      <Typography
        variant={{
          size: 'paragraph', // might change with the different sizes
        }}
        style={{
          color: getButtonTextColor(variantToUse),
        }}
      >
        {title}
      </Typography>
    </Pressable>
  )
}

export default DenyutButton
