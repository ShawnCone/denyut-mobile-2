import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type PosyanduDetailsStackParamsList = {
  PosyanduDetailsHome: undefined
  ApprovedPosyanduDetailsMembers: undefined
  PendingPosyanduDetailsMembers: undefined
}

export const PosyanduDetailsStack =
  createNativeStackNavigator<PosyanduDetailsStackParamsList>()
