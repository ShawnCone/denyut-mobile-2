import { BaseStackNavigationScreenOptions } from '@/design-system/BaseStackNavigationScreenOptions'
import ProfileHomeScreen from './ProfileHome/ProfileHomeScreen'
import UpdateProfileScreen from './UpdateProfile/UpdateProfileScreen'
import { ProfileStack } from './profile-stack'

function ProfileStackContent() {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={BaseStackNavigationScreenOptions}
    >
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerTitle: 'Ubah Profil',
        }}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackContent
