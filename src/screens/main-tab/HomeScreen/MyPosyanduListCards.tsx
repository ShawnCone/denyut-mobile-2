import ErrorIndicator from '@/design-system/ErrorIndicator'
import LoadingIndicator from '@/design-system/LoadingIndicator'
import { tokens } from '@/design-system/tokens/tokens'
import { ScrollView } from 'react-native'
import { useUserPosyanduListQuery } from '../posyandu-stack/PosyanduHome/utils'
import AddPosyanduCard from './AddPosyanduCard'
import SinglePosyanduCard from './SinglePosyanduCard'

type MyPosyanduListCardsProps = {
  onPosyanduPress: (posyanduId: string) => void
  onAddNewPosyanduPress: () => void
}

function MyPosyanduListCards({
  onPosyanduPress,
  onAddNewPosyanduPress,
}: MyPosyanduListCardsProps) {
  const { data, refetch, isError, isPending } = useUserPosyanduListQuery()

  if (isPending) {
    return <LoadingIndicator color={tokens.colors.neutral.white} />
  }

  if (isError) {
    return (
      <ErrorIndicator
        darkMode
        onRetry={refetch}
        message="Terjadi kesalahan saat memuat data posyandu"
      />
    )
  }

  if (data.length === 0) {
    return <AddPosyanduCard onAddNewPosyanduPress={onAddNewPosyanduPress} />
  }

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        gap: tokens.margin.L,
      }}
    >
      {data.map(posyanduInfo => (
        <SinglePosyanduCard
          key={posyanduInfo.id}
          name={posyanduInfo.name}
          city={posyanduInfo.city}
          province={posyanduInfo.province}
          isPending={posyanduInfo.status === 'pending'}
          onPress={() => onPosyanduPress(posyanduInfo.id)}
        />
      ))}
      <AddPosyanduCard onAddNewPosyanduPress={onAddNewPosyanduPress} />
    </ScrollView>
  )
}

export default MyPosyanduListCards
