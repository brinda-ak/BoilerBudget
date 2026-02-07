import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function LoginPage() {
  const { user, userProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !loading) {
      navigate(userProfile?.onboardingData ? '/dashboard' : '/onboarding', {
        replace: true,
      })
    }
  }, [user, userProfile?.onboardingData, loading, navigate])

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
      // Navigation handled by useEffect when userProfile loads
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-lavender font-display text-xl">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="font-display font-bold text-4xl text-charcoal mb-2">
          BoilerBudget+
        </h1>
        <p className="text-charcoal/80 mb-8 text-lg">
          Financial wellness for Purdue women — personal, predictive, empowering
        </p>

        <div className="bg-white rounded-card shadow-card p-8 border-l-4 border-lavender">
          <p className="text-charcoal mb-6">
            Sign in with your Purdue Google account to get started
          </p>
          <button
            onClick={handleSignIn}
            className="w-full py-3 px-6 bg-lavender hover:bg-lavender/90 text-white font-semibold rounded-button transition-colors shadow-soft"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-sm text-charcoal/60">
          Your data is secure. We never share your financial information.
        </p>
      </div>
    </div>
  )
}
