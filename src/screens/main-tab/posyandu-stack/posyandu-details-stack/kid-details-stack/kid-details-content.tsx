import { BaseStackNavigationScreenOptions } from '@/design-system/NavigationScreenOptions'
import Typography from '@/design-system/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import { KidDetailsStack } from './kid-details-stack'

type KidDetailsContentProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'KidDetailsStack'
>

function KidDetailsContent({ route }: KidDetailsContentProps) {
  const { kidId, initialRoute } = route.params

  return (
    <KidDetailsStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={BaseStackNavigationScreenOptions}
    >
      <KidDetailsStack.Screen name="kidDetailsHome">
        {_ => (
          <View>
            <Typography>Kid details screen {kidId}</Typography>
          </View>
        )}
      </KidDetailsStack.Screen>
      <KidDetailsStack.Screen
        name="updateKidDetails"
        options={{
          title: 'Ubah Profil Anak',
        }}
      >
        {_ => (
          <View>
            <Typography>Update kid profile screen</Typography>
          </View>
        )}
      </KidDetailsStack.Screen>
      <KidDetailsStack.Screen
        name="newGrowthRecord"
        options={{
          title: 'Tambah Riwayat Pertumbuhan',
        }}
      >
        {_ => (
          <View>
            <Typography>Add new growth record</Typography>
          </View>
        )}
      </KidDetailsStack.Screen>
      <KidDetailsStack.Screen
        name="growthHistory"
        options={{
          title: 'Riwayat Pertumbuhan',
        }}
      >
        {_ => (
          <View>
            <Typography>Growth History</Typography>
          </View>
        )}
      </KidDetailsStack.Screen>
    </KidDetailsStack.Navigator>
  )
}

export default KidDetailsContent
