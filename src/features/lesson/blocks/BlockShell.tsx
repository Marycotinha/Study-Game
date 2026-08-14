import type { ReactNode } from 'react'
import { Card } from '@/design-system/primitives'
import { BlockIcon } from '@/design-system/patterns'
import type { LessonBlockType } from '@/content/schema/topic'
import { cn } from '@/lib/cn'

const typeLabels: Record<LessonBlockType, string> = {
  concept: 'Conceito',
  howItWorks: 'Como funciona',
  formula: 'Fórmula',
  example: 'Exemplo',
  commonMistake: 'Erro comum',
  checkpoint: 'Checkpoint',
  visualization: 'Visualização',
}

interface BlockShellProps {
  type: LessonBlockType
  title?: string
  children: ReactNode
  /** Realce lateral — usado no erro comum, para diferenciar sem depender só de cor. */
  tone?: 'default' | 'attention'
}

/**
 * Moldura comum de todo bloco da aula: cada bloco é uma etapa visível da
 * experiência, com rótulo e ícone próprios — não um parágrafo solto.
 */
export function BlockShell({ type, title, children, tone = 'default' }: BlockShellProps) {
  return (
    <Card
      className={cn(
        'flex flex-col gap-4',
        tone === 'attention' && 'border-l-2 border-l-attention-500',
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex size-7 items-center justify-center rounded-pill',
            tone === 'attention'
              ? 'bg-attention-500/15 text-attention-500'
              : 'bg-accent/15 text-accent',
          )}
        >
          <BlockIcon type={type} />
        </span>
        <span
          className={cn(
            'text-xs font-semibold tracking-wide uppercase',
            tone === 'attention' ? 'text-attention-500' : 'text-accent',
          )}
        >
          {typeLabels[type]}
        </span>
      </div>

      {title && (
        <h2 className="font-display text-xl font-semibold text-text-primary">{title}</h2>
      )}

      {children}
    </Card>
  )
}
