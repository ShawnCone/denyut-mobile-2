import { useProtectedAuthContext } from '@/context/AuthContext'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import Divider from '@/design-system/Divider'
import EmptyResultIndicator from '@/design-system/EmptyResultIndicator'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import SingleMonthYearCard from '@/design-system/SIngleMonthYearCard'
import { tokens } from '@/design-system/tokens/tokens'
import { ScrollView, View } from 'react-native'
import {
  useDownloadPosyanduSKDNReport,
  useValidPosyanduSKDNMonths,
} from './utils'

function SKDNValidMonthsList() {
  const {
    posyanduInfo: { id: posyanduId },
  } = usePosyanduInfoContext()

  const { data, isPending, isError, refetch } =
    useValidPosyanduSKDNMonths(posyanduId)

  const { mutate: downloadPosyanduSKDNReport } = useDownloadPosyanduSKDNReport({
    onSuccess: tempDownloadUri => {
      console.log(tempDownloadUri)
    },
  })

  const {
    session: { access_token: authToken },
  } = useProtectedAuthContext()
  const onMonthYearCardPress = (monthIdx: number, year: number) => {
    downloadPosyanduSKDNReport({ authToken, posyanduId, monthIdx, year })
  }

  if (isPending) return <LoadingIndicator fullPage />
  if (isError)
    return (
      <ErrorIndicator
        fullPage
        message="Tidak bisa memuat bulan pelaporan SKDN"
        onRetry={refetch}
      />
    )

  if (data.length === 0) {
    return (
      <EmptyResultIndicator
        message="Tidak ada bulan pelaporan SKDN yang tersedia, mohon lakukan minimal 1 pencatatan untuk bulan / tahun di posyandu ini"
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
      {data.map(({ monthIdx, year }, idx) => (
        <View key={`${monthIdx}-${year}`}>
          {idx > 0 && <Divider />}
          <SingleMonthYearCard
            monthIdx={monthIdx}
            year={year}
            onPress={() => {
              onMonthYearCardPress(monthIdx, year)
            }}
            rightLabel="Lihat laporan"
          />
        </View>
      ))}
    </ScrollView>
  )
}

export default SKDNValidMonthsList
