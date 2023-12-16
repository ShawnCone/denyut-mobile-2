import { useAuth } from '@/context/AuthContext'
import { useUserInfoContext } from '@/context/UserInfoContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { ProfileStackParamsList } from '../profile-stack'
import SingleProfileMenuItem from './SingleProfileMenuItem'
import { PADDING_HORIZONTAL } from './utils'

type ProfileHomeScreenProps = NativeStackScreenProps<
  ProfileStackParamsList,
  'ProfileHome'
>

// Constant here, because applied in every top level view

function ProfileHomeScreen({ navigation }: ProfileHomeScreenProps) {
  const { userInfo } = useUserInfoContext()
  const { signOut, user } = useAuth()

  async function handleSignOut() {
    signOut()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.colors.neutral.white,
          paddingTop: tokens.padding.XXL,
          gap: tokens.margin.L,
        }}
      >
        {/* Header */}
        <View
          style={{
            gap: tokens.margin.S,
            paddingHorizontal: PADDING_HORIZONTAL,
          }}
        >
          <Typography
            variant={{
              size: 'Heading4',
            }}
          >
            {userInfo.name}
          </Typography>
          <Typography
            variant={{
              size: 'caption',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            +{user?.phone}
          </Typography>
        </View>

        {/* Selection Section */}
        <View>
          <Typography
            variant={{
              size: 'Heading6',
            }}
            style={{
              paddingHorizontal: PADDING_HORIZONTAL,
            }}
          >
            Akun
          </Typography>
          <View
            style={{
              marginTop: tokens.margin.S,
            }}
          >
            <SingleProfileMenuItem
              icon={
                <Ionicons
                  name="person"
                  size={tokens.iconSize.L}
                  color={tokens.colors.primary.dark}
                />
              }
              title="Informasi Profil"
              description="Ubah nama, alamat, dan info profil lainnya"
              onPress={() => {
                navigation.navigate('UpdateProfile')
              }}
            />
            <SingleProfileMenuItem
              icon={
                <Ionicons
                  name="exit"
                  size={tokens.iconSize.L}
                  color={tokens.colors.primary.dark}
                />
              }
              title="Log out"
              description="Keluar dari akun, dan masuk dengan akun lainnya"
              onPress={() => {
                // Show sign out modal
              }}
            />
          </View>
        </View>

        {/* <Button title="Sign out" onPress={handleSignOut} /> */}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProfileHomeScreen
