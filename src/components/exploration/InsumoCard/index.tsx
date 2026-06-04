import { Trash2 } from 'lucide-react'
import type { Insumo } from '../../../domain/roi/roi-types'
import { DataBadge } from '../../shared/DataBadge'
import { cn } from '../../../lib/utils'

interface InsumoCardProps {
  insumo: Insumo
  onDelete: (id: string) => void
}

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

export function InsumoCard({ insumo, onDelete }: InsumoCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-150 hover:shadow-md">
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-medium text-slate-900">{insumo.name}</span>
          {insumo.category && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              {insumo.category}
            </span>
          )}
          <DataBadge confidence={insumo.confidence} />
        </div>
        <div className={cn('flex gap-4 text-sm text-slate-500')}>
          {insumo.avgPrice !== undefined && (
            <span>Precio prom: <strong className="text-slate-700">{formatCOP(insumo.avgPrice)}</strong></span>
          )}
          {insumo.unit && <span>Unidad: {insumo.unit}</span>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDelete(insumo.id)}
        className="ml-4 rounded-lg p-2 text-slate-400 transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
        aria-label="Eliminar insumo"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
