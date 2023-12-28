import { useKidInfoContext } from '@/context/KidInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import Divider from '@/design-system/Divider'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MONTHS_LIST_LONG } from '@/utils/dateFormatter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Pressable, ScrollView, View } from 'react-native'
import { KidDetailsStackParamsList } from '../kid-details-stack'
import { useGetGrowthHistoryQuery } from './utils'

type GrowthHistoryScreenProps = NativeStackScreenProps<
  KidDetailsStackParamsList,
  'growthHistory'
>

function GrowthHistoryScreen({ navigation }: GrowthHistoryScreenProps) {
  const { kidInfo } = useKidInfoContext()

  function navigateToAddGrowthRecord() {
    navigation.navigate('createGrowthRecord')
  }

  function onGrowthRecordPress(recordId: string) {
    navigation.navigate('growthRecordDetails', {
      recordId,
    })
  }

  const { data, isPending, isError, refetch } = useGetGrowthHistoryQuery(
    kidInfo.id,
  )

  if (isPending) return <LoadingIndicator fullPage />
  if (isError)
    return (
      <ErrorIndicator
        fullPage
        message="Tidak bisa memuat riwayat pertumbuhan anak"
        onRetry={refetch}
      />
    )

  if (data.length === 0) {
    return (
      <EmptyResultIndicator
        message="Belum ada riwayat pertumbuhan"
        actionComponent={
          <DenyutButton
            title="Tambah Riwayat Pertumbuhan"
            onPress={navigateToAddGrowthRecord}
          />
        }
        fullPage
      />
    )
  }

  return (
    <ScrollView
      style={{
        backgroundColor: tokens.colors.neutral.white,
      }}
      contentContainerStyle={{
        paddingVertical: tokens.padding.S,
      }}
    >
      {data.map(
        ({ recordId, outpostRecordMonthIdx, outpostRecordYear }, idx) => (
          <View key={recordId}>
            {idx > 0 && <Divider />}
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: tokens.padding.L,
                paddingVertical: tokens.padding.L,
              }}
              onPress={() => onGrowthRecordPress(recordId)}
              android_ripple={{
                color: tokens.colors.ripple,
              }}
            >
              <Typography
                variant={{
                  size: 'paragraphS',
                }}
              >
                {MONTHS_LIST_LONG[outpostRecordMonthIdx]} {outpostRecordYear}
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  style={{
                    color: tokens.colors.primary.normal,
                  }}
                  variant={{
                    size: 'paragraphS',
                    textStyling: {
                      weight: 'bold',
                    },
                  }}
                >
                  Tampilkan Data
                </Typography>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color={tokens.colors.neutral.normal}
                  size={tokens.iconSize.M}
                />
              </View>
            </Pressable>
          </View>
        ),
      )}
    </ScrollView>
  )
}

export default GrowthHistoryScreen
