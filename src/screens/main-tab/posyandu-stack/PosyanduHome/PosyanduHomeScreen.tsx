import { useProtectedAuthContext } from '@/context/AuthContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { PosyanduStackParamsList } from '../posyandu-stack'
import AddNewPosyanduCard from './AddNewPosyanduCard'
import { useUserPosyanduListQuery } from './utils'

type PosyanduHomeScreenProps = NativeStackScreenProps<
  PosyanduStackParamsList,
  'PosyanduHome'
>

// User's posyandu home, containing user posyandu lists
function PosyanduHomeScreen({ navigation }: PosyanduHomeScreenProps) {
  const {
    user: { id: userId },
  } = useProtectedAuthContext()

  function handleNavigateToNewPosyanduSearch() {
    navigation.navigate('NewPosyanduSearch')
  }

  const { data, isError, isPending } = useUserPosyanduListQuery(userId)

  return (
    <View>
      <View
        style={{
          backgroundColor: tokens.colors.primary.dark,
          height: 180,
          paddingHorizontal: tokens.padding.L,
          justifyContent: 'center',
          borderRadius: tokens.borderRadius.S,
        }}
      >
        <Typography
          variant={{ size: 'Heading4' }}
          style={{
            color: tokens.colors.neutral.white,
          }}
        >
          Posyandu
        </Typography>
      </View>

      {/* Add posyandu card */}
      <AddNewPosyanduCard onPress={handleNavigateToNewPosyanduSearch} />

      {/* <Typography>Home For Posyandu</Typography>
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
      /> */}
    </View>
  )
}

export default PosyanduHomeScreen
