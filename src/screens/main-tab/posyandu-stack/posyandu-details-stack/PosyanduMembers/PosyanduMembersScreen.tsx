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
import { usePosyanduMembersQuery } from './utils'

function PosyanduMembersScreen() {
  const {
    posyanduInfo: { id: posyanduId },
  } = usePosyanduInfoContext()

  const { user } = useProtectedAuthContext()

  const {
    data: posyanduMembersArr,
    isPending,
    isError,
    refetch,
  } = usePosyanduMembersQuery(posyanduId)
  const [searchQuery, setSearchQuery] = useState('')

  // If possible, couple this with posyandInfoArr
  const filterPosyanduMembersArr =
    isPending || isError
      ? []
      : handleFilterMembersArr(posyanduMembersArr, searchQuery)

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
          marginTop: tokens.margin.M,
        }}
      >
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
            {isPending ? (
              <LoadingIndicator message="Memuat staf posyandu" />
            ) : isError ? (
              <ErrorIndicator onRetry={refetch} />
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
