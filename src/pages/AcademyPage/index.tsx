import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ChevronRight } from 'lucide-react'
import {
  APP_PURPOSE,
  ROI_CONCEPT,
  BASIC_CONCEPTS,
  EVIAR_EXPLANATION,
  RECOMMENDED_QUESTIONS_BY_STAGE,
  COMMON_MISTAKES,
  READY_TO_USE_PHRASES,
  DISCLAIMERS,
} from '../../data/templates/academy-content'
import { PRACTICE_CASES } from '../../data/templates/practice-cases'
import { cn } from '../../lib/utils'

type SectionId =
  | 'purpose'
  | 'what-is-roi'
  | 'why-matters'
  | 'eviar'
  | 'concepts'
  | 'questions'
  | 'mistakes'
  | 'phrases'
  | 'practice'

const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: 'purpose', label: 'Propósito' },
  { id: 'what-is-roi', label: '¿Qué es el ROI?' },
  { id: 'why-matters', label: 'Por qué importa' },
  { id: 'eviar', label: 'Metodología EVIAR' },
  { id: 'concepts', label: 'Conceptos básicos' },
  { id: 'questions', label: 'Preguntas recomendadas' },
  { id: 'mistakes', label: 'Errores comunes' },
  { id: 'phrases', label: 'Frases listas' },
  { id: 'practice', label: 'Casos de práctica' },
]

const DIFFICULTY_LABELS = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' }
const DIFFICULTY_COLORS = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
}

export function AcademyPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('purpose')

  return (
    <div className="flex h-[calc(100dvh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 sm:block">
        <div className="mb-4 flex items-center gap-2 text-slate-700">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-semibold">Academia ROI</span>
        </div>
        <nav className="flex flex-col gap-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                activeSection === section.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100',
              )}
            >
              {section.label}
              {activeSection === section.id && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-w-3xl px-6 py-8"
        >
          {activeSection === 'purpose' && (
            <Article title={APP_PURPOSE.title}>
              {APP_PURPOSE.paragraphs.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-slate-700">{p}</p>)}
            </Article>
          )}

          {activeSection === 'what-is-roi' && (
            <Article title={ROI_CONCEPT.title}>
              <p className="mb-4 leading-relaxed text-slate-700">{ROI_CONCEPT.definition}</p>
              <div className="mb-6 rounded-xl bg-indigo-50 border border-indigo-200 p-4">
                <p className="font-mono text-sm text-indigo-800">{ROI_CONCEPT.formula}</p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-800"><strong>Importante:</strong> {ROI_CONCEPT.importantNote}</p>
              </div>
            </Article>
          )}

          {activeSection === 'why-matters' && (
            <Article title="Por qué importa el ROI en ventas">
              <ul className="flex flex-col gap-3">
                {ROI_CONCEPT.whyItMatters.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{i + 1}</span>
                    <p className="text-sm leading-relaxed text-slate-700">{point}</p>
                  </li>
                ))}
              </ul>
            </Article>
          )}

          {activeSection === 'eviar' && (
            <Article title={EVIAR_EXPLANATION.title}>
              <p className="mb-6 leading-relaxed text-slate-700">{EVIAR_EXPLANATION.overview}</p>
              {EVIAR_EXPLANATION.steps.map((step) => (
                <div key={step.key} className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">{step.key}</span>
                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="mb-2 text-sm text-slate-600">{step.purpose}</p>
                  <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    Resultado: {step.keyOutput}
                  </p>
                </div>
              ))}
            </Article>
          )}

          {activeSection === 'concepts' && (
            <Article title="Conceptos básicos del ROI">
              {BASIC_CONCEPTS.map((concept) => (
                <div key={concept.term} className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-2 font-bold text-slate-900">{concept.term}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-slate-700">{concept.definition}</p>
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                    <strong>Ejemplo:</strong> {concept.example}
                  </p>
                </div>
              ))}
            </Article>
          )}

          {activeSection === 'questions' && (
            <Article title="Preguntas recomendadas por etapa">
              {RECOMMENDED_QUESTIONS_BY_STAGE.map((stage) => (
                <div key={stage.stageKey} className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">{stage.stageKey}</span>
                    <h3 className="font-bold text-slate-900">{stage.stage}</h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {stage.questions.map((q, i) => (
                      <li key={i} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Article>
          )}

          {activeSection === 'mistakes' && (
            <Article title="Errores comunes al usar el ROI">
              <ul className="flex flex-col gap-3">
                {COMMON_MISTAKES.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-700">{i + 1}</span>
                    <p className="text-sm text-red-800">{mistake}</p>
                  </li>
                ))}
              </ul>
            </Article>
          )}

          {activeSection === 'phrases' && (
            <Article title="Frases listas para usar">
              <ul className="flex flex-col gap-3">
                {READY_TO_USE_PHRASES.map((phrase, i) => (
                  <li key={i} className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4">
                    <p className="text-sm italic text-indigo-900">{phrase}</p>
                  </li>
                ))}
              </ul>
            </Article>
          )}

          {activeSection === 'practice' && (
            <Article title="Casos de práctica">
              {PRACTICE_CASES.map((practiceCase) => (
                <div key={practiceCase.id} className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-bold text-slate-900">{practiceCase.title}</h3>
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', DIFFICULTY_COLORS[practiceCase.difficulty])}>
                      {DIFFICULTY_LABELS[practiceCase.difficulty]}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-slate-600">{practiceCase.clientProfile}</p>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm leading-relaxed text-slate-700">{practiceCase.scenario}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">Puntos de aprendizaje</h4>
                    <ul className="flex flex-col gap-1">
                      {practiceCase.learningPoints.map((point, i) => (
                        <li key={i} className="text-sm text-slate-600">· {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-slate-400">
                      Disclaimers: {DISCLAIMERS.roiIsNotAPromise.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              ))}
            </Article>
          )}
        </motion.div>
      </main>
    </div>
  )
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">{title}</h1>
      {children}
    </div>
  )
}
