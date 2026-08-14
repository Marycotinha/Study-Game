import { Link, useParams } from 'react-router'
import { Card, Chip } from '@/design-system/primitives'
import { contentRepository } from '@/content/contentRepository'
import { subjectIdSchema } from '@/content/schema/subject'

export default function GradeSelectPage() {
  const { subjectId } = useParams()
  const parsed = subjectIdSchema.safeParse(subjectId)
  if (!parsed.success) return null

  const subject = contentRepository.getSubject(parsed.data)
  const grades = contentRepository.getGrades()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <div>
        <Link to="/" className="text-sm text-text-muted hover:text-text-primary">
          ← Matérias
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold text-text-primary">
          {subject?.name}
        </h1>
        <p className="text-text-muted">Escolha a série</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {grades.map((grade) => {
          const count = contentRepository.getTopicsBySubjectAndGrade(parsed.data, grade.id).length
          return (
            <Link key={grade.id} to={`/materia/${parsed.data}/${grade.id}`}>
              <Card className="flex items-center justify-between transition-colors hover:border-accent/60">
                <span className="font-medium text-text-primary">{grade.label}</span>
                <Chip tone={count > 0 ? 'accent' : 'neutral'}>
                  {count > 0 ? `${count} assunto${count > 1 ? 's' : ''}` : 'Em breve'}
                </Chip>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
