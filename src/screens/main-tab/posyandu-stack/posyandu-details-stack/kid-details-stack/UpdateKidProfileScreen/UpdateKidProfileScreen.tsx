import { useKidInfoContext } from '@/context/KidInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import DenyutDateTimePicker from '@/design-system/forms/DenyutDateTimePicker'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import ErrorMessageDisplay from '@/design-system/forms/ErrorMessageDisplay'
import SexSelectionFormInput from '@/design-system/forms/SexSelectionFormInput'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { KidDetailsStackParamsList } from '../kid-details-stack'
import {
  UpdateKidProfileFormValues,
  useUpdateKidProfileForm,
  useUpdateKidProfileMutation,
} from './utils'

type UpdateKidProfileScreenProps = NativeStackScreenProps<
  KidDetailsStackParamsList,
  'updateKidProfile'
>

function UpdateKidProfileScreen({ navigation }: UpdateKidProfileScreenProps) {
  const { control, handleSubmit } = useUpdateKidProfileForm()

  const { kidInfo } = useKidInfoContext()

  const { isPending, mutate, isError } = useUpdateKidProfileMutation({
    onSuccess: () => {
      navigation.navigate('kidDetailsHome')
    },
  })

  const onSubmit = (data: UpdateKidProfileFormValues) => {
    mutate({
      kidId: kidInfo.id,
      inKidInfo: {
        ...data,
        dateOfBirth: data.dateOfBirth.toISOString(),
      },
    })
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
                setValue={newDate => onChange(newDate)}
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
            title="Ubah Data Anak"
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
              <ErrorMessageDisplay message="Terjadi kesalahan: Tidak bisa mengubah data anak" />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default UpdateKidProfileScreen
