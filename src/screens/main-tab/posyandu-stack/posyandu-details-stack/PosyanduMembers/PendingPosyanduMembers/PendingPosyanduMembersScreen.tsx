import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import Divider from '@/design-system/Divider'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { tokens } from '@/design-system/tokens/tokens'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { usePosyanduMembersQuery } from '../utils'
import SinglePendingPosyanduMemberCard from './SinglePendingPosyanduMemberCard'

function PendingPosyanduMembersScreen() {
  const {
    posyanduInfo: { id: posyanduId },
  } = usePosyanduInfoContext()

  const {
    data: posyanduMembersArr,
    isPending: posyanduMembersArrIsPending,
    isError: posyanduMembersArrIsError,
    refetch: refetchPosyanduMembersArr,
  } = usePosyanduMembersQuery(posyanduId)

  // Show link to pending members
  const pendingPosyanduMembersArr =
    posyanduMembersArrIsPending || posyanduMembersArrIsError
      ? []
      : posyanduMembersArr.filter(({ status }) => status === 'pending')

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
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollView>
            {posyanduMembersArrIsPending ? (
              <LoadingIndicator message="Memuat permintaan berabung posyandu" />
            ) : posyanduMembersArrIsError ? (
              <ErrorIndicator onRetry={refetchPosyanduMembersArr} />
            ) : pendingPosyanduMembersArr.length === 0 ? (
              <EmptyResultIndicator message="Tidak ada permintaan bergabung" />
            ) : (
              pendingPosyanduMembersArr.map(
                ({ name, id, phoneNumber }, idx) => (
                  <View key={id}>
                    {idx > 0 && <Divider />}
                    <SinglePendingPosyanduMemberCard
                      name={name}
                      phoneNumber={phoneNumber}
                      id={id}
                    />
                  </View>
                ),
              )
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default PendingPosyanduMembersScreen
