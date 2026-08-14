import type { LessonBlockType } from '@/content/schema/topic'

interface BlockIconProps {
  type: LessonBlockType
  className?: string
}

/**
 * Ícones geométricos (estilo Lucide) por tipo de bloco. Sempre acompanhados
 * de rótulo em texto — o ícone reforça, nunca é a única informação.
 */
export function BlockIcon({ type, className }: BlockIconProps) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
    focusable: 'false' as const,
  }

  switch (type) {
    case 'concept':
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
        </svg>
      )
    case 'howItWorks':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        </svg>
      )
    case 'formula':
      return (
        <svg {...common}>
          <path d="M4 20V6a2 2 0 0 1 2-2h1M4 12h5" />
          <path d="M13 9l7 7M20 9l-7 7" />
        </svg>
      )
    case 'example':
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h10M4 18h7" />
          <path d="m16 16 2 2 4-4" />
        </svg>
      )
    case 'commonMistake':
      return (
        <svg {...common}>
          <path d="M12 3 2 20h20L12 3Z" />
          <path d="M12 9v5M12 17h.01" />
        </svg>
      )
    case 'checkpoint':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      )
    case 'visualization':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 15 3.5-4 3 2.5L21 7" />
        </svg>
      )
  }
}
