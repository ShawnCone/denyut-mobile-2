import { useKidInfoContext } from '@/context/KidInfoContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import { getLineColorForStandardCurves, getSexGraphColor } from './utils'

function GrowthGraphLegend() {
  const {
    kidInfo: { sex },
  } = useKidInfoContext()

  return (
    <View
      style={{
        backgroundColor: getSexGraphColor(sex).light,
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.padding.M,
        borderRadius: tokens.borderRadius.S,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.margin.M,
        }}
      >
        <SingleLegendBoxLabel
          label="Mean"
          color={getLineColorForStandardCurves('SD0')}
        />
        <SingleLegendBoxLabel
          label="SD +1 & -1"
          color={getLineColorForStandardCurves('SD1')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.margin.M,
        }}
      >
        <SingleLegendBoxLabel
          label="SD +2 & -2"
          color={getLineColorForStandardCurves('SD2')}
        />
        <SingleLegendBoxLabel
          label="SD +3 & -3"
          color={getLineColorForStandardCurves('SD3')}
        />
      </View>
    </View>
  )
}

type SingleLegendBoxLabelProps = {
  label: string
  color: string
}
function SingleLegendBoxLabel({ label, color }: SingleLegendBoxLabelProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.margin.S,
      }}
    >
      <View
        style={{
          height: tokens.iconSize.S,
          width: tokens.iconSize.S,
          borderRadius: 2,
          backgroundColor: color,
        }}
      />
      <Typography
        variant={{
          size: 'caption',
        }}
      >
        {label}
      </Typography>
    </View>
  )
}

export default GrowthGraphLegend
