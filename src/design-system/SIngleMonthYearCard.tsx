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
  disabled?: boolean
}
function SingleMonthYearCard({
  monthIdx,
  year,
  onPress,
  rightLabel,
  disabled,
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
      disabled={disabled}
    >
      <Typography
        style={{
          color: disabled
            ? tokens.colors.neutral.light
            : tokens.colors.neutral.dark,
        }}
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
            color: disabled
              ? tokens.colors.primary.light
              : tokens.colors.primary.normal,
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
