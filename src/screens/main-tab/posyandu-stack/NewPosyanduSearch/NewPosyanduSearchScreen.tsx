import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import DenyutButton from '@/design-system/DenyutButton'
import Divider from '@/design-system/Divider'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import SinglePosyanduListMember from '../SinglePosyanduListMember'
import { useJoinPosyandu, usePosyanduSearchQuery } from './utils'

const DEBOUNCE_TIME = 500

function NewPosyanduSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_TIME)

  const { data, isPending, isError, refetch } =
    usePosyanduSearchQuery(debouncedSearchQuery)

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
            {isPending ? (
              <LoadingIndicator message="Memuat posyandu saya" />
            ) : isError ? (
              <ErrorIndicator onRetry={refetch} />
            ) : (
              data.map(({ name, city, province, id: posyanduId }, idx) => (
                <View key={posyanduId}>
                  {idx > 0 && <Divider />}
                  <SinglePosyanduListMember
                    name={name}
                    city={city}
                    province={province}
                    onPress={() => {}}
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

type SinglePosyanduResultRowProps = {
  posyanduInfo: PosyanduInfo
}

function SinglePosyanduResultRow({
  posyanduInfo,
}: SinglePosyanduResultRowProps) {
  const { isPending, mutate } = useJoinPosyandu({
    onError: error => {
      // Toast
      console.log({ error })
    },
    onSuccess: () => {
      // Maybe toast?
    },
  })
  const { user } = useProtectedAuthContext()

  function handleJoinPosyandu() {
    mutate({
      posyanduId: posyanduInfo.id,
      userId: user.id,
    })
  }

  return (
    <DenyutButton
      title={`Gabung ${posyanduInfo.name}`}
      key={posyanduInfo.id}
      onPress={() => {
        handleJoinPosyandu()
      }}
      disabled={isPending}
    />
  )
}

export default NewPosyanduSearchScreen
