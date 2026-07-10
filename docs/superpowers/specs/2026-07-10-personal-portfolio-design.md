# Personal Portfolio — Design Spec

**Author:** Biki Gurung
**Date:** 2026-07-10
**Status:** Approved direction, pending spec review

## 1. Goal

A distinctive, 3D-forward personal portfolio site for Biki Gurung (Site
Reliability Engineer, DraftKings) that showcases professional and personal
projects in depth, and deploys to **Fly.io**. It should read as
*"an SRE who ships,"* be fast, and hold up on both desktop and mobile.

## 2. Chosen direction

Selected from 7 live prototypes (`personalweb/prototypes/`):

- **Visual style:** Option 1 — **"Cluster"** — dark background, cyan/blue accent,
  with a **live 3D Kubernetes-style node-graph** as the hero (glowing nodes,
  connecting edges, traveling data-pulses). On-brand for an SRE: the site
  literally renders a cluster.
- **Projects presentation:** Option 7 — **case-study sections** — each project
  is a full section with a framed screenshot/visual, then
  *Problem → What I built → Metrics → Stack → Links*, alternating left/right.
- The 3D coverflow carousel (Option 6) is **shelved** in favor of the deeper
  case-study sections.

## 3. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Vite + React + TypeScript** | Component-driven sections; industry standard; fast dev + build to static assets. |
| 3D | **React Three Fiber (@react-three/fiber) + drei** | The standard React wrapper for Three.js cited across the 2026 research; makes the 3D hero maintainable. |
| Styling | **Tailwind CSS** | Fast, consistent; matches the token-based look of the prototypes. |
| Animation | **Framer Motion** (scroll/reveal) + custom R3F loop | Section reveals + camera choreography. |
| Hosting | **Fly.io** | Per requirement. Static `dist/` served from a small container. |

**Rationale for R3F over vanilla Three.js:** the prototypes are vanilla for
speed, but the real site has many sections and reusable 3D pieces; R3F's
component model keeps that maintainable and is the ecosystem standard.

**Performance guardrails:** WebGL with graceful degradation; pause the render
loop when the hero is off-screen; `prefers-reduced-motion` disables heavy
animation; a static fallback image for the hero if WebGL is unavailable; cap
device pixel ratio at 2.

## 4. Site structure (single-page, anchored nav)

1. **Nav** — brand, links (Work / Projects / Stack / Contact), sticky, blurred.
2. **Hero** — 3D node-graph canvas + headline ("I keep 100+ clusters alive at
   scale"), subhead, CTAs, and the three stat chips (~100 clusters, 35% cost cut,
   3.5 yr K8s).
3. **About** — short narrative: SRE at DraftKings + builder on the side.
4. **Case studies** — alternating deep sections (see §5).
5. **Stack** — grouped skills (Kubernetes/Reliability, Cloud/Compute,
   IaC/Observability, Languages).
6. **Contact / footer** — email, GitHub (bikigrg11), LinkedIn, location.

## 5. Projects & screenshot treatment

Content comes from `job-hunt-tracker/data/profile.md` (source of truth — never
invent facts). Two visual treatments:

**A. Runnable apps → real captured screenshots** (run locally, screenshot):
- **Autonomous Trading Bot** — FastAPI + WebSocket dashboard (`trading/trading-bot`).
- **Personal web apps** (as a "side quests" showcase): `job-hunt-tracker`,
  `kept-web`, `pokeinvest` (Next.js), `io-game-lab` (HTML games).

**B. Infra work (no public app) → clean technical visuals** (architecture
diagrams / dashboard-style mockups, not literal screenshots):
- **Kubernetes MCP Server** — agent↔cluster architecture diagram.
- **Game-Aware Autoscaling** — Karpenter/KEDA/ScaleOps flow + a Datadog-style
  metrics mockup.
- **Kyverno Outage Killer** — before/after routing diagram.
- **Karpenter Cost Cut** — a 35%-reduction metric visual.

**Featured case studies (in order):** MCP Server, Autonomous Trading Bot,
Game-Aware Autoscaling, Kyverno Outage Killer. Karpenter cost + personal side
quests appear as a lighter "more work" strip below.

**Screenshot pipeline:** a documented, repeatable step — start each runnable app,
capture at a fixed viewport with a headless browser, save into
`public/shots/<project>.png`, referenced by the section components. Infra visuals
are authored as SVG/components. All images swappable later.

## 6. Deployment (Fly.io)

- Build static assets with Vite (`npm run build` → `dist/`).
- **Dockerfile:** multi-stage — Node build stage → serve `dist/` from a minimal
  static server (nginx:alpine or `flyio/static`).
- **fly.toml:** app name (e.g. `biki-portfolio`), single region, HTTP service on
  port 80, `force_https`, auto start/stop machines to keep it cheap.
- Custom domain optional/later.
- **Git:** `personalweb/` is not yet a repo. Initialize git, push to GitHub
  (per standing preference to always push), then `fly launch`/`fly deploy`.

## 7. Out of scope (YAGNI)

- No CMS/backend — content is in-code/JSON.
- No blog (can add later).
- No contact-form backend — `mailto:` link only.
- No the explorable "datacenter world" (Option 6 big-swing) — parked.

## 8. Success criteria

- Loads to interactive hero in < 2.5s on a normal connection; 60fps hero on a
  modern laptop; usable/legible on mobile with reduced 3D.
- All facts trace to `profile.md`.
- Deployed and reachable on a Fly URL over HTTPS.
- Real screenshots for runnable apps; clean authored visuals for infra work.
