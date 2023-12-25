import { useKidInfoContext } from '@/context/KidInfoContext'
import DummyDarkHeader from '@/design-system/DummyDarkHeader'
import Typography from '@/design-system/Typography'
import AddGrowthDataMenuCard from '@/design-system/kid-growth/AddGrowthDataMenuCard'
import GrowthHistoryDataMenuCard from '@/design-system/kid-growth/GrowthHistoryDataMenuCard'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayCurrentAge, getDisplayDate } from '@/utils/dateFormatter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, View } from 'react-native'
import SingleRegularMenuCard from '../../../../../../design-system/SingleRegularMenuCard'
import { PosyanduDetailsScreenNames } from '../../posyandu-details-stack'
import { KidDetailsStackParamsList } from '../kid-details-stack'
import DeleteKidButton from './DeleteKidButton'
import SingleKidDetailsDisplayInfo from './SingleKidDetailsDisplayInfo'

type KidDetailsHomeScreenProps = NativeStackScreenProps<
  KidDetailsStackParamsList,
  'kidDetailsHome'
>

function KidDetailsHomeScreen({ navigation }: KidDetailsHomeScreenProps) {
  const { kidInfo } = useKidInfoContext()

  function handleCustomGoBack() {
    // If coming from register, make it go back to posyandu details home, otherwise go back as normal
    // (Cannot go back to register)

    // Get parent navigation
    const parentNavigation = navigation.getParent() // Should be the posyandu details stack

    const parentRouteStack = parentNavigation?.getState()?.routes
    const prevParentRouteName =
      parentRouteStack?.[parentRouteStack.length - 2].name // Gets the previous parent route
    const parentRouteToAvoid: PosyanduDetailsScreenNames = 'KidRegistration'
    const fallbackParentRoute: PosyanduDetailsScreenNames =
      'PosyanduDetailsHome'

    // Make this safe. If unsafe, go back as normal
    if (parentNavigation && prevParentRouteName === parentRouteToAvoid) {
      parentNavigation.navigate(fallbackParentRoute)
      return
    }

    navigation.goBack()
  }

  function goToAddGrowth() {
    navigation.navigate('newGrowthRecord')
  }

  function goToGrowthHistory() {
    navigation.navigate('growthHistory')
  }

  function goToUpdateKidProfile() {
    navigation.navigate('updateKidProfile')
  }

  function goToPosyanduHome() {
    // Unsafe, but make the parent navigation (posyandu details stack) to go to details home
    const parentNavigation = navigation.getParent()
    const parentRouteTarget: PosyanduDetailsScreenNames = 'PosyanduDetailsHome'
    if (parentNavigation) {
      parentNavigation.navigate(parentRouteTarget)
      return
    }

    navigation.goBack() // Go back if unsafe, but it should be ok.
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Dummy header for avoiding going back to register */}
      <DummyDarkHeader goBack={handleCustomGoBack} />

      <View
        style={{
          backgroundColor: tokens.colors.primary.dark,
          paddingHorizontal: tokens.padding.L,
          paddingBottom: tokens.padding.L,
          paddingTop: tokens.padding.S,
          justifyContent: 'center',
          borderBottomLeftRadius: tokens.borderRadius.S,
          borderBottomRightRadius: tokens.borderRadius.S,
          gap: tokens.padding.S,
        }}
      >
        <Typography
          variant={{ size: 'Heading4' }}
          style={{
            color: tokens.colors.neutral.white,
          }}
          numberOfLines={3} // Just in case it's a long name
        >
          {kidInfo.name}
        </Typography>
        <SingleKidDetailsDisplayInfo
          icon={
            <MaterialCommunityIcons
              name="calendar"
              size={tokens.iconSize.M}
              color={tokens.colors.neutral.white}
            />
          }
          text={`${getDisplayDate(kidInfo.dateOfBirth)} (${getDisplayCurrentAge(
            kidInfo.dateOfBirth,
          )})`}
        />
        <SingleKidDetailsDisplayInfo
          icon={
            <MaterialCommunityIcons
              name="hospital-building"
              size={tokens.iconSize.M}
              color={tokens.colors.neutral.white}
            />
          }
          text={`${kidInfo.birthCity}, ${kidInfo.birthProvince}`}
        />
        {kidInfo.fatherName && (
          <SingleKidDetailsDisplayInfo
            icon={
              <MaterialCommunityIcons
                name="face-man"
                size={tokens.iconSize.M}
                color={tokens.colors.neutral.white}
              />
            }
            text={kidInfo.fatherName}
          />
        )}
        {kidInfo.motherName && (
          <SingleKidDetailsDisplayInfo
            icon={
              <MaterialCommunityIcons
                name="face-woman"
                size={tokens.iconSize.M}
                color={tokens.colors.neutral.white}
              />
            }
            text={kidInfo.motherName}
          />
        )}
      </View>

      {/* Menu Section */}
      <ScrollView
        contentContainerStyle={{
          gap: tokens.margin.M,
          paddingTop: tokens.padding.L,
        }}
      >
        {/* Growth section */}
        <View
          style={{
            backgroundColor: tokens.colors.neutral.white,
            padding: tokens.padding.L,
          }}
        >
          <Typography
            variant={{
              size: 'paragraph',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            Pertumbuhan
          </Typography>
          <View
            style={{
              marginTop: tokens.margin.L,
              gap: tokens.margin.M,
            }}
          >
            <AddGrowthDataMenuCard onPress={goToAddGrowth} />
            <GrowthHistoryDataMenuCard onPress={goToGrowthHistory} />
          </View>
        </View>
        {/* Kid Profile Section */}
        <View
          style={{
            backgroundColor: tokens.colors.neutral.white,
            padding: tokens.padding.L,
          }}
        >
          <Typography
            variant={{
              size: 'paragraph',
              textStyling: {
                weight: 'bold',
              },
            }}
          >
            Profil
          </Typography>
          <View
            style={{
              marginTop: tokens.margin.L,
              gap: tokens.margin.M,
            }}
          >
            <SingleRegularMenuCard
              icon={
                <MaterialCommunityIcons
                  name="pencil"
                  size={tokens.iconSize.M}
                  color={tokens.colors.primary.normal}
                />
              }
              title="Ubah Profil Anak"
              description="Ubah nama, alamat, dan info profil lainnya"
              onPress={goToUpdateKidProfile}
            />
          </View>
        </View>
        <View
          style={{
            padding: tokens.padding.L,
          }}
        >
          <DeleteKidButton onDeleteKidSuccess={goToPosyanduHome} />
        </View>
      </ScrollView>
    </View>
  )
}

export default KidDetailsHomeScreen
