import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable, View } from 'react-native'
import RejectKickPosyanduMemberModal from '../RejectKickPosyanduMemberModal'
import SinglePosyanduMemberCard, {
  SinglePosyanduMemberCardMemberInfo,
} from '../SinglePosyanduMemberCard'
import AcceptPosyanduMemberModal from './AcceptPosyanduMemberModal'

function SinglePendingPosyanduMemberCard({
  name,
  phoneNumber,
  id,
}: SinglePosyanduMemberCardMemberInfo) {
  // If null, modal is not shown
  const [modalVisibleType, setModalVisibleType] = useState<
    'accept' | 'reject' | null
  >(null)

  return (
    <>
      <SinglePosyanduMemberCard
        name={name}
        phoneNumber={phoneNumber}
        id={id}
        rightElement={
          <View
            style={{
              flexDirection: 'row',
              gap: tokens.margin.M,
              alignItems: 'center',
            }}
          >
            <Pressable
              onPress={() => {
                setModalVisibleType('reject')
              }}
            >
              <MaterialCommunityIcons
                name="delete"
                color={tokens.colors.destructive.normal}
                size={tokens.iconSize.M}
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: tokens.colors.primary.normal,
                paddingVertical: tokens.padding.M,
                paddingHorizontal: tokens.padding.L,
                justifyContent: 'center',
                borderRadius: tokens.borderRadius.M,
              }}
              onPress={() => {
                setModalVisibleType('accept')
              }}
            >
              <Typography
                variant={{
                  size: 'caption',
                }}
                style={{
                  color: tokens.colors.neutral.white,
                }}
              >
                Terima
              </Typography>
            </Pressable>
          </View>
        }
      />
      <RejectKickPosyanduMemberModal
        isVisible={modalVisibleType === 'reject'}
        onClose={() => {
          setModalVisibleType(null)
        }}
        name={name}
        phoneNumber={phoneNumber}
        memberId={id}
        mode="reject"
      />
      <AcceptPosyanduMemberModal
        isVisible={modalVisibleType === 'accept'}
        onClose={() => {
          setModalVisibleType(null)
        }}
        name={name}
        phoneNumber={phoneNumber}
        memberId={id}
      />
    </>
  )
}

export default SinglePendingPosyanduMemberCard
