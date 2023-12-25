import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import ConfirmationModal from '@/design-system/ConfirmationModal'
import { useKickRejectUserFromPosyanduMutation } from './utils'

type RejectKickPosyanduMemberModalProps = {
  name: string
  phoneNumber: string
  memberId: string
  isVisible: boolean
  onClose: () => void
  mode: 'reject' | 'kick'
}

// Reject and kick are combined because they share the same backend request (Remove membership row). Split this up if they are different.
function RejectKickPosyanduMemberModal({
  name,
  phoneNumber,
  memberId,
  isVisible,
  onClose,
  mode,
}: RejectKickPosyanduMemberModalProps) {
  const { posyanduInfo } = usePosyanduInfoContext()

  const {
    mutate: kickPosyanduMember,
    isPending,
    isError,
  } = useKickRejectUserFromPosyanduMutation({
    onSuccess: onClose,
  })

  function handleKickRejectPosyanduMember() {
    kickPosyanduMember({
      posyanduId: posyanduInfo.id,
      userId: memberId,
    })
  }

  return (
    <ConfirmationModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={handleKickRejectPosyanduMember}
      title={
        mode === 'reject'
          ? 'Tolak Permintaan Bergabung'
          : 'Keluarkan dari Posyandu'
      }
      description={
        mode === 'reject'
          ? `Permintaan bergabung ${name} dengan nomor telepon +${phoneNumber} akan ditolak.\nApakah anda yakin?`
          : `${name} dengan nomor telepon +${phoneNumber} akan dikeluarkan dari posyandu.\nApakah anda yakin?`
      }
      confirmText={mode === 'reject' ? 'Tolak' : 'Keluarkan'}
      isDestructive
      isLoading={isPending}
      errorMessage={
        isError
          ? `Gagal ${
              mode === 'reject' ? 'menolak' : 'mengeluarkan'
            } anggota posyandu`
          : undefined
      }
    />
  )
}

export default RejectKickPosyanduMemberModal
