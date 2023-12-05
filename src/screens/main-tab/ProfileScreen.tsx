import { useAuth } from '@/context/AuthContext'
import { useUserInfoContext } from '@/context/UserInfoContext'
import { Button, Text, View } from 'react-native'

function ProfileScreen() {
  const { userInfo } = useUserInfoContext()
  const { signOut } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return (
    <View>
      <Text>Profile Screen for: {userInfo.name}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  )
}

export default ProfileScreen
