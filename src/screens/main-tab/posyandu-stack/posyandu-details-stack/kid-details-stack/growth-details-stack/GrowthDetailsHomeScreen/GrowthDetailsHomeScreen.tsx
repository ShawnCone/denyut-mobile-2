import { useGrowthDetailsContext } from '@/context/GrowthDetailsContext'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { KidDetailsStackParamsList } from '../../kid-details-stack'
import { GrowthDetailsStackParamsList } from '../growth-details-stack'
import { usePrintGrowthData } from '../utils'
import DeleteGrowthRecordButton from './DeleteGrowthRecordButton'

type GrowthDetailsHomeScreenProps = NativeStackScreenProps<
  GrowthDetailsStackParamsList,
  'growthDetailsHome'
>
function GrowthDetailsHomeScreen({ navigation }: GrowthDetailsHomeScreenProps) {
  const { growthDetails } = useGrowthDetailsContext()

  function goBackSafe() {
    // Don't go to new growth record screen
    const parentNavigation = navigation.getParent()
    const routeToAvoid: keyof KidDetailsStackParamsList = 'createGrowthRecord'
    const fallbackRoute: keyof KidDetailsStackParamsList = 'kidDetailsHome'
    const parentRoutes = parentNavigation?.getState().routes
    const previousParentRoute = parentRoutes?.[parentRoutes.length - 2]

    if (parentNavigation && previousParentRoute?.name === routeToAvoid) {
      parentNavigation.navigate(fallbackRoute)
      return
    }

    navigation.goBack()
  }

  const printGrowthDetails = usePrintGrowthData()

  return (
    <View>
      <DenyutButton title="Go back" onPress={goBackSafe} />
      <DenyutButton title="Print growth details" onPress={printGrowthDetails} />
      <Typography>
        Home screen for growth details {growthDetails.recordId}
      </Typography>
      <DeleteGrowthRecordButton onSuccess={goBackSafe} />
    </View>
  )
}

export default GrowthDetailsHomeScreen
