import { MONTHS_LIST_SHORT } from '@/utils/dateFormatter'
import React from 'react'
import { Modal, Pressable, TouchableWithoutFeedback, View } from 'react-native'
import Typography from '../../Typography'
import { tokens } from '../../tokens/tokens'

type DenyutMonthPickerModalProps = {
  isVisible: boolean
  onClose: () => void
  value: number
  setValue: (value: number) => void
}

export function DenyutMonthPickerModal({
  isVisible,
  onClose,
  value,
  setValue,
}: DenyutMonthPickerModalProps) {
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
              Pilih Bulan
            </Typography>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: tokens.margin.S,
              }}
            >
              {MONTHS_LIST_SHORT.map((month, index) => (
                <Pressable
                  key={index}
                  style={{
                    width: 100,
                    height: 80,
                    borderWidth: tokens.borderWidth.S,
                    borderColor: tokens.colors.neutral.light,
                    borderRadius: tokens.borderRadius.S,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      index === value ? tokens.colors.primary.light : undefined,
                  }}
                  onPress={() => {
                    setValue(index)
                    onClose()
                  }}
                >
                  <Typography
                    variant={{
                      size: 'paragraph',
                    }}
                  >
                    {month}
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

export default DenyutMonthPickerModal
