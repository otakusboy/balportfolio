# Iqbal Aqaba Portfolio (Next.js)

Local clone of [iqbalaqaba.com](https://iqbalaqaba.com) — split-screen portfolio with a stable profile panel and scrollable project workspace.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Edit content

| What | Where |
| --- | --- |
| Bio, email, socials, brands | `data/profile.ts` |
| Projects, years, links, layout variants | `data/projects.ts` |
| Project types | `types/project.ts` |
| Images | `public/images/...` |

## Layout notes

- **Desktop (`lg+`):** `MainShell` uses a full-height flex row. The left aside and right main each get `lg:h-full`; only the right pane uses `overflow-y-auto` (sticky-first, not `position: fixed`).
- **Tablet/mobile:** Single column, normal page scroll — no nested scroll panes.

## Theme

System theme by default via `next-themes`. Toggle in the sidebar.
