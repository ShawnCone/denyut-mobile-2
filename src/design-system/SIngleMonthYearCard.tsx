import { MONTHS_LIST_LONG } from '@/utils/dateFormatter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type SingleMonthYearCardProps = {
  monthIdx: number
  year: number
  onPress: () => void
  rightLabel: string
}
function SingleMonthYearCard({
  monthIdx,
  year,
  onPress,
  rightLabel,
}: SingleMonthYearCardProps) {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: tokens.padding.L,
        paddingVertical: tokens.padding.L,
      }}
      onPress={onPress}
      android_ripple={{
        color: tokens.colors.ripple,
      }}
    >
      <Typography
        variant={{
          size: 'paragraphS',
        }}
      >
        {MONTHS_LIST_LONG[monthIdx]} {year}
      </Typography>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            color: tokens.colors.primary.normal,
          }}
          variant={{
            size: 'paragraphS',
            textStyling: {
              weight: 'bold',
            },
          }}
        >
          {rightLabel}
        </Typography>
        <MaterialCommunityIcons
          name="chevron-right"
          color={tokens.colors.neutral.normal}
          size={tokens.iconSize.M}
        />
      </View>
    </Pressable>
  )
}

export default SingleMonthYearCard
