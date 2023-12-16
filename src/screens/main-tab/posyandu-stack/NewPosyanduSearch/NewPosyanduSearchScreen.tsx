import Typography from '@/design-system/Typography'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import { useState } from 'react'
import { View } from 'react-native'
import { usePosyanduSearch } from './utils'

function NewPosyanduSearchScreen() {
  const [queryKeyword, setQueryKeyword] = useState('')
  const { data, isLoading, isError } = usePosyanduSearch(queryKeyword)
  console.log({ data, isLoading, isError })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Typography>NewPosyanduSearchScreen</Typography>
      <DenyutTextfield
        label="Search"
        value={queryKeyword}
        onChangeText={setQueryKeyword}
      />
    </View>
  )
}

export default NewPosyanduSearchScreen
