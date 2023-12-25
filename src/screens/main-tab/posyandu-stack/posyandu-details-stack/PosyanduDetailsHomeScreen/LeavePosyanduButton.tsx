import DenyutButton from '@/design-system/DenyutButton'
import { useState } from 'react'
import LeavePosyanduModal from './LeavePosyanduModal'

type LeavePosyanduButtonProps = {
  onLeavePosyandu: () => void
}

function LeavePosyanduButton({ onLeavePosyandu }: LeavePosyanduButtonProps) {
  const [modalVisible, setModalVisible] = useState(false)

  function openModal() {
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  return (
    <>
      <DenyutButton
        variant="destructive"
        title="Keluar posyandu"
        onPress={openModal}
      />
      <LeavePosyanduModal
        isVisible={modalVisible}
        onClose={closeModal}
        onSuccess={onLeavePosyandu}
      />
    </>
  )
}

export default LeavePosyanduButton
