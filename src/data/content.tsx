// Content data module — facts are sourced from job-hunt-tracker/data/profile.md
// (master profile) and the approved design spec (non-featured project names).
// Never invent facts here; edit profile.md or the design spec first, then this file.
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
  year: string
  role: string
  problem: string
  built: string
  metrics: { n: string; label: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  shot: string
  visual?: ReactNode
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'kubernetes-mcp-server',
    num: '01',
    title: 'Kubernetes MCP Server',
    year: '2026',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      'AI agents and on-call engineers had no safe, scoped way to query or act on Rancher-managed Kubernetes clusters — every incident workflow required a human at a kubectl prompt.',
    built:
      'Built an MCP (Model Context Protocol) server using FastMCP that exposes Kubernetes operations on Rancher-managed clusters as tools for AI agents. Implemented multi-layer authentication (Rancher bearer tokens) to scope agent access per cluster / namespace, and integrated it with Claude Code, n8n, and Slack-based alerting to drive automated incident workflows.',
    metrics: [
      { n: 'per-ns', label: 'Scoped agent auth' },
      { n: '3', label: 'integration surfaces: Claude Code, n8n, Slack' },
    ],
    stack: ['Python', 'FastMCP', 'Kubernetes', 'Rancher', 'Claude Code', 'n8n', 'Slack API'],
    links: [],
    shot: '/shots/kubernetes-mcp-server.png',
    visual: <McpDiagram />,
    featured: true,
  },
  {
    id: 'trading-bot',
    num: '02',
    title: 'Autonomous Trading Bot',
    year: '2026',
    role: 'Personal',
    problem:
      'Manual day-trading execution is error-prone and can\'t reliably survive disconnects, partial fills, or stop-loss failures without putting capital at risk.',
    built:
      'A production-hardened, event-driven day-trading agent on Interactive Brokers (IBKR): reconnection with exponential backoff, position reconciliation on startup, stop-loss failure handling, fill validation, and market-calendar awareness. FastAPI + WebSocket dashboard for live monitoring.',
    metrics: [
      { n: '5', label: 'failure modes hardened: reconnect, reconciliation, stop-loss, fills, calendar' },
    ],
    stack: ['Python', 'FastAPI', 'WebSocket', 'Interactive Brokers API'],
    links: [],
    shot: '',
    visual: <TradingBotDiagram />,
    featured: true,
  },
  {
    id: 'game-aware-autoscaling',
    num: '03',
    title: 'Game-Aware Autoscaling',
    year: '2022–Present',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      'Reactive autoscaling (standard HPA / cluster-autoscaler) can\'t provision capacity fast enough for predictable live-betting traffic spikes, risking latency and outages during peak sportsbook events.',
    built:
      'Operate and extend a game-aware autoscaling layer combining Karpenter, KEDA, and ScaleOps with custom logic to pre-warm capacity ahead of predictable live-betting spikes that reactive autoscaling can\'t handle in time. Backed by Datadog dashboards, including a Super Bowl NOC-level command-center view used during peak events.',
    metrics: [
      { n: '3', label: 'autoscalers orchestrated: Karpenter, KEDA, ScaleOps' },
    ],
    stack: ['Kubernetes', 'Karpenter', 'KEDA', 'ScaleOps', 'Datadog'],
    links: [],
    shot: '/shots/game-aware-autoscaling.png',
    visual: <AutoscaleDiagram />,
    featured: true,
  },
  {
    id: 'kyverno-outage-killer',
    num: '04',
    title: 'Kyverno Outage Killer',
    year: '2022–Present',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      'AWS exposes no native per-instance PPS (packets-per-second) visibility, causing a recurring outage class whenever network-heavy workloads landed on nodes that hit bandwidth/PPS limits.',
    built:
      'Authored custom Kyverno policies that auto-route network-heavy workloads to high-bandwidth nodepools, eliminating the outage class. Drove it end-to-end — detection, mitigation, rollout, postmortem — and built the Datadog dashboards used to monitor Kyverno policy behavior in production.',
    metrics: [
      { n: '0', label: 'PPS-limit outages after rollout' },
    ],
    stack: ['Kubernetes', 'Kyverno', 'AWS', 'Datadog'],
    links: [],
    shot: '/shots/kyverno-outage-killer.png',
    visual: <KyvernoDiagram />,
    featured: true,
  },
  {
    id: 'karpenter-cost-cut',
    num: '05',
    title: '35% Compute Cost Cut',
    year: '2022–Present',
    role: 'DraftKings — Cloud Compute Team',
    problem:
      'Static node provisioning left compute over-allocated across the fleet, driving unnecessary cloud spend.',
    built:
      'Contributed to a Karpenter rollout that cut cluster compute cost ~35%; manage node classes and nodepools, and expanded savings further with spot instances on lower-environment clusters.',
    metrics: [{ n: '35%', label: 'compute cost cut' }],
    stack: ['Kubernetes', 'Karpenter', 'AWS', 'Spot Instances'],
    links: [],
    shot: '/shots/karpenter-cost-cut.png',
    featured: false,
  },
  {
    id: 'side-quests',
    num: '06',
    title: 'Side Quests',
    year: '2026',
    role: 'Personal',
    problem:
      'Wanted a place to ship smaller experiments — job tooling, scanners, and game labs — outside of day-job infra work.',
    built:
      'A grab-bag of personal projects: job-hunt-tracker (this content pipeline), kept-web, pokeinvest (Next.js), and io-game-lab (HTML game experiments).',
    metrics: [{ n: '4', label: 'side projects shipped' }],
    stack: ['TypeScript', 'Next.js', 'Python', 'HTML/Canvas'],
    links: [],
    shot: '/shots/side-quests.png',
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
    'Kubernetes-focused Site Reliability Engineer with ~3.5 years operating K8s at production scale for live, latency-sensitive traffic. I focus on reliability and observability, cluster lifecycle and platform automation, and measurable cost wins.',
  stats: [
    { n: '~100', label: 'Clusters operated' },
    { n: '35%', label: 'Compute cost cut' },
    { n: '3.5yr', label: 'K8s at scale' },
  ],
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
    group: 'Languages',
    items: ['Python', 'Bash', 'TypeScript', 'Java'],
  },
]
