import { KidInfoSummary } from '@/client/supabase/queries/kid-info'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import DenyutButton from '@/design-system/DenyutButton'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useGetPosyanduKidsQuery } from './PosyanduDetailsKidsScreen/utils'
import SinglePosyanduKidInfoSummaryCard from './SinglePosyanduKidInfoSummaryCard'

type PosyandKidsListProps = {
  onRegisterPress: () => void // Go to kid registration
  onKidPress: (kidId: KidInfoSummary['id']) => void // Go to kid details
}

function PosyanduKidsList({
  onRegisterPress,
  onKidPress,
}: PosyandKidsListProps) {
  const { posyanduInfo } = usePosyanduInfoContext()

  const {
    data: posyanduKidInfoArr,
    refetch,
    isPending,
    isError,
  } = useGetPosyanduKidsQuery({
    posyanduId: posyanduInfo.id,
  })

  const [searchQuery, setSearchQuery] = useState('')

  if (isPending) return <LoadingIndicator fullPage />
  if (isError)
    return (
      <ErrorIndicator
        fullPage
        message="Tidak bisa memuat daftar anak posyandu"
        onRetry={refetch}
      />
    )

  const filteredKidArr = getFilteredKidInfoArr(posyanduKidInfoArr, searchQuery)

  const emptyData = filteredKidArr?.length === 0 // If no kids, display empty indicator

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
        <View
          style={{
            marginTop: tokens.margin.M,
          }}
        >
          <SearchTextfield
            placeholder="Cari nama anak"
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
          {emptyData ? (
            <EmptyResultIndicator
              fullPage
              message="Hasil pencarian anak kosong"
              actionComponent={
                <DenyutButton
                  size="small"
                  variant="primary"
                  title="Registrasi Anak"
                  onPress={onRegisterPress}
                />
              }
            />
          ) : (
            <ScrollView>
              {posyanduKidInfoArr.map(kidInfo => (
                <SinglePosyanduKidInfoSummaryCard
                  key={kidInfo.id}
                  kidInfoSummary={kidInfo}
                  onPress={() => {
                    onKidPress(kidInfo.id)
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  )
}

function getFilteredKidInfoArr(
  kidInfoArr: KidInfoSummary[],
  searchQuery: string,
) {
  return kidInfoArr.filter(kidInfo => {
    const kidName = kidInfo.name.toLowerCase()
    const searchQueryLower = searchQuery.toLowerCase()

    return kidName.includes(searchQueryLower)
  })
}

export default PosyanduKidsList
