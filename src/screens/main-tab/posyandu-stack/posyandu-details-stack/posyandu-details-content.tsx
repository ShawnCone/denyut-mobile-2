import { PosyanduInfoContextProvider } from '@/context/PosyanduInfoContextProvider'
import { BaseStackNavigationScreenOptions } from '@/design-system/BaseStackNavigationScreenOptions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PosyanduStackParamsList } from '../posyandu-stack'
import PosyanduDetailsScreen from './PosyanduDetailsHomeScreen'
import PosyanduMembersScreen from './PosyanduMembers/PosyanduMembersScreen'
import { PosyanduDetailsStack } from './posyandu-details-stack'

type PosyanduDetailsContentProps = NativeStackScreenProps<
  PosyanduStackParamsList,
  'PosyanduDetails'
>

function PosyanduDetailsContent({ route }: PosyanduDetailsContentProps) {
  const { posyanduId } = route.params
  return (
    <PosyanduInfoContextProvider selectedPosyanduId={posyanduId}>
      <PosyanduDetailsStack.Navigator
        initialRouteName="PosyanduDetailsHome"
        screenOptions={BaseStackNavigationScreenOptions}
      >
        <PosyanduDetailsStack.Screen
          name="PosyanduDetailsHome"
          component={PosyanduDetailsScreen}
        />
        <PosyanduDetailsStack.Screen
          name="PosyanduDetailsMembers"
          component={PosyanduMembersScreen}
        />
      </PosyanduDetailsStack.Navigator>
    </PosyanduInfoContextProvider>
  )
}

export default PosyanduDetailsContent
