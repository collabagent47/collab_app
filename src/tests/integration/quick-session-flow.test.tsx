/**
 * Test de integración — Flujo sesión rápida
 * Valida: fricción seleccionada → calculadora → $576.000
 */
import { describe, it, expect, vi } from 'vitest'
import { calculateFollowUpOpportunity } from '../../domain/sales-opportunity/follow-up-loss-engine'

describe('Flujo sesión rápida — integración calculadora Ihann', () => {
  it('caso canónico 50/400000/12/6 produce $576.000 en venta esperada perdida', () => {
    // GIVEN: datos de la sesión rápida (caso Ihann)
    const sessionInputs = {
      monthlyLeads: 50,
      averageTicket: 400_000,
      lostLeadsByPoorFollowUp: 12,
      closedDeals: 6,
    }

    // WHEN: se calcula la oportunidad
    const result = calculateFollowUpOpportunity(sessionInputs)

    // THEN: venta esperada perdida = $576.000
    expect(result.expectedLostSales).toBeCloseTo(576_000, 0)
    expect(result.closeRate).toBeCloseTo(0.12, 5)
    expect(result.potentialLostClosures).toBeCloseTo(1.44, 5)
  })

  it('el resultado no contiene ROI cuando no hay margen ni inversión', () => {
    // GIVEN: sesión rápida sin datos de profundización
    const result = calculateFollowUpOpportunity({
      monthlyLeads: 50,
      averageTicket: 400_000,
      lostLeadsByPoorFollowUp: 12,
      closedDeals: 6,
    })

    // THEN: roi es undefined (no se calcula sin margen + inversión)
    expect(result.roi).toBeUndefined()
    expect(result.expectedLostGrossProfit).toBeUndefined()
  })

  it('warnings incluyen mensajes pedagógicos sobre margen e inversión', () => {
    // GIVEN: inputs sin margen ni inversión
    const result = calculateFollowUpOpportunity({
      monthlyLeads: 50,
      averageTicket: 400_000,
      lostLeadsByPoorFollowUp: 12,
      closedDeals: 6,
    })

    // THEN: hay warnings sobre margen e inversión
    expect(result.warnings.some(w => w.toLowerCase().includes('margen'))).toBe(true)
    expect(result.warnings.some(w => w.toLowerCase().includes('inversión'))).toBe(true)
  })
})
