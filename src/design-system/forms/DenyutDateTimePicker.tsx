import { getDisplayDate } from '@/utils/dateFormatter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Pressable } from 'react-native'
import Typography from '../Typography'
import { tokens } from '../tokens/tokens'
import FormFieldContainer, {
  FormFieldContainerWithoutChildren,
} from './FormFieldContainer'

type DenyutDateTimePickerProps = {
  placeholder: string
  value?: Date
  setValue?: (date: Date | undefined) => void
  disabled?: boolean
} & FormFieldContainerWithoutChildren

function DenyutDateTimePicker({
  placeholder,
  label,
  errorMessage,
  required,
  value,
  setValue,
  disabled,
}: DenyutDateTimePickerProps) {
  const containerProps: FormFieldContainerWithoutChildren = {
    label,
    errorMessage,
    required,
  }

  const pressableColor = getPressableStatusColor(errorMessage)

  const [pickerOpen, setPickerOpen] = useState(false)

  function handleOpenPicker() {
    setPickerOpen(true)
  }

  function handleClosePicker() {
    setPickerOpen(false)
  }

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
        <MaterialCommunityIcons
          name="calendar"
          size={tokens.iconSize.M}
          color={getCalendarIconStatusColor(errorMessage, value, disabled)}
        />
        <Typography
          variant={{
            size: 'caption',
          }}
          style={{
            color: getTyographyColor(value, disabled),
          }}
        >
          {value ? getDisplayDate(value) : placeholder}
        </Typography>
      </Pressable>
      {/* Picker */}
      {pickerOpen && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          textColor={tokens.colors.primary.dark}
          display="spinner"
          onChange={(_, selectedDate) => {
            setValue?.(selectedDate)
            handleClosePicker()
          }}
          maximumDate={new Date()}
        />
      )}
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
  value?: Date,
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

function getTyographyColor(value?: Date, disabled?: boolean) {
  if (value) {
    return tokens.colors.neutral.dark
  }

  if (disabled) {
    return tokens.colors.neutral.light
  }

  return tokens.colors.neutral.normal
}

export default DenyutDateTimePicker
