import { RichText } from '@/design-system/patterns'
import type { LessonBlock } from '@/content/schema/topic'
import { BlockShell } from './BlockShell'
import { NotUnderstoodPanel } from '../NotUnderstoodPanel'

type ConceptBlockData = Extract<LessonBlock, { type: 'concept' }>

export function ConceptBlock({ block }: { block: ConceptBlockData }) {
  return (
    <BlockShell type="concept" title={block.title}>
      <RichText text={block.body} />

      {block.keyPoints && (
        <ul className="flex flex-col gap-2">
          {block.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-text-muted">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-pill bg-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <NotUnderstoodPanel alternatives={block.alternatives} blockId={block.id} />
    </BlockShell>
  )
}
