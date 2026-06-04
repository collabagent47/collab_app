/**
 * Casos de práctica — Collab ROI Explorer MVP
 *
 * Casos de uso reales o basados en datos reales para que el equipo practique
 * la metodología EVIAR y el cálculo de ROI antes de hablar con clientes reales.
 *
 * Sin dependencias de UI.
 */

import type { ROIInputs, OperationData } from '../../domain/roi/roi-types';
import type { Friction } from '../../domain/knowledge-base/knowledge-types';

// ---------------------------------------------------------------------------
// Interfaz de caso de práctica
// ---------------------------------------------------------------------------

export interface PracticeCase {
  id: string;
  title: string;
  sector: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objective: string;
  clientProfile: string;
  scenario: string;
  inputs: ROIInputs;
  operation: OperationData;
  frictions: Pick<Friction, 'id' | 'title' | 'description' | 'impactType'>[];
  expectedInsights: string[];
  learningPoints: string[];
  hints: string[];
}

// ---------------------------------------------------------------------------
// Caso 1: Fertilizantes Mix — datos completos (caso de regresión principal)
// ---------------------------------------------------------------------------

export const CASE_FERTILIZANTES_MIX: PracticeCase = {
  id: 'case-001-fertilizantes-mix',
  title: 'Fertilizantes Mix — Distribuidora Agroinsumos',
  sector: 'Agroinsumos',
  difficulty: 'intermediate',
  objective:
    'Practicar el flujo completo EVIAR con datos reales del sector agroinsumos. Calcular ROI con datos completos y validar los tres escenarios.',
  clientProfile:
    'Fertilizantes Mix es una distribuidora mediana de insumos agrícolas en el Huila, Colombia. Tienen 5 vendedores que atienden principalmente por WhatsApp y llamada. Su producto principal es el fertilizante NPK y trabajan con agricultores de papa, maíz y café. El gerente es Andrés, con 12 años en el negocio y recientemente comenzó a sentir la presión de competidores más digitalizados.',
  scenario:
    'Andrés menciona que en temporada de siembra (marzo–abril y agosto–septiembre) el equipo no da abasto. Muchos clientes preguntan precios pero no reciben respuesta a tiempo. Las cotizaciones se hacen manualmente por WhatsApp, a veces con precios desactualizados. No hay seguimiento formal a las cotizaciones enviadas. Los reportes de ventas los hace Andrés en Excel cada quince días.',
  inputs: {
    averageTicket: 350_000,
    grossMargin: 0.20,
    currentCloseRate: 0.10,
    expectedCloseRate: 0.13,
    monthlyInvestment: 700_000,
    hourlyCost: 15_000,
    automationPercentage: 0.60,
  },
  operation: {
    monthlyConversationsMin: 216,
    monthlyConversationsLikely: 270,
    monthlyConversationsMax: 324,
    minutesPerConversation: 8,
    currentAttentionRate: 75,
    teamSize: 5,
    monthlySalesMin: 3_000_000,
    monthlySalesMax: 6_000_000,
    averageClosingTimeDays: 7,
  },
  frictions: [
    {
      id: 'fric-agro-001',
      title: 'Sin seguimiento comercial estructurado',
      description:
        'Las cotizaciones enviadas no tienen seguimiento. El vendedor recuerda por intuición a quién llamar.',
      impactType: 'commercial',
    },
    {
      id: 'fric-agro-002',
      title: 'Cotizaciones manuales por WhatsApp',
      description:
        'El equipo prepara cotizaciones manualmente, a veces con precios desactualizados.',
      impactType: 'mixed',
    },
    {
      id: 'fric-agro-005',
      title: 'Pérdida de clientes por respuesta lenta',
      description:
        'En temporada alta, los clientes no reciben respuesta a tiempo y compran en otro lugar.',
      impactType: 'commercial',
    },
    {
      id: 'fric-agro-006',
      title: 'Sin CRM — datos dispersos en WhatsApp y Excel',
      description:
        'No hay visibilidad centralizada de clientes ni historial de compras.',
      impactType: 'mixed',
    },
    {
      id: 'fric-agro-008',
      title: 'Reporte de ventas tardío y manual',
      description:
        'Los reportes se consolidan manualmente cada quince días. No hay visibilidad en tiempo real.',
      impactType: 'operational',
    },
  ],
  expectedInsights: [
    'Tipo de oportunidad: mixta (comercial + operativa)',
    'Ahorro operativo (escenario medio): ~$324.000–$330.000 mensuales',
    'Beneficio comercial (escenario medio): $567.000 mensuales',
    'Beneficio total (escenario medio): ~$891.000 mensuales',
    'ROI financiero (escenario medio): ~27–28%',
    'Payback (escenario medio): menos de 1 mes',
    'Multiplicador (escenario medio): ~1.27×',
    'Módulos prioritarios: CRM básico + cotizador automático',
  ],
  learningPoints: [
    'El beneficio comercial SIEMPRE se calcula con el margen (20%), no con las ventas brutas. Sin margen = beneficio comercial = 0.',
    'El escenario conservador usa el mínimo de conversaciones (216) y factores ×0.8. El optimista usa el máximo (324) y factores ×1.2.',
    'Un payback de menos de un mes es llamativo — siempre aclara que es una estimación bajo los supuestos dados.',
    'Los datos marcados como supuesto (ticket, margen, tasa de cierre) deben validarse con Andrés antes de presentar el ROI formalmente.',
    'La fricción más impactante en términos comerciales es la pérdida de clientes por respuesta lenta — es donde se pierde el dinero visible.',
  ],
  hints: [
    'Antes de calcular el ROI, confirma el margen bruto con Andrés. Si no lo sabe exactamente, pídele el precio de compra vs. precio de venta de un producto específico.',
    'Para el ticket promedio, pregunta: "¿Cuánto vale el pedido promedio que te hace un agricultor?" No promedies tú — deja que él lo estime.',
    'Si la tasa de cierre esperada del 13% te parece baja, recuerda que un 3% de mejora en 270 conversaciones son 8 ventas adicionales al mes.',
    'Presenta primero la narrativa: "Tu equipo dedica X horas al mes en conversaciones. Con automatización, podrías liberar Y horas." Después los números.',
  ],
};

