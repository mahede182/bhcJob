# BHC Jobs

![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=flat&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat&logo=i18next&logoColor=white)

A modern React Native job search application built with Expo, featuring multi-language support, dark/light themes, and a premium glassmorphism UI design.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React Native 0.83 · Expo SDK 55 · Expo Router v4 |
| **State Management** | Redux Toolkit · React Redux · AsyncStorage |
| **UI/UX** | React Native Reanimated · Expo Glass Effect · React Native Gesture Handler |
| **Localization** | i18next · react-i18next (EN · BN · AR) |
| **Forms** | React Native DateTime Picker · KeyboardAvoidingView |
| **Utilities** | Expo Secure Store · Expo Image · React Native Toast Message |
| **Dev Tools** | TypeScript · ESLint · Prettier · Husky · lint-staged |

---

## Preview



https://github.com/user-attachments/assets/15ff3934-e72e-4c2f-ae0e-a11e23505132



### Features

- **Multi-Language Support** — Full i18n implementation with English, Bangla, and Arabic
- **Theme System** — Light, Dark, and System Default theme modes with Redux persistence
- **Glassmorphism UI** — Modern iOS-like bottom tab navigation with glass effects
- **Authentication Flow** — Sign In, Sign Up, and OTP Verification screens
- **Job Discovery** — Browse featured jobs, companies, and industries
- **Search & Filter** — Real-time job search with recent search history
- **Favorites** — Save and manage favorite job listings
- **Profile Management** — Resume, saved jobs, settings, and preferences

---

## Project Structure

```
bhcJob/
├── src/
│   ├── @types/           # TypeScript type definitions
│   ├── app/              # Expo Router screens
│   │   ├── (tabs)/       # Main tabs: Home, Search, Jobs, Favorite, Profile
│   │   ├── sign-in.tsx   # Authentication screens
│   │   ├── sign-up.tsx
│   │   ├── verify-otp.tsx
│   │   ├── onboarding.tsx
│   │   └── _layout.tsx   # Root layout with auth state
│   ├── components/       # Reusable UI components
│   │   ├── home/         # JobCard, CompanyCard, IndustryCard
│   │   ├── profile/      # ProfileStats, ProfileHeader
│   │   └── ui/           # Button, Input, Header, MenuItem, etc.
│   ├── constants/        # Theme colors, spacing, typography, mock data
│   ├── hooks/            # useTheme, useDebounce
│   ├── localization/       # i18n configuration
│   │   ├── i18n.ts       # i18next setup with AsyncStorage
│   │   ├── EN/en.ts      # English translations
│   │   ├── BN/bn.ts      # Bangla translations
│   │   └── AR/ar.ts      # Arabic translations
│   ├── store/            # Redux store
│   │   ├── slices/       # authSlice, themeSlice, jobSlice
│   │   └── api/          # RTK Query API endpoints
│   └── utils/            # Toast helpers, storage, AppLogger
├── scripts/              # Husky pre-commit scripts
├── .husky/               # Git hooks
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- Expo CLI (optional but recommended)
- Android Studio / Xcode (for emulators)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bhcJob

# Install dependencies
npm install

# Or use Expo's install for exact versions
npx expo install
```

### Environment Setup

Create a `.env` file in the root:

```env
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_API_STORAGE=https://your-storage-url.com
```

### Running the App

```bash
# Start the development server
npm start

# Or run on specific platforms
npm run android
npm run ios
npm run web
```

---

## Key Features Implementation

### 1. Internationalization (i18n)

Complete multi-language support with TypeScript type safety:

- **Three languages**: English (EN), Bangla (BN), Arabic (AR)
- **Persistent storage**: Selected language saved via AsyncStorage
- **RTL support**: Arabic layout automatically adjusts
- **Translation keys**: 100+ keys covering all UI text

> See `src/localization/i18n.ts` and translation files in `src/localization/`


### 2. Keyboard Handling

Optimized form UX with KeyboardAvoidingView:

- **Platform behavior** — `padding` for iOS, `height` for Android
- **Vertical offset** — Accounts for header height (64pt on iOS)
- **Scrollable forms** — ScrollView with `flexGrow` for long forms

> See `src/app/sign-in.tsx` and `src/app/sign-up.tsx`

### 3. Pre-commit Hooks

Automated code quality with Husky:

```bash
# On every commit:
1. Strip console.logs (except logger files)
2. Run Prettier formatting
3. Run ESLint with auto-fix
```

> See `.husky/pre-commit` and `scripts/console.js`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Start on Android emulator/device |
| `npm run ios` | Start on iOS simulator/device |
| `npm run web` | Start on web browser |
| `npm run lint` | Run ESLint checks |
| `npm run reset-project` | Reset project to blank state |

---

## Dependencies Highlights

### Core
- **expo-router** — File-based routing for Expo
- **redux-toolkit** — Modern Redux with RTK Query
- **react-i18next** — React integration for i18next

### UI/Animation
- **react-native-reanimated** — Smooth animations (FadeInDown, etc.)
- **expo-glass-effect** — iOS glassmorphism effects
- **react-native-toast-message** — In-app notifications

### Utilities
- **@react-native-async-storage/async-storage** — Local persistence
- **expo-secure-store** — Secure token storage
- **expo-image** — Optimized image loading

---

## Design Philosophy

- **Clean & Professional** — Inspired by Indeed and ZipRecruiter
- **Glassmorphism** — Modern iOS-style translucent UI
- **Icon-Only Tabs** — 5-tab navigation without labels for elegance
- **Spring Animations** — Layout fades and smooth transitions
- **Mobile-First** — Optimized for job seekers on the go

---

## License

MIT License — feel free to use this project for learning or commercial purposes.

---

## Support

For issues or questions:
- Check [Expo documentation](https://docs.expo.dev/)
- Review [React Native docs](https://reactnative.dev/)
- Open an issue in this repository
