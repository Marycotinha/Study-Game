import { Link } from 'react-router'
import { Card, Chip } from '@/design-system/primitives'
import { contentRepository } from '@/content/contentRepository'

export default function HomePage() {
  const subjects = contentRepository.getSubjects()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-semibold text-text-primary">STUDY GAME</h1>
        <p className="text-text-muted">Aprenda. Visualize. Jogue. Domine.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {subjects.map((subject) => {
          const topicCount = contentRepository.getTopicsBySubject(subject.id).length
          return (
            <Link key={subject.id} to={`/materia/${subject.id}`} data-subject={subject.id}>
              <Card className="flex h-full flex-col gap-3 transition-colors hover:border-accent/60">
                <span className="font-display text-lg text-text-primary">{subject.name}</span>
                <p className="flex-1 text-sm text-text-muted">{subject.tagline}</p>
                <Chip tone={topicCount > 0 ? 'accent' : 'neutral'} className="self-start">
                  {topicCount > 0 ? `${topicCount} assunto${topicCount > 1 ? 's' : ''}` : 'Em breve'}
                </Chip>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
