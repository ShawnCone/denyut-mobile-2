import LoginButton from '@/components/LoginButton'
import { AuthContextProvider } from '@/context/AuthContext'
import { Text, View } from 'react-native'

function AppContent() {
  return (
    <AuthContextProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Text>App Content</Text>
        <LoginButton />
      </View>
    </AuthContextProvider>
  )
}

export default AppContent
