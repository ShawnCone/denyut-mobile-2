import { useAuth } from '@/context/AuthContext'
import { Button, View } from 'react-native'

function LoginButton() {
  const { client, signOut } = useAuth()

  async function handleSignIn() {
    console.log('Signing in...')
    const result = await client.auth.signInWithPassword({
      email: 'test@test.com',
      password: 'test',
    })

    console.log({ result })
  }
  return (
    <View>
      <Button title="Sign in" onPress={handleSignIn} />
      <Button
        title="Sign Out"
        onPress={() => {
          signOut()
        }}
      />
    </View>
  )
}

export default LoginButton
