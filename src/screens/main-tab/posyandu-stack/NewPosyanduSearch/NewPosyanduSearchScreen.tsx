import { PosyanduInfo } from '@/client/supabase/queries/posyandu-info'
import { useProtectedAuthContext } from '@/context/AuthContext'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import { useState } from 'react'
import { View } from 'react-native'
import { useJoinPosyandu, usePosyanduSearchQuery } from './utils'

function NewPosyanduSearchScreen() {
  const [queryKeyword, setQueryKeyword] = useState('')
  const { data, isLoading, isError } = usePosyanduSearchQuery(queryKeyword)

  console.log({ isLoading, isError })

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
      {data?.map(posyandu => (
        <SinglePosyanduResultRow posyanduInfo={posyandu} />
      ))}
    </View>
  )
}

type SinglePosyanduResultRowProps = {
  posyanduInfo: PosyanduInfo
}

function SinglePosyanduResultRow({
  posyanduInfo,
}: SinglePosyanduResultRowProps) {
  const { isPending, mutate } = useJoinPosyandu({
    onError: error => {
      // Toast
      console.log({ error })
    },
    onSuccess: () => {
      // Maybe toast?
    },
  })
  const { user } = useProtectedAuthContext()

  function handleJoinPosyandu() {
    mutate({
      posyanduId: posyanduInfo.id,
      userId: user.id,
    })
  }

  return (
    <DenyutButton
      title={`Gabung ${posyanduInfo.name}`}
      key={posyanduInfo.id}
      onPress={() => {
        handleJoinPosyandu()
      }}
      disabled={isPending}
    />
  )
}

export default NewPosyanduSearchScreen
