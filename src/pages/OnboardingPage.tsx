import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProfile } from '@/contexts/UserProfileContext'
import type {
  MealPlanType,
  BudgetCategoryPreference,
  OnboardingData,
} from '@/types'

const MEAL_PLANS: { value: MealPlanType; label: string; swipes: number }[] = [
  { value: '8-track', label: '8-Track', swipes: 8 },
  { value: '13-track', label: '13-Track', swipes: 13 },
  { value: '18-track', label: '18-Track', swipes: 18 },
  { value: '21-track', label: '21-Track', swipes: 21 },
  { value: 'unlimited', label: 'Unlimited', swipes: 999 },
]

const BUDGET_PREFERENCES: {
  value: BudgetCategoryPreference
  label: string
  description: string
}[] = [
  {
    value: 'self-care-safety',
    label: 'Self-Care & Safety',
    description: 'Period products, wellness, rideshares, personal security',
  },
  {
    value: 'health-wellness',
    label: 'Health & Wellness',
    description: 'Co-pays, prescriptions, mental health, gym',
  },
  {
    value: 'professional-development',
    label: 'Professional Development',
    description: 'Interview clothes, conferences, networking, resume printing',
  },
]

export function OnboardingPage() {
  const { userProfile, refreshUserProfile } = useAuth()
  const { completeOnboarding } = useUserProfile()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [mealPlanType, setMealPlanType] = useState<MealPlanType>('13-track')
  const [diningDollarBalance, setDiningDollarBalance] = useState('')
  const [mealSwipesRemaining, setMealSwipesRemaining] = useState('')
  const [estimatedMonthlyIncome, setEstimatedMonthlyIncome] = useState('')
  const [semesterStartDate, setSemesterStartDate] = useState('')
  const [semesterEndDate, setSemesterEndDate] = useState('')
  const [budgetPreferences, setBudgetPreferences] = useState<
    BudgetCategoryPreference[]
  >([])
  const [submitting, setSubmitting] = useState(false)

  const selectedPlan = MEAL_PLANS.find((p) => p.value === mealPlanType)
  const defaultSwipes = selectedPlan?.value === 'unlimited' ? 0 : selectedPlan?.swipes ?? 13

  const togglePreference = (pref: BudgetCategoryPreference) => {
    setBudgetPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    )
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const data: OnboardingData = {
        mealPlanType,
        diningDollarBalance: parseFloat(diningDollarBalance) || 0,
        mealSwipesRemaining: parseInt(mealSwipesRemaining, 10) || defaultSwipes,
        estimatedMonthlyIncome: parseFloat(estimatedMonthlyIncome) || 0,
        semesterStartDate: semesterStartDate || new Date().toISOString().split('T')[0],
        semesterEndDate: semesterEndDate || new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        budgetPreferences,
        completedAt: new Date().toISOString(),
      }
      await completeOnboarding(data)
      await refreshUserProfile()
      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const totalSteps = 4
  const canProceed = () => {
    if (step === 1) return true
    if (step === 2)
      return diningDollarBalance && mealSwipesRemaining && estimatedMonthlyIncome
    if (step === 3) return semesterStartDate && semesterEndDate
    return true
  }

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-charcoal text-center mb-2">
          Welcome, {userProfile?.displayName?.split(' ')[0] ?? 'Boilermaker'}!
        </h1>
        <p className="text-charcoal/70 text-center mb-8">
          Let's personalize your financial plan
        </p>

        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i + 1 <= step ? 'bg-lavender' : 'bg-lavender/30'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-card shadow-card p-6 border-l-4 border-lavender">
          {step === 1 && (
            <div>
              <h2 className="font-semibold text-lg text-charcoal mb-4">
                What's your meal plan?
              </h2>
              <div className="space-y-2">
                {MEAL_PLANS.map((plan) => (
                  <button
                    key={plan.value}
                    onClick={() => setMealPlanType(plan.value)}
                    className={`w-full p-4 rounded-button text-left transition-all ${
                      mealPlanType === plan.value
                        ? 'bg-lavender/20 border-2 border-lavender'
                        : 'bg-cream/50 border-2 border-transparent hover:border-lavender/50'
                    }`}
                  >
                    <span className="font-medium">{plan.label}</span>
                    {plan.value !== 'unlimited' && (
                      <span className="text-charcoal/60 ml-2">
                        — {plan.swipes} swipes/week
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-semibold text-lg text-charcoal mb-4">
                Current balances & income
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Dining Dollars remaining
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={diningDollarBalance}
                    onChange={(e) => setDiningDollarBalance(e.target.value)}
                    placeholder="e.g. 450"
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-button focus:ring-2 focus:ring-lavender focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Meal swipes remaining this week
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={mealSwipesRemaining}
                    onChange={(e) => setMealSwipesRemaining(e.target.value)}
                    placeholder={String(defaultSwipes)}
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-button focus:ring-2 focus:ring-lavender focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Estimated monthly income ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={estimatedMonthlyIncome}
                    onChange={(e) => setEstimatedMonthlyIncome(e.target.value)}
                    placeholder="e.g. 800"
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-button focus:ring-2 focus:ring-lavender focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-semibold text-lg text-charcoal mb-4">
                Semester timeline
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Semester start date
                  </label>
                  <input
                    type="date"
                    value={semesterStartDate}
                    onChange={(e) => setSemesterStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-button focus:ring-2 focus:ring-lavender focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Semester end date
                  </label>
                  <input
                    type="date"
                    value={semesterEndDate}
                    onChange={(e) => setSemesterEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-button focus:ring-2 focus:ring-lavender focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-semibold text-lg text-charcoal mb-2">
                Budget categories that matter to you
              </h2>
              <p className="text-charcoal/70 text-sm mb-4">
                Select the categories you'd like to track. We'll help you plan for
                these expenses.
              </p>
              <div className="space-y-2">
                {BUDGET_PREFERENCES.map((pref) => (
                  <button
                    key={pref.value}
                    onClick={() => togglePreference(pref.value)}
                    className={`w-full p-4 rounded-button text-left transition-all ${
                      budgetPreferences.includes(pref.value)
                        ? 'bg-sage/30 border-2 border-sage'
                        : 'bg-cream/50 border-2 border-transparent hover:border-sage/50'
                    }`}
                  >
                    <span className="font-medium block">{pref.label}</span>
                    <span className="text-sm text-charcoal/60">
                      {pref.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-6 py-2 text-charcoal/70 hover:text-charcoal disabled:opacity-50"
            >
              Back
            </button>
            {step < totalSteps ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="px-6 py-2 bg-lavender hover:bg-lavender/90 text-white font-semibold rounded-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-sage hover:bg-sage/90 text-white font-semibold rounded-button disabled:opacity-50"
              >
                {submitting ? 'Setting up...' : 'Get started'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
