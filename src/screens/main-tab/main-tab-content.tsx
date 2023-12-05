import { useProtectedAuth } from '@/context/AuthContext'
import { UserInfoContextProvider, useUserInfo } from '@/context/UserInfoContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'
import { RootStackParamsList } from '../root-stack'
import CreateUserInfoScreen from './CreateUserInfoScreen'
import HomeScreen from './HomeScreen'
import PosyanduScreen from './PosyanduScreen'
import ProfileStackContent from './profile-stack/profile-stack-content'

type MainTabParamsList = {
  Home: undefined
  Posyandu: undefined
  Profile: undefined
}
const MainTab = createBottomTabNavigator<MainTabParamsList>()

type MainTabProps = NativeStackScreenProps<RootStackParamsList, 'Main'>

export function MainTabContent(_props: MainTabProps) {
  const { user } = useProtectedAuth()
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo(user)

  if (isLoadingUserInfo) {
    // Loading screen
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading user info...</Text>
      </View>
    )
  }

  if (userInfo === null || typeof userInfo === 'undefined') {
    // Return the form for setting up user info
    return <CreateUserInfoScreen user={user} />
  }

  return (
    <UserInfoContextProvider value={{ userInfo }}>
      <MainTab.Navigator>
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Posyandu" component={PosyanduScreen} />
        <MainTab.Screen name="Profile" component={ProfileStackContent} />
      </MainTab.Navigator>
    </UserInfoContextProvider>
  )
}
