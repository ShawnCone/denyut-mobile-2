import { supabaseClient } from '@/client/supabase/supabase'
import { useMutation } from '@tanstack/react-query'

async function verifyOTP({
  phoneNumber,
  otp,
}: {
  phoneNumber: string
  otp: string
}) {
  // For testing / review purposes
  if (phoneNumber.includes('2179791776')) {
    const { error: testAccError } =
      await supabaseClient.auth.signInWithPassword({
        phone: '+12179791776',
        password: '654321',
      })

    if (testAccError) {
      throw testAccError
    }
    return
  }

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
