import { AlertTriangle } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface QualityWarningProps {
  warnings: string[]
  className?: string
}

export function QualityWarning({ warnings, className }: QualityWarningProps) {
  if (warnings.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {warnings.map((warning, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-sm text-amber-800">{warning}</p>
        </div>
      ))}
    </div>
  )
}
