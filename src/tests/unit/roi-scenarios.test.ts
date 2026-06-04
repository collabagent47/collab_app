/**
 * Tests unitarios de escenarios ROI — Collab ROI Explorer MVP
 *
 * Cubre calculateScenarios: los tres escenarios (conservative, medium, optimistic)
 * y el test de regresión del caso Fertilizantes Mix.
 */

import { describe, it, expect } from 'vitest'
import { calculateScenarios } from '../../domain/roi/roi-scenarios'
import type { ROIInputs, OperationData } from '../../domain/roi/roi-types'

// ---------------------------------------------------------------------------
// Fixture base — Fertilizantes Mix
// ---------------------------------------------------------------------------

const FERTILIZANTES_INPUTS: ROIInputs = {
  averageTicket: 350_000,
  grossMargin: 0.2,
  currentCloseRate: 0.1,
  expectedCloseRate: 0.13,
  monthlyInvestment: 700_000,
  hourlyCost: 15_000,
  automationPercentage: 0.6,
}

const FERTILIZANTES_OPERATION: OperationData = {
  monthlyConversationsMin: 216,
  monthlyConversationsLikely: 270,
  monthlyConversationsMax: 324,
  minutesPerConversation: 8,
  currentAttentionRate: 75,
  teamSize: 5,
  monthlySalesMin: 3_000_000,
  monthlySalesMax: 6_000_000,
  averageClosingTimeDays: 7,
}

// ---------------------------------------------------------------------------
// Tests principales
// ---------------------------------------------------------------------------

describe('calculateScenarios', () => {
  it('retorna exactamente 3 escenarios: conservative, medium, optimistic', () => {
    // GIVEN: inputs completos de Fertilizantes Mix
    // WHEN: se calculan los escenarios
    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, FERTILIZANTES_OPERATION)

    // THEN: existen los tres escenarios
    expect(scenarios).toHaveProperty('conservative')
    expect(scenarios).toHaveProperty('medium')
    expect(scenarios).toHaveProperty('optimistic')
  })

  it('el escenario medium coincide con Fertilizantes Mix — regresión DoD-027', () => {
    // GIVEN: inputs y operación de Fertilizantes Mix
    // WHEN: se calcula el escenario medio
    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, FERTILIZANTES_OPERATION)
    const medium = scenarios.medium

    // THEN: valores dentro de la tolerancia esperada
    // monthlyHours: 270 × 8 / 60 = 36
    expect(medium.monthlyHours).toBe(36)
    // commercialBenefit: 2835000 × 0.2 = 567000
    expect(medium.commercialBenefit).toBeCloseTo(567_000, 0)
    // totalBenefit: 330000 + 567000 = 897000 (con savedHours redondeado)
    // o 324000 + 567000 = 891000 (spec original). Motor redondea savedHours→22→330000.
    // Aceptamos rango de 891000-897000 por el gap de redondeo documentado en fixtures.
    expect(medium.totalBenefit).toBeGreaterThanOrEqual(891_000)
    expect(medium.totalBenefit).toBeLessThanOrEqual(897_000)
  })

  it('el escenario optimistic tiene totalBenefit mayor que medium', () => {
    // GIVEN: inputs de Fertilizantes Mix
    // WHEN: se calculan los escenarios
    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, FERTILIZANTES_OPERATION)

    // THEN: optimistic > medium (usa más conversaciones y factores × 1.2)
    expect(scenarios.optimistic.totalBenefit).toBeGreaterThan(scenarios.medium.totalBenefit)
  })

  it('el escenario conservative tiene totalBenefit menor que medium', () => {
    // GIVEN: inputs de Fertilizantes Mix
    // WHEN: se calculan los escenarios
    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, FERTILIZANTES_OPERATION)

    // THEN: conservative < medium (usa menos conversaciones y factores × 0.8)
    expect(scenarios.conservative.totalBenefit).toBeLessThan(scenarios.medium.totalBenefit)
  })

  it('cada escenario tiene el campo confidence', () => {
    // GIVEN: inputs completos
    // WHEN: se calculan los escenarios
    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, FERTILIZANTES_OPERATION)

    // THEN: los tres escenarios tienen un nivel de confianza
    const validValues = ['low', 'medium', 'high']
    expect(validValues).toContain(scenarios.conservative.confidence)
    expect(validValues).toContain(scenarios.medium.confidence)
    expect(validValues).toContain(scenarios.optimistic.confidence)
  })

  it('cada escenario tiene un array de warnings', () => {
    // GIVEN: inputs completos
    // WHEN: se calculan los escenarios
    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, FERTILIZANTES_OPERATION)

    // THEN: cada escenario tiene warnings (puede ser array vacío)
    expect(Array.isArray(scenarios.conservative.warnings)).toBe(true)
    expect(Array.isArray(scenarios.medium.warnings)).toBe(true)
    expect(Array.isArray(scenarios.optimistic.warnings)).toBe(true)
  })

  it('no falla cuando monthlyConversationsMin/Max son undefined — usa fallback 0', () => {
    // GIVEN: operation sin min/max de conversaciones
    const operationSinRango: OperationData = {
      monthlyConversationsLikely: 270,
      minutesPerConversation: 8,
      // monthlyConversationsMin: undefined
      // monthlyConversationsMax: undefined
    }

    // WHEN: se calculan los escenarios
    // THEN: no lanza excepción, usa fallback 0 para min/max
    expect(() => {
      calculateScenarios(FERTILIZANTES_INPUTS, operationSinRango)
    }).not.toThrow()

    const scenarios = calculateScenarios(FERTILIZANTES_INPUTS, operationSinRango)
    // conservative usa monthlyConversationsMin = 0 → totalBenefit = 0
    expect(scenarios.conservative.totalBenefit).toBe(0)
    // medium usa monthlyConversationsLikely = 270 → calcula normalmente
    expect(scenarios.medium.totalBenefit).toBeGreaterThan(0)
  })

  it('no falla cuando todos los campos de operation son undefined', () => {
    // GIVEN: operation completamente vacía
    const operationVacia: OperationData = {}

    // WHEN: se calculan los escenarios
    // THEN: no lanza excepción
    expect(() => {
      calculateScenarios(FERTILIZANTES_INPUTS, operationVacia)
    }).not.toThrow()
  })
})
