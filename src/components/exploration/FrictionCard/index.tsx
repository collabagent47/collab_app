import { motion } from 'framer-motion'
import { TrendingUp, Settings, Layers } from 'lucide-react'
import type { Friction } from '../../../domain/knowledge-base/knowledge-types'
import { cn } from '../../../lib/utils'

interface FrictionCardProps {
  friction: Friction
  selected: boolean
  onToggle: (id: string) => void
}

const IMPACT_ICON: Record<string, React.ReactNode> = {
  commercial: <TrendingUp className="h-4 w-4" />,
  operational: <Settings className="h-4 w-4" />,
  mixed: <Layers className="h-4 w-4" />,
}

const IMPACT_COLOR: Record<string, string> = {
  commercial: 'text-blue-600 bg-blue-50',
  operational: 'text-emerald-600 bg-emerald-50',
  mixed: 'text-violet-600 bg-violet-50',
}

const IMPACT_LABEL: Record<string, string> = {
  commercial: 'Comercial',
  operational: 'Operativo',
  mixed: 'Mixto',
}

export function FrictionCard({ friction, selected, onToggle }: FrictionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      onClick={() => onToggle(friction.id)}
      className={cn(
        'cursor-pointer rounded-xl border-2 bg-white p-5 transition-all duration-200',
        selected
          ? 'border-indigo-500 bg-indigo-50 shadow-md'
          : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm',
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className={cn('font-semibold', selected ? 'text-indigo-900' : 'text-slate-900')}>
          {friction.title}
        </h3>
        <span className={cn('flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium', IMPACT_COLOR[friction.impactType])}>
          {IMPACT_ICON[friction.impactType]}
          {IMPACT_LABEL[friction.impactType]}
        </span>
      </div>
      <p className={cn('text-sm leading-relaxed', selected ? 'text-indigo-700' : 'text-slate-600')}>
        {friction.description}
      </p>
    </motion.div>
  )
}
