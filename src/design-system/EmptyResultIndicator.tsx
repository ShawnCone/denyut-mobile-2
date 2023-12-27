import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type EmptyResultIndicatorProps = {
  fullPage?: boolean
  message?: string
  actionComponent?: ReactNode
}
function EmptyResultIndicator({
  fullPage,
  message,
  actionComponent,
}: EmptyResultIndicatorProps) {
  return (
    <View
      style={[
        styles.container,
        {
          flex: fullPage ? 1 : undefined,
        },
      ]}
    >
      <Typography
        variant={{
          size: 'caption',
        }}
        style={{
          textAlign: 'center',
          color: tokens.colors.neutral.normal,
        }}
      >
        {message ?? 'Hasil pencarian tidak ditemukan'}
      </Typography>
      {actionComponent && actionComponent}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: tokens.margin.M,
    alignItems: 'center',
  },
})

export default EmptyResultIndicator
