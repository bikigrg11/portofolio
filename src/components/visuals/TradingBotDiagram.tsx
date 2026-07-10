const CYAN = '#22e6d6'
const BLUE = '#3b82f6'
const BG = '#0a1120'
const STROKE = 'rgba(120,150,200,.3)'

export function TradingBotDiagram() {
  return (
    <svg
      viewBox="0 0 400 250"
      width="100%"
      role="img"
      aria-label="Illustrative dashboard mockup of an event-driven IBKR trading bot showing a demo equity curve and placeholder stats, no real account data"
    >
      <rect x="0" y="0" width="400" height="250" fill={BG} />
      <rect x="0.5" y="0.5" width="399" height="249" fill="none" stroke={STROKE} />

      {/* header */}
      <text x="18" y="30" fill="#e8eefc" fontSize="13" fontWeight="700">
        IBKR Trading Bot
      </text>
      <g transform="translate(300, 16)">
        <rect x="0" y="0" width="82" height="20" rx="10" fill="rgba(59,130,246,.12)" stroke={BLUE} strokeWidth="1" />
        <circle cx="14" cy="10" r="3" fill={BLUE} />
        <text x="24" y="14" fill={BLUE} fontSize="9" fontWeight="700">
          DEMO · OFFLINE
        </text>
      </g>
      <line x1="0" y1="42" x2="400" y2="42" stroke={STROKE} strokeWidth="1" />

      {/* stat tiles */}
      {[
        { label: 'P&L ▲', value: '•••' },
        { label: 'TRADES', value: '—' },
        { label: 'STRATEGIES', value: '•••' },
      ].map((stat, i) => (
        <g key={stat.label} transform={`translate(${18 + i * 128}, 54)`}>
          <rect x="0" y="0" width="112" height="52" rx="8" fill="rgba(34,230,214,.06)" stroke={STROKE} strokeWidth="1" />
          <text x="12" y="20" fill="rgba(200,215,235,.7)" fontSize="8" fontWeight="600" letterSpacing="0.5">
            {stat.label}
          </text>
          <text x="12" y="40" fill={CYAN} fontSize="16" fontWeight="700">
            {stat.value}
          </text>
        </g>
      ))}

      {/* equity curve panel */}
      <g transform="translate(18, 118)">
        <rect x="0" y="0" width="364" height="80" rx="8" fill="none" stroke={STROKE} strokeWidth="1" />
        <text x="12" y="16" fill="rgba(200,215,235,.7)" fontSize="8" fontWeight="600" letterSpacing="0.5">
          EQUITY CURVE
        </text>
        <path
          d="M12 60 L48 52 L84 58 L120 40 L156 46 L192 30 L228 36 L264 22 L300 28 L340 14"
          fill="none"
          stroke={CYAN}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 60 L48 52 L84 58 L120 40 L156 46 L192 30 L228 36 L264 22 L300 28 L340 14 L340 74 L12 74 Z"
          fill="rgba(34,230,214,.08)"
          stroke="none"
        />
      </g>

      {/* caption */}
      <text x="200" y="222" textAnchor="middle" fill="rgba(200,215,235,.6)" fontSize="9">
        event-driven · FastAPI · WebSocket
      </text>
    </svg>
  )
}
