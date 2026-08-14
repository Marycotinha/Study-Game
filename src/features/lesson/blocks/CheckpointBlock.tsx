import { useState } from 'react'
import { MascotBubble, RichText } from '@/design-system/patterns'
import type { LessonBlock } from '@/content/schema/topic'
import { BlockShell } from './BlockShell'
import { cn } from '@/lib/cn'

type CheckpointBlockData = Extract<LessonBlock, { type: 'checkpoint' }>

interface CheckpointBlockProps {
  block: CheckpointBlockData
  onSolved?: () => void
}

/**
 * Verificação rápida de entendimento — não é prova: sem vidas, sem tempo e
 * com tentativas ilimitadas. Errar mostra o raciocínio e devolve a vez ao
 * aluno (docs/ARCHITECTURE.md — princípios 5 e 6).
 */
export function CheckpointBlock({ block, onSolved }: CheckpointBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)

  const selected = block.options.find((o) => o.id === selectedId) ?? null

  function handleSelect(optionId: string) {
    const option = block.options.find((o) => o.id === optionId)
    if (!option) return
    setSelectedId(optionId)
    if (option.correct && !solved) {
      setSolved(true)
      onSolved?.()
    }
  }

  return (
    <BlockShell type="checkpoint">
      <RichText text={block.question} className="text-text-primary" />

      <ul className="flex flex-col gap-2">
        {block.options.map((option) => {
          const isSelected = selectedId === option.id
          const showAsCorrect = solved && option.correct
          const showAsTried = isSelected && !option.correct

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={solved && !option.correct}
                aria-pressed={isSelected}
                className={cn(
                  'flex min-h-11 w-full items-center gap-2.5 rounded-md border px-4 py-3 text-left text-sm transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  showAsCorrect
                    ? 'border-success-500/50 bg-success-500/10 text-text-primary'
                    : showAsTried
                      ? 'border-attention-500/50 bg-attention-500/10 text-text-primary'
                      : 'border-border-strong text-text-muted enabled:hover:border-accent/60 enabled:hover:text-text-primary',
                  solved && !option.correct && 'opacity-50',
                )}
              >
                <span aria-hidden="true" className="w-4 shrink-0 text-center font-semibold">
                  {showAsCorrect ? '✓' : showAsTried ? '↻' : ''}
                </span>
                <span className="flex-1">{option.text}</span>
                {showAsCorrect && <span className="sr-only">(resposta correta)</span>}
                {showAsTried && <span className="sr-only">(vamos tentar de novo)</span>}
              </button>
            </li>
          )
        })}
      </ul>

      <div aria-live="polite">
        {selected && (
          <MascotBubble size={36}>
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  'text-xs font-semibold tracking-wide uppercase',
                  selected.correct ? 'text-success-500' : 'text-attention-500',
                )}
              >
                {selected.correct ? 'Boa!' : 'Vamos pensar juntos'}
              </span>
              <RichText text={selected.feedback} className="text-sm" />
              {selected.correct && <RichText text={block.successFeedback} className="text-sm" />}
            </div>
          </MascotBubble>
        )}
      </div>
    </BlockShell>
  )
}
