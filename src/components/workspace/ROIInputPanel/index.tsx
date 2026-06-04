import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calculator } from 'lucide-react'
import type { ROIInputs } from '../../../domain/roi/roi-types'
import { QualityWarning } from '../../shared/QualityWarning'

const schema = z.object({
  averageTicket: z.string().optional(),
  grossMargin: z.string().optional(),
  currentCloseRate: z.string().optional(),
  expectedCloseRate: z.string().optional(),
  monthlyInvestment: z.string().optional(),
  hourlyCost: z.string().optional(),
  automationPercentage: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface ROIInputPanelProps {
  inputs: ROIInputs
  avgTicketSuggestion?: number | null
  onSave: (inputs: ROIInputs) => void
  onCalculate: (inputs: ROIInputs) => void
}

const INPUT_CLASS = 'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150'
const LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-slate-700'

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

function parseNum(val: string | undefined): number | undefined {
  if (!val) return undefined
  const n = parseFloat(val)
  return isNaN(n) ? undefined : n
}

function formToInputs(data: FormData): ROIInputs {
  return {
    averageTicket: parseNum(data.averageTicket),
    grossMargin: parseNum(data.grossMargin) !== undefined ? parseNum(data.grossMargin)! / 100 : undefined,
    currentCloseRate: parseNum(data.currentCloseRate) !== undefined ? parseNum(data.currentCloseRate)! / 100 : undefined,
    expectedCloseRate: parseNum(data.expectedCloseRate) !== undefined ? parseNum(data.expectedCloseRate)! / 100 : undefined,
    monthlyInvestment: parseNum(data.monthlyInvestment),
    hourlyCost: parseNum(data.hourlyCost),
    automationPercentage: parseNum(data.automationPercentage) !== undefined ? parseNum(data.automationPercentage)! / 100 : undefined,
  }
}

export function ROIInputPanel({ inputs, avgTicketSuggestion, onSave, onCalculate }: ROIInputPanelProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      averageTicket: inputs.averageTicket?.toString() ?? '',
      grossMargin: inputs.grossMargin !== undefined ? (inputs.grossMargin * 100).toString() : '',
      currentCloseRate: inputs.currentCloseRate !== undefined ? (inputs.currentCloseRate * 100).toString() : '',
      expectedCloseRate: inputs.expectedCloseRate !== undefined ? (inputs.expectedCloseRate * 100).toString() : '',
      monthlyInvestment: inputs.monthlyInvestment?.toString() ?? '',
      hourlyCost: inputs.hourlyCost?.toString() ?? '',
      automationPercentage: inputs.automationPercentage !== undefined ? (inputs.automationPercentage * 100).toString() : '',
    },
  })

  const grossMarginValue = watch('grossMargin')
  const showMarginWarning = !grossMarginValue || grossMarginValue === ''

  useEffect(() => {
    const subscription = watch((value) => {
      onSave(formToInputs(value as FormData))
    })
    return () => subscription.unsubscribe()
  }, [watch, onSave])

  const onSubmit = (data: FormData) => {
    const roiInputs = formToInputs(data)
    onCalculate(roiInputs)
  }

  const applyTicketSuggestion = () => {
    if (avgTicketSuggestion !== null && avgTicketSuggestion !== undefined) {
      setValue('averageTicket', avgTicketSuggestion.toString())
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {showMarginWarning && (
        <QualityWarning
          warnings={['El margen bruto es necesario para calcular el beneficio comercial. Si no lo conoces, márcalo como supuesto y valida con el cliente.']}
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className={LABEL_CLASS}>Ticket promedio (COP)</label>
            {avgTicketSuggestion !== null && avgTicketSuggestion !== undefined && (
              <button
                type="button"
                onClick={applyTicketSuggestion}
                className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                Usar {formatCOP(avgTicketSuggestion)} sugerido
              </button>
            )}
          </div>
          <input {...register('averageTicket')} type="text" inputMode="numeric" className={INPUT_CLASS} placeholder="Ej: 350000" />
        </div>

        <div>
          <label className={LABEL_CLASS}>Margen bruto (%)</label>
          <input {...register('grossMargin')} type="text" inputMode="numeric" min={0} max={100} step={0.1} className={INPUT_CLASS} placeholder="Ej: 20" />
        </div>

        <div>
          <label className={LABEL_CLASS}>Tasa de cierre actual (%)</label>
          <input {...register('currentCloseRate')} type="text" inputMode="numeric" min={0} max={100} step={0.1} className={INPUT_CLASS} placeholder="Ej: 10" />
        </div>

        <div>
          <label className={LABEL_CLASS}>Tasa de cierre esperada (%)</label>
          <input {...register('expectedCloseRate')} type="text" inputMode="numeric" min={0} max={100} step={0.1} className={INPUT_CLASS} placeholder="Ej: 13" />
        </div>

        <div>
          <label className={LABEL_CLASS}>Inversión mensual (COP)</label>
          <input {...register('monthlyInvestment')} type="text" inputMode="numeric" className={INPUT_CLASS} placeholder="Ej: 700000" />
        </div>

        <div>
          <label className={LABEL_CLASS}>Costo hora del equipo (COP)</label>
          <input {...register('hourlyCost')} type="text" inputMode="numeric" className={INPUT_CLASS} placeholder="Ej: 15000" />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS}>% automatizable de conversaciones</label>
          <input {...register('automationPercentage')} type="text" inputMode="numeric" min={0} max={100} step={1} className={INPUT_CLASS} placeholder="Ej: 60" />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-indigo-700"
      >
        <Calculator className="h-4 w-4" />
        Calcular ROI
      </button>
    </form>
  )
}
