import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type KidDetailsStackParamsList = {
  kidDetailsHome: undefined
  newGrowthRecord: undefined
  growthHistory: undefined
  updateKidDetails: undefined
}

export const KidDetailsStack =
  createNativeStackNavigator<KidDetailsStackParamsList>()
