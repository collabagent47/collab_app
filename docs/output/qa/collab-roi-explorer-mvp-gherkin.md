# Gherkin — Collab ROI Explorer MVP
**Feature:** `collab-roi-explorer-mvp` | **Spec:** SPEC-002 | **Generado:** 2026-06-03

---

```gherkin
#language: es

# ===========================================================================
# CARACTERÍSTICA 1 — Dashboard de exploraciones (HU-01)
# ===========================================================================

Característica: Dashboard de exploraciones
  Como miembro del equipo Collab
  Quiero ver el listado de exploraciones con su estado
  Para monitorear el pipeline comercial y acceder rápidamente a cada caso

  Antecedentes:
    Dado que la aplicación está cargada en el navegador
    Y el usuario navega a la pantalla principal "/"

  @smoke @critico @happy-path
  Escenario: Ver listado de exploraciones existentes
    Dado que existen 3 exploraciones guardadas:
      | cliente          | sector      | estado          |
      | Fertilizantes Mix | Agroinsumos | En exploración  |
      | Don Hidalgo       | Restaurante | Borrador        |
      | Inmobiliaria JR   | Inmobiliaria| ROI calculado   |
    Cuando el usuario accede al dashboard
    Entonces ve las 3 tarjetas de exploración en pantalla
    Y cada tarjeta muestra nombre del cliente, sector y estado
    Y puede hacer clic en "Nueva exploración"

  @edge-case
  Escenario: Dashboard vacío muestra estado motivacional
    Dado que no existen exploraciones guardadas en localStorage
    Cuando el usuario accede al dashboard
    Entonces ve un mensaje motivacional de bienvenida
    Y ve el botón "Nueva exploración" destacado
    Y no aparece ningún error ni pantalla en blanco

  @edge-case @performance
  Escenario: Dashboard con 100 exploraciones no degrada la experiencia
    Dado que existen 100 exploraciones guardadas en localStorage
    Cuando el usuario accede al dashboard
    Entonces la pantalla carga en menos de 2 segundos
    Y el scroll es fluido sin congelamiento
    Y todas las tarjetas son visibles al desplazarse

  @happy-path
  Escenario: Filtrar exploraciones por estado
    Dado que existen exploraciones en estados "Borrador" y "ROI calculado"
    Cuando el usuario selecciona el filtro "ROI calculado"
    Entonces solo ve las exploraciones con ese estado
    Y las exploraciones en "Borrador" desaparecen del listado


# ===========================================================================
# CARACTERÍSTICA 2 — Nueva exploración con plantilla Agroinsumos (HU-02)
# ===========================================================================

Característica: Nueva exploración con plantilla Agroinsumos
  Como miembro del equipo Collab
  Quiero crear una exploración usando la plantilla Agroinsumos
  Para iniciar con fricciones y módulos precargados del sector

  @smoke @critico @happy-path
  Escenario: Crear exploración desde plantilla Agroinsumos
    Dado que el usuario está en el dashboard
    Cuando hace clic en "Nueva exploración"
    Y escribe "Fertilizantes Mix" como nombre del cliente
    Y selecciona "Agroinsumos" como plantilla
    Y confirma la creación
    Entonces el sistema crea la exploración en estado "Borrador"
    Y precarga al menos 5 fricciones sugeridas del sector
    Y precarga al menos 5 módulos recomendados
    Y precarga insumos típicos marcados como "Supuesto"
    Y redirige a la introducción EVIAR

  @error-path
  Escenario: No crear exploración sin nombre de cliente
    Dado que el usuario abre el formulario de nueva exploración
    Cuando deja el campo "Nombre del cliente" vacío
    Y hace clic en "Confirmar"
    Entonces el sistema muestra el error "El nombre del cliente es requerido"
    Y NO crea ninguna exploración
    Y el usuario permanece en el formulario

  @edge-case
  Escenario: Exploración se guarda automáticamente en localStorage
    Dado que el usuario creó una exploración "Fertilizantes Mix"
    Y capturó algunos datos parciales en el workspace
    Cuando cierra y vuelve a abrir el navegador
    Entonces la exploración aparece en el dashboard en estado "Borrador"
    Y los datos capturados están preservados correctamente

  @happy-path
  Escenario: Visualizar plantillas disponibles
    Dado que el usuario abre el wizard de nueva exploración
    Cuando llega al paso de selección de plantilla
    Entonces ve al menos la plantilla "Agroinsumos" disponible
    Y puede ver una descripción breve de cada plantilla


# ===========================================================================
# CARACTERÍSTICA 3 — Workspace de exploración EVIAR (HU-03)
# ===========================================================================

Característica: Workspace de exploración EVIAR
  Como miembro del equipo Collab
  Quiero navegar el workspace guiado por metodología EVIAR
  Para capturar la historia del cliente y detectar oportunidades ordenadamente

  @smoke @critico @happy-path
  Escenario: Capturar historia del cliente y generar narrativa
    Dado que existe una exploración "Fertilizantes Mix" en estado Borrador
    Y el usuario está en el paso "E - Entender" del workspace
    Cuando completa los campos: sector "Agroinsumos", canal "WhatsApp", ciudad "Popayán", objetivo "Mejorar seguimiento"
    Entonces el sistema genera automáticamente un borrador narrativo editable
    Y el borrador menciona "Fertilizantes Mix" y "Agroinsumos"
    Y los campos confirmados por el usuario muestran badge "Confirmado"

  @smoke @critico @happy-path
  Escenario: Seleccionar fricciones y actualizar insight en tiempo real
    Dado que el usuario está en el paso "V - Ver fricciones"
    Y existe la exploración "Fertilizantes Mix" con fricciones precargadas
    Cuando selecciona las tarjetas:
      | fricción                              |
      | No hay seguimiento comercial          |
      | Cotizaciones manuales                 |
      | No hay trazabilidad                   |
    Entonces el panel de insight se actualiza inmediatamente
    Y muestra el tipo de oportunidad sugerida
    Y los módulos sugeridos se actualizan según las fricciones

  @happy-path
  Escenario: Sistema sugiere oportunidad comercial
    Dado que la atención actual capturada es 70%
    Y el usuario está evaluando fricciones
    Cuando el sistema evalúa la atención actual
    Entonces sugiere tipo de oportunidad "Comercial"
    Y muestra explicación en lenguaje simple del porqué
    Y la explicación no usa jerga técnica

  @happy-path
  Escenario: Sistema sugiere oportunidad operativa
    Dado que la atención actual capturada es 95%
    Y existen fricciones de tipo repetitivo seleccionadas
    Cuando el sistema evalúa las fricciones
    Entonces sugiere tipo de oportunidad "Operativa"
    Y explica que hay saturación y procesos repetitivos

  @smoke @critico @happy-path
  Escenario: Sistema sugiere oportunidad mixta con fricciones de Fertilizantes Mix
    Dado que el usuario seleccionó:
      | No hay seguimiento comercial |
      | Cotizaciones manuales        |
      | No hay trazabilidad          |
    Cuando el sistema evalúa las fricciones seleccionadas
    Entonces sugiere tipo de oportunidad "Mixta"
    Y muestra explicación que menciona seguimiento y trazabilidad

  @edge-case
  Escenario: Dato pendiente no bloquea el avance en el workspace
    Dado que el usuario no tiene el margen bruto del cliente
    Y está en el paso "R - Retorno estimado"
    Cuando intenta avanzar sin ingresar el margen bruto
    Entonces puede marcar el campo como "Pendiente por validar"
    Y el sistema no bloquea el avance
    Y muestra un indicador visual de datos pendientes


# ===========================================================================
# CARACTERÍSTICA 4 — Motor ROI con escenarios (HU-04)
# ===========================================================================

Característica: Motor ROI con escenarios
  Como miembro del equipo Collab
  Quiero calcular el ROI en escenarios conservador, medio y optimista
  Para presentar estimaciones prudentes al cliente diferenciando ahorro y beneficio comercial

  @smoke @critico @happy-path @regression
  Escenario: Calcular ROI escenario medio — caso de regresión Fertilizantes Mix
    Dado que existe una exploración con los datos del caso Fertilizantes Mix:
      | campo                    | valor    |
      | conversaciones mensuales | 270      |
      | minutos por conversación | 8        |
      | porcentaje automatizable | 60%      |
      | costo hora               | $15.000  |
      | ticket promedio          | $350.000 |
      | margen bruto             | 20%      |
      | tasa de cierre actual    | 10%      |
      | tasa de cierre esperada  | 13%      |
      | inversión mensual IA     | $700.000 |
    Cuando el usuario hace clic en "Calcular ROI"
    Entonces el ahorro operativo del escenario medio es $324.000
    Y el beneficio comercial del escenario medio es $567.000
    Y el beneficio total del escenario medio es $891.000
    Y el ROI financiero es aproximadamente 27,28%
    Y el multiplicador es aproximadamente 1,27x
    Y el payback es aproximadamente 0,78 meses

  @happy-path
  Escenario: Mostrar narrativa antes que indicadores numéricos
    Dado que el motor ROI calculó los resultados
    Cuando el usuario ve la pantalla de resultados ROI
    Entonces aparece primero un bloque de texto explicando qué se está midiendo
    Y el texto dice algo similar a "No buscamos predecir el futuro"
    Y solo después aparecen los indicadores numéricos de cada escenario

  @smoke @critico @happy-path
  Escenario: Mostrar tres escenarios diferenciados con optimista destacado
    Dado que el motor ROI tiene datos suficientes para calcular
    Cuando el usuario calcula ROI
    Entonces aparecen tres tarjetas: Conservador, Medio y Optimista
    Y la tarjeta Optimista está visualmente destacada (más grande, fondo diferente)
    Y cada tarjeta muestra: ahorro operativo, beneficio comercial, beneficio total, ROI%, multiplicador, payback

  @error-path
  Escenario: Sin margen bruto no calcular beneficio comercial
    Dado que el usuario no ingresó el margen bruto
    Cuando intenta calcular el ROI
    Entonces el sistema calcula el ahorro operativo si tiene los datos necesarios
    Y el beneficio comercial aparece como "No disponible"
    Y aparece alerta: "Falta el margen bruto para calcular el beneficio comercial"
    Y el dato margen queda marcado como "Pendiente"
    Y el sistema NO usa ventas brutas como sustituto del margen

  @edge-case
  Escenario: Payback se muestra como no disponible cuando beneficio total es cero
    Dado que el beneficio total calculado resulta en cero
    Cuando el motor calcula el payback
    Entonces el payback aparece como "No disponible"
    Y el sistema no muestra error ni división por cero
    Y los demás indicadores se muestran con normalidad

  @edge-case @critico
  Escenario: Alerta cuando ROI supera 1000%
    Dado que el ticket promedio ingresado es muy alto y la mejora de cierre es muy grande
    Cuando el ROI financiero calculado supera 1000%
    Entonces aparece una alerta en tono calmado:
      "El ROI calculado parece muy alto. Revisa el ticket promedio, margen o tasa de cierre esperada."
    Y los resultados se siguen mostrando (no se ocultan)
    Y la alerta no es alarmista ni bloquea al usuario

  @edge-case
  Escenario: Alerta cuando margen bruto supera 80%
    Dado que el usuario ingresó un margen bruto de 85%
    Cuando el sistema valida los datos de entrada
    Entonces aparece alerta: "Un margen del 85% es inusualmente alto. Confirma este dato con el cliente."

  @edge-case
  Escenario: Alerta cuando tasa de cierre esperada supera 50%
    Dado que la tasa de cierre esperada es 60%
    Cuando el sistema valida los datos de entrada
    Entonces aparece una alerta de posible sobreestimación de tasa de cierre

  @edge-case @critico
  Escenario: Alerta cuando tasa esperada es menor que tasa actual
    Dado que la tasa de cierre actual es 15% y la esperada es 10%
    Cuando el sistema valida los datos
    Entonces aparece alerta indicando que la tasa esperada no puede ser menor que la actual
    Y el beneficio comercial puede resultar negativo con explicación pedagógica

  @critico
  Escenario: Beneficio comercial nunca usa ventas brutas directamente
    Dado que el usuario ingresó ventas mensuales de $10.000.000 y margen de 20%
    Cuando el motor calcula el beneficio comercial
    Entonces el beneficio NO es $10.000.000
    Y el beneficio comercial usa la fórmula: ventas_adicionales × margen


# ===========================================================================
# CARACTERÍSTICA 5 — Preparación de sesión (HU-05)
# ===========================================================================

Característica: Preparación de sesión comercial
  Como miembro del equipo Collab
  Quiero preparar la reunión antes de hablar con el cliente
  Para llegar con objetivo claro y preguntas definidas

  @smoke @happy-path
  Escenario: Registrar preparación completa de primera reunión
    Dado que existe la exploración "Fertilizantes Mix"
    Y el usuario accede a "Preparar sesión"
    Cuando selecciona tipo "Primera reunión"
    Y escribe el objetivo: "Entender operación actual y detectar fricciones"
    Y agrega 3 preguntas sugeridas
    Y agrega 2 datos pendientes de validar
    Y agrega 1 supuesto
    Y completa el checklist
    Entonces la preparación queda guardada en la exploración
    Y puede consultarla antes de la reunión

  @happy-path
  Esquema del escenario: Seleccionar diferentes tipos de sesión
    Dado que el usuario abre la preparación de sesión
    Cuando selecciona el tipo "<tipo>"
    Entonces el sistema adapta el checklist y preguntas sugeridas al tipo de sesión
    Ejemplos:
      | tipo                       |
      | Primera reunión            |
      | Seguimiento                |
      | Validación de datos        |
      | Presentación de propuesta  |


# ===========================================================================
# CARACTERÍSTICA 6 — Academia ROI (HU-06)
# ===========================================================================

Característica: Academia ROI
  Como miembro del equipo Collab
  Quiero acceder a la Academia ROI desde la navegación
  Para aprender conceptos de ROI y metodología EVIAR

  @smoke @critico @happy-path
  Escenario: Acceder a Academia ROI desde cualquier pantalla
    Dado que el usuario está en el workspace de exploración
    Cuando hace clic en "Academia ROI" en la navegación lateral
    Entonces navega a la Academia sin perder el contexto de la exploración activa
    Y puede volver al workspace desde la Academia

  @happy-path
  Escenario: Consultar todas las secciones de contenido pedagógico
    Dado que el usuario está en la Academia ROI
    Cuando navega por las secciones disponibles
    Entonces puede acceder a:
      | sección                     |
      | Propósito de la app         |
      | Qué es ROI                  |
      | Por qué importa             |
      | Metodología EVIAR           |
      | Conceptos básicos           |
      | Preguntas recomendadas      |
      | Errores comunes             |
      | Frases listas para usar     |
      | Casos de práctica           |

  @happy-path
  Escenario: Academia explica que ROI no es una promesa de ventas
    Dado que el usuario lee la sección "Qué es ROI"
    Cuando consulta el contenido
    Entonces el texto incluye una aclaración que ROI es una estimación
    Y menciona que no garantiza ventas
    Y no reemplaza el criterio humano


# ===========================================================================
# CARACTERÍSTICA 7 — Base de conocimiento y sugerencias (HU-07)
# ===========================================================================

Característica: Base de conocimiento y sugerencias
  Como miembro del equipo Collab
  Quiero sugerir mejoras a la base de conocimiento
  Para enriquecerla sin contaminar las plantillas oficiales

  @smoke @happy-path
  Escenario: Consultar base de conocimiento completa
    Dado que el usuario navega a "Base de conocimiento"
    Cuando accede a la sección
    Entonces puede ver contenido en las categorías:
      | categoría              |
      | Fricciones frecuentes  |
      | Preguntas sugeridas    |
      | Módulos recomendados   |
      | Frases comerciales     |
      | Errores comunes        |

  @smoke @critico @happy-path
  Escenario: Crear sugerencia de mejora que queda pendiente de revisión
    Dado que el usuario terminó una exploración y detectó un aprendizaje nuevo
    Cuando registra una sugerencia del tipo "Fricción" con contenido: "El cliente no responde fuera de horario laboral"
    Entonces la sugerencia queda en estado "Pendiente de revisión"
    Y el usuario ve confirmación de que su sugerencia fue enviada
    Y la plantilla oficial NO fue modificada automáticamente

  @critico @edge-case
  Escenario: Sugerencia rechazada no altera la plantilla oficial
    Dado que existe una sugerencia en estado "Pendiente de revisión"
    Y un curador accede al panel de revisión
    Cuando el curador rechaza la sugerencia
    Entonces la sugerencia pasa a estado "Rechazada"
    Y la plantilla oficial permanece sin cambios
    Y el usuario que sugirió puede ver el estado actualizado


# ===========================================================================
# CARACTERÍSTICA 8 — Modo presentación (HU-08)
# ===========================================================================

Característica: Modo presentación
  Como miembro del equipo Collab
  Quiero activar el modo presentación
  Para mostrar al cliente solo información relevante sin datos internos

  @smoke @critico @happy-path
  Escenario: Activar modo presentación y verificar contenido visible
    Dado que existe una exploración "Fertilizantes Mix" con diagnóstico completo
    Y tiene notas internas, alertas privadas e historial registrado
    Cuando el usuario activa "Modo presentación"
    Entonces se muestra solo:
      | contenido visible              |
      | Contexto del cliente           |
      | Fricciones identificadas       |
      | Tipo de oportunidad            |
      | Automatización sugerida        |
      | Valor estimado                 |
      | ROI explicado en lenguaje simple|
      | Próximo paso recomendado       |

  @smoke @critico @seguridad
  Escenario: Las notas internas NO aparecen en el DOM en modo presentación
    Dado que la exploración tiene notas internas con texto "Nota confidencial del equipo"
    Cuando el usuario activa el modo presentación
    Entonces el texto "Nota confidencial del equipo" NO aparece en el HTML renderizado
    Y las alertas privadas no son visibles ni están ocultas con CSS (directamente no se renderizan)
    Y el historial técnico no aparece en ningún elemento del DOM


# ===========================================================================
# CARACTERÍSTICA 9 — Modos aprendiz y experto (HU-09)
# ===========================================================================

Característica: Modos aprendiz y experto
  Como miembro del equipo Collab
  Quiero cambiar entre modo aprendiz y experto
  Para adaptar la experiencia a mi nivel de conocimiento

  @happy-path
  Escenario: Modo aprendiz muestra ayudas pedagógicas
    Dado que el modo aprendiz está activo
    Cuando el usuario navega por el workspace
    Entonces ve tooltips y hints pedagógicos en cada paso de EVIAR
    Y ve tarjetas "LearnerHint" con explicaciones contextuales
    Y el flujo es más guiado y explicativo

  @happy-path
  Escenario: Modo experto oculta las ayudas pedagógicas
    Dado que el modo experto está activo
    Cuando el usuario navega por el workspace
    Entonces los hints pedagógicos no son visibles
    Y el flujo es más compacto y directo
    Y puede acceder a todas las funciones sin pasos adicionales

  @edge-case
  Escenario: Cambio de modo persiste entre sesiones
    Dado que el usuario seleccionó "Modo experto"
    Cuando cierra el navegador y regresa a la app
    Entonces el modo experto sigue activo
    Y no vuelve automáticamente al modo aprendiz


# ===========================================================================
# CARACTERÍSTICA 10 — Resumen ejecutivo (HU-10)
# ===========================================================================

Característica: Resumen ejecutivo editable
  Como miembro del equipo Collab
  Quiero generar y editar el resumen ejecutivo
  Para tener un documento narrativo listo para compartir con el cliente

  @smoke @critico @happy-path
  Escenario: Generar borrador de resumen ejecutivo
    Dado que la exploración "Fertilizantes Mix" tiene ROI calculado y fricciones identificadas
    Cuando el usuario hace clic en "Generar resumen ejecutivo"
    Entonces aparece un borrador editable que incluye:
      | sección                    |
      | Contexto del cliente       |
      | Fricciones identificadas   |
      | Tipo de oportunidad        |
      | Automatización sugerida    |
      | Valor estimado             |
      | Nivel de confianza         |
      | Próximo paso recomendado   |
    Y el usuario puede editar libremente el texto del borrador
    Y los cambios se guardan automáticamente


# ===========================================================================
# CARACTERÍSTICA 11 — Módulo de Insumos y Contexto (HU-11)
# ===========================================================================

Característica: Módulo de insumos y contexto del cliente
  Como miembro del equipo Collab
  Quiero registrar los productos que maneja el cliente
  Para enriquecer el contexto y calcular mejor el ticket promedio

  @smoke @happy-path
  Escenario: Registrar insumos del cliente con precio promedio
    Dado que el usuario está en la sección "Insumos" del workspace
    Cuando agrega un insumo: nombre "Fertilizante NPK", categoría "Fertilizante", precio promedio $180.000, unidad "kg"
    Entonces el insumo aparece en la lista de insumos de la exploración
    Y el sistema muestra sugerencia: "Ticket promedio sugerido: $180.000"
    Y el insumo muestra badge de confianza "Supuesto" por defecto

  @happy-path
  Escenario: Insumos precargados por plantilla Agroinsumos marcados como supuesto
    Dado que el usuario creó una exploración con plantilla "Agroinsumos"
    Cuando accede a la sección "Insumos"
    Entonces ve insumos típicos del sector ya precargados:
      | insumo                | badge    |
      | Fertilizante NPK      | Supuesto |
      | Herbicida selectivo   | Supuesto |
      | Semillas certificadas | Supuesto |
    Y puede confirmar, editar o eliminar cada insumo

  @edge-case
  Escenario: Sin insumos el flujo continúa normalmente
    Dado que el usuario no ha registrado ningún insumo
    Cuando avanza al siguiente paso del workspace
    Entonces el flujo continúa sin errores
    Y no aparece ningún mensaje de error por falta de insumos
    Y la sugerencia de ticket promedio simplemente no se muestra
```

