import { NavigationContainer } from '@react-navigation/native'
import {
  ProtectedAuthContextProvider,
  ProtectedAuthContextValues,
  useAuth,
} from './context/AuthContext'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/auth-screens/LoginScreen'
import VerifyScreen from './screens/auth-screens/VerifyScreen'
import { MainTabContent } from './screens/main-tab/main-tab-content'
import { RootStack } from './screens/root-stack'

function AppContent() {
  const { loading, user, signOut } = useAuth()

  if (loading) {
    return <SplashScreen />
  }

  const protectedRouteValues: ProtectedAuthContextValues | null = user
    ? {
        user,
        signOut,
      }
    : null

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {protectedRouteValues === null ? (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Verify" component={VerifyScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Main">
              {props => (
                <ProtectedAuthContextProvider value={protectedRouteValues}>
                  <MainTabContent {...props} />
                </ProtectedAuthContextProvider>
              )}
            </RootStack.Screen>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppContent
