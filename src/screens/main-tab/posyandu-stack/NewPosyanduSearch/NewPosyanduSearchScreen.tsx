import { useProtectedAuthContext } from '@/context/AuthContext'
import Divider from '@/design-system/Divider'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { Ionicons } from '@expo/vector-icons'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import SinglePosyanduListMember from '../SinglePosyanduListMember'
import { useJoinPosyandu, usePosyanduSearchQuery } from './utils'

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

  const { isPending: isPendingJoinPosyandu, mutate } = useJoinPosyandu({
    onError: error => {
      // Toast
      console.log({ error })
    },
    onSuccess: () => {
      // Maybe toast?
    },
  })
  const { user } = useProtectedAuthContext()

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
              data.map(
                (
                  { name, city, province, id: posyanduId, membershipStatus },
                  idx,
                ) => {
                  const isDisabled =
                    isPendingJoinPosyandu ||
                    typeof membershipStatus !== 'undefined'

                  const rightElement = membershipStatus ? (
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
                      {membershipStatus === 'pending'
                        ? 'Menunggu'
                        : 'Sudah bergabung'}
                    </Typography>
                  ) : (
                    <Ionicons
                      name="add"
                      size={tokens.iconSize.L}
                      color={tokens.colors.primary.dark}
                    />
                  )

                  return (
                    <View key={posyanduId}>
                      {idx > 0 && <Divider />}
                      <SinglePosyanduListMember
                        name={name}
                        city={city}
                        province={province}
                        onPress={() => {
                          mutate({
                            posyanduId,
                            userId: user.id,
                          })
                        }}
                        disabled={isDisabled}
                        rightElement={rightElement}
                      />
                    </View>
                  )
                },
              )
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default NewPosyanduSearchScreen
