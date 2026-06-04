export const APP_NAME = 'Collab ROI Explorer'

/** Incrementar cuando el shape de los datos en localStorage cambie. */
export const STORAGE_SCHEMA_VERSION = 1

export const STORAGE_KEYS = {
  EXPLORATIONS: 'collab_roi_explorations',
  APP_MODE: 'collab_roi_app_mode',
  KNOWLEDGE_SUGGESTIONS: 'collab_roi_knowledge_suggestions',
  SCHEMA_VERSION: 'collab_roi_schema_version',
} as const

export const EVIAR_STEP_KEYS = ['E', 'V', 'I', 'A', 'R'] as const

export const SECTOR_OPTIONS = [
  'Agroinsumos',
  'Taller de motos y repuestos',
  'Otro',
] as const

export const OPPORTUNITY_TYPE_LABELS: Record<string, string> = {
  commercial: 'Comercial',
  operational: 'Operativo',
  mixed: 'Mixto',
}

export const STATUS_LABELS: Record<string, string> = {
  draft: 'Borrador',
  in_progress: 'En progreso',
  incomplete_data: 'Datos incompletos',
  roi_calculated: 'ROI calculado',
  summary_generated: 'Resumen generado',
  proposal_sent: 'Propuesta enviada',
  closed_won: 'Ganado',
  closed_lost: 'Perdido',
  discarded: 'Descartado',
}

export const MODULE_STATUS_LABELS: Record<string, string> = {
  included_mvp: 'Incluido en MVP',
  optional: 'Opcional',
  phase_2: 'Fase 2',
  not_applicable: 'No aplica',
}

export const DATA_QUALITY_LABELS: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

export const SESSION_TYPE_LABELS: Record<string, string> = {
  first_meeting: 'Primera reunión',
  follow_up: 'Seguimiento',
  data_validation: 'Validación de datos',
  proposal_presentation: 'Presentación de propuesta',
}
