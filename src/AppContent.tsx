import { NavigationContainer } from '@react-navigation/native'

import { useFonts } from 'expo-font'
import {
  ProtectedAuthContextProvider,
  ProtectedAuthContextValues,
  useAuth,
} from './context/AuthContext'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/auth-screens/LoginScreen'
import VerifyScreen from './screens/auth-screens/verify-screen/VerifyScreen'
import { MainTabContent } from './screens/main-tab/main-tab-content'
import { RootStack } from './screens/root-stack'

function AppContent() {
  const { loading, user, signOut } = useAuth()
  const [fontsLoaded] = useFonts({
    'Lato-thin': require('../assets/fonts/Lato-Thin.ttf'),
    'Lato-light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-lightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
    'Lato-regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-regularItalic': require('../assets/fonts/Lato-Italic.ttf'),
    'Lato-bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-boldItalic': require('../assets/fonts/Lato-BoldItalic.ttf'),
  })

  const protectedRouteValues: ProtectedAuthContextValues | null = user
    ? {
        user,
        signOut,
      }
    : null

  if (loading || !fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {protectedRouteValues === null ? (
          <>
            <RootStack.Screen
              name="Verify"
              component={VerifyScreen}
              initialParams={{
                phoneNumber: '+12179791776',
              }}
            />

            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
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
