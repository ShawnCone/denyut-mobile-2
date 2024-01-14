import { KidInfoContextProvider } from '@/context/KidInfoContext'
import {
  BaseStackNavigationScreenOptions,
  DarkHeaderStackNavigationScreenOptions,
} from '@/design-system/NavigationScreenOptions'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import CreateGrowthRecordScreen from './KidDetailsHomeScreen/CreateGrowthRecordScreen/CreateGrowthRecordScreen'
import GrowthHistoryScreen from './KidDetailsHomeScreen/GrowthHistoryScreen'
import KidDetailsHomeScreen from './KidDetailsHomeScreen/KidDetailsHomeScreen'
import UpdateKidProfileScreen from './UpdateKidProfileScreen/UpdateKidProfileScreen'
import GrowthDetailsContent from './growth-details-stack/growth-details-content'
import { KidDetailsStack } from './kid-details-stack'

type KidDetailsContentProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'KidDetailsStack'
>

function KidDetailsContent({ route }: KidDetailsContentProps) {
  const { kidId } = route.params

  return (
    <KidInfoContextProvider selectedKidId={kidId}>
      <KidDetailsStack.Navigator
        initialRouteName="kidDetailsHome"
        screenOptions={BaseStackNavigationScreenOptions}
      >
        <KidDetailsStack.Screen
          name="kidDetailsHome"
          component={KidDetailsHomeScreen}
          options={{
            ...DarkHeaderStackNavigationScreenOptions,
            headerShown: false,
          }}
        />
        <KidDetailsStack.Screen
          name="updateKidProfile"
          options={{
            title: 'Ubah Profil Anak',
          }}
          component={UpdateKidProfileScreen}
        />
        <KidDetailsStack.Screen
          name="createGrowthRecord"
          options={{
            title: 'Tambah Riwayat Pertumbuhan',
          }}
          component={CreateGrowthRecordScreen}
        />
        <KidDetailsStack.Screen
          name="growthHistory"
          options={{
            title: 'Riwayat Pertumbuhan',
          }}
          component={GrowthHistoryScreen}
        />

        <KidDetailsStack.Screen
          name="growthRecordDetails"
          options={{
            title: 'Growth Details stack',
            headerShown: false,
          }}
          component={GrowthDetailsContent}
        />
      </KidDetailsStack.Navigator>
    </KidInfoContextProvider>
  )
}

export default KidDetailsContent
