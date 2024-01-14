import {
  BaseStackNavigationScreenOptions,
  DarkHeaderStackNavigationScreenOptions,
} from '@/design-system/NavigationScreenOptions'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MainTabParamsList } from '../main-tab'
import NewPosyanduSearchScreen from './NewPosyanduSearch/NewPosyanduSearchScreen'
import PosyanduHomeScreen from './PosyanduHome/PosyanduHomeScreen'
import PosyanduDetailsContent from './posyandu-details-stack/posyandu-details-content'
import { PosyanduStack } from './posyandu-stack'

type PosyanduStackContentProps = BottomTabScreenProps<
  MainTabParamsList,
  'Posyandu'
>

function PosyanduStackContent({ route }: PosyanduStackContentProps) {
  return (
    <PosyanduStack.Navigator
      initialRouteName="PosyanduHome"
      screenOptions={BaseStackNavigationScreenOptions}
    >
      <PosyanduStack.Screen
        name="PosyanduHome"
        component={PosyanduHomeScreen}
        options={{
          ...DarkHeaderStackNavigationScreenOptions,
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
      <PosyanduStack.Screen
        name="PosyanduDetails"
        component={PosyanduDetailsContent}
        options={{
          headerShown: false,
        }}
      />
    </PosyanduStack.Navigator>
  )
}

export default PosyanduStackContent
