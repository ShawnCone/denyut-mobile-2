import { SingleMeasurementMonthSkdnDataResponse } from '@/client/denyut-posyandu-be/__generated__/graphql'
import { getSingleMonthSKDNData } from '@/client/denyut-posyandu-be/queries/get-single-month-skdn-data'
import { getValidSKDNMonths } from '@/client/denyut-posyandu-be/queries/get-valid-skdn-months'
import { supabaseClient } from '@/client/supabase/supabase'
import { useProtectedAuthContext } from '@/context/AuthContext'
import {
  SUCCESSFULLY_SAVED_REPORT,
  UNABLE_TO_DOWNLOAD_REPORT,
  UNABLE_TO_SAVE_REPORT,
} from '@/design-system/toast/toast-messages'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  EncodingType,
  documentDirectory,
  writeAsStringAsync,
} from 'expo-file-system'
import { requestPermissionsAsync, saveToLibraryAsync } from 'expo-media-library'
import { ToastAndroid } from 'react-native'

export function useValidPosyanduSKDNMonths(posyanduId: string) {
  const {
    session: { access_token: authToken },
  } = useProtectedAuthContext()

  return useQuery({
    queryKey: ['valid-skdn-months', posyanduId],
    queryFn: async () => {
      getValidSKDNMonths({
        authToken,
        posyanduId,
      })
    },
  })
}

type GetSKDNImageReportParams = {
  monthsData: SingleMeasurementMonthSkdnDataResponse
  posyanduName: string
  posyanduRw: string
  posyanduKelurahan: string
  monthIdx: number
  year: number
}

export async function getSKDNImageReport({
  monthsData,
  monthIdx,
  year,
  posyanduName,
  posyanduRw,
  posyanduKelurahan,
}: GetSKDNImageReportParams): Promise<string> {
  const { data, error } = await supabaseClient.functions.invoke('create-skdn', {
    body: {
      posyanduName,
      rw: posyanduRw,
      kelurahan: posyanduKelurahan,
      monthsData: [
        {
          month: monthIdx,
          year,

          // Kid counts
          s: monthsData.sCount,
          k: monthsData.kCount,
          d: monthsData.dCount,
          n: monthsData.nCount,

          // Weight counts
          goodWeightCount: monthsData.goodWeightCount,
          lessWeightCount: monthsData.lessWeightCount,
          lowWeightCount: monthsData.lowWeightCount,

          // Jumlah balita lulus & s36
          s36: monthsData.S36Count,
          l: monthsData.LCount,
        },
      ],
    },
  })

  if (error !== null) {
    throw new Error('Unable to generate report')
  }

  // Save PNG in scratch space
  const tempReportLocalUri =
    documentDirectory + `/${posyanduName}-SKDN-${new Date().getTime()}.png`

  try {
    const fr = new FileReader()

    fr.onload = async () => {
      const fileUri = tempReportLocalUri
      // @ts-ignore
      await writeAsStringAsync(fileUri, fr.result.split(',')[1], {
        encoding: EncodingType.Base64,
      })
    }
    fr.readAsDataURL(data)
  } catch {
    throw new Error('unable to save report')
  }

  return tempReportLocalUri
}

type DownloadPosyanduSKDNReportParams = {
  authToken: string
  posyanduId: string
  monthIdx: number
  year: number
}

async function downloadPosyanduSKDNReport({
  authToken,
  posyanduId,
  monthIdx,
  year,
}: DownloadPosyanduSKDNReportParams) {
  // Get the data
  const data = await getSingleMonthSKDNData({
    authToken,
    posyanduId,
    recordMonthIdx: monthIdx,
    recordYear: year,
  })

  // Get image report
  const tempReportLocalUri = await getSKDNImageReport({
    monthsData: data,
    monthIdx,
    year,
    posyanduName: 'Posyandu',
    posyanduRw: 'RW',
    posyanduKelurahan: 'Kelurahan',
  })
  return tempReportLocalUri
}

async function saveSKDNReportToDevice(tempReportUri: string) {
  await requestPermissionsAsync()
  await saveToLibraryAsync(tempReportUri)
}

// Download posyandu SKDN report behaves like mutation
export function useDownloadPosyanduSKDNReport({
  onSuccess,
}: {
  onSuccess: (tempDownloadUri: string) => void
}) {
  return useMutation({
    mutationFn: downloadPosyanduSKDNReport,
    onSuccess,
    onError: () => {
      ToastAndroid.show(UNABLE_TO_DOWNLOAD_REPORT, ToastAndroid.SHORT)
    },
  })
}

export function useSaveSKDNReportToDevice() {
  return useMutation({
    mutationFn: saveSKDNReportToDevice,
    onSuccess: () => {
      ToastAndroid.show(SUCCESSFULLY_SAVED_REPORT, ToastAndroid.SHORT)
    },
    onError: () => {
      ToastAndroid.show(UNABLE_TO_SAVE_REPORT, ToastAndroid.SHORT)
    },
  })
}
