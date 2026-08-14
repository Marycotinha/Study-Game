import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { SubjectThemeLayout } from './layouts/SubjectThemeLayout'
import NotFoundPage from '@/features/home/NotFoundPage'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const GradeSelectPage = lazy(() => import('@/features/catalog/GradeSelectPage'))
const TopicListPage = lazy(() => import('@/features/catalog/TopicListPage'))
const TopicDetailPage = lazy(() => import('@/features/catalog/TopicDetailPage'))

function PageFallback() {
  return <div className="px-6 py-24 text-center text-text-muted">Carregando…</div>
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="materia/:subjectId" element={<SubjectThemeLayout />}>
            <Route index element={<GradeSelectPage />} />
            <Route path=":gradeId" element={<TopicListPage />} />
            <Route path=":gradeId/:topicId" element={<TopicDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
