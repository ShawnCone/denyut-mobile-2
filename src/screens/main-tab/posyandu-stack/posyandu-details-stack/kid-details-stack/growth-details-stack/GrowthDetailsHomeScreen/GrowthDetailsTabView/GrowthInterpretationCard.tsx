import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { ReactNode } from 'react'
import { View } from 'react-native'

type GrowthInterpretationCardProps = {
  mainTitle: string
  subtitle?: string
  rightSideTitle?: string
  children: ReactNode
}

function GrowthInterpretationCard({
  mainTitle,
  subtitle,
  rightSideTitle,
  children,
}: GrowthInterpretationCardProps) {
  return (
    <View
      style={{
        backgroundColor: tokens.colors.neutral.white,
        padding: tokens.padding.L,
        gap: tokens.margin.L,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant={{
              size: 'paragraph',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            {mainTitle}
          </Typography>
          {rightSideTitle && (
            <Typography
              variant={{
                size: 'paragraphS',
              }}
              style={{
                color: tokens.colors.neutral.normal,
              }}
            >
              {rightSideTitle}
            </Typography>
          )}
        </View>
        {subtitle && (
          <Typography
            variant={{
              size: 'captionS',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </View>

      {children}
    </View>
  )
}

export default GrowthInterpretationCard
