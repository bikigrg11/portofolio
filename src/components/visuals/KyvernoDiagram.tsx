const CYAN = '#22e6d6'
const BLUE = '#3b82f6'
const BG = '#0a1120'
const STROKE = 'rgba(120,150,200,.3)'
const RED = '#f87171'

export function KyvernoDiagram() {
  return (
    <svg
      viewBox="0 0 400 250"
      width="100%"
      role="img"
      aria-label="Before Kyverno policy, network-heavy workloads land on random nodes and cause PPS-limit outages. After, a Kyverno policy routes them to a high-bandwidth nodepool with zero outages"
    >
      <defs>
        <marker id="kyv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={CYAN} />
        </marker>
        <marker id="kyv-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={RED} />
        </marker>
      </defs>

      <rect x="0" y="0" width="400" height="250" fill={BG} />
      <rect x="0.5" y="0.5" width="399" height="249" fill="none" stroke={STROKE} />

      {/* BEFORE row */}
      <text x="16" y="24" fill="rgba(200,215,235,.6)" fontSize="10" fontWeight="700" letterSpacing="1">
        BEFORE
      </text>
      <rect x="16" y="34" width="80" height="36" rx="6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text x="56" y="56" textAnchor="middle" fill="#e8eefc" fontSize="9">
        Network-heavy
      </text>
      <line x1="98" y1="52" x2="140" y2="52" stroke={RED} strokeWidth="1.3" markerEnd="url(#kyv-arrow-red)" />
      <rect x="142" y="34" width="90" height="36" rx="6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text x="187" y="50" textAnchor="middle" fill="#e8eefc" fontSize="9">
        Random node
      </text>
      <text x="187" y="62" textAnchor="middle" fill="rgba(200,215,235,.55)" fontSize="7">
        (PPS limit)
      </text>
      <line x1="234" y1="52" x2="272" y2="52" stroke={RED} strokeWidth="1.3" markerEnd="url(#kyv-arrow-red)" />
      <rect x="274" y="34" width="108" height="36" rx="6" fill="rgba(248,113,113,.1)" stroke={RED} strokeWidth="1.3" />
      <text x="328" y="50" textAnchor="middle" fill={RED} fontSize="10" fontWeight="700">
        Outage
      </text>
      <text x="328" y="62" textAnchor="middle" fill={RED} fontSize="7">
        PPS exceeded
      </text>

      {/* divider */}
      <line x1="16" y1="92" x2="384" y2="92" stroke={STROKE} strokeWidth="1" strokeDasharray="3 4" />

      {/* AFTER row */}
      <text x="16" y="114" fill={CYAN} fontSize="10" fontWeight="700" letterSpacing="1">
        AFTER
      </text>
      <rect x="16" y="124" width="80" height="36" rx="6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text x="56" y="146" textAnchor="middle" fill="#e8eefc" fontSize="9">
        Network-heavy
      </text>
      <line x1="98" y1="142" x2="140" y2="142" stroke={CYAN} strokeWidth="1.3" markerEnd="url(#kyv-arrow)" />

      {/* Kyverno policy box */}
      <rect x="142" y="118" width="96" height="48" rx="6" fill="rgba(34,230,214,.1)" stroke={CYAN} strokeWidth="1.4" />
      <text x="190" y="138" textAnchor="middle" fill="#e8eefc" fontSize="9" fontWeight="700">
        Kyverno
      </text>
      <text x="190" y="150" textAnchor="middle" fill="rgba(200,215,235,.75)" fontSize="7.5">
        policy: auto-route
      </text>
      <text x="190" y="160" textAnchor="middle" fill="rgba(200,215,235,.75)" fontSize="7.5">
        by workload type
      </text>

      <line x1="240" y1="142" x2="272" y2="142" stroke={CYAN} strokeWidth="1.3" markerEnd="url(#kyv-arrow)" />
      <rect x="274" y="118" width="108" height="48" rx="6" fill="none" stroke={BLUE} strokeWidth="1.4" />
      <text x="328" y="138" textAnchor="middle" fill="#e8eefc" fontSize="9" fontWeight="600">
        High-bandwidth
      </text>
      <text x="328" y="150" textAnchor="middle" fill="#e8eefc" fontSize="9" fontWeight="600">
        nodepool
      </text>

      {/* result chip */}
      <g transform="translate(115, 195)">
        <rect x="0" y="0" width="170" height="34" rx="17" fill="rgba(34,230,214,.12)" stroke={CYAN} strokeWidth="1.2" />
        <text x="85" y="22" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="700">
          0 PPS-limit outages
        </text>
      </g>
    </svg>
  )
}
