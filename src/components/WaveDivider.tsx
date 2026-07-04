interface WaveDividerProps {
  from: string
  to: string
  flip?: boolean
  height?: number
}

export default function WaveDivider({ from, to, flip = false, height = 64 }: WaveDividerProps) {
  return (
    <div style={{ background: from, display: 'block', lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="wave-divider"
        style={{
          display: 'block',
          width: '100%',
          '--wd-h': `${height}px`,
          transform: flip ? 'scaleX(-1)' : undefined,
        } as React.CSSProperties}
        aria-hidden="true"
      >
        <path
          d="M0,32 C180,70 360,10 540,40 C720,70 900,15 1080,42 C1260,68 1350,28 1440,36 L1440,80 L0,80 Z"
          fill={to}
        />
      </svg>
    </div>
  )
}
