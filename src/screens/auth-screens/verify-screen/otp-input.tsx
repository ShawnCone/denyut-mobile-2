import { tokens } from '@/design-system/tokens/tokens'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Pressable, TextInput, View } from 'react-native'
import { OTP_LENGTH, VerifyFormValues } from '../utils'
import SingleNumberBox, {
  NumberBoxDigitEnum,
  NumberBoxFormStatus,
} from './single-number-box'

function makeEmptyOtpArr(length: number): NumberBoxDigitEnum[] {
  return Array.from({
    length,
  }).map(() => '')
}

type OTPInputProps = {
  isError: boolean // Submission error message
  onSubmit: () => void
}

function getSingleBoxStatus(
  idx: number,
  filledLength: number,
  isError: OTPInputProps['isError'],
  isFocused: boolean,
): NumberBoxFormStatus {
  if (filledLength === OTP_LENGTH) return 'active'

  if (isError) return 'error'

  if (idx < filledLength) return 'active'

  if (idx === filledLength && isFocused) return 'active'

  return 'inactive'
}

// OTPInput component to export, only used in verify OTP. Here for organization
export function OTPInput({ isError, onSubmit }: OTPInputProps) {
  const textInputRef = useRef<TextInput>(null)
  const [otpDigitArr, setOtpDigitArr] = useState<NumberBoxDigitEnum[]>(
    makeEmptyOtpArr(OTP_LENGTH),
  )

  const { setValue } = useFormContext<VerifyFormValues>()

  // Indicator whether the text input is focused or not
  const [textInputIsFocused, setTextInputIsFocused] = useState(false)

  const filledLength = otpDigitArr.filter(cChar => cChar !== '').length

  function handleChangeText(text: string) {
    // Filter text to only contain numbers
    const filteredText = text.replace(/[^0-9]/g, '')
    const filteredTextArr = filteredText.split('')
    if (filteredTextArr.length > OTP_LENGTH) {
      filteredTextArr.splice(OTP_LENGTH, filteredTextArr.length)
    }
    const newOtpDigitArr = makeEmptyOtpArr(OTP_LENGTH)
    filteredTextArr.forEach((cChar, idx) => {
      newOtpDigitArr[idx] = cChar as NumberBoxDigitEnum
    })
    setOtpDigitArr(newOtpDigitArr)
    setValue('otp', newOtpDigitArr.join(''))
    if (newOtpDigitArr.length === OTP_LENGTH) {
      onSubmit()
    }
  }

  // useEffect(() => {
  //   if (filledLength === OTP_LENGTH) {
  //     onSubmit()
  //   }
  // }, [otpDigitArr])

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus()
    }
  }, [])

  return (
    <View>
      <View
        style={{
          paddingHorizontal: tokens.padding.M,
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            textInputRef.current?.focus()
          }}
        >
          {otpDigitArr.map((cChar, idx) => (
            <SingleNumberBox
              key={idx}
              value={cChar}
              status={getSingleBoxStatus(
                idx,
                filledLength,
                isError,
                textInputIsFocused,
              )}
            />
          ))}
        </Pressable>
        {/* Should never happen */}
        {/* {errorMessage && (
          <View
            style={{
              marginTop: tokens.margin.M,
            }}
          >
            <Typography
              style={{
                color: tokens.colors.destructive.normal,
              }}
              variant={{
                size: 'caption',
              }}
            >
              {errorMessage}
            </Typography>
          </View>
        )} */}
      </View>
      <TextInput
        style={{
          position: 'absolute',
          top: 1,
          left: 1,
          height: 0.5,
          width: 0.5,
          opacity: 0,
        }}
        keyboardType="number-pad"
        onChangeText={handleChangeText}
        value={otpDigitArr.join('')}
        ref={textInputRef}
        onFocus={() => {
          setTextInputIsFocused(true)
        }}
        onBlur={() => {
          setTextInputIsFocused(false)
        }}
      />
    </View>
  )
}
