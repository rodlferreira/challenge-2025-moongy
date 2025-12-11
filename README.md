# Powerpuff TV Explorer

Application developed as a solution for the **FRONTEND CHALLENGE 2025**, using **Next.js (App Router)**, **TypeScript** and **React 18+** to explore the show **“The Powerpuff Girls”** and its episodes, consuming the **TVMaze API**.

The application features:

- Show details page (title, description, cover, episode list)
- Episode details page (title, summary, cover)
- Episode search and pagination
- Episode favoriting (via **Server Actions** and a mock JSON “database”)
- Testing with **Vitest + React Testing Library**
- Responsive, accessible layout using **Atlassian Design System (Atlaskit)**

---

## 🌐 Stack and Technologies

- **Next.js**
    - App Router (`app/`)
    - React Server Components (RSC)
    - Server Actions
- **React 18+**
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
│   ├── episodes
│   │   └── [id]
│   │       └── page.tsx        # Episode Details (Server Component)
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


```
---

## 🧠 Architecture & Design Decisions

This project is intentionally small but structured to reflect patterns that I would use in a real-world React / Next.js codebase and that are commonly discussed in interviews.

### 1. Separation by responsibility (`app` / `components` / `lib` / `data` / `tests`)

- **`app/`**  
  Centralizes routing and server-centric logic:
  - `layout.tsx` defines the root layout and global shell.
  - `page.tsx` and `episodes/[id]/page.tsx` are **Server Components**, responsible for data fetching and SEO-friendly rendering.
  - `app/actions/favorites.ts` contains **Server Actions**, so mutations stay on the server side.

  This keeps **navigation and data loading close to the framework**, while UI details stay in reusable components.

- **`components/`**  
  Contains purely visual / interactive pieces:
  - `AppShell.tsx` encapsulates the main layout using Atlaskit (header, container, etc.).
  - `EpisodesList.tsx` and `EpisodeCard.tsx` handle client-side concerns like search, pagination and favoriting.

  This separation follows the idea of **“smart” server pages + “dumb” reusable components**, which simplifies testing and reuse.

- **`lib/`**  
  - `tvmaze.ts` works as a small **data access layer** for TVMaze (fetch helpers, base URL and show ID).
  - `types.ts` centralizes **domain types** (`TvMazeShow`, `TvMazeEpisode`, etc.), avoiding magic fields spread across the codebase.

  In an interview, I’d explain this as a way to **isolate external APIs** behind a thin abstraction, making it easier to test and refactor.

- **`data/`**  
  - `favorites.json` acts as a mock “database” to store favorite episodes.

  For a challenge, this is a good trade-off: I can demonstrate **server-side mutations and persistence logic** without introducing a real DB.

- **`tests/`**  
  Split by layer:
  - `tests/lib/tvmaze.test.ts` validates the data layer.
  - `tests/components/EpisodesList.test.tsx` covers UI behavior (search, filtering, favorites).

  This shows that the project is **designed for testability**, not just tested at the end.

---

### 2. Why React Server Components + Server Actions

- **React Server Components (RSC)**  
  Pages in `app/` are Server Components, so data is fetched on the server and HTML is streamed to the client.

  Benefits to highlight:

  - Better **performance** (less JavaScript sent to the client).
  - Better **SEO**, since content is rendered on the server.
  - Simpler data fetching (no need for client-side effects just to load initial data).

- **Server Actions for favorites**

  The `toggleFavoriteEpisode` logic lives in `app/actions/favorites.ts`:

  - The client doesn’t need to know about file system or database details.
  - Mutation code runs on the server, which is **more secure** and easier to evolve (e.g., replacing the JSON file with a real DB later).
  - It demonstrates knowledge of **modern Next.js patterns**, which are often asked about in interviews (difference between API routes, client fetch + mutation, and Server Actions).

---

### 3. UI & Styling: Atlaskit + Tailwind

- **Atlaskit**  
  Chosen to align with a real design system and give the UI a more “production-like” look.  
  Components like `@atlaskit/button` and `@atlaskit/heading` provide **consistent spacing, typography and accessibility** out of the box.

- **Tailwind CSS**  
  Used for layout and small styling utilities (flexbox, spacing, responsive behavior).  
  Avoids scattering multiple `.css` files for simple layout concerns.  
  In an interview, I’d mention that Tailwind helps **move faster on small projects** while still allowing a design system like Atlaskit to provide the base components.

---

### 4. Testing Strategy

- **Vitest + React Testing Library**
  - `tvmaze.test.ts` ensures that the data layer behaves as expected (e.g., correct URL, error handling).
  - `EpisodesList.test.tsx` focuses on user flows: typing in the search box, seeing filtered results, interacting with favorites.

- **Why this matters**
  - Shows that the architecture isn’t just “nice on paper”: it’s **test-oriented**.
  - In an interview, I can explain that I prefer to test:
    - **Logic close to the data layer** (pure functions, fetch helpers).
    - **Critical UI behavior** (search/filter/pagination, rather than visual details).

---

### 5. Trade-offs and Possible Improvements

For a real production app I would consider:

- Replacing the `favorites.json` mock with a real database (e.g., PostgreSQL + Prisma).
- Adding error boundaries and loading states per route or segment.
- Extracting a small **design tokens** layer if the project grew beyond a simple challenge.
- Adding more tests for:
  - Episode details page.
  - Edge cases in pagination and search.

---

## 🚀 Getting Started

To start the project, after cloning, just run:

1º => ´npm install´

and


2º => ´npm run dev´

Then open http://localhost:3000 in your browser.

And have fun! 🎉