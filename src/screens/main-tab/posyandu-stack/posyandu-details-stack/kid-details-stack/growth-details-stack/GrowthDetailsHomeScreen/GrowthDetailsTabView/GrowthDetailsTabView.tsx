import { useMeasure } from '@/utils/useMeasure'
import { Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'

function GrowthDetailsTabView() {
  const { measurements: containerMeasurements, onLayout } = useMeasure()
  return (
    <View
      style={{
        flex: 1,
      }}
      onLayout={onLayout}
    >
      <PagerView
        initialPage={1}
        style={{
          width: containerMeasurements?.width,
          height: containerMeasurements?.height,
        }}
        collapsable={false}
      >
        <View key="1" collapsable={false}>
          <Text>First page</Text>
        </View>
        <View key="2" collapsable={false}>
          <Text>Second page</Text>
        </View>
      </PagerView>
    </View>
  )
}

export default GrowthDetailsTabView
