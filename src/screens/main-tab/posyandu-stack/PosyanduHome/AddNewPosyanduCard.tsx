import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable, View } from 'react-native'

type AddNewPosyanduCardProps = {
  onPress: () => void
}

// Top margin offset is added here
function AddNewPosyanduCard({ onPress }: AddNewPosyanduCardProps) {
  const [height, setHeight] = useState(0)

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: tokens.colors.neutral.white,
        borderColor: tokens.colors.neutral.light,
        borderWidth: tokens.borderWidth.S,
        marginHorizontal: tokens.margin.L,
        borderRadius: tokens.borderRadius.XS,
        marginTop: (-1 * height) / 2,
        paddingVertical: tokens.padding.L,
        paddingHorizontal: tokens.padding.L,
      }}
      onPress={onPress}
      onLayout={e => {
        const { height } = e.nativeEvent.layout
        setHeight(height)
      }}
      android_ripple={{
        color: tokens.colors.ripple,
      }}
    >
      <MaterialCommunityIcons
        name="office-building-outline"
        size={tokens.iconSize.M}
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
          Tambah Posyandu
        </Typography>
        <Typography
          variant={{
            size: 'captionS',
          }}
          style={{
            color: tokens.colors.neutral.normal,
          }}
        >
          Cari posyandu baru untuk ditambah
        </Typography>
      </View>
      <Ionicons
        style={{
          marginLeft: 'auto',
        }}
        name="chevron-forward-outline"
        size={tokens.iconSize.M}
        color={tokens.colors.neutral.dark}
      />
    </Pressable>
  )
}

export default AddNewPosyanduCard
