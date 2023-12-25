// Mocks header of react navigation, for custom back actions. Only works for android

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import { tokens } from './tokens/tokens'

const DUMMY_HEADER_HEIGHT = 56

type DummyDarkHeaderProps = {
  goBack: () => void
}

function DummyDarkHeader({ goBack }: DummyDarkHeaderProps) {
  return (
    <View
      style={{
        height: DUMMY_HEADER_HEIGHT,
        backgroundColor: tokens.colors.primary.dark,
        paddingHorizontal: tokens.padding.L,
        justifyContent: 'center',
      }}
    >
      <Pressable onPress={goBack}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={tokens.iconSize.M}
          color={tokens.colors.neutral.white}
        />
      </Pressable>
    </View>
  )
}

export default DummyDarkHeader
