import { cn } from '@/lib/cn'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  label?: string
}

export function ProgressBar({ value, max = 100, className, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      className={cn('h-2.5 w-full overflow-hidden rounded-pill bg-bg-elevated', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div
        className="h-full rounded-pill bg-accent transition-[width] duration-(--dur-slow) ease-(--ease-out)"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
