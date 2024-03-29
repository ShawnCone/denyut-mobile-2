import { usePosyanduInfoContext } from '@/context/PosyanduInfoContext'
import Divider from '@/design-system/Divider'
import DummyDarkHeader from '@/design-system/DummyDarkHeader'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import SingleRegularMenuCard from '../../../../../design-system/SingleRegularMenuCard'
import GrowthBottomSheet from '../../../../../design-system/kid-growth/GrowthBottomSheeet'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import LeavePosyanduButton from './LeavePosyanduButton'
import { formatPosyanduInfoLocation } from './utils'

type PosyanduDetailsScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'PosyanduDetailsHome'
>

function PosyanduDetailsScreen({ navigation }: PosyanduDetailsScreenProps) {
  const { posyanduInfo } = usePosyanduInfoContext()

  const [growthBottomSheetOpen, setGrowthBottomSheetOpen] = useState(false)

  function openGrowtBottomSheet() {
    setGrowthBottomSheetOpen(true)
  }

  function closeGrowthBottomSheet() {
    setGrowthBottomSheetOpen(false)
  }

  // Back to posyandu selection
  function goToPosyanduHomeScreen() {
    // MAY BE UNSAFE
    navigation.getParent()?.navigate('PosyanduHome')
  }

  function navigateToPosyanduMembers() {
    navigation.navigate('ApprovedPosyanduDetailsMembers')
  }

  function navigateToKidRegistration() {
    navigation.navigate('KidRegistration')
  }

  function navigateToRegularKidList() {
    navigation.navigate('PosyanduDetailsKidsList', {
      nextKidDetailsRoute: 'kidDetailsHome',
    })
  }

  function navigateToSKDNGeneration() {
    navigation.navigate('PosyanduSKDNGeneration')
  }

  function onAddGrowthRecordPress() {
    closeGrowthBottomSheet()
    navigation.navigate('PosyanduDetailsKidsList', {
      nextKidDetailsRoute: 'createGrowthRecord',
    })
  }

  function onGrowthHistoryPress() {
    closeGrowthBottomSheet()
    navigation.navigate('PosyanduDetailsKidsList', {
      nextKidDetailsRoute: 'growthHistory',
    })
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Dummy Header (For bottom sheet modal purposes) */}
      <DummyDarkHeader goBack={goToPosyanduHomeScreen} />
      {/* Header and main options */}
      <View
        style={{
          backgroundColor: tokens.colors.primary.dark,
          paddingHorizontal: tokens.padding.L,
          gap: tokens.margin.L,
          paddingVertical: tokens.padding.L,
          borderBottomRightRadius: tokens.borderRadius.M,
          borderBottomLeftRadius: tokens.borderRadius.M,
        }}
      >
        {/* Header */}
        <View
          style={{
            gap: tokens.margin.M,
          }}
        >
          <Typography
            variant={{ size: 'Heading4' }}
            style={{
              color: tokens.colors.neutral.white,
            }}
          >
            {posyanduInfo.name}
          </Typography>
          <Typography
            variant={{ size: 'caption' }}
            style={{
              color: tokens.colors.neutral.white,
            }}
          >
            {formatPosyanduInfoLocation(posyanduInfo)}
          </Typography>
        </View>
        <Divider />
        {/* Main actions */}
        <View
          style={{
            gap: tokens.margin.L,
          }}
        >
          <Typography
            variant={{
              size: 'paragraph',
              textStyling: {
                weight: 'bold',
              },
            }}
            style={{
              color: tokens.colors.neutral.white,
            }}
          >
            Jenis Pemeriksaan
          </Typography>
          {/* Icon button (s) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                gap: tokens.margin.S,
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  borderWidth: tokens.borderWidth.M,
                  padding: tokens.padding.M,
                  borderColor: tokens.colors.neutral.white,
                  borderRadius: tokens.borderRadius.M,
                  backgroundColor: tokens.colors.primary.normal,
                }}
                android_ripple={{
                  color: tokens.colors.ripple,
                }}
                onPress={openGrowtBottomSheet}
              >
                <MaterialCommunityIcons
                  name="human-male-height"
                  size={tokens.iconSize.L}
                  color={tokens.colors.neutral.white}
                />
              </Pressable>
              <Typography
                variant={{
                  size: 'captionS',
                  textStyling: {
                    weight: 'bold',
                  },
                }}
                style={{
                  color: tokens.colors.neutral.white,
                }}
              >
                Tumbuh
              </Typography>
            </View>
          </View>
        </View>
      </View>
      {/* Menu Section */}
      <ScrollView
        contentContainerStyle={{
          gap: tokens.margin.M,
          paddingTop: tokens.padding.L,
        }}
      >
        {/* Kids section */}
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
            Anak
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
                  name="account"
                  size={tokens.iconSize.M}
                  color={tokens.colors.primary.normal}
                />
              }
              title="Registrasi Anak"
              description="Terdapat peserta baru di posyandu anda? Daftarkan anak disini"
              onPress={navigateToKidRegistration}
            />
            <SingleRegularMenuCard
              icon={
                <MaterialCommunityIcons
                  name="human-male-female-child"
                  size={tokens.iconSize.M}
                  color={tokens.colors.primary.normal}
                />
              }
              title="Daftar Anak"
              description="Lihat daftar anak yang terdaftar di posyandu anda"
              onPress={navigateToRegularKidList}
            />
          </View>
        </View>
        {/* Posyandu Section */}
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
            Posyandu
          </Typography>
          <View
            style={{
              marginTop: tokens.margin.L,
              gap: tokens.margin.M,
            }}
          >
            <SingleRegularMenuCard
              icon={
                <SimpleLineIcons
                  name="graph"
                  size={tokens.iconSize.M}
                  color={tokens.colors.primary.normal}
                />
              }
              title="Laporan"
              description="Unduh laporan SKDN"
              onPress={navigateToSKDNGeneration}
            />
            <SingleRegularMenuCard
              icon={
                <MaterialCommunityIcons
                  name="account-group"
                  size={tokens.iconSize.M}
                  color={tokens.colors.primary.normal}
                />
              }
              title="Daftar Kader"
              description="Kelola pengurus kader untuk pengisian data di posyandu anda"
              onPress={navigateToPosyanduMembers}
            />
          </View>
        </View>
        {/* Exit posyandu button */}
        <View
          style={{
            padding: tokens.padding.L,
          }}
        >
          <LeavePosyanduButton onLeavePosyandu={goToPosyanduHomeScreen} />
        </View>
      </ScrollView>
      {/* Bottom sheets */}
      <GrowthBottomSheet
        open={growthBottomSheetOpen}
        onClose={closeGrowthBottomSheet}
        onAddRecordPress={onAddGrowthRecordPress}
        onHistoryPress={onGrowthHistoryPress}
      />
    </View>
  )
}

export default PosyanduDetailsScreen
