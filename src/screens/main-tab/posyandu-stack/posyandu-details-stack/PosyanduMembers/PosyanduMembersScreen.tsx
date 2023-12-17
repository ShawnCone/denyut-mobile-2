import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import Typography from '@/design-system/Typography'
import { View } from 'react-native'
import { usePosyanduMembersQuery } from './utils'

function PosyanduMembersScreen() {
  const {
    posyanduInfo: { id: posyanduId },
  } = usePosyanduInfoContext()

  const { data } = usePosyanduMembersQuery(posyanduId)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Typography>Posyandu Members Screen</Typography>
      {typeof data === 'undefined' ? (
        <Typography>Loading...</Typography>
      ) : (
        <Typography>Data: {JSON.stringify(data)}</Typography>
      )}
    </View>
  )
}

export default PosyanduMembersScreen
