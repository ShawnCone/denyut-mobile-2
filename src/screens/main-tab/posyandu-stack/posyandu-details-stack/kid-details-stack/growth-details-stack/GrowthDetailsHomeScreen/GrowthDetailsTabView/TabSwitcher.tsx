import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  GrowthMeasurementTypes,
  getGrowthMeasurementTypeLabel,
} from '../../utils'
import { PAGER_VIEW_NAMES } from './utils'

type TabSwitcherProps = {
  currentTab: GrowthMeasurementTypes
  setCurrentTab: (tab: GrowthMeasurementTypes) => void
}

function TabSwitcher({ currentTab, setCurrentTab }: TabSwitcherProps) {
  return (
    <View
      style={{
        backgroundColor: tokens.colors.neutral.white,
        padding: tokens.padding.L,
        gap: tokens.margin.M,
      }}
    >
      <Typography
        variant={{
          size: 'paragraphS',
          textStyling: {
            weight: 'bold',
          },
        }}
      >
        Jenis Pertumbuhan
      </Typography>
      <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          gap: tokens.margin.S,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {PAGER_VIEW_NAMES.map(name => {
          const isCurrentTab = currentTab === name
          return (
            <Pressable
              key={name}
              style={{
                backgroundColor: isCurrentTab
                  ? tokens.colors.primary.dark
                  : tokens.colors.neutral.white,
                borderColor: tokens.colors.neutral.normal,
                borderWidth: tokens.borderWidth.S,
                paddingVertical: tokens.padding.M,
                paddingHorizontal: tokens.padding.L,
                borderRadius: tokens.borderRadius.S,
              }}
              onPress={() => setCurrentTab(name)}
            >
              <Typography
                variant={{
                  size: 'caption',
                }}
                style={{
                  color: isCurrentTab
                    ? tokens.colors.neutral.white
                    : tokens.colors.neutral.normal,
                }}
              >
                {getGrowthMeasurementTypeLabel(name)}
              </Typography>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TabSwitcher
