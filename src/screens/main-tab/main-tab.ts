import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { PosyanduStackParamsList } from './posyandu-stack/posyandu-stack'
import { ProfileStackParamsList } from './profile-stack/profile-stack'

export type MainTabParamsList = {
  Home: undefined
  Posyandu: NavigatorScreenParams<PosyanduStackParamsList>
  Profile: NavigatorScreenParams<ProfileStackParamsList>
}
export const MainTab = createBottomTabNavigator<MainTabParamsList>()
