import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { Pressable } from 'react-native'
import Typography from '../../Typography'
import { tokens } from '../../tokens/tokens'
import FormFieldContainer, {
  FormFieldContainerWithoutChildren,
} from '../FormFieldContainer'

type DatePickerFormContainerProps = {
  placeholder: string
  displayValue?: string
  disabled?: boolean
  children: ReactNode
  pickerOpen: boolean
  handleOpenPicker: () => void
  hideCalendarIcon?: boolean
} & FormFieldContainerWithoutChildren

function DatePickerFormContainer({
  placeholder,
  label,
  errorMessage,
  required,
  disabled,
  children,
  displayValue,
  handleOpenPicker,
  pickerOpen,
  hideCalendarIcon,
}: DatePickerFormContainerProps) {
  const containerProps: FormFieldContainerWithoutChildren = {
    label,
    errorMessage,
    required,
  }

  const pressableColor = getPressableStatusColor(errorMessage)

  return (
    <FormFieldContainer {...containerProps}>
      {/* Button to open */}
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: tokens.borderWidth.M,
          borderColor: pressableColor,
          borderRadius: tokens.borderRadius.S,
          paddingVertical: tokens.padding.M,
          paddingHorizontal: tokens.padding.M,
          gap: tokens.margin.S,
        }}
        onPress={handleOpenPicker}
        disabled={disabled}
      >
        {!hideCalendarIcon && (
          <MaterialCommunityIcons
            name="calendar"
            size={tokens.iconSize.M}
            color={getCalendarIconStatusColor(
              errorMessage,
              displayValue,
              disabled,
            )}
          />
        )}

        <Typography
          variant={{
            size: 'caption',
          }}
          style={{
            color: getTyographyColor(displayValue, disabled),
          }}
        >
          {displayValue ?? placeholder}
        </Typography>
      </Pressable>
      {/* Picker */}
      {pickerOpen && <>{children}</>}
    </FormFieldContainer>
  )
}

function getPressableStatusColor(errorMessage?: string) {
  if (errorMessage) {
    return tokens.colors.destructive.normal
  }

  return tokens.colors.neutral.light
}

function getCalendarIconStatusColor(
  errorMessage?: string,
  value?: string,
  disabled?: boolean,
) {
  if (errorMessage) {
    return tokens.colors.destructive.normal
  }

  if (value) {
    return tokens.colors.primary.normal
  }

  if (disabled) {
    return tokens.colors.primary.light
  }

  return tokens.colors.neutral.normal
}

function getTyographyColor(value?: string, disabled?: boolean) {
  if (value) {
    return tokens.colors.neutral.dark
  }

  if (disabled) {
    return tokens.colors.neutral.light
  }

  return tokens.colors.neutral.normal
}

export default DatePickerFormContainer
