import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type GrowthDetailsStackParamsList = {
  growthDetailsHome: undefined
}

export const GrowthDetailsStack =
  createNativeStackNavigator<GrowthDetailsStackParamsList>()
