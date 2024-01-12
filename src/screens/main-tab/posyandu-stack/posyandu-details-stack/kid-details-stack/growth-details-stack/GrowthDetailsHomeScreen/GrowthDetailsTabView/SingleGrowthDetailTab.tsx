import { tokens } from '@/design-system/tokens/tokens'
import { ScrollView } from 'react-native'
import NumbersMeasurementCard from './NumbersMeasurementCard'
import WeightEvaluationCard from './WeightEvaluationCard'
import { GrowthMeasurementTypes } from './utils'

type SingleGrowthDetailTabProps = {
  measurementType: GrowthMeasurementTypes
}

function SingleGrowthDetailTab({
  measurementType,
}: SingleGrowthDetailTabProps) {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        gap: tokens.margin.L,
      }}
    >
      <NumbersMeasurementCard measurementType={measurementType} />
      {measurementType === 'weight' && <WeightEvaluationCard />}
    </ScrollView>
  )
}

export default SingleGrowthDetailTab
