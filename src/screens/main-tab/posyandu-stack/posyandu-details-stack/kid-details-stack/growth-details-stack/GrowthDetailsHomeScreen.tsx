import { useGrowthDetailsContext } from '@/context/GrowthDetailsContext'
import Typography from '@/design-system/Typography'
import { View } from 'react-native'

function GrowthDetailsHomeScreen() {
  const { growthDetails } = useGrowthDetailsContext()

  return (
    <View>
      <Typography>
        Home screen for growth details {growthDetails.recordId}
      </Typography>
    </View>
  )
}

export default GrowthDetailsHomeScreen
