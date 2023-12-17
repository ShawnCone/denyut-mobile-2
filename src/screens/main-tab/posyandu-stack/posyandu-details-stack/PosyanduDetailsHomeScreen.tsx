import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { PosyanduDetailsStackParamsList } from './posyandu-details-stack'

type PosyanduDetailsScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'PosyanduDetailsHome'
>
function PosyanduDetailsScreen({ navigation }: PosyanduDetailsScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Typography>PosyanduDetailsScreen</Typography>
      <DenyutButton
        title="Go to posyandu members"
        onPress={() => navigation.navigate('PosyanduDetailsMembers')}
      />
    </View>
  )
}

export default PosyanduDetailsScreen
