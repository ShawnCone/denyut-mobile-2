import { useKidInfoContext } from '@/context/KidInfoContext'
import Typography from '@/design-system/Typography'
import { getDisplaySexStr } from '@/design-system/forms/SexSelectionFormInput'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayDate, getDisplayDistanceAge } from '@/utils/dateFormatter'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { KidDetailsStackParamsList } from '../../kid-details-stack'
import { GrowthDetailsStackParamsList } from '../growth-details-stack'
import { useGrowthDetailsContext, usePrintGrowthData } from '../utils'
import DeleteGrowthRecordButton from './DeleteGrowthRecordButton'
import GrowthDetailsTabView from './GrowthDetailsTabView/GrowthDetailsTabView'

type GrowthDetailsHomeScreenProps = NativeStackScreenProps<
  GrowthDetailsStackParamsList,
  'growthDetailsHome'
>
function GrowthDetailsHomeScreen({ navigation }: GrowthDetailsHomeScreenProps) {
  const { growthDetails } = useGrowthDetailsContext()
  const { kidInfo } = useKidInfoContext()

  function goBackSafe() {
    // Don't go to new growth record screen
    const parentNavigation = navigation.getParent()
    const routeToAvoid: keyof KidDetailsStackParamsList = 'createGrowthRecord'
    const fallbackRoute: keyof KidDetailsStackParamsList = 'kidDetailsHome'
    const parentRoutes = parentNavigation?.getState().routes
    const previousParentRoute = parentRoutes?.[parentRoutes.length - 2]

    if (parentNavigation && previousParentRoute?.name === routeToAvoid) {
      parentNavigation.navigate(fallbackRoute)
      return
    }

    navigation.goBack()
  }

  const printGrowthDetails = usePrintGrowthData()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={goBackSafe}
          android_ripple={{
            color: tokens.colors.ripple,
            borderless: true,
          }}
        >
          <MaterialCommunityIcons name="arrow-left" size={tokens.iconSize.M} />
        </Pressable>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.margin.S,
          }}
        >
          <DeleteGrowthRecordButton onSuccess={goBackSafe} />
          <Pressable
            onPress={printGrowthDetails}
            android_ripple={{
              color: tokens.colors.ripple,
              borderless: true,
            }}
          >
            <MaterialCommunityIcons
              name="printer"
              size={tokens.iconSize.M}
              color={tokens.colors.primary.normal}
            />
          </Pressable>
        </View>
      ),
    })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        gap: tokens.margin.L,
      }}
    >
      {/* Top card */}
      <View
        style={{
          backgroundColor: tokens.colors.neutral.white,
          padding: tokens.padding.L,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.margin.L,
        }}
      >
        {/* Change this to avatar later */}
        <View
          style={{
            paddingHorizontal: tokens.padding.M,
          }}
        >
          <FontAwesome
            name="child"
            size={tokens.iconSize.L}
            color={tokens.colors.primary.dark}
          />
        </View>

        <View>
          <Typography
            variant={{
              size: 'paragraph',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            {kidInfo.name}
          </Typography>
          <View>
            <Typography
              variant={{
                size: 'caption',
              }}
            >
              {getDisplaySexStr(kidInfo.sex)}
            </Typography>
            <Typography
              variant={{
                size: 'captionS',
              }}
            >
              {getDisplayDate(kidInfo.dateOfBirth)} (
              {getDisplayDistanceAge(
                kidInfo.dateOfBirth,
                growthDetails.measurementDate,
              )}{' '}
              saat pengukuran)
            </Typography>
          </View>
        </View>
      </View>
      {/* Tabview here */}
      <GrowthDetailsTabView />
    </View>
  )
}

export default GrowthDetailsHomeScreen
