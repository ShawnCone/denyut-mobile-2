import { z } from 'zod'
import { RadioSelectOptions } from '../radio/RadioSelect'
import RadioSelectFormInput from './RadioSelectFormInput'

export const SEX_OPTIONS = ['male', 'female'] as const
export const sexSchema = z.enum(SEX_OPTIONS)
export type sexSchemaType = z.infer<typeof sexSchema>
export function getDisplaySexStr(sex: sexSchemaType) {
  switch (sex) {
    case 'female':
      return 'Perempuan'
    case 'male':
      return 'Laki - laki'
  }
}

const SEX_SELECT_OPTIONS: RadioSelectOptions = [
  {
    value: 'male',
    label: getDisplaySexStr('male'),
  },
  {
    value: 'female',
    label: getDisplaySexStr('female'),
  },
]

type SexSelectionFormInputProps = {
  onChange: (value: string) => void
  value: string
  disabled?: boolean
}

function SexSelectionFormInput({
  onChange,
  value,
  disabled = false,
}: SexSelectionFormInputProps) {
  return (
    <RadioSelectFormInput
      label="Jenis Kelamin"
      options={SEX_SELECT_OPTIONS}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  )
}

export default SexSelectionFormInput
