import { MaterialCommunityIcons } from '@expo/vector-icons'
import SingleRegularMenuCard from '../SingleRegularMenuCard'
import { tokens } from '../tokens/tokens'

type GrowthHistoryDataMenuCardProps = {
  onPress: () => void
}

function GrowthHistoryDataMenuCard({
  onPress,
}: GrowthHistoryDataMenuCardProps) {
  return (
    <SingleRegularMenuCard
      icon={
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={tokens.iconSize.M}
          color={tokens.colors.primary.normal}
        />
      }
      title="Riwayat Pemeriksaan Anak"
      description="Pantau hasil pemeriksaan dan pencatatan anak disini"
      onPress={onPress}
    />
  )
}

export default GrowthHistoryDataMenuCard
