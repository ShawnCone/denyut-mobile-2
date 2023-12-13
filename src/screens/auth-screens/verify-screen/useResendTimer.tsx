import { useEffect, useState } from 'react'

const TIMER_SECONDS = 60
export function useResendTimer() {
  // 60 second timer for resend otp
  const [resendTimer, setResendTimer] = useState(TIMER_SECONDS)
  useEffect(() => {
    if (resendTimer > 0) {
      setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
    }
  }, [resendTimer])

  function resetResendTimer() {
    setResendTimer(TIMER_SECONDS)
  }

  const isReadyToResend = resendTimer === 0

  return {
    secondsRemaining: resendTimer,
    resetResendTimer,
    isReadyToResend,
  }
}
