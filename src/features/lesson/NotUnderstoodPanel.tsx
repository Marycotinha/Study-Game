import { useState } from 'react'
import { Button } from '@/design-system/primitives'
import { MascotBubble, RichText } from '@/design-system/patterns'
import type { AlternativeExplanation, AlternativeKind } from '@/content/schema/topic'

const kindLabels: Record<AlternativeKind, string> = {
  simpler: 'Mais simples',
  analogy: 'Com uma analogia',
  practical: 'Exemplo prático',
  stepByStep: 'Passo a passo',
  visual: 'Visualmente',
}

const kindOrder: AlternativeKind[] = ['simpler', 'analogy', 'practical', 'stepByStep', 'visual']

interface NotUnderstoodPanelProps {
  alternatives?: Partial<Record<AlternativeKind, AlternativeExplanation>>
  blockId: string
}

/**
 * Painel "Não entendi" (docs/ARCHITECTURE.md seção 7). Mostra apenas as
 * variações realmente autoradas para o bloco e resolve tudo em linha — o
 * aluno nunca sai da aula. A geração por IA fica para uma fase futura.
 */
export function NotUnderstoodPanel({ alternatives, blockId }: NotUnderstoodPanelProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<AlternativeKind | null>(null)

  const availableKinds = kindOrder.filter((k) => alternatives?.[k])
  if (availableKinds.length === 0) return null

  const panelId = `not-understood-${blockId}`
  const current = selected ? alternatives?.[selected] : null

  return (
    <div className="mt-4 border-t border-border-subtle pt-3">
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="px-0 hover:bg-transparent"
      >
        {open ? 'Fechar explicações' : 'Não entendi'}
      </Button>

      {open && (
        <div id={panelId} className="mt-3 flex flex-col gap-3">
          <p className="text-sm text-text-muted">Sem problema. Como prefere ver isso?</p>

          <div className="flex flex-wrap gap-2">
            {availableKinds.map((kind) => {
              const isSelected = selected === kind
              return (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(isSelected ? null : kind)}
                  className={
                    isSelected
                      ? 'min-h-11 rounded-pill border border-accent bg-accent/15 px-4 text-sm font-medium text-accent'
                      : 'min-h-11 rounded-pill border border-border-strong px-4 text-sm font-medium text-text-muted transition-colors hover:border-accent/60 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                  }
                >
                  {kindLabels[kind]}
                </button>
              )
            })}
          </div>

          {current && (
            <MascotBubble size={36}>
              <div className="flex flex-col gap-3">
                <RichText text={current.body} className="text-sm" />

                {current.steps && (
                  <ol className="flex flex-col gap-2">
                    {current.steps.map((step, i) => (
                      <li key={i} className="flex gap-2.5 text-sm">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-accent/20 text-[0.7rem] font-semibold text-accent"
                        >
                          {i + 1}
                        </span>
                        <span className="text-text-muted">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {current.diagram && (
                  <pre className="overflow-x-auto rounded-sm bg-bg-base/60 p-3 font-mono text-xs leading-relaxed text-text-muted">
                    {current.diagram}
                  </pre>
                )}
              </div>
            </MascotBubble>
          )}
        </div>
      )}
    </div>
  )
}
