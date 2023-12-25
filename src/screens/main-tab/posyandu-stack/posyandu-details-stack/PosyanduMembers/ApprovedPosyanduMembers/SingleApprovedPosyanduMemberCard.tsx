import { Database } from '@/client/supabase/types'
import { useProtectedAuthContext } from '@/context/AuthContext'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable } from 'react-native'
import RejectKickPosyanduMemberModal from '../RejectKickPosyanduMemberModal'
import SinglePosyanduMemberCard, {
  SinglePosyanduMemberCardMemberInfo,
} from '../SinglePosyanduMemberCard'

type SingleApprovedPosyanduMemberCardProps = {
  isAdmin?: boolean
  role: Database['public']['Enums']['membership_role_enum']
} & SinglePosyanduMemberCardMemberInfo

function SingleApprovedPosyanduMemberCard({
  name,
  phoneNumber,
  id,
  role,
  isAdmin,
}: SingleApprovedPosyanduMemberCardProps) {
  const { user } = useProtectedAuthContext()

  const [showKickModal, setShowKickModal] = useState(false)

  return (
    <>
      <SinglePosyanduMemberCard
        name={name}
        phoneNumber={phoneNumber}
        id={id}
        role={role}
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
            isAdmin && (
              <Pressable
                onPress={() => {
                  setShowKickModal(true)
                }}
              >
                <MaterialCommunityIcons
                  name="delete"
                  color={tokens.colors.destructive.normal}
                  size={tokens.iconSize.M}
                />
              </Pressable>
            )
          )
        }
      />
      <RejectKickPosyanduMemberModal
        isVisible={showKickModal}
        onClose={() => {
          setShowKickModal(false)
        }}
        memberId={id}
        name={name}
        phoneNumber={phoneNumber}
        mode="kick"
      />
    </>
  )
}

export default SingleApprovedPosyanduMemberCard
