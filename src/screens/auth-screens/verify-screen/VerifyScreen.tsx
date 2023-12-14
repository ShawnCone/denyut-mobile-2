import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import ClickableTypography from '@/design-system/ClickableTypography'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { RootStackParamsList } from '../../root-stack'
import { VerifyFormValues, useSendOTP, verifyFormSchema } from '../utils'
import { OTPInput } from './otp-input'
import { useResendTimer } from './useResendTimer'
import { useVerifyOTP } from './utils'

type VerifyScreenProps = NativeStackScreenProps<RootStackParamsList, 'Verify'>

function VerifyScreen({ route }: VerifyScreenProps) {
  const phoneNumber = route.params.phoneNumber

  const formMethods = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyFormSchema),
  })

  const { handleSubmit, watch } = formMethods

  const { success: isValid } = verifyFormSchema.safeParse(watch())
  const { mutate: verifyOTP, isPending: isVerifyingOTP } = useVerifyOTP({
    onSuccess: () => {
      // Navigation manually not needed if the set up in the rootstack is ok
      console.log('OTP verified')
    },
    onError: () => {
      // Show toast?
      console.error("Couldn't verify OTP")
    },
  })

  const onSubmit = ({ otp }: VerifyFormValues) => {
    // Mutate here, verify
    verifyOTP({
      phoneNumber,
      otp,
    })
  }

  // Handle resend OTP
  const { mutate: resendOTP, isError } = useSendOTP({
    onSuccess: () => {
      // Show toast?
      console.log('OTP resent')
    },
  })
  function handleResendOTP() {
    resetResendTimer()
    resendOTP({
      phoneNumber,
    })
  }

  // Ref for auto focus when screen is open
  const otpInputRef = useRef<TextInput>(null)
  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [])

  const { resetResendTimer, secondsRemaining, isReadyToResend } =
    useResendTimer()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <FormProvider {...formMethods}>
        <View
          style={{
            flex: 1,
            backgroundColor: tokens.colors.neutral.white,
            paddingHorizontal: tokens.padding.L,
            paddingTop: tokens.padding.L,
          }}
        >
          <Typography
            variant={{
              size: 'paragraphS',
            }}
          >
            Masukan kode verifikasi yang telah kami kirimkan melalui nomor
            handphone
            <Typography
              variant={{
                size: 'paragraphS',
                textStyling: {
                  weight: 'bold',
                },
              }}
            >
              {' '}
              {phoneNumber}
            </Typography>
          </Typography>
          <View
            style={{
              marginTop: tokens.margin.L,
            }}
          >
            <OTPInput isError={isError} onSubmit={handleSubmit(onSubmit)} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: tokens.margin.L,
            }}
          >
            <Typography
              variant={{
                size: 'caption',
              }}
            >
              Belum mendapatkan OTP?
            </Typography>
            <ClickableTypography
              pressableProps={{
                onPress: handleResendOTP,
                disabled: !isReadyToResend,
              }}
              typographyProps={{
                variant: {
                  size: 'caption',
                },
                style: {
                  color: isReadyToResend
                    ? tokens.colors.primary.normal
                    : tokens.colors.primary.light,
                },
              }}
            >
              {'  '}
              {isReadyToResend
                ? 'Kirim Ulang'
                : `Kirim Ulang dalam 0:${
                    secondsRemaining > 9 ? '' : '0'
                  }${secondsRemaining}`}
            </ClickableTypography>
          </View>
          <DenyutButton
            style={{
              marginTop: tokens.margin.M,
            }}
            title="Verifikasi Kode OTP"
            onPress={handleSubmit(onSubmit)}
            disabled={isVerifyingOTP || !isValid}
          />
        </View>
      </FormProvider>
    </TouchableWithoutFeedback>
  )
}

export default VerifyScreen
