import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

type SinglePosyanduListMemberProps = {
  onPress?: () => void
  name: string
  city: string
  province: string
}

function SinglePosyanduListMember({
  onPress,
  name,
  city,
  province,
}: SinglePosyanduListMemberProps) {
  return (
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
        color: tokens.colors.ripple,
      }}
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
          {city}, {province}
        </Typography>
      </View>
    </Pressable>
  )
}

export default SinglePosyanduListMember
