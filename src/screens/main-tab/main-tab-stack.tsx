import { useAuth } from '@/context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button } from 'react-native'
import { RootStackParamsList } from '../root-stack'
import HomeScreen from './HomeScreen'

const MainTab = createBottomTabNavigator()

type MainTabProps = NativeStackScreenProps<
  RootStackParamsList,
  'Main',
  'RootStack'
>

export function MainTabContent(_props: MainTabProps) {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Profile" component={LogoutButton} />
    </MainTab.Navigator>
  )
}

function LogoutButton() {
  const { signOut } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return <Button title="Sign out" onPress={handleSignOut} />
}
