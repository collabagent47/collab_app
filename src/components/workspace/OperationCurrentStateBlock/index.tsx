import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { OperationData, DataConfidence } from '../../../domain/roi/roi-types'
import { DataBadge } from '../../shared/DataBadge'

interface OperationFormData {
  monthlyConversationsMin: string
  monthlyConversationsLikely: string
  monthlyConversationsMax: string
  currentAttentionRate: string
  teamSize: string
  monthlySalesMin: string
  monthlySalesMax: string
  minutesPerConversation: string
  averageClosingTimeDays: string
}

interface ConfidenceMap {
  [key: string]: DataConfidence
}

interface OperationCurrentStateBlockProps {
  operation: OperationData
  confidenceMap?: ConfidenceMap
  onSave: (operation: OperationData) => void
}

const INPUT_CLASS = 'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150'
const LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-slate-700'

function parseNum(val: string): number | undefined {
  const n = parseFloat(val)
  return isNaN(n) ? undefined : n
}

export function OperationCurrentStateBlock({ operation, confidenceMap = {}, onSave }: OperationCurrentStateBlockProps) {
  const { register, watch } = useForm<OperationFormData>({
    defaultValues: {
      monthlyConversationsMin: operation.monthlyConversationsMin?.toString() ?? '',
      monthlyConversationsLikely: operation.monthlyConversationsLikely?.toString() ?? '',
      monthlyConversationsMax: operation.monthlyConversationsMax?.toString() ?? '',
      currentAttentionRate: operation.currentAttentionRate?.toString() ?? '',
      teamSize: operation.teamSize?.toString() ?? '',
      monthlySalesMin: operation.monthlySalesMin?.toString() ?? '',
      monthlySalesMax: operation.monthlySalesMax?.toString() ?? '',
      minutesPerConversation: operation.minutesPerConversation?.toString() ?? '',
      averageClosingTimeDays: operation.averageClosingTimeDays?.toString() ?? '',
    },
  })

  useEffect(() => {
    const subscription = watch((value) => {
      onSave({
        monthlyConversationsMin: parseNum(value.monthlyConversationsMin ?? ''),
        monthlyConversationsLikely: parseNum(value.monthlyConversationsLikely ?? ''),
        monthlyConversationsMax: parseNum(value.monthlyConversationsMax ?? ''),
        currentAttentionRate: parseNum(value.currentAttentionRate ?? ''),
        teamSize: parseNum(value.teamSize ?? ''),
        monthlySalesMin: parseNum(value.monthlySalesMin ?? ''),
        monthlySalesMax: parseNum(value.monthlySalesMax ?? ''),
        minutesPerConversation: parseNum(value.minutesPerConversation ?? ''),
        averageClosingTimeDays: parseNum(value.averageClosingTimeDays ?? ''),
      })
    })
    return () => subscription.unsubscribe()
  }, [watch, onSave])

  const field = (name: keyof OperationFormData) => ({
    confidence: confidenceMap[name] ?? 'pending' as DataConfidence,
  })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Conversaciones mensuales</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className={LABEL_CLASS}>Mínimo</label>
              <DataBadge confidence={field('monthlyConversationsMin').confidence} />
            </div>
            <input {...register('monthlyConversationsMin')} type="number" className={INPUT_CLASS} placeholder="Ej: 150" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className={LABEL_CLASS}>Probable</label>
              <DataBadge confidence={field('monthlyConversationsLikely').confidence} />
            </div>
            <input {...register('monthlyConversationsLikely')} type="number" className={INPUT_CLASS} placeholder="Ej: 270" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className={LABEL_CLASS}>Máximo</label>
              <DataBadge confidence={field('monthlyConversationsMax').confidence} />
            </div>
            <input {...register('monthlyConversationsMax')} type="number" className={INPUT_CLASS} placeholder="Ej: 400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={LABEL_CLASS}>Atención actual (%)</label>
            <DataBadge confidence={field('currentAttentionRate').confidence} />
          </div>
          <input {...register('currentAttentionRate')} type="number" min={0} max={100} className={INPUT_CLASS} placeholder="Ej: 75" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={LABEL_CLASS}>Tamaño del equipo</label>
            <DataBadge confidence={field('teamSize').confidence} />
          </div>
          <input {...register('teamSize')} type="number" className={INPUT_CLASS} placeholder="Ej: 3" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={LABEL_CLASS}>Ventas mensuales min (COP)</label>
            <DataBadge confidence={field('monthlySalesMin').confidence} />
          </div>
          <input {...register('monthlySalesMin')} type="number" className={INPUT_CLASS} placeholder="Ej: 3000000" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={LABEL_CLASS}>Ventas mensuales max (COP)</label>
            <DataBadge confidence={field('monthlySalesMax').confidence} />
          </div>
          <input {...register('monthlySalesMax')} type="number" className={INPUT_CLASS} placeholder="Ej: 6000000" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={LABEL_CLASS}>Minutos por conversación</label>
            <DataBadge confidence={field('minutesPerConversation').confidence} />
          </div>
          <input {...register('minutesPerConversation')} type="number" className={INPUT_CLASS} placeholder="Ej: 8" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={LABEL_CLASS}>Días promedio de cierre</label>
            <DataBadge confidence={field('averageClosingTimeDays').confidence} />
          </div>
          <input {...register('averageClosingTimeDays')} type="number" className={INPUT_CLASS} placeholder="Ej: 5" />
        </div>
      </div>
    </div>
  )
}
