import React, { ReactNode, forwardRef, useState } from 'react'
import {
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import Typography, { TypographyVariants } from './Typography'
import { tokens } from './tokens/tokens'

type DenyutTextfieldProps = {
  label?: string
  errorMessage?: string
  required?: boolean
  placeholder?: string
  leftChildren?: ReactNode
} & TextInputProps

const DenyutTextfield = forwardRef<TextInput, DenyutTextfieldProps>(
  (
    {
      label,
      leftChildren,
      errorMessage,
      required,
      placeholder,
      style,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const textFieldColor = getTextFieldStatusColor(isFocused, errorMessage)

    const { measurements: leftChildrenMeasurements, onLayout } = useMeasure()

    const styles = StyleSheet.create({
      input: {
        flex: 1,
        borderWidth: tokens.borderWidth.M,
        borderColor: textFieldColor,
        borderRadius: tokens.borderRadius.S,
        marginTop: tokens.margin.S,
        paddingVertical: tokens.padding.M,
        paddingLeft: leftChildrenMeasurements?.width
          ? leftChildrenMeasurements.width + tokens.padding.M * 2
          : tokens.padding.M,
        paddingRight: tokens.padding.M,
      },

      error: {
        color: tokens.colors.destructive.normal,
        marginTop: tokens.margin.S,
      },
    })

    const labelTypographyVariant: TypographyVariants = {
      size: 'caption',
    }

    return (
      <View>
        <Typography variant={labelTypographyVariant}>
          {label}
          <Typography
            variant={labelTypographyVariant}
            style={{
              color: tokens.colors.destructive.normal,
            }}
          >
            {required && '*'}
          </Typography>
        </Typography>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {typeof leftChildren !== 'undefined' && (
            <View
              style={{
                position: 'absolute',
                left: tokens.padding.M,
              }}
              onLayout={onLayout}
            >
              {leftChildren}
            </View>
          )}
          <TextInput
            style={[style, styles.input]}
            ref={ref}
            placeholder={placeholder}
            onBlur={e => {
              setIsFocused(false)
              onBlur && onBlur(e)
            }}
            onFocus={e => {
              setIsFocused(true)
              onFocus && onFocus(e)
            }}
            selectionColor={tokens.colors.primary.dark}
            {...props}
          />
        </View>

        {errorMessage && (
          <Typography
            variant={{
              size: 'captionS',
            }}
            style={styles.error}
          >
            {errorMessage}
          </Typography>
        )}
      </View>
    )
  },
)

export default DenyutTextfield

function getTextFieldStatusColor(
  isFocused: boolean,
  errorMessage?: string,
  value?: string,
) {
  if (errorMessage) {
    return tokens.colors.destructive.normal
  }

  if (isFocused || value) {
    return tokens.colors.primary.dark
  }

  return tokens.colors.neutral.light
}

function useMeasure() {
  const [measurements, setMeasurements] = useState<{
    x: number
    y: number
    width: number
    height: number
  }>()

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setMeasurements({ x, y, width, height })
  }

  return { measurements, onLayout }
}
