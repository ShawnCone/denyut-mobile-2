import { supabaseClient } from '@/client/supabase/supabase'
import { useMutation } from '@tanstack/react-query'

async function verifyOTP({
  phoneNumber,
  otp,
}: {
  phoneNumber: string
  otp: string
}) {
  const { data, error } = await supabaseClient.auth.verifyOtp({
    phone: phoneNumber,
    token: otp,
    type: 'sms',
  })

  if (error) {
    throw error
  }

  return data
}

type useVerifyOTPParams = {
  onSuccess?: () => void
  onError?: () => void
}

export function useVerifyOTP({ onSuccess, onError }: useVerifyOTPParams) {
  return useMutation({
    mutationFn: verifyOTP,
    onSuccess,
    onError,
  })
}
