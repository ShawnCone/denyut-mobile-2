import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { Button } from 'react-native'
import {
  ProtectedAuthContextProvider,
  ProtectedAuthContextValues,
  useAuth,
} from './context/AuthContext'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SplashScreen from './screens/SplashScreen'

type MainTabsParams = {
  protectedRouteValues: ProtectedAuthContextValues
}
type RootStackParamsList = {
  Login: undefined
  Main: MainTabsParams
}
const RootStack = createNativeStackNavigator<RootStackParamsList>()
const MainTab = createBottomTabNavigator()

type MainTabProps = NativeStackScreenProps<
  RootStackParamsList,
  'Main',
  'RootStack'
>

function MainTabContent({ route }: MainTabProps) {
  const { user } = route.params.protectedRouteValues

  return (
    <ProtectedAuthContextProvider value={{ user }}>
      <MainTab.Navigator>
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Profile" component={LogoutButton} />
      </MainTab.Navigator>
    </ProtectedAuthContextProvider>
  )
}

function LogoutButton() {
  const { signOut } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return <Button title="Sign out" onPress={handleSignOut} />
}

function AppContent() {
  const { loading, user } = useAuth()

  if (loading) {
    return <SplashScreen />
  }

  const protectedRouteValues: ProtectedAuthContextValues | null = user
    ? {
        user,
      }
    : null

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {protectedRouteValues === null ? (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Main"
              initialParams={{ protectedRouteValues }}
              component={MainTabContent}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppContent
