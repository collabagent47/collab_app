import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useExplorationStore } from '../../stores/explorationStore'
import { GuidedQuestionsPanel } from '../../components/quick-session/GuidedQuestionsPanel'
import { FollowUpLossCalculator } from '../../components/quick-session/FollowUpLossCalculator'
import { FollowUpLossResultCard } from '../../components/quick-session/FollowUpLossResultCard'
import {
  MiniProposalEditor,
  generateProposal,
  type MiniProposalData,
} from '../../components/quick-session/MiniProposalEditor'
import type { GuidedQuestionAnswer } from '../../domain/session/session-types'
import type { FollowUpLossInputs, FollowUpLossResult } from '../../domain/sales-opportunity/follow-up-loss-types'
import type { Exploration } from '../../domain/roi/roi-types'

// ---------------------------------------------------------------------------
// Inicialización de preguntas guía
// ---------------------------------------------------------------------------

function initAnswers(): GuidedQuestionAnswer[] {
  const now = new Date().toISOString()
  const questions = [
    '¿Cuál es el nombre del cliente?',
    '¿Qué vende?',
    '¿A quién le vende?',
    '¿Por qué canal llegan sus clientes?',
    '¿Qué quiere mejorar?',
  ]
  return questions.map((q, i) => ({
    id: `q-understand-${i + 1}`,
    eviarStep: 'understand' as const,
    question: q,
    answer: '',
    status: 'pending' as const,
    isImportant: false,
    isPresentable: false,
    createdAt: now,
    updatedAt: now,
  }))
}

// ---------------------------------------------------------------------------
// Animación de transición entre pasos
// ---------------------------------------------------------------------------

const STEP_VARIANTS = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function QuickSessionPage() {
  const navigate = useNavigate()
  const { createExploration } = useExplorationStore()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [answers, setAnswers] = useState<GuidedQuestionAnswer[]>(initAnswers)
  const [calcResult, setCalcResult] = useState<FollowUpLossResult | null>(null)
  const [calcInputs, setCalcInputs] = useState<FollowUpLossInputs | null>(null)
  const [proposal, setProposal] = useState<MiniProposalData | null>(null)

  // -----------------------------------------------------------------------
  // Helpers de navegación
  // -----------------------------------------------------------------------

  function getClientName() {
    return (
      answers.find((a) => a.question.toLowerCase().includes('nombre'))?.answer?.trim() ??
      'Cliente sin nombre'
    )
  }

  function canAdvanceStep1() {
    const nameAnswer = answers.find((a) => a.question.toLowerCase().includes('nombre'))
    return (nameAnswer?.answer ?? '').trim().length >= 2
  }

  function handleAdvanceToStep2() {
    if (!canAdvanceStep1()) return
    setStep(2)
  }

  function handleAdvanceToStep3() {
    if (!calcResult) return
    const clientName = getClientName()
    const draft = generateProposal(clientName, calcResult.expectedLostSales)
    setProposal(draft)
    setStep(3)
  }

  function handleCalcResult(result: FollowUpLossResult, inputs: FollowUpLossInputs) {
    setCalcResult(result)
    setCalcInputs(inputs)
  }

  // -----------------------------------------------------------------------
  // Finalizar: guardar exploración y navegar
  // -----------------------------------------------------------------------

  function handleFinish(savedProposal: MiniProposalData) {
    const now = new Date().toISOString()
    const clientName = getClientName()
    const sector =
      answers.find((a) => a.question.toLowerCase().includes('vende'))?.answer ?? ''

    const exploration: Exploration = {
      id: crypto.randomUUID(),
      clientName,
      sector,
      status: 'draft',
      explorationType: 'quick',
      guidedAnswers: answers,
      sessionPreparations: [],
      operation: {},
      insumos: [],
      frictionIds: [],
      recommendedModules: [],
      roiInputs: {
        averageTicket: calcInputs?.averageTicket,
        currentCloseRate: calcResult?.closeRate,
      },
      executiveSummary: savedProposal.problemDetected,
      createdAt: now,
      updatedAt: now,
    }

    createExploration(exploration)
    navigate(`/explorations/${exploration.id}`)
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className="h-dvh bg-[#FBFBFA] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-base font-semibold text-slate-900">
          Sesión rápida · Paso {step} de 3
        </h1>
        <div className="flex gap-1.5">
          {([1, 2, 3] as const).map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 bg-[#10B981]'
                  : s < step
                  ? 'w-8 bg-emerald-300'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Contenido central */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22 }}
              >
                <h2 className="mb-1 text-xl font-bold text-[#0F172A]">Contexto mínimo</h2>
                <p className="mb-6 text-sm text-slate-500">
                  Responde las preguntas clave sobre el cliente para contextualizar la sesión.
                </p>
                <GuidedQuestionsPanel answers={answers} onUpdate={setAnswers} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22 }}
              >
                <h2 className="mb-1 text-xl font-bold text-[#0F172A]">Fricción principal</h2>
                <p className="mb-6 text-sm text-slate-500">
                  Ingresa los datos de seguimiento del cliente para estimar la oportunidad.
                </p>

                <FollowUpLossCalculator onResult={handleCalcResult} />

                {calcResult && (
                  <div className="mt-6">
                    <FollowUpLossResultCard result={calcResult} />
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && proposal && (
              <motion.div
                key="step3"
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22 }}
              >
                <h2 className="mb-1 text-xl font-bold text-[#0F172A]">Mini propuesta</h2>
                <p className="mb-6 text-sm text-slate-500">
                  Revisa y edita el borrador generado. Cada sección es editable.
                </p>
                <MiniProposalEditor
                  initialData={proposal}
                  clientName={getClientName()}
                  onSave={handleFinish}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Barra de navegación inferior */}
      <footer className="shrink-0 border-t border-slate-200 bg-white px-6 py-4 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
          disabled={step === 1}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </button>

        {step === 1 && (
          <button
            type="button"
            onClick={handleAdvanceToStep2}
            disabled={!canAdvanceStep1()}
            className="flex items-center gap-2 rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {step === 2 && (
          <button
            type="button"
            onClick={handleAdvanceToStep3}
            disabled={!calcResult}
            className="flex items-center gap-2 rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuar
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {/* En paso 3 el botón final está dentro del MiniProposalEditor */}
        {step === 3 && <div />}
      </footer>
    </div>
  )
}
