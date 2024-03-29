import { PosyanduInfoContextProvider } from '@/context/PosyanduInfoContext'
import {
  BaseStackNavigationScreenOptions,
  DarkHeaderStackNavigationScreenOptions,
} from '@/design-system/NavigationScreenOptions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PosyanduStackParamsList } from '../posyandu-stack'
import KidRegistrationScreen from './KidRegistrationScreen/KidRegistrationScreen'
import PosyanduDetailsScreen from './PosyanduDetailsHomeScreen/PosyanduDetailsHomeScreen'
import PosyanduDetailsKidsListScreen from './PosyanduDetailsKidsScreen/PosyanduDetailsKidsListScreen'
import ApprovedPosyanduMembersScreen from './PosyanduMembers/ApprovedPosyanduMembers/ApprovedPosyanduMembersScreen'
import PendingPosyanduMembersScreen from './PosyanduMembers/PendingPosyanduMembers/PendingPosyanduMembersScreen'
import PosyanduSKDNGenerationScreen from './PosyanduSKDNGenerationScreen/PosyanduSKDNGenerationScreen'
import SKDNReportDisplayScreen from './SKDNReportDisplayScreen/SKDNReportDisplayScreen'
import KidDetailsContent from './kid-details-stack/kid-details-content'
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
          options={{
            ...DarkHeaderStackNavigationScreenOptions,
            headerShown: false,
          }}
        />
        <PosyanduDetailsStack.Screen
          name="ApprovedPosyanduDetailsMembers"
          component={ApprovedPosyanduMembersScreen}
          options={{
            title: 'Daftar Kader / Staf Posyandu',
          }}
        />
        <PosyanduDetailsStack.Screen
          name="PendingPosyanduDetailsMembers"
          component={PendingPosyanduMembersScreen}
          options={{
            title: 'Permintaan Bergabung',
          }}
        />
        <PosyanduDetailsStack.Screen
          name="KidRegistration"
          component={KidRegistrationScreen}
          options={{
            title: 'Registrasi Anak',
          }}
        />
        <PosyanduDetailsStack.Screen
          name="KidDetailsStack"
          component={KidDetailsContent}
          options={{
            headerShown: false,
          }}
        />
        <PosyanduDetailsStack.Screen
          name="PosyanduDetailsKidsList"
          options={{
            title: 'Daftar Anak',
          }}
          component={PosyanduDetailsKidsListScreen}
        />
        <PosyanduDetailsStack.Screen
          name="PosyanduSKDNGeneration"
          options={{
            title: 'Laporan SKDN',
          }}
          component={PosyanduSKDNGenerationScreen}
        />
        <PosyanduDetailsStack.Screen
          name="SKDNReportDisplayScreen"
          options={{
            title: 'Laporan SKDN',
          }}
          component={SKDNReportDisplayScreen}
        />
      </PosyanduDetailsStack.Navigator>
    </PosyanduInfoContextProvider>
  )
}

export default PosyanduDetailsContent
