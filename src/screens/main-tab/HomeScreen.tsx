import { useUserInfoContext } from '@/context/UserInfoContext'
import Typography from '@/design-system/Typography'
import { View } from 'react-native'

function HomeScreen() {
  const { userInfo } = useUserInfoContext()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography>Home Screen for {userInfo.name}</Typography>
    </View>
  )
}

export default HomeScreen
