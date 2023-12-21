import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { ReactNode } from 'react'
import { Pressable, View } from 'react-native'

type SingleRegularMenuCardProps = {
  title: string
  description: string
  onPress: () => void
  icon: ReactNode
}

function SingleRegularMenuCard({
  title,
  description,
  onPress,
  icon,
}: SingleRegularMenuCardProps) {
  // Wrap pressable in view for android ripple effect
  return (
    <View
      style={{
        borderRadius: tokens.borderRadius.M,
        borderColor: tokens.colors.neutral.light,
        borderWidth: tokens.borderWidth.S,
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.margin.L,
          padding: tokens.padding.L,
        }}
        onPress={onPress}
        android_ripple={{
          borderless: true,
          color: tokens.colors.ripple,
        }}
      >
        <View
          style={{
            padding: tokens.padding.M,
            backgroundColor: tokens.colors.primary.extraLight,
            borderColor: tokens.colors.primary.normal,
            borderWidth: tokens.borderWidth.S,
            borderRadius: tokens.borderRadius.M,
          }}
        >
          {icon}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Typography
            variant={{ size: 'caption', textStyling: { weight: 'bold' } }}
            style={{}}
          >
            {title}
          </Typography>
          <Typography
            variant={{ size: 'captionS' }}
            style={{
              textAlignVertical: 'top',
              color: tokens.colors.neutral.normal,
              flexWrap: 'wrap',
            }}
            numberOfLines={2}
          >
            {description}
          </Typography>
        </View>
      </Pressable>
    </View>
  )
}

export default SingleRegularMenuCard
