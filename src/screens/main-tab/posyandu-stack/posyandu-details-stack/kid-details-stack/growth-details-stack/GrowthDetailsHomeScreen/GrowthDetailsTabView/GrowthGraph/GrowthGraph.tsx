import { GrowthMeasurementTypes } from '../../../utils'
import GrowthInterpretationCard from '../GrowthInterpretationCard'
import GrowthGraphContent from './GrowthGraphContent'

type GrowthGraphProps = {
  measurementType: GrowthMeasurementTypes
}
function GrowthGraph({ measurementType }: GrowthGraphProps) {
  return (
    <GrowthInterpretationCard
      mainTitle="Grafik Pertumbuhan"
      subtitle={`Grafik dibuat berdasarkan data ${
        measurementType === 'weight' ? 'buku KMS' : 'WHO'
      }`}
    >
      <GrowthGraphContent measurementType={measurementType} />
    </GrowthInterpretationCard>
  )
}

export default GrowthGraph
