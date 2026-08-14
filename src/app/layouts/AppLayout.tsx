import { Link, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border-subtle px-6 py-4">
        <Link to="/" className="font-display text-lg font-semibold text-text-primary">
          STUDY GAME
        </Link>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
