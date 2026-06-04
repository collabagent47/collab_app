/**
 * Tipos del dominio de oportunidad por mal seguimiento.
 *
 * Este dominio es INDEPENDIENTE del motor ROI financiero completo (src/domain/roi/).
 * Representa el primer nivel de conversación comercial con el cliente —
 * estimar cuánto podría estar dejando de vender por leads mal atendidos.
 *
 * El resultado principal es `expectedLostSales` ("Venta esperada perdida").
 * NO se llama ROI. El ROI completo requiere margen + inversión (capa opcional).
 */

export type FollowUpLossInputs = {
  // --- Campos obligatorios ---
  monthlyLeads: number;               // Leads totales que llegan por mes
  averageTicket: number;              // Venta promedio por lead (COP)
  lostLeadsByPoorFollowUp: number;    // Leads perdidos por mal seguimiento o sin respuesta
  closedDeals: number;                // Cierres reales logrados en el mes

  // --- Campos opcionales — capa 2 (Profundizar con ROI) ---
  grossMargin?: number;               // Margen bruto como fracción (0.20 = 20%)
  recoverabilityRate?: number;        // Fracción de leads perdidos recuperables (0.0–1.0)
  monthlyInvestment?: number;         // Inversión mensual en la solución Collab (COP)
  operationalSavings?: number;        // Ahorro operativo adicional estimado (COP)
}

export type FollowUpLossResult = {
  // --- Métricas de diagnóstico ---
  closeRate: number;                  // Tasa de cierre actual = closedDeals / monthlyLeads
  lostLeadRate: number;               // Fracción de leads perdidos = lostLeads / monthlyLeads

  // --- Resultado principal (nivel 1 — siempre presente) ---
  grossLostPipeline: number;          // Valor bruto leads perdidos = lostLeads × ticket (no es pérdida real)
  potentialLostClosures: number;      // Cierres potenciales perdidos = lostLeads × closeRate
  expectedLostSales: number;          // VENTA ESPERADA PERDIDA = potentialLostClosures × ticket

  // --- Resultado profundidad (nivel 2 — requiere grossMargin) ---
  expectedLostGrossProfit?: number;   // expectedLostSales × grossMargin
  recoverableSales?: number;          // expectedLostSales × recoverabilityRate
  recoverableGrossProfit?: number;    // recoverableSales × grossMargin

  // --- ROI completo (nivel 3 — requiere grossMargin + monthlyInvestment) ---
  roi?: number;                       // ((recoverableGrossProfit + operationalSavings - investment) / investment) × 100

  // --- Feedback ---
  warnings: string[];
}