---

## Datos de Prueba Sintéticos

| Escenario | Campo | Valor válido | Valor inválido | Valor borde |
|-----------|-------|-------------|----------------|-------------|
| Crear exploración | clientName | "Fertilizantes Mix" | "" (vacío) | "A" (1 char) |
| ROI — conversaciones | monthlyConversations | 270 | -5 | 0 |
| ROI — margen | grossMargin | 0.20 (20%) | 1.5 (150%) | 0.80 (alerta) |
| ROI — tasa cierre | currentCloseRate | 0.10 | 1.1 | 0.50 (límite alerta) |
| ROI — tasa esperada | expectedCloseRate | 0.13 | 0.05 < actual | 0.51 (alerta) |
| ROI — ticket | averageTicket | 350000 | -1000 | 0 |
| ROI — inversión | monthlyInvestment | 700000 | 0 | — |
| ROI — horas | minutesPerConversation | 8 | 0 | 1 (mínimo) |
| Insumo | avgPrice | 180000 | -500 | 0 |
| Notas internas (presentación) | content | "Nota interna" | — | "Nota confidencial" (NUNCA en DOM en presentación) |

### Fixture Fertilizantes Mix — Escenario Medio (Regresión DoD-027)
```json
{
  "clientName": "Fertilizantes Mix",
  "sector": "Agroinsumos",
  "city": "Popayán",
  "monthlyConversationsLikely": 270,
  "minutesPerConversation": 8,
  "automationPercentage": 0.6,
  "hourlyCost": 15000,
  "currentCloseRate": 0.1,
  "expectedCloseRate": 0.13,
  "averageTicket": 350000,
  "grossMargin": 0.2,
  "monthlyInvestment": 700000,
  "expected": {
    "monthlyHours": 36,
    "savedHours": 21.6,
    "operationalSavings": 324000,
    "commercialBenefit": 567000,
    "totalBenefit": 891000,
    "financialROI": 27.2857,
    "multiplier": 1.2728,
    "paybackMonths": 0.7856
  }
}
```

