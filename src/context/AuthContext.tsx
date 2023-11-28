import { supabaseClient } from '@/client/supabase/supabase'
import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// All auth-related oprations should go through this context, not directly to supabaseClient
type AuthContextValues = {
  client: SupabaseClient
  session: Session | null | undefined
  user: User | null | undefined
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextValues>({
  client: supabaseClient,
  session: undefined,
  user: undefined,
  loading: true,
  signOut: () => {},
})

type AuthContextProviderProps = {
  children: ReactNode
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>()
  const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  async function setData() {
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession()

    if (error) {
      throw new Error(error.message)
    }

    setSession(session)
    setUser(session?.user ?? null)
  }

  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        console.log({
          _event,
          session,
        })
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      },
    )

    setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        client: supabaseClient,
        session,
        user,
        loading,
        signOut: () => supabaseClient.auth.signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValues {
  const context = useContext(AuthContext)

  return context
}

// Guarantee user is present, otherwise redirect to login
type ProtectedAuthContextValues = {
  user: User
  signOut: () => void
}

const ProtectedAuthContext = createContext<ProtectedAuthContextValues>({
  // Placeholder value
  user: {
    app_metadata: {},
    aud: '',
    confirmed_at: '',
    created_at: '',
    id: '',
    user_metadata: {},
  },
  signOut: () => {},
})

type ProtectedAuthContextProviderProps = {
  children: ReactNode
}

export const ProtectedAuthContextProvider = ({
  children,
}: ProtectedAuthContextProviderProps) => {
  const { user, signOut } = useAuth()

  if (user === null || typeof user === 'undefined') {
    console.log('user is null or undefined, reroute to login page')
    throw 'You must be logged in to access this page'
  }

  return (
    <ProtectedAuthContext.Provider value={{ user, signOut }}>
      {children}
    </ProtectedAuthContext.Provider>
  )
}

export function useProtectedAuth(): ProtectedAuthContextValues {
  // Note: Reroute can happen here as well if rerouting in provider does not work
  return useContext(ProtectedAuthContext)
}
