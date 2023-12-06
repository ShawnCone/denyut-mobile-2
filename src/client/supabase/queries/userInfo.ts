import { User } from '@supabase/supabase-js'
import { supabaseClient } from '../supabase'
import { Database } from '../types'

export type UserInfo = Database['public']['Tables']['AccountInfo']['Row']

// Get user queries to supabase, TODO: later change to GraphQL for RLS purposes
export async function getUserInfo(user: User): Promise<UserInfo | null> {
  const { data, error } = await supabaseClient
    .from('AccountInfo')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()
  if (error) {
    throw error
  }
  return data
}

type CreateUserInfoType = Database['public']['Tables']['AccountInfo']['Insert']

export async function createUserInfo(newUserInfo: CreateUserInfoType) {
  const { data, error } = await supabaseClient
    .from('AccountInfo')
    .insert(newUserInfo)
  if (error) {
    throw error
  }
  return data
}

export type UpdateUserInfoType =
  Database['public']['Tables']['AccountInfo']['Update']

export async function updateUserInfo({
  userIdToUpdate,
  newUserInfo,
}: {
  userIdToUpdate: User['id']
  newUserInfo: UpdateUserInfoType
}) {
  const { data, error } = await supabaseClient
    .from('AccountInfo')
    .update(newUserInfo)
    .eq('id', userIdToUpdate)
  if (error) {
    throw error
  }
  return data
}
