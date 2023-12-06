import { useUserInfoContext } from '@/context/UserInfoContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button, Text, TextInput, View } from 'react-native'
import {
  UpdateProfileFormSchema,
  UpdateProfileFormValues,
  useUpdateProfile,
} from './utils'

function UpdateProfileScreen() {
  const { userInfo } = useUserInfoContext()

  const { control, handleSubmit } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      name: userInfo.name,
    },
  })

  const { mutate, isPending: isUpdatingProfile } = useUpdateProfile()

  const onSubmit = ({ name }: UpdateProfileFormValues) => {
    mutate({
      newUserInfo: {
        name: name,
      },
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Update Profile Screen</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ width: 200, height: 40 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Button
        title="Update Profile"
        onPress={handleSubmit(onSubmit)}
        disabled={isUpdatingProfile}
      />
    </View>
  )
}

export default UpdateProfileScreen
