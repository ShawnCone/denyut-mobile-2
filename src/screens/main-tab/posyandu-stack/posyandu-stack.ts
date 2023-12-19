import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type PosyanduStackParamsList = {
  PosyanduHome: undefined
  NewPosyanduSearch: undefined

  PosyanduDetails: {
    posyanduId: string
  }
}

export const PosyanduStack =
  createNativeStackNavigator<PosyanduStackParamsList>()
