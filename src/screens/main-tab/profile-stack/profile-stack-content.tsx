import ProfileHomeScreen from './ProfileHome/ProfileHomeScreen'
import UpdateProfileScreen from './UpdateProfile/UpdateProfileScreen'
import { ProfileStack } from './profile-stack'

function ProfileStackContent() {
  return (
    <ProfileStack.Navigator>
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
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackContent
