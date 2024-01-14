import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type GrowthDetailsStackParamsList = {
  growthDetailsHome: undefined
  editGrowthDetails: undefined
}

export const GrowthDetailsStack =
  createNativeStackNavigator<GrowthDetailsStackParamsList>()
