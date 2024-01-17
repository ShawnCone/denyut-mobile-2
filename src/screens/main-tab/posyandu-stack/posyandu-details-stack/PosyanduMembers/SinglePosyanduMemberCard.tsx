import { Database } from '@/client/supabase/types'
import Typography from '@/design-system/Typography'
import AvatarDisplay from '@/design-system/forms/AvatarDisplay'
import { tokens } from '@/design-system/tokens/tokens'
import { ReactNode } from 'react'
import { View } from 'react-native'

export type SinglePosyanduMemberCardMemberInfo = {
  id: string
  name: string
  phoneNumber: string
  role?: Database['public']['Enums']['membership_role_enum']
}

type SinglePosyanduMemberCardProps = {
  onPress?: () => void
  rightElement?: ReactNode
} & SinglePosyanduMemberCardMemberInfo

function SinglePosyanduMemberCard({
  id,
  name,
  phoneNumber,
  rightElement,
  role,
}: SinglePosyanduMemberCardProps) {
  return (
    <View
      style={{
        borderRadius: tokens.borderRadius.M,
        borderWidth: 1,
        borderColor: tokens.colors.transparent,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: tokens.colors.neutral.white,
          paddingVertical: tokens.padding.L,
          paddingHorizontal: tokens.padding.L,
        }}
      >
        {/* Avatar */}
        <AvatarDisplay avatarType="user" id={id} size={tokens.iconSize.L} />
        <View
          style={{
            marginLeft: tokens.margin.L,
            gap: tokens.margin.XS,
          }}
        >
          <Typography
            variant={{
              size: 'caption',
              textStyling: {
                weight: 'bold',
              },
            }}
            numberOfLines={2}
          >
            {name}
          </Typography>

          <Typography
            variant={{
              size: 'captionS',
            }}
            style={{
              color: tokens.colors.neutral.normal,
            }}
          >
            +{phoneNumber}
          </Typography>
          {role && (
            <View>
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
                {role === 'owner' ? 'Admin' : 'Anggota'}
              </Typography>
            </View>
          )}
        </View>

        <View
          style={{
            marginLeft: 'auto',
          }}
        >
          {rightElement}
        </View>
      </View>
    </View>
  )
}

export default SinglePosyanduMemberCard
