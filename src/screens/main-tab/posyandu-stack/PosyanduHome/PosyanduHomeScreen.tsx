import { useProtectedAuthContext } from '@/context/AuthContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
import { PosyanduStackParamsList } from '../posyandu-stack'
import AddNewPosyanduCard from './AddNewPosyanduCard'
import MyPosyanduList from './MyPosyanduList'

type PosyanduHomeScreenProps = NativeStackScreenProps<
  PosyanduStackParamsList,
  'PosyanduHome'
>

// User's posyandu home, containing user posyandu lists
function PosyanduHomeScreen({ navigation }: PosyanduHomeScreenProps) {
  function handleNavigateToNewPosyanduSearch() {
    navigation.navigate('NewPosyanduSearch')
  }

  function handleNavigateToPosyanduDetails(posyanduId: string) {
    navigation.navigate('PosyanduDetails', {
      posyanduId,
    })
  }

  const { user } = useProtectedAuthContext()

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Header */}
      <View
        style={{
          backgroundColor: tokens.colors.primary.dark,
          height: 180, // TODO: Make token for header height? M and L?
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

      {/* Content */}
      <View
        style={{
          backgroundColor: tokens.colors.neutral.white,
          flex: 1,
        }}
      >
        <View
          style={{
            marginHorizontal: tokens.margin.L,
            gap: tokens.margin.L,
            flex: 1,
          }}
        >
          <AddNewPosyanduCard onPress={handleNavigateToNewPosyanduSearch} />
          <MyPosyanduList
            userId={user.id}
            onPosyanduPress={handleNavigateToPosyanduDetails}
          />
        </View>
      </View>
    </View>
  )
}

export default PosyanduHomeScreen
