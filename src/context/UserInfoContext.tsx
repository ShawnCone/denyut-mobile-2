import { User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext } from 'react'

import { UserInfo, getUserInfo } from '@/client/supabase/queries/userInfo'

export function getUseUserInfoQueryKey(inAuthUser: User) {
  return ['userInfo', inAuthUser.id]
}

export function useUserInfoQuery(inAuthUser: User) {
  return useQuery({
    queryKey: getUseUserInfoQueryKey(inAuthUser),
    queryFn: () => {
      return getUserInfo(inAuthUser)
    },
  })
}

export type UserInfoContextValues = {
  userInfo: UserInfo
}

const UserInfoContext = createContext<UserInfoContextValues>({
  userInfo: {
    id: '',
    name: '',
    sex: 'female',
    address: null,
    birthCity: null,
    birthProvince: null,
    createdAt: '',
    dateOfBirth: null,
    education: null,
    photoURL: null,
    religion: null,
  },
})

type UserInfoContextProviderProps = {
  children: ReactNode
  value: UserInfoContextValues
}

export const UserInfoContextProvider = ({
  children,
  value,
}: UserInfoContextProviderProps) => {
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  )
}

export function useUserInfoContext(): UserInfoContextValues {
  const context = useContext(UserInfoContext)
  return context
}
