import { KidInfoSummary } from '@/client/supabase/queries/kid-info'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import PosyanduKidsList from './PosyanduKidsList'

type PosyanduDetailsKidsListScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'PosyanduDetailsKidsList'
>

function PosyanduDetailsKidsListScreen({
  navigation,
  route,
}: PosyanduDetailsKidsListScreenProps) {
  function navigateToKidRegistration() {
    navigation.navigate('KidRegistration')
  }

  function navigateToKidDetails(kidId: KidInfoSummary['id']) {
    navigation.navigate('KidDetailsStack', {
      kidId,
      initialRoute: route.params.nextKidDetailsRoute,
    })
  }

  return (
    <PosyanduKidsList
      onRegisterPress={navigateToKidRegistration}
      onKidPress={navigateToKidDetails}
    />
  )
}

export default PosyanduDetailsKidsListScreen
