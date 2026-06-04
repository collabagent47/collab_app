import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Search, BarChart3 } from 'lucide-react'
import { useExplorations } from '../../hooks/useExplorations'
import { ExplorationCard } from '../../components/exploration/ExplorationCard'
import type { ExplorationStatus } from '../../domain/roi/roi-types'
import { STATUS_LABELS } from '../../lib/constants'
import { cn } from '../../lib/utils'

const ALL_STATUSES: ExplorationStatus[] = [
  'draft', 'in_progress', 'incomplete_data', 'roi_calculated',
  'summary_generated', 'proposal_sent', 'closed_won', 'closed_lost',
]

export function DashboardPage() {
  const navigate = useNavigate()
  const { explorations, loading, deleteExploration } = useExplorations()
  const [statusFilter, setStatusFilter] = useState<ExplorationStatus | 'all'>('all')
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exploraciones</h1>
          <p className="mt-1 text-sm text-slate-500">
            {explorations.length} {explorations.length === 1 ? 'exploración' : 'exploraciones'} en total
          </p>
        </div>
        <button
          onClick={() => navigate('/explorations/new')}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Nueva exploración
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            placeholder="Buscar por cliente o sector..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              statusFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
          >
            Todos
          </button>
          {ALL_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                statusFilter === status ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              )}
            >
              {STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <EmptyState onNew={() => navigate('/explorations/new')} hasFilters={statusFilter !== 'all' || searchQuery !== ''} />
      )}

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

function EmptyState({ onNew, hasFilters }: { onNew: () => void; hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <Search className="mb-4 h-12 w-12 text-slate-300" />
        <h3 className="mb-2 text-lg font-semibold text-slate-700">Sin resultados</h3>
        <p className="text-sm text-slate-400">Intenta con otros filtros o búsqueda.</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
        <BarChart3 className="h-10 w-10 text-indigo-400" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-800">Empieza tu primera exploración</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500">
        Usa la metodología EVIAR para explorar el negocio de un cliente, identificar fricciones y calcular el ROI de la automatización.
      </p>
      <button
        onClick={onNew}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Nueva exploración
      </button>
    </div>
  )
}
