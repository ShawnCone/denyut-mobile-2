import { useState } from 'react'
import { FormFieldContainerWithoutChildren } from '../FormFieldContainer'
import DatePickerFormContainer from './DatePickerFormContainer'
import DenyutYearPickerModal from './DenyutYearPickerModal'

type DenyutYearPickerProps = {
  value: number
  setValue: (newMonthidx: number) => void
  disabled?: boolean
  placeholder: string
} & FormFieldContainerWithoutChildren

function DenyutYearPicker({
  placeholder,
  label,
  errorMessage,
  required,
  value,
  setValue,
  disabled,
}: DenyutYearPickerProps) {
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
      displayValue={value.toString()}
      hideCalendarIcon
    >
      {/* Picker */}
      <DenyutYearPickerModal
        isVisible={pickerOpen}
        onClose={handleClosePicker}
        value={value}
        setValue={setValue}
      />
    </DatePickerFormContainer>
  )
}

export default DenyutYearPicker
