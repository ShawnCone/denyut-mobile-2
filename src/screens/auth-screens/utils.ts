import { supabaseClient } from '@/client/supabase/supabase'
import { CANNOT_BE_EMPTY } from '@/forms/error-messages'
import { useMutation } from '@tanstack/react-query'
import * as z from 'zod'

export const loginFormSchema = z.object({
  phoneNumber: z.string().min(1, {
    message: CANNOT_BE_EMPTY,
  }),
})

export const OTP_LENGTH = 6

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const verifyFormSchema = z.object({
  otp: z.string().min(OTP_LENGTH).max(OTP_LENGTH),
})

export type VerifyFormValues = z.infer<typeof verifyFormSchema>

// Make this env variable for dev and prod environment
export const COUNTRY_CODE = '+62'

// Clean phone number before doing any calls, the responsibility to clean is on the caller
export function getCleanPhoneNumber(phoneNumber: string) {
  // Strip first zero
  if (phoneNumber.startsWith('0')) {
    return phoneNumber.slice(1)
  }

  // Strip 62 prefix if any
  if (phoneNumber.startsWith('62')) {
    return phoneNumber.slice(2)
  }

  // Add +62 to phone number
  return `${COUNTRY_CODE}${phoneNumber}`
}

async function sendOTP({ phoneNumber }: { phoneNumber: string }) {
  const { data, error } = await supabaseClient.auth.signInWithOtp({
    phone: phoneNumber,
    options: {
      channel: 'whatsapp',
    },
  })

  if (error) {
    throw error
  }

  return data
}

type useSendOTPParams = {
  onSuccess?: (phoneNumber: string) => void
  onError?: () => void
}

export function useSendOTP({ onSuccess, onError }: useSendOTPParams) {
  return useMutation({
    mutationFn: sendOTP,
    onSuccess: (_, { phoneNumber }) => {
      onSuccess?.(phoneNumber)
    },
    onError,
  })
}
