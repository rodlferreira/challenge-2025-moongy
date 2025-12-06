# Powerpuff TV Explorer

Application developed as a solution for the **FRONTEND CHALLENGE 2025**, using **Next.js (App Router)**, **TypeScript** and **React 18+** to explore the show “Powerpuff Girls” and its episodes, consuming the **TVMaze API**.

The application features:

- Show details page (title, description, cover, episode list)
- Episode details page (title, summary, cover)
- Episode search and pagination
- Episode favoriting (via **Server Action** and mock JSON file)
- Testing with **Vitest + React Testing Library**
- Responsive, accessible layout using **Atlassian Design System (Atlaskit)**

---

## 🌐 Stack and Technologies

- **Next.js** (App Router, `app/`)
- **React 18+**

- React Server Components (RSC)

- Server Actions
- **TypeScript**

- **Tailwind CSS** (for layout and styling utilities)
- **Atlassian Design System / Atlaskit**

- `@atlaskit/button`

- `@atlaskit/heading`

- (and other components/tokens if needed)
- **TVMaze API**

- `https://api.tvmaze.com`
- **Vitest + @testing-library/react + @testing-library/jest-dom**
- **ESLint + Prettier**

---

## 🧱 Project Architecture

The main project structure follows a separation by responsibility:
```txt
.
├── app
│   ├── layout.tsx              # Root layout (Server + Client shell)
│   ├── page.tsx                # Show Details (Server Component)
│   └── episodes
│       └── [id]
│           └── page.tsx        # Episode Details (Server Component)
├── app
│   └── actions
│       └── favorites.ts        # Server Actions for favorites
├── components
│   ├── layout
│   │   └── AppShell.tsx        # App layout using Atlaskit (Client)
│   └── episodes
│       ├── EpisodesList.tsx    # List with search, pagination, favorites (Client)
│       └── EpisodeCard.tsx     # Episode card (Client)
├── lib
│   ├── tvmaze.ts               # TVMaze API client + fetch helpers
│   └── types.ts                # Domain TypeScript types (Show, Episode)
├── data
│   └── favorites.json          # Mock “database” for favorites
├── tests
│   ├── lib
│   │   └── tvmaze.test.ts      # Tests for the data layer
│   └── components
│       └── EpisodesList.test.tsx
├── package.json
├── tsconfig.json
├── eslint.config.js / .eslintrc.*
└── .prettierrc

---

## 🚀 to start the project, after clone, just need to run: 

1. `npm install`
2. `npm run dev`

And have fun! 🎉