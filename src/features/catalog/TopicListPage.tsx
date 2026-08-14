import { Link, useParams } from 'react-router'
import { Card, Chip } from '@/design-system/primitives'
import { contentRepository } from '@/content/contentRepository'
import { subjectIdSchema } from '@/content/schema/subject'
import { gradeIdSchema } from '@/content/schema/grade'

export default function TopicListPage() {
  const { subjectId, gradeId } = useParams()
  const subjectParsed = subjectIdSchema.safeParse(subjectId)
  const gradeParsed = gradeIdSchema.safeParse(gradeId)
  if (!subjectParsed.success || !gradeParsed.success) return null

  const subject = contentRepository.getSubject(subjectParsed.data)
  const grade = contentRepository.getGrade(gradeParsed.data)
  const topics = contentRepository.getTopicsBySubjectAndGrade(subjectParsed.data, gradeParsed.data)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <div>
        <Link
          to={`/materia/${subjectParsed.data}`}
          className="text-sm text-text-muted hover:text-text-primary"
        >
          ← {subject?.name}
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold text-text-primary">
          {grade?.label}
        </h1>
        <p className="text-text-muted">Escolha o assunto</p>
      </div>

      {topics.length === 0 ? (
        <Card>
          <p className="text-text-muted">
            Nenhum assunto disponível ainda para esta série. Volte em breve.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/materia/${subjectParsed.data}/${gradeParsed.data}/${topic.id}`}
            >
              <Card className="flex flex-col gap-2 transition-colors hover:border-accent/60">
                <span className="font-medium text-text-primary">{topic.title}</span>
                <p className="text-sm text-text-muted">{topic.summary}</p>
                <div className="flex gap-2">
                  <Chip tone="neutral">{topic.estimatedMinutes} min</Chip>
                  <Chip tone="neutral">Dificuldade {topic.difficulty}/5</Chip>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
