import { supabaseClient } from '../supabase'
import { Database } from '../types'

export async function getGrowthRecordList(kidId: string) {
  const { data, error } = await supabaseClient
    .from('KidBodilyGrowth')
    .select()
    .eq('kidId', kidId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function addNewGrowthRecord({
  inGrowthRecord,
}: {
  inGrowthRecord: Database['public']['Tables']['KidBodilyGrowth']['Insert']
}) {
  const { data, error } = await supabaseClient
    .from('KidBodilyGrowth')
    .insert(inGrowthRecord)
    .select('recordId')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.recordId
}

export async function getGrowthRecordDetails({
  recordId,
}: {
  recordId: string
}) {
  const { data, error } = await supabaseClient
    .from('KidBodilyGrowth')
    .select()
    .eq('id', recordId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
