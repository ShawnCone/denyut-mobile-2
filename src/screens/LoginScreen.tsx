import LoginButton from '@/components/LoginButton'
import { Text, View } from 'react-native'

function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <LoginButton />
    </View>
  )
}

export default LoginScreen
