import { supabaseClient } from '../supabase'
import { Database } from '../types'

// Later change these queries to using graphql backend
type getPosyanduListParams = {
  userId: string
}

type PosyanduInfo = Database['public']['Tables']['OutpostInfo']['Row']

// Get all user posyandu list (expect to be short)
export async function getUserPosyanduList({
  userId,
}: getPosyanduListParams): Promise<PosyanduInfo[]> {
  const { data, error } = await supabaseClient
    .from('OutpostMembership')
    .select('OutpostInfo(*)')
    .eq('accountId', userId)
    .eq('status', 'approved')
    .order('createdAt', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (data === null) {
    return []
  }

  // Casting because already filtering for null here
  return data.map(d => d.OutpostInfo).filter(d => d !== null) as PosyanduInfo[]
}

// Get posyandu list (Expect longer, but still ok for now. Adjust this when using backend)
type searchNewPosyanduParams = {
  keyword: string
}
// Search could be better
export async function searchNewPosyandu({ keyword }: searchNewPosyanduParams) {
  const query = supabaseClient
    .from('OutpostInfo')
    .select('*')
    .order('createdAt', { ascending: false })

  if (keyword) {
    query.ilike('name', `%${keyword}%`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  if (data === null) {
    return []
  }

  return data
}
