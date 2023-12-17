import '@total-typescript/ts-reset'

import { supabaseClient } from '../supabase'

export async function getPosyanduMembers(posyanduId: string) {
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

  return accountInfos
}
