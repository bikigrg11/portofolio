// Content data module — work facts are sourced from job-hunt-tracker/data/profile.md
// (master profile); personal-project facts are sourced from each project's own
// README / CLAUDE.md under ~/Desktop/Claude-Code. Never invent facts here.
// This is a .tsx module (not .ts) because the infra projects reference hand-authored
// SVG visual components (JSX) in place of a screenshot.

import type { ReactNode } from 'react'
import { McpDiagram } from '../components/visuals/McpDiagram'
import { AutoscaleDiagram } from '../components/visuals/AutoscaleDiagram'
import { KyvernoDiagram } from '../components/visuals/KyvernoDiagram'
import { TradingBotDiagram } from '../components/visuals/TradingBotDiagram'

export type Project = {
  id: string
  num: string
  title: string
  icon: string
  category: string
  year: string
  role: string
  problem: string
  built: string
  metrics: { n: string; label: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  shot: string
  visual?: ReactNode
  // `featured: true` projects get a deep case-study section; every project
  // (featured or not) appears in the carousel.
  featured: boolean
}

const GH = 'https://github.com/bikigrg11'

export const projects: Project[] = [
  // ---------- Featured work: deep case studies ----------
  {
    id: 'kubernetes-mcp-server',
    num: '01',
    title: 'Kubernetes MCP Server',
    icon: '⎈',
    category: 'AI Agents · Infra',
    year: '2026',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      'AI agents and on-call engineers had no safe, scoped way to query or act on Rancher-managed Kubernetes clusters — every incident workflow required a human at a kubectl prompt.',
    built:
      'Built an MCP (Model Context Protocol) server using FastMCP that exposes Kubernetes operations on Rancher-managed clusters as tools for AI agents. Implemented multi-layer authentication (Rancher bearer tokens) to scope agent access per cluster / namespace, and integrated it with Claude Code, n8n, and Slack-based alerting to drive automated incident workflows.',
    metrics: [
      { n: 'per-ns', label: 'Scoped agent auth' },
      { n: '3', label: 'integrations: Claude Code, n8n, Slack' },
    ],
    stack: ['Python', 'FastMCP', 'Kubernetes', 'Rancher', 'Claude Code', 'n8n', 'Slack API'],
    links: [],
    shot: '',
    visual: <McpDiagram />,
    featured: true,
  },
  {
    id: 'trading-bot',
    num: '02',
    title: 'Autonomous Trading Bot',
    icon: '🤖',
    category: 'Trading · Automation',
    year: '2026',
    role: 'Personal',
    problem:
      "Manual day-trading execution is error-prone and can't reliably survive disconnects, partial fills, or stop-loss failures without putting capital at risk.",
    built:
      'A production-hardened, event-driven day-trading agent on Interactive Brokers (IBKR): reconnection with exponential backoff, position reconciliation on startup, stop-loss failure handling, fill validation, and market-calendar awareness. FastAPI + WebSocket dashboard for live monitoring.',
    metrics: [{ n: '5', label: 'failure modes hardened' }],
    stack: ['Python', 'FastAPI', 'WebSocket', 'Interactive Brokers API'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    visual: <TradingBotDiagram />,
    featured: true,
  },
  {
    id: 'game-aware-autoscaling',
    num: '03',
    title: 'Game-Aware Autoscaling',
    icon: '📈',
    category: 'Infra · Reliability',
    year: '2022–Present',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      "Reactive autoscaling (standard HPA / cluster-autoscaler) can't provision capacity fast enough for predictable live-betting traffic spikes, risking latency and outages during peak sportsbook events.",
    built:
      "Operate and extend a game-aware autoscaling layer combining Karpenter, KEDA, and ScaleOps with custom logic to pre-warm capacity ahead of predictable live-betting spikes that reactive autoscaling can't handle in time. Backed by Datadog dashboards, including a Super Bowl NOC-level command-center view used during peak events.",
    metrics: [{ n: '3', label: 'autoscalers orchestrated' }],
    stack: ['Kubernetes', 'Karpenter', 'KEDA', 'ScaleOps', 'Datadog'],
    links: [],
    shot: '',
    visual: <AutoscaleDiagram />,
    featured: true,
  },
  {
    id: 'kyverno-outage-killer',
    num: '04',
    title: 'Kyverno Outage Killer',
    icon: '🛡️',
    category: 'Infra · Reliability',
    year: '2022–Present',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      'AWS exposes no native per-instance PPS (packets-per-second) visibility, causing a recurring outage class whenever network-heavy workloads landed on nodes that hit bandwidth/PPS limits.',
    built:
      'Authored custom Kyverno policies that auto-route network-heavy workloads to high-bandwidth nodepools, eliminating the outage class. Drove it end-to-end — detection, mitigation, rollout, postmortem — and built the Datadog dashboards used to monitor Kyverno policy behavior in production.',
    metrics: [{ n: '0', label: 'PPS-limit outages after rollout' }],
    stack: ['Kubernetes', 'Kyverno', 'AWS', 'Datadog'],
    links: [],
    shot: '',
    visual: <KyvernoDiagram />,
    featured: true,
  },

  // ---------- Personal projects: carousel cards ----------
  {
    id: 'kept',
    num: '05',
    title: 'Kept',
    icon: '🧾',
    category: 'Mobile App',
    year: '2026',
    role: 'Solo — iOS / Android',
    problem: '',
    built:
      'Cross-platform app that scans receipts with AI extraction and tracks every coverage deadline per item — returns, warranties, card protection — with smart reminders and a claim helper backed by a 24-retailer / 47-brand policy database. Local-first with a live cloud backend.',
    metrics: [],
    stack: ['Expo', 'React Native', 'TypeScript', 'SQLite / Drizzle', 'Supabase', 'Gemini'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'rallo',
    num: '06',
    title: 'Rallo',
    icon: '👋',
    category: 'Social App',
    year: '2026',
    role: 'Solo — iOS / Android',
    problem: '',
    built:
      'A "spontaneous hangout" social app — ping your friend group, see who\'s down, and rally to a hangout without the group-chat back-and-forth. Native mobile app with phone auth, a backend, and App Store submission prep.',
    metrics: [],
    stack: ['React Native', 'Expo', 'Firebase Auth', 'Supabase', 'EAS'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'pokeinvest',
    num: '07',
    title: 'PokeInvest',
    icon: '📊',
    category: 'Web · Fintech',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'A "Bloomberg Terminal for Pokémon cards" — a data-dense dashboard with a custom Pokémon 250 market index, investment metrics (ROI / CAGR / liquidity / grading upside), a portfolio P&L tracker, and an investment screener. (Price history is simulated.)',
    metrics: [],
    stack: ['Next.js 15', 'React 19', 'tRPC', 'Prisma / Neon', 'NextAuth', 'Recharts'],
    links: [{ label: 'Live demo', href: 'https://pokeinvestment.vercel.app' }, { label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'content-creator',
    num: '08',
    title: 'Signal — AI Content Engine',
    icon: '✍️',
    category: 'AI Agents',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'An autonomous multi-brand social content engine: it writes posts, renders carousels/images (Satori + AI), safety-gates each one through a second LLM review, and publishes to Instagram / Threads / X on a schedule — with a dashboard to review, pause, and queue ideas.',
    metrics: [],
    stack: ['Next.js 16', 'Claude (AI SDK)', 'Satori', 'Drizzle / Neon', 'Vercel Cron'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'io-game-lab',
    num: '09',
    title: 'IO Game Lab',
    icon: '🎮',
    category: 'Games',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'A lab of 30 self-contained HTML5 game prototypes plus a pipeline to promote a winner to a real-time authoritative multiplayer server and a native iOS build. Ranges from client-side game dev to WebSocket multiplayer architecture to app packaging and deploy.',
    metrics: [],
    stack: ['HTML5 / Canvas', 'Node.js', 'Colyseus', 'Capacitor / Expo', 'Fly.io'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'job-hunt-tracker',
    num: '10',
    title: 'Job Hunt Tracker',
    icon: '🎯',
    category: 'AI Agents',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'A personal job-search agent that pulls live openings from Greenhouse / Ashby boards, LLM-fit-scores and researches each company, and auto-generates tailored resumes, cover letters, and interview prep — all orchestrated through headless Claude Code. (It built the resume behind this very site.)',
    metrics: [],
    stack: ['Next.js 15', 'TypeScript', 'better-sqlite3', 'Claude Code (headless)'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'packout',
    num: '11',
    title: 'PackOut',
    icon: '📦',
    category: 'Web · Marketplace',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'A two-sided consignment marketplace connecting collectible sellers with vendors — sellers submit and track items ship-to-payout, vendors manage submissions and public profiles. Auth-gated dashboards for both user types with a disciplined, conventions-first architecture.',
    metrics: [],
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind', 'Zod'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'pokescan',
    num: '12',
    title: 'PokeScan',
    icon: '🔍',
    category: 'Tools · OCR',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'A macOS CLI that lets you drag-select a Pokémon card on screen, OCRs the name (Tesseract with multi-pass consensus voting), then queries the eBay Browse API for live median / average / range pricing.',
    metrics: [],
    stack: ['Python', 'Tesseract OCR', 'Pillow', 'eBay Browse API'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
  {
    id: 'trading-systems',
    num: '13',
    title: 'Trading Systems',
    icon: '💹',
    category: 'Trading · Automation',
    year: '2026',
    role: 'Solo',
    problem: '',
    built:
      'A portfolio of automated trading systems across prediction markets, crypto, and equities — all fee-aware, paper-trading by default, with hard risk limits and self-learning "brain" layers. Highlights: a self-learning fee-aware Kalshi BTC auto-trader running 24/7 on Fly.io, and a walk-forward-validated stock-prediction app that honestly reports "no edge."',
    metrics: [],
    stack: ['Python', 'Kalshi / Polymarket', 'FastAPI', 'scikit-learn', 'Fly.io'],
    links: [{ label: 'GitHub', href: GH }],
    shot: '',
    featured: false,
  },
]

export const profile = {
  name: 'Biki Gurung',
  title: 'Site Reliability Engineer',
  location: 'New York, NY',
  email: 'bikigurung8@gmail.com',
  github: 'github.com/bikigrg11',
  linkedin: 'linkedin.com/in/biki-gurung-264a08aa',
  blurb:
    'Kubernetes-focused Site Reliability Engineer with ~3.5 years operating K8s at production scale for live, latency-sensitive traffic. I focus on reliability and observability, cluster lifecycle and platform automation, and measurable cost wins — and I build a lot of things on the side.',
  stats: [
    { n: '~100', label: 'Clusters operated' },
    { n: '35%', label: 'Compute cost cut' },
    { n: '3.5yr', label: 'K8s at scale' },
  ],
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  location?: string
  points: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Site Reliability Engineer — Cloud Compute Team',
    company: 'DraftKings',
    period: 'Nov 2022 – Present',
    location: 'New York, NY',
    points: [
      'Operate ~100 Kubernetes clusters running ~200 services across hybrid AWS + on-prem (vSphere/Nutanix) infrastructure powering live sportsbook traffic — direct ownership of cluster bring-up, upgrades, capacity, reliability, performance, and cost.',
      'Eliminated a recurring outage class caused by AWS bandwidth/PPS limits by authoring custom Kyverno policies that auto-route network-heavy workloads to high-bandwidth nodepools. Drove it end-to-end: detection, mitigation, rollout, postmortem.',
      'Contributed to a Karpenter rollout that cut cluster compute cost ~35%; manage node classes / nodepools and expanded savings with spot instances on lower-environment clusters.',
    ],
  },
  {
    role: 'Senior IT Analyst',
    company: 'Christian Louboutin LLC',
    period: 'Oct 2021 – Aug 2022',
    points: [
      'Managed cloud + endpoint infrastructure (Azure AD, Intune MDM, SCCM) across retail; proactive monitoring and incident analysis for production services.',
    ],
  },
  {
    role: 'IS&T Analyst',
    company: 'LVMH — Fashion Group',
    period: 'Jan 2019 – Nov 2021',
    points: [
      'Owned design, architecture, and deployment of front-office applications across Mac + Windows fleets in retail and corporate.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'RiskVal Financial Solutions',
    period: 'Aug 2018 – Jan 2019',
    points: [
      'Built portfolio management features sourcing data from the Bloomberg Terminal API; designed test harnesses to validate runtime correctness.',
    ],
  },
]

export const education = {
  degree: 'B.S. Computer Science',
  school: 'Stony Brook University',
  year: 'Dec 2018',
}

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Kubernetes / Reliability',
    items: [
      'K8s at scale (100+ clusters)',
      'Karpenter',
      'KEDA',
      'ScaleOps',
      'Kyverno (custom policies)',
      'HPA',
      'Helm',
      'Fleet',
      'Rancher',
      'RKE',
    ],
  },
  {
    group: 'Cloud / Compute',
    items: [
      'AWS (EC2, ELB, Route 53, S3, Local Zones, Lambda)',
      'GCP',
      'On-prem (vSphere, Nutanix)',
    ],
  },
  {
    group: 'IaC / Observability',
    items: [
      'Terraform',
      'Atlantis',
      'Chef',
      'Ansible',
      'Datadog (dashboards + monitors owned)',
      'CloudWatch',
      'Kibana',
      'Bamboo',
      'Artifactory',
      'Jenkins',
      'GitHub Actions',
    ],
  },
  {
    group: 'Build / Product',
    items: ['TypeScript', 'Next.js', 'React Native / Expo', 'FastAPI', 'Supabase', 'Python'],
  },
]
