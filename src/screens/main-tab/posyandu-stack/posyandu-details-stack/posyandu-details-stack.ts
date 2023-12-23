import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type PosyanduDetailsStackParamsList = {
  PosyanduDetailsHome: undefined
  PosyanduDetailsMembers: undefined

  KidRegistration: undefined
  KidDetailsStack: {
    kidId: string
  }
}

export const PosyanduDetailsStack =
  createNativeStackNavigator<PosyanduDetailsStackParamsList>()
