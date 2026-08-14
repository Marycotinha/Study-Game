import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

type ChipTone = 'accent' | 'gold' | 'success' | 'neutral'

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone
}

const toneClasses: Record<ChipTone, string> = {
  accent: 'bg-accent/15 text-accent border-accent/30',
  gold: 'bg-gold-500/15 text-gold-500 border-gold-500/30',
  success: 'bg-success-500/15 text-success-500 border-success-500/30',
  neutral: 'bg-bg-elevated text-text-muted border-border-subtle',
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, tone = 'neutral', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-sm font-medium',
          toneClasses[tone],
          className,
        )}
        {...props}
      />
    )
  },
)
Chip.displayName = 'Chip'
