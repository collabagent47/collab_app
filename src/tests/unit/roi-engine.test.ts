/**
 * Tests unitarios del Motor ROI — Collab ROI Explorer MVP
 *
 * Cubre las funciones puras del motor ROI, incluyendo el test de
 * regresión obligatorio DoD-027 (caso Fertilizantes Mix).
 *
 * Bug corregido (2026-06-03): calculateSavedHours ya NO usa Math.round.
 * 36 × 0.6 = 21.6 (exacto). Math.round solo aplica en calculateOperationalSavings
 * sobre el valor monetario final: Math.round(21.6 × 15000) = 324_000. ✅
 */

import { describe, it, expect } from 'vitest'
import {
  calculateMonthlyHours,
  calculateSavedHours,
  calculateOperationalSavings,
  calculateCloseRateImprovement,
  calculateAdditionalSales,
  calculateCommercialBenefit,
  calculateTotalBenefit,
  calculateFinancialROI,
  calculateMultiplier,
  calculatePayback,
} from '../../domain/roi/roi-engine'

// ---------------------------------------------------------------------------
// Funciones atómicas
// ---------------------------------------------------------------------------

describe('calculateMonthlyHours', () => {
  it('retorna 36 con (270, 8)', () => {
    // GIVEN: 270 conversaciones × 8 minutos
    // WHEN: se calcula monthlyHours
    // THEN: resultado es 36 horas
    expect(calculateMonthlyHours(270, 8)).toBe(36)
  })

  it('retorna 0 cuando conversations es 0', () => {
    // GIVEN: 0 conversaciones
    // WHEN: se calcula
    // THEN: 0 horas
    expect(calculateMonthlyHours(0, 8)).toBe(0)
  })

  it('retorna 0 cuando minutesPerConversation es 0', () => {
    // GIVEN: 0 minutos por conversación
    // WHEN: se calcula
    // THEN: 0 horas
    expect(calculateMonthlyHours(270, 0)).toBe(0)
  })
})

describe('calculateSavedHours', () => {
  it('retorna ~21.6 con monthlyHours=36, automationPercentage=0.6', () => {
    // GIVEN: 36 horas y 60% de automatización
    // WHEN: se calcula savedHours (sin redondeo — precisión preservada para operationalSavings)
    // THEN: 36 × 0.6 ≈ 21.6 (toBeCloseTo por floating-point: IEEE 754 produce 21.599999999999998)
    // NOTA: el redondeo ocurre en calculateOperationalSavings → Math.round(21.6 × 15000) = 324000.
    expect(calculateSavedHours(36, 0.6)).toBeCloseTo(21.6, 5)
  })

  it('retorna 0 cuando automationPercentage es 0', () => {
    // GIVEN: 0% de automatización
    // WHEN: se calcula
    // THEN: 0 horas ahorradas
    expect(calculateSavedHours(36, 0)).toBe(0)
  })

  it('preserva precisión decimal cuando monthlyHours no es entero', () => {
    // GIVEN: monthlyHours = 21.6, automationPct = 1.0
    // WHEN: se calcula
    // THEN: 21.6 (sin redondeo — la precisión es responsabilidad de operationalSavings)
    expect(calculateSavedHours(21.6, 1.0)).toBe(21.6)
  })
})

describe('calculateOperationalSavings', () => {
  it('retorna 324000 con (21.6, 15000) — sin redondeo de savedHours', () => {
    // GIVEN: savedHours = 21.6 (exacto de la spec), hourlyCost = 15000
    // WHEN: se calcula operationalSavings directamente
    // THEN: 21.6 × 15000 = 324000 (Motor aplica Math.round pero el input ya es fraccionario)
    // Nota: Math.round(21.6 × 15000) = Math.round(324000) = 324000
    expect(calculateOperationalSavings(21.6, 15_000)).toBe(324_000)
  })

  it('retorna 330000 con (22, 15000)', () => {
    // GIVEN: savedHours = 22, hourlyCost = 15000
    // WHEN: se calcula operationalSavings
    // THEN: Math.round(22 × 15000) = 330000
    expect(calculateOperationalSavings(22, 15_000)).toBe(330_000)
  })

  it('retorna 0 cuando hourlyCost es 0', () => {
    // GIVEN: costo hora = 0
    // WHEN: se calcula
    // THEN: 0 ahorro operativo
    expect(calculateOperationalSavings(22, 0)).toBe(0)
  })
})

describe('calculateCloseRateImprovement', () => {
  it('retorna 0.03 con expected=0.13, current=0.10', () => {
    // GIVEN: tasa esperada 13%, actual 10%
    // WHEN: se calcula la mejora
    // THEN: 0.13 - 0.10 = 0.03
    expect(calculateCloseRateImprovement(0.13, 0.10)).toBeCloseTo(0.03, 5)
  })

  it('retorna valor negativo cuando expected < current', () => {
    // GIVEN: tasa esperada menor que la actual (dato inválido)
    // WHEN: se calcula la mejora
    // THEN: resultado negativo
    expect(calculateCloseRateImprovement(0.08, 0.10)).toBeCloseTo(-0.02, 5)
  })
})

