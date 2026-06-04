/**
 * Fixtures de regresión — Collab ROI Explorer MVP
 *
 * Datos de prueba tipados para los tests del motor ROI.
 * Basados en el caso real Fertilizantes Mix (src/data/comercial/Fertilizantes Mix/).
 *
 * Caso de regresión principal — CRITERIO-4.1 / DoD-027:
 *   conversaciones: 270 | minutos: 8 | automatización: 60% | costo hora: $15.000
 *   ticket: $350.000 | margen: 20% | cierre actual: 10% | cierre esperado: 13%
 *   inversión mensual: $700.000
 *
 * Resultados exactos (escenario MEDIO — spec confirmada):
 *   monthlyHours       = 270 × 8 / 60                    = 36 h
 *   savedHours         = 36 × 0.60                       = 21.6 h (sin redondeo)
 *   operationalSavings = Math.round(21.6 × 15.000)       = $324.000
 *   additionalSales    = 270 × 0.03 × 350.000            = $2.835.000
 *   commercialBenefit  = 2.835.000 × 0.20                = $567.000
 *   totalBenefit       = 324.000 + 567.000               = $891.000
 *   financialROI       = ((891.000 - 700.000) / 700.000) = ~27.2857%
 *   multiplier         = 891.000 / 700.000               = ~1.2728
 *   paybackMonths      = 700.000 / 891.000               = ~0.7856
 *
 * Fuente: src/data/comercial/Fertilizantes Mix/Exploracion.docx
 * Sector: Agroinsumos / Popayán - Cauca / Canal WhatsApp
 */

import type { ROIInputs, OperationData } from './roi-types';

// ---------------------------------------------------------------------------
// Fixture 1: FERTILIZANTES_MIX_MEDIUM — caso completo sector Agroinsumos
// ---------------------------------------------------------------------------

export const FERTILIZANTES_MIX_INPUTS: ROIInputs = {
  averageTicket: 350_000,
  grossMargin: 0.20,
  currentCloseRate: 0.10,
  expectedCloseRate: 0.13,
  monthlyInvestment: 700_000,
  hourlyCost: 15_000,
  automationPercentage: 0.60,
};

export const FERTILIZANTES_MIX_OPERATION: OperationData = {
  monthlyConversationsMin: 216,   // 80% de 270
  monthlyConversationsLikely: 270,
  monthlyConversationsMax: 324,   // 120% de 270
  minutesPerConversation: 8,
  currentAttentionRate: 75,
  teamSize: 5,
  monthlySalesMin: 3_000_000,
  monthlySalesMax: 6_000_000,
  averageClosingTimeDays: 7,
};

/**
 * Resultados esperados para el escenario MEDIO de Fertilizantes Mix.
 * Valores conceptuales SIN redondeo intermedio de savedHours.
 * Usar en tests como referencia de fórmula, no como salida exacta del motor.
 */
export const FERTILIZANTES_MIX_MEDIUM_EXPECTED = {
  /** monthlyHours = 270 × 8 / 60 = 36 */
  monthlyHours: 36,
  /** savedHours = 36 × 0.60 = 21.6 → sin redondeo */
  savedHoursExact: 21.6,
  /** operationalSavings = 21.6 × 15.000 = 324.000 (spec original) */
  operationalSavings: 324_000,
  /** additionalSales = 270 × 0.03 × 350.000 = 2.835.000 */
  additionalSales: 2_835_000,
  /** commercialBenefit = 2.835.000 × 0.20 = 567.000 */
  commercialBenefit: 567_000,
  /** totalBenefit = 324.000 + 567.000 = 891.000 (spec original) */
  totalBenefit: 891_000,
  /** financialROI = ((891.000 - 700.000) / 700.000) × 100 ≈ 27.28% */
  financialROI: 27.28,
  /** multiplier = 891.000 / 700.000 ≈ 1.27 */
  multiplier: 1.27,
  /** paybackMonths = 700.000 / 891.000 ≈ 0.785 */
  paybackMonths: 0.785,
};

/**
 * Fixture completo Fertilizantes Mix — escenario medio.
 * Usado en tests de regresión (DoD-027 / CRITERIO-4.1).
 */
export const FERTILIZANTES_MIX_MEDIUM = {
  inputs: FERTILIZANTES_MIX_INPUTS,
  operation: FERTILIZANTES_MIX_OPERATION,
  expected: FERTILIZANTES_MIX_MEDIUM_EXPECTED,
  description:
    'Caso de regresión principal — sector Agroinsumos, datos completos, escenario medio',
};

// ---------------------------------------------------------------------------
// Fixture 2: CLIENTE_DATOS_INCOMPLETOS — sin grossMargin
// Valida que commercialBenefit = 0 cuando falta el margen bruto (CRITERIO-4.4).
// ---------------------------------------------------------------------------

export const CLIENTE_DATOS_INCOMPLETOS_INPUTS: ROIInputs = {
  averageTicket: 350_000,
  // grossMargin: deliberadamente ausente
  currentCloseRate: 0.10,
  expectedCloseRate: 0.13,
  monthlyInvestment: 700_000,
  hourlyCost: 15_000,
  automationPercentage: 0.60,
};

export const CLIENTE_DATOS_INCOMPLETOS_OPERATION: OperationData = {
  monthlyConversationsLikely: 270,
  minutesPerConversation: 8,
};

export const CLIENTE_DATOS_INCOMPLETOS = {
  inputs: CLIENTE_DATOS_INCOMPLETOS_INPUTS,
  operation: CLIENTE_DATOS_INCOMPLETOS_OPERATION,
  expected: {
    commercialBenefit: 0,
    /** operationalSavings sigue calculándose (ahorro operativo sí aplica). */
    operationalSavingsGreaterThanZero: true,
    hasGrossMarginWarning: true,
  },
  description:
    'Cliente sin grossMargin — commercialBenefit debe ser 0, operationalSavings se calcula normalmente',
};

// ---------------------------------------------------------------------------
// Fixture 3: ROI_EXAGERADO_INMOBILIARIA — datos que disparan alertas
// Valida que el motor genera warnings de ROI > 1000% (CRITERIO-4.6).
// ---------------------------------------------------------------------------

export const ROI_EXAGERADO_INMOBILIARIA_INPUTS: ROIInputs = {
  averageTicket: 180_000_000,   // $180M — ticket inmobiliario
  grossMargin: 0.03,            // 3% — margen bajo típico inmobiliario
  currentCloseRate: 0.02,
  expectedCloseRate: 0.05,      // 3% de mejora sobre base muy baja
  monthlyInvestment: 700_000,
  hourlyCost: 25_000,
  automationPercentage: 0.50,
};

export const ROI_EXAGERADO_INMOBILIARIA_OPERATION: OperationData = {
  monthlyConversationsMin: 960,
  monthlyConversationsLikely: 1_200,
  monthlyConversationsMax: 1_440,
  minutesPerConversation: 15,
  monthlySalesMin: 1_800_000_000,
  monthlySalesMax: 3_600_000_000,
};

export const ROI_EXAGERADO_INMOBILIARIA = {
  inputs: ROI_EXAGERADO_INMOBILIARIA_INPUTS,
  operation: ROI_EXAGERADO_INMOBILIARIA_OPERATION,
  expected: {
    /** El ROI financiero calculado debe superar 1000%. */
    financialROIOver1000: true,
    hasHighROIWarning: true,
    /** El beneficio total debe superar 5× las ventas mensuales promedio. */
    hasBenefitVsSalesWarning: true,
  },
  description:
    'Inmobiliaria con ticket $180M y 1200 conversaciones — debe activar alertas de ROI > 1000%',
};
