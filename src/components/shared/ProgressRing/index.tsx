interface ProgressRingProps {
  value: number
  size?: number
  color?: string
  label?: string
}

export function ProgressRing({
  value,
  size = 48,
  color = '#10B981',
  label,
}: ProgressRingProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const strokeWidth = size * 0.1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clampedValue / 100) * circumference
  const center = size / 2
  const fontSize = size * 0.22

  return (
    <div
      className="inline-flex flex-col items-center gap-1"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${clampedValue}%`}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
        {/* Percentage label rendered in the center, counter-rotated */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-text-primary)"
          fontSize={fontSize}
          fontWeight="600"
          style={{ transform: `rotate(90deg)`, transformOrigin: `${center}px ${center}px` }}
        >
          {clampedValue}%
        </text>
      </svg>
      {label && (
        <span
          className="text-center leading-tight"
          style={{
            fontSize: size * 0.2,
            color: 'var(--color-secondary)',
            maxWidth: size * 2,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
