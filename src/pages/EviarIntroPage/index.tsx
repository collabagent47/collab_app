import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EVIAR_STEPS } from '../../domain/methodology/eviar'

const STEP_COLORS: Record<string, string> = {
  E: 'bg-blue-100 text-blue-700 border-blue-200',
  V: 'bg-violet-100 text-violet-700 border-violet-200',
  I: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  A: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  R: 'bg-amber-100 text-amber-700 border-amber-200',
}

export function EviarIntroPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10 text-center"
      >
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Metodología EVIAR</h1>
        <p className="mx-auto max-w-lg text-slate-500">
          Cinco pasos para explorar el negocio del cliente, identificar fricciones y calcular el retorno de inversión de forma pedagógica.
        </p>
      </motion.div>

      <div className="mb-10 flex flex-col gap-4">
        {EVIAR_STEPS.map((step, index) => (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg font-bold ${STEP_COLORS[step.key]}`}>
                {step.key}
              </span>
              <div className="flex-1">
                <h3 className="mb-1 font-bold text-slate-900">{step.title}</h3>
                <p className="mb-3 text-sm text-slate-600 leading-relaxed">{step.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.questions.slice(0, 3).map((q, qi) => (
                    <span key={qi} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                      {q.length > 60 ? q.slice(0, 60) + '…' : q}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex justify-center"
      >
        <button
          onClick={() => navigate(`/explorations/${id}`)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Comenzar exploración
          <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>
    </div>
  )
}
