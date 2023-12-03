import AppContent from '@/AppContent'
import { AuthContextProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
