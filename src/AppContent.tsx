import { NavigationContainer } from '@react-navigation/native'

import { useFonts } from 'expo-font'
import {
  ProtectedAuthContextProvider,
  ProtectedAuthContextValues,
  useAuthContext,
} from './context/AuthContext'
import { BaseStackNavigationScreenOptions } from './design-system/NavigationScreenOptions'
import { fontFamilies } from './design-system/tokens/font-families'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/auth-screens/LoginScreen'
import VerifyScreen from './screens/auth-screens/verify-screen/VerifyScreen'
import { MainTabContent } from './screens/main-tab/main-tab-content'
import { RootStack } from './screens/root-stack'

function AppContent() {
  const { loading, user, session, signOut } = useAuthContext()
  const [fontsLoaded] = useFonts(fontFamilies)

  const protectedRouteValues: ProtectedAuthContextValues | null =
    user && session
      ? {
          user,
          signOut,
          session,
        }
      : null

  if (loading || !fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={BaseStackNavigationScreenOptions}
      >
        {protectedRouteValues === null ? (
          <>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Verify"
              component={VerifyScreen}
              initialParams={{
                phoneNumber: '+12179791776',
              }}
            />
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
