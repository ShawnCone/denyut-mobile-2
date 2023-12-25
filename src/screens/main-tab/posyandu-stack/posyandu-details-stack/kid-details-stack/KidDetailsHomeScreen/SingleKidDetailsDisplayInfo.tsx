import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { ReactNode } from 'react'
import { View } from 'react-native'

type SingleProfileInfoProps = {
  icon: ReactNode
  text: string
}

function SingleKidDetailsDisplayInfo({ icon, text }: SingleProfileInfoProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.margin.S,
      }}
    >
      {icon}
      <Typography
        variant={{
          size: 'caption',
        }}
        style={{
          color: tokens.colors.neutral.white,
        }}
      >
        {text}
      </Typography>
    </View>
  )
}

export default SingleKidDetailsDisplayInfo
