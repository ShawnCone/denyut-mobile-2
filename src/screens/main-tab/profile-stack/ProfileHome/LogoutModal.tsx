import { useAuthContext } from '@/context/AuthContext'
import ConfirmationModal from '@/design-system/ConfirmationModal'

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
    <ConfirmationModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={handleLogOut}
      title="Apakah anda yakin ingin keluar?"
      description="Anda akan diminta untuk login kembali ketika ingin menggunakan aplikasi ini"
      confirmText="Keluar"
      isDestructive
    />
  )
}

export default LogoutModal
