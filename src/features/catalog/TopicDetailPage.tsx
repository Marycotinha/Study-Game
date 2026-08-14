import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Card, Chip } from '@/design-system/primitives'
import { contentRepository } from '@/content/contentRepository'
import type { LessonBlock, Topic } from '@/content/schema/topic'

const blockLabels: Record<LessonBlock['type'], string> = {
  concept: 'Conceito',
  howItWorks: 'Como funciona',
  formula: 'Fórmula',
  example: 'Exemplo',
  commonMistake: 'Erro comum',
  visualization: 'Visualização',
  checkpoint: 'Checkpoint',
}

function renderBlockPreview(block: LessonBlock) {
  switch (block.type) {
    case 'concept':
    case 'howItWorks':
      return <p className="text-sm text-text-muted">{block.body}</p>
    case 'formula':
      return <p className="font-mono text-sm text-text-muted">{block.latex}</p>
    case 'example':
      return <p className="text-sm text-text-muted">{block.statement}</p>
    case 'commonMistake':
      return <p className="text-sm text-text-muted">{block.right}</p>
    case 'visualization':
      return <p className="text-sm text-text-muted">Simulação: {block.vizId}</p>
    case 'checkpoint':
      return <p className="text-sm text-text-muted">{block.question}</p>
  }
}

export default function TopicDetailPage() {
  const { subjectId, gradeId, topicId } = useParams()
  const [topic, setTopic] = useState<Topic | null | undefined>(undefined)

  useEffect(() => {
    let active = true
    setTopic(undefined)
    if (!topicId) return
    contentRepository.getTopic(topicId).then((t) => {
      if (active) setTopic(t ?? null)
    })
    return () => {
      active = false
    }
  }, [topicId])

  if (topic === undefined) {
    return <div className="px-6 py-24 text-center text-text-muted">Carregando assunto…</div>
  }
  if (topic === null) {
    return <div className="px-6 py-24 text-center text-text-muted">Assunto não encontrado.</div>
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <div>
        <Link
          to={`/materia/${subjectId}/${gradeId}`}
          className="text-sm text-text-muted hover:text-text-primary"
        >
          ← Voltar
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold text-text-primary">
          {topic.title}
        </h1>
        <p className="text-text-muted">{topic.summary}</p>
        <div className="mt-3 flex gap-2">
          <Chip tone="accent">{topic.estimatedMinutes} min</Chip>
          <Chip tone="neutral">Dificuldade {topic.difficulty}/5</Chip>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        <span className="font-display text-lg text-text-primary">Conteúdo da aula</span>
        {topic.lesson.blocks.map((block, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border-b border-border-subtle pb-3 last:border-0 last:pb-0"
          >
            <Chip tone="neutral" className="self-start">
              {blockLabels[block.type]}
            </Chip>
            {renderBlockPreview(block)}
          </div>
        ))}
      </Card>

      <Card className="flex flex-col gap-3">
        <span className="font-display text-lg text-text-primary">Desafio</span>
        <p className="text-text-primary">{topic.challenge.question}</p>
        <ul className="flex flex-col gap-2">
          {topic.challenge.options.map((opt) => (
            <li
              key={opt.id}
              className="rounded-md border border-border-subtle px-3 py-2 text-sm text-text-muted"
            >
              {opt.text}
            </li>
          ))}
        </ul>
      </Card>

      {topic.misconceptions.length > 0 && (
        <Card className="flex flex-col gap-3">
          <span className="font-display text-lg text-text-primary">Erros comuns mapeados</span>
          {topic.misconceptions.map((m) => (
            <div key={m.id} className="flex flex-col gap-1">
              <span className="font-medium text-text-primary">{m.label}</span>
              <p className="text-sm text-text-muted">{m.correction}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
