import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { ReactNode } from 'react'
import { Pressable, View } from 'react-native'
import { PADDING_HORIZONTAL } from './utils'

type SingleProfileMenuItemProps = {
  icon: ReactNode
  title: string
  description: string
  onPress?: () => void
}

function SingleProfileMenuItem({
  icon,
  title,
  description,
  onPress,
}: SingleProfileMenuItemProps) {
  return (
    <View
      style={{
        borderRadius: tokens.borderRadius.M,
        borderColor: tokens.colors.transparent,
        borderWidth: 1,
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.margin.M,
          paddingVertical: tokens.padding.M,
          paddingHorizontal: PADDING_HORIZONTAL,
        }}
        onPress={onPress}
        android_ripple={{
          borderless: true,
          color: tokens.colors.ripple,
        }}
      >
        {icon}
        <View>
          <Typography
            variant={{
              size: 'caption',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant={{
              size: 'caption',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            {description}
          </Typography>
        </View>
      </Pressable>
    </View>
  )
}

export default SingleProfileMenuItem
