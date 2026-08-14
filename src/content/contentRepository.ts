import { subjects } from './subjects'
import { grades } from './grades'
import { topicRegistry, type TopicIndexEntry } from './registry'
import type { Topic } from './schema/topic'
import type { SubjectId } from './schema/subject'
import type { GradeId } from './schema/grade'

/**
 * Camada única de acesso ao conteúdo. Features nunca importam módulos de
 * conteúdo diretamente — sempre passam por aqui, para que a origem dos
 * dados possa trocar no futuro (ex.: CMS/Supabase) sem alterar features.
 */
export const contentRepository = {
  getSubjects: () => subjects,
  getSubject: (id: SubjectId) => subjects.find((s) => s.id === id),
  getGrades: () => grades,
  getGrade: (id: GradeId) => grades.find((g) => g.id === id),
  getTopicsBySubject: (subjectId: SubjectId): TopicIndexEntry[] =>
    topicRegistry.filter((t) => t.index.subjectId === subjectId).map((t) => t.index),
  getTopicsBySubjectAndGrade: (subjectId: SubjectId, gradeId: GradeId): TopicIndexEntry[] =>
    topicRegistry
      .filter((t) => t.index.subjectId === subjectId && t.index.gradeIds.includes(gradeId))
      .map((t) => t.index),
  getTopic: async (topicId: string): Promise<Topic | undefined> => {
    const entry = topicRegistry.find((t) => t.index.id === topicId)
    if (!entry) return undefined
    const mod = await entry.load()
    return mod.default
  },
}
