import { RichText } from '@/design-system/patterns'
import type { LessonBlock } from '@/content/schema/topic'
import { BlockShell } from './BlockShell'
import { NotUnderstoodPanel } from '../NotUnderstoodPanel'

type HowItWorksBlockData = Extract<LessonBlock, { type: 'howItWorks' }>

export function HowItWorksBlock({ block }: { block: HowItWorksBlockData }) {
  return (
    <BlockShell type="howItWorks" title={block.title}>
      <RichText text={block.body} />

      {block.steps && (
        <ol className="flex flex-col gap-3">
          {block.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-pill border border-accent/40 text-sm font-semibold text-accent"
              >
                {i + 1}
              </span>
              <span className="pt-0.5 text-text-muted">{step}</span>
            </li>
          ))}
        </ol>
      )}

      <NotUnderstoodPanel alternatives={block.alternatives} blockId={block.id} />
    </BlockShell>
  )
}