### Fixture — Datos incompletos (sin margen)
```json
{
  "clientName": "Cliente Sin Margen",
  "sector": "Agroinsumos",
  "monthlyConversationsLikely": 200,
  "averageTicket": 300000,
  "monthlyInvestment": 700000
}
```

### Fixture — ROI exagerado (Inmobiliaria alto ticket)
```json
{
  "clientName": "Inmobiliaria Alto Ticket",
  "sector": "Inmobiliaria",
  "monthlyConversationsLikely": 1200,
  "minutesPerConversation": 10,
  "automationPercentage": 0.45,
  "hourlyCost": 15000,
  "currentCloseRate": 0.01,
  "expectedCloseRate": 0.06,
  "averageTicket": 180000000,
  "grossMargin": 0.03,
  "monthlyInvestment": 900000,
  "expected_alert": "ROI > 1000%"
}
```

---

## Matriz de cobertura por suite

| Tag | Escenarios | Cuándo corre |
|-----|-----------|-------------|
| `@smoke @critico` | 10 | En cada PR (gate de calidad) |
| `@regression` | 1 | En cada PR + pre-release (DoD-027) |
| `@happy-path` | 18 | Nightly |
| `@error-path` | 5 | En cada PR |
| `@edge-case` | 12 | Nightly |
| `@seguridad` | 2 | En cada PR (modo presentación) |
| `@performance` | 1 | Pre-release |
