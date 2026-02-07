import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { OnboardingPage } from '@/pages/OnboardingPage'

export function OnboardingRedirect() {
  const { userProfile } = useAuth()

  if (userProfile?.onboardingData) {
    return <Navigate to="/dashboard" replace />
  }

  return <OnboardingPage />
}
