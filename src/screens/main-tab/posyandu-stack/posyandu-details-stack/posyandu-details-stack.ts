import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { KidDetailsStackParamsList } from './kid-details-stack/kid-details-stack'

export type PosyanduDetailsStackParamsList = {
  PosyanduDetailsHome: undefined
  PosyanduDetailsMembers: undefined
  PosyanduDetailsKids: undefined

  KidRegistration: undefined
  KidDetailsStack: {
    initialRoute: keyof KidDetailsStackParamsList
    kidId: string
  }
}

export const PosyanduDetailsStack =
  createNativeStackNavigator<PosyanduDetailsStackParamsList>()
