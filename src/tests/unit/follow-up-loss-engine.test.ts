/**
 * Tests unitarios — Motor de Oportunidad por Mal Seguimiento
 *
 * CP-001 a CP-012 basados en el caso canónico de Ihann (2026-06-04).
 * Fuente: audio WhatsApp + Calculadora Hubspot de Collab.
 *
 * REGLA DE DOMINIO: El resultado principal se llama "Venta esperada perdida",
 * NO "ROI". El ROI es una capa opcional que requiere margen + inversión.
 */

import { describe, it, expect } from 'vitest'
import {
  calculateCloseRate,
  calculateLostLeadRate,
  calculateGrossLostPipeline,
  calculatePotentialLostClosures,
  calculateExpectedLostSales,
  calculateExpectedLostGrossProfit,
  calculateRecoverableSales,
  calculateRecoverableGrossProfit,
  calculateFollowUpROI,
  generateFollowUpWarnings,
  calculateFollowUpOpportunity,
} from '../../domain/sales-opportunity/follow-up-loss-engine'
import {
  IHANN_BASE,
  IHANN_WITH_MARGIN,
  IHANN_WITH_RECOVERY,
  IHANN_WITH_INVESTMENT,
  IHANN_WITH_SAVINGS,
  IHANN_EXPECTED_CP001,
} from '../../domain/sales-opportunity/follow-up-loss-fixtures'

// ---------------------------------------------------------------------------
// CP-001 — Caso canónico Ihann
// Input: 50 leads, $400k ticket, 12 perdidos, 6 cierres
// Expected: closeRate=12%, grossLostPipeline=$4.8M, potentialLost=1.44, expectedLost=$576k
// ---------------------------------------------------------------------------

