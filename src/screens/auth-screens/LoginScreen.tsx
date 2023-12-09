import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'

import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { RootStackParamsList } from '../root-stack'
import {
  LoginFormValues,
  getCleanPhoneNumber,
  loginFormSchema,
  useSendOTP,
} from './utils'

type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>
function LoginScreen({ navigation }: LoginScreenProps) {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const { mutate, isPending } = useSendOTP({
    onSuccess: phoneNumber => {
      navigation.push('Verify', {
        phoneNumber,
      })
    },
    onError: () => {
      // Show error message or toast?
      console.error("Couldn't send OTP")
    },
  })

  const onSubmit = ({ phoneNumber }: LoginFormValues) => {
    mutate({
      phoneNumber: getCleanPhoneNumber(phoneNumber),
    })
  }

  // Ref for auto focus when screen is open
  const phoneNumberInputRef = useRef<TextInput>(null)
  useEffect(() => {
    if (phoneNumberInputRef.current) {
      // phoneNumberInputRef.current.focus()
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography>Login Screen</Typography>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ width: 200, height: 40 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={phoneNumberInputRef}
            keyboardType="number-pad"
          />
        )}
      />
      {/* Form error display here */}
      <DenyutButton title="Submit" />
      <DenyutButton title="Submit" disabled />

      <DenyutButton title="Submit" variant="secondary" />
      <DenyutButton title="Submit" variant="secondary" disabled />
      <DenyutButton title="Delete" variant="destructive" />
      <DenyutButton title="Delete" variant="destructive" disabled />

      {/* Submission error here */}
      {isPending && <Typography>Sending OTP...</Typography>}
    </View>
  )
}

export default LoginScreen
