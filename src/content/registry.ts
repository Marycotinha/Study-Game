import type { SubjectId } from './schema/subject'
import type { GradeId } from './schema/grade'
import type { Topic } from './schema/topic'

/**
 * Índice leve de cada assunto, usado para listar cards no catálogo sem
 * precisar carregar o conteúdo completo da aula (lesson/challenge). O
 * conteúdo completo só é importado sob demanda via `load()`, mantendo cada
 * assunto em seu próprio chunk (ver docs/ARCHITECTURE.md seção 5 e 6).
 */
export interface TopicIndexEntry {
  id: string
  subjectId: SubjectId
  gradeIds: GradeId[]
  slug: string
  title: string
  summary: string
  difficulty: number
  estimatedMinutes: number
}

interface TopicRegistryEntry {
  index: TopicIndexEntry
  load: () => Promise<{ default: Topic }>
}

export const topicRegistry: TopicRegistryEntry[] = [
  {
    index: {
      id: 'physics-g9-force',
      subjectId: 'physics',
      gradeIds: ['g9'],
      slug: 'forca',
      title: 'Força',
      summary: 'O que é força, como ela age sobre os objetos e como muda o movimento.',
      difficulty: 2,
      estimatedMinutes: 15,
    },
    load: () => import('./physics/g9/force'),
  },
]
