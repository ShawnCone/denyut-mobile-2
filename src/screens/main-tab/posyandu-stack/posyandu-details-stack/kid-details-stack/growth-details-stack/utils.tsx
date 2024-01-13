import {
  GrowthRecordInfo,
  getGrowthRecordDetails,
} from '@/client/supabase/queries/growth-record'
import { Database } from '@/client/supabase/types'
import { useKidInfoContext } from '@/context/KidInfoContext'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { getDisplaySexStr } from '@/design-system/forms/SexSelectionFormInput'
import {
  getDisplayDate,
  getDisplayGrowthRecordDate,
} from '@/utils/dateFormatter'
import { useQuery } from '@tanstack/react-query'
import { printAsync } from 'expo-print'
import { createContext, useContext } from 'react'

export type GrowthMeasurementTypes = keyof Pick<
  Database['public']['Tables']['KidBodilyGrowth']['Row'],
  'weight' | 'height' | 'headCirc' | 'armCirc'
>

export function getGrowthDetailsQueryKey(recordId: string) {
  return ['growth-record', recordId]
}

export function useGrowthDetailsQuery(recordId: string) {
  return useQuery({
    queryKey: getGrowthDetailsQueryKey(recordId),
    queryFn: () => getGrowthRecordDetails({ recordId }),
  })
}

// Print module for growth details home screen
export function usePrintGrowthData() {
  const { kidInfo } = useKidInfoContext()
  const { posyanduInfo } = usePosyanduInfoContext()
  const { growthDetails } = useGrowthDetailsContext()

  const retDataArr: string[] = []
  // Get outpost info
  retDataArr.push(`Nama Posyandu: ${posyanduInfo.name}`)

  // Get kid info
  retDataArr.push(`Nama Anak: ${kidInfo.name}`)
  retDataArr.push(`Jenis Kelamin: ${getDisplaySexStr(kidInfo.sex)}`)
  retDataArr.push(`Tanggal Lahir: ${getDisplayDate(kidInfo.dateOfBirth)}`)

  // Measurement data
  retDataArr.push(
    `Bulan dan Tahun Penimbangan: ${getDisplayGrowthRecordDate({
      recordMonthIdx: growthDetails.outpostRecordMonthIdx,
      recordYear: growthDetails.outpostRecordYear,
    })}`,
  )

  // Weight
  retDataArr.push(`Berat Badan: ${growthDetails.weight.toFixed(1)} kg`)
  // Severity (Interpretation result here)
  // Weright increase from previous record if available here (And interpretation of it)

  // Height
  retDataArr.push(`Tinggi Badan: ${growthDetails.height.toFixed(1)} cm`)
  // Severity (Interpretation result here)

  // Head Circ
  retDataArr.push(
    `Lingkar Kepala: ${
      growthDetails.headCirc
        ? `${growthDetails.headCirc.toFixed(1)} cm `
        : 'Tidak Tersedia'
    }`,
  )

  if (growthDetails.headCirc) {
    // Severity (Interpretation result here)
  }

  // Arm circ
  retDataArr.push(
    `Lingkar Kepala: ${
      growthDetails.headCirc
        ? `${growthDetails.headCirc.toFixed(1)} cm `
        : 'Tidak Tersedia'
    }`,
  )

  if (growthDetails.armCirc) {
    // Severity (Interpretation result here)
  }

  // Print str
  const strToPrint = retDataArr.join('<br/>')

  const printFn = async () =>
    await printAsync({
      html: strToPrint,
    })

  return printFn
}

// Context
type GrowthDetailsContextValues = {
  growthDetails: GrowthRecordInfo
}

const GrowthDetailsContext = createContext<GrowthDetailsContextValues>({
  growthDetails: {
    recordId: '',
    kidId: '',
    weight: 0,
    height: 0,
    headCirc: null,
    armCirc: null,
    createdBy: null,
    measurementDate: '',
    outpostRecordMonthIdx: 0,
    outpostRecordYear: 0,
    createdAt: '',
  },
})

type GrowthDetailsContextProviderProps = {
  children: React.ReactNode
  recordId: string
}

export function GrowthDetailsContextProvider({
  children,
  recordId,
}: GrowthDetailsContextProviderProps) {
  // Also get previous growth detail here OR in the query function there's this information already

  const { data, isPending, isError, refetch } = useGrowthDetailsQuery(recordId)
  if (isPending) {
    return <LoadingIndicator fullPage />
  }

  if (isError) {
    return (
      <ErrorIndicator
        message="Terjadi kesalahan memuat data pertumbuhan"
        fullPage
        onRetry={refetch}
      />
    )
  }

  return (
    <GrowthDetailsContext.Provider
      value={{
        growthDetails: data,
      }}
    >
      {children}
    </GrowthDetailsContext.Provider>
  )
}

export function useGrowthDetailsContext() {
  return useContext(GrowthDetailsContext)
}

export function getGrowthMeasurementTypeLabel(
  inMeasurementType: GrowthMeasurementTypes,
) {
  switch (inMeasurementType) {
    case 'armCirc':
      return 'Lingkar Lengan'
    case 'headCirc':
      return 'Lingkar Kepala'
    case 'height':
      return 'Tinggi Badan'
    case 'weight':
      return 'Berat Badan'
  }
}