describe('calculateAdditionalSales', () => {
  it('retorna 2835000 con (270, 0.03, 350000)', () => {
    // GIVEN: 270 conv, mejora 3%, ticket $350.000
    // WHEN: se calcula additionalSales
    // THEN: 270 × 0.03 × 350000 = 2835000
    expect(calculateAdditionalSales(270, 0.03, 350_000)).toBe(2_835_000)
  })

  it('retorna 0 cuando conversations es 0', () => {
    // GIVEN: 0 conversaciones
    // WHEN: se calcula
    // THEN: 0 ventas adicionales
    expect(calculateAdditionalSales(0, 0.03, 350_000)).toBe(0)
  })
})

describe('calculateCommercialBenefit', () => {
  it('retorna 567000 con (additionalSales=2835000, grossMargin=0.2)', () => {
    // GIVEN: ventas adicionales $2.835.000, margen bruto 20%
    // WHEN: se calcula commercialBenefit
    // THEN: 2835000 × 0.2 = 567000
    expect(calculateCommercialBenefit(2_835_000, 0.2)).toBe(567_000)
  })

  it('retorna 0 cuando grossMargin es 0', () => {
    // GIVEN: margen bruto = 0
    // WHEN: se calcula
    // THEN: beneficio comercial = 0 (REGLA CRÍTICA: no ventas brutas)
    expect(calculateCommercialBenefit(2_835_000, 0)).toBe(0)
  })

  it('retorna 0 cuando grossMargin es undefined', () => {
    // GIVEN: grossMargin ausente (undefined)
    // WHEN: se calcula
    // THEN: beneficio comercial = 0 (REGLA CRÍTICA: nunca retornar additionalSales directamente)
    expect(calculateCommercialBenefit(2_835_000, undefined as unknown as number)).toBe(0)
  })

  it('retorna 0 cuando grossMargin es negativo', () => {
    // GIVEN: margen bruto negativo (dato inválido)
    // WHEN: se calcula
    // THEN: beneficio comercial = 0
    expect(calculateCommercialBenefit(2_835_000, -0.1)).toBe(0)
  })
})

describe('calculateTotalBenefit', () => {
  it('retorna la suma de operationalSavings y commercialBenefit', () => {
    // GIVEN: ahorro operativo $330.000, beneficio comercial $567.000
    // WHEN: se calcula totalBenefit
    // THEN: 330000 + 567000 = 897000
    expect(calculateTotalBenefit(330_000, 567_000)).toBe(897_000)
  })

  it('retorna operationalSavings cuando commercialBenefit es 0', () => {
    // GIVEN: commercialBenefit = 0 (sin grossMargin)
    // WHEN: se calcula
    // THEN: solo el ahorro operativo
    expect(calculateTotalBenefit(330_000, 0)).toBe(330_000)
  })
})

describe('calculateFinancialROI', () => {
  it('retorna 0 cuando monthlyInvestment es 0', () => {
    // GIVEN: inversión mensual = 0
    // WHEN: se calcula ROI
    // THEN: 0 (evita división por cero)
    expect(calculateFinancialROI(891_000, 0)).toBe(0)
  })

  it('retorna 0 cuando monthlyInvestment es undefined', () => {
    // GIVEN: monthlyInvestment ausente
    // WHEN: se calcula ROI
    // THEN: 0
    expect(calculateFinancialROI(891_000, undefined as unknown as number)).toBe(0)
  })

  it('retorna porcentaje correcto con datos válidos', () => {
    // GIVEN: totalBenefit=891000, monthlyInvestment=700000
    // WHEN: se calcula ROI
    // THEN: ((891000 - 700000) / 700000) × 100 ≈ 27.28%
    expect(calculateFinancialROI(891_000, 700_000)).toBeCloseTo(27.2857, 2)
  })
})

describe('calculateMultiplier', () => {
  it('retorna 0 cuando monthlyInvestment es 0', () => {
    // GIVEN: inversión = 0
    // WHEN: se calcula multiplicador
    // THEN: 0 (evita división por cero)
    expect(calculateMultiplier(891_000, 0)).toBe(0)
  })

  it('retorna multiplicador correcto con datos válidos', () => {
    // GIVEN: totalBenefit=891000, monthlyInvestment=700000
    // WHEN: se calcula multiplier
    // THEN: 891000 / 700000 ≈ 1.2728
    expect(calculateMultiplier(891_000, 700_000)).toBeCloseTo(1.2728, 3)
  })
})

