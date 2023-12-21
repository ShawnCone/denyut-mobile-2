import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { Pressable, View } from 'react-native'

type SinglePosyanduMemberCardProps = {
  onPress?: () => void
  name: string
  phoneNumber: string
  rightElement?: ReactNode
  disabled?: boolean
}

function SinglePosyanduMemberCard({
  onPress,
  name,
  phoneNumber,
  rightElement,
  disabled = false,
}: SinglePosyanduMemberCardProps) {
  return (
    <View
      style={{
        borderRadius: tokens.borderRadius.M,
        borderWidth: 1,
        borderColor: tokens.colors.transparent,
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.colors.neutral.white,
          paddingVertical: tokens.padding.L,
          paddingHorizontal: tokens.padding.L,
        }}
        onPress={onPress}
        android_ripple={{
          borderless: true,
          color: tokens.colors.ripple,
        }}
        disabled={disabled}
      >
        <MaterialCommunityIcons
          name="office-building-outline"
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
      </Pressable>
    </View>
  )
}

export default SinglePosyanduMemberCard
