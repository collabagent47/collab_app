import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FileText } from 'lucide-react'
import type { Exploration } from '../../../domain/roi/roi-types'
import { DATA_QUALITY_LABELS } from '../../../lib/constants'

interface ExecutiveSummaryEditorProps {
  exploration: Exploration
  onSave: (summary: string) => void
}

interface FormData {
  summary: string
}

function buildDraft(exploration: Exploration): string {
  const lines: string[] = []

  lines.push(`CONTEXTO`)
  lines.push(`${exploration.clientName} opera en el sector ${exploration.sector}${exploration.city ? ` en ${exploration.city}` : ''}. Canal principal: ${exploration.mainChannel ?? 'no especificado'}.`)
  lines.push('')

  lines.push(`FRICCIONES IDENTIFICADAS`)
  if (exploration.frictionIds.length > 0) {
    lines.push(`Se identificaron ${exploration.frictionIds.length} fricciones en el proceso comercial y operativo.`)
  } else {
    lines.push('Pendiente: no se han seleccionado fricciones.')
  }
  lines.push('')

  lines.push(`TIPO DE OPORTUNIDAD`)
  lines.push(exploration.opportunityType
    ? `La oportunidad es de tipo ${exploration.opportunityType === 'commercial' ? 'comercial' : exploration.opportunityType === 'operational' ? 'operativo' : 'mixto'}.`
    : 'Pendiente: no se ha determinado el tipo de oportunidad.')
  lines.push('')

  lines.push(`AUTOMATIZACIÓN SUGERIDA`)
  const mvpModules = exploration.recommendedModules.filter((m) => m.status === 'included_mvp')
  if (mvpModules.length > 0) {
    lines.push(`Módulos MVP: ${mvpModules.map((m) => m.name).join(', ')}.`)
  } else {
    lines.push('Pendiente: no se han configurado los módulos de automatización.')
  }
  lines.push('')

  lines.push(`VALOR ESTIMADO`)
  if (exploration.roiResults) {
    const opt = exploration.roiResults.optimistic
    lines.push(`Escenario optimista: beneficio total estimado de ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(opt.totalBenefit)} mensuales. ROI: ${opt.financialROI.toFixed(1)}%.`)
  } else {
    lines.push('Pendiente: el ROI aún no ha sido calculado.')
  }
  lines.push('')

  if (exploration.dataQuality) {
    lines.push(`CONFIANZA EN LOS DATOS`)
    lines.push(`Calidad de datos: ${DATA_QUALITY_LABELS[exploration.dataQuality]}. Los supuestos deben ser validados con el cliente.`)
    lines.push('')
  }

  lines.push(`PRÓXIMO PASO`)
  lines.push('Agendar sesión de validación de supuestos con el cliente antes de presentar la propuesta formal.')

  return lines.join('\n')
}

export function ExecutiveSummaryEditor({ exploration, onSave }: ExecutiveSummaryEditorProps) {
  const { register, watch, setValue } = useForm<FormData>({
    defaultValues: { summary: exploration.executiveSummary ?? '' },
  })

  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.summary ?? '')
    })
    return () => subscription.unsubscribe()
  }, [watch, onSave])

  const handleGenerateDraft = () => {
    const draft = buildDraft(exploration)
    setValue('summary', draft)
    onSave(draft)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Resumen ejecutivo</h3>
        <button
          type="button"
          onClick={handleGenerateDraft}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
        >
          <FileText className="h-3.5 w-3.5" />
          Generar borrador
        </button>
      </div>
      <textarea
        {...register('summary')}
        rows={10}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150"
        placeholder="Escribe o genera un resumen ejecutivo de la exploración..."
      />
    </div>
  )
}
