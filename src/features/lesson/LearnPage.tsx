import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Button, Card, ProgressBar } from '@/design-system/primitives'
import { JourneyStepper, MascotBubble } from '@/design-system/patterns'
import { useTopic } from './useTopic'
import { LessonBlockRenderer } from './LessonBlockRenderer'

export default function LearnPage() {
  const { subjectId, gradeId, topicId } = useParams()
  const state = useTopic(topicId)

  const [index, setIndex] = useState(0)
  const [solvedCheckpoints, setSolvedCheckpoints] = useState<string[]>([])
  const stepRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Ao trocar de etapa, leva o foco (e a rolagem) para o novo bloco — sem
  // isso, quem usa teclado ou leitor de tela ficaria preso no rodapé.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    stepRef.current?.focus()
    window.scrollTo({ top: 0 })
  }, [index])

  const topicPath = `/materia/${subjectId}/${gradeId}/${topicId}`

  if (state.status === 'loading') {
    return <div className="px-6 py-24 text-center text-text-muted">Carregando aula…</div>
  }
  if (state.status === 'missing') {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <p className="text-text-muted">Aula não encontrada.</p>
        <Link to="/" className="text-accent hover:underline">
          Voltar para o início
        </Link>
      </div>
    )
  }

  const { topic } = state
  const blocks = topic.lesson.blocks
  const total = blocks.length
  const isFinished = index >= total
  const block = isFinished ? null : blocks[index]

  // Checkpoint segura o avanço até ser respondido — a ideia é verificar o
  // entendimento, nunca punir: as tentativas são ilimitadas.
  const blockedByCheckpoint =
    block?.type === 'checkpoint' && !solvedCheckpoints.includes(block.id)

  const progress = (index / total) * 100

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4">
        <Link to={topicPath} className="text-sm text-text-muted hover:text-text-primary">
          ← {topic.title}
        </Link>

        <JourneyStepper current="learn" />

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="font-display text-lg font-semibold text-text-primary">
              {topic.title}
            </h1>
            <span className="shrink-0 text-xs text-text-faint">
              {isFinished ? 'Aula concluída' : `Etapa ${index + 1} de ${total}`}
            </span>
          </div>
          <ProgressBar
            value={isFinished ? 100 : progress}
            label={`Progresso da aula: ${isFinished ? total : index} de ${total} etapas`}
          />
        </div>
      </div>

      {index === 0 && !isFinished && <MascotBubble>{topic.lesson.intro}</MascotBubble>}

      <div ref={stepRef} tabIndex={-1} className="flex flex-col gap-5 focus-visible:outline-none">
        {block && (
          <LessonBlockRenderer
            key={block.id}
            block={block}
            onCheckpointSolved={() =>
              setSolvedCheckpoints((prev) =>
                prev.includes(block.id) ? prev : [...prev, block.id],
              )
            }
          />
        )}

        {isFinished && (
          <Card className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wide text-success-500 uppercase">
                Aula concluída
              </span>
              <h2 className="font-display text-xl font-semibold text-text-primary">
                Você chegou ao fim de {topic.title}
              </h2>
            </div>

            <MascotBubble>{topic.lesson.outro}</MascotBubble>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-wide text-text-faint uppercase">
                Próxima etapa
              </span>
              <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-border-strong px-4 py-3">
                <span className="text-sm text-text-muted">Visualizar — simulação de força</span>
                <span className="shrink-0 rounded-pill border border-border-subtle px-2.5 py-0.5 text-xs text-text-faint">
                  Em breve
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="secondary" onClick={() => setIndex(0)} className="w-full sm:w-auto">
                Revisar a aula
              </Button>
              <Link to={topicPath} className="w-full sm:w-auto">
                <Button className="w-full">Voltar ao assunto</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>

      {!isFinished && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex-1 sm:flex-none"
            >
              Anterior
            </Button>
            <Button
              onClick={() => setIndex((i) => i + 1)}
              disabled={blockedByCheckpoint}
              className="flex-1"
            >
              {index === total - 1 ? 'Concluir aula' : 'Continuar'}
            </Button>
          </div>
          {blockedByCheckpoint && (
            <p className="text-center text-xs text-text-faint">
              Escolha uma resposta para continuar. Pode tentar quantas vezes quiser.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
