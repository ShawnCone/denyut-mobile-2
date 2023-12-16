import RadioSelect, { RadioSelectProps } from '../radio/RadioSelect'
import FormFieldContainer, {
  FormFieldContainerWithoutChildren,
} from './FormFieldContainer'

type RadioSelectFormInputProps = RadioSelectProps &
  FormFieldContainerWithoutChildren

function RadioSelectFormInput({
  label,
  required,
  onChange,
  options,
  value,
  direction,
  disabled,
}: RadioSelectFormInputProps) {
  const containerProps: FormFieldContainerWithoutChildren = { label, required }
  const radioSelectProps: RadioSelectProps = {
    onChange,
    options,
    value,
    direction,
    disabled,
  }

  return (
    <FormFieldContainer {...containerProps}>
      <RadioSelect {...radioSelectProps} />
    </FormFieldContainer>
  )
}

export default RadioSelectFormInput
