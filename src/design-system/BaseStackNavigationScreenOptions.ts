import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { fontFamilyNameEnum } from './tokens/font-families'
import { tokens } from './tokens/tokens'

export const BaseStackNavigationScreenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: fontFamilyNameEnum['Lato-bold'],
    fontSize: tokens.fontSizing['L'].fontSize,
  },
  headerBackVisible: true,
}
