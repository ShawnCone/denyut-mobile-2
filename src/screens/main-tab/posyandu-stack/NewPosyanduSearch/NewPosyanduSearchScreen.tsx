import Divider from '@/design-system/Divider'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import NewPosyanduSearchListMember from './NewPosyanduSearchListMember'
import { usePosyanduSearchQuery } from './utils'

const DEBOUNCE_TIME = 500

function NewPosyanduSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_TIME)

  const {
    data,
    isPending: isPendingSearchResult,
    isError,
    refetch,
  } = usePosyanduSearchQuery(debouncedSearchQuery)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: tokens.margin.L,
          marginTop: tokens.margin.M,
        }}
      >
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
            paddingVertical: tokens.padding.M,
            flex: 1,
          }}
        >
          <ScrollView>
            {isPendingSearchResult ? (
              <LoadingIndicator message="Memuat posyandu saya" />
            ) : isError ? (
              <ErrorIndicator onRetry={refetch} />
            ) : (
              data.map((posyanduMembershipInfo, idx) => (
                <View key={posyanduMembershipInfo.id}>
                  {idx > 0 && <Divider />}
                  <NewPosyanduSearchListMember
                    posyanduMembershipInfo={posyanduMembershipInfo}
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

export default NewPosyanduSearchScreen
