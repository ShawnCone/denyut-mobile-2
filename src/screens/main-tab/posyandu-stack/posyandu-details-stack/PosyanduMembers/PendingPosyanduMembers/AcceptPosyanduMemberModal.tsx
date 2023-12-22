import { usePosyanduInfoContext } from '@/context/PosyanduInfoContextProvider'
import ConfirmationModal from '@/design-system/ConfirmationModal'
import { useAcceptUserToPosyanduMutation } from '../utils'

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
  const { posyanduInfo } = usePosyanduInfoContext()
  const {
    mutate: acceptPosyanduMember,
    isPending,
    isError,
  } = useAcceptUserToPosyanduMutation({
    onSuccess: onClose,
  })

  function handleAcceptPosyanduMember() {
    acceptPosyanduMember({
      posyanduId: posyanduInfo.id,
      userId: memberId,
    })
  }

  return (
    <ConfirmationModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={handleAcceptPosyanduMember}
      title="Terima Permintaan Bergabung"
      description={`Permintaan ${name} dengan nomor telepon +${phoneNumber} akan diterima.\nApakah anda yakin?`}
      confirmText="Terima"
      isLoading={isPending}
      errorMessage={isError ? 'Gagal menerima anggota posyandu' : undefined}
    />
  )
}

export default AcceptPosyanduMemberModal
