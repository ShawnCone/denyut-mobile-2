import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import Divider from '@/design-system/Divider'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import SinglePosyanduListMember from '../SinglePosyanduListMember'
import { useUserPosyanduListQuery } from './utils'

type MyPosyanduListProps = {
  userId: string
  onPosyanduPress: (posyanduId: string) => void
}
function MyPosyanduList({ userId, onPosyanduPress }: MyPosyanduListProps) {
  const {
    data: posyanduInfoArr,
    refetch: refetchPosyanduInfoArr,
    isError,
    isPending,
  } = useUserPosyanduListQuery(userId)

  const [searchQuery, setSearchQuery] = useState('')

  // If possible, couple this with posyandInfoArr
  const filteredPosyanduInfoArr =
    isPending || isError
      ? []
      : handleFilterPosyanduInfoArr(posyanduInfoArr, searchQuery)

  return (
    <View
      style={{
        backgroundColor: tokens.colors.neutral.white,
        flex: 1,
      }}
    >
      <Typography
        variant={{
          size: 'paragraph',
          textStyling: {
            weight: 'bold',
          },
        }}
      >
        Posyandu Saya
      </Typography>
      <View
        style={{
          marginTop: tokens.margin.M,
        }}
      >
        <SearchTextfield
          placeholder="Cari posyandu saya"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>

      <View
        style={{
          paddingVertical: tokens.padding.L,
          flex: 1,
        }}
      >
        <ScrollView>
          {isPending ? (
            <LoadingIndicator message="Memuat posyandu saya" />
          ) : isError ? (
            <ErrorIndicator onRetry={refetchPosyanduInfoArr} />
          ) : (
            filteredPosyanduInfoArr.map(
              ({ name, city, province, id: posyanduId }, idx) => (
                <View key={posyanduId}>
                  {idx > 0 && <Divider />}
                  <SinglePosyanduListMember
                    name={name}
                    city={city}
                    province={province}
                    onPress={() => {
                      onPosyanduPress(posyanduId)
                    }}
                  />
                </View>
              ),
            )
          )}
        </ScrollView>
      </View>
    </View>
  )
}

function handleFilterPosyanduInfoArr(
  posyanduInfoArr: PosyanduInfo[],
  searchQuery: string,
) {
  return posyanduInfoArr.filter(
    ({ name, city, province }) =>
      name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      city.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      province.toLowerCase().startsWith(searchQuery.toLowerCase()),
  )
}

export default MyPosyanduList