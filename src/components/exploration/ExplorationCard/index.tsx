import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Trash2 } from 'lucide-react'
import type { Exploration } from '../../../domain/roi/roi-types'
import { cn } from '../../../lib/utils'
import { STATUS_LABELS, DATA_QUALITY_LABELS } from '../../../lib/constants'

interface ExplorationCardProps {
  exploration: Exploration
  onClick: () => void
  onDelete: (id: string) => void
}

const STATUS_BORDER: Record<string, string> = {
  draft: 'border-slate-300',
  in_progress: 'border-indigo-400',
  incomplete_data: 'border-amber-400',
  roi_calculated: 'border-emerald-400',
  summary_generated: 'border-emerald-500',
  proposal_sent: 'border-violet-400',
  closed_won: 'border-emerald-600',
  closed_lost: 'border-slate-400',
  discarded: 'border-slate-300',
}

const STATUS_BADGE: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  in_progress: 'bg-indigo-100 text-indigo-700',
  incomplete_data: 'bg-amber-100 text-amber-700',
  roi_calculated: 'bg-emerald-100 text-emerald-700',
  summary_generated: 'bg-emerald-100 text-emerald-700',
  proposal_sent: 'bg-violet-100 text-violet-700',
  closed_won: 'bg-emerald-100 text-emerald-800',
  closed_lost: 'bg-slate-100 text-slate-600',
  discarded: 'bg-slate-100 text-slate-500',
}

const QUALITY_BADGE: Record<string, string> = {
  low: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-emerald-100 text-emerald-700',
}

export function ExplorationCard({ exploration, onClick, onDelete }: ExplorationCardProps) {
  const borderClass = STATUS_BORDER[exploration.status] ?? 'border-slate-200'
  const statusBadge = STATUS_BADGE[exploration.status] ?? 'bg-slate-100 text-slate-600'

  const formattedDate = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(exploration.updatedAt))

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'group relative cursor-pointer rounded-xl border-l-4 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md',
        borderClass,
      )}
      onClick={onClick}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(exploration.id)
        }}
        className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 opacity-0 transition-opacity duration-150 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        aria-label="Eliminar exploración"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div className="mb-3 flex items-start justify-between pr-8">
        <div>
          <h3 className="font-semibold text-slate-900">{exploration.clientName}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{exploration.sector}</p>
        </div>
        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', statusBadge)}>
          {STATUS_LABELS[exploration.status] ?? exploration.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </span>
        {exploration.dataQuality && (
          <span className={cn('flex items-center gap-1 rounded-full px-2 py-0.5 font-medium', QUALITY_BADGE[exploration.dataQuality])}>
            <TrendingUp className="h-3 w-3" />
            Calidad {DATA_QUALITY_LABELS[exploration.dataQuality]}
          </span>
        )}
      </div>
    </motion.div>
  )
}
