import { GrowthInterpretationSeverity } from '@/client/denyut-posyandu-be/__generated__/graphql'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import { getSeverityStyle } from './utils'

const MAX_PILL_WIDTH = 200

type SingleSeverityPillProps = {
  label: string
  severity: GrowthInterpretationSeverity
}

function SingleSeverityPill({ label, severity }: SingleSeverityPillProps) {
  const { backgroundColor, color } = getSeverityStyle(severity)
  return (
    <View
      style={{
        backgroundColor,
        borderRadius: tokens.borderRadius.full,
        paddingHorizontal: tokens.padding.L,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: tokens.padding.M,
        borderWidth: tokens.borderWidth.M,
        borderColor: color,
      }}
    >
      <Typography
        style={{
          color,
          maxWidth: MAX_PILL_WIDTH,
          textAlign: 'center',
        }}
        variant={{
          size: 'captionS',
        }}
        numberOfLines={4}
      >
        {label}
      </Typography>
    </View>
  )
}

export default SingleSeverityPill
