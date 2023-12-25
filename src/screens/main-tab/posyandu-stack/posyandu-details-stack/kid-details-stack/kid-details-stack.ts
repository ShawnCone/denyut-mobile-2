import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type KidDetailsStackParamsList = {
  kidDetailsHome: undefined
  newGrowthRecord: undefined
  growthHistory: undefined
  updateKidProfile: undefined
}

export const KidDetailsStack =
  createNativeStackNavigator<KidDetailsStackParamsList>()
