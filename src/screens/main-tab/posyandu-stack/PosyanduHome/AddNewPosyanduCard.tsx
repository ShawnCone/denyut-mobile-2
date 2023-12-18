import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

type AddNewPosyanduCardProps = {
  onPress: () => void
}

function AddNewPosyanduCard({ onPress }: AddNewPosyanduCardProps) {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: tokens.colors.neutral.white,
        borderColor: tokens.colors.neutral.light,
        borderWidth: tokens.borderWidth.S,
        borderRadius: tokens.borderRadius.S,
        paddingVertical: tokens.padding.L,
        paddingHorizontal: tokens.padding.L,
        marginTop: -36, // Hard coded, need to change if contents of card changes
      }}
      onPress={onPress}
      android_ripple={{
        color: tokens.colors.ripple,
      }}
    >
      <View
        style={{
          marginLeft: tokens.margin.M,
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
          Cari posyandu baru untuk bergabung
        </Typography>
      </View>

      <Ionicons
        style={{
          marginLeft: 'auto',
        }}
        name="add"
        size={tokens.iconSize.L}
        color={tokens.colors.primary.dark}
      />
    </Pressable>
  )
}

export default AddNewPosyanduCard
