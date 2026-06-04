import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { FollowUpLossInputs, FollowUpLossResult } from '../../../domain/sales-opportunity/follow-up-loss-types'
import { calculateOpportunity } from '../../../services/followUpLossService'

const schema = z.object({
  monthlyLeads: z.string().min(1, 'Requerido'),
  averageTicket: z.string().min(1, 'Requerido'),
  lostLeadsByPoorFollowUp: z.string().min(1, 'Requerido'),
  closedDeals: z.string().min(1, 'Requerido'),
})

type FormValues = z.infer<typeof schema>

interface Props {
  onResult: (result: FollowUpLossResult, inputs: FollowUpLossInputs) => void
}

const LABEL_CLASS = 'block text-sm font-medium text-slate-700 mb-1.5'
const INPUT_CLASS =
  'w-full rounded-xl border border-slate-200 bg-[#FBFBFA] px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors'
const ERROR_CLASS = 'mt-1 text-xs text-red-500'

export function FollowUpLossCalculator({ onResult }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(values: FormValues) {
    const inputs: FollowUpLossInputs = {
      monthlyLeads: Number(values.monthlyLeads),
      averageTicket: Number(values.averageTicket),
      lostLeadsByPoorFollowUp: Number(values.lostLeadsByPoorFollowUp),
      closedDeals: Number(values.closedDeals),
    }
    const result = calculateOpportunity(inputs)
    onResult(result, inputs)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-lg font-bold text-slate-900">Oportunidad por mal seguimiento</h2>

      <div>
        <label className={LABEL_CLASS}>
          Leads por mes
          <span className="ml-1 font-normal text-slate-400 text-xs">— ¿Cuántos prospectos les llegan al mes?</span>
        </label>
        <input
          {...register('monthlyLeads')}
          type="text"
          inputMode="numeric"
          placeholder="Ej: 120"
          className={INPUT_CLASS}
        />
        {errors.monthlyLeads && <p className={ERROR_CLASS}>{errors.monthlyLeads.message}</p>}
      </div>

      <div>
        <label className={LABEL_CLASS}>
          Ticket promedio (COP)
          <span className="ml-1 font-normal text-slate-400 text-xs">— Venta promedio por cliente</span>
        </label>
        <input
          {...register('averageTicket')}
          type="text"
          inputMode="numeric"
          placeholder="Ej: 400000"
          className={INPUT_CLASS}
        />
        {errors.averageTicket && <p className={ERROR_CLASS}>{errors.averageTicket.message}</p>}
      </div>

      <div>
        <label className={LABEL_CLASS}>
          Leads perdidos por mal seguimiento
          <span className="ml-1 font-normal text-slate-400 text-xs">— Sin respuesta, sin seguimiento</span>
        </label>
        <input
          {...register('lostLeadsByPoorFollowUp')}
          type="text"
          inputMode="numeric"
          placeholder="Ej: 40"
          className={INPUT_CLASS}
        />
        {errors.lostLeadsByPoorFollowUp && (
          <p className={ERROR_CLASS}>{errors.lostLeadsByPoorFollowUp.message}</p>
        )}
      </div>

      <div>
        <label className={LABEL_CLASS}>
          Cierres actuales por mes
          <span className="ml-1 font-normal text-slate-400 text-xs">— Cuántos logran cerrar</span>
        </label>
        <input
          {...register('closedDeals')}
          type="text"
          inputMode="numeric"
          placeholder="Ej: 15"
          className={INPUT_CLASS}
        />
        {errors.closedDeals && <p className={ERROR_CLASS}>{errors.closedDeals.message}</p>}
      </div>

      <button
        type="submit"
        className="mt-1 flex items-center justify-center rounded-xl bg-[#10B981] py-3 font-semibold text-white transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        Calcular oportunidad
      </button>
    </form>
  )
}
