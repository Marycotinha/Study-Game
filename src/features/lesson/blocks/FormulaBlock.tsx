import { Formula, RichText } from '@/design-system/patterns'
import type { LessonBlock } from '@/content/schema/topic'
import { BlockShell } from './BlockShell'
import { NotUnderstoodPanel } from '../NotUnderstoodPanel'

type FormulaBlockData = Extract<LessonBlock, { type: 'formula' }>

export function FormulaBlock({ block }: { block: FormulaBlockData }) {
  return (
    <BlockShell type="formula" title={block.title}>
      <div className="rounded-md border border-accent/25 bg-accent/8 px-4 py-5">
        <Formula latex={block.latex} display />
      </div>

      <dl className="flex flex-col gap-2">
        {block.terms.map((term) => (
          <div key={term.symbol} className="flex items-baseline gap-3">
            <dt className="flex min-w-8 justify-center">
              <Formula latex={term.symbol} className="font-medium" />
            </dt>
            <dd className="text-sm text-text-muted">
              {term.name}
              {term.unit && <span className="text-text-faint"> — {term.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-text-faint uppercase">
          Quando usar
        </span>
        <RichText text={block.whenToUse} className="text-sm" />
      </div>

      {block.quickExample && (
        <div className="flex flex-col gap-2 rounded-md border border-border-subtle px-4 py-3">
          <Formula latex={block.quickExample.latex} display />
          <p className="text-center text-sm text-text-muted">{block.quickExample.caption}</p>
        </div>
      )}

      <NotUnderstoodPanel alternatives={block.alternatives} blockId={block.id} />
    </BlockShell>
  )
}
