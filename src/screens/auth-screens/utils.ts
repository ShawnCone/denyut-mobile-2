import { supabaseClient } from '@/client/supabase/supabase'
import { useMutation } from '@tanstack/react-query'
import * as z from 'zod'

export const loginFormSchema = z.object({
  phoneNumber: z.string().min(1).regex(/^\d+$/),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

// Make this env variable for dev and prod environment
const COUNTRY_CODE = '+62'

function getCleanPhoneNumber(phoneNumber: string) {
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

async function sendOTP(phoneNumber: string) {
  const { data, error } = await supabaseClient.auth.signInWithOtp({
    phone: getCleanPhoneNumber(phoneNumber),
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
  onSuccess?: () => void
  onError?: () => void
}

export function useSendOTP({ onSuccess, onError }: useSendOTPParams) {
  return useMutation({
    mutationFn: sendOTP,
    onSuccess,
    onError,
  })
}
