import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Zap } from 'lucide-react'
import { useExplorations } from '../../hooks/useExplorations'
import { ExplorationCard } from '../../components/exploration/ExplorationCard'
import type { ExplorationStatus } from '../../domain/roi/roi-types'
import { STATUS_LABELS } from '../../lib/constants'
import { cn } from '../../lib/utils'

const ALL_STATUSES: ExplorationStatus[] = [
  'draft', 'in_progress', 'incomplete_data', 'roi_calculated',
  'summary_generated', 'proposal_sent', 'closed_won', 'closed_lost',
]

const ALL_STATUSES_WITH_ALL = ['all', ...ALL_STATUSES] as const
type StatusWithAll = ExplorationStatus | 'all'

const MOBILE_QUICK_FILTERS: StatusWithAll[] = ['all', 'in_progress', 'roi_calculated']

const MOBILE_EXTRA_STATUSES: ExplorationStatus[] = [
  'draft', 'incomplete_data', 'summary_generated', 'proposal_sent', 'closed_won', 'closed_lost',
]

function FilterButton({
  value,
  active,
  label,
  onClick,
}: {
  value: StatusWithAll
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'text-white'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
      )}
      style={active ? { background: '#10B981' } : undefined}
    >
      {label}
    </button>
  )
}

function CompactMoreFilters({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: StatusWithAll
  setStatusFilter: (s: StatusWithAll) => void
}) {
  const [open, setOpen] = useState(false)
  const hasExtraActive = MOBILE_EXTRA_STATUSES.some((s) => s === statusFilter)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
          hasExtraActive
            ? 'border-transparent text-white'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
        )}
        style={hasExtraActive ? { background: '#10B981' } : undefined}
      >
        {hasExtraActive ? STATUS_LABELS[statusFilter as ExplorationStatus] : 'Más'} ▾
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-1 min-w-40 rounded-xl border border-[#E4E4E7] bg-white py-1 shadow-lg">
            {MOBILE_EXTRA_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-slate-50',
                  statusFilter === status ? 'text-[#10B981]' : 'text-[#0F172A]',
                )}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { explorations, loading, deleteExploration } = useExplorations()
  const [statusFilter, setStatusFilter] = useState<StatusWithAll>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = explorations.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter
    const matchesSearch =
      searchQuery === '' ||
      e.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.sector.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>
            Exploraciones
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#71717A' }}>
            Gestiona tus sesiones y diagnósticos de cliente.
          </p>
        </div>

        {/* Desktop/tablet CTAs */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={() => navigate('/session/quick')}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ background: '#10B981' }}
          >
            <Zap className="h-4 w-4" />
            Iniciar sesión rápida
          </button>
          <button
            onClick={() => navigate('/explorations/new')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Exploración completa
          </button>
        </div>
      </div>

      {/* Mobile CTAs */}
      <div className="mb-4 flex flex-col gap-2 sm:hidden">
        <button
          onClick={() => navigate('/session/quick')}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: '#10B981' }}
        >
          <Zap className="h-4 w-4" />
          Iniciar sesión rápida
        </button>
        <button
          onClick={() => navigate('/explorations/new')}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Exploración completa
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="Buscar por cliente o sector..."
          />
        </div>

        {/* Desktop filters */}
        <div className="hidden flex-wrap gap-2 sm:flex">
          {ALL_STATUSES_WITH_ALL.map((status) => (
            <FilterButton
              key={status}
              value={status}
              active={statusFilter === status}
              label={status === 'all' ? 'Todos' : STATUS_LABELS[status as ExplorationStatus]}
              onClick={() => setStatusFilter(status)}
            />
          ))}
        </div>

        {/* Mobile filters */}
        <div className="flex gap-2 sm:hidden">
          {MOBILE_QUICK_FILTERS.map((status) => (
            <FilterButton
              key={status}
              value={status}
              active={statusFilter === status}
              label={status === 'all' ? 'Todos' : STATUS_LABELS[status as ExplorationStatus]}
              onClick={() => setStatusFilter(status)}
            />
          ))}
          <CompactMoreFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4"
            style={{ borderColor: '#A7F3D0', borderTopColor: '#10B981' }}
          />
        </div>
      )}

      {/* Empty state — no results from filter/search */}
      {!loading && filtered.length === 0 && (statusFilter !== 'all' || searchQuery !== '') && (
        <div className="flex flex-col items-center py-16 text-center">
          <Search className="mb-4 h-12 w-12 text-slate-300" />
          <h3 className="mb-2 text-lg font-semibold text-slate-700">Sin resultados</h3>
          <p className="text-sm text-slate-400">Intenta con otros filtros o búsqueda.</p>
        </div>
      )}

      {/* Empty state — no explorations at all */}
      {!loading && explorations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: '#ECFDF5' }}
          >
            <Zap className="h-8 w-8" style={{ color: '#10B981' }} />
          </div>
          <h2 className="mb-2 text-xl font-bold" style={{ color: '#0F172A' }}>
            Empieza una sesión de diagnóstico
          </h2>
          <p className="mb-8 max-w-sm text-sm" style={{ color: '#71717A' }}>
            Guía la conversación con preguntas simples, detecta una fricción comercial
            y genera una propuesta inicial de Collab en una sola sesión.
          </p>
          <div className="flex w-full max-w-xs flex-col gap-3">
            <button
              onClick={() => navigate('/session/quick')}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ background: '#10B981' }}
            >
              <Zap className="h-4 w-4" />
              Iniciar sesión rápida
            </button>
            <button
              onClick={() => navigate('/explorations/new')}
              className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50"
              style={{ borderColor: '#E4E4E7', color: '#0F172A' }}
            >
              Crear exploración completa
            </button>
          </div>
        </div>
      )}

      {/* Cards grid */}
      {!loading && filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((exploration) => (
            <ExplorationCard
              key={exploration.id}
              exploration={exploration}
              onClick={() => navigate(`/explorations/${exploration.id}`)}
              onDelete={deleteExploration}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
