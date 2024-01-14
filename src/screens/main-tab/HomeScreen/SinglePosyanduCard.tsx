import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

const POSYANDU_CARD_WIDTH = 150

type SinglePosyanduCardProps = {
  isPending?: boolean
  name: string
  city: string
  province: string
  onPress: () => void
}

function SinglePosyanduCard({
  isPending,
  name,
  city,
  province,
  onPress,
}: SinglePosyanduCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: tokens.colors.neutral.white,
        borderRadius: tokens.borderRadius.S,
        paddingVertical: tokens.padding.L,
        paddingHorizontal: tokens.padding.L,
        gap: tokens.margin.M,
      }}
      android_ripple={{
        color: tokens.colors.ripple,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          minWidth: POSYANDU_CARD_WIDTH,
        }}
      >
        <View
          style={{
            backgroundColor: tokens.colors.primary.extraLight,
            padding: tokens.padding.M,
            borderRadius: tokens.borderRadius.S,
          }}
        >
          <MaterialCommunityIcons
            name="office-building-outline"
            size={tokens.iconSize.M}
            color={tokens.colors.primary.dark}
          />
        </View>
        {isPending && (
          <View
            style={{
              backgroundColor: tokens.colors.warning.extraLight,
              borderColor: tokens.colors.warning.dark,
              borderWidth: tokens.borderWidth.S,
              flexDirection: 'row',
              borderRadius: tokens.borderRadius.full,
              alignItems: 'center',
              paddingVertical: tokens.padding.S,
              paddingHorizontal: tokens.padding.M,
              gap: tokens.margin.S,
            }}
          >
            <MaterialCommunityIcons
              name="clock-outline"
              size={tokens.iconSize.S}
              color={tokens.colors.warning.dark}
            />
            <Typography
              variant={{
                size: 'captionS',
              }}
              style={{
                color: tokens.colors.warning.dark,
              }}
            >
              Menunggu
            </Typography>
          </View>
        )}
      </View>
      <View>
        <Typography
          variant={{
            size: 'captionS',
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
        >{`${city}, ${province}`}</Typography>
      </View>
    </Pressable>
  )
}

export default SinglePosyanduCard
