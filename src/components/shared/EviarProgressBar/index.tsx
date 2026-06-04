import { cn } from '../../../lib/utils'

interface EviarProgressBarProps {
  activeStep: 'E' | 'V' | 'I' | 'A' | 'R'
  onStepClick?: (step: 'E' | 'V' | 'I' | 'A' | 'R') => void
  className?: string
}

const STEPS: Array<{ key: 'E' | 'V' | 'I' | 'A' | 'R'; label: string }> = [
  { key: 'E', label: 'Entender' },
  { key: 'V', label: 'Ver fricciones' },
  { key: 'I', label: 'Identificar' },
  { key: 'A', label: 'Automatizar' },
  { key: 'R', label: 'Retorno' },
]

const STEP_INDEX: Record<string, number> = { E: 0, V: 1, I: 2, A: 3, R: 4 }

export function EviarProgressBar({ activeStep, onStepClick, className }: EviarProgressBarProps) {
  const activeIndex = STEP_INDEX[activeStep]

  return (
    <nav className={cn('flex flex-col gap-2', className)}>
      {STEPS.map((step, index) => {
        const isActive = step.key === activeStep
        const isPast = index < activeIndex

        return (
          <button
            key={step.key}
            type="button"
            onClick={() => onStepClick?.(step.key)}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200',
              isActive && 'bg-indigo-600 text-white shadow-md',
              isPast && 'text-emerald-700 hover:bg-emerald-50',
              !isActive && !isPast && 'text-slate-500 hover:bg-slate-50',
              onStepClick ? 'cursor-pointer' : 'cursor-default',
            )}
          >
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                isActive && 'bg-white text-indigo-600',
                isPast && 'bg-emerald-100 text-emerald-700',
                !isActive && !isPast && 'bg-slate-100 text-slate-500',
              )}
            >
              {step.key}
            </span>
            <span className="text-sm font-medium">{step.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
