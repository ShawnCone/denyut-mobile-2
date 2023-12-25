import { MaterialCommunityIcons } from '@expo/vector-icons'
import SingleRegularMenuCard from '../SingleRegularMenuCard'
import { tokens } from '../tokens/tokens'

type AddGrowthDataMenuCardProps = {
  onPress: () => void
}
function AddGrowthDataMenuCard({ onPress }: AddGrowthDataMenuCardProps) {
  return (
    <SingleRegularMenuCard
      icon={
        <MaterialCommunityIcons
          name="plus-circle"
          size={tokens.iconSize.M}
          color={tokens.colors.primary.normal}
        />
      }
      title="Tambah Data"
      description="Penambahan data hasil pemeriksaan dan pencatatan anak di posyandu anda"
      onPress={onPress}
    />
  )
}

export default AddGrowthDataMenuCard
