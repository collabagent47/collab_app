/**
 * Validaciones y alertas del motor ROI — Collab ROI Explorer MVP
 *
 * Responsabilidades:
 * - Calcular la calidad de los datos de entrada (low / medium / high)
 * - Generar advertencias legibles para el usuario final
 *
 * Sin dependencias de UI ni de servicios externos.
 */

import type { ROIInputs, OperationData, ROIResult } from './roi-types';

// ---------------------------------------------------------------------------
// Constantes de umbrales (GAPS-025 y GAPS-026 resueltos)
// ---------------------------------------------------------------------------

/**
 * Campos críticos usados para calcular la calidad de los datos.
 * El porcentaje de campos rellenos determina la banda: low / medium / high.
 */
const CRITICAL_FIELDS: Array<
  keyof ROIInputs | keyof OperationData
> = [
  'monthlyConversationsLikely',
  'minutesPerConversation',
  'averageTicket',
  'grossMargin',
  'currentCloseRate',
  'expectedCloseRate',
  'hourlyCost',
  'automationPercentage',
  'monthlyInvestment',
];

/** Multiplicador para la alerta de beneficio total vs ventas actuales (GAPS-026). */
const BENEFIT_VS_SALES_ALERT_MULTIPLIER = 5;

// ---------------------------------------------------------------------------
// Calidad de datos
// ---------------------------------------------------------------------------

/**
 * Calcula la calidad de los datos de entrada en función de cuántos campos
 * críticos están rellenos con valores numéricos válidos (> 0).
 *
 * Umbrales (GAPS-025):
 *   - low:    < 40% campos críticos
 *   - medium: 40–75%
 *   - high:   > 75%
 */
export function calculateDataQuality(
  inputs: ROIInputs,
  operation: OperationData,
): 'low' | 'medium' | 'high' {
  const combined: Record<string, unknown> = {
    ...inputs,
    ...operation,
  };

  const filled = CRITICAL_FIELDS.filter((field) => {
    const value = combined[field as string];
    return value !== undefined && value !== null && value !== 0;
  }).length;

  const percentage = (filled / CRITICAL_FIELDS.length) * 100;

  if (percentage < 40) return 'low';
  if (percentage <= 75) return 'medium';
  return 'high';
}

// ---------------------------------------------------------------------------
// Generación de advertencias
// ---------------------------------------------------------------------------

/**
 * Genera un array de strings con las advertencias detectadas.
 * Las advertencias son informativas y no bloquean el flujo.
 *
 * Alertas implementadas:
 *   1. ROI financiero > 1000%
 *   2. Margen bruto > 80%
 *   3. Tasa de cierre esperada > 50%
 *   4. Tasa de cierre esperada < tasa actual
 *   5. Beneficio total > 5× ventas mensuales promedio
 *   6. Margen bruto ausente o cero
 *   7. Campos críticos faltantes
 */
export function generateWarnings(
  inputs: ROIInputs,
  result: Partial<ROIResult>,
  operation: OperationData,
): string[] {
  const warnings: string[] = [];

  const {
    grossMargin,
    expectedCloseRate,
    currentCloseRate,
    monthlyInvestment,
  } = inputs;

  const {
    monthlySalesMin,
    monthlySalesMax,
  } = operation;

  // 1. ROI financiero > 1000%
  if (
    result.financialROI !== undefined &&
    result.financialROI > 1000
  ) {
    warnings.push(
      'El ROI calculado parece muy alto. Revisa el ticket promedio, margen o tasa de cierre esperada.',
    );
  }

  // 2. Margen bruto > 80%
  if (grossMargin !== undefined && grossMargin > 0.8) {
    const marginPct = Math.round(grossMargin * 100);
    warnings.push(
      `Un margen del ${marginPct}% es inusualmente alto. Confirma este dato con el cliente.`,
    );
  }

  // 3. Tasa de cierre esperada > 50%
  if (expectedCloseRate !== undefined && expectedCloseRate > 0.5) {
    const ratePct = Math.round(expectedCloseRate * 100);
    warnings.push(
      `Una tasa de cierre esperada del ${ratePct}% es muy alta. Valida este supuesto.`,
    );
  }

  // 4. Tasa de cierre esperada < tasa actual
  if (
    expectedCloseRate !== undefined &&
    currentCloseRate !== undefined &&
    expectedCloseRate < currentCloseRate
  ) {
    warnings.push(
      'La tasa de cierre esperada es menor que la actual. Verifica los datos.',
    );
  }

  // 5. Beneficio total > 5× ventas mensuales promedio
  if (
    result.totalBenefit !== undefined &&
    monthlySalesMin !== undefined &&
    monthlySalesMax !== undefined &&
    monthlySalesMin + monthlySalesMax > 0
  ) {
    const avgMonthlySales = (monthlySalesMin + monthlySalesMax) / 2;
    if (
      avgMonthlySales > 0 &&
      result.totalBenefit > BENEFIT_VS_SALES_ALERT_MULTIPLIER * avgMonthlySales
    ) {
      warnings.push(
        'El beneficio estimado supera 5 veces las ventas actuales. Revisa las cifras.',
      );
    }
  }

  // 6. Margen bruto ausente o cero
  if (!grossMargin || grossMargin <= 0) {
    warnings.push(
      'Falta el margen bruto. El beneficio comercial no puede calcularse. Márcalo como pendiente.',
    );
  }

  // 7. Campos críticos faltantes
  const combined: Record<string, unknown> = {
    ...inputs,
    ...operation,
  };

  const missing = CRITICAL_FIELDS.filter((field) => {
    const value = combined[field as string];
    return value === undefined || value === null || value === 0;
  });

  // Excluir grossMargin de la lista de "críticos faltantes" si ya se advirtió en #6
  const missingWithoutMargin = (!grossMargin || grossMargin <= 0)
    ? missing.filter((f) => f !== 'grossMargin')
    : missing;

  if (missingWithoutMargin.length > 0) {
    const fieldLabels: Record<string, string> = {
      monthlyConversationsLikely: 'conversaciones mensuales probables',
      minutesPerConversation: 'minutos por conversación',
      averageTicket: 'ticket promedio',
      grossMargin: 'margen bruto',
      currentCloseRate: 'tasa de cierre actual',
      expectedCloseRate: 'tasa de cierre esperada',
      hourlyCost: 'costo hora',
      automationPercentage: 'porcentaje automatizable',
      monthlyInvestment: 'inversión mensual',
    };

    const labels = missingWithoutMargin
      .map((f) => fieldLabels[f as string] ?? f)
      .join(', ');

    warnings.push(`Faltan datos críticos para el cálculo: ${labels}.`);
  }

  // Advertencia especial si no hay inversión mensual para no calcular ROI
  if (!monthlyInvestment || monthlyInvestment <= 0) {
    // Solo agregar si no está ya cubierto por "campos críticos faltantes"
    const alreadyCovered = missingWithoutMargin.includes('monthlyInvestment');
    if (!alreadyCovered) {
      warnings.push(
        'Sin inversión mensual definida no es posible calcular el ROI financiero ni el multiplicador.',
      );
    }
  }

  return warnings;
}
