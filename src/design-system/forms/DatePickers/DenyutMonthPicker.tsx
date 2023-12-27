import { MONTHS_LIST_LONG } from '@/utils/dateFormatter'
import { useState } from 'react'
import { FormFieldContainerWithoutChildren } from '../FormFieldContainer'
import DatePickerFormContainer from './DatePickerFormContainer'
import DenyutMonthPickerModal from './DenyutMonthPickerModal'

type DenyutMonthPickerProps = {
  value: number
  setValue: (newMonthidx: number) => void
  disabled?: boolean
  placeholder: string
} & FormFieldContainerWithoutChildren

function DenyutMonthPicker({
  placeholder,
  label,
  errorMessage,
  required,
  value,
  setValue,
  disabled,
}: DenyutMonthPickerProps) {
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
      displayValue={MONTHS_LIST_LONG[value]}
      hideCalendarIcon
    >
      {/* Picker */}
      <DenyutMonthPickerModal
        isVisible={pickerOpen}
        onClose={handleClosePicker}
        value={value}
        setValue={setValue}
      />
    </DatePickerFormContainer>
  )
}

export default DenyutMonthPicker
