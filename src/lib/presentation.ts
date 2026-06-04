/**
 * DTO mapper para modo presentación.
 * Extrae SOLO los campos seguros para mostrar al cliente.
 * Excluye explícitamente: notes, sessionPreparations, roiInputs, operation (raw),
 * cualquier dato interno no presentable.
 */

import type { Exploration, RecommendedModule, OpportunityType, ROIScenarioResults } from '../domain/roi/roi-types'
import type { User, UserRole } from '../domain/auth/auth-types'

export interface PresentationViewModel {
  clientName: string
  sector: string
  city?: string
  mainChannel?: string
  mainProduct?: string
  targetCustomer?: string
  improvementGoal?: string
  frictionIds: string[]
  recommendedModules: RecommendedModule[]
  opportunityType?: OpportunityType
  roiResults?: ROIScenarioResults
  executiveSummary?: string
}

/**
 * Convierte una Exploration completa en un ViewModel seguro para presentación al cliente.
 * NINGÚN campo interno (notes, sessionPreparations, roiInputs, operation) pasa este filtro.
 * Si el usuario es viewer o learner, el ViewModel retorna un subconjunto reducido de campos.
 */
export function toPresentationViewModel(
  exploration: Exploration,
  user?: User | null,
): PresentationViewModel {
  const effectiveRole: UserRole = user?.role ?? 'viewer'
  const isRestrictedViewer = effectiveRole === 'viewer' || effectiveRole === 'learner'

  if (isRestrictedViewer) {
    return {
      clientName: exploration.clientName,
      sector: exploration.sector,
      opportunityType: exploration.opportunityType,
      frictionIds: exploration.frictionIds,
      recommendedModules: exploration.recommendedModules.filter(
        (m) => m.status === 'included_mvp',
      ),
      roiResults: exploration.roiResults
        ? { optimistic: exploration.roiResults.optimistic } as ROIScenarioResults
        : undefined,
      executiveSummary: exploration.executiveSummary,
      // EXCLUIDOS PARA VIEWER/LEARNER:
      // city, mainChannel, mainProduct, targetCustomer, improvementGoal
    }
  }

  return {
    clientName: exploration.clientName,
    sector: exploration.sector,
    city: exploration.city,
    mainChannel: exploration.mainChannel,
    mainProduct: exploration.mainProduct,
    targetCustomer: exploration.targetCustomer,
    improvementGoal: exploration.improvementGoal,
    frictionIds: exploration.frictionIds,
    recommendedModules: exploration.recommendedModules,
    opportunityType: exploration.opportunityType,
    roiResults: exploration.roiResults,
    executiveSummary: exploration.executiveSummary,
    // EXCLUIDOS DELIBERADAMENTE:
    // exploration.notes            — notas internas del equipo
    // exploration.sessionPreparations — preparaciones de sesión internas
    // exploration.roiInputs        — datos técnicos de entrada al motor
    // exploration.operation        — datos operativos crudos
    // exploration.insumos          — catálogo interno de productos
    // exploration.dataQuality      — métrica interna de calidad
    // exploration.guidedAnswers    — respuestas guía internas de sesión rápida
  }
}
