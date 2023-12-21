import AppContent from '@/AppContent'
import { AuthContextProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppContent />
        </AuthContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
