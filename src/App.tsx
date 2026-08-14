import { useState } from 'react'
import { Button, Card, Chip, ProgressBar } from '@/design-system/primitives'
import { cn } from '@/lib/cn'

/**
 * Fase 0 — vitrine do design system, não uma tela final do produto.
 * Confirma visualmente que tokens, tematização por matéria e primitivos
 * funcionam antes da Fase 1 (catálogo real) ser construída sobre eles.
 */

const subjects = [
  { id: 'math', label: 'Matemática', color: 'var(--math-500)' },
  { id: 'physics', label: 'Física', color: 'var(--physics-500)' },
  { id: 'chemistry', label: 'Química', color: 'var(--chem-500)' },
] as const

function App() {
  const [subject, setSubject] = useState<(typeof subjects)[number]['id']>('physics')

  return (
    <div data-subject={subject} className="min-h-svh px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-display text-3xl font-semibold text-text-primary">
            STUDY GAME
          </h1>
          <p className="text-text-muted">Aprenda. Visualize. Jogue. Domine.</p>
        </header>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg text-text-primary">Design system</span>
            <Chip tone="accent">Fase 0</Chip>
          </div>

          <div className="flex gap-2">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={cn(
                  'flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                  subject === s.id
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border-subtle text-text-muted hover:text-text-primary',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Continuar</Button>
            <Button variant="secondary">Explorar</Button>
            <Button variant="ghost">Não entendi</Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-text-muted">
              <span>Progresso do assunto</span>
              <span>65%</span>
            </div>
            <ProgressBar value={65} label="Progresso do assunto" />
          </div>

          <div className="flex gap-2">
            <Chip tone="gold">+120 XP</Chip>
            <Chip tone="success">Domínio: em progresso</Chip>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
