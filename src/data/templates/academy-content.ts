/**
 * Contenido de Academia ROI — Collab ROI Explorer MVP
 *
 * Material pedagógico para el equipo Collab.
 * Cubre: propósito de la app, conceptos ROI, metodología EVIAR, preguntas
 * recomendadas, errores comunes, frases listas para usar y disclaimers.
 *
 * Sin dependencias de UI.
 */

// ---------------------------------------------------------------------------
// Propósito de la aplicación
// ---------------------------------------------------------------------------

export const APP_PURPOSE = {
  title: 'Para qué sirve Collab ROI Explorer',
  paragraphs: [
    'Collab ROI Explorer es una herramienta de habilitación comercial diseñada para que el equipo Collab prepare sesiones con clientes, identifique fricciones operativas y comerciales, proponga automatizaciones con criterio y estime el retorno de inversión de forma prudente y pedagógica.',
    'No es una calculadora de ROI: es una guía de conversación que te ayuda a entender el negocio del cliente antes de proponer cualquier solución. La metodología EVIAR (Entender, Ver fricciones, Identificar oportunidades, Automatizar con criterio, Retorno estimado) ordena la exploración para que llegues a los números con contexto, no a ciegas.',
    'La app enseña al equipo los conceptos de ROI, ticket promedio, margen, tasa de cierre y payback de forma práctica. Puedes practicar con casos reales antes de hablar con un cliente. El modo aprendiz muestra ayudas pedagógicas; el modo experto te da un flujo más rápido.',
    'Todo lo que calculas es una estimación basada en los datos que el cliente te da. El ROI que muestra la app no es una promesa de resultados — es un ejercicio de cuantificación para que el cliente entienda el valor potencial y tome una decisión informada.',
  ],
};

// ---------------------------------------------------------------------------
// ¿Qué es el ROI y por qué importa?
// ---------------------------------------------------------------------------

export const ROI_CONCEPT = {
  title: '¿Qué es el ROI y por qué importa?',
  definition:
    'ROI significa "Retorno sobre la Inversión" (Return on Investment). Es un indicador que compara el beneficio obtenido con la inversión realizada para obtener ese beneficio.',
  formula:
    'ROI financiero (%) = ((Beneficio total − Inversión mensual) / Inversión mensual) × 100',
  whyItMatters: [
    'Le da al cliente un lenguaje de negocios para evaluar la propuesta. En lugar de hablar solo de "automatizar WhatsApp", hablas de "recuperar X pesos por mes".',
    'Convierte un problema operativo en una oportunidad cuantificada. El cliente deja de ver el costo como un gasto y lo ve como una inversión con retorno medible.',
    'Ordena la conversación: primero entiendes el negocio, luego propones. No al revés.',
    'Permite comparar escenarios (conservador, medio, optimista) y gestionar expectativas desde el inicio.',
  ],
  importantNote:
    'El ROI no es una promesa. Es una estimación basada en los datos del cliente. Siempre presenta los resultados como "estimación" y aclara los supuestos usados.',
};

// ---------------------------------------------------------------------------
// Conceptos básicos
// ---------------------------------------------------------------------------

export interface ConceptDefinition {
  term: string;
  definition: string;
  example: string;
}

export const BASIC_CONCEPTS: ConceptDefinition[] = [
  {
    term: 'Ticket promedio',
    definition:
      'El valor promedio en pesos de una venta. Si vendes fertilizantes, es el valor promedio de lo que compra un cliente en una transacción.',
    example:
      'Si tus clientes compran entre $200.000 y $600.000 por pedido, el ticket promedio estimado es $400.000.',
  },
  {
    term: 'Margen bruto',
    definition:
      'El porcentaje de la venta que queda como ganancia antes de descontar gastos operativos. Es la diferencia entre el precio de venta y el costo del producto.',
    example:
      'Si vendes un bulto de fertilizante a $110.000 y lo compraste a $90.000, tu margen es ($110.000 − $90.000) / $110.000 = 18%.',
  },
  {
    term: 'Tasa de cierre',
    definition:
      'El porcentaje de conversaciones de venta que terminan en una compra efectiva. Si de cada 100 conversaciones cierras 10 ventas, tu tasa de cierre es 10%.',
    example:
      'Un equipo que atiende 270 conversaciones y cierra 27 ventas tiene una tasa de cierre del 10%.',
  },
  {
    term: 'Ahorro operativo',
    definition:
      'El dinero que se deja de gastar en tiempo de trabajo manual gracias a la automatización. Se calcula multiplicando las horas ahorradas por el costo hora del equipo.',
    example:
      'Si automatizas 22 horas al mes y el costo hora es $15.000, el ahorro operativo es $330.000 al mes.',
  },
  {
    term: 'Beneficio comercial',
    definition:
      'El ingreso adicional neto (con margen) que se genera al mejorar la tasa de cierre. SIEMPRE se calcula multiplicando las ventas adicionales por el margen bruto — nunca por el valor bruto de ventas.',
    example:
      'Si cierras 8 ventas adicionales de $350.000 con 20% de margen: beneficio = 8 × $350.000 × 0.20 = $560.000.',
  },
  {
    term: 'Payback (período de recuperación)',
    definition:
      'Los meses que tarda el cliente en recuperar la inversión mensual con los beneficios generados. A menor payback, más rápido se ve el retorno.',
    example:
      'Si la inversión mensual es $700.000 y el beneficio mensual es $891.000, el payback es 700.000 / 891.000 ≈ 0.78 meses (~24 días).',
  },
  {
    term: 'Multiplicador',
    definition:
      'Cuántas veces la inversión se recupera en beneficios. Un multiplicador de 1.27 significa que por cada peso invertido se obtienen $1.27 de beneficio.',
    example:
      'Multiplicador = Beneficio total / Inversión = $891.000 / $700.000 = 1.27×.',
  },
  {
    term: 'Escenarios (conservador / medio / optimista)',
    definition:
      'Las tres proyecciones del ROI bajo diferentes supuestos. El conservador usa los mínimos, el medio los valores probables, y el optimista los máximos.',
    example:
      'Siempre presenta el optimista como escenario de referencia y aclara que el conservador es la garantía de piso.',
  },
];

// ---------------------------------------------------------------------------
// Metodología EVIAR explicada
// ---------------------------------------------------------------------------

export const EVIAR_EXPLANATION = {
  title: 'Metodología EVIAR',
  overview:
    'EVIAR es el marco de exploración comercial de Collab. Sus cinco pasos garantizan que cada conversación con un cliente sea estructurada, pedagógica y orientada al valor — nunca solo a la venta.',
  steps: [
    {
      key: 'E',
      title: 'Entender',
      purpose:
        'Antes de proponer cualquier cosa, entiende quién es el cliente, cómo opera y qué quiere mejorar. Sin este paso, todo lo demás es ruido.',
      keyOutput: 'Historia del cliente: sector, canal, producto, cliente objetivo, objetivo de mejora.',
    },
    {
      key: 'V',
      title: 'Ver fricciones',
      purpose:
        'Identifica los puntos de dolor reales. Las fricciones son las tareas que frenan las ventas, consumen tiempo o generan errores. No inventes fricciones — pregunta y escucha.',
      keyOutput: 'Lista de fricciones seleccionadas y validadas con el cliente.',
    },
    {
      key: 'I',
      title: 'Identificar oportunidades',
      purpose:
        'Clasifica si la oportunidad es comercial (mejorar ventas), operativa (ahorrar tiempo) o mixta. Esto determina qué módulos priorizar y qué fórmulas usar en el ROI.',
      keyOutput: 'Tipo de oportunidad: commercial | operational | mixed.',
    },
    {
      key: 'A',
      title: 'Automatizar con criterio',
      purpose:
        'Selecciona los módulos de automatización que resuelven las fricciones identificadas. No se automatizan procesos rotos — primero se entienden. No todo se automatiza: el criterio humano es irreemplazable en relaciones de confianza.',
      keyOutput: 'Módulos seleccionados con estado (MVP, opcional, fase 2, no aplica).',
    },
    {
      key: 'R',
      title: 'Retorno estimado',
      purpose:
        'Calcula el ROI de forma prudente. Muestra la narrativa antes que los números. Usa los tres escenarios y aclara siempre que es una estimación basada en los datos del cliente.',
      keyOutput: 'ROIScenarioResults con los tres escenarios y nivel de confianza.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Preguntas recomendadas por etapa EVIAR
// ---------------------------------------------------------------------------

export interface QuestionsByStage {
  stage: string;
  stageKey: 'E' | 'V' | 'I' | 'A' | 'R';
  questions: string[];
}

export const RECOMMENDED_QUESTIONS_BY_STAGE: QuestionsByStage[] = [
  {
    stage: 'Entender',
    stageKey: 'E',
    questions: [
      '¿Cuál es tu producto o servicio estrella? ¿El que más vendes o el que más margen te deja?',
      '¿Cómo llegan los clientes a ti hoy? ¿WhatsApp, llamada, referidos, redes sociales?',
      '¿A quién le vendes principalmente? ¿Agricultor directo, distribuidor, empresa?',
      '¿Cuántas conversaciones de venta manejas en un mes normal? ¿Y en temporada alta?',
      '¿Cuánto tiempo le dedica tu equipo a cada conversación, desde el primer contacto hasta el cierre o el rechazo?',
      '¿Cuántas personas participan en el proceso de venta? ¿Solo tú, o tienes un equipo?',
      '¿Qué es lo que más consume tiempo a tu equipo en el día a día?',
      '¿Cuál es el principal motivo por el que no cierras una venta?',
    ],
  },
  {
    stage: 'Ver fricciones',
    stageKey: 'V',
    questions: [
      '¿Cuántas cotizaciones envías al mes y cuánto tiempo toma preparar cada una?',
      '¿Haces seguimiento a todas las cotizaciones que enviaste? ¿O solo a las que parecen más probables?',
      '¿Tienes visibilidad de qué está pasando con cada cliente en este momento?',
      '¿Cómo sabes cuándo un cliente está listo para comprar de nuevo?',
      '¿Qué pasa cuando un cliente pregunta por el estado de su pedido?',
      '¿Cuántos cobros pendientes tienes hoy? ¿Cómo los gestionas?',
      '¿Tienes una lista actualizada de precios que todos en tu equipo usen? ¿O cada quien tiene la suya?',
      '¿En qué momento del proceso pierdes más clientes? ¿Al cotizar, al hacer seguimiento, al cerrar?',
    ],
  },
  {
    stage: 'Identificar oportunidades',
    stageKey: 'I',
    questions: [
      '¿De cada 100 conversaciones que inicias, cuántas terminan en venta? ¿Cuántas te gustaría cerrar?',
      '¿Crees que estás perdiendo ventas por no llegar a tiempo al seguimiento?',
      '¿Cuánto tiempo al día dedica tu equipo a tareas que no son directamente vender?',
      '¿Si pudieras automatizar una sola cosa hoy, qué sería?',
      '¿Tienes idea de cuánto dinero dejas de ganar cada mes por las ineficiencias que acabas de mencionar?',
      '¿Tu proceso de atención aguanta el doble de volumen sin contratar más personas?',
    ],
  },
  {
    stage: 'Automatizar con criterio',
    stageKey: 'A',
    questions: [
      '¿Tienes ya alguna herramienta para gestionar clientes? ¿CRM, Excel, agenda?',
      '¿Qué tan familiarizado está tu equipo con herramientas digitales?',
      '¿Hay partes del proceso que NO quieres automatizar porque requieren tu toque personal?',
      '¿Si el cliente recibiera respuesta automática en menos de 2 minutos las 24 horas, cambiaría algo en tu negocio?',
      '¿Cuántas conversaciones de seguimiento podrías dejar que las manejara un asistente automático?',
    ],
  },
  {
    stage: 'Retorno estimado',
    stageKey: 'R',
    questions: [
      '¿Tienes claro cuál es tu margen bruto promedio en los productos principales?',
      '¿Cuánto le pagas a tu equipo de ventas por hora (incluyendo prestaciones)?',
      '¿Qué porcentaje de tus conversaciones crees que podrías atender con automatización sin perder calidad?',
      '¿Si cerráramos 3 ventas más al mes, cuánto sería en pesos adicionales de ganancia (no de ventas brutas)?',
      '¿Cuánto estarías dispuesto a invertir mensualmente en una solución que te genere el doble en ahorro y ventas?',
      '¿En cuánto tiempo necesitarías ver resultados para que la inversión valga la pena?',
    ],
  },
];

// ---------------------------------------------------------------------------
// Errores comunes al usar el ROI en conversaciones comerciales
// ---------------------------------------------------------------------------

export const COMMON_MISTAKES: string[] = [
  'Mostrar los números antes de entender el negocio del cliente. El ROI sin contexto genera desconfianza, no confianza.',
  'Usar ventas brutas como beneficio en lugar del margen neto. Siempre multiplicar las ventas adicionales por el margen bruto.',
  'Presentar el escenario optimista como garantía. Siempre es una estimación; el conservador es el piso de expectativas.',
  'Inventar el margen del cliente cuando no lo conoce. Si no hay margen confirmado, el beneficio comercial no se calcula.',
  'Calcular el ROI con un solo número de conversaciones sin rango. Usar mínimo, probable y máximo para los escenarios.',
  'Ignorar los datos marcados como "supuesto". Siempre validar los supuestos con el cliente antes de presentar resultados.',
  'Presentar un payback de menos de un mes como si fuera garantizado. Genera expectativas irreales que dañan la relación posterior.',
  'No mencionar que el ROI no incluye el tiempo de implementación ni la curva de aprendizaje del equipo.',
  'Usar el ROI como argumento de cierre inmediato. Es una herramienta de conversación, no de presión.',
  'Olvidar documentar los supuestos usados. Si el cliente regresa diciendo "pero me dijiste que...", debes tener los datos que usaste.',
];

// ---------------------------------------------------------------------------
// Frases listas para usar en conversaciones comerciales
// ---------------------------------------------------------------------------

export const READY_TO_USE_PHRASES: string[] = [
  '"Antes de mostrarte números, quiero entender cómo funciona tu negocio hoy. ¿Me cuentas cómo llegan los clientes a ti?"',
  '"Esta estimación se basa en los datos que me diste. Si ajustamos el margen o las conversaciones, los resultados cambian."',
  '"El escenario conservador es el piso — lo que esperaríamos en el peor caso. El optimista es el techo. La realidad suele estar en el medio."',
  '"El beneficio que estamos calculando es sobre tu margen, no sobre tus ventas brutas. Así el número es honesto y realista."',
  '"¿Este supuesto de X conversaciones mensuales te parece correcto, o deberíamos ajustarlo?"',
  '"Si no tienes el margen exacto ahora, podemos estimarlo y marcarlo como supuesto. Después lo confirmamos."',
  '"El payback de 0.8 meses significa que en menos de un mes estarías recuperando la inversión, si los supuestos se cumplen."',
  '"Esto no es una promesa de resultados — es un ejercicio para que veamos juntos el potencial y decidamos si vale la pena explorar."',
  '"¿Cuál de los tres escenarios te parece más cercano a tu realidad actual?"',
  '"Si solo pudieras mejorar una cosa en el proceso de ventas hoy, ¿qué sería? Eso es lo que deberíamos automatizar primero."',
  '"Entiendo que el número parece alto. Revisemos qué supuesto está generando esa cifra y validémoslo contigo."',
  '"El ROI no reemplaza tu criterio. Es una herramienta para tener una conversación de negocios más concreta."',
];

// ---------------------------------------------------------------------------
// Disclaimers obligatorios
// ---------------------------------------------------------------------------

export const DISCLAIMERS = {
  roiIsNotAPromise:
    'El ROI calculado en esta herramienta es una estimación basada en los datos proporcionados por el cliente. No es una promesa de resultados ni un compromiso contractual. Los resultados reales dependen de múltiples factores externos al control de Collab.',
  humanJudgmentRequired:
    'Esta herramienta no reemplaza el criterio humano del asesor comercial. Los números deben interpretarse en contexto y siempre con base en datos validados con el cliente.',
  noDataInvention:
    'Collab ROI Explorer no inventa datos. Toda información proviene del usuario o de plantillas base marcadas como supuesto. Los supuestos deben ser validados con el cliente antes de presentar resultados formales.',
  sensitivityToAssumptions:
    'Los resultados del ROI son sensibles a los supuestos de entrada (margen, ticket, tasa de cierre). Una variación del 5% en el margen puede cambiar significativamente el resultado. Siempre muestra el rango de escenarios.',
};

// ---------------------------------------------------------------------------
// Lección: Pérdida por mal seguimiento
// ---------------------------------------------------------------------------

export const FOLLOW_UP_LOSS_LESSON = {
  id: 'lesson-follow-up-loss',
  title: '¿Cuánto cuesta perder leads por mal seguimiento?',
  subtitle: 'Calcula una oportunidad comercial simple sin llamarla ROI financiero completo.',
  sections: [
    {
      title: 'El problema del seguimiento',
      content: `La mayoría de los negocios pierden oportunidades no porque su producto sea malo,
sino porque no hacen seguimiento a tiempo. Un lead que preguntó hoy y no recibió
respuesta oportuna, mañana compró con la competencia.`,
    },
    {
      title: 'Cómo calculamos la oportunidad',
      content: `No asumimos que todos los leads perdidos iban a comprar. Usamos la tasa de cierre
actual del cliente para estimar cuántas ventas podrían haberse cerrado con mejor seguimiento.`,
    },
    {
      title: 'Ejemplo Ihann',
      content: `Con 50 leads por mes, ticket promedio de $400.000, 12 leads perdidos por mal
seguimiento y 6 cierres actuales:

• Tasa de cierre actual: 12%
• Cierres potenciales perdidos: 12 × 12% = 1.44
• Venta esperada perdida: 1.44 × $400.000 = $576.000 / mes

Este número no es una promesa de ventas. Es una estimación basada en los datos del cliente.`,
    },
    {
      title: 'Diferencia entre venta esperada y ROI',
      content: `La "Venta esperada perdida" es el primer nivel de la conversación.
Para calcular ROI financiero completo necesitamos también:
• Margen bruto del negocio
• Inversión mensual en la solución
• Ahorro operativo estimado

Sin esos datos, no calculamos ROI. Calculamos oportunidad comercial.`,
    },
    {
      title: 'Qué NO decirle al cliente',
      content: `No digas: "Estás perdiendo $576.000 al mes".
Di: "Con los datos que me diste, estimamos que podrías estar dejando de capturar
aproximadamente $576.000 en ventas por mes. ¿Tiene sentido este número para ti?"

La pregunta al final es clave. El cliente valida — tú no prometes.`,
    },
  ],
  example: {
    inputs: { monthlyLeads: 50, averageTicket: 400000, lostLeadsByPoorFollowUp: 12, closedDeals: 6 },
    outputs: { closeRate: 0.12, potentialLostClosures: 1.44, expectedLostSales: 576000 },
  },
  disclaimer: 'Este número no es una promesa de ventas. Es una estimación basada en la tasa de cierre actual del cliente.',
}
