import type { LessonBlock } from '@/content/schema/topic'
import { ConceptBlock } from './blocks/ConceptBlock'
import { HowItWorksBlock } from './blocks/HowItWorksBlock'
import { FormulaBlock } from './blocks/FormulaBlock'
import { ExampleBlock } from './blocks/ExampleBlock'
import { CommonMistakeBlock } from './blocks/CommonMistakeBlock'
import { CheckpointBlock } from './blocks/CheckpointBlock'

interface LessonBlockRendererProps {
  block: LessonBlock
  onCheckpointSolved?: () => void
}

/**
 * Mapeia tipo de bloco -> componente. Adicionar um novo tipo de bloco no
 * futuro é acrescentar um case aqui, sem tocar na página da aula.
 */
export function LessonBlockRenderer({ block, onCheckpointSolved }: LessonBlockRendererProps) {
  switch (block.type) {
    case 'concept':
      return <ConceptBlock block={block} />
    case 'howItWorks':
      return <HowItWorksBlock block={block} />
    case 'formula':
      return <FormulaBlock block={block} />
    case 'example':
      return <ExampleBlock block={block} />
    case 'commonMistake':
      return <CommonMistakeBlock block={block} />
    case 'checkpoint':
      return <CheckpointBlock block={block} onSolved={onCheckpointSolved} />
    case 'visualization':
      // Renderizado a partir da Fase 3, quando o sistema de visualizações existir.
      return null
  }
}
