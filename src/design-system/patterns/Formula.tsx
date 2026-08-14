import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type KatexModule = typeof import('katex')

/**
 * KaTeX é carregado sob demanda e uma única vez por sessão: só quem abre uma
 * aula com fórmula paga o custo (docs/ARCHITECTURE.md — orçamento de bundle).
 */
let katexPromise: Promise<KatexModule> | null = null
function loadKatex(): Promise<KatexModule> {
  if (!katexPromise) {
    katexPromise = Promise.all([import('katex'), import('katex/dist/katex.min.css')]).then(
      ([mod]) => mod,
    )
  }
  return katexPromise
}

interface FormulaProps {
  latex: string
  /** display=true centraliza e aumenta a fórmula (bloco). */
  display?: boolean
  className?: string
  /** Descrição lida por leitores de tela, já que o KaTeX gera markup visual. */
  ariaLabel?: string
}

export function Formula({ latex, display = false, className, ariaLabel }: FormulaProps) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    loadKatex()
      .then((katex) => {
        if (!active) return
        setHtml(
          katex.default.renderToString(latex, {
            displayMode: display,
            throwOnError: false,
            output: 'html',
          }),
        )
      })
      .catch(() => {
        // Falha no carregamento: o fallback em texto abaixo continua legível.
        if (active) setHtml(null)
      })
    return () => {
      active = false
    }
  }, [latex, display])

  return (
    <div
      className={cn('max-w-full overflow-x-auto', display && 'py-1 text-center', className)}
      role="math"
      aria-label={ariaLabel ?? latex}
    >
      {html ? (
        <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <span aria-hidden="true" className="font-mono text-text-primary">
          {latex.replace(/\\cdot/g, '·').replace(/\\text\{([^}]*)\}/g, '$1').replace(/\\/g, '')}
        </span>
      )}
    </div>
  )
}
