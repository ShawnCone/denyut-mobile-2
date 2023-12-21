import '@total-typescript/ts-reset'

import { supabaseClient } from '../supabase'

export type PosyanduMemberWithPhoneNumberInfo = {
  name: string
  id: string
  phoneNumber: string
}

export async function getPosyanduMembers(
  posyanduId: string,
): Promise<PosyanduMemberWithPhoneNumberInfo[]> {
  const { data, error } = await supabaseClient
    .from('OutpostMembership')
    .select('AccountInfo(name, id)')
    .eq('outpostId', posyanduId)

  if (error) {
    throw new Error(error.message)
  }

  const accountInfos = data
    .map(({ AccountInfo }) => AccountInfo)
    .filter(Boolean)

  // Get id -> name map
  const idToNameMap = new Map()
  accountInfos.forEach(({ id, name }) => {
    idToNameMap.set(id, name)
  })

  // Get phone numbers
  const { data: idAndPhoneNumbers, error: idAndPhoneNumbersError } =
    await supabaseClient
      .from('usersphone')
      .select('id, phone')
      .in('id', Array.from(idToNameMap.keys()))

  if (idAndPhoneNumbersError) {
    throw new Error(idAndPhoneNumbersError.message)
  }

  // Combine phone numbers with account infos
  const retData: PosyanduMemberWithPhoneNumberInfo[] = []

  idAndPhoneNumbers.forEach(({ id, phone }) => {
    if (!phone) return
    if (!id) return
    if (idToNameMap.has(id)) {
      retData.push({
        id,
        name: idToNameMap.get(id),
        phoneNumber: phone,
      })
    }
  })

  retData.sort((a, b) => a.name.localeCompare(b.name))
  // Sort retdata by name
  return retData
}
