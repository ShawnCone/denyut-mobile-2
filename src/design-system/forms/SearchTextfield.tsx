import { Ionicons } from '@expo/vector-icons'
import { tokens } from '../tokens/tokens'
import DenyutTextfield from './DenyutTextfield'

type SearchTextfieldProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  placeholder?: string
}

function SearchTextfield({
  searchQuery,
  setSearchQuery,
  placeholder,
}: SearchTextfieldProps) {
  return (
    <DenyutTextfield
      leftChildren={
        <Ionicons
          name="search"
          size={tokens.iconSize.M}
          color={tokens.colors.primary.normal}
        />
      }
      placeholder={placeholder}
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  )
}

export default SearchTextfield
