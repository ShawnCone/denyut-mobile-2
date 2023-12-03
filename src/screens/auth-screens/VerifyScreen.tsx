import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Text, TextInput, View } from 'react-native'
import { RootStackParamsList } from '../root-stack'
import {
  VerifyFormValues,
  useSendOTP,
  useVerifyOTP,
  verifyFormSchema,
} from './utils'

type VerifyScreenProps = NativeStackScreenProps<RootStackParamsList, 'Verify'>

function VerifyScreen({ route }: VerifyScreenProps) {
  const phoneNumber = route.params.phoneNumber

  const { control, handleSubmit } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyFormSchema),
  })

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
    console.log({
      phoneNumber,
      otp,
    })
    // Mutate here, verify
    verifyOTP({
      phoneNumber,
      otp,
    })
  }

  // Handle resend OTP
  const { mutate: resendOTP, isPending: isResendingOTP } = useSendOTP({
    onSuccess: () => {
      // Show toast?
      console.log('OTP resent')
    },
    onError: () => {
      // Show toast?
      console.error("Couldn't resend OTP")
    },
  })
  function handleResendOTP() {
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Verify Screen</Text>
      <Text>PhoneNumber to verify: {phoneNumber}</Text>
      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ width: 200, height: 40 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="number-pad"
            ref={otpInputRef}
          />
        )}
      />
      {/* Form error here */}
      <Button
        title="Verify"
        onPress={handleSubmit(onSubmit)}
        disabled={isVerifyingOTP}
      />
      {/* Submission error here */}
      {isVerifyingOTP && <Text>Verifying...</Text>}

      <Button
        title="Resend OTP"
        onPress={handleResendOTP}
        disabled={isResendingOTP}
      />
      {isResendingOTP && <Text>Resending OTP...</Text>}
    </View>
  )
}

export default VerifyScreen
