import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export type MainTabParamsList = {
  Home: undefined
  Posyandu: undefined
  Profile: undefined
}
export const MainTab = createBottomTabNavigator<MainTabParamsList>()
