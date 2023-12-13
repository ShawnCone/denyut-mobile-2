import { ReactNode } from 'react'
import { Pressable, PressableProps } from 'react-native'
import Typography, { TypographyProps } from './Typography'
import { tokens } from './tokens/tokens'

type ClickableTypographyProps = {
  pressableProps?: PressableProps
  typographyProps?: TypographyProps
  children?: ReactNode
}

function ClickableTypography({
  pressableProps,
  typographyProps,
  children,
}: ClickableTypographyProps) {
  return (
    <Pressable {...pressableProps}>
      <Typography
        style={[
          {
            color: tokens.colors.primary.dark,
          },
          typographyProps?.style ?? {},
        ]}
        {...typographyProps}
      >
        {children}
      </Typography>
    </Pressable>
  )
}

export default ClickableTypography
