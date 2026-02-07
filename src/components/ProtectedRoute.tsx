import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireOnboarding?: boolean
}

export function ProtectedRoute({ children, requireOnboarding = false }: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-lavender font-display text-xl">
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireOnboarding && !userProfile?.onboardingData) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />
  }

  return <>{children}</>
}
