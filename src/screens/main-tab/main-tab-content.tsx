import { useProtectedAuth } from '@/context/AuthContext'
import { UserInfoContextProvider, useUserInfo } from '@/context/UserInfoContext'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { fontFamilyNameEnum } from '@/design-system/tokens/font-families'
import { tokens } from '@/design-system/tokens/tokens'
import CreateUserInfoScreen from '@/screens/main-tab/CreateUserInfo/CreateUserInfoScreen'
import { RootStackParamsList } from '@/screens/root-stack'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
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
      <MainTab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarActiveTintColor: tokens.colors.primary.dark,
          tabBarInactiveTintColor: tokens.colors.neutral.light,
          tabBarItemStyle: {
            paddingBottom: tokens.margin.M,
            paddingTop: tokens.margin.S,
          },
          tabBarStyle: {
            height: 60, // Better if responsive, but this should be ok.,
          },

          tabBarLabelStyle: {
            paddingTop: tokens.margin.S,
            fontFamily: fontFamilyNameEnum['Lato-bold'],
            fontSize: tokens.fontSizing['XS'].fontSize,
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <MainTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={tokens.iconSize.M} color={color} />
            ),
          }}
        />
        <MainTab.Screen
          name="Posyandu"
          component={PosyanduScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="office-building-outline"
                size={tokens.iconSize.M}
                color={color}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileStackContent}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={tokens.iconSize.M} color={color} />
            ),
            headerShown: false,
          }}
        />
      </MainTab.Navigator>
    </UserInfoContextProvider>
  )
}
