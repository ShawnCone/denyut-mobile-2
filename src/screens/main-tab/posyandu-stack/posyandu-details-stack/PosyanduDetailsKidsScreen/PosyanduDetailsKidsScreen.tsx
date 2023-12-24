import { KidInfoSummary } from '@/client/supabase/queries/kid-info'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import PosyanduKidsList from '../PosyanduKidsList'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'

type PosyanduDetailsKidsScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'PosyanduDetailsKids'
>

function PosyanduDetailsKidsScreen({
  navigation,
}: PosyanduDetailsKidsScreenProps) {
  function navigateToKidRegistration() {
    navigation.navigate('KidRegistration')
  }

  function navigateToKidDetails(kidId: KidInfoSummary['id']) {
    navigation.navigate('KidDetailsStack', {
      kidId,
      initialRoute: 'kidDetailsHome',
    })
  }

  return (
    <PosyanduKidsList
      onRegisterPress={navigateToKidRegistration}
      onKidPress={navigateToKidDetails}
    />
  )
}

export default PosyanduDetailsKidsScreen
