import { useProtectedAuth } from '@/context/AuthContext'
import { UserInfoContextProvider, useUserInfo } from '@/context/UserInfoContext'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import CreateUserInfoScreen from '@/screens/main-tab/CreateUserInfo/CreateUserInfoScreen'
import { RootStackParamsList } from '@/screens/root-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { View } from 'react-native'
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

export function MainTabContent({ navigation }: MainTabProps) {
  const { user } = useProtectedAuth()
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo(user)

  const showHeader =
    (userInfo === null || typeof userInfo === 'undefined') && !isLoadingUserInfo

  useEffect(() => {
    navigation.setOptions({
      headerShown: showHeader,
      headerTitle: 'Buat Akun',
    })
  }, [showHeader])

  if (isLoadingUserInfo) {
    // Loading screen
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LoadingIndicator />
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
