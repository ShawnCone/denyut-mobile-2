import { useUserInfoContext } from '@/context/UserInfoContext'
import { Text, View } from 'react-native'

function HomeScreen() {
  const { userInfo } = useUserInfoContext()

  return (
    <View>
      <Text>Home Screen for {userInfo.name}</Text>
    </View>
  )
}

export default HomeScreen
