import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type PosyanduStackParamsList = {
  PosyanduHome: undefined
  PosyanduDetail: undefined
  NewPosyanduSearch: undefined
}

export const PosyanduStack =
  createNativeStackNavigator<PosyanduStackParamsList>()
