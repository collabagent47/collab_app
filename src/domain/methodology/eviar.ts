/**
 * Metodología EVIAR — Collab ROI Explorer MVP
 *
 * Define los cinco pasos de la metodología de exploración comercial de Collab:
 *   E — Entender
 *   V — Ver fricciones
 *   I — Identificar oportunidades
 *   A — Automatizar con criterio
 *   R — Retorno estimado
 *
 * Sin dependencias de UI.
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface EviarStep {
  key: 'E' | 'V' | 'I' | 'A' | 'R';
  title: string;
  description: string;
  /** Sección del workspace que corresponde a este paso. */
  workspaceSection: string;
  /** Preguntas guía para este paso de la conversación. */
  questions: string[];
}

// ---------------------------------------------------------------------------
// Definición de los pasos EVIAR
// ---------------------------------------------------------------------------

export const EVIAR_STEPS: EviarStep[] = [
  {
    key: 'E',
    title: 'Entender',
    description:
      'Comprende el contexto, operación y objetivos del cliente. Captura su historia, el canal principal, el producto que vende, a quién le vende y qué quiere mejorar.',
    workspaceSection: 'client-story',
    questions: [
      '¿Cuál es tu producto o servicio principal?',
      '¿Por qué canal llegan la mayoría de tus clientes (WhatsApp, llamada, presencial, redes)?',
      '¿A quién le vendes principalmente (agricultor independiente, distribuidora, empresa)?',
      '¿Cuántas conversaciones de venta manejas en un mes normal?',
      '¿Cuánto tiempo le dedica tu equipo a cada conversación?',
      '¿Cuántas personas participan en el proceso de venta?',
      '¿Qué es lo que más te gustaría mejorar en este proceso?',
    ],
  },
  {
    key: 'V',
    title: 'Ver fricciones',
    description:
      'Identifica los puntos de dolor comerciales y operativos. Las fricciones son las tareas que frenan las ventas, consumen tiempo sin valor o generan errores.',
    workspaceSection: 'friction-selection',
    questions: [
      '¿Cuántas cotizaciones envías al mes y cuánto tiempo te toma cada una?',
      '¿Haces seguimiento a todas las conversaciones que no cerraron venta? ¿Cómo?',
      '¿Tienes visibilidad de qué está pasando con cada cliente en cualquier momento?',
      '¿Cómo manejas los pedidos y su trazabilidad desde el momento del cierre?',
      '¿Qué pasa cuando un cliente pregunta por el estado de su pedido?',
      '¿Cuántos cobros pendientes tienes en este momento?',
      '¿Hay tareas que haces repetidamente que podrían hacerse solas?',
    ],
  },
  {
    key: 'I',
    title: 'Identificar oportunidades',
    description:
      'Clasifica el tipo de oportunidad: comercial (mejorar ventas y cierres), operativa (ahorrar tiempo y reducir errores) o mixta. Esto guía qué automatizaciones tienen más impacto.',
    workspaceSection: 'opportunity-type',
    questions: [
      '¿Crees que estás perdiendo ventas por falta de seguimiento o respuesta lenta?',
      '¿Tu tasa de cierre actual te parece baja? ¿A qué lo atribuyes?',
      '¿Hay operaciones manuales que generan errores o retrasos frecuentes?',
      '¿Si pudieras mejorar una sola cosa, qué sería?',
      '¿Tienes una idea de cuánto vale para ti mejorar la tasa de cierre un 3%?',
    ],
  },
  {
    key: 'A',
    title: 'Automatizar con criterio',
    description:
      'Selecciona y prioriza los módulos de automatización más relevantes para las fricciones identificadas. No se automatizan procesos rotos — primero se entienden.',
    workspaceSection: 'module-selection',
    questions: [
      '¿Tienes ya alguna herramienta para gestionar clientes o ventas?',
      '¿Qué tan cómodo está tu equipo con herramientas digitales?',
      '¿Qué procesos necesitas mantener manuales por relación o criterio humano?',
      '¿En qué etapa del proceso pierdes más clientes hoy?',
      '¿Si el seguimiento de cotizaciones fuera automático, cuánto tiempo liberarías?',
    ],
  },
  {
    key: 'R',
    title: 'Retorno estimado',
    description:
      'Calcula el ROI de forma prudente usando el motor ROI. Muestra la narrativa antes que los números. Los escenarios son conservador, medio y optimista — siempre presentar el optimista como referencia y aclarar que es una estimación.',
    workspaceSection: 'roi-calculator',
    questions: [
      '¿Tienes claro cuál es tu margen bruto promedio?',
      '¿Sabes cuánto te cuesta la hora de trabajo de tu equipo de ventas?',
      '¿Qué porcentaje de conversaciones crees que podrías automatizar sin perder calidad?',
      '¿Si aumentaras la tasa de cierre 3 puntos porcentuales, qué significaría en pesos mensuales?',
      '¿Cuánto estarías dispuesto a invertir mensualmente en esta solución?',
    ],
  },
];

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

/**
 * Retorna un paso EVIAR por su clave.
 */
export function getEviarStep(key: EviarStep['key']): EviarStep | undefined {
  return EVIAR_STEPS.find((step) => step.key === key);
}

/**
 * Retorna el índice (0–4) de un paso EVIAR por su clave.
 */
export function getEviarStepIndex(key: EviarStep['key']): number {
  return EVIAR_STEPS.findIndex((step) => step.key === key);
}
