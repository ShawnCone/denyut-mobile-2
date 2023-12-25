import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type LoadingIndicatorProps = {
  fullPage?: boolean
  message?: string
  size?: number
}
function LoadingIndicator({
  fullPage = true,
  message,
  size,
}: LoadingIndicatorProps) {
  return (
    <View
      style={[
        styles.container,
        {
          flex: fullPage ? 1 : undefined,
        },
      ]}
    >
      <ActivityIndicator
        size={size ?? 'large'}
        color={tokens.colors.primary.dark}
      />
      {message && (
        <Typography
          variant={{
            size: 'caption',
          }}
          style={{
            color: tokens.colors.neutral.normal,
          }}
        >
          {message}
        </Typography>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: tokens.margin.M,
    alignItems: 'center',
    backgroundColor: tokens.colors.neutral.white,
  },
})

export default LoadingIndicator
