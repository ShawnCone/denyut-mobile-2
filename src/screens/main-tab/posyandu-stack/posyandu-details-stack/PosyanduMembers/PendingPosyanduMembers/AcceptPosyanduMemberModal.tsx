import ConfirmationModal from '@/design-system/ConfirmationModal'

type RejectPosyanduMemberModalProps = {
  name: string
  phoneNumber: string
  memberId: string
  isVisible: boolean
  onClose: () => void
}

function AcceptPosyanduMemberModal({
  name,
  phoneNumber,
  memberId,
  isVisible,
  onClose,
}: RejectPosyanduMemberModalProps) {
  // const { posyanduId } = usePosyanduInfoContext()

  function handleAcceptPosyanduMember() {
    console.log(' posyandu member')

    onClose()
  }

  return (
    <ConfirmationModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={handleAcceptPosyanduMember}
      title="Terima Permintaan Bergabung"
      description={`Permintaan ${name} dengan nomor telepon +${phoneNumber} akan diterima.\nApakah anda yakin?`}
      confirmText="Terima"
    />
  )
}

export default AcceptPosyanduMemberModal
