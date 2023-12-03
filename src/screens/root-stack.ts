import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type RootStackParamsList = {
  Login: undefined
  Verify: {
    phoneNumber: string
  }
  Main: undefined
}

export const RootStack = createNativeStackNavigator<RootStackParamsList>()
