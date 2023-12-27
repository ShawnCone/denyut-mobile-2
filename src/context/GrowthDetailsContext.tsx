import { GrowthRecordInfo } from '@/client/supabase/queries/growth-record'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { useGrowthDetailsQuery } from '@/screens/main-tab/posyandu-stack/posyandu-details-stack/kid-details-stack/growth-details-stack/utils'
import { createContext, useContext } from 'react'

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
