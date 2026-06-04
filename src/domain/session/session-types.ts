/**
 * Tipos del dominio de sesión.
 *
 * Separado del dominio ROI para no contaminar roi-types.ts con
 * conceptos de flujo de conversación o estado de UI.
 */

export type EviarStepKey = 'understand' | 'frictions' | 'identify' | 'automate' | 'return'

export type AnswerStatus = 'confirmed' | 'assumption' | 'pending'

export type ExplorationType = 'quick' | 'complete'

export type GuidedQuestionAnswer = {
  id: string;
  eviarStep: EviarStepKey;
  question: string;
  answer?: string;
  status: AnswerStatus;
  isImportant?: boolean;
  isPresentable?: boolean;
  createdAt: string;
  updatedAt: string;
}
