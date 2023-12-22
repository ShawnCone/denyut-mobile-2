import ConfirmationModal from '@/design-system/ConfirmationModal'

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
  // const { posyanduId } = usePosyanduInfoContext()

  function handleKickRejectPosyanduMember() {
    console.log('Removing posyandu membership')
    onClose()
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
          ? `Permintaan ${name} dengan nomor telepon +${phoneNumber} akan ditolak.\nApakah anda yakin?`
          : `${name} dengan nomor telepon +${phoneNumber} akan dikeluarkan dari posyandu.\nApakah anda yakin?`
      }
      confirmText="Tolak"
      isDestructive
    />
  )
}

export default RejectKickPosyanduMemberModal
