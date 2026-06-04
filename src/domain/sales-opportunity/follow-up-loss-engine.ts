/**
 * Motor de Oportunidad por Mal Seguimiento — Collab ROI Explorer
 *
 * Calcula cuánto podría estar dejando de vender un cliente por leads
 * mal atendidos o sin seguimiento. Primer nivel de conversación comercial.
 *
 * REGLA CRÍTICA: El resultado principal es "Venta esperada perdida".
 * NO se llama ROI financiero. El ROI requiere margen + inversión (capa 2 opcional).
 *
 * Fórmulas (confirmadas por Ihann, 2026-06-04):
 *   closeRate              = closedDeals / monthlyLeads
 *   lostLeadRate           = lostLeadsByPoorFollowUp / monthlyLeads
 *   grossLostPipeline      = lostLeadsByPoorFollowUp × averageTicket
 *   potentialLostClosures  = lostLeadsByPoorFollowUp × closeRate
 *   expectedLostSales      = potentialLostClosures × averageTicket
 */

import type { FollowUpLossInputs, FollowUpLossResult } from './follow-up-loss-types'

// ---------------------------------------------------------------------------
// Funciones atómicas exportadas
// ---------------------------------------------------------------------------

export function calculateCloseRate(closedDeals: number, monthlyLeads: number): number {
  if (monthlyLeads <= 0) return 0
  return closedDeals / monthlyLeads
}

export function calculateLostLeadRate(lostLeads: number, monthlyLeads: number): number {
  if (monthlyLeads <= 0) return 0
  return lostLeads / monthlyLeads
}

export function calculateGrossLostPipeline(lostLeads: number, averageTicket: number): number {
  return lostLeads * averageTicket
}

export function calculatePotentialLostClosures(lostLeads: number, closeRate: number): number {
  return lostLeads * closeRate
}

export function calculateExpectedLostSales(
  potentialLostClosures: number,
  averageTicket: number,
): number {
  return potentialLostClosures * averageTicket
}

export function calculateExpectedLostGrossProfit(
  expectedLostSales: number,
  grossMargin: number,
): number {
  if (!grossMargin || grossMargin <= 0) return 0
  return expectedLostSales * grossMargin
}

export function calculateRecoverableSales(
  expectedLostSales: number,
  recoverabilityRate: number,
): number {
  if (recoverabilityRate < 0 || recoverabilityRate > 1) return expectedLostSales
  return expectedLostSales * recoverabilityRate
}

export function calculateRecoverableGrossProfit(
  recoverableSales: number,
  grossMargin: number,
): number {
  if (!grossMargin || grossMargin <= 0) return 0
  return recoverableSales * grossMargin
}

export function calculateFollowUpROI(
  recoverableGrossProfit: number,
  operationalSavings: number,
  monthlyInvestment: number,
): number {
  if (!monthlyInvestment || monthlyInvestment <= 0) return 0
  const totalBenefit = recoverableGrossProfit + operationalSavings
  return ((totalBenefit - monthlyInvestment) / monthlyInvestment) * 100
}

// ---------------------------------------------------------------------------
// Generador de warnings pedagógicos
// ---------------------------------------------------------------------------

