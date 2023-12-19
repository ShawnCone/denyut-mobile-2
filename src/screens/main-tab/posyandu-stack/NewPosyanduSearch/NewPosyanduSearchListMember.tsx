import { PosyanduInfoWithMembershipStatus } from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import SinglePosyanduListMember from '../SinglePosyanduListMember'
import { useJoinPosyandu } from './utils'

type NewPosyanduSearchListMemberProps = {
  posyanduMembershipInfo: PosyanduInfoWithMembershipStatus
}

function NewPosyanduSearchListMember({
  posyanduMembershipInfo: {
    name,
    city,
    province,
    id: posyanduId,
    membershipStatus,
  },
}: NewPosyanduSearchListMemberProps) {
  const { user } = useProtectedAuthContext()

  const { isPending: isPendingJoinPosyandu, mutate } = useJoinPosyandu({
    posyanduId,
    onError: error => {
      // Toast
      console.log({ error })
    },
    onSuccess: () => {
      // Maybe toast?
    },
  })

  const isDisabled =
    isPendingJoinPosyandu || typeof membershipStatus !== 'undefined'

  const rightElement = membershipStatus ? (
    <Typography
      variant={{
        size: 'captionS',
        textStyling: {
          italic: 'italic',
        },
      }}
      style={{
        color: tokens.colors.neutral.normal,
      }}
    >
      {membershipStatus === 'pending' ? 'Menunggu' : 'Sudah bergabung'}
    </Typography>
  ) : (
    <Pressable
      style={{
        borderRadius: 100,
      }}
      onPress={() => {
        mutate({
          posyanduId,
          userId: user.id,
        })
      }}
      disabled={isDisabled}
      android_ripple={{
        color: tokens.colors.ripple,
        borderless: true,
      }}
    >
      {isPendingJoinPosyandu ? (
        <LoadingIndicator size={tokens.iconSize.M} />
      ) : (
        <Ionicons
          name="add"
          size={tokens.iconSize.L}
          color={
            isDisabled
              ? tokens.colors.neutral.normal
              : tokens.colors.primary.dark
          }
        />
      )}
    </Pressable>
  )

  return (
    <SinglePosyanduListMember
      name={name}
      city={city}
      province={province}
      disabled
      rightElement={rightElement}
    />
  )
}

export default NewPosyanduSearchListMember
