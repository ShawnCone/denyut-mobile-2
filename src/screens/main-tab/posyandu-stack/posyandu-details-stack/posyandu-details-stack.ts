import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type PosyanduDetailsStackParamsList = {
  PosyanduDetailsHome: undefined
  PosyanduDetailsMembers: undefined
}

export const PosyanduDetailsStack =
  createNativeStackNavigator<PosyanduDetailsStackParamsList>()
