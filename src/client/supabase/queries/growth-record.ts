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

export async function getMostRecentGrowthDetails({ kidId }: { kidId: string }) {
  const { data, error } = await supabaseClient
    .from('KidBodilyGrowth')
    .select()
    .eq('kidId', kidId)
    .order('outpostRecordYear', { ascending: false })
    .order('outpostRecordMonthIdx', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getKidGrowthRecordList({ kidId }: { kidId: string }) {
  const { data, error } = await supabaseClient
    .from('KidBodilyGrowth')
    .select('recordId, outpostRecordMonthIdx, outpostRecordYear')
    .eq('kidId', kidId)
    .order('outpostRecordYear', { ascending: false })
    .order('outpostRecordMonthIdx', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
