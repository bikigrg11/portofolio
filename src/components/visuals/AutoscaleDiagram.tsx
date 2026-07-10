const CYAN = '#22e6d6'
const BLUE = '#3b82f6'
const BG = '#0a1120'
const STROKE = 'rgba(120,150,200,.3)'

export function AutoscaleDiagram() {
  return (
    <svg
      viewBox="0 0 400 250"
      width="100%"
      role="img"
      aria-label="Game schedule triggers pre-warm via Karpenter, KEDA and ScaleOps so nodes are ready before the traffic spike, cutting cost 35%"
    >
      <defs>
        <marker id="auto-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={CYAN} />
        </marker>
      </defs>

      <rect x="0" y="0" width="400" height="250" fill={BG} />
      <rect x="0.5" y="0.5" width="399" height="249" fill="none" stroke={STROKE} />

      {/* Game schedule box */}
      <rect x="18" y="95" width="88" height="60" rx="8" fill="none" stroke={CYAN} strokeWidth="1.5" />
      <text x="62" y="120" textAnchor="middle" fill="#e8eefc" fontSize="11" fontWeight="600">
        Game
      </text>
      <text x="62" y="134" textAnchor="middle" fill="#e8eefc" fontSize="11" fontWeight="600">
        Schedule
      </text>
      <text x="62" y="148" textAnchor="middle" fill="rgba(200,215,235,.65)" fontSize="8">
        predictable spike
      </text>

      <line x1="108" y1="125" x2="146" y2="125" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#auto-arrow)" />

      {/* Pre-warm box with three autoscalers */}
      <rect x="148" y="70" width="120" height="110" rx="8" fill="rgba(34,230,214,.08)" stroke={CYAN} strokeWidth="1.5" />
      <text x="208" y="88" textAnchor="middle" fill="#e8eefc" fontSize="11" fontWeight="700">
        Pre-warm
      </text>
      {['Karpenter', 'KEDA', 'ScaleOps'].map((name, i) => (
        <g key={name}>
          <rect x="160" y={98 + i * 25} width="96" height="18" rx="4" fill="none" stroke={BLUE} strokeWidth="1" />
          <text x="208" y={98 + i * 25 + 13} textAnchor="middle" fill="#c3ccdb" fontSize="9">
            {name}
          </text>
        </g>
      ))}

      <line x1="270" y1="125" x2="308" y2="125" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#auto-arrow)" />

      {/* Nodes ready box */}
      <rect x="310" y="90" width="76" height="70" rx="8" fill="none" stroke={BLUE} strokeWidth="1.5" />
      <text x="348" y="112" textAnchor="middle" fill="#e8eefc" fontSize="10" fontWeight="600">
        Nodes
      </text>
      <text x="348" y="125" textAnchor="middle" fill="#e8eefc" fontSize="10" fontWeight="600">
        Ready
      </text>
      <text x="348" y="140" textAnchor="middle" fill={CYAN} fontSize="8">
        before spike
      </text>
      <circle cx="330" cy="150" r="3" fill={CYAN} />
      <circle cx="348" cy="150" r="3" fill={CYAN} />
      <circle cx="366" cy="150" r="3" fill={CYAN} />

      {/* cost chip */}
      <g transform="translate(160, 205)">
        <rect x="0" y="0" width="96" height="28" rx="14" fill="rgba(34,230,214,.12)" stroke={CYAN} strokeWidth="1.2" />
        <text x="48" y="19" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="700">
          -35% cost
        </text>
      </g>
    </svg>
  )
}
