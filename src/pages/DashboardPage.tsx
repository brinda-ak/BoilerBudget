import { useAuth } from '@/contexts/AuthContext'

export function DashboardPage() {
  const { userProfile } = useAuth()
  const firstName = userProfile?.displayName?.split(' ')[0] ?? 'Boilermaker'

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white shadow-soft px-6 py-4">
        <h1 className="font-display font-bold text-xl text-charcoal">
          You're doing great this week, {firstName}! ✨
        </h1>
        <p className="text-charcoal/70 text-sm mt-1">
          Your financial dashboard is being built. Check back soon!
        </p>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-card shadow-card p-6 border-l-4 border-lavender">
            <h3 className="font-semibold text-charcoal">Dining Dollars</h3>
            <p className="text-2xl font-bold text-lavender mt-2">
              ${userProfile?.onboardingData?.diningDollarBalance ?? '—'}
            </p>
            <p className="text-sm text-charcoal/60">remaining</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 border-l-4 border-sage">
            <h3 className="font-semibold text-charcoal">Meal Swipes</h3>
            <p className="text-2xl font-bold text-sage mt-2">
              {userProfile?.onboardingData?.mealSwipesRemaining ?? '—'}
            </p>
            <p className="text-sm text-charcoal/60">this week</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 border-l-4 border-gold">
            <h3 className="font-semibold text-charcoal">Monthly Income</h3>
            <p className="text-2xl font-bold text-gold mt-2">
              ${userProfile?.onboardingData?.estimatedMonthlyIncome ?? '—'}
            </p>
            <p className="text-sm text-charcoal/60">estimated</p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-card shadow-card p-6 border-l-4 border-lavender">
          <h2 className="font-semibold text-lg text-charcoal mb-2">
            Your preferences
          </h2>
          <p className="text-charcoal/70 text-sm">
            Meal plan: {userProfile?.onboardingData?.mealPlanType ?? '—'}
          </p>
          <p className="text-charcoal/70 text-sm">
            Tracking:{' '}
            {userProfile?.onboardingData?.budgetPreferences?.join(', ') ||
              'None selected'}
          </p>
        </div>
      </main>
    </div>
  )
}
