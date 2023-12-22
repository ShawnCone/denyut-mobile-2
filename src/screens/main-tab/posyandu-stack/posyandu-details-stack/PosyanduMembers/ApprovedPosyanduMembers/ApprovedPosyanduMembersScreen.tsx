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
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PosyanduDetailsStackParamsList } from '../../posyandu-details-stack'
import { usePosyanduMembersQuery, useUserIsPosyanduAdminQuery } from '../utils'
import SingleApprovedPosyanduMemberCard from './SingleApprovedPosyanduMemberCard'

type ApprovedPosyanduMembersScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'ApprovedPosyanduDetailsMembers'
>

function ApprovedPosyanduMembersScreen({
  navigation,
}: ApprovedPosyanduMembersScreenProps) {
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

  function handleNavigateToPendingMembersScreen() {
    navigation.navigate('PendingPosyanduDetailsMembers')
  }

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
            android_ripple={{
              color: tokens.colors.neutral.white,
            }}
            onPress={handleNavigateToPendingMembersScreen}
          >
            <Typography
              style={{
                color: tokens.colors.neutral.white,
              }}
              variant={{
                size: 'caption',
                textStyling: {
                  weight: 'bold',
                },
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
            flex: 1,
            paddingBottom: tokens.padding.M,
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
                  <SingleApprovedPosyanduMemberCard
                    name={name}
                    phoneNumber={phoneNumber}
                    id={id}
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

export default ApprovedPosyanduMembersScreen
