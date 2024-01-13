import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'

function EmptyValueMeasurementCardContent({
  measurementName,
}: {
  measurementName: string
}) {
  return (
    <View
      style={{
        paddingVertical: tokens.padding.M,
        paddingHorizontal: tokens.padding.L,
        borderRadius: tokens.borderRadius.S,
      }}
    >
      <Typography
        variant={{
          size: 'caption',
        }}
        style={{
          textAlign: 'center',
        }}
      >
        Data {measurementName} tidak tersedia
      </Typography>
    </View>
  )
}

export default EmptyValueMeasurementCardContent
