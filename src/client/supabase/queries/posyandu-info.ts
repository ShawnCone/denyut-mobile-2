import { supabaseClient } from '../supabase'
import { Database } from '../types'

// Later change these queries to using graphql backend
type getPosyanduListParams = {
  userId: string
}

export type PosyanduInfo = Database['public']['Tables']['OutpostInfo']['Row']

export type PosyanduInfoWithUserMembershipInfo = PosyanduInfo & {
  status: Database['public']['Tables']['OutpostMembership']['Row']['status']
}

// Get all user posyandu list (expect to be short)
export async function getUserPosyanduList({
  userId,
}: getPosyanduListParams): Promise<PosyanduInfoWithUserMembershipInfo[]> {
  const { data, error } = await supabaseClient
    .from('OutpostMembership')
    .select('OutpostInfo(*), status')
    .eq('accountId', userId)
    .order('createdAt', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  // Casting because already filtering for null here
  return data
    .map(d =>
      d.OutpostInfo === null ? null : { ...d.OutpostInfo, status: d.status },
    )
    .filter(Boolean)
}

export type PosyanduInfoWithMembershipStatus = PosyanduInfo & {
  membershipStatus:
    | Database['public']['Tables']['OutpostMembership']['Row']['status']
    | undefined
}

// Get posyandu list (Expect longer, but still ok for now. Adjust this when using backend)
type searchPosyanduParams = {
  keyword: string
  userId: string
}
// Search could be better, use backend later so it's handled properly when retrieved
export async function searchPosyandu({
  keyword,
  userId,
}: searchPosyanduParams): Promise<PosyanduInfoWithMembershipStatus[]> {
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

  // Get user posyandu list
  const userPosyanduList = await getUserPosyanduList({ userId })

  // If user already joined a posyandu, indicate in returned data
  const dataWithMembershipStatus = data.map(d => {
    const membershipStatus = userPosyanduList.find(m => m.id === d.id)?.status

    return {
      ...d,
      membershipStatus,
    }
  })

  return dataWithMembershipStatus
}

export async function joinPosyandu({
  userId,
  posyanduId,
}: {
  userId: string
  posyanduId: string
}) {
  const { error } = await supabaseClient.from('OutpostMembership').insert([
    {
      accountId: userId,
      outpostId: posyanduId,
      status: 'pending',
    },
  ])

  if (error) {
    throw new Error(error.message)
  }
}

export async function getPosyanduInfo({ posyanduId }: { posyanduId: string }) {
  const { data, error } = await supabaseClient
    .from('OutpostInfo')
    .select('*')
    .eq('id', posyanduId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
