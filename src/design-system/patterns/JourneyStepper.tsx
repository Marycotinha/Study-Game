import { cn } from '@/lib/cn'
import { journeyStages, type JourneyStage } from './journey'

interface JourneyStepperProps {
  current: JourneyStage
  /** Etapas já disponíveis. As demais aparecem como "em breve". */
  available?: JourneyStage[]
  className?: string
}

/**
 * Mostra onde o aluno está na jornada do assunto
 * (learn → visualize → play → challenge). Etapas ainda não construídas
 * aparecem bloqueadas, para que o caminho completo fique visível desde já.
 */
export function JourneyStepper({ current, available = ['learn'], className }: JourneyStepperProps) {
  return (
    <nav aria-label="Etapas do assunto" className={cn('w-full', className)}>
      <ol className="flex items-center gap-1.5 sm:gap-2">
        {journeyStages.map((stage) => {
          const isCurrent = stage.id === current
          const isAvailable = available.includes(stage.id)

          return (
            <li key={stage.id} className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span
                aria-hidden="true"
                className={cn(
                  'h-1 rounded-pill',
                  isCurrent ? 'bg-accent' : isAvailable ? 'bg-accent/40' : 'bg-bg-elevated',
                )}
              />
              <span
                className={cn(
                  'truncate text-[0.7rem] font-medium sm:text-xs',
                  isCurrent ? 'text-accent' : 'text-text-faint',
                )}
              >
                {stage.label}
                {!isAvailable && <span className="sr-only"> (em breve)</span>}
                {isCurrent && <span className="sr-only"> (etapa atual)</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
