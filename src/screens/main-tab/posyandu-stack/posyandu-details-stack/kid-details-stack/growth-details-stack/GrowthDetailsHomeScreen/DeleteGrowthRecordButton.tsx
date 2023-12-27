import { useGrowthDetailsContext } from '@/context/GrowthDetailsContext'
import { useKidInfoContext } from '@/context/KidInfoContext'
import ConfirmationModal from '@/design-system/ConfirmationModal'
import DenyutButton from '@/design-system/DenyutButton'
import { getDisplayGrowthRecordDate } from '@/utils/dateFormatter'
import { useState } from 'react'
import { useDeleteGrowthDetailsMutation } from './utils'

type DeleteGrowthRecordButtonProps = {
  onSuccess: () => void
}

function DeleteGrowthRecordButton({
  onSuccess,
}: DeleteGrowthRecordButtonProps) {
  const { growthDetails } = useGrowthDetailsContext()
  const { kidInfo } = useKidInfoContext()

  const { mutate, isPending, isError } = useDeleteGrowthDetailsMutation({
    onSuccess,
  })

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function onDelete() {
    mutate({
      recordId: growthDetails.recordId,
    })
  }

  const modalDescriptionText = `Hapus data pertumbuhan ${
    kidInfo.name
  } untuk ${getDisplayGrowthRecordDate({
    recordYear: growthDetails.outpostRecordYear,
    recordMonthIdx: growthDetails.outpostRecordMonthIdx,
  })}`

  return (
    <>
      <DenyutButton title="Hapus" onPress={handleOpenModal} />
      <ConfirmationModal
        isVisible={modalIsOpen}
        title="Hapus Data Pertumbuhan"
        description={modalDescriptionText}
        confirmText="Hapus"
        onClose={handleCloseModal}
        onConfirm={onDelete}
        isDestructive
        isLoading={isPending}
        errorMessage={isError ? 'Gagal menghapus data pertumbuhan' : undefined}
      />
    </>
  )
}

export default DeleteGrowthRecordButton
