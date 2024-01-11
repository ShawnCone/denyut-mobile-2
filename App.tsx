import AppContent from '@/AppContent'
import { DenyutPosyanduBeClient } from '@/client/denyut-posyandu-be/client'
import { AuthContextProvider } from '@/context/AuthContext'
import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()

export default function App() {
  return (
    <ApolloProvider client={DenyutPosyanduBeClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <AppContent />
          </AuthContextProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  )
}
