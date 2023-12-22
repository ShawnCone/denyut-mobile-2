import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { View } from 'react-native'

export type SinglePosyanduMemberCardMemberInfo = {
  id: string
  name: string
  phoneNumber: string
}

type SinglePosyanduMemberCardProps = {
  onPress?: () => void
  rightElement?: ReactNode
} & SinglePosyanduMemberCardMemberInfo

function SinglePosyanduMemberCard({
  name,
  phoneNumber,
  rightElement,
}: SinglePosyanduMemberCardProps) {
  return (
    <View
      style={{
        borderRadius: tokens.borderRadius.M,
        borderWidth: 1,
        borderColor: tokens.colors.transparent,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.colors.neutral.white,
          paddingVertical: tokens.padding.L,
          paddingHorizontal: tokens.padding.L,
        }}
      >
        {/* Later change this to avatar */}
        <MaterialCommunityIcons
          name="account-circle"
          size={tokens.iconSize.L}
          color={tokens.colors.primary.dark}
        />
        <View
          style={{
            marginLeft: tokens.margin.L,
            gap: tokens.margin.XS,
          }}
        >
          <Typography
            variant={{
              size: 'caption',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant={{
              size: 'captionS',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            +{phoneNumber}
          </Typography>
        </View>
        <View
          style={{
            marginLeft: 'auto',
          }}
        >
          {rightElement}
        </View>
      </View>
    </View>
  )
}

export default SinglePosyanduMemberCard