describe('CP-001 — Caso canónico Ihann (50 / 400000 / 12 / 6 → $576.000)', () => {
  it('closeRate = 0.12 (12%)', () => {
    // GIVEN: 6 cierres sobre 50 leads
    // WHEN: calculateCloseRate
    // THEN: 6/50 = 0.12
    expect(calculateCloseRate(IHANN_BASE.closedDeals, IHANN_BASE.monthlyLeads))
      .toBeCloseTo(0.12, 5)
  })

  it('lostLeadRate = 0.24 (24%)', () => {
    // GIVEN: 12 perdidos sobre 50 leads
    // WHEN: calculateLostLeadRate
    // THEN: 12/50 = 0.24
    expect(calculateLostLeadRate(IHANN_BASE.lostLeadsByPoorFollowUp, IHANN_BASE.monthlyLeads))
      .toBeCloseTo(0.24, 5)
  })

  it('grossLostPipeline = $4.800.000', () => {
    // GIVEN: 12 leads × $400k ticket
    // WHEN: calculateGrossLostPipeline
    // THEN: 4.800.000 (valor bruto — no asume que todos iban a comprar)
    expect(calculateGrossLostPipeline(IHANN_BASE.lostLeadsByPoorFollowUp, IHANN_BASE.averageTicket))
      .toBe(IHANN_EXPECTED_CP001.grossLostPipeline)
  })

  it('potentialLostClosures = 1.44', () => {
    // GIVEN: 12 leads perdidos × closeRate 12%
    // WHEN: calculatePotentialLostClosures
    // THEN: 12 × 0.12 = 1.44 cierres que no van a ocurrir
    const closeRate = calculateCloseRate(IHANN_BASE.closedDeals, IHANN_BASE.monthlyLeads)
    expect(calculatePotentialLostClosures(IHANN_BASE.lostLeadsByPoorFollowUp, closeRate))
      .toBeCloseTo(IHANN_EXPECTED_CP001.potentialLostClosures, 5)
  })

  it('expectedLostSales = $576.000 — VENTA ESPERADA PERDIDA', () => {
    // GIVEN: 1.44 cierres potenciales × $400k ticket
    // WHEN: calculateExpectedLostSales
    // THEN: 576.000 — este es el número principal de la conversación con el cliente
    const closeRate = calculateCloseRate(IHANN_BASE.closedDeals, IHANN_BASE.monthlyLeads)
    const potential = calculatePotentialLostClosures(IHANN_BASE.lostLeadsByPoorFollowUp, closeRate)
    expect(calculateExpectedLostSales(potential, IHANN_BASE.averageTicket))
      .toBeCloseTo(IHANN_EXPECTED_CP001.expectedLostSales, 0)
  })

  it('calculateFollowUpOpportunity — resultado completo con fixture', () => {
    // GIVEN: fixture canónico IHANN_BASE
    // WHEN: calculateFollowUpOpportunity
    // THEN: todos los valores coinciden con IHANN_EXPECTED_CP001
    const result = calculateFollowUpOpportunity(IHANN_BASE)

    expect(result.closeRate).toBeCloseTo(IHANN_EXPECTED_CP001.closeRate, 5)
    expect(result.lostLeadRate).toBeCloseTo(IHANN_EXPECTED_CP001.lostLeadRate, 5)
    expect(result.grossLostPipeline).toBe(IHANN_EXPECTED_CP001.grossLostPipeline)
    expect(result.potentialLostClosures).toBeCloseTo(IHANN_EXPECTED_CP001.potentialLostClosures, 5)
    expect(result.expectedLostSales).toBeCloseTo(IHANN_EXPECTED_CP001.expectedLostSales, 0)
  })

  it('CP-001 sin margen: roi debe ser undefined', () => {
    // GIVEN: inputs base sin grossMargin
    // WHEN: calculateFollowUpOpportunity
    // THEN: roi no se calcula (no hay margen — nivel 1 solamente)
    const result = calculateFollowUpOpportunity(IHANN_BASE)
    expect(result.roi).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// CP-002 — Con margen 20%
// ---------------------------------------------------------------------------

describe('CP-002 — Con margen 20%', () => {
  it('expectedLostGrossProfit = $115.200', () => {
    // GIVEN: expectedLostSales=$576k, grossMargin=0.20
    // WHEN: calculateExpectedLostGrossProfit
    // THEN: 576000 × 0.20 = 115200
    expect(calculateExpectedLostGrossProfit(576_000, 0.20)).toBeCloseTo(115_200, 0)
  })

  it('calculateFollowUpOpportunity — con margen calcula expectedLostGrossProfit', () => {
    // GIVEN: IHANN_WITH_MARGIN (base + grossMargin 0.20)
    // WHEN: calculateFollowUpOpportunity
    // THEN: expectedLostGrossProfit = 115200
    const result = calculateFollowUpOpportunity(IHANN_WITH_MARGIN)
    expect(result.expectedLostGrossProfit).toBeCloseTo(115_200, 0)
  })
})

// ---------------------------------------------------------------------------
// CP-003 — Recuperación parcial 50%
// ---------------------------------------------------------------------------

describe('CP-003 — Recuperación parcial 50%', () => {
  it('recoverableSales = $288.000', () => {
    // GIVEN: expectedLostSales=$576k, recoverabilityRate=0.5
    // WHEN: calculateRecoverableSales
    // THEN: 576000 × 0.5 = 288000
    expect(calculateRecoverableSales(576_000, 0.5)).toBeCloseTo(288_000, 0)
  })

  it('recoverableGrossProfit = $57.600', () => {
    // GIVEN: recoverableSales=$288k, grossMargin=0.20
    // WHEN: calculateRecoverableGrossProfit
    // THEN: 288000 × 0.20 = 57600
    expect(calculateRecoverableGrossProfit(288_000, 0.20)).toBeCloseTo(57_600, 0)
  })

  it('calculateFollowUpOpportunity — con recuperación 50%', () => {
    // GIVEN: IHANN_WITH_RECOVERY (base + margen + recoverabilityRate 0.5)
    // WHEN: calculateFollowUpOpportunity
    // THEN: recoverableSales=288000, recoverableGrossProfit=57600
    const result = calculateFollowUpOpportunity(IHANN_WITH_RECOVERY)
    expect(result.recoverableSales).toBeCloseTo(288_000, 0)
    expect(result.recoverableGrossProfit).toBeCloseTo(57_600, 0)
  })
})

// ---------------------------------------------------------------------------
// CP-004 — ROI negativo con inversión $700.000 (sin ahorro operativo)
// ---------------------------------------------------------------------------

describe('CP-004 — ROI negativo con inversión $700.000', () => {
  it('roi ≈ −83.5429% (beneficio=115200, inversión=700000)', () => {
    // GIVEN: recoverableGrossProfit=115200, operationalSavings=0, investment=700000
    // WHEN: calculateFollowUpROI
    // THEN: ((115200 + 0 - 700000) / 700000) × 100 = -83.5428...
    expect(calculateFollowUpROI(115_200, 0, 700_000)).toBeCloseTo(-83.5428, 2)
  })

  it('calculateFollowUpOpportunity — roi negativo con fixture IHANN_WITH_INVESTMENT', () => {
    // GIVEN: IHANN_WITH_INVESTMENT (margen 20%, sin ahorro, inversión 700k)
    // WHEN: calculateFollowUpOpportunity (recoverabilityRate por defecto = 1)
    // THEN: roi ≈ -83.5429%
    const result = calculateFollowUpOpportunity(IHANN_WITH_INVESTMENT)
    expect(result.roi).toBeDefined()
    expect(result.roi!).toBeCloseTo(-83.5428, 2)
  })
})

// ---------------------------------------------------------------------------
// CP-005 — ROI con ahorro operativo $324.000
// ---------------------------------------------------------------------------

describe('CP-005 — ROI con ahorro operativo $324.000', () => {
  it('roi ≈ −37.2571% (beneficio=115200+324000=439200, inversión=700000)', () => {
    // GIVEN: recoverableGrossProfit=115200, operationalSavings=324000, investment=700000
    // WHEN: calculateFollowUpROI
    // THEN: ((439200 - 700000) / 700000) × 100 = -37.2571...
    expect(calculateFollowUpROI(115_200, 324_000, 700_000)).toBeCloseTo(-37.2571, 2)
  })

  it('calculateFollowUpOpportunity — roi con ahorro fixture IHANN_WITH_SAVINGS', () => {
    // GIVEN: IHANN_WITH_SAVINGS (margen 20%, inversión 700k, ahorro 324k)
    // WHEN: calculateFollowUpOpportunity
    // THEN: roi ≈ -37.2571%
    const result = calculateFollowUpOpportunity(IHANN_WITH_SAVINGS)
    expect(result.roi).toBeDefined()
    expect(result.roi!).toBeCloseTo(-37.2571, 2)
  })
})

// ---------------------------------------------------------------------------
// CP-006 — monthlyLeads = 0 → no dividir por cero
// ---------------------------------------------------------------------------

describe('CP-006 — monthlyLeads = 0', () => {
  it('retorna closeRate=0 sin error', () => {
    // GIVEN: monthlyLeads = 0
    // WHEN: calculateCloseRate
    // THEN: 0 (no división por cero)
    expect(calculateCloseRate(6, 0)).toBe(0)
  })

  it('generateFollowUpWarnings genera warning de leads=0', () => {
    // GIVEN: monthlyLeads = 0
    // WHEN: generateFollowUpWarnings
    // THEN: warning sobre leads > 0
    const warnings = generateFollowUpWarnings({ ...IHANN_BASE, monthlyLeads: 0 })
    expect(warnings.some(w => w.toLowerCase().includes('leads'))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// CP-007 — closedDeals > monthlyLeads → warning
// ---------------------------------------------------------------------------

describe('CP-007 — closedDeals > monthlyLeads', () => {
  it('genera warning cuando closedDeals supera monthlyLeads', () => {
    // GIVEN: closedDeals=60 > monthlyLeads=50
    // WHEN: generateFollowUpWarnings
    // THEN: warning sobre cierres > leads
    const warnings = generateFollowUpWarnings({ ...IHANN_BASE, closedDeals: 60 })
    expect(warnings.some(w => w.toLowerCase().includes('cierres'))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// CP-008 — lostLeadsByPoorFollowUp > monthlyLeads → warning
// ---------------------------------------------------------------------------

describe('CP-008 — lostLeads > monthlyLeads', () => {
  it('genera warning cuando lostLeads supera monthlyLeads', () => {
    // GIVEN: lostLeadsByPoorFollowUp=60 > monthlyLeads=50
    // WHEN: generateFollowUpWarnings
    // THEN: warning sobre leads perdidos > total
    const warnings = generateFollowUpWarnings({ ...IHANN_BASE, lostLeadsByPoorFollowUp: 60 })
    expect(warnings.some(w => w.toLowerCase().includes('perdidos'))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// CP-009 — Sin grossMargin no calcula expectedLostGrossProfit ni ROI
// ---------------------------------------------------------------------------

describe('CP-009 — Sin margen no calcula beneficio ni ROI', () => {
  it('expectedLostGrossProfit es undefined sin grossMargin', () => {
    // GIVEN: inputs sin grossMargin
    // WHEN: calculateFollowUpOpportunity
    // THEN: nivel 2 no se calcula
    const result = calculateFollowUpOpportunity(IHANN_BASE)
    expect(result.expectedLostGrossProfit).toBeUndefined()
    expect(result.roi).toBeUndefined()
  })

  it('generateFollowUpWarnings genera warning pedagógico sobre margen', () => {
    // GIVEN: inputs sin grossMargin
    // WHEN: generateFollowUpWarnings
    // THEN: warning explicando que sin margen no hay ROI (ni ventas brutas)
    const warnings = generateFollowUpWarnings(IHANN_BASE)
    expect(warnings.some(w => w.toLowerCase().includes('margen'))).toBe(true)
  })

  it('calculateExpectedLostGrossProfit retorna 0 con grossMargin=0', () => {
    // GIVEN: grossMargin = 0
    // WHEN: calculateExpectedLostGrossProfit
    // THEN: 0 (REGLA: nunca usar ventas brutas como beneficio)
    expect(calculateExpectedLostGrossProfit(576_000, 0)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// CP-010 — Sin monthlyInvestment no calcula ROI
// ---------------------------------------------------------------------------

describe('CP-010 — Sin inversión no calcula ROI', () => {
  it('roi es undefined sin monthlyInvestment', () => {
    // GIVEN: inputs con margen pero sin inversión
    // WHEN: calculateFollowUpOpportunity
    // THEN: expectedLostGrossProfit calculado, pero roi = undefined
    const result = calculateFollowUpOpportunity(IHANN_WITH_MARGIN)
    expect(result.expectedLostGrossProfit).toBeCloseTo(115_200, 0)
    expect(result.roi).toBeUndefined()
  })

  it('generateFollowUpWarnings genera warning pedagógico sobre inversión', () => {
    // GIVEN: inputs con margen pero sin inversión
    // WHEN: generateFollowUpWarnings
    // THEN: warning explicando que falta inversión para ROI
    const warnings = generateFollowUpWarnings(IHANN_WITH_MARGIN)
    expect(warnings.some(w => w.toLowerCase().includes('inversión'))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// CP-011 — averageTicket = 0
// ---------------------------------------------------------------------------

describe('CP-011 — averageTicket = 0', () => {
  it('genera warning cuando averageTicket es 0', () => {
    // GIVEN: averageTicket = 0
    // WHEN: generateFollowUpWarnings
    // THEN: warning sobre ticket > 0
    const warnings = generateFollowUpWarnings({ ...IHANN_BASE, averageTicket: 0 })
    expect(warnings.some(w => w.toLowerCase().includes('ticket'))).toBe(true)
  })

  it('expectedLostSales = 0 cuando averageTicket = 0', () => {
    // GIVEN: averageTicket = 0, potentialLostClosures = 1.44
    // WHEN: calculateExpectedLostSales
    // THEN: 1.44 × 0 = 0
    expect(calculateExpectedLostSales(1.44, 0)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// CP-012 — lostLeadsByPoorFollowUp = 0
// ---------------------------------------------------------------------------

describe('CP-012 — lostLeads = 0 → pérdida esperada = 0', () => {
  it('expectedLostSales = 0 cuando no hay leads perdidos', () => {
    // GIVEN: sin leads perdidos por seguimiento
    // WHEN: calculateFollowUpOpportunity
    // THEN: resultado es 0 sin errores
    const result = calculateFollowUpOpportunity({ ...IHANN_BASE, lostLeadsByPoorFollowUp: 0 })
    expect(result.expectedLostSales).toBe(0)
    expect(result.grossLostPipeline).toBe(0)
    expect(result.potentialLostClosures).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// REGLA DE DOMINIO — El resultado principal NO se llama ROI
// ---------------------------------------------------------------------------

describe('REGLA DE DOMINIO — Terminología correcta', () => {
  it('el tipo FollowUpLossResult no tiene campo llamado exactamente "roi" como resultado principal', () => {
    // GIVEN: resultado del motor
    // WHEN: inspeccionar las claves del resultado
    // THEN: el resultado principal es expectedLostSales, no roi
    // (roi es opcional y está en nivel 3)
    const result = calculateFollowUpOpportunity(IHANN_BASE)
    const keys = Object.keys(result)

    // El campo principal siempre presente es expectedLostSales
    expect(keys).toContain('expectedLostSales')

    // ROI es undefined en nivel 1 (sin margen ni inversión)
    expect(result.roi).toBeUndefined()
  })

  it('el mensaje de warning sobre margen NO usa la palabra ROI para el cálculo base', () => {
    // GIVEN: inputs sin margen
    // WHEN: generateFollowUpWarnings
    // THEN: el warning habla de "margen", no dice que "calculamos ROI con ventas brutas"
    const warnings = generateFollowUpWarnings(IHANN_BASE)
    const margenWarning = warnings.find(w => w.toLowerCase().includes('margen'))
    expect(margenWarning).toBeDefined()
    // El mensaje debe mencionar que no usamos ventas brutas
    expect(margenWarning!.toLowerCase()).toContain('ventas brutas')
  })
})
