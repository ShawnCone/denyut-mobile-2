import DenyutButton from '@/design-system/DenyutButton'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { KidDetailsStackParamsList } from '../kid-details-stack'

type KidDetailsHomeScreenProps = NativeStackScreenProps<
  KidDetailsStackParamsList,
  'kidDetailsHome'
>

function KidDetailsHomeScreen({ navigation }: KidDetailsHomeScreenProps) {
  function goToRegisterGrowth() {
    navigation.navigate('newGrowthRecord')
  }

  function goToGrowthHistory() {
    navigation.navigate('growthHistory')
  }

  // TODO: Disable header back button,
  // If coming from register, make it go back to posyandu details home, otherwise go back as normal
  // (Cannot go back to register)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: tokens.colors.neutral.white,
      }}
    >
      <DenyutButton
        title="Go to new growth record"
        onPress={goToRegisterGrowth}
      />
      <DenyutButton title="Go to growth history" onPress={goToGrowthHistory} />
    </View>
  )
}

export default KidDetailsHomeScreen
