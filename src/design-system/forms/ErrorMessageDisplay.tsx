import Typography from '../Typography'
import { tokens } from '../tokens/tokens'

type ErrorMessageDisplayProps = {
  message: string
}

function ErrorMessageDisplay({ message }: ErrorMessageDisplayProps) {
  return (
    <Typography
      style={{
        color: tokens.colors.destructive.normal,
      }}
      variant={{
        size: 'caption',
      }}
    >
      {message}
    </Typography>
  )
}

export default ErrorMessageDisplay
