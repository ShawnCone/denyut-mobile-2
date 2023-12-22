import { PosyanduMemberWithPhoneNumberInfo } from '@/client/supabase/queries/posyandu-members'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import Divider from '@/design-system/Divider'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SinglePosyanduMemberCard from './SinglePosyanduMemberCard'
import { usePosyanduMembersQuery, useUserIsPosyanduAdminQuery } from './utils'

function PosyanduMembersScreen() {
  const {
    posyanduInfo: { id: posyanduId },
  } = usePosyanduInfoContext()

  const { user } = useProtectedAuthContext()

  const {
    data: userIsAdmin,
    isPending: userIsAdminIsPending,
    isError: userIsAdminIsError,
    refetch: refetchUserIsAdmin,
  } = useUserIsPosyanduAdminQuery(posyanduId, user.id)

  const {
    data: posyanduMembersArr,
    isPending: posyanduMembersArrIsPending,
    isError: posyanduMembersArrIsError,
    refetch: refetchPosyanduMembersArr,
  } = usePosyanduMembersQuery(posyanduId)

  const [searchQuery, setSearchQuery] = useState('')

  const approvedPosyanduMembersArr =
    posyanduMembersArrIsPending || posyanduMembersArrIsError
      ? []
      : posyanduMembersArr.filter(({ status }) => status === 'approved')

  // Filter by query
  const filterPosyanduMembersArr = handleFilterMembersArr(
    approvedPosyanduMembersArr,
    searchQuery,
  )

  // Show link to pending members
  const pendingPosyanduMembersCount =
    posyanduMembersArrIsPending || posyanduMembersArrIsError
      ? 0
      : posyanduMembersArr.filter(({ status }) => status === 'pending').length

  const showPendingMembersLink = userIsAdmin && pendingPosyanduMembersCount > 0

  if (userIsAdminIsPending) {
    return <LoadingIndicator message="Memuat" />
  }

  if (userIsAdminIsError) {
    return <ErrorIndicator onRetry={refetchUserIsAdmin} />
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.colors.neutral.white,
      }}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: tokens.margin.L,
          paddingTop: tokens.padding.L,
          gap: tokens.margin.M,
        }}
      >
        {showPendingMembersLink && (
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: tokens.padding.L,
              paddingHorizontal: tokens.padding.L,
              backgroundColor: tokens.colors.primary.dark,
              borderRadius: tokens.borderRadius.M,
            }}
            onPress={() => {
              console.log("navigate to 'Permintaan Bergabung' screen")
            }}
          >
            <Typography
              style={{
                color: tokens.colors.neutral.white,
              }}
              variant={{
                size: 'caption',
              }}
            >
              {pendingPosyanduMembersCount} Permintaan Bergabung
            </Typography>
            <MaterialCommunityIcons
              name="chevron-right"
              size={tokens.iconSize.M}
              color={tokens.colors.neutral.white}
            />
          </Pressable>
        )}

        <SearchTextfield
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Cari Anggota Posyandu"
        />

        <View
          style={{
            paddingVertical: tokens.padding.M,
            flex: 1,
          }}
        >
          <ScrollView>
            {posyanduMembersArrIsPending ? (
              <LoadingIndicator message="Memuat staf posyandu" />
            ) : posyanduMembersArrIsError ? (
              <ErrorIndicator onRetry={refetchPosyanduMembersArr} />
            ) : filterPosyanduMembersArr.length === 0 ? (
              <EmptyResultIndicator
                message={
                  searchQuery === ''
                    ? 'Tidak ada anggota di posyandu ini'
                    : 'Tidak dapat menemukan anggota'
                }
              />
            ) : (
              filterPosyanduMembersArr.map(({ name, id, phoneNumber }, idx) => (
                <View key={id}>
                  {idx > 0 && <Divider />}
                  <SinglePosyanduMemberCard
                    name={name}
                    phoneNumber={phoneNumber}
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
                        <Pressable>
                          <MaterialCommunityIcons
                            name="delete"
                            color={tokens.colors.destructive.normal}
                            size={tokens.iconSize.M}
                          />
                        </Pressable>
                      )
                    }
                  />
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

function handleFilterMembersArr(
  posyanduInfoArr: PosyanduMemberWithPhoneNumberInfo[],
  searchQuery: string,
) {
  return posyanduInfoArr.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
}

export default PosyanduMembersScreen
