import DenyutButton from '@/design-system/DenyutButton'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import RadioSelectFormInput from '@/design-system/forms/RadioSelectFormInput'
import { RadioSelectOptions } from '@/design-system/radio/RadioSelect'
import { tokens } from '@/design-system/tokens/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@supabase/supabase-js'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  CreateProfileFormValues,
  createProfileFormSchema,
  useCreateUserInfo,
} from './utils'

const SEX_SELECT_OPTIONS: RadioSelectOptions = [
  {
    value: 'male',
    label: 'Laki - laki',
  },
  {
    value: 'female',
    label: 'Perempuan',
  },
]

type CreateUserInfoScreenProps = {
  user: User
}

function CreateUserInfoScreen({ user }: CreateUserInfoScreenProps) {
  const { mutate: createUserInfo, isPending: isCreatingUserInfo } =
    useCreateUserInfo({})

  const nameFieldRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<CreateProfileFormValues>({
    resolver: zodResolver(createProfileFormSchema),
    defaultValues: {
      sex: 'male',
    },
  })

  const onSubmit = ({ name, address, sex }: CreateProfileFormValues) => {
    createUserInfo({
      id: user.id,
      name,
      sex,
      address,
    })
  }

  useEffect(() => {
    nameFieldRef.current?.focus()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.colors.neutral.white,
          paddingHorizontal: tokens.padding.L,
          paddingTop: tokens.padding.XL,
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
                label="Nama"
                placeholder="Nama Lengkap Anda"
                errorMessage={error?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isCreatingUserInfo}
              />
            )}
          />
          <Controller
            control={control}
            name="sex"
            render={({ field: { onChange, value } }) => (
              <RadioSelectFormInput
                label="Jenis Kelamin"
                options={SEX_SELECT_OPTIONS}
                onChange={onChange}
                value={value}
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
                editable={!isCreatingUserInfo}
              />
            )}
          />

          <DenyutButton
            title="Buat Akun"
            onPress={handleSubmit(onSubmit)}
            disabled={isCreatingUserInfo}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CreateUserInfoScreen
