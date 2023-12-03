import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Text, TextInput, View } from 'react-native'
import { LoginFormValues, loginFormSchema, useSendOTP } from './utils'

function LoginScreen() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const { mutate: sendOTP, isPending } = useSendOTP({
    onSuccess: () => {
      // Navigate to verify screen if successful
    },
    onError: () => {
      // Show error message or toast?
    },
  })

  const onSubmit = ({ phoneNumber }: LoginFormValues) => {
    sendOTP(phoneNumber)
  }

  // Ref for auto focus when screen is open
  const phoneNumberInputRef = useRef<TextInput>(null)
  useEffect(() => {
    if (phoneNumberInputRef.current) {
      phoneNumberInputRef.current.focus()
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
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
      {/* Error text here */}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default LoginScreen
