import { NavigationContainer } from '@react-navigation/native'

import { useFonts } from 'expo-font'
import {
  ProtectedAuthContextProvider,
  ProtectedAuthContextValues,
  useAuth,
} from './context/AuthContext'
import {
  fontFamilies,
  fontFamilyNameEnum,
} from './design-system/tokens/font-families'
import { tokens } from './design-system/tokens/tokens'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/auth-screens/LoginScreen'
import VerifyScreen from './screens/auth-screens/verify-screen/VerifyScreen'
import { MainTabContent } from './screens/main-tab/main-tab-content'
import { RootStack } from './screens/root-stack'

function AppContent() {
  const { loading, user, signOut } = useAuth()
  const [fontsLoaded] = useFonts(fontFamilies)

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
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: fontFamilyNameEnum['Lato-bold'],
            fontSize: tokens.fontSizing['L'].fontSize,
          },
          headerBackVisible: true,
        })}
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
