import { View } from 'react-native'
import { tokens } from './tokens/tokens'

function Divider() {
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: tokens.colors.neutral.light,
      }}
    />
  )
}

export default Divider
