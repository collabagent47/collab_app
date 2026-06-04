import { TrendingUp, AlertCircle, CheckCircle, Layers } from 'lucide-react'
import type { Exploration } from '../../../domain/roi/roi-types'
import { OPPORTUNITY_TYPE_LABELS, DATA_QUALITY_LABELS } from '../../../lib/constants'
import { cn } from '../../../lib/utils'

interface LiveInsightPanelProps {
  exploration: Exploration
}

const QUALITY_COLORS: Record<string, string> = {
  low: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-amber-700 bg-amber-50 border-amber-200',
  high: 'text-emerald-700 bg-emerald-50 border-emerald-200',
}

export function LiveInsightPanel({ exploration }: LiveInsightPanelProps) {
  const pendingFields = [
    !exploration.operation?.monthlyConversationsLikely && 'Conversaciones probables',
    !exploration.operation?.minutesPerConversation && 'Minutos por conversación',
    !exploration.roiInputs?.averageTicket && 'Ticket promedio',
    !exploration.roiInputs?.grossMargin && 'Margen bruto',
    !exploration.roiInputs?.currentCloseRate && 'Tasa cierre actual',
    !exploration.roiInputs?.monthlyInvestment && 'Inversión mensual',
  ].filter(Boolean) as string[]

  const qualityKey = exploration.dataQuality ?? 'low'

  return (
    <aside className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Panel en vivo</h2>

      {exploration.opportunityType && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <div className="flex items-center gap-2 text-indigo-700">
            <Layers className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Tipo de oportunidad</span>
          </div>
          <p className="mt-1.5 font-semibold text-indigo-900">
            {OPPORTUNITY_TYPE_LABELS[exploration.opportunityType]}
          </p>
        </div>
      )}

      <div className={cn('rounded-xl border p-4', QUALITY_COLORS[qualityKey])}>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Calidad de datos</span>
        </div>
        <p className="mt-1.5 font-semibold">
          {DATA_QUALITY_LABELS[qualityKey]}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center gap-2 text-slate-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Datos pendientes</span>
          <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
            {pendingFields.length}
          </span>
        </div>
        {pendingFields.length === 0 ? (
          <div className="flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Todos los datos críticos completados</span>
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            {pendingFields.map((field) => (
              <li key={field} className="text-xs text-slate-600">
                · {field}
              </li>
            ))}
          </ul>
        )}
      </div>

      {exploration.frictionIds.length > 0 && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">Fricciones seleccionadas</span>
          <p className="mt-1 text-2xl font-bold text-violet-900">{exploration.frictionIds.length}</p>
        </div>
      )}
    </aside>
  )
}
