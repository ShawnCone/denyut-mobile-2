import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type PosyanduStackParamsList = {
  PosyanduHome: undefined
  NewPosyanduSearch: undefined

  PosyanduDetails: {
    posyanduId: string
  } // Posyandu details stack
}

export const PosyanduStack =
  createNativeStackNavigator<PosyanduStackParamsList>()
