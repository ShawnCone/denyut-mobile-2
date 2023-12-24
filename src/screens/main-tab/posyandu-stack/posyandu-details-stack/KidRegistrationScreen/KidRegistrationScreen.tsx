import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import {
  KidRegistrationFormValues,
  kidRegistrationFormSchema,
  useRegisterKidMutation,
} from './utils'

type KidRegistrationScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'KidRegistration'
>

function KidRegistrationScreen({ navigation }: KidRegistrationScreenProps) {
  const { posyanduInfo } = usePosyanduInfoContext()

  const { handleSubmit } = useForm<KidRegistrationFormValues>({
    resolver: zodResolver(kidRegistrationFormSchema),
    // Temporary
    defaultValues: {
      name: 'Test Kid',
      birthCity: 'Surakarta',
      birthProvince: 'Jawa Tengah',
      dateOfBirth: new Date(),
      sex: 'male',
    },
  })

  const {
    mutate: registerKid,
    isPending,
    isError,
  } = useRegisterKidMutation({
    onSuccess: (newKidId: string) => {
      // navigate to kid details screen
      navigation.navigate('KidDetailsStack', {
        kidId: newKidId,
        initialRoute: 'growthHistory',
      })
    },
  })

  const onSubmit = (data: KidRegistrationFormValues) => {
    registerKid({
      inKidInfo: {
        ...data,
        dateOfBirth: data.dateOfBirth.toISOString(),
      },
      posyanduId: posyanduInfo.id,
    })
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.colors.neutral.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isPending ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography>Something went wrong</Typography>
      ) : (
        <DenyutButton title="Register kid" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  )
}

export default KidRegistrationScreen
