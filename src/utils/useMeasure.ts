import { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

export function useMeasure() {
  const [measurements, setMeasurements] = useState<{
    x: number
    y: number
    width: number
    height: number
  }>()

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setMeasurements({ x, y, width, height })
  }

  return { measurements, onLayout }
}
