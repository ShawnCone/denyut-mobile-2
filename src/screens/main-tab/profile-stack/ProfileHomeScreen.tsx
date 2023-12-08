import { useAuth } from '@/context/AuthContext'
import { useUserInfoContext } from '@/context/UserInfoContext'
import Typography from '@/design-system/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, View } from 'react-native'
import { ProfileStackParamsList } from './profile-stack'

type ProfileHomeScreenProps = NativeStackScreenProps<
  ProfileStackParamsList,
  'ProfileHome'
>

function ProfileHomeScreen({ navigation }: ProfileHomeScreenProps) {
  const { userInfo } = useUserInfoContext()
  const { signOut } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography>Profile Screen for: {userInfo.name}</Typography>
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
