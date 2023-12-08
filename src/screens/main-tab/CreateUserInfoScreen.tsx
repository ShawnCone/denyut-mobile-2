import { useCreateUserInfo } from '@/context/UserInfoContext'
import Typography from '@/design-system/Typography'
import { User } from '@supabase/supabase-js'
import { Button, View } from 'react-native'

type CreateUserInfoScreenProps = {
  user: User
}

function CreateUserInfoScreen({ user }: CreateUserInfoScreenProps) {
  const { mutate: createUserInfo, isPending: isCreatingUserInfo } =
    useCreateUserInfo()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {' '}
      <Typography>Fill in the form</Typography>
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
      {isCreatingUserInfo && <Typography>Creating user info...</Typography>}
    </View>
  )
}

export default CreateUserInfoScreen
