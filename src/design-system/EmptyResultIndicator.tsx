import React from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type LoadingIndicatorProps = {
  fullPage?: boolean
  message?: string
}
function EmptyResultIndicator({ fullPage, message }: LoadingIndicatorProps) {
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
