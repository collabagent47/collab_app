/**
 * Fixtures del motor de Oportunidad por Mal Seguimiento.
 *
 * Fuente: Ihann, 2026-06-04 (audio WhatsApp + Calculadora Hubspot)
 * Caso real: cliente genérico con 50 leads/mes, ticket $400k, 6 cierres, 12 sin seguimiento.
 */

import type { FollowUpLossInputs } from './follow-up-loss-types'

/** Caso canónico Ihann — CP-001 a CP-005 */
export const IHANN_BASE: FollowUpLossInputs = {
  monthlyLeads: 50,
  averageTicket: 400_000,
  lostLeadsByPoorFollowUp: 12,
  closedDeals: 6,
}

/** CP-002: con margen 20% */
export const IHANN_WITH_MARGIN: FollowUpLossInputs = {
  ...IHANN_BASE,
  grossMargin: 0.20,
}

/** CP-003: con margen + recuperación 50% */
export const IHANN_WITH_RECOVERY: FollowUpLossInputs = {
  ...IHANN_WITH_MARGIN,
  recoverabilityRate: 0.50,
}

/** CP-004: con margen + inversión $700k (sin ahorro operativo) */
export const IHANN_WITH_INVESTMENT: FollowUpLossInputs = {
  ...IHANN_WITH_MARGIN,
  monthlyInvestment: 700_000,
}

/** CP-005: con margen + inversión + ahorro operativo $324k */
export const IHANN_WITH_SAVINGS: FollowUpLossInputs = {
  ...IHANN_WITH_INVESTMENT,
  operationalSavings: 324_000,
}

/**
 * Outputs esperados del caso canónico Ihann (CP-001).
 * Confirmados por Ihann y coinciden con la Calculadora Hubspot.
 */
export const IHANN_EXPECTED_CP001 = {
  closeRate: 0.12,
  lostLeadRate: 0.24,
  grossLostPipeline: 4_800_000,
  potentialLostClosures: 1.44,
  expectedLostSales: 576_000,
} as const
