import { NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { KidDetailsStackParamsList } from './kid-details-stack/kid-details-stack'

export type PosyanduDetailsStackParamsList = {
  PosyanduDetailsHome: undefined
  ApprovedPosyanduDetailsMembers: undefined
  PendingPosyanduDetailsMembers: undefined
  PosyanduDetailsMembers: undefined
  PosyanduDetailsKidsList: {
    nextKidDetailsRoute: Extract<
      keyof KidDetailsStackParamsList,
      'kidDetailsHome' | 'createGrowthRecord' | 'growthHistory'
    >
  }

  KidRegistration: undefined
  KidDetailsStack: NavigatorScreenParams<KidDetailsStackParamsList> & {
    kidId: string
  }
}

export const PosyanduDetailsStack =
  createNativeStackNavigator<PosyanduDetailsStackParamsList>()

export type PosyanduDetailsScreenNames = keyof PosyanduDetailsStackParamsList
