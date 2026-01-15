### pluviaster

This is my personal starter kit / template. I am still working on it so please note that it is all under development and not meant to be used.

### Used packages

###### Core
- Vite (7.3.1) (MIT)
- React Router (7.12.0) (MIT)
- i18next (25.7.4) (MIT)

###### Design
- Tailwind (v4.1.18) (MIT)
- Motion One (12.26.2) (MIT)
- Lucide React Icons (0.562.0) (ISC)
- Tailwind Corner Shape (0.0.8-3) (MIT)
- Tailwind Merge (3.4.0) (MIT)
- Class Variance Authority (CVA) (0.7.1) (Apache-2.0)
- clsx (Conditional className constructor) (2.1.1) (MIT)

---

###### Future add:
- Data Fetching & Server State: TanStack Query.
- Client-Side State Management: Zustand.
- Form Handling & Validation.
- Maybe: Headless UI Components.


###### Project Structure:
```
src/
├── assets/          # Static files (images, fonts, svgs) (seperated by formats.)
│   └── svg/         # SVG Format
│   └── webp/        # WEBP Format
├── components/      # Reusable, atomic UI components (Buttons, Inputs, Cards)
│   └── ui/          # (CVA + Animations / etc.)
├── config/          # Project constants, environment variables, i18n setup etc.
├── features/        # Core of the app.
│   └── auth/        # Auth feature
│       ├── components/ # Feature-specific UI
│       ├── hooks/      # Feature-specific logic
│       ├── services/   # API calls for this feature
│       └── types/      # TypeScript definitions for this feature
├── hooks/           # Global, reusable hooks (useMediaQuery, useTheme)
├── layouts/         # Page wrappers (DashboardLayout, AuthLayout)
├── lib/             # Third-party library wrappers (utils.ts, etc.)
├── pages/           # Route-level components (Home, Error, etc.)
├── router/          # Route definitions and guards ()
├── store/           # Global state management (Zustand, Redux, etc.)
└── types/           # Global TypeScript types and interfaces
```