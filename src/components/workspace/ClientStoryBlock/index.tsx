import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Exploration } from '../../../domain/roi/roi-types'

const schema = z.object({
  clientName: z.string().min(2, 'Mínimo 2 caracteres'),
  sector: z.string().min(2, 'Mínimo 2 caracteres'),
  city: z.string().optional(),
  mainChannel: z.string().optional(),
  mainProduct: z.string().optional(),
  targetCustomer: z.string().optional(),
  improvementGoal: z.string().optional(),
  contactName: z.string().optional(),
  contactRole: z.string().optional(),
  executiveSummary: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface ClientStoryBlockProps {
  exploration: Exploration
  onSave: (updates: Partial<Exploration>) => void
}

function buildNarrative(data: FormData): string {
  const parts: string[] = []
  if (data.clientName) parts.push(`${data.clientName}`)
  if (data.sector) parts.push(`es una empresa del sector ${data.sector}`)
  if (data.city) parts.push(`ubicada en ${data.city}`)
  if (data.mainChannel) parts.push(`que opera principalmente por ${data.mainChannel}`)
  if (data.mainProduct) parts.push(`y comercializa ${data.mainProduct}`)
  if (data.targetCustomer) parts.push(`dirigido a ${data.targetCustomer}`)
  if (data.improvementGoal) parts.push(`Su principal objetivo de mejora es: ${data.improvementGoal}`)
  return parts.join('. ') + (parts.length > 0 ? '.' : '')
}

const INPUT_CLASS = 'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150'
const LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-slate-700'

export function ClientStoryBlock({ exploration, onSave }: ClientStoryBlockProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientName: exploration.clientName ?? '',
      sector: exploration.sector ?? '',
      city: exploration.city ?? '',
      mainChannel: exploration.mainChannel ?? '',
      mainProduct: exploration.mainProduct ?? '',
      targetCustomer: exploration.targetCustomer ?? '',
      improvementGoal: exploration.improvementGoal ?? '',
      contactName: exploration.contactName ?? '',
      contactRole: exploration.contactRole ?? '',
      executiveSummary: exploration.executiveSummary ?? '',
    },
  })

  const watched = watch()

  const handleGenerateNarrative = () => {
    const narrative = buildNarrative(watched)
    setValue('executiveSummary', narrative)
  }

  const onSubmit = (data: FormData) => {
    onSave({
      clientName: data.clientName,
      sector: data.sector,
      city: data.city,
      mainChannel: data.mainChannel,
      mainProduct: data.mainProduct,
      targetCustomer: data.targetCustomer,
      improvementGoal: data.improvementGoal,
      contactName: data.contactName,
      contactRole: data.contactRole,
      executiveSummary: data.executiveSummary,
    })
  }

  // Autosave on blur via onChange
  useEffect(() => {
    const subscription = watch((value) => {
      onSave({
        clientName: value.clientName,
        sector: value.sector,
        city: value.city,
        mainChannel: value.mainChannel,
        mainProduct: value.mainProduct,
        targetCustomer: value.targetCustomer,
        improvementGoal: value.improvementGoal,
        contactName: value.contactName,
        contactRole: value.contactRole,
        executiveSummary: value.executiveSummary,
      })
    })
    return () => subscription.unsubscribe()
  }, [watch, onSave])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLASS}>Nombre del cliente *</label>
          <input {...register('clientName')} className={INPUT_CLASS} placeholder="Ej: Fertilizantes Mix S.A.S." />
          {errors.clientName && <p className="mt-1 text-xs text-red-500">{errors.clientName.message}</p>}
        </div>
        <div>
          <label className={LABEL_CLASS}>Sector *</label>
          <input {...register('sector')} className={INPUT_CLASS} placeholder="Ej: Agroinsumos" />
          {errors.sector && <p className="mt-1 text-xs text-red-500">{errors.sector.message}</p>}
        </div>
        <div>
          <label className={LABEL_CLASS}>Ciudad</label>
          <input {...register('city')} className={INPUT_CLASS} placeholder="Ej: Neiva, Huila" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Canal principal</label>
          <input {...register('mainChannel')} className={INPUT_CLASS} placeholder="Ej: WhatsApp, llamada, presencial" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Producto principal</label>
          <input {...register('mainProduct')} className={INPUT_CLASS} placeholder="Ej: Fertilizante NPK" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Cliente objetivo</label>
          <input {...register('targetCustomer')} className={INPUT_CLASS} placeholder="Ej: Agricultores de papa y maíz" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Objetivo de mejora</label>
          <input {...register('improvementGoal')} className={INPUT_CLASS} placeholder="Ej: Aumentar tasa de cierre" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Nombre del contacto</label>
          <input {...register('contactName')} className={INPUT_CLASS} placeholder="Ej: Andrés García" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Rol del contacto</label>
          <input {...register('contactRole')} className={INPUT_CLASS} placeholder="Ej: Gerente comercial" />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className={LABEL_CLASS}>Narrativa del cliente</label>
          <button
            type="button"
            onClick={handleGenerateNarrative}
            className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
          >
            Generar narrativa
          </button>
        </div>
        <textarea
          {...register('executiveSummary')}
          rows={4}
          className={INPUT_CLASS}
          placeholder="Escribe o genera una narrativa del cliente..."
        />
      </div>
    </form>
  )
}
