import { KidInfoContextProvider } from '@/context/KidInfoContext'
import {
  BaseStackNavigationScreenOptions,
  DarkHeaderStackNavigationScreenOptions,
} from '@/design-system/NavigationScreenOptions'
import Typography from '@/design-system/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import CreateGrowthRecordScreen from './KidDetailsHomeScreen/CreateGrowthRecordScreen/CreateGrowthRecordScreen'
import GrowthHistoryScreen from './KidDetailsHomeScreen/GrowthHistoryScreen'
import KidDetailsHomeScreen from './KidDetailsHomeScreen/KidDetailsHomeScreen'
import UpdateKidProfileScreen from './UpdateKidProfileScreen/UpdateKidProfileScreen'
import { KidDetailsStack } from './kid-details-stack'

type KidDetailsContentProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'KidDetailsStack'
>

function KidDetailsContent({ route }: KidDetailsContentProps) {
  const { initialRoute, kidId } = route.params

  return (
    <KidInfoContextProvider selectedKidId={kidId}>
      <KidDetailsStack.Navigator
        initialRouteName={initialRoute}
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
          }}
        >
          {_ => (
            <View>
              <Typography>Growth Details Stack</Typography>
            </View>
          )}
        </KidDetailsStack.Screen>
      </KidDetailsStack.Navigator>
    </KidInfoContextProvider>
  )
}

export default KidDetailsContent
