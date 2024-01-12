import { View } from 'react-native'
import NumbersMeasurementCard from './NumbersMeasurementCard'
import { GrowthMeasurementTypes } from './utils'

type SingleGrowthDetailTabProps = {
  measurementType: GrowthMeasurementTypes
}

function SingleGrowthDetailTab({
  measurementType,
}: SingleGrowthDetailTabProps) {
  return (
    <View>
      <NumbersMeasurementCard measurementType={measurementType} />
    </View>
  )
}

export default SingleGrowthDetailTab
