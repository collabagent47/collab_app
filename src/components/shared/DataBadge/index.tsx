import type { DataConfidence } from '../../../domain/roi/roi-types'
import { cn } from '../../../lib/utils'

interface DataBadgeProps {
  confidence: DataConfidence
  className?: string
}

const BADGE_STYLES: Record<DataConfidence, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  assumption: 'bg-amber-100 text-amber-700 border-amber-200',
  pending: 'bg-slate-100 text-slate-600 border-slate-200',
}

const BADGE_LABELS: Record<DataConfidence, string> = {
  confirmed: 'Confirmado',
  assumption: 'Supuesto',
  pending: 'Pendiente',
}

export function DataBadge({ confidence, className }: DataBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        BADGE_STYLES[confidence],
        className,
      )}
    >
      {BADGE_LABELS[confidence]}
    </span>
  )
}
