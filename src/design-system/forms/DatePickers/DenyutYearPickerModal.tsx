import React from 'react'
import { Modal, Pressable, TouchableWithoutFeedback, View } from 'react-native'
import Typography from '../../Typography'
import { tokens } from '../../tokens/tokens'

type DenyutYearPickerModalProps = {
  isVisible: boolean
  onClose: () => void
  value: number
  setValue: (value: number) => void
}

// Get years list from 2020 to current year
const YEARS_LIST = Array.from(
  { length: new Date().getFullYear() - 2019 },
  (_, i) => i + 2020,
)
export function DenyutYearPickerModal({
  isVisible,
  onClose,
  value,
  setValue,
}: DenyutYearPickerModalProps) {
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: tokens.colors.modalBackground,
          }}
        >
          <View
            style={{
              borderWidth: tokens.borderWidth.S,
              borderColor: tokens.colors.neutral.light,
              padding: tokens.padding.XL,
              width: '100%',
              backgroundColor: tokens.colors.neutral.white,
              gap: tokens.margin.L,
            }}
          >
            {/* Make a list of months, scroll view */}
            <Typography
              variant={{
                size: 'paragraph',
                textStyling: {
                  weight: 'bold',
                },
              }}
              style={{
                textAlign: 'center',
              }}
            >
              Pilih Tahun
            </Typography>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: tokens.margin.S,
              }}
            >
              {YEARS_LIST.map(year => (
                <Pressable
                  key={year}
                  style={{
                    width: 100,
                    height: 80,
                    borderWidth: tokens.borderWidth.S,
                    borderColor: tokens.colors.neutral.light,
                    borderRadius: tokens.borderRadius.S,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      year === value ? tokens.colors.primary.light : undefined,
                  }}
                  onPress={() => {
                    setValue(year)
                    onClose()
                  }}
                >
                  <Typography
                    variant={{
                      size: 'paragraph',
                    }}
                  >
                    {year}
                  </Typography>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default DenyutYearPickerModal
