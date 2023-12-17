import { useAuthContext } from '@/context/AuthContext'
import DenyutButton from '@/design-system/DenyutButton'
import Typography from '@/design-system/Typography'
import { tokens } from '@/design-system/tokens/tokens'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'

type LogoutModalProps = {
  isVisible: boolean
  onClose: () => void
}

function LogoutModal({ isVisible, onClose }: LogoutModalProps) {
  const { signOut } = useAuthContext()

  function handleLogOut() {
    signOut()
  }
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
                Apakah anda yakin ingin keluar?
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
                Anda akan diminta untuk login kembali ketika ingin menggunakan
                aplikasi ini
              </Typography>
              <View
                style={{
                  marginTop: tokens.margin.L,
                  gap: tokens.margin.M,
                }}
              >
                <DenyutButton
                  title="Keluar"
                  variant="primary"
                  size="small"
                  onPress={handleLogOut}
                />
                <DenyutButton
                  title="Kembali"
                  variant="secondary"
                  size="small"
                  onPress={onClose}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default LogoutModal
