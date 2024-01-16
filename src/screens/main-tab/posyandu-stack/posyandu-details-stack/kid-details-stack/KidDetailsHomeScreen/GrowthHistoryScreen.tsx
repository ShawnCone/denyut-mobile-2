import { useKidInfoContext } from '@/context/KidInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import Divider from '@/design-system/Divider'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import SingleMonthYearCard from '@/design-system/SIngleMonthYearCard'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, View } from 'react-native'
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
            <SingleMonthYearCard
              monthIdx={outpostRecordMonthIdx}
              year={outpostRecordYear}
              onPress={() => onGrowthRecordPress(recordId)}
              rightLabel="Tampilkan Data"
            />
          </View>
        ),
      )}
    </ScrollView>
  )
}

export default GrowthHistoryScreen
