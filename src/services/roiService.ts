import type { ROIInputs, OperationData, ROIScenarioResults } from '../domain/roi/roi-types'
import { calculateScenarios } from '../domain/roi/roi-scenarios'
import { calculateDataQuality, generateWarnings } from '../domain/roi/roi-validations'

export const roiService = {
  calculateScenarios(inputs: ROIInputs, operation: OperationData): ROIScenarioResults {
    return calculateScenarios(inputs, operation)
  },

  getDataQuality(inputs: ROIInputs, operation: OperationData): 'low' | 'medium' | 'high' {
    return calculateDataQuality(inputs, operation)
  },

  getWarnings(inputs: ROIInputs, operation: OperationData): string[] {
    const result = calculateScenarios(inputs, operation)
    return generateWarnings(inputs, result.medium, operation)
  },
}
