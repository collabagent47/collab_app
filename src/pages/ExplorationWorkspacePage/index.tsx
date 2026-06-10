import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Presentation } from 'lucide-react'
import { useExploration } from '../../hooks/useExploration'
import { useInsumos } from '../../hooks/useInsumos'
import { useROI } from '../../hooks/useROI'
import { useKnowledge } from '../../hooks/useKnowledge'
import { useAppMode } from '../../hooks/useAppMode'
import { EviarProgressBar } from '../../components/shared/EviarProgressBar'
import { LearnerHint } from '../../components/shared/LearnerHint'
import { QualityWarning } from '../../components/shared/QualityWarning'
import { LiveInsightPanel } from '../../components/workspace/LiveInsightPanel'
import { ClientStoryBlock } from '../../components/workspace/ClientStoryBlock'
import { OperationCurrentStateBlock } from '../../components/workspace/OperationCurrentStateBlock'
import { InsumosList } from '../../components/workspace/InsumosList'
import { ROIInputPanel } from '../../components/workspace/ROIInputPanel'
import { ExecutiveSummaryEditor } from '../../components/workspace/ExecutiveSummaryEditor'
import { FrictionCard } from '../../components/exploration/FrictionCard'
import { OpportunitySuggestionCard } from '../../components/exploration/OpportunitySuggestionCard'
import { AutomationModuleCard } from '../../components/exploration/AutomationModuleCard'
import { ROIScenarioCard } from '../../components/exploration/ROIScenarioCard'
import type { RecommendedModule } from '../../domain/knowledge-base/knowledge-types'
import type { ROIInputs } from '../../domain/roi/roi-types'
import { inferOpportunityType } from '../../domain/roi/opportunity-type'
import { EVIAR_STEPS } from '../../domain/methodology/eviar'
import { cn } from '../../lib/utils'

const STEP_HINTS: Record<string, string> = {
  E: 'Antes de llenar datos, pregunta primero. Usa las preguntas guía del paso E para entender el contexto del cliente.',
  V: 'Selecciona solo las fricciones que el cliente mencionó o confirmó. No selecciones todo por defecto.',
  I: 'El tipo de oportunidad se sugiere automáticamente según las fricciones seleccionadas. Valídalo con el cliente.',
  A: 'No automatices lo que no entiendes. Prioriza los módulos que resuelven las fricciones más dolorosas.',
  R: 'Muestra primero la narrativa, luego los números. El ROI es una estimación, no una promesa.',
}

type EviarKey = 'E' | 'V' | 'I' | 'A' | 'R'

