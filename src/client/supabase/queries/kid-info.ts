// Register kid also involves adding the kid info to the posyandu - kid relation table.
// Need to make this to transaction later in the backend, client shouldn't worry about this.

import { supabaseClient } from '../supabase'
import { Database } from '../types'

type registerNewKidParams = {
  posyanduId: string
  inKidInfo: Database['public']['Tables']['KidInfo']['Insert']
}

export async function registerNewKid({
  posyanduId,
  inKidInfo,
}: registerNewKidParams) {
  const { data: kidInfo, error: insertKidInfoError } = await supabaseClient
    .from('KidInfo')
    .insert(inKidInfo)
    .select('id')
    .single()

  if (insertKidInfoError) {
    throw new Error(insertKidInfoError.details)
  }

  // Insert to members
  const { error: addKidToOutpostError } = await supabaseClient
    .from('OutpostKids')
    .insert({
      kidId: kidInfo.id,
      outpostId: posyanduId,
    })

  if (addKidToOutpostError) {
    throw new Error(addKidToOutpostError.details)
  }

  return kidInfo.id
}

// Get posyandu kids
export type KidInfoSummary = Pick<
  Database['public']['Tables']['KidInfo']['Row'],
  'id' | 'name' | 'birthCity' | 'birthProvince' | 'dateOfBirth' | 'sex'
>
export async function getPosyanduKids({
  posyanduId,
}: {
  posyanduId: string
}): Promise<KidInfoSummary[]> {
  const { data, error } = await supabaseClient
    .from('OutpostKids')
    .select('KidInfo(id, name, birthCity, birthProvince, dateOfBirth, sex)')
    .eq('outpostId', posyanduId)

  if (error) {
    throw new Error(error.message)
  }

  // Get non-null entries
  const kidInfoArr = data.map(d => d.KidInfo).filter(Boolean)

  return kidInfoArr
}

// Kid info regular
export type KidInfo = Database['public']['Tables']['KidInfo']['Row']

export async function getKidInfo({
  kidId,
}: {
  kidId: string
}): Promise<KidInfo> {
  const { data, error } = await supabaseClient
    .from('KidInfo')
    .select()
    .eq('id', kidId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateKidProfile({
  kidId,
  inKidInfo,
}: {
  kidId: string
  inKidInfo: Database['public']['Tables']['KidInfo']['Update']
}) {
  const { error } = await supabaseClient
    .from('KidInfo')
    .update(inKidInfo)
    .eq('id', kidId)

  if (error) {
    throw new Error(error.message)
  }

  return kidId
}

export async function deleteKidProfile({ kidId }: { kidId: string }) {
  const { error } = await supabaseClient
    .from('KidInfo')
    .delete()
    .eq('id', kidId)

  if (error) {
    throw new Error(error.message)
  }

  return kidId
}
