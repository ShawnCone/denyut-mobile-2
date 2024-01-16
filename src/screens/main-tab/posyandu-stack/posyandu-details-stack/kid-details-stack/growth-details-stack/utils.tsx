import {
  GrowthInterpretationResponse,
  GrowthType,
  WeightGrowthEvaluationResponse,
} from '@/client/denyut-posyandu-be/__generated__/graphql'
import { getGrowthInterpretation } from '@/client/denyut-posyandu-be/queries/get-growth-interpretation'
import { getWeightEvaluation } from '@/client/denyut-posyandu-be/queries/get-weight-evaluation'
import {
  GrowthRecordInfo,
  getGrowthRecordDetails,
} from '@/client/supabase/queries/growth-record'
import { KidInfo } from '@/client/supabase/queries/kid-info'
import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import { Database } from '@/client/supabase/types'
import { useProtectedAuthContext } from '@/context/AuthContext'
import { useKidInfoContext } from '@/context/KidInfoContext'
import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { getDisplaySexStr } from '@/design-system/forms/SexSelectionFormInput'
import { showToast } from '@/design-system/toast/toast'
import { ERROR_PRINTING_GROWTH_RECORD } from '@/design-system/toast/toast-messages'
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

export async function getAllInterpretationData({
  authToken,
  recordId,
}: {
  authToken: string
  recordId: string
}): Promise<
  | {
      success: true
      weightInterpretation: GrowthInterpretationResponse | null | undefined
      heightInterpretation: GrowthInterpretationResponse | null | undefined
      headCircInterpretation: GrowthInterpretationResponse | null | undefined
      armCircInterpretation: GrowthInterpretationResponse | null | undefined
      weightEvaluation: WeightGrowthEvaluationResponse | null | undefined
    }
  | {
      success: false
    }
> {
  // Concurretly get all interpretation data
  // Promises for interpretation data
  const interpretationPromises: [
    Promise<GrowthInterpretationResponse | null | undefined>,
    Promise<GrowthInterpretationResponse | null | undefined>,
    Promise<GrowthInterpretationResponse | null | undefined>,
    Promise<GrowthInterpretationResponse | null | undefined>,
    Promise<WeightGrowthEvaluationResponse | null | undefined>,
  ] = [
    getGrowthInterpretation({
      authToken,
      recordId,
      growthType: GrowthType.Weight,
    }),
    getGrowthInterpretation({
      authToken,
      recordId,
      growthType: GrowthType.Height,
    }),
    getGrowthInterpretation({
      authToken,
      recordId,
      growthType: GrowthType.Headcirc,
    }),
    getGrowthInterpretation({
      authToken,
      recordId,
      growthType: GrowthType.Armcirc,
    }),
    getWeightEvaluation({
      authToken,
      recordId,
    }),
  ]

  const [
    weightInterpretation,
    heightInterpretation,
    headCircInterpretation,
    armCircInterpretation,
    weightEvaluation,
  ] = await Promise.allSettled(interpretationPromises)

  // If any of these has error, return error as value
  if (
    weightInterpretation.status === 'rejected' ||
    heightInterpretation.status === 'rejected' ||
    headCircInterpretation.status === 'rejected' ||
    armCircInterpretation.status === 'rejected' ||
    weightEvaluation.status === 'rejected'
  ) {
    return {
      success: false,
    }
  }

  return {
    success: true,
    weightInterpretation: weightInterpretation.value,
    heightInterpretation: heightInterpretation.value,
    headCircInterpretation: headCircInterpretation.value,
    armCircInterpretation: armCircInterpretation.value,
    weightEvaluation: weightEvaluation.value,
  }
}

async function generatePrintStr({
  kidInfo,
  posyanduInfo,
  growthDetails,
  authToken,
}: {
  kidInfo: KidInfo
  posyanduInfo: PosyanduInfo
  growthDetails: GrowthRecordInfo
  authToken: string
}) {
  // Get interpretation data
  const interpretationData = await getAllInterpretationData({
    authToken,
    recordId: growthDetails.recordId,
  })

  if (interpretationData.success === false) {
    throw new Error('Failed to get interpretation data')
  }

  // Valid, so produce string here
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
  retDataArr.push(`Berat Berat: ${growthDetails.weight.toFixed(1)} kg`)
  if (interpretationData.weightInterpretation) {
    retDataArr.push(
      `Hasil Interpretasi Berat Badan: ${interpretationData.weightInterpretation.label}`,
    )
  }
  if (interpretationData.weightEvaluation) {
    retDataArr.push(
      `Berat Badan Naik Berdasarkan KMS: ${
        interpretationData.weightEvaluation.isEnough ? 'Naik' : 'Tidak Naik'
      }`,
    )
  }

  // Height
  retDataArr.push(`Tinggi Badan: ${growthDetails.height.toFixed(1)} cm`)
  if (interpretationData.heightInterpretation) {
    retDataArr.push(
      `Hasil Interpretasi Tinggi Badan: ${interpretationData.heightInterpretation.label}`,
    )
  }

  // Severity (Interpretation result here)
  // Head Circ
  retDataArr.push(
    `Lingkar Kepala: ${
      growthDetails.headCirc
        ? `${growthDetails.headCirc.toFixed(1)} cm `
        : 'Tidak Tersedia'
    }`,
  )
  if (growthDetails.headCirc && interpretationData.headCircInterpretation) {
    retDataArr.push(
      `Hasil Interpretasi Linkar Kepala: ${interpretationData.headCircInterpretation.label}`,
    )
  }

  // Arm circ
  retDataArr.push(
    `Lingkar Kepala: ${
      growthDetails.headCirc
        ? `${growthDetails.headCirc.toFixed(1)} cm `
        : 'Tidak Tersedia'
    }`,
  )

  if (growthDetails.armCirc && interpretationData.armCircInterpretation) {
    retDataArr.push(
      `Hasil Interpretasi Linkar Lengan: ${interpretationData.armCircInterpretation.label}`,
    )
  }

  // Print str
  const strToPrint = retDataArr.join('<br/>')
  return strToPrint
}

// Print module for growth details home screen
export function usePrintGrowthData() {
  const { kidInfo } = useKidInfoContext()
  const { posyanduInfo } = usePosyanduInfoContext()
  const { growthDetails } = useGrowthDetailsContext()
  const {
    session: { access_token: authToken },
  } = useProtectedAuthContext()

  const printFn = async () => {
    try {
      const strToPrint = await generatePrintStr({
        kidInfo,
        posyanduInfo,
        growthDetails,
        authToken,
      })

      await printAsync({
        html: strToPrint,
      })
    } catch {
      showToast(ERROR_PRINTING_GROWTH_RECORD)
    }
  }
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
