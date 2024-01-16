import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import SKDNValidMonthsList from './SKDNValidMonthsList'

function PosyanduSKDNGeneationScreen() {
  return (
    <View
      style={{
        backgroundColor: tokens.colors.neutral.white,
        flex: 1,
      }}
    >
      <SKDNValidMonthsList />
    </View>
  )
}

export default PosyanduSKDNGeneationScreen
