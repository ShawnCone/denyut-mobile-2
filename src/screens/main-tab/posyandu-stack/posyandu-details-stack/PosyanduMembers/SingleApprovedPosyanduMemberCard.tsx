import { useProtectedAuthContext } from '@/context/AuthContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import SinglePosyanduMemberCard, {
  SinglePosyanduMemberCardMemberInfo,
} from './SinglePosyanduMemberCard'

function SingleApprovedPosyanduMemberCard({
  name,
  phoneNumber,
  id,
}: SinglePosyanduMemberCardMemberInfo) {
  const { user } = useProtectedAuthContext()
  // Action: Show modal and kick member

  return (
    <SinglePosyanduMemberCard
      name={name}
      phoneNumber={phoneNumber}
      id={id}
      rightElement={
        user.id === id ? (
          <Typography
            variant={{
              size: 'captionS',
              textStyling: {
                italic: 'italic',
              },
            }}
          >
            Akun Saya
          </Typography>
        ) : (
          <Pressable
            onPress={() => {
              // Open modal to kick member
            }}
          >
            <MaterialCommunityIcons
              name="delete"
              color={tokens.colors.destructive.normal}
              size={tokens.iconSize.M}
            />
          </Pressable>
        )
      }
    />
  )
}

export default SingleApprovedPosyanduMemberCard
