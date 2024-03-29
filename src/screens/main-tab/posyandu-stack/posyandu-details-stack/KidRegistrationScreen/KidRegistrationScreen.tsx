import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import AvatarPicker from '@/design-system/forms/AvatarPicker'
import DenyutDateTimePicker from '@/design-system/forms/DatePickers/DenyutDateTimePicker'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import ErrorMessageDisplay from '@/design-system/forms/ErrorMessageDisplay'
import SexSelectionFormInput from '@/design-system/forms/SexSelectionFormInput'
import { tokens } from '@/design-system/tokens/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
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

  const { handleSubmit, control, setValue } =
    useForm<KidRegistrationFormValues>({
      resolver: zodResolver(kidRegistrationFormSchema),
      defaultValues: {
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
        screen: 'kidDetailsHome',
      })
    },
  })

  const onSubmit = (data: KidRegistrationFormValues) => {
    const newKidInfo = { ...data }
    delete newKidInfo['localAvatarUri']

    registerKid({
      inKidInfo: {
        ...newKidInfo,
        dateOfBirth: newKidInfo.dateOfBirth.toISOString(),
      },
      localAvatarUri: data.localAvatarUri,
      posyanduId: posyanduInfo.id,
    })
  }

  const onAvatarChanged = (localImageUri?: string) => {
    setValue('localAvatarUri', localImageUri)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.colors.neutral.white,
          paddingHorizontal: tokens.padding.L,
          paddingTop: tokens.padding.L,
        }}
      >
        <View
          style={{
            gap: tokens.margin.L,
          }}
        >
          <AvatarPicker
            avatarType="kid"
            onAvatarChanged={onAvatarChanged}
            disabled={isPending}
          />
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <DenyutTextfield
                label="Nama Anak"
                placeholder="Nama Anak"
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isPending}
              />
            )}
          />
          <Controller
            control={control}
            name="sex"
            render={({ field: { onChange, value } }) => (
              <SexSelectionFormInput
                onChange={onChange}
                value={value}
                disabled={isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <DenyutDateTimePicker
                placeholder="Pilih Tanggal Lahir"
                errorMessage={error ? 'Tanggal lahir salah' : undefined}
                label="Tanggal Lahir"
                value={value}
                setValue={onChange}
                disabled={isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="birthCity"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <DenyutTextfield
                label="Kota Lahir"
                placeholder="Kota kelahiran anak"
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isPending}
              />
            )}
          />

          <Controller
            control={control}
            name="birthProvince"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              // Maybe change this to dropdown later
              <DenyutTextfield
                label="Provinsi Lahir"
                placeholder="Provinsi kelahiran anak"
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isPending}
              />
            )}
          />

          <DenyutButton
            title="Daftarkan Anak"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
          {/* Error text here */}
          {isError && (
            <View
              style={{
                marginTop: tokens.margin.M,
              }}
            >
              <ErrorMessageDisplay message="Terjadi kesalahan: Tidak bisa mendaftarkan anak" />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default KidRegistrationScreen
