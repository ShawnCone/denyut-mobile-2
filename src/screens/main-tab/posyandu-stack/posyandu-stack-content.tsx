import { BaseStackNavigationScreenOptions } from '@/design-system/BaseStackNavigationScreenOptions'
import NewPosyanduSearchScreen from './NewPosyanduSearchScreen'
import PosyanduDetailsScreen from './PosyanduDetailsScreen'
import PosyanduHomeScreen from './PosyanduHome/PosyanduHomeScreen'
import { PosyanduStack } from './posyandu-stack'

function PosyanduStackContent() {
  return (
    <PosyanduStack.Navigator
      initialRouteName="PosyanduHome"
      screenOptions={BaseStackNavigationScreenOptions}
    >
      <PosyanduStack.Screen
        name="PosyanduHome"
        component={PosyanduHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <PosyanduStack.Screen
        name="PosyanduDetail"
        component={PosyanduDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <PosyanduStack.Screen
        name="NewPosyanduSearch"
        component={NewPosyanduSearchScreen}
        options={{
          headerTitle: 'Tambah Posyandu',
        }}
      />
    </PosyanduStack.Navigator>
  )
}

export default PosyanduStackContent
