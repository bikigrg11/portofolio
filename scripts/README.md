# Screenshot capture pipeline

`scripts/capture-shots.mjs` drives a headless Chromium (Playwright) at
1440x900 and screenshots a list of already-running localhost URLs into
`public/shots/<id>.png`. It does **not** start any dev servers itself —
starting each sibling app is app-specific (ports, env vars, DBs, brokers)
and fragile to automate, so that part is a manual, documented step below.

The script is resilient: each target is wrapped in try/catch, a slow or
failing target is logged as `SKIPPED` and the run continues. It never
throws past `main()`, so it's safe to wire into any workflow without
risking a build failure.

## One-time setup

```bash
npm install -D playwright
npx playwright install chromium
```

## Usage

```bash
# capture every target in the TARGETS array at the top of the script
node scripts/capture-shots.mjs

# capture just one or a few ids
node scripts/capture-shots.mjs side-quests trading-bot
```

Edit the `TARGETS` array at the top of `scripts/capture-shots.mjs` to add,
remove, or change the URL/port for a target. Each entry is
`{ id, url }` — `id` becomes `public/shots/<id>.png`.

## Mapping to the site

Shot ids that are wired into `src/data/content.tsx` via a `shot:
'/shots/<id>.png'` field will automatically show up in the case-study /
more-work cards once the PNG exists at that path:

- `trading-bot` → featured "Trading Bot" case study
- `side-quests` → "Side Quests" (io-game-lab) card

`job-hunt-tracker`, `kept-web`, and `pokeinvest` are **not** currently
referenced by any `shot` path in `content.tsx` — they're captured/saved
to `public/shots/` for potential future use but intentionally not forced
into the UI (per task scope, only save them, don't wire them in).

## Per-app manual start instructions

Start the app in one terminal, confirm the URL below responds, then run
the capture script (or leave it running and run the script for just that
id). Kill the dev server when done.

### io-game-lab -> `side-quests`

Static HTML, no build step. From the **sibling** `io-game-lab/` repo:

```bash
npx serve -l 4173 .
```

Then capture `http://localhost:4173/arcade` (the 30-game arcade page —
`serve` strips `.html` and 301-redirects `/arcade.html` -> `/arcade`, so
target the extensionless path directly). `index.html` also works at
`http://localhost:4173/` if you'd rather capture the 10-game landing page
instead.

### trading/trading-bot -> `trading-bot`

FastAPI dashboard. It renders its full UI shell from **cached/persisted
logs** (`logs/trade_history.json`, `logs/ops_brain.json`, etc.) even with
no live IBKR/broker connection — no credentials needed for a screenshot.
From the sibling `trading/trading-bot/` repo:

```bash
python3 -m dashboard.app --port 8010
```

(Default port 8000 may already be in use by something else on your
machine — pass `--port` to pick a free one, and update the `url` in
`TARGETS` to match.) Then capture `http://localhost:8010/`.

If this errors out on missing Python deps or config, skip it — that's an
acceptable outcome per the task's best-effort scope.

### job-hunt-tracker -> `job-hunt-tracker` (not wired into content.tsx)

```bash
cd ../job-hunt-tracker
npm install   # already had node_modules in this environment
npm run dev -- -p 3101
```

Capture `http://localhost:3101/`.

### kept-web -> `kept-web` (not wired into content.tsx)

```bash
cd ../kept-web
npm install   # already had node_modules in this environment
npm run dev -- -p 3102
```

Capture `http://localhost:3102/`.

### pokeinvest -> `pokeinvest` (not wired into content.tsx)

```bash
cd ../pokeinvest
npm install   # already had node_modules in this environment
npm run dev -- -p 3103
```

Capture `http://localhost:3103/`. **Known issue:** as of this writing the
homepage 500s with `TypeError: localStorage.getItem is not a function` —
looks like `localStorage` is referenced from server-rendered code. This
is an app bug, not a capture-pipeline or credentials issue; fix it in
`pokeinvest` itself, then re-run the capture.

## Capture results (last run)

| id                 | source app                    | status    | notes                                                        |
|--------------------|--------------------------------|-----------|---------------------------------------------------------------|
| `side-quests`      | io-game-lab (arcade.html)      | CAPTURED  | wired into content.tsx                                        |
| `trading-bot`      | trading/trading-bot dashboard  | CAPTURED  | wired into content.tsx; cached/offline data, no broker needed |
| `job-hunt-tracker` | job-hunt-tracker (Next.js)     | CAPTURED  | not wired into content.tsx yet                                |
| `kept-web`         | kept-web (Next.js)             | CAPTURED  | not wired into content.tsx yet                                |
| `pokeinvest`       | pokeinvest (Next.js)           | SKIPPED   | homepage 500s (server-side `localStorage` bug in that app)    |

Everything else referenced by `content.tsx` (`kubernetes-mcp-server`,
`game-aware-autoscaling`, `kyverno-outage-killer`, `karpenter-cost-cut`)
falls outside this task's scope (no runnable sibling app for those) and
keeps its existing placeholder/SVG visual.
