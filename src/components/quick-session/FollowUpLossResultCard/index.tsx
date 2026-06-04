import type { FollowUpLossResult } from '../../../domain/sales-opportunity/follow-up-loss-types'
import { QualityWarning } from '../../shared/QualityWarning'

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(v)

interface Props {
  result: FollowUpLossResult
  onDeepDive?: () => void
}

export function FollowUpLossResultCard({ result, onDeepDive }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
        {/* Resultado principal */}
        <div className="px-5 py-4 border-b border-slate-200">
          <p className="text-sm font-medium text-slate-500 mb-1">Venta esperada perdida</p>
          <p className="text-3xl font-bold text-[#10B981]">
            {formatCOP(result.expectedLostSales)} <span className="text-base font-medium text-slate-400">/ mes</span>
          </p>
        </div>

        {/* Métricas de desglose */}
        <div className="px-5 py-4 flex flex-col gap-2 border-b border-slate-200">
          <MetricRow
            label="Tasa de cierre actual"
            value={`${(result.closeRate * 100).toFixed(1)}%`}
          />
          <MetricRow
            label="Cierres potenciales perdidos"
            value={result.potentialLostClosures.toFixed(2)}
          />
          <MetricRow
            label="Valor bruto leads perdidos"
            value={formatCOP(result.grossLostPipeline)}
          />
        </div>

        {/* Disclaimer */}
        <div className="px-5 py-4 flex items-start gap-2">
          <span className="text-base shrink-0">⚠️</span>
          <p className="text-xs text-slate-500 leading-relaxed">
            Esta es una estimación basada en la tasa de cierre actual, no una promesa de ventas.
          </p>
        </div>
      </div>

      {/* Warnings pedagógicos */}
      {result.warnings.length > 0 && (
        <QualityWarning warnings={result.warnings} />
      )}

      {/* Botón secundario */}
      {onDeepDive && (
        <button
          type="button"
          onClick={onDeepDive}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Profundizar con ROI
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  )
}
