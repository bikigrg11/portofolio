import { useState, type ReactNode } from 'react'

type ShotFrameProps = {
  src?: string
  alt: string
  label: string
  visual?: ReactNode
}

export function ShotFrame({ src, alt, label, visual }: ShotFrameProps) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  return (
    <div className="overflow-hidden rounded-2xl border border-muted/15 bg-bg2 shadow-[0_40px_90px_rgba(0,0,0,.6)]">
      <div className="flex items-center gap-[7px] border-b border-muted/15 bg-[#0c1424] px-3.5 py-2.5">
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        <span className="ml-3 self-center text-[11px] text-muted">{label}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {visual ? (
          <div className="grid h-full w-full place-items-center bg-[#0a1120]">{visual}</div>
        ) : showPlaceholder ? (
          <div className="relative grid h-full w-full place-items-center">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(120,150,200,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,200,.14) 1px, transparent 1px)',
                backgroundSize: '34px 34px',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 80% at 30% 10%, rgba(34,230,214,.25), transparent 55%), radial-gradient(100% 90% at 90% 100%, rgba(59,130,246,.28), transparent 55%)',
              }}
            />
            <div className="relative px-4 text-center text-[13px] text-muted">
              <div className="mb-2 text-[44px] drop-shadow-[0_4px_20px_rgba(34,230,214,.4)]">
                ⧉
              </div>
              {alt}
              <br />
              <small>(screenshot goes here)</small>
            </div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
