import GrowthInterpretationCard from './GrowthInterpretationCard'
import WeightSpeedometerGraph from './WeightSpeedometerGraph'

function WeightEvaluationCard() {
  return (
    <GrowthInterpretationCard mainTitle="Kenaikan Berat Badan">
      <WeightSpeedometerGraph
        targetIncrease={100}
        weightIncreaseFulfilled={false}
        weightIncreaseGrams={50}
      />
    </GrowthInterpretationCard>
  )
}

export default WeightEvaluationCard
