/**
 * Motor ROI — Collab ROI Explorer MVP
 *
 * Funciones puras de cálculo. Sin efectos secundarios, sin imports de UI,
 * sin acceso a localStorage ni a servicios externos.
 *
 * Todas las unidades monetarias están en COP.
 * Los porcentajes se reciben como fracción (0.20 = 20%).
 */

import type { ROIInputs, OperationData, ROIResult } from './roi-types';

// ---------------------------------------------------------------------------
// Funciones atómicas exportadas
// ---------------------------------------------------------------------------

/**
 * Calcula las horas mensuales totales invertidas en conversaciones.
 * monthlyHours = conversations × minutesPerConversation / 60
 */
export function calculateMonthlyHours(
  conversations: number,
  minutesPerConversation: number,
): number {
  return (conversations * minutesPerConversation) / 60;
}

/**
 * Calcula las horas mensuales ahorradas con la automatización.
 * savedHours = monthlyHours × automationPercentage
 */
export function calculateSavedHours(
  monthlyHours: number,
  automationPercentage: number,
): number {
  return monthlyHours * automationPercentage;
}

/**
 * Calcula el ahorro operativo mensual en COP.
 * operationalSavings = savedHours × hourlyCost
 */
export function calculateOperationalSavings(
  savedHours: number,
  hourlyCost: number,
): number {
  return Math.round(savedHours * hourlyCost);
}

/**
 * Calcula la mejora en tasa de cierre.
 * closeRateImprovement = expectedCloseRate − currentCloseRate
 */
export function calculateCloseRateImprovement(
  expected: number,
  current: number,
): number {
  return expected - current;
}

/**
 * Calcula las ventas adicionales brutas en COP.
 * additionalSales = conversations × closeRateImprovement × averageTicket
 *
 * IMPORTANTE: Este valor NO se usa directamente como beneficio.
 * Debe multiplicarse por el margen bruto (ver calculateCommercialBenefit).
 */
export function calculateAdditionalSales(
  conversations: number,
  improvement: number,
  ticket: number,
): number {
  return Math.round(conversations * improvement * ticket);
}

/**
 * Calcula el beneficio comercial neto en COP.
 * commercialBenefit = additionalSales × grossMargin
 *
 * REGLA CRÍTICA: NUNCA retornar additionalSales directamente como beneficio.
 * Si grossMargin es undefined, 0 o null → retorna 0.
 */
export function calculateCommercialBenefit(
  additionalSales: number,
  grossMargin: number,
): number {
  if (!grossMargin || grossMargin <= 0) return 0;
  return Math.round(additionalSales * grossMargin);
}

/**
 * Calcula el beneficio total mensual en COP.
 * totalBenefit = operationalSavings + commercialBenefit
 */
export function calculateTotalBenefit(
  operationalSavings: number,
  commercialBenefit: number,
): number {
  return operationalSavings + commercialBenefit;
}

/**
 * Calcula el ROI financiero en porcentaje.
 * financialROI = ((totalBenefit − monthlyInvestment) / monthlyInvestment) × 100
 *
 * Retorna 0 si monthlyInvestment es 0 o undefined (evita división por cero).
 */
export function calculateFinancialROI(
  totalBenefit: number,
  monthlyInvestment: number,
): number {
  if (!monthlyInvestment || monthlyInvestment <= 0) return 0;
  return ((totalBenefit - monthlyInvestment) / monthlyInvestment) * 100;
}

/**
 * Calcula el multiplicador de retorno.
 * multiplier = totalBenefit / monthlyInvestment
 *
 * Retorna 0 si monthlyInvestment es 0 o undefined.
 */
export function calculateMultiplier(
  totalBenefit: number,
  monthlyInvestment: number,
): number {
  if (!monthlyInvestment || monthlyInvestment <= 0) return 0;
  return totalBenefit / monthlyInvestment;
}

/**
 * Calcula los meses de payback (recuperación de inversión).
 * paybackMonths = monthlyInvestment / totalBenefit
 *
 * Retorna null si totalBenefit === 0 para evitar división por cero.
 */
export function calculatePayback(
  monthlyInvestment: number,
  totalBenefit: number,
): number | null {
  if (totalBenefit === 0) return null;
  if (!monthlyInvestment || monthlyInvestment <= 0) return 0;
  return monthlyInvestment / totalBenefit;
}

// ---------------------------------------------------------------------------
// Función principal orquestadora
// ---------------------------------------------------------------------------

/**
 * Calcula el ROI a partir de las entradas y la operación del cliente.
 * Retorna un Partial<ROIResult> — los campos pueden estar ausentes si faltan datos.
 *
 * Esta función NO genera warnings ni calcula confidence (eso es responsabilidad
 * de roi-validations.ts). El resultado parcial lo enriquece la capa de validación.
 */
export function calculateROI(
  inputs: ROIInputs,
  operation: OperationData,
): Partial<ROIResult> {
  const {
    grossMargin,
    currentCloseRate,
    expectedCloseRate,
    monthlyInvestment,
    hourlyCost,
    automationPercentage,
    averageTicket,
  } = inputs;

  const {
    monthlyConversationsLikely,
    minutesPerConversation,
  } = operation;

  const result: Partial<ROIResult> = {};

  // --- Ahorro operativo ---
  if (
    monthlyConversationsLikely !== undefined &&
    minutesPerConversation !== undefined
  ) {
    result.monthlyHours = calculateMonthlyHours(
      monthlyConversationsLikely,
      minutesPerConversation,
    );

    if (automationPercentage !== undefined) {
      result.savedHours = calculateSavedHours(
        result.monthlyHours,
        automationPercentage,
      );

      if (hourlyCost !== undefined) {
        result.operationalSavings = calculateOperationalSavings(
          result.savedHours,
          hourlyCost,
        );
      }
    }
  }

  // --- Beneficio comercial ---
  if (
    currentCloseRate !== undefined &&
    expectedCloseRate !== undefined
  ) {
    result.closeRateImprovement = calculateCloseRateImprovement(
      expectedCloseRate,
      currentCloseRate,
    );

    if (
      monthlyConversationsLikely !== undefined &&
      averageTicket !== undefined
    ) {
      result.additionalSales = calculateAdditionalSales(
        monthlyConversationsLikely,
        result.closeRateImprovement,
        averageTicket,
      );

      // REGLA CRÍTICA: commercialBenefit solo con grossMargin válido
      result.commercialBenefit = calculateCommercialBenefit(
        result.additionalSales,
        grossMargin ?? 0,
      );
    }
  }

  // Si grossMargin no está disponible, forzar commercialBenefit = 0
  if (!grossMargin || grossMargin <= 0) {
    result.commercialBenefit = 0;
  }

  // --- Totales (solo si hay datos suficientes) ---
  const opSavings = result.operationalSavings ?? 0;
  const commBenefit = result.commercialBenefit ?? 0;

  if (
    result.operationalSavings !== undefined ||
    result.commercialBenefit !== undefined
  ) {
    result.totalBenefit = calculateTotalBenefit(opSavings, commBenefit);

    if (monthlyInvestment !== undefined) {
      result.financialROI = calculateFinancialROI(
        result.totalBenefit,
        monthlyInvestment,
      );
      result.multiplier = calculateMultiplier(
        result.totalBenefit,
        monthlyInvestment,
      );
      result.paybackMonths = calculatePayback(
        monthlyInvestment,
        result.totalBenefit,
      );
    }
  }

  return result;
}
