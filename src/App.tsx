import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { UserProfileProvider } from '@/contexts/UserProfileContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { OnboardingRedirect } from '@/components/OnboardingRedirect'
import { DashboardPage } from '@/pages/DashboardPage'

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingRedirect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireOnboarding>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </UserProfileProvider>
    </AuthProvider>
  )
}

export default App
