import { useState } from 'react'

export type MiniProposalData = {
  problemDetected: string
  estimatedImpact: string
  collabSolution: string
  recommendedMVP: string
  nextStep: string
}

type Props = {
  initialData: MiniProposalData
  clientName: string
  onSave: (data: MiniProposalData) => void
}

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(v)

export function generateProposal(clientName: string, expectedLostSales: number): MiniProposalData {
  return {
    problemDetected: `Se identificó una fricción comercial en ${clientName || 'el cliente'}: leads que preguntan pero no avanzan hacia la compra por falta de seguimiento.`,
    estimatedImpact: `Con los datos ingresados, ${clientName || 'el cliente'} podría estar dejando de capturar aproximadamente ${formatCOP(expectedLostSales)} mensuales en venta esperada.`,
    collabSolution:
      'Implementar un agente Collab que registre leads, clasifique su intención de compra, recuerde seguimientos pendientes y entregue un resumen diario al asesor.',
    recommendedMVP:
      'Seguimiento automático de leads + registro de oportunidades + resumen diario para el equipo comercial.',
    nextStep:
      'Validar esta hipótesis durante 15 a 30 días, midiendo cuántos leads se recuperan y cuántas oportunidades avanzan a cierre.',
  }
}

const SECTION_CONFIG: { key: keyof MiniProposalData; label: string; rows: number }[] = [
  { key: 'problemDetected', label: 'Problema detectado', rows: 3 },
  { key: 'estimatedImpact', label: 'Impacto estimado', rows: 3 },
  { key: 'collabSolution', label: 'Solución Collab sugerida', rows: 4 },
  { key: 'recommendedMVP', label: 'MVP recomendado', rows: 3 },
  { key: 'nextStep', label: 'Siguiente paso', rows: 3 },
]

const TEXTAREA_CLASS =
  'w-full resize-none rounded-lg border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors'

export function MiniProposalEditor({ initialData, onSave }: Props) {
  const [data, setData] = useState<MiniProposalData>(initialData)

  function handleChange(key: keyof MiniProposalData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-5">
      {SECTION_CONFIG.map(({ key, label, rows }) => (
        <div key={key}>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">{label}</label>
          <textarea
            value={data[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            rows={rows}
            className={TEXTAREA_CLASS}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => onSave(data)}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#10B981] py-3 font-semibold text-white transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        Ver modo presentación
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
