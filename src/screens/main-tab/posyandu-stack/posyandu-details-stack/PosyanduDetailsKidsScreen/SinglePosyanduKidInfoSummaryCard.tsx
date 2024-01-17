import { KidInfoSummary } from '@/client/supabase/queries/kid-info'
import Typography from '@/design-system/Typography'
import AvatarDisplay from '@/design-system/forms/AvatarDisplay'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayCurrentAge, getDisplayDate } from '@/utils/dateFormatter'
import { Pressable, View } from 'react-native'

type SinglePosyanduKidInfoSummaryCardProps = {
  onPress: () => void
  disabled?: boolean
  kidInfoSummary: KidInfoSummary
}

function SinglePosyanduKidInfoSummaryCard({
  onPress,
  disabled,
  kidInfoSummary,
}: SinglePosyanduKidInfoSummaryCardProps) {
  const { name, dateOfBirth, birthCity, birthProvince } = kidInfoSummary

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
          gap: tokens.margin.L,
        }}
        onPress={onPress}
        android_ripple={{
          borderless: true,
          color: tokens.colors.ripple,
        }}
        disabled={disabled}
      >
        {/* Avatar */}
        <AvatarDisplay
          avatarType="kid"
          id={kidInfoSummary.id}
          size={tokens.iconSize.XL}
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
            {getDisplayDate(dateOfBirth)} ({getDisplayCurrentAge(dateOfBirth)})
          </Typography>
          <Typography
            variant={{
              size: 'captionS',
              textStyling: {
                italic: 'italic',
              },
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            {birthCity}, {birthProvince}
          </Typography>
        </View>
      </Pressable>
    </View>
  )
}

export default SinglePosyanduKidInfoSummaryCard
