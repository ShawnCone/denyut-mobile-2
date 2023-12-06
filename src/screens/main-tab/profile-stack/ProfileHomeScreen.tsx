import { useAuth } from '@/context/AuthContext'
import { useUserInfoContext } from '@/context/UserInfoContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'
import { ProfileStackParamsList } from './profile-stack'

type ProfileHomeScreen = NativeStackScreenProps<
  ProfileStackParamsList,
  'ProfileHome'
>

function ProfileHomeScreen({ navigation }: ProfileHomeScreen) {
  const { userInfo } = useUserInfoContext()
  const { signOut } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen for: {userInfo.name}</Text>
      <Button
        title="Update Profile"
        onPress={() => {
          navigation.navigate('UpdateProfile')
        }}
      />
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  )
}

export default ProfileHomeScreen
