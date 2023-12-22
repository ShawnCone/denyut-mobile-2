import ConfirmationModal from '@/design-system/ConfirmationModal'
import { useLeavePosyanduMutation } from './utils'

type LeavePosyanduModalProps = {
  isVisible: boolean
  onClose: () => void
  onSuccess: () => void
}

function LeavePosyanduModal({
  isVisible,
  onClose,
  onSuccess,
}: LeavePosyanduModalProps) {
  const {
    mutate: leavePosyandu,
    isPending,
    isError,
  } = useLeavePosyanduMutation({
    onSuccess,
  })

  return (
    <ConfirmationModal
      title="Keluar posyandu"
      description={`Apakah anda yakin ingin keluar dari posyandu ini?\nHarus meminta persetujuan admin untuk bergabung kembali`}
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={leavePosyandu}
      confirmText="Keluar"
      isDestructive
      isLoading={isPending}
      errorMessage={isError ? 'Gagal keluar dengan posyandu' : undefined}
    />
  )
}

export default LeavePosyanduModal
