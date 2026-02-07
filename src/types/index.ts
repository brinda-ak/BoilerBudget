export type MealPlanType =
  | '8-track'
  | '13-track'
  | '18-track'
  | '21-track'
  | 'unlimited'

export type BudgetCategoryPreference =
  | 'self-care-safety'
  | 'health-wellness'
  | 'professional-development'

export interface OnboardingData {
  mealPlanType: MealPlanType
  diningDollarBalance: number
  mealSwipesRemaining: number
  estimatedMonthlyIncome: number
  semesterStartDate: string
  semesterEndDate: string
  budgetPreferences: BudgetCategoryPreference[]
  completedAt: string
}

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  onboardingData?: OnboardingData
  createdAt: string
  updatedAt: string
}
