# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Biki Gurung's 3D personal portfolio — a dark, cyan-accented single-page site with a live Three.js Kubernetes node-graph hero and deep project case-study sections — to Fly.io.

**Architecture:** Vite + React + TypeScript SPA. Content lives in a typed data module (single source of truth, mirrored from `profile.md`). The hero renders via React Three Fiber. Sections are data-driven React components styled with Tailwind. The static `dist/` build is served from an nginx container on Fly.io.

**Tech Stack:** Vite, React 18, TypeScript, React Three Fiber (`@react-three/fiber`) + `@react-three/drei`, Tailwind CSS, Framer Motion, Vitest + Testing Library, Playwright (screenshot capture), nginx (serve), Fly.io.

## Global Constraints

- Project root: `/Users/bikigurung/Desktop/Claude-Code/personalweb` (git repo already initialized here).
- All factual content (roles, dates, metrics, project descriptions) MUST come from `../job-hunt-tracker/data/profile.md`. Never invent facts.
- Contact: Biki Gurung · bikigurung8@gmail.com · New York, NY · github.com/bikigrg11 · linkedin.com/in/biki-gurung-264a08aa · [redacted].
- Theme tokens (verbatim): `--bg:#05070d`, `--bg2:#0a0f1a`, `--fg:#e6edf7`, `--muted:#7d8aa3`, `--accent:#22e6d6`, `--accent2:#3b82f6`, `--line:rgba(120,150,200,.14)`.
- Must respect `prefers-reduced-motion` and provide a WebGL fallback (no crash if WebGL unavailable).
- Cap `devicePixelRatio` at 2 in all 3D canvases.
- Commit after every task with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Reference prototype for the hero look-and-feel: `prototypes/1-cluster.html`. Reference for sections: `prototypes/7-projectsections.html`.

---

### Task 1: Scaffold Vite + React + TS + Tailwind

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `tailwind.config.ts`, `postcss.config.js`
- Note: run inside existing repo at project root (do NOT create a nested folder).

- [ ] **Step 1: Scaffold Vite React-TS into current directory**

Run (from project root):
```bash
npm create vite@latest . -- --template react-ts
# If prompted about existing files (prototypes/, docs/, .git), choose "Ignore files and continue".
npm install
```

- [ ] **Step 2: Install dependencies**

