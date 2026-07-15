### Pluviaster (´｡• ω •｡`)

This is my personal starter kit / template. I am still working on it so please note that it is all under development and not meant to be used.

### Used packages

###### Core
- Vite (8.1.4) (MIT)
- React Router (8.2.0) (MIT)
- i18next (26.3.6) (MIT)

###### Design
- Tailwind (v4.3.2) (MIT)
- Motion One (12.42.2) (MIT)
- Lucide React Icons (1.24.0) (ISC)
- Tailwind Corner Shape (0.0.8-3) (MIT)
- Tailwind Merge (3.6.0) (MIT)
- Class Variance Authority (CVA) (0.7.1) (Apache-2.0)
- clsx (Conditional className constructor) (2.1.1) (MIT)

---

###### Future add:
- Data Fetching & Server State: TanStack Query.
- Client-Side State Management: Zustand.
- Form Handling & Validation.
- Maybe: Headless UI Components.


###### Project Structure:

Feature-based: one folder per domain feature (the SRP boundary) with concerns layered inside it; cross-feature code in `shared/`, the app shell in `app/`.

```
src/
├── main.tsx              # Entry: mounts <RouterProvider>, imports styles + i18n
├── app/                  # App shell: routing, providers, global config
│   ├── App.tsx           # Root demo screen
│   ├── router.tsx        # React Router route table (createBrowserRouter)
│   └── config/           # Global setup
│       ├── i18n.ts       # i18next init
│       └── locales/      # i18n translation files (en.json, ja.json)
├── features/             # One folder per domain feature (the SRP boundary)
│   └── <feature>/        #   components/ · hooks/ · services/ · types.ts · index.ts (public API)
├── shared/               # Cross-feature reusable code
│   ├── components/
│   │   ├── ui/           # Atomic UI components (CVA variants + cn())
│   │   └── animations/   # Motion-based components
│   ├── hooks/            # Global hooks (useTheme)
│   └── utils/            # Helpers (utils.ts → cn())
├── styles/               # index.css (Flexoki theme) + any extra CSS
└── ignore/               # Private/scratch files, git-ignored (created on demand)
```

Directories not yet present (`assets/`, `layouts/`, `pages/`, `store/`, a shared `api/` layer, …) are created on demand — feature-local if they belong to one feature, otherwise under `shared/`.