import { CANNOT_BE_EMPTY, HAS_TO_BE_NUMNBER } from '@/forms/error-messages'
import { z } from 'zod'

export const denyutNumberSchema = (isOptional?: true) => {
  const baseNumberSchema = z.number({
    invalid_type_error: HAS_TO_BE_NUMNBER,
    required_error: CANNOT_BE_EMPTY,
  })
  return z.preprocess(
    val => {
      if (typeof val === 'number') return val

      if (typeof val === 'string') {
        // If val is a valid string number check via regex, does not allow two dots
        if (/^[0-9]+(\.[0-9]{1,})?$/.test(val)) {
          return Number(val)
        }

        // Return undefined
        return undefined
      }
    },
    isOptional ? baseNumberSchema.optional() : baseNumberSchema,
  )
}
