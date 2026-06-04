import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { ROIResult, ROIScenarioResults } from '../../../domain/roi/roi-types'
import { cn } from '../../../lib/utils'

interface ROIScenarioCardProps {
  scenario: 'conservative' | 'medium' | 'optimistic'
  result: ROIResult
  isHighlighted?: boolean
  allResults?: ROIScenarioResults
}

const SCENARIO_LABELS: Record<string, string> = {
  conservative: 'Conservador',
  medium: 'Medio',
  optimistic: 'Optimista',
}

const SCENARIO_DESC: Record<string, string> = {
  conservative: 'Mínimo de conversaciones, factores ×0.8',
  medium: 'Conversaciones probables, factores ×1.0',
  optimistic: 'Máximo de conversaciones, factores ×1.2',
}

const CONFIDENCE_LABEL: Record<string, string> = {
  low: 'Baja confianza',
  medium: 'Confianza media',
  high: 'Alta confianza',
}

const CONFIDENCE_BADGE: Record<string, string> = {
  low: 'bg-amber-50 text-amber-600',
  medium: 'bg-blue-50 text-blue-600',
  high: 'bg-emerald-50 text-emerald-600',
}

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

export function ROIScenarioCard({ scenario, result, isHighlighted = false, allResults }: ROIScenarioCardProps) {
  const chartData = allResults
    ? [
        { name: 'Conserv.', value: allResults.conservative.totalBenefit },
        { name: 'Medio', value: allResults.medium.totalBenefit },
        { name: 'Optimista', value: allResults.optimistic.totalBenefit },
      ]
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border-2 p-6 transition-all duration-200',
        isHighlighted
          ? 'border-indigo-300 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl'
          : 'border-slate-200 bg-white text-slate-900 shadow-sm',
      )}
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className={cn('wrap-break-word text-lg font-bold leading-tight', isHighlighted ? 'text-white' : 'text-slate-900')}>
            {SCENARIO_LABELS[scenario]}
          </h3>
          <p className={cn('mt-0.5 text-xs leading-5', isHighlighted ? 'text-indigo-200' : 'text-slate-500')}>
            {SCENARIO_DESC[scenario]}
          </p>
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 items-center self-start whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium',
            isHighlighted ? 'bg-white/20 text-indigo-100' : CONFIDENCE_BADGE[result.confidence],
          )}
        >
          {CONFIDENCE_LABEL[result.confidence]}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <Metric label="Ahorro operativo" value={formatCOP(result.operationalSavings)} highlighted={isHighlighted} />
        <Metric label="Beneficio comercial" value={formatCOP(result.commercialBenefit)} highlighted={isHighlighted} />
        <Metric label="Beneficio total" value={formatCOP(result.totalBenefit)} highlighted={isHighlighted} large />
        <Metric label="ROI financiero" value={`${result.financialROI.toFixed(1)}%`} highlighted={isHighlighted} large />
        <Metric label="Multiplicador" value={`${result.multiplier.toFixed(2)}×`} highlighted={isHighlighted} />
        <Metric
          label="Payback"
          value={result.paybackMonths !== null ? `${result.paybackMonths.toFixed(1)} meses` : 'N/A'}
          highlighted={isHighlighted}
        />
      </div>

      {isHighlighted && chartData && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-indigo-200">Comparativa de beneficio total</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={28}>
                <XAxis dataKey="name" tick={{ fill: '#c7d2fe', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(value: number) => [formatCOP(value), 'Beneficio total']}
                  contentStyle={{ background: '#4338ca', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }}
                />
                <Bar dataKey="value" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function Metric({ label, value, highlighted, large }: { label: string; value: string; highlighted: boolean; large?: boolean }) {
  return (
    <div className={cn('min-w-0 rounded-lg p-3', highlighted ? 'bg-white/10' : 'bg-slate-50')}>
      <p className={cn('mb-1 truncate text-xs', highlighted ? 'text-indigo-200' : 'text-slate-500')}>{label}</p>
      <p className={cn('wrap-break-word font-bold', large ? 'text-base' : 'text-sm', highlighted ? 'text-white' : 'text-slate-900')}>
        {value}
      </p>
    </div>
  )
}
