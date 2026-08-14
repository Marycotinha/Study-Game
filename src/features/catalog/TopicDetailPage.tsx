import { Link, useParams } from 'react-router'
import { Button, Card, Chip } from '@/design-system/primitives'
import { JourneyStepper, MascotBubble } from '@/design-system/patterns'
import { useTopic } from '@/features/lesson/useTopic'

export default function TopicDetailPage() {
  const { subjectId, gradeId, topicId } = useParams()
  const state = useTopic(topicId)

  if (state.status === 'loading') {
    return <div className="px-6 py-24 text-center text-text-muted">Carregando assunto…</div>
  }
  if (state.status === 'missing') {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <p className="text-text-muted">Assunto não encontrado.</p>
        <Link to="/" className="text-accent hover:underline">
          Voltar para o início
        </Link>
      </div>
    )
  }

  const { topic } = state
  const stepCount = topic.lesson.blocks.length

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4">
        <Link
          to={`/materia/${subjectId}/${gradeId}`}
          className="text-sm text-text-muted hover:text-text-primary"
        >
          ← Voltar
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-semibold text-text-primary">{topic.title}</h1>
          <p className="text-text-muted">{topic.summary}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Chip tone="accent">{topic.estimatedMinutes} min</Chip>
            <Chip tone="neutral">Dificuldade {topic.difficulty}/5</Chip>
            <Chip tone="neutral">{stepCount} etapas</Chip>
          </div>
        </div>
      </div>

      <Card className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-wide text-text-faint uppercase">
            Sua jornada neste assunto
          </span>
          <JourneyStepper current="learn" />
        </div>

        <MascotBubble>{topic.lesson.intro}</MascotBubble>

        <Link to={`/materia/${subjectId}/${gradeId}/${topicId}/learn`} className="w-full">
          <Button size="lg" className="w-full">
            Começar a aprender
          </Button>
        </Link>
      </Card>
    </div>
  )
}
