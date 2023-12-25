import { useAuthContext } from '@/context/AuthContext'
import { useUserInfoContext } from '@/context/UserInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { ProfileStackParamsList } from '../profile-stack'
import LogoutModal from './LogoutModal'
import SingleProfileMenuItem from './SingleProfileMenuItem'
import { PADDING_HORIZONTAL } from './utils'

type ProfileHomeScreenProps = NativeStackScreenProps<
  ProfileStackParamsList,
  'ProfileHome'
>

// Constant here, because applied in every top level view

function ProfileHomeScreen({ navigation }: ProfileHomeScreenProps) {
  const { userInfo } = useUserInfoContext()
  const { user } = useAuthContext()
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)

  function handleOpenModal() {
    setIsLogoutModalVisible(true)
  }

  function handleCloseModal() {
    setIsLogoutModalVisible(false)
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
        <View
          style={{
            flex: 1,
          }}
        >
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
              flex: 1,
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

            <View
              style={{
                marginTop: 'auto',
                marginBottom: tokens.margin.L,
                paddingHorizontal: PADDING_HORIZONTAL,
              }}
            >
              <DenyutButton
                title="Log Out"
                style={{
                  backgroundColor: tokens.colors.primary.dark,
                }}
                onPress={handleOpenModal}
              />
            </View>
          </View>
        </View>
        <LogoutModal
          isVisible={isLogoutModalVisible}
          onClose={handleCloseModal}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProfileHomeScreen
