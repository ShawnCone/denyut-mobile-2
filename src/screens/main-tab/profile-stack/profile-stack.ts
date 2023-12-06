import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type ProfileStackParamsList = {
  ProfileHome: undefined
  UpdateProfile: undefined
}

export const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>()
