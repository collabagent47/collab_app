import { TrendingUp, Settings, Layers } from 'lucide-react'
import type { OpportunityType } from '../../../domain/roi/roi-types'
import { cn } from '../../../lib/utils'

interface OpportunitySuggestionCardProps {
  opportunityType: OpportunityType
  frictionCount: number
}

const CONFIG: Record<OpportunityType, {
  icon: React.ReactNode
  title: string
  explanation: string
  gradient: string
  iconBg: string
}> = {
  commercial: {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Oportunidad Comercial',
    explanation: 'Las fricciones identificadas impactan principalmente el proceso de ventas: seguimiento, cotizaciones y tasa de cierre. La automatización debe enfocarse en mejorar la conversión y la velocidad de respuesta.',
    gradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  operational: {
    icon: <Settings className="h-6 w-6" />,
    title: 'Oportunidad Operativa',
    explanation: 'Las fricciones identificadas consumen tiempo del equipo en tareas manuales y repetitivas. La automatización debe enfocarse en liberar horas y reducir errores operativos.',
    gradient: 'from-emerald-50 to-green-50',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  mixed: {
    icon: <Layers className="h-6 w-6" />,
    title: 'Oportunidad Mixta',
    explanation: 'Las fricciones identificadas impactan tanto las ventas como la operación. La automatización puede generar beneficio comercial (más ventas) y beneficio operativo (ahorro de tiempo) simultáneamente.',
    gradient: 'from-violet-50 to-purple-50',
    iconBg: 'bg-violet-100 text-violet-600',
  },
}

export function OpportunitySuggestionCard({ opportunityType, frictionCount }: OpportunitySuggestionCardProps) {
  const config = CONFIG[opportunityType]

  return (
    <div className={cn('rounded-xl bg-gradient-to-br p-6 shadow-sm', config.gradient)}>
      <div className="mb-4 flex items-center gap-4">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', config.iconBg)}>
          {config.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
          <p className="text-sm text-slate-500">
            Basado en {frictionCount} {frictionCount === 1 ? 'fricción identificada' : 'fricciones identificadas'}
          </p>
        </div>
      </div>
      <p className="leading-relaxed text-slate-700">{config.explanation}</p>
    </div>
  )
}