```bash
npm install three @react-three/fiber @react-three/drei framer-motion
npm install -D tailwindcss@^3 postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind**

Replace `tailwind.config.ts` (create if `.js` was made; delete the `.js`):
```ts
import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05070d', bg2: '#0a0f1a', fg: '#e6edf7',
        muted: '#7d8aa3', accent: '#22e6d6', accent2: '#3b82f6',
      },
      fontFamily: { sans: ['"SF Pro Display"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 4: Base CSS**

Replace `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
:root { color-scheme: dark; }
html { scroll-behavior: smooth; }
body { background: #05070d; color: #e6edf7; -webkit-font-smoothing: antialiased; margin: 0; }
.line { border-color: rgba(120,150,200,.14); }
```

- [ ] **Step 5: Configure Vitest**

Edit `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test-setup.ts' },
})
```
Create `src/test-setup.ts`:
```ts
import '@testing-library/jest-dom'
```
Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 6: Verify dev server and build**

Run:
```bash
npm run build
```
Expected: build succeeds, `dist/` created with `index.html`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold Vite + React + TS + Tailwind

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Content data module

**Files:**
- Create: `src/data/content.ts`, `src/data/content.test.ts`

**Interfaces:**
- Produces: `Project` type `{ id: string; num: string; title: string; year: string; role: string; problem: string; built: string; metrics: {n: string; label: string}[]; stack: string[]; links: {label: string; href: string}[]; shot: string; featured: boolean }`; exports `projects: Project[]`, `profile: {name; title; location; email; github; linkedin; blurb; stats: {n; label}[]}`, `skills: {group: string; items: string[]}[]`.

- [ ] **Step 1: Write the failing test**

Create `src/data/content.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { projects, profile, skills } from './content'

describe('content', () => {
  it('has profile facts from profile.md', () => {
    expect(profile.email).toBe('bikigurung8@gmail.com')
    expect(profile.github).toContain('bikigrg11')
    expect(profile.stats.length).toBeGreaterThanOrEqual(3)
  })
  it('has at least 4 featured projects with required fields', () => {
    const feat = projects.filter(p => p.featured)
    expect(feat.length).toBeGreaterThanOrEqual(4)
    for (const p of feat) {
      expect(p.title).toBeTruthy()
      expect(p.problem).toBeTruthy()
      expect(p.built).toBeTruthy()
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
  it('groups skills', () => {
    expect(skills.some(s => s.group.match(/Kubernetes/i))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- content`
Expected: FAIL (cannot find module './content').

- [ ] **Step 3: Implement content module**

Create `src/data/content.ts` with facts pulled verbatim from `../job-hunt-tracker/data/profile.md`. Featured projects: Kubernetes MCP Server, Autonomous Trading Bot, Game-Aware Autoscaling, Kyverno Outage Killer. Include `profile` (blurb + 3 stats: `~100 clusters`, `35% cost cut`, `3.5yr K8s`), `skills` groups (Kubernetes/Reliability, Cloud/Compute, IaC/Observability, Languages), and a non-featured "side quests" entry. `shot` points to `/shots/<id>.png`. (Author the full arrays here — copy metrics and descriptions from the spec §5 and profile.md.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- content`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: content data module from profile.md

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Layout shell — nav + section scaffold

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Section.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/Nav.test.tsx`

**Interfaces:**
- Produces: `<Nav />` (sticky top bar, blurred, brand `BIKI.GURUNG`, anchor links Work/Projects/Stack/Contact). `<Section id title? children>` wrapper with consistent padding + max width.

- [ ] **Step 1: Write the failing test**

`src/components/Nav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Nav } from './Nav'
it('renders brand and nav links', () => {
  render(<Nav />)
  expect(screen.getByText(/GURUNG/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects')
})
```

- [ ] **Step 2: Run to verify fail** — `npm test -- Nav` → FAIL (no module).

- [ ] **Step 3: Implement `Nav.tsx` and `Section.tsx`**

`Nav.tsx`: fixed top bar (`fixed top-0 inset-x-0 z-20 backdrop-blur bg-bg/50 border-b line`), brand with cyan dot, links to `#work #projects #stack #contact`. `Section.tsx`: `<section id={id} className="max-w-[1200px] mx-auto px-[6vw] py-[110px]">` with optional eyebrow + `<h2>`. Wire both into `App.tsx` with placeholder sections.

- [ ] **Step 4: Run to verify pass** — `npm test -- Nav` → PASS.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: nav + section shell

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: 3D node-graph hero canvas (R3F)

**Files:**
- Create: `src/three/NodeGraph.tsx`, `src/three/HeroCanvas.tsx`, `src/hooks/useWebGLSupported.ts`
- Test: `src/hooks/useWebGLSupported.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `<HeroCanvas />` — full-bleed `position:fixed inset-0 -z-0` canvas rendering the node-graph; internally uses `useWebGLSupported()` and `prefers-reduced-motion` to fall back to a static gradient div. `useWebGLSupported(): boolean`.

- [ ] **Step 1: Write the failing test**

`src/hooks/useWebGLSupported.test.ts`:
```ts
import { renderHook } from '@testing-library/react'
import { useWebGLSupported } from './useWebGLSupported'
it('returns a boolean', () => {
  const { result } = renderHook(() => useWebGLSupported())
  expect(typeof result.current).toBe('boolean')
})
```

- [ ] **Step 2: Run to verify fail** — `npm test -- useWebGLSupported` → FAIL.

- [ ] **Step 3: Implement hook + canvas**

`useWebGLSupported.ts`: try to get a `webgl`/`experimental-webgl` context from a throwaway canvas in a `useEffect`, store boolean in state (default true for SSR/tests).

`NodeGraph.tsx`: port the node-graph from `prototypes/1-cluster.html` into R3F — a `<points>` fibonacci-sphere of ~90 nodes (cyan), `<lineSegments>` edges between near nodes (blue, low opacity), and animated pulse points traveling edges via `useFrame`. Rotate slowly; drift with pointer. Cap DPR at 2.

`HeroCanvas.tsx`: `<Canvas dpr={[1,2]} camera={{position:[0,0,14], fov:55}}>` containing `<NodeGraph/>`. If `!useWebGLSupported()` or reduced-motion, render a static `div` with a radial cyan/blue gradient instead of `<Canvas>`.

- [ ] **Step 4: Run to verify pass** — `npm test -- useWebGLSupported` → PASS.

- [ ] **Step 5: Visual check**

Run `npm run dev`, open the URL, confirm the node-graph renders, rotates, and pulses; confirm no console errors.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: 3D node-graph hero canvas with WebGL fallback

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Hero section content

**Files:**
- Create: `src/sections/Hero.tsx`
- Modify: `src/App.tsx`
- Test: `src/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `profile` from `content.ts`, `<HeroCanvas/>`.
- Produces: `<Hero/>` — the canvas + overlaid headline, subhead, CTAs (`View projects`, `Get in touch` mailto), and the 3 stat chips.

- [ ] **Step 1: Write failing test**

`src/sections/Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
it('shows headline stats and email CTA', () => {
  render(<Hero />)
  expect(screen.getByText(/100/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /touch/i })).toHaveAttribute('href', 'mailto:bikigurung8@gmail.com')
})
```
(If `<HeroCanvas/>` errors under jsdom, mock it in the test with `vi.mock('../three/HeroCanvas', () => ({ HeroCanvas: () => null }))`.)

- [ ] **Step 2: Run to verify fail** — `npm test -- Hero` → FAIL.

- [ ] **Step 3: Implement `Hero.tsx`** — headline "I keep 100+ clusters alive at scale" (cyan gradient on "100+ clusters"), subhead from `profile.blurb`, CTA buttons, stat chips mapped from `profile.stats`. Mount `<HeroCanvas/>` behind. Add to `App.tsx`.

- [ ] **Step 4: Run to verify pass** — `npm test -- Hero` → PASS.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: hero section

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: About + Stack sections

**Files:**
- Create: `src/sections/About.tsx`, `src/sections/Stack.tsx`
- Modify: `src/App.tsx`
- Test: `src/sections/Stack.test.tsx`

**Interfaces:**
- Consumes: `profile`, `skills`.
- Produces: `<About/>` (narrative paragraph), `<Stack/>` (grouped skill cards).

- [ ] **Step 1: Write failing test**

`src/sections/Stack.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Stack } from './Stack'
it('renders skill groups', () => {
  render(<Stack />)
  expect(screen.getByText(/Kubernetes/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify fail** — `npm test -- Stack` → FAIL.

- [ ] **Step 3: Implement** both sections; grid of skill-group cards for Stack; single-column narrative for About. Add to `App.tsx`.

- [ ] **Step 4: Run to verify pass** — `npm test -- Stack` → PASS.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: about + stack sections

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: Case-study project sections

**Files:**
- Create: `src/sections/CaseStudy.tsx`, `src/sections/Projects.tsx`, `src/components/ShotFrame.tsx`
- Modify: `src/App.tsx`
- Test: `src/sections/CaseStudy.test.tsx`

**Interfaces:**
- Consumes: `projects` (featured), `Project` type.
- Produces: `<CaseStudy project={p} index={i}/>` (alternating layout: screenshot frame + Problem/Built/Metrics/Stack/Links). `<Projects/>` maps featured projects. `<ShotFrame src alt label/>` browser-chrome frame; shows the image if present, else a styled placeholder with the label.

- [ ] **Step 1: Write failing test**

`src/sections/CaseStudy.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { CaseStudy } from './CaseStudy'
const p = { id:'x', num:'01', title:'Test Project', year:'2026', role:'solo',
  problem:'A problem.', built:'The build.', metrics:[{n:'35%',label:'cut'}],
  stack:['Go'], links:[{label:'GitHub',href:'#'}], shot:'/shots/x.png', featured:true }
it('renders problem, built, metric and stack', () => {
  render(<CaseStudy project={p as any} index={0} />)
  expect(screen.getByText('The build.')).toBeInTheDocument()
  expect(screen.getByText('35%')).toBeInTheDocument()
  expect(screen.getByText('Go')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify fail** — `npm test -- CaseStudy` → FAIL.

- [ ] **Step 3: Implement** `ShotFrame.tsx` (mac-style bar + `<img onError>` → placeholder), `CaseStudy.tsx` (grid, alternating via `index % 2`, Framer Motion reveal on scroll), `Projects.tsx` (eyebrow + map). Port styling from `prototypes/7-projectsections.html`. Add to `App.tsx` under `id="projects"`.

- [ ] **Step 4: Run to verify pass** — `npm test -- CaseStudy` → PASS.

- [ ] **Step 5: Visual check** — `npm run dev`; confirm alternating sections, placeholder frames, hover straighten, scroll reveal.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: case-study project sections

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: More-work strip + Contact footer

**Files:**
- Create: `src/sections/MoreWork.tsx`, `src/sections/Contact.tsx`
- Modify: `src/App.tsx`
- Test: `src/sections/Contact.test.tsx`

**Interfaces:**
- Consumes: non-featured projects, `profile`.
- Produces: `<MoreWork/>` (compact card strip for side quests / Karpenter cost), `<Contact/>` (footer: email, github, linkedin, location).

- [ ] **Step 1: Write failing test**

`src/sections/Contact.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Contact } from './Contact'
it('links email and github', () => {
  render(<Contact />)
  expect(screen.getByText(/bikigurung8@gmail.com/)).toBeInTheDocument()
  expect(screen.getByText(/bikigrg11/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify fail** — `npm test -- Contact` → FAIL.

- [ ] **Step 3: Implement** both; add to `App.tsx` (Contact has `id="contact"`).

- [ ] **Step 4: Run to verify pass** — `npm test -- Contact` → PASS.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: more-work strip + contact footer

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 9: Infra project visuals (SVG components)

**Files:**
- Create: `src/components/visuals/McpDiagram.tsx`, `src/components/visuals/AutoscaleDiagram.tsx`, `src/components/visuals/KyvernoDiagram.tsx`
- Modify: `src/components/ShotFrame.tsx` (accept optional `visual` React node instead of image)
- Test: `src/components/visuals/visuals.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: three self-contained SVG diagram components (cyan/blue theme) used as the "screenshot" for the infra projects that have no runnable UI. `ShotFrame` renders `visual` if provided, else `src` image, else placeholder.

- [ ] **Step 1: Write failing test**

`src/components/visuals/visuals.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { McpDiagram } from './McpDiagram'
it('renders an svg', () => {
  const { container } = render(<McpDiagram />)
  expect(container.querySelector('svg')).toBeTruthy()
})
```

- [ ] **Step 2: Run to verify fail** — `npm test -- visuals` → FAIL.

- [ ] **Step 3: Implement** the three SVG diagrams (MCP: agent→server→clusters; Autoscale: schedule→pre-warm→nodes with a 35% chip; Kyverno: before/after routing). Wire `content.ts` infra projects to use these via a `visual` key consumed by `CaseStudy`/`ShotFrame`.

- [ ] **Step 4: Run to verify pass** — `npm test -- visuals` → PASS.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: infra project SVG visuals

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 10: Screenshot capture pipeline

**Files:**
- Create: `scripts/capture-shots.mjs`, `scripts/README.md`
- Create (output): `public/shots/*.png`

**Interfaces:**
- Consumes: runnable apps in sibling folders.
- Produces: PNGs in `public/shots/` for `trading-bot`, `job-hunt-tracker`, `kept-web`, `pokeinvest`, `io-game-lab`. Best-effort: if an app won't start, skip it and leave the infra/placeholder visual in place (never blocks the build).

- [ ] **Step 1: Add Playwright**

```bash
npm install -D playwright
npx playwright install chromium
```

- [ ] **Step 2: Write capture script**

`scripts/capture-shots.mjs`: takes a list of `{id, url}` targets already-running on localhost, launches headless chromium at 1440×900, screenshots each into `public/shots/<id>.png`. Document in `scripts/README.md` the manual step: start each app (`npm run dev` / `uvicorn`), then run `node scripts/capture-shots.mjs`. (No app auto-start — that is fragile; capture is a documented manual-assisted step.)

- [ ] **Step 3: Capture what runs**

For each runnable app: start it, capture, stop. For `job-hunt-tracker`/`kept-web`/`pokeinvest`: `npm install && npm run dev`. For `io-game-lab`: serve `index.html`. For `trading-bot`: attempt `dashboard`; if config/deps block it, SKIP and keep the mockup. Record which succeeded in `scripts/README.md`.

- [ ] **Step 4: Verify images referenced**

Run `npm run dev`; confirm captured shots appear in their sections and skipped ones show clean placeholders/visuals.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: screenshot capture pipeline + captured shots

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 11: Polish — reduced motion, offscreen pause, mobile, meta

**Files:**
- Modify: `src/three/HeroCanvas.tsx`, `src/three/NodeGraph.tsx`, `index.html`, section files as needed
- Create: `src/hooks/useReducedMotion.ts`, `public/og.png` (static hero export), `public/favicon.svg`

- [ ] **Step 1: Reduced motion + offscreen pause**

Add `useReducedMotion()`; when true, freeze `useFrame` updates. Use drei `<Canvas frameloop>` or an intersection observer to pause rendering when hero scrolled out of view.

- [ ] **Step 2: Mobile pass**

Verify at 390px width: nav collapses gracefully, hero text readable, case studies stack single-column, canvas node count reduced on small screens (e.g. 60 nodes if `innerWidth < 700`).

- [ ] **Step 3: SEO/meta**

Edit `index.html`: `<title>Biki Gurung — Site Reliability Engineer</title>`, meta description, Open Graph tags referencing `/og.png`, favicon.

- [ ] **Step 4: Build + lighthouse-ish sanity**

Run `npm run build && npm run preview`; open preview, confirm hero interactive < ~2.5s, no console errors, 60fps on desktop.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "polish: reduced-motion, offscreen pause, mobile, meta

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 12: Fly.io deploy config (static nginx container)

**Files:**
- Create: `Dockerfile`, `nginx.conf`, `.dockerignore`, `fly.toml`

- [ ] **Step 1: Dockerfile (multi-stage)**

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

- [ ] **Step 2: nginx.conf (SPA)**

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
}
```

- [ ] **Step 3: .dockerignore**

```
node_modules
dist
.git
prototypes
docs
scripts
```

- [ ] **Step 4: fly.toml**

```toml
app = "biki-portfolio"
primary_region = "ewr"

[build]

[http_service]
  internal_port = 80
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
```

- [ ] **Step 5: Local build sanity (no local Docker)**

Since Docker isn't installed locally, verify the Vite build alone: `npm run build` succeeds. Fly will build the image remotely.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "chore: Fly.io deploy config (nginx static)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 13: GitHub push + Fly deploy

**Files:** none (operational task).

- [ ] **Step 1: Create + push GitHub repo**

If `gh` available: `gh repo create bikigrg11/portfolio --private --source=. --remote=origin --push`.
Else: user creates empty `portfolio` repo on GitHub, then:
```bash
git remote add origin https://github.com/bikigrg11/portfolio.git
git push -u origin main
```

- [ ] **Step 2: Fly launch (uses existing fly.toml)**

Requires the user to be logged in (`fly auth login` — interactive; user runs `! fly auth login` in-session if needed). Then:
```bash
fly launch --no-deploy --copy-config --name biki-portfolio --region ewr
```
(Confirm it reuses the committed `fly.toml`; decline databases.)

- [ ] **Step 3: Deploy (remote build)**

```bash
fly deploy --remote-only
```
Expected: build + push + release; ends with a `*.fly.dev` URL.

- [ ] **Step 4: Verify live**

```bash
fly open   # or curl -I https://biki-portfolio.fly.dev
```
Confirm HTTP 200, hero loads over HTTPS.

- [ ] **Step 5: Final commit/push**
```bash
git add -A && git commit -m "chore: deploy to Fly.io" --allow-empty
git push
```

---

## Self-Review

**Spec coverage:** Hero/style (Tasks 4–5), case studies (Task 7), About/Stack (Task 6), infra visuals (Task 9), real screenshots (Task 10), tech stack (Task 1), performance guardrails (Task 11), Fly deploy (Tasks 12–13), git/GitHub (Task 13), content from profile.md (Task 2). All spec sections mapped.

**Placeholder scan:** Data module (Task 2 Step 3) and infra visuals (Task 9 Step 3) intentionally delegate full content authoring to the implementer with the source (profile.md, spec §5) named — acceptable since exact copy is long-form and sourced, not invented. No "TBD"/"handle edge cases" left in code steps.

**Type consistency:** `Project` shape defined in Task 2 is consumed unchanged by Tasks 7 and 9 (`shot`, `visual`, `metrics{n,label}`, `stack`, `links{label,href}`). `useWebGLSupported`, `useReducedMotion` hook names consistent across Tasks 4 and 11. `ShotFrame` gains optional `visual` prop in Task 9 as noted.

**Known adaptation:** This is a largely-visual build; tests target data/render behavior, with explicit manual visual-verification checkpoints for the 3D/canvas work (shaders and camera motion are verified by eye, not unit tests).