export function generateFollowUpWarnings(inputs: FollowUpLossInputs): string[] {
  const warnings: string[] = []
  const { monthlyLeads, averageTicket, lostLeadsByPoorFollowUp, closedDeals,
    grossMargin, monthlyInvestment, recoverabilityRate } = inputs

  if (monthlyLeads <= 0) {
    warnings.push('El número de leads por mes debe ser mayor que cero.')
  }

  if (averageTicket <= 0) {
    warnings.push('El ticket promedio debe ser mayor que cero.')
  }

  if (lostLeadsByPoorFollowUp < 0) {
    warnings.push('Los leads perdidos por mal seguimiento no pueden ser negativos.')
  }

  if (closedDeals < 0) {
    warnings.push('Los cierres no pueden ser negativos.')
  }

  if (monthlyLeads > 0 && closedDeals > monthlyLeads) {
    warnings.push('Los cierres no pueden superar el total de leads del mes. Revisa los datos.')
  }

  if (monthlyLeads > 0 && lostLeadsByPoorFollowUp > monthlyLeads) {
    warnings.push('Los leads perdidos por mal seguimiento no pueden superar el total de leads del mes.')
  }

  if (monthlyLeads > 0 && lostLeadsByPoorFollowUp / monthlyLeads > 0.5) {
    warnings.push(
      'El porcentaje de leads perdidos es alto. Verifica si corresponde a leads realmente perdidos, cotizaciones sin seguimiento o prospectos no calificados.',
    )
  }

  if (grossMargin === undefined || grossMargin === null) {
    warnings.push(
      'Para convertir la venta esperada perdida en beneficio necesitamos un margen estimado. No calculamos ROI con ventas brutas.',
    )
  }

  if (grossMargin !== undefined && (grossMargin <= 0 || grossMargin > 1)) {
    warnings.push('El margen bruto debe estar entre 0% y 100%.')
  }

  if (grossMargin !== undefined && grossMargin > 0.8) {
    warnings.push('Un margen del ' + Math.round(grossMargin * 100) + '% es inusualmente alto. Confirma este dato.')
  }

  if (monthlyInvestment === undefined || monthlyInvestment === null) {
    warnings.push(
      'Esta cifra muestra oportunidad comercial, pero aún no ROI. Para calcular ROI necesitamos la inversión mensual de la solución.',
    )
  }

  if (recoverabilityRate !== undefined && (recoverabilityRate < 0 || recoverabilityRate > 1)) {
    warnings.push('La tasa de recuperabilidad debe estar entre 0 y 1.')
  }

  return warnings
}

// ---------------------------------------------------------------------------
// Función principal orquestadora
// ---------------------------------------------------------------------------

export function calculateFollowUpOpportunity(inputs: FollowUpLossInputs): FollowUpLossResult {
  const {
    monthlyLeads,
    averageTicket,
    lostLeadsByPoorFollowUp,
    closedDeals,
    grossMargin,
    recoverabilityRate,
    monthlyInvestment,
    operationalSavings = 0,
  } = inputs

  const warnings = generateFollowUpWarnings(inputs)

  // --- Nivel 1 — siempre calculado ---
  const closeRate = calculateCloseRate(closedDeals, monthlyLeads)
  const lostLeadRate = calculateLostLeadRate(lostLeadsByPoorFollowUp, monthlyLeads)
  const grossLostPipeline = calculateGrossLostPipeline(lostLeadsByPoorFollowUp, averageTicket)
  const potentialLostClosures = calculatePotentialLostClosures(lostLeadsByPoorFollowUp, closeRate)
  const expectedLostSales = calculateExpectedLostSales(potentialLostClosures, averageTicket)

  const result: FollowUpLossResult = {
    closeRate,
    lostLeadRate,
    grossLostPipeline,
    potentialLostClosures,
    expectedLostSales,
    warnings,
  }

  // --- Nivel 2 — requiere grossMargin ---
  if (grossMargin !== undefined && grossMargin > 0) {
    result.expectedLostGrossProfit = calculateExpectedLostGrossProfit(expectedLostSales, grossMargin)

    const effectiveRecovery = recoverabilityRate !== undefined ? recoverabilityRate : 1
    result.recoverableSales = calculateRecoverableSales(expectedLostSales, effectiveRecovery)
    result.recoverableGrossProfit = calculateRecoverableGrossProfit(result.recoverableSales, grossMargin)

    // --- Nivel 3 — requiere monthlyInvestment ---
    if (monthlyInvestment !== undefined && monthlyInvestment > 0) {
      result.roi = calculateFollowUpROI(result.recoverableGrossProfit, operationalSavings, monthlyInvestment)
    }
  }

  return result
}
