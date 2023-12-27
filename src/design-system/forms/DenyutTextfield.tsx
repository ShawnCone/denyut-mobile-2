import { useMeasure } from '@/utils/useMeasure'
import React, { ReactNode, forwardRef, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { tokens } from '../tokens/tokens'
import FormFieldContainer, {
  FormFieldContainerWithoutChildren,
} from './FormFieldContainer'

type DenyutTextfieldProps = {
  placeholder?: string
  leftChildren?: ReactNode
} & FormFieldContainerWithoutChildren &
  TextInputProps

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
        paddingVertical: tokens.padding.M,
        paddingLeft: leftChildrenMeasurements?.width
          ? leftChildrenMeasurements.width + tokens.padding.M * 2
          : tokens.padding.M,
        paddingRight: tokens.padding.M,
      },
    })

    const containerProps: FormFieldContainerWithoutChildren = {
      label,
      errorMessage,
      required,
    }

    return (
      <FormFieldContainer {...containerProps}>
        {/* Text input */}
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
      </FormFieldContainer>
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
