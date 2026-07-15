# Pluviaster - Code of Conduct

Rulebook for this starter kit: what it is, how it is structured, and how to use it when starting a new project.

> **Note:** This starter kit is a my personal kit it includes structure, theming, conventions and more that fit into my common usage. Hence it is neither meant to be perfect nor better fit for you. Feel free to change it and make it your own.

## What this kit is

Pluviaster is primarily a **config template**  curated, pre-wired tooling (Vite + React plugin, React 19, TypeScript, Tailwind v4+, ESLint flat config, Prettier + Tailwind class sorting, i18next, dark mode) - additionally a small set of **personal components** that get reused often (`Button`, animation components, etc.). I would suggest to keep it that way. Configs are the core of kit and components are just addition. Don't let the component collection grow past what you actually reuse.

## Project structure

**Feature-based organization** - one folder per domain feature (the SRP boundary), with concerns (components / hooks / services / types) layered *inside* each feature. Cross-feature reusable code lives in `shared/`, and the app shell (routing, providers, global config) lives in `app/`.

```
src/
├── main.tsx              # Entry: mounts <RouterProvider>, imports styles + i18n
├── app/                  # App shell: routing, providers, global config
│   ├── App.tsx           # Demo screen showing theme + i18n working
│   ├── router.tsx        # react-router: createBrowserRouter route table
│   └── config/
│       ├── i18n.ts       # i18next init
│       └── locales/      # i18n translation files (en.json, ja.json)
├── features/             # One folder per domain feature (empty for now)
│   └── <feature>/        #   ├── components/  presentation only
│                         #   ├── hooks/       feature logic, state
│                         #   ├── services/    engine, API, side effects
│                         #   ├── types.ts
│                         #   └── index.ts     public API of the feature
├── shared/               # Cross-feature reusable code
│   ├── components/
│   │   ├── ui/           # Reusable atomic components (CVA variants + cn())
│   │   └── animations/   # Motion-based animation components
│   ├── hooks/            # Global reusable hooks (useTheme.ts)
│   └── utils/            # Helpers (utils.ts → cn())
├── styles/               # index.css and any extra CSS
│   └── index.css         # Theme file: Flexoki palette, semantic tokens, fonts, animations
└── ignore/               # Private/scratch files, excluded from git (created on demand)
```

Add a new domain (or page) as `features/<name>/` with its own `components/`, `hooks/`, `services/`, `types.ts`, and an `index.ts` that is the feature's public API other code imports from the feature's `index.ts`, never its internals. Promote anything reused across features into `shared/`. Directories not yet present (`assets/`, `layouts/`, `pages/`, `store/`, a shared `api/` layer, …) are created on demand; place them by the same rule feature-local if they belong to one feature, otherwise `shared/`.

## Theming (Flexoki)

The theme is [Flexoki](https://stephango.com/flexoki) by Steph Ango, defined in `src/styles/index.css` for Tailwind v4+ . Tailwind's default palette is removed - Flexoki is the main theme.

It has other minimal animations defined at `src/styles/index.css`.

**Prefer semantic tokens** flips automatically between light and dark:

| Utility | Role |
| --- | --- |
| `bg-bg` / `bg-bg-2` | primary / secondary background |
| `border-ui` / `border-ui-2` / `border-ui-3` | borders / hovered / active |
| `text-tx` / `text-tx-2` / `text-tx-3` | primary / muted / faint text |

**Raw palette** when you need a specific color: `black`, `paper`, `base-50`…`base-950`, and eight accents (`red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `magenta`), each with a `-light` variant. 

Convention: the plain accent on light backgrounds, the `-light` variant on dark ones (`text-blue dark:text-blue-light`).

**Dark mode** is class-based (`.dark` on `<html>`):

- `src/shared/hooks/useTheme.ts` - `{ theme, setTheme, toggleTheme }`; persists to localStorage, falls back to the OS preference.
- `index.html` contains an inline script that applies the class before first paint (no flash).

To re-skin a project, edit the palette values in `src/styles/index.css`; component classes use semantic tokens, so they don't need touching.

## Internationalization

- Initialized in `src/app/config/i18n.ts` (imported once in `main.tsx`).
- Detects language from localStorage, then the browser; falls back to `en`.
- Translations live in `src/app/config/locales/<lang>.json` using natural-language keys. To add a language: add the JSON file and register it in the `resources` map in `i18n.ts`.
- Use ISO 639-1 language codes for languages, not country codes since they are different standards:
  -  ``` ja - ISO 639-1 language code for Japanese (from "Japanese") ```
  -  ``` JP - ISO 3166-1 country code for Japan (from "Japan") ```

## TypeScript policy

Relaxed checking while learning (since I am still learning), however still effective laws:

- `strictNullChecks` **on** - to catch bugs.
- `noImplicitAny` **off** - annotate when you can; the compiler won't force you.
- All source files are `.ts`/`.tsx`.
- When ready, flip `strict: true` in `tsconfig.app.json` and delete the exceptions.

## Component conventions

- UI components use **CVA** for variants + the `cn()` helper (`src/shared/utils/utils.ts`, clsx + tailwind-merge). See `src/shared/components/ui/button.tsx` for the pattern: `cva()` base + `variants`, exported `VariantProps` type, `forwardRef`. These UI atoms intentionally export their CVA variants (e.g. `buttonVariants`) next to the component; `eslint.config.js` disables `react-refresh/only-export-components` for `src/shared/components/ui/**` so that's not flagged.
- Components carry **no outer margins** - spacing belongs to the parent layout.
- Animations import from `"motion/react"` (not `"framer-motion"` - since it is obsolete).
- Style with semantic tokens first, raw palette second, arbitrary values last.

## Starting a new project from this kit

```bash
gh repo clone plwtx/pluviaster
(or npx degit plwtx/pluviaster my-app)
cd my-app
git init && npm install
npm run dev   # runs on port 3333
```

Then go through this checklist:
1. `package.json` - change `name` (lowercase).
2. `index.html` - update `<title>` and `lang`.
3. `src/styles/index.css` - keep Flexoki or swap palette values; semantic tokens stay.
4. `src/app/config/locales/` - replace demo strings; add/remove languages in `src/app/config/i18n.ts`.
5. Delete demo content in `src/app/App.tsx` (and add real routes in `src/app/router.tsx`) plus any components you won't use.
6. `.htaccess` is Apache-only. Replace with `_redirects` / `vercel.json` if deploying elsewhere.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server on port 3333 |
| `npm run build` | type-check (`tsc -b`) + production build |
| `npm run lint` | ESLint over `js/jsx/ts/tsx` |
| `npm run preview` | preview the production build |
