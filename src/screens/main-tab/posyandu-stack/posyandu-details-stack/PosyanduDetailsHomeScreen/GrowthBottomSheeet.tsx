import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useEffect, useRef } from 'react'
import { Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SingleRegularMenuCard from './SingleRegularMenuCard'

const BOTTOM_SHEET_HEIGHT = 260

type GrowthBottomSheetProps = {
  open: boolean
  onClose: () => void
}

function GrowthBottomSheet({ open, onClose }: GrowthBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleClose = () => {
    bottomSheetRef.current?.close()
  }

  const handleOpen = () => {
    bottomSheetRef.current?.snapToIndex(0)
  }

  useEffect(() => {
    if (open) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [open])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={onClose}
      index={-1}
      snapPoints={[BOTTOM_SHEET_HEIGHT]}
      backdropComponent={props => {
        return (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              position: 'absolute',
            }}
          />
        )
      }}
    >
      <BottomSheetView
        style={{
          paddingHorizontal: tokens.padding.L,
          gap: tokens.margin.L,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            Tumbuh
          </Typography>
          <Pressable
            style={{
              flexDirection: 'row',
              gap: tokens.margin.XS,
              alignItems: 'center',
            }}
            onPress={() => {
              onClose()
            }}
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={tokens.iconSize.M}
              color={tokens.colors.neutral.normal}
            />
            <Typography
              variant={{
                size: 'caption',
              }}
              style={{
                color: tokens.colors.neutral.normal,
              }}
            >
              Tutup
            </Typography>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{
            gap: tokens.margin.M,
          }}
        >
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
            onPress={() => {
              // Do something
              console.log('Go to tambah data')
            }}
          />
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
            onPress={() => {
              // Do something
            }}
          />
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  )
}

export default GrowthBottomSheet
