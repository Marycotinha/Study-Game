import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-bg-surface border border-border-subtle p-6',
          'shadow-[var(--shadow-soft)]',
          glow && 'shadow-[0_0_32px_-4px_var(--accent)]',
          className,
        )}
        {...props}
      />
    )
  },
)
Card.displayName = 'Card'
