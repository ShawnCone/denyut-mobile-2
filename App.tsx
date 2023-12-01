import AppContent from '@/AppContent'
import { AuthContextProvider } from '@/context/AuthContext'

export default function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  )
}
