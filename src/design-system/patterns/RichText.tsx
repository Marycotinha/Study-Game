import { Fragment, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Destaque leve para textos de conteúdo: **palavra** vira ênfase visual.
 * Evita trazer um parser de Markdown só para negrito, e mantém o conteúdo
 * legível em texto puro no arquivo do assunto.
 *
 * Quebras de linha duplas viram parágrafos.
 */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

interface RichTextProps {
  text: string
  className?: string
}

export function RichText({ text, className }: RichTextProps) {
  const paragraphs = text.split('\n\n')

  return (
    <div className={cn('flex flex-col gap-3 text-text-muted', className)}>
      {paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed">
          {renderInline(p)}
        </p>
      ))}
    </div>
  )
}
