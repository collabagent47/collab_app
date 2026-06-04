/**
 * Tipos del dominio ROI — Collab ROI Explorer MVP
 * Punto de entrada de todos los tipos de la capa de dominio ROI.
 * Sin dependencias de UI.
 */

// ---------------------------------------------------------------------------
// Enumeraciones de estado y clasificación
// ---------------------------------------------------------------------------

export type ExplorationStatus =
  | 'draft'
  | 'in_progress'
  | 'incomplete_data'
  | 'roi_calculated'
  | 'summary_generated'
  | 'proposal_sent'
  | 'closed_won'
  | 'closed_lost'
  | 'discarded';

export type OpportunityType = 'commercial' | 'operational' | 'mixed';

/** Nivel de certeza de un dato capturado. */
export type DataConfidence = 'confirmed' | 'assumption' | 'pending';

export type UserMode = 'learner' | 'expert';

// ---------------------------------------------------------------------------
// Insumos / productos del cliente
// ---------------------------------------------------------------------------

export interface Insumo {
  id: string;
  name: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  /** Precio promedio en COP — se usa como sugerencia para averageTicket en ROIInputs. */
  avgPrice?: number;
  unit?: string;
  marginEstimate?: number;
  notes?: string;
  confidence: DataConfidence;
}

// ---------------------------------------------------------------------------
// Datos operativos del cliente
// ---------------------------------------------------------------------------

export interface OperationData {
  /** Rango mínimo de conversaciones mensuales. */
  monthlyConversationsMin?: number;
  /** Estimado más probable de conversaciones mensuales. */
  monthlyConversationsLikely?: number;
  /** Rango máximo de conversaciones mensuales. */
  monthlyConversationsMax?: number;
  /** Porcentaje de atención actual (0–100). */
  currentAttentionRate?: number;
  teamSize?: number;
  monthlySalesMin?: number;
  monthlySalesMax?: number;
  /** Minutos promedio dedicados por conversación. */
  minutesPerConversation?: number;
  averageClosingTimeDays?: number;
}

// ---------------------------------------------------------------------------
// Entradas del motor ROI
// ---------------------------------------------------------------------------

export interface ROIInputs {
  /** Ticket promedio en COP. */
  averageTicket?: number;
  /** Margen bruto como fracción (0.20 = 20%). */
  grossMargin?: number;
  /** Tasa de cierre actual como fracción (0.10 = 10%). */
  currentCloseRate?: number;
  /** Tasa de cierre esperada con la solución como fracción. */
  expectedCloseRate?: number;
  /** Inversión mensual en la solución Collab, en COP. */
  monthlyInvestment?: number;
  /** Costo hora del equipo en COP. */
  hourlyCost?: number;
  /** Porcentaje de conversaciones automatizables como fracción (0.60 = 60%). */
  automationPercentage?: number;
}

// ---------------------------------------------------------------------------
// Resultado de un cálculo ROI individual
// ---------------------------------------------------------------------------

export interface ROIResult {
  /** Horas mensuales totales gastadas en conversaciones antes de automatización. */
  monthlyHours: number;
  /** Horas mensuales ahorradas con la automatización. */
  savedHours: number;
  /** Ahorro operativo en COP (savedHours × hourlyCost). */
  operationalSavings: number;
  /** Incremento en tasa de cierre (expectedCloseRate − currentCloseRate). */
  closeRateImprovement: number;
  /** Ventas adicionales brutas en COP (no usar directamente como beneficio). */
  additionalSales: number;
  /**
   * Beneficio comercial en COP = additionalSales × grossMargin.
   * Si grossMargin es 0 o undefined, este valor es 0.
   */
  commercialBenefit: number;
  /** Beneficio total mensual = operationalSavings + commercialBenefit. */
  totalBenefit: number;
  /** ROI financiero en porcentaje = ((totalBenefit − monthlyInvestment) / monthlyInvestment) × 100. */
  financialROI: number;
  /** Multiplicador = totalBenefit / monthlyInvestment. */
  multiplier: number;
  /**
   * Meses para recuperar la inversión = monthlyInvestment / totalBenefit.
   * null si totalBenefit === 0 (evita división por cero).
   */
  paybackMonths: number | null;
  /** Advertencias generadas por la capa de validación. */
  warnings: string[];
  /** Nivel de confianza calculado a partir de la calidad de los datos. */
  confidence: 'low' | 'medium' | 'high';
}

// ---------------------------------------------------------------------------
// Escenarios ROI
// ---------------------------------------------------------------------------

export interface ROIScenarioResults {
  conservative: ROIResult;
  medium: ROIResult;
  optimistic: ROIResult;
}

// ---------------------------------------------------------------------------
// Preparación de sesión
// ---------------------------------------------------------------------------

export type SessionType =
  | 'first_meeting'
  | 'follow_up'
  | 'data_validation'
  | 'proposal_presentation';

export interface SessionPreparation {
  id: string;
  sessionType: SessionType;
  objective: string;
  questions: string[];
  pendingData: string[];
  assumptions: string[];
  checklist: string[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Módulos recomendados de automatización
// ---------------------------------------------------------------------------

export interface RecommendedModule {
  id: string;
  name: string;
  description: string;
  status: 'included_mvp' | 'optional' | 'phase_2' | 'not_applicable';
  relatedFrictionIds: string[];
  explanation: string;
}

// ---------------------------------------------------------------------------
// Notas internas (NUNCA visibles en modo presentación)
// ---------------------------------------------------------------------------

export interface InternalNote {
  id: string;
  content: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Entidad principal: Exploración de cliente
// ---------------------------------------------------------------------------

export interface Exploration {
  id: string;
  clientName: string;
  sector: string;
  city?: string;
  mainChannel?: string;
  mainProduct?: string;
  targetCustomer?: string;
  improvementGoal?: string;
  contactName?: string;
  contactRole?: string;
  status: ExplorationStatus;
  opportunityType?: OpportunityType;
  dataQuality?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  sessionPreparations: SessionPreparation[];
  operation: OperationData;
  insumos: Insumo[];
  frictionIds: string[];
  recommendedModules: RecommendedModule[];
  roiInputs: ROIInputs;
  roiResults?: ROIScenarioResults;
  executiveSummary?: string;
  /** Notas internas — NO renderizar en modo presentación. */
  notes?: InternalNote[];
}

// ---------------------------------------------------------------------------
// Base de conocimiento — tipos compartidos con knowledge-types.ts
// ---------------------------------------------------------------------------

export type KnowledgeSuggestionType =
  | 'friction'
  | 'question'
  | 'module'
  | 'phrase'
  | 'assumption'
  | 'practice_case';

export type FrictionOrigin =
  | 'base_template'
  | 'real_case'
  | 'approved_suggestion'
  | 'curator_created';

export interface Friction {
  id: string;
  title: string;
  description: string;
  impactType: OpportunityType;
  relatedModuleIds: string[];
  origin: FrictionOrigin;
}

export interface KnowledgeSuggestion {
  id: string;
  type: KnowledgeSuggestionType;
  content: string;
  sourceExplorationId?: string;
  status: 'pending_review' | 'approved' | 'rejected';
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  reviewedAt?: string;
}
