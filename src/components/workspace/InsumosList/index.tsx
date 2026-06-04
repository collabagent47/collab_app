import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, X } from 'lucide-react'
import type { Insumo, DataConfidence } from '../../../domain/roi/roi-types'
import { InsumoCard } from '../../exploration/InsumoCard'
import { cn } from '../../../lib/utils'

interface InsumosListProps {
  insumos: Insumo[]
  avgTicketSuggestion: number | null
  onAdd: (partial: Omit<Insumo, 'id'>) => void
  onDelete: (id: string) => void
}

interface InsumoFormData {
  name: string
  category: string
  avgPrice: string
  unit: string
  confidence: DataConfidence
}

const INPUT_CLASS = 'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150'

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

export function InsumosList({ insumos, avgTicketSuggestion, onAdd, onDelete }: InsumosListProps) {
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset } = useForm<InsumoFormData>({
    defaultValues: { confidence: 'assumption' },
  })

  const onSubmit = (data: InsumoFormData) => {
    onAdd({
      name: data.name,
      category: data.category || undefined,
      avgPrice: data.avgPrice ? parseFloat(data.avgPrice) : undefined,
      unit: data.unit || undefined,
      confidence: data.confidence,
    })
    reset({ confidence: 'assumption' })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Insumos / Productos</h3>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {showForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {showForm ? 'Cancelar' : 'Agregar insumo'}
        </button>
      </div>

      {avgTicketSuggestion !== null && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm text-emerald-800">
            Sugerencia de ticket promedio basada en insumos:{' '}
            <strong>{formatCOP(avgTicketSuggestion)}</strong>
          </p>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-indigo-200 bg-indigo-50 p-4"
        >
          <h4 className="mb-3 text-sm font-semibold text-indigo-900">Nuevo insumo</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <input {...register('name', { required: true })} className={INPUT_CLASS} placeholder="Nombre del insumo *" />
            </div>
            <input {...register('category')} className={INPUT_CLASS} placeholder="Categoría" />
            <input {...register('unit')} className={INPUT_CLASS} placeholder="Unidad (ej: litro, kg)" />
            <input {...register('avgPrice')} type="number" className={INPUT_CLASS} placeholder="Precio promedio COP" />
            <select {...register('confidence')} className={cn(INPUT_CLASS, 'bg-white')}>
              <option value="assumption">Supuesto</option>
              <option value="confirmed">Confirmado</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Guardar insumo
          </button>
        </form>
      )}

      {insumos.length === 0 && !showForm && (
        <p className="rounded-xl border border-dashed border-slate-300 py-6 text-center text-sm text-slate-400">
          Aún no hay insumos. Agrega los productos que el cliente comercializa.
        </p>
      )}

      {insumos.map((insumo) => (
        <InsumoCard key={insumo.id} insumo={insumo} onDelete={onDelete} />
      ))}
    </div>
  )
}
