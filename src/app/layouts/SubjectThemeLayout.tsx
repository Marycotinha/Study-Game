import { Outlet, useParams } from 'react-router'
import { subjectIdSchema } from '@/content/schema/subject'
import NotFoundPage from '@/features/home/NotFoundPage'

/**
 * Re-tematiza o app para a matéria atual via [data-subject] no elemento
 * raiz (ver docs/ARCHITECTURE.md seção 10) enquanto o usuário navega
 * dentro de /materia/:subjectId/*.
 */
export function SubjectThemeLayout() {
  const { subjectId } = useParams()
  const parsed = subjectIdSchema.safeParse(subjectId)

  if (!parsed.success) {
    return <NotFoundPage />
  }

  return (
    <div data-subject={parsed.data}>
      <Outlet />
    </div>
  )
}
