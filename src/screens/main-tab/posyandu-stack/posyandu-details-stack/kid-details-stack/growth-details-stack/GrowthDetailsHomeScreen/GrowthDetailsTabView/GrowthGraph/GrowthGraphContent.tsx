import { useKidInfoContext } from '@/context/KidInfoContext'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import {
  GrowthMeasurementTypes,
  getGrowthMeasurementTypeLabel,
} from '../../../utils'
import EmptyValueMeasurementCardContent from '../EmptyValueCardContent'
import { getGrowthMeasurementTypeUnit } from '../utils'
import GrowthGraphLegend from './GrowthGraphLegend'
import GrowthGraphRaw from './GrowthGraphRaw'
import { getSexGraphColor, useGrowthGraphData } from './utils'

type GrowthGraphContentProps = {
  measurementType: GrowthMeasurementTypes
}
function GrowthGraphContent({ measurementType }: GrowthGraphContentProps) {
  const {
    kidInfo: { sex },
  } = useKidInfoContext()

  const {
    data: growthGraphData,
    isPending,
    isError,
    refetch,
  } = useGrowthGraphData(measurementType)

  if (isPending) {
    return <LoadingIndicator />
  }
  if (isError) {
    return (
      <ErrorIndicator
        message="Gagal memuat data grafik pertumbuhan"
        onRetry={refetch}
      />
    )
  }

  if (!growthGraphData) {
    return (
      <EmptyValueMeasurementCardContent
        measurementName={getGrowthMeasurementTypeLabel(measurementType)}
      />
    )
  }

  const { standardData, measurementValue, measurementMonthOld } =
    growthGraphData

  return (
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
  )
}

export default GrowthGraphContent