describe('calculatePayback', () => {
  it('retorna null cuando totalBenefit es 0', () => {
    // GIVEN: beneficio total = 0
    // WHEN: se calcula payback
    // THEN: null (evita división por cero)
    expect(calculatePayback(700_000, 0)).toBeNull()
  })

  it('retorna valor correcto cuando totalBenefit > 0', () => {
    // GIVEN: monthlyInvestment=700000, totalBenefit=891000
    // WHEN: se calcula payback
    // THEN: 700000 / 891000 ≈ 0.7856
    const result = calculatePayback(700_000, 891_000)
    expect(result).not.toBeNull()
    expect(result as number).toBeCloseTo(0.7856, 3)
  })

  it('retorna 0 cuando monthlyInvestment es 0', () => {
    // GIVEN: inversión = 0 con totalBenefit válido
    // WHEN: se calcula payback
    // THEN: 0
    expect(calculatePayback(0, 891_000)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Test de regresión obligatorio — DoD-027 / CRITERIO-4.1
// Caso Fertilizantes Mix, escenario MEDIO
// ---------------------------------------------------------------------------

describe('Test de regresión DoD-027 — Fertilizantes Mix escenario medio', () => {
  const input = {
    monthlyConversations: 270,
    minutesPerConversation: 8,
    automationPercentage: 0.6,
    hourlyCost: 15_000,
    currentCloseRate: 0.1,
    expectedCloseRate: 0.13,
    averageTicket: 350_000,
    grossMargin: 0.2,
    monthlyInvestment: 700_000,
  }

  it('monthlyHours = 36', () => {
    // GIVEN: 270 conversaciones × 8 minutos
    // WHEN: calculateMonthlyHours
    // THEN: 36
    const result = calculateMonthlyHours(input.monthlyConversations, input.minutesPerConversation)
    expect(result).toBe(36)
  })

  it('savedHours ≈ 21.6 (spec DoD-027 confirmado, toBeCloseTo por floating-point)', () => {
    // GIVEN: monthlyHours=36, automationPercentage=0.6
    // WHEN: calculateSavedHours
    // THEN: 36 × 0.6 ≈ 21.6 (IEEE 754: 21.599999999999998, precisión suficiente para el cálculo)
    // Math.round(21.599999999999998 × 15000) = Math.round(323999.99...) = 324000 ✅
    const result = calculateSavedHours(36, input.automationPercentage)
    expect(result).toBeCloseTo(21.6, 5)
  })

  it('operationalSavings con savedHours=21.6 exacto = 324000', () => {
    // GIVEN: savedHours exacto sin redondeo = 21.6, hourlyCost = 15000
    // WHEN: calculateOperationalSavings
    // THEN: Math.round(21.6 × 15000) = 324000 (spec original DoD-027)
    const result = calculateOperationalSavings(21.6, input.hourlyCost)
    expect(result).toBeCloseTo(324_000, 0)
  })

  it('commercialBenefit = 567000', () => {
    // GIVEN: additionalSales = 270 × 0.03 × 350000 = 2835000, grossMargin = 0.2
    // WHEN: calculateCommercialBenefit
    // THEN: 2835000 × 0.2 = 567000
    const improvement = calculateCloseRateImprovement(input.expectedCloseRate, input.currentCloseRate)
    const additionalSales = calculateAdditionalSales(input.monthlyConversations, improvement, input.averageTicket)
    const result = calculateCommercialBenefit(additionalSales, input.grossMargin)
    expect(result).toBeCloseTo(567_000, 0)
  })

  it('totalBenefit = 891000 (con savedHours exacto 21.6)', () => {
    // GIVEN: operationalSavings=324000 (spec), commercialBenefit=567000
    // WHEN: calculateTotalBenefit
    // THEN: 324000 + 567000 = 891000
    const result = calculateTotalBenefit(324_000, 567_000)
    expect(result).toBeCloseTo(891_000, 0)
  })

  it('financialROI ≈ 27.2857 con totalBenefit=891000', () => {
    // GIVEN: totalBenefit=891000, monthlyInvestment=700000
    // WHEN: calculateFinancialROI
    // THEN: ((891000 - 700000) / 700000) × 100 ≈ 27.2857
    const result = calculateFinancialROI(891_000, input.monthlyInvestment)
    expect(result).toBeCloseTo(27.2857, 2)
  })

  it('multiplier ≈ 1.2728 con totalBenefit=891000', () => {
    // GIVEN: totalBenefit=891000, monthlyInvestment=700000
    // WHEN: calculateMultiplier
    // THEN: 891000 / 700000 ≈ 1.2728
    const result = calculateMultiplier(891_000, input.monthlyInvestment)
    expect(result).toBeCloseTo(1.2728, 3)
  })

  it('paybackMonths ≈ 0.7856 con totalBenefit=891000', () => {
    // GIVEN: monthlyInvestment=700000, totalBenefit=891000
    // WHEN: calculatePayback
    // THEN: 700000 / 891000 ≈ 0.7856
    const result = calculatePayback(input.monthlyInvestment, 891_000)
    expect(result).not.toBeNull()
    expect(result as number).toBeCloseTo(0.7856, 3)
  })
})
