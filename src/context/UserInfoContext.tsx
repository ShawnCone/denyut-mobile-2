import {
  UserInfo,
  createUserInfo,
  getUserInfo,
} from '@/client/supabase/queries/userInfo'
import { User } from '@supabase/supabase-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ReactNode, createContext, useContext } from 'react'
import { useProtectedAuth } from './AuthContext'

export function getUseUserInfoQueryKey(inAuthUser: User) {
  return ['userInfo', inAuthUser.id]
}

export function useUserInfo(inAuthUser: User) {
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

// Maybe this should be in the client folder?
export function useCreateUserInfo() {
  const queryClient = useQueryClient()
  const { user } = useProtectedAuth()
  return useMutation({
    mutationFn: createUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseUserInfoQueryKey(user),
      })
    },
  })
}
