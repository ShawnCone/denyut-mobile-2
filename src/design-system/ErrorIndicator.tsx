import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import DenyutButton from './DenyutButton'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type ErrorIndicatorProps = {
  fullPage?: boolean
  message?: string
  onRetry?: () => void
}

function ErrorIndicator({ fullPage, message, onRetry }: ErrorIndicatorProps) {
  return (
    <View
      style={[
        styles.container,
        {
          flex: fullPage ? 1 : undefined,
        },
      ]}
    >
      <Ionicons
        name="alert-circle"
        size={tokens.iconSize.L}
        color={tokens.colors.destructive.normal}
      />

      <Typography
        variant={{
          size: 'caption',
        }}
        style={{
          color: tokens.colors.neutral.normal,
        }}
      >
        Terjadi Kesalahan{message && `: ${message}`}
      </Typography>
      {typeof onRetry === 'function' && (
        <DenyutButton
          variant="primary"
          size="small"
          onPress={onRetry}
          title="Coba lagi"
        />
      )}
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

export default ErrorIndicator
