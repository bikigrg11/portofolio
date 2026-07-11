# Personal Portfolio

A 3D-forward personal portfolio for **Biki Gurung** — Site Reliability Engineer — built as a single-page site with a live WebGL background and click-to-open project deep-dives.

**[▶ Live site](https://biki-portfolio.fly.dev)**

## Highlights

- **Live 3D background** — an animated Kubernetes-style node-graph (React Three Fiber) rendered as a full-page, scroll-reactive backdrop, with a graceful static fallback when WebGL or reduced-motion applies.
- **Project carousel** — a draggable 3D coverflow of every project (drag / arrows / keyboard / wheel).
- **Card grids + deep-dive modals** — Work and Personal projects as matching card grids; click any card for a popup with the full problem → what-I-built → metrics → stack → links.
- **Experience timeline**, grouped skills, and a spinning iridescent-shader logo in the nav.
- **Accessible & fast** — respects `prefers-reduced-motion`, capped device-pixel-ratio, no layout shift, and text kept readable over the 3D layer.

## Tech stack

| | |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| 3D | Three.js via [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) + `@react-three/drei` |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Tests | Vitest + Testing Library |
| Hosting | Fly.io (static build served by nginx) |

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run test       # unit tests
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Deploy (Fly.io)

The site builds to static assets and is served from a small nginx container.

```bash
fly deploy --remote-only     # remote build; no local Docker needed
```

`Dockerfile` (multi-stage: Node build → nginx) and `fly.toml` are in the repo. Content lives in a single typed data module (`src/data/content.tsx`).

## Structure

```
src/
├── three/        # R3F canvas, node-graph, iridescent shader
├── sections/     # Hero, About, Projects, Experience, Stack, Contact
├── components/   # Nav, ProjectCard, ProjectModal, ProjectCarousel, …
└── data/         # content.tsx — projects, experience, skills (single source of truth)
```
