const CYAN = '#22e6d6'
const BLUE = '#3b82f6'
const BG = '#0a1120'
const STROKE = 'rgba(120,150,200,.3)'

export function McpDiagram() {
  return (
    <svg
      viewBox="0 0 400 250"
      width="100%"
      role="img"
      aria-label="AI agent connects through MCP server to Rancher-managed Kubernetes clusters with per-namespace scoped auth"
    >
      <defs>
        <marker id="mcp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={CYAN} />
        </marker>
      </defs>

      <rect x="0" y="0" width="400" height="250" fill={BG} />
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="249"
        fill="none"
        stroke={STROKE}
      />

      {/* AI agent box */}
      <rect x="20" y="95" width="90" height="60" rx="8" fill="none" stroke={CYAN} strokeWidth="1.5" />
      <text x="65" y="122" textAnchor="middle" fill="#e8eefc" fontSize="12" fontWeight="600">
        AI Agent
      </text>
      <text x="65" y="138" textAnchor="middle" fill="rgba(200,215,235,.7)" fontSize="9">
        Claude Code / n8n
      </text>

      {/* arrow 1 */}
      <line x1="112" y1="125" x2="153" y2="125" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#mcp-arrow)" />

      {/* MCP server box */}
      <rect x="155" y="90" width="100" height="70" rx="8" fill="rgba(34,230,214,.08)" stroke={CYAN} strokeWidth="1.5" />
      <text x="205" y="118" textAnchor="middle" fill="#e8eefc" fontSize="12" fontWeight="700">
        MCP Server
      </text>
      <text x="205" y="133" textAnchor="middle" fill="rgba(200,215,235,.7)" fontSize="9">
        FastMCP
      </text>
      <text x="205" y="146" textAnchor="middle" fill={CYAN} fontSize="8" fontWeight="600">
        Rancher bearer auth
      </text>

      {/* arrow 2 */}
      <line x1="257" y1="125" x2="296" y2="125" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#mcp-arrow)" />

      {/* scoped auth label */}
      <text x="277" y="112" textAnchor="middle" fill={BLUE} fontSize="8" fontWeight="600">
        per-namespace
      </text>
      <text x="277" y="122" textAnchor="middle" fill={BLUE} fontSize="8" fontWeight="600">
        scoped auth
      </text>

      {/* cluster nodes */}
      {[0, 1, 2].map((i) => {
        const y = 55 + i * 55
        return (
          <g key={i}>
            <rect x="298" y={y} width="80" height="40" rx="6" fill="none" stroke={BLUE} strokeWidth="1.3" />
            <circle cx="312" cy={y + 20} r="4" fill={BLUE} />
            <text x="322" y={y + 24} fill="#e8eefc" fontSize="10">
              Cluster {i + 1}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