export function ExplorationWorkspacePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { exploration, save, saveWithDebounce } = useExploration(id)
  const { insumos, addInsumo, removeInsumo, avgTicketSuggestion } = useInsumos(id)
  const { results, warnings, calculate } = useROI()
  const { frictions, modules } = useKnowledge(exploration?.sector)
  const { userMode } = useAppMode()
  const [activeStep, setActiveStep] = useState<EviarKey>('E')

  const stepIndex = EVIAR_STEPS.findIndex((s) => s.key === activeStep)

  const handleFrictionToggle = useCallback((frictionId: string) => {
    if (!exploration) return
    const current = exploration.frictionIds
    const updated = current.includes(frictionId)
      ? current.filter((id) => id !== frictionId)
      : [...current, frictionId]

    const oppType = inferOpportunityType(updated, frictions)
    save({ frictionIds: updated, opportunityType: oppType })
  }, [exploration, frictions, save])

  const handleModuleStatusChange = useCallback((moduleId: string, status: RecommendedModule['status']) => {
    if (!exploration) return
    const updated = exploration.recommendedModules.map((m) =>
      m.id === moduleId ? { ...m, status } : m,
    )
    save({ recommendedModules: updated })
  }, [exploration, save])

  const handleCalculate = useCallback((inputs: ROIInputs) => {
    if (!exploration) return
    calculate(inputs, exploration.operation)
    const scenarios = results
    if (scenarios) {
      save({ roiResults: scenarios, roiInputs: inputs, status: 'roi_calculated' })
    }
  }, [exploration, calculate, results, save])

  if (!exploration) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    )
  }

  const displayModules = exploration.recommendedModules.length > 0
    ? exploration.recommendedModules
    : modules

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {/* Left: EVIAR Progress */}
      <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 lg:block">
        <EviarProgressBar
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
        <div className="mt-6 border-t border-slate-200 pt-4">
          <button
            onClick={() => navigate(`/explorations/${id}/present`)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            <Presentation className="h-4 w-4" />
            Modo presentación
          </button>
          <button
            onClick={() => navigate(`/explorations/${id}/preparation`)}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            Preparar sesión
          </button>
        </div>
      </aside>

      {/* Center: content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-slate-900">{exploration.clientName}</h1>
              <p className="text-sm text-slate-500">{exploration.sector}</p>
            </div>
            <div className="ml-4 flex shrink-0 items-center gap-2 text-sm text-slate-400">
              <span>{stepIndex + 1} / {EVIAR_STEPS.length}</span>
            </div>
          </div>

          {/* Mobile step navigation — replaces left sidebar on small screens */}
          <nav className="mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {EVIAR_STEPS.map((step) => (
              <button
                key={step.key}
                onClick={() => setActiveStep(step.key as EviarKey)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  activeStep === step.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                <span className="font-bold">{step.key}</span>
                <span>{step.title}</span>
              </button>
            ))}
          </nav>

          {userMode === 'learner' && (
            <LearnerHint hint={STEP_HINTS[activeStep]} className="mb-5" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {activeStep === 'E' && (
                <div className="flex flex-col gap-6">
                  <SectionHeader title="Entender" subtitle="Captura la historia y el contexto operativo del cliente." />
                  <ClientStoryBlock exploration={exploration} onSave={saveWithDebounce} />
                  <OperationCurrentStateBlock
                    operation={exploration.operation}
                    onSave={(op) => saveWithDebounce({ operation: op })}
                  />
                  <InsumosList
                    insumos={insumos}
                    avgTicketSuggestion={avgTicketSuggestion}
                    onAdd={addInsumo}
                    onDelete={removeInsumo}
                  />
                </div>
              )}

              {activeStep === 'V' && (
                <div className="flex flex-col gap-4">
                  <SectionHeader title="Ver fricciones" subtitle="Selecciona las fricciones que el cliente tiene en su proceso." />
                  {frictions.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-sm text-slate-400">
                      No hay fricciones cargadas para este sector.
                    </p>
                  )}
                  {frictions.map((friction) => (
                    <FrictionCard
                      key={friction.id}
                      friction={friction}
                      selected={exploration.frictionIds.includes(friction.id)}
                      onToggle={handleFrictionToggle}
                    />
                  ))}
                </div>
              )}

              {activeStep === 'I' && (
                <div className="flex flex-col gap-4">
                  <SectionHeader title="Identificar oportunidades" subtitle="Clasifica el tipo de oportunidad basado en las fricciones seleccionadas." />
                  {exploration.frictionIds.length === 0 ? (
                    <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                      Vuelve al paso V y selecciona al menos una fricción para identificar la oportunidad.
                    </p>
                  ) : (
                    <OpportunitySuggestionCard
                      opportunityType={exploration.opportunityType ?? 'mixed'}
                      frictionCount={exploration.frictionIds.length}
                    />
                  )}
                </div>
              )}

              {activeStep === 'A' && (
                <div className="flex flex-col gap-4">
                  <SectionHeader title="Automatizar con criterio" subtitle="Configura el estado de cada módulo de automatización." />
                  {displayModules.map((mod) => (
                    <AutomationModuleCard
                      key={mod.id}
                      module={mod}
                      onStatusChange={handleModuleStatusChange}
                    />
                  ))}
                </div>
              )}

              {activeStep === 'R' && (
                <div className="flex flex-col gap-6">
                  <SectionHeader title="Retorno estimado" subtitle="Ingresa los datos financieros y calcula los tres escenarios ROI." />
                  {warnings.length > 0 && <QualityWarning warnings={warnings} />}
                  <ROIInputPanel
                    inputs={exploration.roiInputs}
                    avgTicketSuggestion={avgTicketSuggestion}
                    onSave={(inputs) => saveWithDebounce({ roiInputs: inputs })}
                    onCalculate={handleCalculate}
                  />
                  {(results ?? exploration.roiResults) && (
                    <>
                      {/* Narrativa ANTES que números — regla de negocio 67 */}
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                        <p className="mb-1 text-sm font-semibold text-slate-800">¿Qué estamos midiendo?</p>
                        <p className="text-sm text-slate-600">
                          Esta estimación separa el <strong>ahorro operativo</strong> (tiempo liberado del equipo)
                          del <strong>beneficio comercial</strong> (mejora en ventas usando el margen bruto, no ventas brutas).
                          Juntos forman el beneficio total proyectado.
                        </p>
                        <p className="mt-2 text-xs text-amber-700">
                          Esta es una estimación prudente, no una promesa de ventas. Los resultados reales dependen de múltiples factores y deben validarse con el cliente.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {(['conservative', 'medium', 'optimistic'] as const).map((scenario) => {
                          const scenarioResult = results?.[scenario] ?? exploration.roiResults?.[scenario]
                          if (!scenarioResult) return null
                          return (
                            <ROIScenarioCard
                              key={scenario}
                              scenario={scenario}
                              result={scenarioResult}
                              isHighlighted={scenario === 'optimistic'}
                              allResults={results ?? exploration.roiResults}
                            />
                          )
                        })}
                      </div>
                    </>
                  )}
                  <ExecutiveSummaryEditor
                    exploration={exploration}
                    onSave={(summary) => saveWithDebounce({ executiveSummary: summary })}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
            <button
              onClick={() => setActiveStep(EVIAR_STEPS[Math.max(0, stepIndex - 1)].key as EviarKey)}
              disabled={stepIndex === 0}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </button>
            <button
              onClick={() => setActiveStep(EVIAR_STEPS[Math.min(4, stepIndex + 1)].key as EviarKey)}
              disabled={stepIndex === 4}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Right: Live Insight */}
      <aside className="hidden w-60 shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-50 p-4 xl:block">
        <LiveInsightPanel exploration={exploration} />
      </aside>
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  )
}
