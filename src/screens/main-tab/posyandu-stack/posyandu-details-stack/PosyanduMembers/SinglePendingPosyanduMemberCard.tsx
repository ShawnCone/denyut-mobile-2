import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import SinglePosyanduMemberCard, {
  SinglePosyanduMemberCardMemberInfo,
} from './SinglePosyanduMemberCard'

function SinglePendingPosyanduMemberCard({
  name,
  phoneNumber,
  id,
}: SinglePosyanduMemberCardMemberInfo) {
  // Action: Show modal and accept or kick member

  return (
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
              // Open modal to kick member
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
              // Open modal to kick member
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
  )
}

export default SinglePendingPosyanduMemberCard
