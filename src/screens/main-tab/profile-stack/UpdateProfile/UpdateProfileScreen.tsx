import { useUserInfoContext } from '@/context/UserInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import SexSelectionFormInput from '@/design-system/forms/SexSelectionFormInput'
import { tokens } from '@/design-system/tokens/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { ProfileStackParamsList } from '../profile-stack'

import AvatarPicker from '@/design-system/forms/AvatarPicker'
import {
  UpdateProfileFormSchema,
  UpdateProfileFormValues,
  useUpdateProfileMutation,
} from './utils'

type UpdateProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamsList,
  'UpdateProfile'
>

function UpdateProfileScreen({ navigation }: UpdateProfileScreenProps) {
  const { userInfo } = useUserInfoContext()

  const { control, handleSubmit, setValue } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      name: userInfo.name,
      sex: userInfo.sex,
      address: userInfo.address ?? '',
    },
  })

  const { mutate, isPending: isUpdatingProfile } = useUpdateProfileMutation({
    onSuccess: () => {
      navigation.goBack()
    },
  })

  const onSubmit = ({
    name,
    sex,
    address,
    localAvatarUri,
  }: UpdateProfileFormValues) => {
    mutate({
      newUserInfo: {
        name,
        sex,
        address,
      },
      localAvatarUri,
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
            id={userInfo.id}
            avatarType="user"
            onAvatarChanged={onAvatarChanged}
            disabled={isUpdatingProfile}
          />
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <DenyutTextfield
                label="Nama"
                placeholder="Nama Lengkap Anda"
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isUpdatingProfile}
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
                disabled={isUpdatingProfile}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <DenyutTextfield
                label="Alamat"
                placeholder="Jl. Selamat Pagi 00, Solo, Jawa Tengah"
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isUpdatingProfile}
              />
            )}
          />
          <DenyutButton
            title="Ubah Akun"
            onPress={handleSubmit(onSubmit)}
            disabled={isUpdatingProfile}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default UpdateProfileScreen
