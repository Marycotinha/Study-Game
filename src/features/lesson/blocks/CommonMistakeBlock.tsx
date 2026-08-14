import { RichText } from '@/design-system/patterns'
import type { LessonBlock } from '@/content/schema/topic'
import { BlockShell } from './BlockShell'
import { NotUnderstoodPanel } from '../NotUnderstoodPanel'

type CommonMistakeBlockData = Extract<LessonBlock, { type: 'commonMistake' }>

export function CommonMistakeBlock({ block }: { block: CommonMistakeBlockData }) {
  return (
    <BlockShell type="commonMistake" title={block.title} tone="attention">
      <div className="flex flex-col gap-1.5 rounded-md border border-attention-500/30 px-4 py-3">
        <span className="text-xs font-semibold tracking-wide text-attention-500 uppercase">
          O que muita gente pensa
        </span>
        <p className="text-sm leading-relaxed text-text-muted">{block.wrong}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-text-faint uppercase">
          Por que isso acontece
        </span>
        <RichText text={block.why} className="text-sm" />
      </div>

      <div className="flex flex-col gap-1.5 rounded-md border border-success-500/30 bg-success-500/8 px-4 py-3">
        <span className="text-xs font-semibold tracking-wide text-success-500 uppercase">
          O jeito certo de pensar
        </span>
        <RichText text={block.right} className="text-sm" />
      </div>

      <NotUnderstoodPanel alternatives={block.alternatives} blockId={block.id} />
    </BlockShell>
  )
}
