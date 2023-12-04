import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto' // To allow polyfill
import { Database } from './types'

const SUPABASE_URL = 'https://mncmkeesizmphvqylfqr.supabase.co'
const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY21rZWVzaXptcGh2cXlsZnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5OTE2NjEsImV4cCI6MTk4NjU2NzY2MX0.ZxRt-WWcUb8b45EDwHkPDrWnYDJkyfx7yMTwVyKkgro'

export const supabaseClient = createClient<Database>(SUPABASE_URL, ANON_KEY, {
  auth: {
    persistSession: true,
    storage: AsyncStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})
