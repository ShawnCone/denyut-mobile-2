import { useUserInfoContext } from '@/context/UserInfoContext'
import { Text, View } from 'react-native'

function HomeScreen() {
  const { userInfo } = useUserInfoContext()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen for {userInfo.name}</Text>
    </View>
  )
}

export default HomeScreen
