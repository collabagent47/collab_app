import { Cpu } from 'lucide-react'
import type { RecommendedModule } from '../../../domain/knowledge-base/knowledge-types'
import { MODULE_STATUS_LABELS } from '../../../lib/constants'
import { cn } from '../../../lib/utils'

interface AutomationModuleCardProps {
  module: RecommendedModule
  onStatusChange: (id: string, status: RecommendedModule['status']) => void
}

const STATUS_COLORS: Record<RecommendedModule['status'], string> = {
  included_mvp: 'border-emerald-200 bg-emerald-50',
  optional: 'border-blue-200 bg-blue-50',
  phase_2: 'border-amber-200 bg-amber-50',
  not_applicable: 'border-slate-200 bg-slate-50',
}

export function AutomationModuleCard({ module, onStatusChange }: AutomationModuleCardProps) {
  return (
    <div className={cn('rounded-xl border-2 p-5 transition-all duration-200', STATUS_COLORS[module.status])}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
          <Cpu className="h-4 w-4 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{module.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{module.description}</p>
        </div>
      </div>

      <p className="mb-4 rounded-lg bg-white/60 p-3 text-sm italic text-slate-600">
        {module.explanation}
      </p>

      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-500">Estado</label>
        <select
          value={module.status}
          onChange={(e) => onStatusChange(module.id, e.target.value as RecommendedModule['status'])}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        >
          {Object.entries(MODULE_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
