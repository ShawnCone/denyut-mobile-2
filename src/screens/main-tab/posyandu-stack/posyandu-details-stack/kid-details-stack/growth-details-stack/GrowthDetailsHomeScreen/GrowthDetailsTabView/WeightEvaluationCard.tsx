import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import EmptyValueMeasurementCardContent from './EmptyValueCardContent'
import GrowthInterpretationCard from './GrowthInterpretationCard'
import WeightSpeedometerGraph from './WeightSpeedometerGraph'
import { useWeightEvaluation } from './utils'

function WeightEvaluationCard() {
  return (
    <GrowthInterpretationCard mainTitle="Kenaikan Berat Badan">
      <WeightEvalationCardContent />
    </GrowthInterpretationCard>
  )
}

function WeightEvalationCardContent() {
  const { data, isPending, isError, refetch } = useWeightEvaluation()

  if (isPending)
    return (
      <View
        style={{
          paddingVertical: tokens.padding.L,
        }}
      >
        <LoadingIndicator />
      </View>
    )

  if (isError)
    return (
      <View
        style={{
          paddingVertical: tokens.padding.L,
        }}
      >
        <ErrorIndicator
          message="Tidak bisa memuat evaluasi kenaikan berat badan"
          onRetry={refetch}
        />
      </View>
    )

  if (data === null || typeof data === 'undefined') {
    return (
      <EmptyValueMeasurementCardContent measurementName="kenaikan berat badan" />
    )
  }

  return (
    <WeightSpeedometerGraph
      targetIncrease={data.targetIncrease}
      weightIncreaseFulfilled={data.isEnough}
      weightIncreaseGrams={data.increaseInWeight}
    />
  )
}

export default WeightEvaluationCard
