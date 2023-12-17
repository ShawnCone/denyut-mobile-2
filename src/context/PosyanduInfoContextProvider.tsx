import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import Typography from '@/design-system/Typography'
import { usePosyanduInfoQuery } from '@/screens/main-tab/posyandu-stack/utils'
import { ReactNode, createContext, useContext } from 'react'

// Posyandu info context, guaranteed to be not null
type PosyanduInfoContextValues = {
  posyanduInfo: PosyanduInfo
}

const placeholderPosyanduInfo: PosyanduInfo = {
  id: '',
  name: '',
  city: '',
  createdAt: '',
  kecamatan: '',
  kelurahan: '',
  province: '',
  rw: '',
}
const PosyanduInfoContext = createContext<PosyanduInfoContextValues>({
  posyanduInfo: placeholderPosyanduInfo,
})

type PosyanduInfoContextProviderProps = {
  children: ReactNode
  selectedPosyanduId: string
}

export const PosyanduInfoContextProvider = ({
  selectedPosyanduId,
  children,
}: PosyanduInfoContextProviderProps) => {
  const {
    data: posyanduInfo,
    isPending,
    isError,
  } = usePosyanduInfoQuery(selectedPosyanduId)

  if (isPending) {
    return <Typography>Loading...</Typography>
  }

  if (isError) {
    // Show error, maybe clear posyandu ID?
    return <Typography>Error...</Typography>
  }

  return (
    <PosyanduInfoContext.Provider value={{ posyanduInfo }}>
      {children}
    </PosyanduInfoContext.Provider>
  )
}

export const usePosyanduInfoContext = () => {
  const context = useContext(PosyanduInfoContext)

  if (context === undefined) {
    throw new Error(
      'usePosyanduInfoContext must be used within a PosyanduInfoContextProvider',
    )
  }

  return context
}
