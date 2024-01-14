import { BaseStackNavigationScreenOptions } from '@/design-system/NavigationScreenOptions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { KidDetailsStackParamsList } from '../kid-details-stack'
import EditGrowthDetailsScreen from './EditGrowthDetailsScreen/EditGrowthDetailsScreen'
import GrowthDetailsHomeScreen from './GrowthDetailsHomeScreen/GrowthDetailsHomeScreen'
import { GrowthDetailsStack } from './growth-details-stack'
import { GrowthDetailsContextProvider } from './utils'

type GrowthDetailsContentProps = NativeStackScreenProps<
  KidDetailsStackParamsList,
  'growthRecordDetails'
>

function GrowthDetailsContent({ route }: GrowthDetailsContentProps) {
  const { recordId } = route.params

  return (
    <GrowthDetailsContextProvider recordId={recordId}>
      <GrowthDetailsStack.Navigator
        initialRouteName="growthDetailsHome"
        screenOptions={BaseStackNavigationScreenOptions}
      >
        <GrowthDetailsStack.Screen
          name="growthDetailsHome"
          component={GrowthDetailsHomeScreen}
          options={{
            headerTitle: 'Detail Pertumbuhan',
            headerBackVisible: false,
          }}
        />
        <GrowthDetailsStack.Screen
          name="editGrowthDetails"
          component={EditGrowthDetailsScreen}
          options={{
            headerTitle: 'Ubah Detail Pertumbuhan',
          }}
        />
      </GrowthDetailsStack.Navigator>
    </GrowthDetailsContextProvider>
  )
}

export default GrowthDetailsContent
