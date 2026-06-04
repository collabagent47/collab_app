import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Leaf } from 'lucide-react'
import { useExplorationStore } from '../../stores/explorationStore'
import { explorationService } from '../../services/explorationService'
import { AGROINSUMOS_TEMPLATE } from '../../data/templates/agroinsumos.template'
import type { Exploration } from '../../domain/roi/roi-types'

const INPUT_CLASS = 'w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150'

export function NewExplorationPage() {
  const navigate = useNavigate()
  const { createExploration } = useExplorationStore()
  const [step, setStep] = useState<1 | 2>(1)
  const [clientName, setClientName] = useState('')
  const [sector, setSector] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const canGoStep2 = clientName.trim().length >= 2 && sector.trim().length >= 2

  const handleCreate = () => {
    if (!canGoStep2) return

    const baseExploration: Omit<Exploration, 'id' | 'createdAt' | 'updatedAt'> = {
      clientName: clientName.trim(),
      sector: sector.trim(),
      status: 'draft',
      sessionPreparations: [],
      operation: selectedTemplate === 'template-agroinsumos-v1'
        ? { ...AGROINSUMOS_TEMPLATE.baseOperation }
        : {},
      insumos: selectedTemplate === 'template-agroinsumos-v1'
        ? [...AGROINSUMOS_TEMPLATE.insumos]
        : [],
      frictionIds: [],
      recommendedModules: selectedTemplate === 'template-agroinsumos-v1'
        ? [...AGROINSUMOS_TEMPLATE.modules]
        : [],
      roiInputs: {},
    }

    const created = explorationService.create(baseExploration)
    createExploration(created)
    navigate(`/explorations/${created.id}/intro`)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-indigo-600' : s < step ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-400">Paso {step} de 2</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="mb-2 text-2xl font-bold text-slate-900">Nueva exploración</h1>
            <p className="mb-8 text-slate-500">Ingresa los datos básicos del cliente para comenzar.</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Nombre del cliente *</label>
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Ej: Fertilizantes Mix S.A.S."
                  autoFocus
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Sector *</label>
                <input
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Ej: Agroinsumos"
                />
              </div>
            </div>

            <button
              onClick={() => canGoStep2 && setStep(2)}
              disabled={!canGoStep2}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="mb-2 text-2xl font-bold text-slate-900">Seleccionar plantilla</h1>
            <p className="mb-8 text-slate-500">Las plantillas cargan fricciones, módulos e insumos típicos del sector.</p>

            <div className="flex flex-col gap-3 mb-4">
              <TemplateCard
                id="template-agroinsumos-v1"
                name="Agroinsumos"
                description="Distribuidoras y comercializadores de insumos agrícolas. Incluye fricciones típicas de WhatsApp, cotizaciones manuales y seguimiento comercial."
                icon={<Leaf className="h-5 w-5 text-emerald-600" />}
                selected={selectedTemplate === 'template-agroinsumos-v1'}
                onSelect={setSelectedTemplate}
              />
              <div
                onClick={() => setSelectedTemplate(null)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${selectedTemplate === null ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-200'}`}
              >
                <p className="font-medium text-slate-700">Sin plantilla</p>
                <p className="text-sm text-slate-500">Comenzar desde cero sin datos precargados.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Atrás
              </button>
              <button
                onClick={handleCreate}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Crear exploración
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TemplateCard({
  id, name, description, icon, selected, onSelect,
}: {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${selected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-200'}`}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
          {icon}
        </div>
        <p className={`font-semibold ${selected ? 'text-indigo-900' : 'text-slate-900'}`}>{name}</p>
      </div>
      <p className={`text-sm ${selected ? 'text-indigo-700' : 'text-slate-500'}`}>{description}</p>
    </div>
  )
}
