import { useCreateUserInfo } from '@/context/UserInfoContext'
import { User } from '@supabase/supabase-js'
import { Button, Text, View } from 'react-native'

type CreateUserInfoScreenProps = {
  user: User
}

function CreateUserInfoScreen({ user }: CreateUserInfoScreenProps) {
  const { mutate: createUserInfo, isPending: isCreatingUserInfo } =
    useCreateUserInfo()
  return (
    <View>
      <Text>Fill in the form</Text>
      <Button
        title="Create User Info"
        onPress={() =>
          createUserInfo({
            id: user.id,
            sex: 'female',
            name: 'test',
          })
        }
      />
      {isCreatingUserInfo && <Text>Creating user info...</Text>}
    </View>
  )
}

export default CreateUserInfoScreen
