import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type KidDetailsStackParamsList = {
  kidDetailsHome: undefined
  createGrowthRecord: undefined
  growthHistory: undefined
  updateKidProfile: undefined

  // Stack for growth record
  growthRecordDetails: {
    recordId: string
  }
}

export const KidDetailsStack =
  createNativeStackNavigator<KidDetailsStackParamsList>()
