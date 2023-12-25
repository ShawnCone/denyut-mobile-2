import { KidInfo } from '@/client/supabase/queries/kid-info'
import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { useKidInfoQuery } from '@/screens/main-tab/posyandu-stack/posyandu-details-stack/kid-details-stack/utils'
import { ReactNode, createContext, useContext } from 'react'

type KidInfoContextValues = {
  kidInfo: KidInfo
}

const placeholderKidInfo: KidInfo = {
  id: '',
  birthCity: '',
  birthProvince: '',
  createdAt: '',
  dateOfBirth: '',
  hasKMSBook: true,
  name: '',
  sex: 'male',
  birthHeight: null,
  birthWeight: null,
  fatherName: null,
  motherName: null,
  photoURL: null,
}

const KidInfoContext = createContext<KidInfoContextValues>({
  kidInfo: placeholderKidInfo,
})

type KidInfoContextProviderProps = {
  children: ReactNode
  selectedKidId: string
}
export function KidInfoContextProvider({
  selectedKidId,
  children,
}: KidInfoContextProviderProps) {
  const {
    data: kidInfo,
    isPending,
    isError,
    refetch,
  } = useKidInfoQuery(selectedKidId)

  if (isPending) {
    return <LoadingIndicator fullPage />
  }

  if (isError) {
    // Show error, maybe clear posyandu ID?
    return (
      <ErrorIndicator
        message="Terjadi kesalahan memuat data anak"
        fullPage
        onRetry={refetch}
      />
    )
  }

  return (
    <KidInfoContext.Provider value={{ kidInfo }}>
      {children}
    </KidInfoContext.Provider>
  )
}

export function useKidInfoContext() {
  const context = useContext(KidInfoContext)
  return context
}
