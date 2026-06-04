import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Plus, X, ArrowLeft, Save } from 'lucide-react'
import { useExploration } from '../../hooks/useExploration'
import type { SessionPreparation, SessionType } from '../../domain/roi/roi-types'
import { SESSION_TYPE_LABELS } from '../../lib/constants'

interface SessionFormData {
  sessionType: SessionType
  objective: string
}

const INPUT_CLASS = 'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150'
const LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-slate-700'

export function SessionPreparationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { exploration, save } = useExploration(id)

  const { register, handleSubmit } = useForm<SessionFormData>({
    defaultValues: { sessionType: 'first_meeting', objective: '' },
  })

  const [questions, setQuestions] = useState<string[]>([''])
  const [pendingData, setPendingData] = useState<string[]>([''])
  const [assumptions, setAssumptions] = useState<string[]>([''])
  const [checklist, setChecklist] = useState<string[]>([''])

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ''])
  }

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = (data: SessionFormData) => {
    if (!exploration) return
    const session: SessionPreparation = {
      id: uuidv4(),
      sessionType: data.sessionType,
      objective: data.objective,
      questions: questions.filter(Boolean),
      pendingData: pendingData.filter(Boolean),
      assumptions: assumptions.filter(Boolean),
      checklist: checklist.filter(Boolean),
      createdAt: new Date().toISOString(),
    }
    save({ sessionPreparations: [...exploration.sessionPreparations, session] })
    navigate(`/explorations/${id}`)
  }

  if (!exploration) return null

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate(`/explorations/${id}`)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Preparar sesión</h1>
          <p className="text-sm text-slate-500">{exploration.clientName}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL_CLASS}>Tipo de sesión</label>
            <select {...register('sessionType')} className={INPUT_CLASS + ' bg-white'}>
              {Object.entries(SESSION_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Objetivo de la sesión</label>
            <input {...register('objective', { required: true })} className={INPUT_CLASS} placeholder="Ej: Validar supuestos de ROI" />
          </div>
        </div>

        <DynamicList
          title="Preguntas para la sesión"
          items={questions}
          placeholder="Ej: ¿Cuál es tu margen bruto promedio?"
          onAdd={() => addItem(setQuestions)}
          onUpdate={(i, v) => updateItem(setQuestions, i, v)}
          onRemove={(i) => removeItem(setQuestions, i)}
        />

        <DynamicList
          title="Datos pendientes a obtener"
          items={pendingData}
          placeholder="Ej: Confirmar el margen bruto con Andrés"
          onAdd={() => addItem(setPendingData)}
          onUpdate={(i, v) => updateItem(setPendingData, i, v)}
          onRemove={(i) => removeItem(setPendingData, i)}
        />

        <DynamicList
          title="Supuestos activos"
          items={assumptions}
          placeholder="Ej: Ticket promedio estimado en $350.000"
          onAdd={() => addItem(setAssumptions)}
          onUpdate={(i, v) => updateItem(setAssumptions, i, v)}
          onRemove={(i) => removeItem(setAssumptions, i)}
        />

        <DynamicList
          title="Checklist antes de la sesión"
          items={checklist}
          placeholder="Ej: Revisar ROI calculado con datos actuales"
          onAdd={() => addItem(setChecklist)}
          onUpdate={(i, v) => updateItem(setChecklist, i, v)}
          onRemove={(i) => removeItem(setChecklist, i)}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <Save className="h-4 w-4" />
            Guardar preparación
          </button>
        </div>
      </form>
    </div>
  )
}

function DynamicList({
  title, items, placeholder, onAdd, onUpdate, onRemove,
}: {
  title: string
  items: string[]
  placeholder: string
  onAdd: () => void
  onUpdate: (index: number, value: string) => void
  onRemove: (index: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{title}</label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
        >
          <Plus className="h-3 w-3" />
          Agregar
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder={placeholder}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
