import { KidInfoSummary } from '@/client/supabase/queries/kid-info'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import DenyutButton from '@/design-system/DenyutButton'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import SearchTextfield from '@/design-system/forms/SearchTextfield'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayCurrentAge, getDisplayDate } from '@/utils/dateFormatter'
import { FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import { useGetPosyanduKidsQuery } from './utils'

type PosyanduDetailsKidsScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'PosyanduDetailsKids'
>

function PosyanduDetailsKidsScreen({
  navigation,
}: PosyanduDetailsKidsScreenProps) {
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

  function navigateToKidRegistration() {
    navigation.navigate('KidRegistration')
  }

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
                  onPress={navigateToKidRegistration}
                />
              }
            />
          ) : (
            <ScrollView>
              {posyanduKidInfoArr.map(kidInfo => (
                <SingleKidInfoKidCard
                  key={kidInfo.id}
                  name={kidInfo.name}
                  dateOfBirth={new Date(kidInfo.dateOfBirth)}
                  birthCity={kidInfo.birthCity}
                  birthProvince={kidInfo.birthProvince}
                  onPress={() => {
                    navigation.navigate('KidDetailsStack', {
                      kidId: kidInfo.id,
                      initialRoute: 'kidDetailsHome',
                    })
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

type SingleKidInfoKidCardProps = {
  onPress: () => void
  disabled?: boolean
  name: string
  dateOfBirth: Date
  birthCity: string
  birthProvince: string
}

function SingleKidInfoKidCard({
  onPress,
  disabled,
  name,
  dateOfBirth,
  birthCity,
  birthProvince,
}: SingleKidInfoKidCardProps) {
  return (
    <View
      style={{
        borderRadius: tokens.borderRadius.M,
        borderWidth: 1,
        borderColor: tokens.colors.transparent,
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.colors.neutral.white,
          paddingVertical: tokens.padding.L,
          paddingHorizontal: tokens.padding.L,
        }}
        onPress={onPress}
        android_ripple={{
          borderless: true,
          color: tokens.colors.ripple,
        }}
        disabled={disabled}
      >
        {/* Change this to avatar later */}
        <View
          style={{
            paddingHorizontal: tokens.padding.M,
          }}
        >
          <FontAwesome
            name="child"
            size={tokens.iconSize.L}
            color={tokens.colors.primary.dark}
          />
        </View>
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
            {getDisplayDate(dateOfBirth)} ({getDisplayCurrentAge(dateOfBirth)})
          </Typography>
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
            {birthCity}, {birthProvince}
          </Typography>
        </View>
      </Pressable>
    </View>
  )
}

export default PosyanduDetailsKidsScreen
