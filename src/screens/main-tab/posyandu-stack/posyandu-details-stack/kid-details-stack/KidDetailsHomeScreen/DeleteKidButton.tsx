import { useKidInfoContext } from '@/context/KidInfoContext'
import ConfirmationModal from '@/design-system/ConfirmationModal'
import DenyutButton from '@/design-system/DenyutButton'
import { useState } from 'react'
import { useDeleteKidProfileMutation } from './utils'

type DeleteKidButtonProps = {
  onDeleteKidSuccess: () => void
}

function DeleteKidButton({ onDeleteKidSuccess }: DeleteKidButtonProps) {
  const {
    kidInfo: { id: kidId, name },
  } = useKidInfoContext()

  const { mutate, isPending, isError } = useDeleteKidProfileMutation({
    onSuccess: onDeleteKidSuccess,
  })

  const handleDeleteKid = () => {
    mutate({ kidId })
  }

  const [modalVisible, setModalVisible] = useState(false)

  function openModal() {
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  return (
    <>
      <DenyutButton title="Hapus Profil Anak" onPress={openModal} />
      <ConfirmationModal
        isVisible={modalVisible}
        onClose={closeModal}
        title="Hapus Profil Anak"
        description={`Apakah anda yakin ingin menghapus profil anak: ${name} ini?`}
        confirmText="Hapus"
        isDestructive
        isLoading={isPending}
        errorMessage={isError ? 'Gagal menghapus profil anak' : undefined}
        onConfirm={handleDeleteKid}
      />
    </>
  )
}

export default DeleteKidButton
