import { useState } from 'react'
import { Button } from '@/design-system/primitives'
import { Formula, RichText } from '@/design-system/patterns'
import type { LessonBlock } from '@/content/schema/topic'
import { BlockShell } from './BlockShell'
import { NotUnderstoodPanel } from '../NotUnderstoodPanel'

type ExampleBlockData = Extract<LessonBlock, { type: 'example' }>

export function ExampleBlock({ block }: { block: ExampleBlockData }) {
  // Revela um passo por vez: o aluno acompanha o raciocínio em vez de
  // encarar a solução inteira de uma só vez.
  const [revealed, setRevealed] = useState(1)
  const total = block.steps.length
  const allRevealed = revealed >= total
  const visibleSteps = block.steps.slice(0, revealed)

  return (
    <BlockShell type="example" title={block.title}>
      <RichText text={block.statement} />

      {block.given && (
        <ul className="flex flex-wrap gap-2">
          {block.given.map((item, i) => (
            <li
              key={i}
              className="rounded-pill border border-border-subtle px-3 py-1 font-mono text-xs text-text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <ol className="flex flex-col gap-4">
        {visibleSteps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-pill bg-accent/15 text-sm font-semibold text-accent"
            >
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span className="font-medium text-text-primary">
                <span className="sr-only">Passo {i + 1}: </span>
                {step.title}
              </span>
              <p className="text-sm leading-relaxed text-text-muted">{step.body}</p>
              {step.latex && (
                <div className="rounded-sm border border-border-subtle px-3 py-2">
                  <Formula latex={step.latex} display />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p aria-live="polite" className="sr-only">
        Passo {Math.min(revealed, total)} de {total}
      </p>

      {!allRevealed ? (
        <div className="flex flex-col gap-2">
          <Button variant="secondary" onClick={() => setRevealed((r) => r + 1)}>
            Próximo passo
          </Button>
          <span className="text-center text-xs text-text-faint">
            Passo {revealed} de {total}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 rounded-md border border-success-500/30 bg-success-500/8 px-4 py-3">
          <span className="text-xs font-semibold tracking-wide text-success-500 uppercase">
            Resposta
          </span>
          {block.answerLatex && <Formula latex={block.answerLatex} display />}
          <RichText text={block.answer} className="text-sm" />
        </div>
      )}

      <NotUnderstoodPanel alternatives={block.alternatives} blockId={block.id} />
    </BlockShell>
  )
}
