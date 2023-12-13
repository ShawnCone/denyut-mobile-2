import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import { z } from 'zod'

// Number box component to be used by OTPInput
const numberBoxDigitEnumSchema = z.enum([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '',
])

export type NumberBoxDigitEnum = z.infer<typeof numberBoxDigitEnumSchema>

export type NumberBoxFormStatus = 'active' | 'error' | 'inactive'

type NumberBoxProp = {
  value: NumberBoxDigitEnum
  status: NumberBoxFormStatus
}

function getFormStatusColor(status: NumberBoxFormStatus): string {
  switch (status) {
    case 'active':
      return tokens.colors.primary.normal
    case 'error':
      return tokens.colors.destructive.normal
    case 'inactive':
      return tokens.colors.neutral.normal
  }
}

function SingleNumberBox({ value, status }: NumberBoxProp) {
  return (
    <View
      style={{
        height: 60,
        width: 52,
        borderRadius: tokens.borderRadius.M,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: getFormStatusColor(status),
        borderWidth: tokens.borderWidth.L,
      }}
    >
      <Typography
        variant={{
          size: 'Heading3',
        }}
        style={{
          color: getFormStatusColor(status),
        }}
      >
        {value}
      </Typography>
    </View>
  )
}

export default SingleNumberBox
