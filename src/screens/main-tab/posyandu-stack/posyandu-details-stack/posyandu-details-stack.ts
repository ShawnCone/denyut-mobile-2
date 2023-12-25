import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { KidDetailsStackParamsList } from './kid-details-stack/kid-details-stack'

export type PosyanduDetailsStackParamsList = {
  PosyanduDetailsHome: undefined
  ApprovedPosyanduDetailsMembers: undefined
  PendingPosyanduDetailsMembers: undefined
  PosyanduDetailsMembers: undefined
  PosyanduDetailsKidsList: {
    nextKidDetailsRoute: keyof KidDetailsStackParamsList
  }

  KidRegistration: undefined
  KidDetailsStack: {
    initialRoute: keyof KidDetailsStackParamsList
    kidId: string
  }
}

export const PosyanduDetailsStack =
  createNativeStackNavigator<PosyanduDetailsStackParamsList>()