// ---------------------------------------------------------------------------
// Caso 2: Taller de Motos Sin Repuestos — práctica de identificación de fricciones
// ---------------------------------------------------------------------------

export const CASE_TALLER_MOTOS_FRICCIONES: PracticeCase = {
  id: 'case-002-taller-motos-fricciones',
  title: 'Taller de Motos "Rodando Bien" — Identificación de fricciones',
  sector: 'Taller de motos y repuestos',
  difficulty: 'beginner',
  objective:
    'Practicar la etapa V (Ver fricciones) de EVIAR. Identificar fricciones a partir de la descripción del negocio y clasificarlas por tipo de impacto (comercial / operativo / mixto), SIN calcular ROI.',
  clientProfile:
    'Rodando Bien es un taller de motos con venta de repuestos en Medellín. Carlos es el dueño y tiene 3 empleados. Atienden reparaciones, mantenimientos y venden repuestos al menudeo. Sus clientes son mototaxistas y usuarios de motos de trabajo que necesitan respuesta rápida.',
  scenario:
    'Carlos recibe citas por WhatsApp pero no tiene registro de las citas agendadas — las escribe en un cuaderno. Cuando llaman para preguntar si su moto está lista, Carlos debe revisar el taller físicamente. Los repuestos se piden al proveedor sin orden de compra formal; a veces se quedan sin stock de piezas comunes. La facturación se hace a mano y Carlos no sabe exactamente cuánto facturó el mes pasado sin sumar todos los recibos. Un cliente que no recogió su moto lleva 3 semanas sin respuesta.',
  inputs: {
    // Datos parciales — este caso NO llega al cálculo de ROI
    averageTicket: 180_000,
    grossMargin: 0.35,
    hourlyCost: 12_000,
  },
  operation: {
    monthlyConversationsMin: 60,
    monthlyConversationsLikely: 90,
    monthlyConversationsMax: 120,
    minutesPerConversation: 5,
    teamSize: 4,
    currentAttentionRate: 85,
  },
  frictions: [
    {
      id: 'fric-taller-001',
      title: 'Agenda en cuaderno — sin registro digital de citas',
      description:
        'Las citas se anotan en papel. No hay visibilidad del historial ni recordatorios automáticos al cliente.',
      impactType: 'operational',
    },
    {
      id: 'fric-taller-002',
      title: 'Sin notificación de estado del servicio',
      description:
        'El cliente debe llamar para saber si su moto está lista. Genera llamadas innecesarias y frustración.',
      impactType: 'operational',
    },
    {
      id: 'fric-taller-003',
      title: 'Gestión de inventario sin sistema',
      description:
        'Los repuestos se piden sin orden de compra. Los quiebres de stock generan demoras y pérdida de ventas.',
      impactType: 'mixed',
    },
    {
      id: 'fric-taller-004',
      title: 'Facturación manual sin consolidación',
      description:
        'La facturación en papel impide conocer el cierre del mes sin sumar físicamente todos los recibos.',
      impactType: 'operational',
    },
    {
      id: 'fric-taller-005',
      title: 'Cliente inactivo sin seguimiento',
      description:
        'Motos que llevan semanas sin recogerse no generan ninguna comunicación proactiva al dueño.',
      impactType: 'commercial',
    },
  ],
  expectedInsights: [
    'Tipo de oportunidad: operativa principalmente, con componente comercial en el seguimiento',
    'Fricciones operativas dominantes: agenda en cuaderno, facturación manual, sin notificación de estado',
    'Fricción comercial: cliente inactivo sin seguimiento (potencial de reactivación)',
    'El inventario sin sistema es mixto: genera pérdidas de venta (comercial) y demoras (operativo)',
    'Carlos no necesita más ventas — necesita ordenar su operación primero',
  ],
  learningPoints: [
    'No todas las oportunidades son "comerciales". A veces el mayor impacto está en lo operativo: ahorrar tiempo y reducir errores.',
    'La clasificación de fricciones guía qué fórmulas usar: si es operativo, el ahorro de horas es el eje. Si es comercial, la tasa de cierre es el eje.',
    'Este caso es para practicar la etapa V sin llegar al ROI. En un caso real, después de identificar fricciones continuarías con I, A y R.',
    'Carlos mencionó un cliente que lleva 3 semanas sin respuesta — eso es una fricción comercial de reactivación, no solo operativa.',
  ],
  hints: [
    'Para clasificar una fricción, pregúntate: ¿Esta fricción le impide GANAR más dinero, o le hace PERDER tiempo/recursos? Si es lo primero, es comercial. Si es lo segundo, es operativa. Si es ambas, es mixta.',
    'En este caso hay un cliente inactivo hace 3 semanas. ¿Eso es un problema operativo (no comunicó) o comercial (riesgo de perder al cliente)? Puede ser las dos cosas.',
    'Antes de proponer soluciones, intenta listar todas las fricciones que ves. No propongas el módulo de CRM hasta haber terminado la lista.',
  ],
};

// ---------------------------------------------------------------------------
// Exportación del catálogo de casos
// ---------------------------------------------------------------------------

export const PRACTICE_CASES: PracticeCase[] = [
  CASE_FERTILIZANTES_MIX,
  CASE_TALLER_MOTOS_FRICCIONES,
];

/**
 * Retorna un caso de práctica por su ID.
 */
export function getPracticeCaseById(id: string): PracticeCase | undefined {
  return PRACTICE_CASES.find((c) => c.id === id);
}
