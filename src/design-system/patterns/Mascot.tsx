import { cn } from '@/lib/cn'

interface MascotProps {
  size?: number
  className?: string
}

/**
 * Mascote do STUDY GAME: um cérebro geométrico, com nós de "circuito" em vez
 * de traços cartunescos — jovem e tecnológico, sem parecer infantil.
 * Decorativo por padrão; o texto ao lado carrega a informação.
 */
export function Mascot({ size = 44, className }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 5C15 5 8.5 10.5 8.5 18c-3 2.6-2.2 8.2 1.4 10.2C10.6 35.4 16.6 40 24 40s13.4-4.6 14.1-11.8c3.6-2 4.4-7.6 1.4-10.2C39.5 10.5 33 5 24 5Z"
        fill="var(--accent)"
        fillOpacity="0.14"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 6.5v9"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M13.5 15.5c2.6 0 4 1.3 4 3.2M34.5 15.5c-2.6 0-4 1.3-4 3.2"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <circle cx="18.6" cy="23.5" r="2.1" fill="var(--accent)" />
      <circle cx="29.4" cy="23.5" r="2.1" fill="var(--accent)" />
      <path
        d="M19.5 31c2.6 2 5.4 2 8 0"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface MascotBubbleProps {
  children: React.ReactNode
  className?: string
  size?: number
}

/** Mascote acompanhado de uma fala. Use pontualmente, nunca fixo na tela. */
export function MascotBubble({ children, className, size }: MascotBubbleProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Mascot size={size} />
      <div className="flex-1 rounded-md rounded-tl-none border border-accent/25 bg-accent/8 px-4 py-3 text-sm leading-relaxed text-text-muted">
        {children}
      </div>
    </div>
  )
}
