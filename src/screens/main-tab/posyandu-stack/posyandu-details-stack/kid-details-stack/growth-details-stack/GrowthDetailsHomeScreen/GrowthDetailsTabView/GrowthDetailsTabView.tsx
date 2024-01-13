import { tokens } from '@/design-system/tokens/tokens'
import { useMeasure } from '@/utils/useMeasure'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import PagerView from 'react-native-pager-view'
import SingleGrowthDetailTab from './SingleGrowthDetailTab'
import TabSwitcher from './TabSwitcher'
import { GrowthMeasurementTypes, PAGER_VIEW_NAMES } from './utils'

function GrowthDetailsTabView() {
  const { measurements: containerMeasurements, onLayout } = useMeasure()
  const [currentTab, setCurrentTab] = useState<GrowthMeasurementTypes>('weight')

  const pagerViewRef = useRef<PagerView>(null)

  useEffect(() => {
    pagerViewRef.current?.setPage(PAGER_VIEW_NAMES.indexOf(currentTab))
  }, [currentTab])

  return (
    <View
      style={{
        gap: tokens.margin.L,
        flex: 1,
      }}
      onLayout={onLayout}
    >
      <TabSwitcher currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <PagerView
        onPageSelected={event => {
          const newPositionIdx = event.nativeEvent.position
          setCurrentTab(PAGER_VIEW_NAMES[newPositionIdx])
        }}
        ref={pagerViewRef}
        style={{
          width: containerMeasurements?.width,
          height: containerMeasurements?.height,
          flex: 1,
        }}
        collapsable={false}
      >
        {PAGER_VIEW_NAMES.map(name => {
          return (
            <View
              key={name}
              style={{
                flex: 1,
              }}
            >
              <SingleGrowthDetailTab measurementType={name} />
            </View>
          )
        })}
      </PagerView>
    </View>
  )
}

export default GrowthDetailsTabView
