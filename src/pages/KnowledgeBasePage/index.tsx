import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Plus, X, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKnowledge } from '../../hooks/useKnowledge'
import { AGROINSUMOS_FRICTIONS, AGROINSUMOS_MODULES } from '../../data/templates/agroinsumos.template'
import { RECOMMENDED_QUESTIONS_BY_STAGE, READY_TO_USE_PHRASES, COMMON_MISTAKES } from '../../data/templates/academy-content'
import type { KnowledgeSuggestion, KnowledgeSuggestionType } from '../../domain/knowledge-base/knowledge-types'
import { cn } from '../../lib/utils'

type TabId = 'frictions' | 'questions' | 'modules' | 'phrases' | 'mistakes'

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'frictions', label: 'Fricciones' },
  { id: 'questions', label: 'Preguntas' },
  { id: 'modules', label: 'Módulos' },
  { id: 'phrases', label: 'Frases' },
  { id: 'mistakes', label: 'Errores' },
]

interface SuggestionFormData {
  type: KnowledgeSuggestionType
  content: string
  sourceExplorationId: string
}

export function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState<TabId>('frictions')
  const [showModal, setShowModal] = useState(false)
  const { suggestions, addSuggestion, deleteSuggestion } = useKnowledge()

  const { register, handleSubmit, reset } = useForm<SuggestionFormData>({
    defaultValues: { type: 'friction', content: '', sourceExplorationId: '' },
  })

  const onSubmitSuggestion = (data: SuggestionFormData) => {
    const suggestion: KnowledgeSuggestion = {
      id: uuidv4(),
      type: data.type,
      content: data.content,
      sourceExplorationId: data.sourceExplorationId || undefined,
      status: 'pending_review',
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
    }
    addSuggestion(suggestion)
    reset()
    setShowModal(false)
  }

  const pendingSuggestions = suggestions.filter((s) => s.status === 'pending_review')

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Base de conocimiento</h1>
          <p className="mt-1 text-sm text-slate-500">Fricciones, preguntas, módulos y frases del equipo Collab.</p>
        </div>
        <div className="flex items-center gap-3">
          {pendingSuggestions.length > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700">
              <Clock className="h-3.5 w-3.5" />
              {pendingSuggestions.length} pendiente{pendingSuggestions.length !== 1 ? 's' : ''} de revisión
            </span>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Sugerir mejora
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-1 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-slate-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        {activeTab === 'frictions' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AGROINSUMOS_FRICTIONS.map((friction) => (
              <div key={friction.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-1 font-semibold text-slate-900">{friction.title}</p>
                <p className="mb-2 text-sm text-slate-600">{friction.description}</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{friction.impactType}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="flex flex-col gap-6">
            {RECOMMENDED_QUESTIONS_BY_STAGE.map((stage) => (
              <div key={stage.stageKey}>
                <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">{stage.stageKey}</span>
                  {stage.stage}
                </h3>
                <div className="flex flex-col gap-2">
                  {stage.questions.map((q, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AGROINSUMOS_MODULES.map((mod) => (
              <div key={mod.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-1 font-semibold text-slate-900">{mod.name}</p>
                <p className="mb-2 text-sm text-slate-600">{mod.description}</p>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">{mod.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'phrases' && (
          <div className="flex flex-col gap-3">
            {READY_TO_USE_PHRASES.map((phrase, i) => (
              <div key={i} className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4">
                <p className="text-sm italic text-indigo-900">{phrase}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="flex flex-col gap-3">
            {COMMON_MISTAKES.map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-700">{i + 1}</span>
                <p className="text-sm text-red-800">{mistake}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {suggestions.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Sugerencias del equipo</h2>
          <div className="flex flex-col gap-3">
            {suggestions.map((s) => (
              <div key={s.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{s.type}</span>
                    {s.status === 'pending_review' && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        <Clock className="h-3 w-3" />
                        Pendiente de revisión
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700">{s.content}</p>
                </div>
                <button
                  onClick={() => deleteSuggestion(s.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestion Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Sugerir mejora</h3>
                <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmitSuggestion)} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Tipo</label>
                  <select
                    {...register('type')}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="friction">Fricción</option>
                    <option value="question">Pregunta</option>
                    <option value="module">Módulo</option>
                    <option value="phrase">Frase</option>
                    <option value="assumption">Supuesto</option>
                    <option value="practice_case">Caso de práctica</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Contenido *</label>
                  <textarea
                    {...register('content', { required: true })}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Describe la mejora que sugieres..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">ID de exploración fuente (opcional)</label>
                  <input
                    {...register('sourceExplorationId')}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="ID de la exploración de origen"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Enviar sugerencia
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
