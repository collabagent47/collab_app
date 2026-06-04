/**
 * Tipos del dominio Knowledge Base — Collab ROI Explorer MVP
 *
 * Punto de entrada del dominio knowledge-base.
 * Re-exporta los tipos relevantes desde roi-types.ts para que los consumidores
 * de la base de conocimiento importen desde aquí sin depender del módulo ROI.
 */

export type {
  Friction,
  KnowledgeSuggestion,
  KnowledgeSuggestionType,
  FrictionOrigin,
  OpportunityType,
  RecommendedModule,
} from '../roi/roi-types';
