import DenyutButton from '@/design-system/DenyutButton'
import { useState } from 'react'
import { useSaveSKDNReportToDevice } from '../PosyanduSKDNGenerationScreen/utils'

const COOLDOWN_DURATION = 2000

type SaveReportButtonProps = {
  tempReportLocalUri: string
}

function SaveReportButton({ tempReportLocalUri }: SaveReportButtonProps) {
  const { mutate } = useSaveSKDNReportToDevice()

  // Debounce handler
  const [buttonSavingCooldownOn, setButtonSavingCooldownOn] = useState(false)

  async function onPress() {
    setButtonSavingCooldownOn(true)
    mutate({
      tempReportUri: tempReportLocalUri,
    })

    await new Promise(resolve => setTimeout(resolve, COOLDOWN_DURATION))
    setButtonSavingCooldownOn(false)
  }

  return (
    <DenyutButton
      title={buttonSavingCooldownOn ? 'Menyimpan laporan' : 'Simpan laporan'}
      disabled={buttonSavingCooldownOn}
      onPress={onPress}
    />
  )
}

export default SaveReportButton
