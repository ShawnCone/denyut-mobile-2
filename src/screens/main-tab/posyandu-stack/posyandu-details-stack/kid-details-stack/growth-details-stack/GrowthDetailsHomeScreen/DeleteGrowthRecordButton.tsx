import { useKidInfoContext } from '@/context/KidInfoContext'
import ConfirmationModal from '@/design-system/ConfirmationModal'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayGrowthRecordDate } from '@/utils/dateFormatter'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useGrowthDetailsContext } from '../utils'
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
      <Pressable
        onPress={handleOpenModal}
        android_ripple={{
          color: tokens.colors.ripple,
          borderless: true,
        }}
      >
        <MaterialCommunityIcons
          name="delete"
          size={tokens.iconSize.M}
          color={tokens.colors.primary.normal}
        />
      </Pressable>
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
