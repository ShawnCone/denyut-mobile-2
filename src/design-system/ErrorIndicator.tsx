import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import ClickableTypography from './ClickableTypography'
import Typography from './Typography'
import { tokens } from './tokens/tokens'

type ErrorIndicatorProps = {
  fullPage?: boolean
  message?: string
  onRetry?: () => void
  darkMode?: boolean
}

function ErrorIndicator({
  fullPage,
  message,
  onRetry,
  darkMode,
}: ErrorIndicatorProps) {
  return (
    <View
      style={[
        styles.container,
        {
          flex: fullPage ? 1 : undefined,
          backgroundColor: darkMode
            ? tokens.colors.primary.dark
            : tokens.colors.neutral.white,
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
          textAlign: 'center',
          color: darkMode
            ? tokens.colors.neutral.white
            : tokens.colors.neutral.normal,
        }}
      >
        Terjadi Kesalahan{message && `: ${message}`}
      </Typography>
      {typeof onRetry === 'function' && (
        <ClickableTypography
          typographyProps={{
            variant: {
              size: 'caption',
              textStyling: {
                weight: 'bold',
              },
            },
            style: {
              color: darkMode
                ? tokens.colors.neutral.white
                : tokens.colors.neutral.normal,
            },
          }}
          pressableProps={{
            onPress: onRetry,
          }}
        >
          Coba lagi
        </ClickableTypography>
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
    paddingHorizontal: tokens.padding.L,
  },
})

export default ErrorIndicator
