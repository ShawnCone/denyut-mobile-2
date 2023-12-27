import { ReactNode } from 'react'
import { View } from 'react-native'
import { tokens } from '../tokens/tokens'

export function SingleRowFieldContainer({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: tokens.margin.L,
      }}
    >
      {children}
    </View>
  )
}

export function SingleFormFieldContainerWithinRow({
  children,
}: {
  children: ReactNode
}) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
    </View>
  )
}
