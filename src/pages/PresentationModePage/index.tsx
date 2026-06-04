import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, TrendingUp, Settings, Layers, Cpu } from 'lucide-react'
import { useExploration } from '../../hooks/useExploration'
import { useKnowledge } from '../../hooks/useKnowledge'
import { OPPORTUNITY_TYPE_LABELS } from '../../lib/constants'
import { toPresentationViewModel } from '../../lib/presentation'

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

const IMPACT_ICON: Record<string, React.ReactNode> = {
  commercial: <TrendingUp className="h-4 w-4" />,
  operational: <Settings className="h-4 w-4" />,
  mixed: <Layers className="h-4 w-4" />,
}

export function PresentationModePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { exploration } = useExploration(id)
  const { frictions } = useKnowledge(exploration?.sector)

  if (!exploration) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    )
  }

  // DTO seguro: excluye notes, sessionPreparations, roiInputs, operation y todos los datos internos.
  const vm = toPresentationViewModel(exploration)

  const selectedFrictions = frictions.filter((f) => vm.frictionIds.includes(f.id))
  const mvpModules = vm.recommendedModules.filter((m) => m.status === 'included_mvp')
  const optimisticResult = vm.roiResults?.optimistic

  return (
    <div className="min-h-dvh bg-linear-to-br from-slate-900 to-slate-800 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">Collab ROI Explorer</p>
            <h1 className="text-lg font-bold">{vm.clientName}</h1>
          </div>
          <button
            onClick={() => navigate(`/explorations/${id}`)}
            className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10"
          >
            <X className="h-4 w-4" />
            Salir de presentación
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Contexto del cliente */}
        <Section title="Contexto del cliente">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoCard label="Sector" value={vm.sector} />
            {vm.city && <InfoCard label="Ciudad" value={vm.city} />}
            {vm.mainChannel && <InfoCard label="Canal principal" value={vm.mainChannel} />}
            {vm.mainProduct && <InfoCard label="Producto principal" value={vm.mainProduct} />}
            {vm.targetCustomer && <InfoCard label="Cliente objetivo" value={vm.targetCustomer} />}
            {vm.improvementGoal && <InfoCard label="Objetivo de mejora" value={vm.improvementGoal} className="sm:col-span-2" />}
          </div>
        </Section>

        {/* Fricciones identificadas */}
        {selectedFrictions.length > 0 && (
          <Section title="Fricciones identificadas">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {selectedFrictions.map((friction) => (
                <motion.div
                  key={friction.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-slate-300">
                    {IMPACT_ICON[friction.impactType]}
                    <span className="text-xs font-medium uppercase tracking-wide">{friction.impactType}</span>
                  </div>
                  <h3 className="mb-1 font-semibold text-white">{friction.title}</h3>
                  <p className="text-sm text-slate-400">{friction.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Tipo de oportunidad */}
        {vm.opportunityType && (
          <Section title="Tipo de oportunidad">
            <div className="rounded-xl border border-indigo-500/40 bg-indigo-600/20 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/30">
                  {IMPACT_ICON[vm.opportunityType]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{OPPORTUNITY_TYPE_LABELS[vm.opportunityType]}</h3>
                  <p className="text-sm text-indigo-300">
                    {vm.opportunityType === 'commercial' && 'Mejora la tasa de cierre y los ingresos.'}
                    {vm.opportunityType === 'operational' && 'Libera tiempo del equipo y reduce errores.'}
                    {vm.opportunityType === 'mixed' && 'Genera beneficio comercial y operativo simultáneamente.'}
                  </p>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Automatización sugerida */}
        {mvpModules.length > 0 && (
          <Section title="Automatización sugerida (MVP)">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {mvpModules.map((mod) => (
                <div key={mod.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-indigo-400" />
                    <h3 className="font-semibold text-white">{mod.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{mod.explanation}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Valor estimado */}
        {optimisticResult && (
          <Section title="Valor estimado (escenario optimista)">
            <div className="rounded-xl border border-emerald-500/40 bg-linear-to-br from-emerald-900/30 to-indigo-900/30 p-6">
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <MetricDisplay label="Beneficio total" value={formatCOP(optimisticResult.totalBenefit)} accent />
                <MetricDisplay label="ROI financiero" value={`${optimisticResult.financialROI.toFixed(1)}%`} />
                <MetricDisplay label="Multiplicador" value={`${optimisticResult.multiplier.toFixed(2)}×`} />
                <MetricDisplay
                  label="Payback"
                  value={optimisticResult.paybackMonths !== null ? `${optimisticResult.paybackMonths.toFixed(1)} meses` : 'N/A'}
                />
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 px-4 py-3">
                <p className="text-xs text-emerald-300">
                  Por cada peso invertido en la solución, el cliente obtiene {optimisticResult.multiplier.toFixed(2)} pesos en beneficios.
                  El ahorro operativo es {formatCOP(optimisticResult.operationalSavings)} mensual y el beneficio comercial adicional es {formatCOP(optimisticResult.commercialBenefit)}.
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-900/20 p-4">
              <p className="text-xs text-amber-300">
                Esta estimación se basa en los datos proporcionados y es de naturaleza indicativa. Los resultados reales dependen de múltiples factores y deben validarse con el cliente. No es una promesa de resultados.
              </p>
            </div>
          </Section>
        )}

        {/* Próximo paso */}
        <Section title="Próximo paso">
          <div className="rounded-xl border border-violet-500/40 bg-violet-900/20 p-6">
            <p className="text-slate-300">
              Agendar una sesión de validación de supuestos con el equipo para confirmar los datos de margen, ticket promedio y tasa de cierre antes de presentar la propuesta formal.
            </p>
          </div>
        </Section>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-12"
    >
      <h2 className="mb-5 text-lg font-bold uppercase tracking-widest text-slate-400">{title}</h2>
      {children}
    </motion.section>
  )
}

function InfoCard({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 ${className ?? ''}`}>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  )
}

function MetricDisplay({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <p className="mb-1 text-xs text-slate-400">{label}</p>
      <p className={`text-lg font-bold ${accent ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
    </div>
  )
}
