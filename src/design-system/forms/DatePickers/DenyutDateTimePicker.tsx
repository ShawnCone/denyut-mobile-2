import { getDisplayDate } from '@/utils/dateFormatter'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { FormFieldContainerWithoutChildren } from '../FormFieldContainer'
import DatePickerFormContainer from './DatePickerFormContainer'

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
  const [pickerOpen, setPickerOpen] = useState(false)

  function handleOpenPicker() {
    setPickerOpen(true)
  }

  function handleClosePicker() {
    setPickerOpen(false)
  }

  return (
    <DatePickerFormContainer
      handleOpenPicker={handleOpenPicker}
      pickerOpen={pickerOpen}
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      errorMessage={errorMessage}
      required={required}
      displayValue={value ? getDisplayDate(value) : undefined}
    >
      {/* Picker */}
      <DateTimePicker
        value={value || new Date()}
        mode="date"
        display="spinner"
        onChange={(_, selectedDate) => {
          setValue?.(selectedDate)
          handleClosePicker()
        }}
        maximumDate={new Date()}
      />
    </DatePickerFormContainer>
  )
}

export default DenyutDateTimePicker
