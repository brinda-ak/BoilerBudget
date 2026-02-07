import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from './AuthContext'
import type { OnboardingData, UserProfile } from '@/types'

interface UserProfileContextType {
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  completeOnboarding: (data: OnboardingData) => Promise<void>
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const updateProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!user) return
      const profileRef = doc(db, 'users', user.uid)
      await setDoc(
        profileRef,
        { ...data, updatedAt: new Date().toISOString() },
        { merge: true }
      )
    },
    [user]
  )

  const completeOnboarding = useCallback(
    async (data: OnboardingData) => {
      if (!user) return
      const profileRef = doc(db, 'users', user.uid)
      await setDoc(
        profileRef,
        {
          uid: user.uid,
          email: user.email ?? null,
          displayName: user.displayName ?? null,
          photoURL: user.photoURL ?? null,
          onboardingData: { ...data, completedAt: new Date().toISOString() },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      )
    },
    [user]
  )

  const value: UserProfileContextType = {
    updateProfile,
    completeOnboarding,
  }

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}
