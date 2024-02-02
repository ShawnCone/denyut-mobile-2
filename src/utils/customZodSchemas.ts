import { CANNOT_BE_EMPTY, HAS_TO_BE_NUMNBER } from '@/forms/error-messages'
import { z } from 'zod'

const preprocessNumberInput = (val: unknown) => {
  if (typeof val === 'number') return val
  if (typeof val === 'string') {
    if (val === '') return undefined

    // If val is a valid string number check via regex, allow single dot or single comma.
    if (/^[0-9]+([.,][0-9]{1,})?$/.test(val)) {
      // Replace comma with dot
      val = val.replace(',', '.')
      return Number(val)
    }

    // Return invalid number otherwise
    return 'invalid_number_placeholder'
  }
}

export const denyutNumberSchema = z.preprocess(
  preprocessNumberInput,
  z.number({
    invalid_type_error: HAS_TO_BE_NUMNBER,
    required_error: CANNOT_BE_EMPTY,
  }),
)

export const optionalDenyutNumberSchema = z.preprocess(
  preprocessNumberInput,
  z
    .number({
      invalid_type_error: HAS_TO_BE_NUMNBER,
    })
    .optional(),
)
