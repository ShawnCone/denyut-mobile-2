import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography, { TypographyVariants } from '../Typography'
import { tokens } from '../tokens/tokens'

type FormFieldContainerProps = {
  label?: string
  errorMessage?: string
  required?: boolean
  children: ReactNode
}

export type FormFieldContainerWithoutChildren = Omit<
  FormFieldContainerProps,
  'children'
>

function FormFieldContainer({
  label,
  errorMessage,
  required,
  children,
}: FormFieldContainerProps) {
  const styles = StyleSheet.create({
    error: {
      color: tokens.colors.destructive.normal,
      marginTop: tokens.margin.S,
    },
  })

  const labelTypographyVariant: TypographyVariants = {
    size: 'caption',
  }

  return (
    <View>
      {label && (
        <Typography variant={labelTypographyVariant}>
          {label}
          <Typography
            variant={labelTypographyVariant}
            style={{
              color: tokens.colors.destructive.normal,
            }}
          >
            {required && '*'}
          </Typography>
        </Typography>
      )}
      <View
        style={{
          marginTop: tokens.margin.S,
        }}
      >
        {children}
      </View>
      {errorMessage && (
        <Typography
          variant={{
            size: 'captionS',
          }}
          style={styles.error}
        >
          {errorMessage}
        </Typography>
      )}
    </View>
  )
}

export default FormFieldContainer
