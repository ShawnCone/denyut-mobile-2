import DenyutButton from '@/design-system/DenyutButton'
import DenyutTextfield from '@/design-system/DenyutTextfield'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  Keyboard,
  Linking,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { RootStackParamsList } from '../root-stack'
import {
  COUNTRY_CODE,
  LoginFormValues,
  getCleanPhoneNumber,
  loginFormSchema,
  useSendOTP,
} from './utils'

export const DENYUT_MOMEN_LINK = 'https://denyut.app'

type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, 'Login'>
function LoginScreen({ navigation }: LoginScreenProps) {
  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
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
      phoneNumberInputRef.current.focus()
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{ flex: 1, backgroundColor: tokens.colors.neutral.extraLight }}
      >
        <View
          style={{
            height: 300,
            marginTop: tokens.margin.XL,
          }}
        >
          <Image
            source={require('@/../assets/images/poster.png')}
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: tokens.colors.neutral.white,
            borderTopRightRadius: 70,
            elevation: 1,
            marginTop: -1 * tokens.margin.XXL,
          }}
        >
          <View
            style={{
              padding: tokens.padding.L,
            }}
          >
            <Typography
              variant={{
                size: 'Heading4',
              }}
            >
              Masuk
            </Typography>
            <Typography
              variant={{
                size: 'caption',
              }}
              style={{
                color: tokens.colors.neutral.normal,
              }}
            >
              Silahkan masuk untuk melanjutkan
            </Typography>
            <Controller
              control={control}
              name="phoneNumber"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View
                  style={{
                    marginTop: tokens.margin.XL,
                  }}
                >
                  <DenyutTextfield
                    label="Nomor Handphone"
                    leftChildren={
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 4,
                        }}
                      >
                        <Image
                          source={require('@/../assets/icons/indonesian-flag.png')}
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography
                          variant={{
                            size: 'caption',
                          }}
                          style={{
                            marginLeft: tokens.margin.M,
                            color: tokens.colors.neutral.normal,
                          }}
                        >
                          {COUNTRY_CODE}
                        </Typography>
                      </View>
                    }
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    ref={phoneNumberInputRef}
                    keyboardType="number-pad"
                    editable={!isPending}
                  />
                </View>
              )}
            />
            {/* Form error display here */}
            <View
              style={{
                marginTop: tokens.margin.L,
              }}
            >
              <DenyutButton
                title="Masuk"
                onPress={handleSubmit(onSubmit)}
                disabled={isPending || !formState.isValid}
              />
            </View>
            {/* Denyut momen section */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: tokens.margin.XXL,
              }}
            >
              <Typography
                variant={{
                  size: 'caption',
                }}
              >
                Mencari Denyut Momen?
              </Typography>
              <Pressable
                onPress={() => {
                  Linking.openURL(DENYUT_MOMEN_LINK)
                }}
              >
                <Typography
                  variant={{
                    size: 'caption',
                    textStyling: {
                      weight: 'bold',
                    },
                  }}
                  style={{
                    color: tokens.colors.primary.dark,
                  }}
                >
                  {' '}
                  Klik disini
                </Typography>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen
