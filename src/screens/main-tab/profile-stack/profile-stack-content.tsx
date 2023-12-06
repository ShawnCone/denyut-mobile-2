import UpdateProfileScreen from './UpdateProfile/UpdateProfileScreen'
import { ProfileStack } from './profile-stack'

function ProfileStackContent() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <ProfileStack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackContent
