import { useState, useCallback } from 'react'
import type { ROIInputs, OperationData, ROIScenarioResults } from '../domain/roi/roi-types'
import { roiService } from '../services/roiService'

interface UseROIReturn {
  results: ROIScenarioResults | null
  warnings: string[]
  dataQuality: 'low' | 'medium' | 'high' | null
  loading: boolean
  calculate: (inputs: ROIInputs, operation: OperationData) => void
}

export function useROI(): UseROIReturn {
  const [results, setResults] = useState<ROIScenarioResults | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])
  const [dataQuality, setDataQuality] = useState<'low' | 'medium' | 'high' | null>(null)
  const [loading, setLoading] = useState(false)

  const calculate = useCallback((inputs: ROIInputs, operation: OperationData) => {
    setLoading(true)
    try {
      const scenarios = roiService.calculateScenarios(inputs, operation)
      const quality = roiService.getDataQuality(inputs, operation)
      const warns = roiService.getWarnings(inputs, operation)
      setResults(scenarios)
      setDataQuality(quality)
      setWarnings(warns)
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, warnings, dataQuality, loading, calculate }
}
