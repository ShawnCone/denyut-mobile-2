import { GrowthDetailsContextProvider } from '@/context/GrowthDetailsContext'
import { BaseStackNavigationScreenOptions } from '@/design-system/NavigationScreenOptions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { KidDetailsStackParamsList } from '../kid-details-stack'
import GrowthDetailsHomeScreen from './GrowthDetailsHomeScreen'
import { GrowthDetailsStack } from './growth-details-stack'

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
            headerShown: false,
          }}
        />
      </GrowthDetailsStack.Navigator>
    </GrowthDetailsContextProvider>
  )
}

export default GrowthDetailsContent
