import { UserInfo } from '@/client/supabase/queries/userInfo'

export function getGreetings() {
  const hour = new Date().getHours()
  if (hour < 12) {
    return 'Selamat pagi'
  }
  if (hour < 18) {
    return 'Selamat siang'
  }
  return 'Selamat malam'
}

export function checkUserInfoComplete(userInfo: UserInfo) {
  const { name, address } = userInfo

  return name !== '' && address !== ''
}
