import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'

import { useAuth, useProtectedAuth } from '@/context/AuthContext'
import { RootStackParamsList } from '../root-stack'
import HomeScreen from './HomeScreen'

import {
  UserInfoContextProvider,
  useCreateUserInfo,
  useUserInfo,
} from '@/context/UserInfoContext'

const MainTab = createBottomTabNavigator()

type MainTabProps = NativeStackScreenProps<
  RootStackParamsList,
  'Main',
  'RootStack'
>

export function MainTabContent(_props: MainTabProps) {
  const { user } = useProtectedAuth()
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo(user)
  const { mutate: createUserInfo, isPending: isCreatingUserInfo } =
    useCreateUserInfo()

  if (isLoadingUserInfo) {
    // Loading screen
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (userInfo === null || typeof userInfo === 'undefined') {
    // Return the form for setting up user info
    return (
      <View>
        <Text>Fill in the form</Text>
        <Button
          title="Create User Info"
          onPress={() =>
            createUserInfo({
              id: user.id,
              sex: 'female',
              name: 'test',
            })
          }
        />
        {isCreatingUserInfo && <Text>Creating user info...</Text>}
      </View>
    )
  }

  return (
    <UserInfoContextProvider value={{ userInfo }}>
      <MainTab.Navigator>
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Profile" component={LogoutButton} />
      </MainTab.Navigator>
    </UserInfoContextProvider>
  )
}

function LogoutButton() {
  const { signOut } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return <Button title="Sign out" onPress={handleSignOut} />
}
