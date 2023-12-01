import { useAuth } from '@/context/AuthContext'
import { Button } from 'react-native'

function LoginButton() {
  const { client } = useAuth()

  async function handleSignIn() {
    const result = await client.auth.signInWithPassword({
      email: 'test@test.com',
      password: 'test',
    })
  }
  return <Button title="Sign in" onPress={handleSignIn} />
}

export default LoginButton
