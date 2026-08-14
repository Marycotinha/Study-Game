import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
      <p className="text-text-muted">Página não encontrada.</p>
      <Link to="/" className="text-accent hover:underline">
        Voltar para o início
      </Link>
    </div>
  )
}
