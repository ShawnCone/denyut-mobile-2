import { useKidInfoContext } from '@/context/KidInfoContext'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import GrowthInterpretationCard from '../GrowthInterpretationCard'
import { GrowthMeasurementTypes } from '../utils'
import GrowthGraphRaw from './GrowthGraphRaw'
import { getSexGraphColor } from './utils'

type GrowthGraphProps = {
  measurementType: GrowthMeasurementTypes
}
function GrowthGraph({ measurementType }: GrowthGraphProps) {
  const {
    kidInfo: { sex },
  } = useKidInfoContext()
  return (
    <GrowthInterpretationCard
      mainTitle="Grafik Pertumbuhan"
      subtitle={`Grafik dibuat berdasarkan data ${
        measurementType === 'weight' ? 'buku KMS' : 'WHO'
      }`}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: getSexGraphColor(sex),
          padding: tokens.padding.XL,
          borderRadius: tokens.borderRadius.M,
        }}
      >
        <View
          style={{
            backgroundColor: tokens.colors.neutral.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GrowthGraphRaw measurementType={measurementType} />
        </View>
      </View>
    </GrowthInterpretationCard>
  )
}

export default GrowthGraph
