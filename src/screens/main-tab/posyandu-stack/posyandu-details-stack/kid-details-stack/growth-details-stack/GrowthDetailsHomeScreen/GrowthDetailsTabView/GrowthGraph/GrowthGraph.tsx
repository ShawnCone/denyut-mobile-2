import { useKidInfoContext } from '@/context/KidInfoContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import {
  GrowthMeasurementTypes,
  getGrowthMeasurementTypeLabel,
} from '../../../utils'
import GrowthInterpretationCard from '../GrowthInterpretationCard'
import { getGrowthMeasurementTypeUnit } from '../utils'
import GrowthGraphLegend from './GrowthGraphLegend'
import GrowthGraphRaw from './GrowthGraphRaw'
import { getSexGraphColor } from './utils'

const standardData = [
  {
    ageInMonths: 2,
    SD0: 57.1,
    SD1: 59.1,
    SD2: 61.1,
    SD3: 63.2,
    SD1neg: 55,
    SD2neg: 53,
    SD3neg: 51,
  },
  {
    ageInMonths: 3,
    SD0: 59.8,
    SD1: 61.9,
    SD2: 64,
    SD3: 66.1,
    SD1neg: 57.7,
    SD2neg: 55.6,
    SD3neg: 53.5,
  },
  {
    ageInMonths: 4,
    SD0: 62.1,
    SD1: 64.3,
    SD2: 66.4,
    SD3: 68.6,
    SD1neg: 59.9,
    SD2neg: 57.8,
    SD3neg: 55.6,
  },
  {
    ageInMonths: 5,
    SD0: 64,
    SD1: 66.2,
    SD2: 68.5,
    SD3: 70.7,
    SD1neg: 61.8,
    SD2neg: 59.6,
    SD3neg: 57.4,
  },
  {
    ageInMonths: 6,
    SD0: 65.7,
    SD1: 68,
    SD2: 70.3,
    SD3: 72.5,
    SD1neg: 63.5,
    SD2neg: 61.2,
    SD3neg: 58.9,
  },
  {
    ageInMonths: 7,
    SD0: 67.3,
    SD1: 69.6,
    SD2: 71.9,
    SD3: 74.2,
    SD1neg: 65,
    SD2neg: 62.7,
    SD3neg: 60.3,
  },
  {
    ageInMonths: 8,
    SD0: 68.7,
    SD1: 71.1,
    SD2: 73.5,
    SD3: 75.8,
    SD1neg: 66.4,
    SD2neg: 64,
    SD3neg: 61.7,
  },
  {
    ageInMonths: 9,
    SD0: 70.1,
    SD1: 72.6,
    SD2: 75,
    SD3: 77.4,
    SD1neg: 67.7,
    SD2neg: 65.3,
    SD3neg: 62.9,
  },
  {
    ageInMonths: 10,
    SD0: 71.5,
    SD1: 73.9,
    SD2: 76.4,
    SD3: 78.9,
    SD1neg: 69,
    SD2neg: 66.5,
    SD3neg: 64.1,
  },
  {
    ageInMonths: 11,
    SD0: 72.8,
    SD1: 75.3,
    SD2: 77.8,
    SD3: 80.3,
    SD1neg: 70.3,
    SD2neg: 67.7,
    SD3neg: 65.2,
  },
  {
    ageInMonths: 12,
    SD0: 74,
    SD1: 76.6,
    SD2: 79.2,
    SD3: 81.7,
    SD1neg: 71.4,
    SD2neg: 68.9,
    SD3neg: 66.3,
  },
]

const measurementMonthOld = 7
const measurementValue = 70

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
          backgroundColor: getSexGraphColor(sex).dark,
          paddingHorizontal: tokens.padding.XL,
          paddingVertical: tokens.padding.L,
          borderRadius: tokens.borderRadius.S,
          gap: tokens.margin.M,
        }}
      >
        <View
          style={{
            backgroundColor: tokens.colors.neutral.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GrowthGraphRaw
            measurementType={measurementType}
            measurementMonthOld={measurementMonthOld}
            measurementValue={measurementValue}
            standardData={standardData}
          />
        </View>
        <Typography
          variant={{
            size: 'captionS',
            textStyling: {
              weight: 'bold',
            },
          }}
          style={{
            color: tokens.colors.neutral.white,
            textAlign: 'center',
          }}
        >
          {getGrowthMeasurementTypeLabel(measurementType)} {measurementValue}{' '}
          {getGrowthMeasurementTypeUnit(measurementType)}, Umur:{' '}
          {measurementMonthOld} bulan
        </Typography>
        <GrowthGraphLegend />
      </View>
    </GrowthInterpretationCard>
  )
}

export default GrowthGraph
