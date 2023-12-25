import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import LoadingIndicator from './LoadingIndicator'

const DEFAULT_CANCEL_TEXT = 'Kembali'

type ConfirmationModalProps = {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
  isDestructive?: boolean
  title: string
  description: string
  confirmText: string
  cancelText?: string
  isLoading?: boolean
  errorMessage?: string
}

function ConfirmationModal({
  isVisible,
  onClose,
  onConfirm,
  isDestructive = false,
  title,
  description,
  confirmText,
  cancelText = DEFAULT_CANCEL_TEXT,
  isLoading = false,
  errorMessage,
}: ConfirmationModalProps) {
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
          {/* Add touchable without feedback so when the view is pressed, 
          it does not propagate the action to the background touchable without feedback component */}
          <TouchableWithoutFeedback>
            <View
              style={{
                borderWidth: tokens.borderWidth.S,
                borderColor: tokens.colors.neutral.light,
                padding: tokens.padding.XL,
                width: '100%',
                backgroundColor: tokens.colors.neutral.white,
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
                  textAlign: 'center',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant={{
                  size: 'caption',
                }}
                style={{
                  color: tokens.colors.neutral.normal,
                  textAlign: 'center',
                }}
              >
                {description}
              </Typography>
              {errorMessage && (
                <Typography
                  variant={{
                    size: 'caption',
                    textStyling: {
                      italic: 'italic',
                    },
                  }}
                  style={{
                    color: tokens.colors.destructive.normal,
                    textAlign: 'center',
                    paddingVertical: tokens.padding.S,
                  }}
                >
                  {errorMessage}
                </Typography>
              )}

              <View
                style={{
                  marginTop: tokens.margin.L,
                  gap: tokens.margin.M,
                }}
              >
                {isLoading ? (
                  <View
                    style={{
                      paddingVertical: tokens.padding.M,
                    }}
                  >
                    <LoadingIndicator size={tokens.iconSize.M} />
                  </View>
                ) : (
                  <>
                    <DenyutButton
                      title={confirmText}
                      variant={isDestructive ? 'destructive' : 'primary'}
                      size="small"
                      onPress={onConfirm}
                    />
                    <DenyutButton
                      title={cancelText}
                      variant="secondary"
                      size="small"
                      onPress={onClose}
                    />
                  </>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ConfirmationModal
