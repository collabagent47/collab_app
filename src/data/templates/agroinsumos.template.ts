/**
 * Plantilla Agroinsumos — Collab ROI Explorer MVP
 *
 * Datos precargados para el sector Agroinsumos / distribución de insumos agrícolas.
 * Todos los valores marcados como 'assumption' hasta que el usuario los confirme.
 * Esta plantilla es un objeto TypeScript estático — sin fetching externo.
 */

import type { Friction, RecommendedModule } from '../../domain/knowledge-base/knowledge-types';
import type { Insumo, OperationData } from '../../domain/roi/roi-types';

// ---------------------------------------------------------------------------
// Fricciones típicas del sector Agroinsumos
// ---------------------------------------------------------------------------

export const AGROINSUMOS_FRICTIONS: Friction[] = [
  {
    id: 'fric-agro-001',
    title: 'Sin seguimiento comercial estructurado',
    description:
      'Las cotizaciones enviadas no tienen seguimiento sistemático. El vendedor recuerda a quién llamar por intuición o agenda personal. Se pierden oportunidades por falta de seguimiento oportuno.',
    impactType: 'commercial',
    relatedModuleIds: ['mod-agro-001', 'mod-agro-002'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-002',
    title: 'Cotizaciones manuales por WhatsApp',
    description:
      'El equipo prepara cotizaciones manualmente en cada conversación: escribe precios, cantidades y condiciones en el chat. Genera errores de digitación, tiempos largos de respuesta y cotizaciones inconsistentes.',
    impactType: 'mixed',
    relatedModuleIds: ['mod-agro-002', 'mod-agro-003'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-003',
    title: 'Sin trazabilidad de pedidos',
    description:
      'Una vez cerrada la venta, el cliente no sabe cuándo llega su pedido. El equipo dedica tiempo a responder preguntas de estado que podrían automatizarse.',
    impactType: 'operational',
    relatedModuleIds: ['mod-agro-004'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-004',
    title: 'Cobros demorados y sin seguimiento',
    description:
      'La cartera de cobros se gestiona manualmente. Las facturas vencidas se descubren tarde. El equipo pierde tiempo en llamadas de cobro que podrían automatizarse con recordatorios.',
    impactType: 'operational',
    relatedModuleIds: ['mod-agro-005'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-005',
    title: 'Pérdida de clientes por respuesta lenta',
    description:
      'Los clientes preguntan por disponibilidad o precio y no reciben respuesta inmediata. Cuando el vendedor responde, el cliente ya compró en otro lugar. Especialmente crítico en temporada alta.',
    impactType: 'commercial',
    relatedModuleIds: ['mod-agro-001', 'mod-agro-006'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-006',
    title: 'Sin CRM — datos dispersos en WhatsApp y Excel',
    description:
      'La información de clientes vive en múltiples celulares y hojas de cálculo. No hay visibilidad de qué clientes tienen mayor potencial ni historial de compras consolidado.',
    impactType: 'mixed',
    relatedModuleIds: ['mod-agro-001'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-007',
    title: 'Catálogo de productos desactualizado o inconsistente',
    description:
      'Los precios cambian frecuentemente (temporada, proveedor, tipo de cambio) pero no todos los vendedores tienen la versión actualizada. Se generan compromisos con precios incorrectos.',
    impactType: 'operational',
    relatedModuleIds: ['mod-agro-002', 'mod-agro-003'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-008',
    title: 'Reporte de ventas tardío o manual',
    description:
      'El gerente o propietario no tiene visibilidad en tiempo real de las ventas del mes. Los reportes se consolidan manualmente al final del período y llegan tarde para tomar decisiones.',
    impactType: 'operational',
    relatedModuleIds: ['mod-agro-001', 'mod-agro-007'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-009',
    title: 'Ausencia de recordatorios de recompra',
    description:
      'Los clientes que compraron hace 30–60 días no reciben comunicación proactiva sobre nuevas campañas o reposición de insumos. Se depende de que el cliente recuerde llamar.',
    impactType: 'commercial',
    relatedModuleIds: ['mod-agro-006'],
    origin: 'base_template',
  },
  {
    id: 'fric-agro-010',
    title: 'Proceso de atención no escalable en temporada alta',
    description:
      'En temporada de siembra o aplicación, el volumen de consultas y pedidos supera la capacidad del equipo. La calidad de atención cae y se pierden ventas por saturación.',
    impactType: 'mixed',
    relatedModuleIds: ['mod-agro-001', 'mod-agro-002', 'mod-agro-006'],
    origin: 'base_template',
  },
];

// ---------------------------------------------------------------------------
// Módulos sugeridos para el sector Agroinsumos
// ---------------------------------------------------------------------------

export const AGROINSUMOS_MODULES: RecommendedModule[] = [
  {
    id: 'mod-agro-001',
    name: 'CRM básico de clientes y oportunidades',
    description:
      'Registro centralizado de clientes, historial de conversaciones, estado de oportunidades y recordatorios de seguimiento. Base para todo el proceso comercial.',
    status: 'included_mvp',
    relatedFrictionIds: ['fric-agro-001', 'fric-agro-005', 'fric-agro-006', 'fric-agro-008'],
    explanation:
      'Sin CRM centralizado, el seguimiento depende de la memoria de cada vendedor. Este módulo es la base para automatizar cualquier otro proceso comercial.',
  },
  {
    id: 'mod-agro-002',
    name: 'Cotizador automático con catálogo actualizado',
    description:
      'Generación automática de cotizaciones desde el catálogo actualizado de productos. El cliente recibe la cotización en segundos por WhatsApp con precios correctos.',
    status: 'included_mvp',
    relatedFrictionIds: ['fric-agro-002', 'fric-agro-007'],
    explanation:
      'Elimina el tiempo manual de cotización y los errores de precio. Permite responder más rápido que la competencia.',
  },
  {
    id: 'mod-agro-003',
    name: 'Gestión digital de pedidos',
    description:
      'Registro y seguimiento del estado de cada pedido desde la confirmación hasta la entrega. El cliente puede consultar el estado sin llamar al equipo.',
    status: 'included_mvp',
    relatedFrictionIds: ['fric-agro-003', 'fric-agro-007'],
    explanation:
      'Reduce el tiempo dedicado a consultas de estado de pedidos y mejora la experiencia del cliente.',
  },
  {
    id: 'mod-agro-004',
    name: 'Trazabilidad de pedidos para el cliente',
    description:
      'Notificaciones automáticas al cliente sobre el estado de su pedido: confirmado, preparando, despachado, entregado.',
    status: 'optional',
    relatedFrictionIds: ['fric-agro-003'],
    explanation:
      'Complementa la gestión de pedidos con comunicación proactiva al cliente, reduciendo las llamadas de seguimiento.',
  },
  {
    id: 'mod-agro-005',
    name: 'Recordatorios automáticos de cobro',
    description:
      'Envío automático de recordatorios de pago antes del vencimiento y al vencimiento. Reduce la cartera vencida y el tiempo del equipo en gestión de cobros.',
    status: 'optional',
    relatedFrictionIds: ['fric-agro-004'],
    explanation:
      'El 80% de los pagos demorados responden al primer recordatorio. Automatizar esto libera tiempo valioso del equipo.',
  },
  {
    id: 'mod-agro-006',
    name: 'Campañas de reactivación y recompra',
    description:
      'Envío automático de mensajes a clientes que no han comprado en un período definido, con ofertas de temporada o recordatorios de reposición.',
    status: 'phase_2',
    relatedFrictionIds: ['fric-agro-005', 'fric-agro-009', 'fric-agro-010'],
    explanation:
      'Activa clientes dormidos sin esfuerzo manual. Especialmente valioso en sector agroinsumos con compras estacionales.',
  },
  {
    id: 'mod-agro-007',
    name: 'Dashboard de ventas en tiempo real',
    description:
      'Panel de control con métricas clave: conversaciones activas, cotizaciones enviadas, cierres del mes, cartera y tendencias.',
    status: 'phase_2',
    relatedFrictionIds: ['fric-agro-008'],
    explanation:
      'Da visibilidad al gerente sin depender de reportes manuales. Permite tomar decisiones con datos frescos.',
  },
  {
    id: 'mod-agro-008',
    name: 'Atención inicial automatizada (bot de primer contacto)',
    description:
      'Bot que responde preguntas frecuentes, califica la consulta y la deriva al vendedor correcto. Maneja el volumen de temporada alta sin saturar al equipo.',
    status: 'phase_2',
    relatedFrictionIds: ['fric-agro-005', 'fric-agro-010'],
    explanation:
      'En temporada alta puede triplicar la capacidad de atención sin contratar personal adicional.',
  },
];

// ---------------------------------------------------------------------------
// Supuestos iniciales del sector
// ---------------------------------------------------------------------------

export const AGROINSUMOS_INITIAL_ASSUMPTIONS: string[] = [
  'El canal principal de ventas es WhatsApp o llamada telefónica directa al vendedor.',
  'Las cotizaciones se envían manualmente por texto o imagen en la conversación.',
  'No existe un sistema CRM — la información de clientes está en celulares y Excel.',
  'El equipo de ventas dedica entre 6 y 10 minutos por conversación de seguimiento.',
  'La tasa de cierre actual está entre el 8% y el 15% de las conversaciones iniciadas.',
  'El ticket promedio varía entre $200.000 y $800.000 COP dependiendo del insumo y cantidad.',
];

// ---------------------------------------------------------------------------
// Insumos típicos precargados del sector Agroinsumos
// ---------------------------------------------------------------------------

export const AGROINSUMOS_INSUMOS_BASE: Insumo[] = [
  {
    id: 'ins-agro-001',
    name: 'Fertilizante NPK (bulto 50 kg)',
    category: 'Fertilizante',
    priceMin: 80_000,
    priceMax: 140_000,
    avgPrice: 110_000,
    unit: 'bulto 50 kg',
    marginEstimate: 0.18,
    notes: 'Precio varía por formulación (10-30-10, 15-15-15, etc.) y proveedor.',
    confidence: 'assumption',
  },
  {
    id: 'ins-agro-002',
    name: 'Herbicida glifosato (litro)',
    category: 'Pesticida',
    priceMin: 15_000,
    priceMax: 35_000,
    avgPrice: 25_000,
    unit: 'litro',
    marginEstimate: 0.22,
    notes: 'Producto de alta rotación. Precio fluctúa con el dólar.',
    confidence: 'assumption',
  },
  {
    id: 'ins-agro-003',
    name: 'Semillas certificadas de maíz (kg)',
    category: 'Semillas',
    priceMin: 18_000,
    priceMax: 45_000,
    avgPrice: 30_000,
    unit: 'kg',
    marginEstimate: 0.15,
    notes: 'El precio depende de la variedad (híbrido vs. libre polinización).',
    confidence: 'assumption',
  },
  {
    id: 'ins-agro-004',
    name: 'Fungicida sistémico (litro)',
    category: 'Pesticida',
    priceMin: 45_000,
    priceMax: 120_000,
    avgPrice: 80_000,
    unit: 'litro',
    marginEstimate: 0.25,
    notes: 'Alta rentabilidad. Se vende más en épocas de lluvia y humedad.',
    confidence: 'assumption',
  },
  {
    id: 'ins-agro-005',
    name: 'Urea granulada (bulto 50 kg)',
    category: 'Fertilizante',
    priceMin: 95_000,
    priceMax: 160_000,
    avgPrice: 128_000,
    unit: 'bulto 50 kg',
    marginEstimate: 0.16,
    notes: 'Insumo básico de alta demanda. Precio indexado al mercado internacional.',
    confidence: 'assumption',
  },
  {
    id: 'ins-agro-006',
    name: 'Insecticida de contacto (litro)',
    category: 'Pesticida',
    priceMin: 12_000,
    priceMax: 55_000,
    avgPrice: 35_000,
    unit: 'litro',
    marginEstimate: 0.20,
    notes: 'Amplia variedad de principios activos. Precio muy variable por marca.',
    confidence: 'assumption',
  },
];

// ---------------------------------------------------------------------------
// Datos de operación base sugeridos para el sector
// ---------------------------------------------------------------------------

export const AGROINSUMOS_BASE_OPERATION: Partial<OperationData> = {
  monthlyConversationsMin: 150,
  monthlyConversationsLikely: 270,
  monthlyConversationsMax: 400,
  minutesPerConversation: 8,
  teamSize: 3,
  averageClosingTimeDays: 5,
};

// ---------------------------------------------------------------------------
// Objeto de plantilla completo
// ---------------------------------------------------------------------------

export const AGROINSUMOS_TEMPLATE = {
  id: 'template-agroinsumos-v1',
  name: 'Agroinsumos',
  description:
    'Plantilla para distribuidoras y comercializadores de insumos agrícolas. Cubre el ciclo completo desde la consulta inicial hasta la postventa.',
  sector: 'Agroinsumos',
  frictions: AGROINSUMOS_FRICTIONS,
  modules: AGROINSUMOS_MODULES,
  assumptions: AGROINSUMOS_INITIAL_ASSUMPTIONS,
  insumos: AGROINSUMOS_INSUMOS_BASE,
  baseOperation: AGROINSUMOS_BASE_OPERATION,
  version: '1.0',
};
