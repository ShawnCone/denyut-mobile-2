import { View } from 'react-native'
import { tokens } from './tokens/tokens'

function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: tokens.colors.neutral.light,
      }}
    />
  )
}

export default Divider
