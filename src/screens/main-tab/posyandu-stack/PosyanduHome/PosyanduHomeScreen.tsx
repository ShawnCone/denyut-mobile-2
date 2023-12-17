import { useProtectedAuth } from '@/context/AuthContext'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { PosyanduStackParamsList } from '../posyandu-stack'
import { useUserPosyanduListQuery } from './utils'

type PosyanduHomeScreenProps = NativeStackScreenProps<
  PosyanduStackParamsList,
  'PosyanduHome'
>

// User's posyandu home, containing user posyandu lists
function PosyanduHomeScreen({ navigation }: PosyanduHomeScreenProps) {
  const {
    user: { id: userId },
  } = useProtectedAuth()

  const { data, isError, isPending } = useUserPosyanduListQuery(userId)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Typography>Home For Posyandu</Typography>
      {isPending ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography>Error...</Typography>
      ) : (
        <Typography>Data: {JSON.stringify(data)}</Typography>
      )}
      <DenyutButton
        title="Add new posyandu"
        onPress={() => navigation.navigate('NewPosyanduSearch')}
      />
      <DenyutButton
        title="Go to posyandu details"
        onPress={() => {
          navigation.navigate('PosyanduDetails', {
            posyanduId: '1525660d-6afc-45de-80c6-93f5b8f8404e',
          })
        }}
      />
    </View>
  )
}

export default PosyanduHomeScreen
