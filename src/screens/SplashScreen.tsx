import { Image, View } from 'react-native'

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('@/../assets/images/Splash.png')}
        style={{ width: 200, height: 230 }}
      />
    </View>
  )
}

export default SplashScreen
