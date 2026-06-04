import { Lightbulb } from 'lucide-react'
import { useAppMode } from '../../../hooks/useAppMode'
import { cn } from '../../../lib/utils'

interface LearnerHintProps {
  hint: string
  className?: string
}

export function LearnerHint({ hint, className }: LearnerHintProps) {
  const { userMode } = useAppMode()

  if (userMode !== 'learner') return null

  return (
    <div className={cn('flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4', className)}>
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
      <p className="text-sm text-indigo-800">{hint}</p>
    </div>
  )
}
