import '@total-typescript/ts-reset'

import { supabaseClient } from '../supabase'
import { Database } from '../types'

export type PosyanduMemberWithPhoneNumberInfo = {
  name: string
  id: string
  phoneNumber: string
  role: Database['public']['Tables']['OutpostMembership']['Row']['role']
  status: Database['public']['Tables']['OutpostMembership']['Row']['status']
}
export async function getPosyanduMembers(
  posyanduId: string,
): Promise<PosyanduMemberWithPhoneNumberInfo[]> {
  const { data, error } = await supabaseClient
    .from('OutpostMembership')
    .select('AccountInfo(name, id), role, status')
    .eq('outpostId', posyanduId)

  if (error) {
    throw new Error(error.message)
  }

  const accountInfos = data
    .map(({ AccountInfo, ...rest }) => ({ ...AccountInfo, ...rest }))
    .filter(Boolean)

  // Get id -> name  and rolemap
  const idToMemberInfoMap: Map<
    string,
    Pick<PosyanduMemberWithPhoneNumberInfo, 'name' | 'role' | 'status'>
  > = new Map()
  accountInfos.forEach(({ id, name, role, status }) => {
    if (!id || !name) return
    idToMemberInfoMap.set(id, { name, role, status })
  })

  // Get phone numbers
  const { data: idAndPhoneNumbers, error: idAndPhoneNumbersError } =
    await supabaseClient
      .from('usersphone')
      .select('id, phone')
      .in('id', Array.from(idToMemberInfoMap.keys()))

  if (idAndPhoneNumbersError) {
    throw new Error(idAndPhoneNumbersError.message)
  }

  // Combine phone numbers with account infos
  const retData: PosyanduMemberWithPhoneNumberInfo[] = []

  idAndPhoneNumbers.forEach(({ id, phone }) => {
    if (!phone) return
    if (!id) return
    const memberInfo = idToMemberInfoMap.get(id)
    if (!memberInfo) return
    retData.push({
      id,
      name: memberInfo.name,
      phoneNumber: phone,
      role: memberInfo.role,
      status: memberInfo.status,
    })
  })

  retData.sort((a, b) => a.name.localeCompare(b.name))
  // Sort retdata by name
  return retData
}

export async function getUserIsPosyanduAdmin({
  posyanduId,
  userId,
}: {
  posyanduId: string
  userId: string
}) {
  const { data, error } = await supabaseClient
    .from('OutpostMembership')
    .select('role')
    .eq('outpostId', posyanduId)
    .eq('accountId', userId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data !== null && data.role === 'owner'
}
