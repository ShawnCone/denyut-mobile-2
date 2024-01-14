import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

type AddPosyanduCardProps = {
  onAddNewPosyanduPress: () => void
}
function AddPosyanduCard({ onAddNewPosyanduPress }: AddPosyanduCardProps) {
  return (
    <Pressable
      style={{
        borderColor: tokens.colors.neutral.white,
        borderWidth: tokens.borderWidth.M,
        borderRadius: tokens.borderRadius.S,
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.padding.L,
        borderStyle: 'dashed',
      }}
      android_ripple={{
        color: tokens.colors.ripple,
      }}
      onPress={onAddNewPosyanduPress}
    >
      <MaterialCommunityIcons
        name="plus-circle-outline"
        size={tokens.iconSize.L}
        color={tokens.colors.neutral.white}
      />
      <Typography
        style={{
          color: tokens.colors.neutral.white,
        }}
        variant={{
          size: 'caption',
          textStyling: {
            weight: 'bold',
          },
        }}
      >
        Tambah Posyandu
      </Typography>
    </Pressable>
  )
}

export default AddPosyanduCard
