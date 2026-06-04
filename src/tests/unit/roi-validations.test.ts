/**
 * Tests unitarios de validaciones ROI — Collab ROI Explorer MVP
 *
 * Cubre generateWarnings y calculateDataQuality.
 */

import { describe, it, expect } from 'vitest'
import { generateWarnings, calculateDataQuality } from '../../domain/roi/roi-validations'
import type { ROIInputs, OperationData, ROIResult } from '../../domain/roi/roi-types'

// ---------------------------------------------------------------------------
// Helpers de fixtures
// ---------------------------------------------------------------------------

function makeInputs(overrides: Partial<ROIInputs> = {}): ROIInputs {
  return {
    averageTicket: 350_000,
    grossMargin: 0.2,
    currentCloseRate: 0.1,
    expectedCloseRate: 0.13,
    monthlyInvestment: 700_000,
    hourlyCost: 15_000,
    automationPercentage: 0.6,
    ...overrides,
  }
}

function makeOperation(overrides: Partial<OperationData> = {}): OperationData {
  return {
    monthlyConversationsMin: 216,
    monthlyConversationsLikely: 270,
    monthlyConversationsMax: 324,
    minutesPerConversation: 8,
    monthlySalesMin: 3_000_000,
    monthlySalesMax: 6_000_000,
    ...overrides,
  }
}

function makeResult(overrides: Partial<ROIResult> = {}): Partial<ROIResult> {
  return {
    monthlyHours: 36,
    savedHours: 22,
    operationalSavings: 330_000,
    commercialBenefit: 567_000,
    totalBenefit: 897_000,
    financialROI: 28.14,
    multiplier: 1.28,
    paybackMonths: 0.78,
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// generateWarnings
// ---------------------------------------------------------------------------

describe('generateWarnings', () => {
  it('retorna array vacío cuando los datos son razonables', () => {
    // GIVEN: inputs válidos y resultado dentro de rangos normales
    const inputs = makeInputs()
    const operation = makeOperation()
    const result = makeResult()

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: no debe haber advertencia de ROI alto, margen alto ni tasa de cierre alta
    const hasROIWarning = warnings.some((w) => w.includes('ROI calculado parece muy alto'))
    const hasMarginWarning = warnings.some((w) => w.includes('margen del'))
    const hasCloseRateWarning = warnings.some((w) => w.includes('tasa de cierre esperada del'))
    expect(hasROIWarning).toBe(false)
    expect(hasMarginWarning).toBe(false)
    expect(hasCloseRateWarning).toBe(false)
  })

  it('genera alerta cuando financialROI > 1000%', () => {
    // GIVEN: ROI financiero extremadamente alto (> 1000%)
    const inputs = makeInputs()
    const operation = makeOperation()
    const result = makeResult({ financialROI: 1500 })

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: debe incluir advertencia de ROI alto
    expect(warnings.some((w) => w.includes('ROI calculado parece muy alto'))).toBe(true)
  })

  it('genera alerta cuando grossMargin > 0.80', () => {
    // GIVEN: margen bruto inusualmente alto (> 80%)
    const inputs = makeInputs({ grossMargin: 0.85 })
    const operation = makeOperation()
    const result = makeResult()

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: debe incluir advertencia de margen alto
    expect(warnings.some((w) => w.includes('margen del'))).toBe(true)
    expect(warnings.some((w) => w.includes('85%'))).toBe(true)
  })

  it('genera alerta cuando expectedCloseRate > 0.50', () => {
    // GIVEN: tasa de cierre esperada muy alta (> 50%)
    const inputs = makeInputs({ expectedCloseRate: 0.6 })
    const operation = makeOperation()
    const result = makeResult()

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: debe incluir advertencia de tasa de cierre alta
    expect(warnings.some((w) => w.includes('tasa de cierre esperada del'))).toBe(true)
    expect(warnings.some((w) => w.includes('60%'))).toBe(true)
  })

  it('genera alerta cuando expectedCloseRate < currentCloseRate', () => {
    // GIVEN: tasa de cierre esperada menor que la actual
    const inputs = makeInputs({ currentCloseRate: 0.15, expectedCloseRate: 0.10 })
    const operation = makeOperation()
    const result = makeResult()

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: debe incluir advertencia de tasa regresiva
    expect(warnings.some((w) => w.includes('tasa de cierre esperada es menor que la actual'))).toBe(true)
  })

  it('genera alerta cuando grossMargin es undefined', () => {
    // GIVEN: grossMargin no proporcionado
    const inputs = makeInputs({ grossMargin: undefined })
    const operation = makeOperation()
    const result = makeResult({ commercialBenefit: 0 })

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: debe incluir advertencia de margen bruto faltante
    expect(warnings.some((w) => w.includes('Falta el margen bruto'))).toBe(true)
  })

  it('genera alerta cuando grossMargin es 0', () => {
    // GIVEN: grossMargin = 0
    const inputs = makeInputs({ grossMargin: 0 })
    const operation = makeOperation()
    const result = makeResult({ commercialBenefit: 0 })

    // WHEN: se generan las advertencias
    const warnings = generateWarnings(inputs, result, operation)

    // THEN: debe incluir advertencia de margen bruto faltante
    expect(warnings.some((w) => w.includes('Falta el margen bruto'))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// calculateDataQuality
// ---------------------------------------------------------------------------

describe('calculateDataQuality', () => {
  it('retorna "high" cuando más del 75% de los campos críticos están llenos', () => {
    // GIVEN: todos los campos críticos con valores > 0
    const inputs = makeInputs()
    const operation: OperationData = {
      monthlyConversationsLikely: 270,
      minutesPerConversation: 8,
    }

    // WHEN: se calcula la calidad de los datos
    const quality = calculateDataQuality(inputs, operation)

    // THEN: calidad alta (7/9 campos = 77.7%)
    expect(quality).toBe('high')
  })

  it('retorna "medium" cuando entre 40% y 75% de los campos están llenos', () => {
    // GIVEN: solo algunos campos críticos con valores
    const inputs: ROIInputs = {
      averageTicket: 350_000,
      grossMargin: 0.2,
      currentCloseRate: 0.1,
      expectedCloseRate: 0.13,
      // monthlyInvestment: ausente
      // hourlyCost: ausente
      // automationPercentage: ausente
    }
    const operation: OperationData = {
      monthlyConversationsLikely: 270,
      // minutesPerConversation: ausente
    }

    // WHEN: se calcula la calidad
    const quality = calculateDataQuality(inputs, operation)

    // THEN: calidad media (5/9 ≈ 55.5%)
    expect(quality).toBe('medium')
  })

  it('retorna "low" cuando menos del 40% de los campos están llenos', () => {
    // GIVEN: menos de 4 campos críticos disponibles
    const inputs: ROIInputs = {
      averageTicket: 350_000,
      // resto ausente
    }
    const operation: OperationData = {
      // todos ausentes
    }

    // WHEN: se calcula la calidad
    const quality = calculateDataQuality(inputs, operation)

    // THEN: calidad baja (1/9 ≈ 11%)
    expect(quality).toBe('low')
  })

  it('retorna "low" cuando los objetos están vacíos', () => {
    // GIVEN: ningún campo crítico disponible
    const inputs: ROIInputs = {}
    const operation: OperationData = {}

    // WHEN: se calcula la calidad
    const quality = calculateDataQuality(inputs, operation)

    // THEN: calidad baja (0/9 = 0%)
    expect(quality).toBe('low')
  })
})
