# BoilerBudget+

Financial wellness for Purdue women — personal, predictive, empowering.

## Phase 1: Foundation ✓

- **Vite + React + TypeScript** — Fast development with modern tooling
- **Tailwind CSS** — Custom BoilerBudget+ palette (lavender, sage, cream, gold, coral)
- **Firebase** — Auth (Google), Firestore, Hosting
- **Auth & Onboarding** — Google sign-in, multi-step onboarding flow

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Google sign-in
3. Create a **Firestore Database**
4. Copy your config into `.env` (see `.env.example`)

```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

### 3. Run the app

```bash
npm run dev
```

### 4. Deploy (optional)

```bash
npm run build
firebase deploy
```

## Project Structure

```
src/
├── components/     # Reusable UI (ProtectedRoute, OnboardingRedirect)
├── contexts/       # Auth, UserProfile
├── lib/            # Firebase config
├── pages/          # Login, Onboarding, Dashboard
└── types/          # TypeScript types
```

## Next Steps (Phase 2+)

- Nessie API integration for transactions
- Google Calendar sync
- Digital Twin projection engine
- Gemini AI insights
