/**
 * Escenarios ROI — Collab ROI Explorer MVP
 *
 * Calcula los tres escenarios (conservador, medio, optimista) aplicando
 * factores fijos sobre las entradas base.
 *
 * Factores resueltos (GAPS-027):
 *   - Conservador: monthlyConversationsMin, automationPct×0.8, closeRateImprovement×0.8
 *   - Medio:       monthlyConversationsLikely, factores×1.0
 *   - Optimista:   monthlyConversationsMax, automationPct×1.2, closeRateImprovement×1.2
 *
 * Display default: optimista (destacado).
 * Sin dependencias de UI ni de servicios externos.
 */

import type {
  ROIInputs,
  OperationData,
  ROIResult,
  ROIScenarioResults,
} from './roi-types';

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
} from './roi-engine';

import { calculateDataQuality, generateWarnings } from './roi-validations';

// ---------------------------------------------------------------------------
// Factores de escenario
// ---------------------------------------------------------------------------

const SCENARIO_FACTORS = {
  conservative: { automationFactor: 0.8, closeRateFactor: 0.8 },
  medium: { automationFactor: 1.0, closeRateFactor: 1.0 },
  optimistic: { automationFactor: 1.2, closeRateFactor: 1.2 },
} as const;

// ---------------------------------------------------------------------------
// Cálculo de un escenario individual
// ---------------------------------------------------------------------------

/**
 * Calcula el ROIResult para un escenario específico usando los factores dados.
 */
function calculateScenario(
  inputs: ROIInputs,
  operation: OperationData,
  conversations: number,
  automationFactor: number,
  closeRateFactor: number,
): ROIResult {
  const {
    grossMargin,
    currentCloseRate = 0,
    expectedCloseRate = 0,
    monthlyInvestment = 0,
    hourlyCost = 0,
    automationPercentage = 0,
    averageTicket = 0,
  } = inputs;

  const { minutesPerConversation = 0 } = operation;

  // Aplicar factores de escenario
  const effectiveAutomation = automationPercentage * automationFactor;

  // La mejora en tasa de cierre base × factor del escenario
  const baseCloseRateImprovement = calculateCloseRateImprovement(
    expectedCloseRate,
    currentCloseRate,
  );
  const effectiveCloseRateImprovement = baseCloseRateImprovement * closeRateFactor;

  // Horas y ahorro operativo
  const monthlyHours = calculateMonthlyHours(conversations, minutesPerConversation);
  const savedHours = calculateSavedHours(monthlyHours, effectiveAutomation);
  const operationalSavings = calculateOperationalSavings(savedHours, hourlyCost);

  // Beneficio comercial
  const additionalSales = calculateAdditionalSales(
    conversations,
    effectiveCloseRateImprovement,
    averageTicket,
  );

  // REGLA CRÍTICA: si grossMargin no está disponible, commercialBenefit = 0
  const commercialBenefit = calculateCommercialBenefit(
    additionalSales,
    grossMargin ?? 0,
  );

  // Totales
  const totalBenefit = calculateTotalBenefit(operationalSavings, commercialBenefit);
  const financialROI = calculateFinancialROI(totalBenefit, monthlyInvestment);
  const multiplier = calculateMultiplier(totalBenefit, monthlyInvestment);
  const paybackMonths = calculatePayback(monthlyInvestment, totalBenefit);

  // Calidad y advertencias para este escenario
  const confidence = calculateDataQuality(inputs, operation);

  // Construir resultado parcial para generar warnings
  const partialResult: Partial<ROIResult> = {
    financialROI,
    totalBenefit,
    commercialBenefit,
    additionalSales,
    operationalSavings,
    savedHours,
    monthlyHours,
    closeRateImprovement: effectiveCloseRateImprovement,
    multiplier,
    paybackMonths,
  };

  const warnings = generateWarnings(inputs, partialResult, operation);

  return {
    monthlyHours,
    savedHours,
    operationalSavings,
    closeRateImprovement: effectiveCloseRateImprovement,
    additionalSales,
    commercialBenefit,
    totalBenefit,
    financialROI,
    multiplier,
    paybackMonths,
    warnings,
    confidence,
  };
}

// ---------------------------------------------------------------------------
// Función principal
// ---------------------------------------------------------------------------

/**
 * Calcula los tres escenarios ROI (conservador, medio, optimista).
 *
 * - Conservador usa `monthlyConversationsMin` y factores×0.8
 * - Medio usa `monthlyConversationsLikely` y factores×1.0
 * - Optimista usa `monthlyConversationsMax` y factores×1.2
 *
 * Display default: el componente debe resaltar el escenario optimista.
 */
export function calculateScenarios(
  inputs: ROIInputs,
  operation: OperationData,
): ROIScenarioResults {
  const {
    monthlyConversationsMin = 0,
    monthlyConversationsLikely = 0,
    monthlyConversationsMax = 0,
  } = operation;

  const conservative = calculateScenario(
    inputs,
    operation,
    monthlyConversationsMin,
    SCENARIO_FACTORS.conservative.automationFactor,
    SCENARIO_FACTORS.conservative.closeRateFactor,
  );

  const medium = calculateScenario(
    inputs,
    operation,
    monthlyConversationsLikely,
    SCENARIO_FACTORS.medium.automationFactor,
    SCENARIO_FACTORS.medium.closeRateFactor,
  );

  const optimistic = calculateScenario(
    inputs,
    operation,
    monthlyConversationsMax,
    SCENARIO_FACTORS.optimistic.automationFactor,
    SCENARIO_FACTORS.optimistic.closeRateFactor,
  );

  return { conservative, medium, optimistic };
}
