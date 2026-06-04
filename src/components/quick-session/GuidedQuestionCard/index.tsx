import type { GuidedQuestionAnswer, AnswerStatus } from '../../../domain/session/session-types'

interface Props {
  question: GuidedQuestionAnswer
  onChange: (updated: GuidedQuestionAnswer) => void
}

const STATUS_CONFIG: Record<AnswerStatus, { label: string; border: string; pill: string }> = {
  confirmed: {
    label: 'Confirmado',
    border: 'border-l-emerald-500',
    pill: 'bg-emerald-100 text-emerald-800 ring-emerald-300',
  },
  assumption: {
    label: 'Supuesto',
    border: 'border-l-amber-500',
    pill: 'bg-amber-100 text-amber-800 ring-amber-300',
  },
  pending: {
    label: 'Pendiente',
    border: 'border-l-slate-400',
    pill: 'bg-slate-100 text-slate-700 ring-slate-300',
  },
}

const STATUSES: AnswerStatus[] = ['confirmed', 'assumption', 'pending']

export function GuidedQuestionCard({ question, onChange }: Props) {
  const config = STATUS_CONFIG[question.status]

  function handleAnswerBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    onChange({
      ...question,
      answer: e.target.value,
      updatedAt: new Date().toISOString(),
    })
  }

  function handleStatusChange(status: AnswerStatus) {
    onChange({
      ...question,
      status,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div
      className={`rounded-xl border border-slate-200 border-l-4 ${config.border} bg-white p-4 flex flex-col gap-3 shadow-sm`}
    >
      <p className="text-sm font-semibold text-slate-800">{question.question}</p>

      <textarea
        defaultValue={question.answer ?? ''}
        onBlur={handleAnswerBlur}
        rows={2}
        placeholder="Escribe la respuesta aquí..."
        className="w-full resize-none rounded-lg border border-slate-200 bg-[#FBFBFA] px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
      />

      <div className="flex gap-2">
        {STATUSES.map((s) => {
          const c = STATUS_CONFIG[s]
          const isActive = question.status === s
          return (
            <button
              key={s}
              type="button"
              onClick={() => handleStatusChange(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition-all ${c.pill} ${isActive ? 'ring-2 opacity-100' : 'opacity-60 hover:opacity-90'}`}
            >
              {c.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
