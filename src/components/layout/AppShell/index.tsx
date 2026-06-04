import { NavLink, Outlet } from 'react-router-dom'
import { Zap, LayoutDashboard, Compass, GraduationCap, Database, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppMode } from '../../../hooks/useAppMode'
import { cn } from '../../../lib/utils'

const NAV_LINKS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/explorations/new', label: 'Exploraciones', icon: Compass, end: false },
  { to: '/academy', label: 'Academia ROI', icon: GraduationCap, end: false },
  { to: '/knowledge-base', label: 'Base de Conocimiento', icon: Database, end: false },
]

function Sidebar() {
  const { userMode, setUserMode } = useAppMode()
  const isLearner = userMode === 'learner'

  return (
    <aside
      className="hidden lg:flex flex-col shrink-0 h-dvh sticky top-0 overflow-y-auto"
      style={{
        width: 240,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <Zap className="h-5 w-5 shrink-0" style={{ color: 'var(--color-green)' }} />
        <span
          className="text-base font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Collab
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
        {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'text-white'
                  : 'hover:bg-slate-50',
              )
            }
            style={({ isActive }) =>
              isActive
                ? { background: 'var(--color-green)', color: '#FFFFFF' }
                : { color: 'var(--color-secondary)' }
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Mode Toggle */}
      <div className="px-3 pb-5">
        <button
          onClick={() => setUserMode(isLearner ? 'expert' : 'learner')}
          className="flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all duration-200"
          style={
            isLearner
              ? {
                  borderColor: '#A7F3D0',
                  background: '#ECFDF5',
                  color: '#065F46',
                }
              : {
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-secondary)',
                }
          }
        >
          <BookOpen className="h-3.5 w-3.5 shrink-0" />
          {isLearner ? 'Modo Aprendiz' : 'Modo Experto'}
        </button>
      </div>
    </aside>
  )
}

function Topbar({ title }: { title: string }) {
  return (
    <header
      className="flex items-center px-8 shrink-0"
      style={{
        height: 56,
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <h1
        className="text-sm font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h1>
    </header>
  )
}

export function AppShell() {
  return (
    <div className="flex h-dvh overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title="Collab ROI Explorer" />
        <main className="flex-1 overflow-auto" style={{ padding: 32 }}>
          <motion.div
            key="page-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
