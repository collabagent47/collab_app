---
id: SPEC-002
status: IMPLEMENTED
feature: collab-roi-explorer-mvp
created: 2026-06-03
updated: 2026-06-03
author: spec-generator
version: "1.0"
related-specs: []
---

# Spec: Collab ROI Explorer MVP

> **Estado:** `APPROVED` — implementación habilitada.
> **Ciclo de vida:** DRAFT → APPROVED → IN_PROGRESS → IMPLEMENTED → DEPRECATED

> ✅ **STACK APROBADO:** Tailwind CSS + shadcn/ui + Zustand + Recharts + Framer Motion + React Hook Form + Zod + Lucide Icons.
> Override explícito de `frontend.md` aprobado por el Tech Lead para este proyecto.

---

## 1. REQUERIMIENTOS

### Descripción

Collab ROI Explorer es una aplicación web MVP **frontend-first**, pedagógica y narrativa, que permite al equipo Collab preparar sesiones comerciales, explorar clientes, identificar fricciones operativas/comerciales, sugerir automatizaciones con IA y estimar el ROI de forma prudente mediante la metodología EVIAR. La app enseña al equipo conceptos de ROI, guía la conversación con clientes y genera historias ejecutivas presentables. No es una calculadora de ROI: es una herramienta de habilitación comercial.

### Requerimiento de Negocio

Ver `.github/requirements/collab-roi-explorer-mvp.md` — documento completo con 105 reglas de negocio, 30 DoD items, 9 asunciones y 30 GAPS.

**Resumen ejecutivo del requerimiento:**
- Exploración de clientes guiada por metodología EVIAR (Entender, Ver fricciones, Identificar oportunidades, Automatizar con criterio, Retorno estimado)
- Motor ROI aislado con escenarios conservador/medio/optimista, cálculo con margen (nunca ventas brutas)
- Academia ROI pedagógica visible en navegación
- Base de conocimiento editable con flujo de sugerencias + curaduría
- Modos aprendiz / experto / presentación
- Plantilla base: sector Agroinsumos / caso Fertilizantes Mix
- Persistencia: localStorage en MVP (migrable a FastAPI + MongoDB)

---

### Historias de Usuario

#### HU-01: Dashboard de exploraciones

```
Como:        miembro del equipo Collab
Quiero:      ver un listado de todas las exploraciones con su estado y datos clave
Para:        acceder rápidamente a cualquier exploración activa, crear nuevas y monitorear el pipeline comercial

Prioridad:   Alta
Estimación:  M
Dependencias: Ninguna
Capa:        Frontend
```

#### Criterios de Aceptación — HU-01

**Happy Path**
```gherkin
CRITERIO-1.1: Listado de exploraciones
  Dado que:  el usuario accede a la aplicación
  Cuando:    navega al dashboard
  Entonces:  ve el listado de exploraciones con nombre del cliente, sector, estado y fecha de actualización
  Y:         puede filtrar por estado (borrador, en progreso, ROI calculado, etc.)
  Y:         puede crear una nueva exploración
```

**Edge Case**
```gherkin
CRITERIO-1.2: Dashboard vacío
  Dado que:  no existen exploraciones guardadas
  Cuando:    el usuario accede al dashboard
  Entonces:  ve un estado vacío con mensaje motivacional y botón "Nueva exploración"
  Y:         no se muestra un error ni pantalla en blanco
```

```gherkin
CRITERIO-1.3: Dashboard con 100+ exploraciones
  Dado que:  existen 100 exploraciones en localStorage
  Cuando:    el usuario accede al dashboard
  Entonces:  la pantalla carga sin degradación visible de performance
  Y:         el scroll es fluido
```

---

#### HU-02: Nueva exploración con plantilla Agroinsumos

```
Como:        miembro del equipo Collab
Quiero:      crear una nueva exploración seleccionando la plantilla Agroinsumos
Para:        iniciar con fricciones, módulos y supuestos precargados, ahorrando tiempo y evitando errores de inicio

Prioridad:   Alta
Estimación:  M
Dependencias: HU-01
Capa:        Frontend
```

#### Criterios de Aceptación — HU-02

**Happy Path**
```gherkin
CRITERIO-2.1: Crear exploración desde plantilla Agroinsumos
  Dado que:  el usuario está en el dashboard
  Cuando:    selecciona "Nueva exploración" y elige la plantilla "Agroinsumos"
  Entonces:  el sistema crea una exploración en estado "draft"
  Y:         precarga las fricciones del template Agroinsumos
  Y:         precarga los módulos sugeridos
  Y:         precarga los supuestos iniciales
  Y:         redirige al workspace mostrando primero la introducción EVIAR
```

**Error Path**
```gherkin
CRITERIO-2.2: Nombre de cliente requerido
  Dado que:  el usuario intenta crear una exploración
  Cuando:    no ingresa el nombre del cliente y confirma
  Entonces:  el sistema muestra error de validación en el campo "Nombre del cliente"
  Y:         no crea la exploración
```

**Edge Case**
```gherkin
CRITERIO-2.3: Exploración guardada automáticamente
  Dado que:  el usuario crea una exploración y captura datos parciales
  Cuando:    cierra el navegador y regresa
  Entonces:  la exploración está disponible en el dashboard en estado "draft"
  Y:         los datos ingresados están preservados en localStorage
```

---

#### HU-03: Workspace de exploración EVIAR

```
Como:        miembro del equipo Collab
Quiero:      navegar el workspace de exploración organizado por la metodología EVIAR
Para:        capturar la historia del cliente, su operación actual, identificar fricciones y oportunidades de forma ordenada

Prioridad:   Alta
Estimación:  XL
Dependencias: HU-02
Capa:        Frontend
```

#### Criterios de Aceptación — HU-03

**Happy Path**
```gherkin
CRITERIO-3.1: Captura de historia del cliente
  Dado que:  el usuario está en el workspace de exploración
  Cuando:    completa los campos de historia del cliente (sector, canal, producto, cliente objetivo, objetivo de mejora)
  Entonces:  el sistema genera automáticamente un borrador narrativo editable
  Y:         el dato se marca como "confirmado" si el usuario lo confirma, o "supuesto" si está inferido
```

```gherkin
CRITERIO-3.2: Selección de fricciones con tarjetas
  Dado que:  el usuario está en la sección "Ver fricciones" del workspace
  Cuando:    selecciona las tarjetas de fricciones que aplican (ej. "No hay seguimiento comercial", "Cotizaciones manuales", "No hay trazabilidad")
  Entonces:  el sistema sugiere el tipo de oportunidad (comercial, operativa o mixta)
  Y:         actualiza el panel de insights en tiempo real
  Y:         actualiza los módulos sugeridos
```

```gherkin
CRITERIO-3.3: Sugerencia de oportunidad comercial
  Dado que:  la atención actual capturada es menor al 80%
  Cuando:    el sistema evalúa las fricciones seleccionadas
  Entonces:  sugiere oportunidad "Comercial"
  Y:         muestra explicación en lenguaje simple del por qué
```

```gherkin
CRITERIO-3.4: Sugerencia de oportunidad operativa
  Dado que:  la atención actual capturada es >= 90% y existen fricciones de tareas repetitivas
  Cuando:    el sistema evalúa las fricciones seleccionadas
  Entonces:  sugiere oportunidad "Operativa"
  Y:         muestra explicación en lenguaje simple del por qué
```

```gherkin
CRITERIO-3.5: Sugerencia de oportunidad mixta
  Dado que:  hay fricciones de seguimiento, cotización, trazabilidad o conversión seleccionadas
  Cuando:    el sistema evalúa las fricciones
  Entonces:  sugiere oportunidad "Mixta"
  Y:         muestra explicación en lenguaje simple del por qué
```

**Edge Case**
```gherkin
CRITERIO-3.6: Datos marcados como pendiente no bloquean flujo
  Dado que:  el usuario no tiene el margen bruto del cliente
  Cuando:    intenta avanzar en el workspace
  Entonces:  puede continuar marcando el dato como "pendiente"
  Y:         el sistema no bloquea el flujo
  Y:         muestra indicador visual de datos pendientes
```

---

#### HU-04: Motor ROI con escenarios

```
Como:        miembro del equipo Collab
Quiero:      calcular el ROI estimado en escenarios conservador, medio y optimista
Para:        presentar al cliente una estimación prudente y pedagógica del valor generado, diferenciando ahorro operativo de beneficio comercial

Prioridad:   Alta (BLOQUEANTE)
Estimación:  L
Dependencias: HU-03
Capa:        Frontend + Domain
```

#### Criterios de Aceptación — HU-04

**Happy Path**
```gherkin
CRITERIO-4.1: Calcular ROI escenario medio — caso Fertilizantes Mix
  Dado que:  existe una exploración con los siguientes datos:
             conversaciones mensuales: 270
             minutos por conversación: 8
             porcentaje automatizable: 60%
             costo hora: $15.000
             ticket promedio: $350.000
             margen bruto: 20%
             tasa cierre actual: 10%
             tasa cierre esperada: 13%
             inversión mensual: $700.000
  Cuando:    el usuario calcula el ROI
  Entonces:  el ahorro operativo es $324.000
  Y:         el beneficio comercial es $567.000
  Y:         el beneficio total es $891.000
  Y:         el ROI financiero es ~27.28%
  Y:         el multiplicador es ~1.27
  Y:         el payback es ~0.78 meses
```

```gherkin
CRITERIO-4.2: Mostrar narrativa antes que números
  Dado que:  el motor ROI ha calculado los resultados
  Cuando:    se muestra la pantalla de resultados
  Entonces:  primero se muestra el bloque narrativo explicando qué se está midiendo
  Y:         luego se muestran los indicadores numéricos por escenario
```

```gherkin
CRITERIO-4.3: Tres escenarios diferenciados
  Dado que:  el motor ROI tiene los datos de entrada
  Cuando:    calcula los escenarios
  Entonces:  genera resultado conservador (factores reducidos)
  Y:         genera resultado medio (factores base)
  Y:         genera resultado optimista (factores aumentados)
  Y:         cada escenario muestra: ahorro operativo, beneficio comercial, total, ROI financiero, multiplicador, payback
```

**Error Path**
```gherkin
CRITERIO-4.4: Sin margen — no calcular beneficio comercial definitivo
  Dado que:  el usuario no ha capturado el margen bruto
  Cuando:    intenta calcular ROI
  Entonces:  el sistema calcula el ahorro operativo (si hay datos suficientes)
  Y:         NO calcula beneficio comercial
  Y:         muestra alerta: "Falta el margen bruto para calcular el beneficio comercial. Marca este dato como pendiente para continuar."
  Y:         el dato queda marcado como pendiente
```

```gherkin
CRITERIO-4.5: Beneficio total cero — payback nulo
  Dado que:  el beneficio total calculado es cero
  Cuando:    el motor calcula el payback
  Entonces:  el payback se muestra como "No disponible" (null)
  Y:         el sistema no lanza error ni división por cero
```

**Edge Case — Validaciones y alertas**
```gherkin
CRITERIO-4.6: Alerta ROI financiero > 1000%
  Dado que:  el ROI financiero calculado supera 1000%
  Cuando:    se muestran los resultados
  Entonces:  aparece alerta: "El ROI calculado parece muy alto. Revisa el ticket promedio, margen o tasa de cierre esperada."
```

```gherkin
CRITERIO-4.7: Alerta margen > 80%
  Dado que:  el usuario ingresó un margen bruto mayor al 80%
  Cuando:    valida los datos de entrada
  Entonces:  aparece alerta: "Un margen del X% es inusualmente alto. Confirma este dato con el cliente."
```

```gherkin
CRITERIO-4.8: Alerta tasa cierre esperada > 50%
  Dado que:  la tasa de cierre esperada ingresada supera 50%
  Cuando:    valida los datos de entrada
  Entonces:  aparece alerta de posible sobreestimación
```

```gherkin
CRITERIO-4.9: Alerta tasa esperada menor que tasa actual
  Dado que:  la tasa de cierre esperada es menor que la tasa de cierre actual
  Cuando:    valida los datos de entrada
  Entonces:  aparece alerta indicando el inconsistencia
```

```gherkin
CRITERIO-4.10: No usar ventas brutas como beneficio
  Dado que:  cualquier cálculo de beneficio comercial
  Cuando:    el motor ejecuta las fórmulas
  Entonces:  el beneficio comercial = additionalSales × grossMargin
  Y:         NUNCA beneficio = ventas brutas directamente
```

---

#### HU-05: Preparación de sesión

```
Como:        miembro del equipo Collab
Quiero:      preparar la sesión comercial antes de hablar con el cliente
Para:        llegar con objetivo claro, preguntas definidas, datos pendientes identificados y checklist verificado

Prioridad:   Alta
Estimación:  M
Dependencias: HU-02
Capa:        Frontend
```

#### Criterios de Aceptación — HU-05

**Happy Path**
```gherkin
CRITERIO-5.1: Registrar preparación de sesión
  Dado que:  el usuario está en la pantalla de preparación de sesión
  Cuando:    completa el objetivo, agrega preguntas sugeridas, datos pendientes, supuestos y checklist
  Entonces:  la preparación queda guardada en la exploración
  Y:         puede revisarla antes de la reunión
```

```gherkin
CRITERIO-5.2: Tipos de sesión diferenciados
  Dado que:  el usuario crea una preparación de sesión
  Cuando:    selecciona el tipo de sesión
  Entonces:  puede elegir entre: primera reunión, seguimiento, validación de datos, presentación de propuesta
```

---

#### HU-06: Academia ROI

```
Como:        miembro del equipo Collab (especialmente nuevos)
Quiero:      acceder a la Academia ROI desde la navegación principal
Para:        aprender conceptos de ROI, la metodología EVIAR, preguntas recomendadas, errores comunes y frases listas para usar

Prioridad:   Alta
Estimación:  M
Dependencias: Ninguna
Capa:        Frontend
```

#### Criterios de Aceptación — HU-06

**Happy Path**
```gherkin
CRITERIO-6.1: Acceso desde navegación
  Dado que:  el usuario está en cualquier pantalla
  Cuando:    hace clic en "Academia ROI" en el menú principal
  Entonces:  navega a la Academia sin perder el contexto de su exploración actual
```

```gherkin
CRITERIO-6.2: Contenido de Academia visible
  Dado que:  el usuario está en la Academia ROI
  Cuando:    navega por las secciones
  Entonces:  puede acceder a: propósito de la app, qué es ROI, por qué importa, metodología EVIAR,
             conceptos básicos (payback, ticket, margen, tasa de cierre, escenarios),
             preguntas recomendadas por etapa, errores comunes, frases listas para usar y casos de práctica
```

---

#### HU-07: Base de conocimiento y sugerencias

```
Como:        miembro del equipo Collab
Quiero:      consultar y sugerir mejoras a la base de conocimiento
Para:        enriquecer las plantillas con aprendizajes reales de exploraciones, sin contaminar las plantillas oficiales automáticamente

Prioridad:   Media
Estimación:  M
Dependencias: Ninguna
Capa:        Frontend
```

#### Criterios de Aceptación — HU-07

**Happy Path**
```gherkin
CRITERIO-7.1: Consultar base de conocimiento
  Dado que:  el usuario navega a la base de conocimiento
  Cuando:    accede a la sección
  Entonces:  puede ver: sectores, fricciones frecuentes, preguntas sugeridas, módulos recomendados,
             supuestos iniciales, frases recomendadas, errores comunes y casos de práctica
```

```gherkin
CRITERIO-7.2: Crear sugerencia de mejora
  Dado que:  el usuario terminó una exploración y tiene un aprendizaje nuevo
  Cuando:    crea una sugerencia en la base de conocimiento
  Entonces:  la sugerencia queda en estado "pending_review"
  Y:         NO modifica automáticamente la plantilla oficial
  Y:         queda pendiente de aprobación por el curador
```

**Edge Case**
```gherkin
CRITERIO-7.3: Sugerencia rechazada no altera plantilla
  Dado que:  existe una sugerencia en estado "pending_review"
  Cuando:    el curador la rechaza
  Entonces:  la plantilla oficial permanece sin cambios
  Y:         la sugerencia queda en estado "rejected"
```

---

#### HU-08: Modo presentación

```
Como:        miembro del equipo Collab
Quiero:      activar el modo presentación en una exploración completada
Para:        mostrar al cliente solo la información relevante (contexto, fricciones, oportunidad, solución, valor estimado) sin exponer notas internas, historial ni alertas privadas

Prioridad:   Alta
Estimación:  S
Dependencias: HU-04
Capa:        Frontend
```

#### Criterios de Aceptación — HU-08

**Happy Path**
```gherkin
CRITERIO-8.1: Activar modo presentación
  Dado que:  existe una exploración con diagnóstico completo
  Cuando:    el usuario activa el modo presentación
  Entonces:  se ocultan: notas internas, campos técnicos, historial, alertas privadas
  Y:         se muestra: contexto del cliente, fricciones identificadas, tipo de oportunidad,
             automatización sugerida, valor estimado, ROI explicado en lenguaje simple y próximo paso
```

**Edge Case**
```gherkin
CRITERIO-8.2: Notas internas NUNCA visibles en presentación
  Dado que:  la exploración tiene notas internas registradas
  Cuando:    el modo presentación está activo
  Entonces:  las notas internas NO aparecen en ninguna sección visible
  Y:         el código no renderiza los datos de notas internas en el DOM
```

---

#### HU-09: Modos aprendiz y experto

```
Como:        miembro del equipo Collab
Quiero:      poder cambiar entre modo aprendiz y modo experto
Para:        recibir ayudas pedagógicas adicionales cuando soy nuevo, o un flujo más rápido cuando soy experto

Prioridad:   Media
Estimación:  S
Dependencias: HU-03
Capa:        Frontend
```

#### Criterios de Aceptación — HU-09

**Happy Path**
```gherkin
CRITERIO-9.1: Modo aprendiz muestra ayudas
  Dado que:  el modo aprendiz está activo
  Cuando:    el usuario navega el workspace
  Entonces:  ve tooltips, hints contextuales y explicaciones pedagógicas en cada sección de EVIAR
```

```gherkin
CRITERIO-9.2: Modo experto reduce ayudas
  Dado que:  el modo experto está activo
  Cuando:    el usuario navega el workspace
  Entonces:  los hints y tooltips pedagógicos están ocultos
  Y:         el flujo es más compacto y rápido
```

---

#### HU-11: Módulo de Insumos y Contexto

```
Como:        miembro del equipo Collab
Quiero:      registrar los productos/insumos que maneja el cliente en la exploración
Para:        enriquecer el contexto narrativo, validar el ticket promedio y generar estimaciones ROI más precisas y confiables

Prioridad:   Alta
Estimación:  M
Dependencias: HU-03
Capa:        Frontend
```

#### Criterios de Aceptación — HU-11

**Happy Path**
```gherkin
CRITERIO-11.1: Registrar insumos del cliente
  Dado que:  el usuario está en el workspace de exploración
  Cuando:    accede a la sección "Insumos" y agrega un producto con nombre, categoría y precio promedio
  Entonces:  el insumo queda guardado en la exploración
  Y:         el precio promedio del insumo aparece como sugerencia para el ticket promedio en ROIInputs
  Y:         se muestra el badge de confianza (confirmed/assumption/pending)
```

```gherkin
CRITERIO-11.2: Múltiples insumos enriquecen el contexto
  Dado que:  el usuario registró 3 o más insumos
  Cuando:    el sistema genera el borrador narrativo del cliente
  Entonces:  la narrativa menciona los productos/insumos principales
  Y:         el LiveInsightPanel muestra el rango de precios como contexto del ticket
```

```gherkin
CRITERIO-11.3: Plantilla Agroinsumos precarga insumos típicos
  Dado que:  el usuario crea una exploración con plantilla Agroinsumos
  Cuando:    accede a la sección Insumos
  Entonces:  ve insumos típicos precargados (fertilizante NPK, pesticida, semillas, etc.)
  Y:         todos marcados como "assumption" hasta que el usuario los confirme
```

**Edge Case**
```gherkin
CRITERIO-11.4: Sin insumos no bloquea el flujo
  Dado que:  el usuario no ha registrado ningún insumo
  Cuando:    avanza en el workspace
  Entonces:  el flujo continúa normalmente
  Y:         el sistema no muestra error, solo indica que el contexto de insumos está vacío
```

---

#### HU-10: Resumen ejecutivo editable

```
Como:        miembro del equipo Collab
Quiero:      generar y editar un resumen ejecutivo de la exploración
Para:        tener un documento narrativo listo para compartir con el cliente, con contexto, fricciones, oportunidad, automatización sugerida, valor estimado y próximo paso

Prioridad:   Alta
Estimación:  S
Dependencias: HU-04
Capa:        Frontend
```

#### Criterios de Aceptación — HU-10

**Happy Path**
```gherkin
CRITERIO-10.1: Generar resumen ejecutivo
  Dado que:  la exploración tiene diagnóstico y resultados ROI calculados
  Cuando:    el usuario solicita generar el resumen ejecutivo
  Entonces:  el sistema genera un borrador editable con:
             - Contexto del cliente
             - Fricciones identificadas
             - Tipo de oportunidad
             - Automatización sugerida
             - Valor estimado (escenario seleccionado)
             - Nivel de confianza
             - Próximo paso recomendado
```

---

### Reglas de Negocio

> Lista de reglas clave extraídas del requerimiento. Ver `.github/requirements/collab-roi-explorer-mvp.md` para la lista completa (105 reglas).

**ROI (críticas / bloqueantes):**
1. El beneficio comercial = additionalSales × grossMargin. NUNCA usar ventas brutas.
2. Si grossMargin es undefined o cero, NO calcular beneficio comercial — marcar como pendiente.
3. Si totalBenefit === 0, paybackMonths = null (nunca dividir por cero).
4. Los escenarios conservador/optimista se calculan aplicando factores sobre el escenario medio.
5. Alertas obligatorias: ROI > 1000%, margen > 80%, tasa esperada > 50%, tasa esperada < tasa actual.

**Datos (críticas):**
6. Todo dato debe clasificarse como: `confirmed` | `assumption` | `pending`.
7. La app NO inventa datos externos. Toda información viene del usuario o plantillas.
8. Datos pendientes NO bloquean el flujo — se marca el estado y se continúa.

**Modo presentación (bloqueante):**
9. En modo presentación: NUNCA renderizar notas internas, historial, alertas privadas ni campos técnicos.

**Base de conocimiento:**
10. Las sugerencias NUNCA modifican automáticamente la plantilla oficial.
11. Solo el curador puede aprobar sugerencias.
12. Cada elemento lleva registro de origen: `base_template` | `real_case` | `approved_suggestion` | `curator_created`.

**UI:**
13. La UI no debe parecer Excel ni sistema administrativo antiguo.
14. Usar tarjetas, bloques narrativos, ayudas contextuales y feedback inmediato.
15. Mostrar narrativa ANTES que indicadores numéricos.

---

## 2. DISEÑO

### Modelos de Datos

> MVP usa localStorage. Los tipos TypeScript definen el contrato de datos. Cuando se implemente FastAPI, estos tipos mapean a colecciones MongoDB.

#### Entidades afectadas

| Entidad | Almacén MVP | Almacén futuro | Descripción |
|---------|-------------|----------------|-------------|
| `Exploration` | localStorage `collab_explorations` | MongoDB `explorations` | Exploración de cliente |
| `SessionPreparation` | Embebida en Exploration | Embebida en MongoDB | Preparación de sesión |
| `Friction` | localStorage `collab_frictions` | MongoDB `frictions` | Catálogo de fricciones |
| `KnowledgeSuggestion` | localStorage `collab_suggestions` | MongoDB `knowledge_suggestions` | Sugerencias pendientes |
| `AppSettings` | localStorage `collab_settings` | — | Modo aprendiz/experto, preferencias UI |

#### Campos — Exploration

| Campo | Tipo | Obligatorio | Validación | Descripción |
|-------|------|-------------|------------|-------------|
| `id` | string (UUID) | sí | auto-generado | Identificador único |
| `clientName` | string | sí | min 2, max 100 chars | Nombre del cliente |
| `sector` | string | sí | min 2, max 50 chars | Sector del cliente |
| `city` | string | no | max 50 chars | Ciudad del cliente |
| `mainChannel` | string | no | max 100 chars | Canal principal de ventas |
| `mainProduct` | string | no | max 100 chars | Producto principal |
| `targetCustomer` | string | no | max 200 chars | Tipo de cliente objetivo |
| `improvementGoal` | string | no | max 500 chars | Objetivo de mejora |
| `contactName` | string | no | max 100 chars | Nombre del contacto |
| `contactRole` | string | no | max 100 chars | Rol del contacto |
| `status` | ExplorationStatus | sí | enum | Estado del ciclo de vida |
| `opportunityType` | OpportunityType | no | enum | Tipo de oportunidad sugerida |
| `dataQuality` | `'low'│'medium'│'high'` | no | — | Calidad de los datos ingresados |
| `createdAt` | string (ISO8601) | sí | auto-generado | Timestamp de creación |
| `updatedAt` | string (ISO8601) | sí | auto-generado | Timestamp de última actualización |
| `sessionPreparations` | SessionPreparation[] | sí | — | Preparaciones de sesión |
| `operation` | OperationData | sí | — | Datos operativos del cliente |
| `frictionIds` | string[] | sí | — | IDs de fricciones seleccionadas |
| `recommendedModules` | RecommendedModule[] | sí | — | Módulos sugeridos con estado |
| `roiInputs` | ROIInputs | sí | — | Datos de entrada para el motor ROI |
| `roiResults` | ROIScenarioResults | no | — | Resultados calculados (3 escenarios) |
| `executiveSummary` | string | no | max 5000 chars | Resumen ejecutivo editable |
| `notes` | InternalNote[] | no | — | Notas internas (ocultas en presentación) |

#### Campos — ROIInputs

| Campo | Tipo | Obligatorio | Validación | Descripción |
|-------|------|-------------|------------|-------------|
| `averageTicket` | number | no | >= 0 | Ticket promedio COP |
| `grossMargin` | number | no | 0–1 | Margen bruto (fracción: 0.20 = 20%) |
| `currentCloseRate` | number | no | 0–1 | Tasa de cierre actual |
| `expectedCloseRate` | number | no | 0–1 | Tasa de cierre esperada |
| `monthlyInvestment` | number | no | >= 0 | Inversión mensual COP |
| `hourlyCost` | number | no | >= 0 | Costo hora equipo COP |
| `automationPercentage` | number | no | 0–1 | % automatizable (fracción) |

#### Campos — OperationData

| Campo | Tipo | Obligatorio | Validación | Descripción |
|-------|------|-------------|------------|-------------|
| `monthlyConversationsMin` | number | no | >= 0 | Conversaciones mensuales mínimas |
| `monthlyConversationsLikely` | number | no | >= 0 | Conversaciones mensuales probables |
| `monthlyConversationsMax` | number | no | >= 0 | Conversaciones mensuales máximas |
| `currentAttentionRate` | number | no | 0–100 | % atención actual |
| `teamSize` | number | no | >= 1 | Personas involucradas |
| `monthlySalesMin` | number | no | >= 0 | Ventas mensuales mínimas COP |
| `monthlySalesMax` | number | no | >= 0 | Ventas mensuales máximas COP |
| `minutesPerConversation` | number | no | >= 1 | Minutos promedio por conversación |
| `averageClosingTimeDays` | number | no | >= 1 | Días promedio para cerrar |

#### Tipos de enumeración

```typescript
type ExplorationStatus =
  | 'draft'
  | 'in_progress'
  | 'incomplete_data'
  | 'roi_calculated'
  | 'summary_generated'
  | 'proposal_sent'
  | 'closed_won'
  | 'closed_lost'
  | 'discarded';

type OpportunityType = 'commercial' | 'operational' | 'mixed';
type DataConfidence = 'confirmed' | 'assumption' | 'pending';
type UserMode = 'learner' | 'expert';
type PresentationMode = boolean;
```

#### Fórmulas del Motor ROI (dominio puro)

```typescript
// domain/roi/roi-engine.ts — SIN dependencias de UI

monthlyHours = monthlyConversations * minutesPerConversation / 60

savedHours = monthlyHours * automationPercentage

operationalSavings = savedHours * hourlyCost

closeRateImprovement = expectedCloseRate - currentCloseRate

additionalSales = monthlyConversations * closeRateImprovement * averageTicket

commercialBenefit = additionalSales * grossMargin  // NUNCA additionalSales solo

totalBenefit = operationalSavings + commercialBenefit

financialROI = ((totalBenefit - monthlyInvestment) / monthlyInvestment) * 100

multiplier = totalBenefit / monthlyInvestment

paybackMonths = totalBenefit === 0 ? null : monthlyInvestment / totalBenefit
```

#### Factores de escenario (GAPS-027 resuelto — factores fijos, display default: optimista)

| Escenario | Factor conversaciones | Factor automación | Factor cierre | Display |
|-----------|----------------------|-------------------|---------------|---------|
| Conservador | min | 0.8× | 0.8× | secundario |
| Medio | likely | 1× | 1× | secundario |
| Optimista | max | 1.2× | 1.2× | **destacado (default)** |

> La pantalla de resultados resalta el escenario **optimista** como el principal. Los otros dos son visibles pero en formato compacto.

#### Campos — Insumo (nuevo modelo — GAPS resuelto: módulo de insumos)

| Campo | Tipo | Obligatorio | Validación | Descripción |
|-------|------|-------------|------------|-------------|
| `id` | string (UUID) | sí | auto-generado | Identificador único |
| `name` | string | sí | min 2, max 100 | Nombre del producto/insumo |
| `category` | string | no | max 50 | Categoría (ej. fertilizante, pesticida, semilla) |
| `priceMin` | number | no | >= 0 | Precio mínimo COP |
| `priceMax` | number | no | >= 0 | Precio máximo COP |
| `avgPrice` | number | no | >= 0 | Precio promedio COP (base para ticket) |
| `unit` | string | no | max 20 | Unidad de medida (kg, L, bolsa, etc.) |
| `marginEstimate` | number | no | 0–1 | Margen estimado para este insumo |
| `notes` | string | no | max 500 | Observaciones |
| `confidence` | DataConfidence | sí | enum | confirmed / assumption / pending |

> El campo `avgPrice` de los insumos puede usarse para calcular o validar el `averageTicket` en ROIInputs.
> La exploración se extiende con: `insumos: Insumo[]`

#### Umbrales de calidad de datos (GAPS-025 resuelto — nivel medio)

```typescript
// domain/roi/roi-validations.ts
const DATA_QUALITY_THRESHOLDS = {
  criticalFields: ['monthlyConversationsLikely', 'minutesPerConversation', 'averageTicket',
                   'grossMargin', 'currentCloseRate', 'expectedCloseRate',
                   'hourlyCost', 'automationPercentage', 'monthlyInvestment'],
  low:    { minFilledPercent: 0,   maxFilledPercent: 40  },  // < 40% campos críticos
  medium: { minFilledPercent: 40,  maxFilledPercent: 75  },  // 40–75%
  high:   { minFilledPercent: 75,  maxFilledPercent: 100 },  // > 75%
}
```

#### Umbral beneficio total vs ventas (GAPS-026 resuelto — nivel medio)

```typescript
// Alerta si: totalBenefit > 5 × avgMonthlySales
// avgMonthlySales = (monthlySalesMin + monthlySalesMax) / 2
const BENEFIT_VS_SALES_ALERT_MULTIPLIER = 5;
```

#### Índices / Constraints (MongoDB futuro)

- `explorations.clientName` + `explorations.createdAt`: índice compuesto para búsqueda y ordenamiento
- `knowledge_suggestions.status`: índice para filtrar pendientes de revisión

---

### API Endpoints

> **MVP**: No hay backend. Todos los endpoints son contratos para implementación futura con FastAPI + MongoDB.
> **Implementación actual**: `src/services/explorationService.ts` actúa como capa de abstracción sobre localStorage.

#### GET /api/v1/explorations
- **Descripción**: Lista todas las exploraciones del usuario
- **Auth requerida**: sí (TBD — GAPS-006)
- **Query params**: `status?`, `sector?`, `page?`, `limit?`
- **Response 200**: `[{ id, clientName, sector, status, updatedAt, dataQuality }]`
- **Response 401**: sin autenticación

#### POST /api/v1/explorations
- **Descripción**: Crea una nueva exploración
- **Auth requerida**: sí (TBD)
- **Request Body**: `{ clientName, sector, templateId? }`
- **Response 201**: Exploration completa
- **Response 400**: clientName o sector faltantes

#### GET /api/v1/explorations/{id}
- **Descripción**: Obtiene exploración completa
- **Auth requerida**: sí (TBD)
- **Response 200**: Exploration completa
- **Response 404**: no encontrada

#### PUT /api/v1/explorations/{id}
- **Descripción**: Actualiza una exploración (autosave)
- **Auth requerida**: sí (TBD)
- **Request Body**: Campos parciales de Exploration
- **Response 200**: Exploration actualizada
- **Response 404**: no encontrada

#### POST /api/v1/explorations/{id}/calculate-roi
- **Descripción**: Calcula los 3 escenarios ROI y los persiste
- **Auth requerida**: sí (TBD)
- **Request Body**: ROIInputs + OperationData
- **Response 200**: ROIScenarioResults
- **Response 422**: datos insuficientes para calcular

#### POST /api/v1/explorations/{id}/summary
- **Descripción**: Genera borrador de resumen ejecutivo
- **Auth requerida**: sí (TBD)
- **Response 200**: `{ executiveSummary: string }`

#### GET /api/v1/knowledge-base
- **Descripción**: Retorna la base de conocimiento completa
- **Auth requerida**: sí (TBD)
- **Response 200**: `{ sectors, frictions, questions, modules, assumptions, phrases, errors, cases }`

#### POST /api/v1/knowledge-base/suggestions
- **Descripción**: Crea una sugerencia pendiente de revisión
- **Auth requerida**: sí (TBD)
- **Request Body**: `{ type, content, sourceExplorationId? }`
- **Response 201**: KnowledgeSuggestion con status `pending_review`

#### PUT /api/v1/knowledge-base/suggestions/{id}/review
- **Descripción**: Aprueba o rechaza una sugerencia (solo curador)
- **Auth requerida**: sí — solo rol curador (TBD — GAPS-006, GAPS-007)
- **Request Body**: `{ action: 'approve' | 'reject', comment?: string }`
- **Response 200**: KnowledgeSuggestion actualizada
- **Response 403**: sin permisos de curaduría

---

### Diseño Frontend

#### Estructura de archivos

```
src/
  domain/
    roi/
      roi-engine.ts          ← fórmulas puras (sin imports de UI)
      roi-types.ts           ← tipos TypeScript del dominio ROI
      roi-validations.ts     ← lógica de alertas/warnings
      roi-scenarios.ts       ← cálculo de escenarios con factores
      roi-regression.fixtures.ts  ← datos de prueba Fertilizantes Mix
    methodology/
      eviar.ts               ← definición y pasos de la metodología
    knowledge-base/
      knowledge-types.ts     ← tipos KnowledgeSuggestion, Friction, etc.
  data/
    templates/
      agroinsumos.template.ts   ← plantilla Agroinsumos / Fertilizantes Mix
      academy-content.ts        ← contenido de Academia ROI
      practice-cases.ts         ← casos de práctica
  services/
    explorationService.ts      ← CRUD localStorage (interface migrable a Axios)
    knowledgeService.ts        ← base de conocimiento localStorage
    roiService.ts              ← wrapper del motor ROI (llama domain/roi/)
  hooks/
    useExploration.ts          ← estado, CRUD y autosave de exploración
    useROI.ts                  ← cálculo de ROI y escenarios
    useKnowledge.ts            ← base de conocimiento y sugerencias
    useAppMode.ts              ← aprendiz / experto / presentación
  components/
    shared/
      QualityWarning/          ← alertas de calidad ROI
      LearnerHint/             ← ayudas modo aprendiz
      DataBadge/               ← badge confirmed/assumption/pending
      EviarProgressBar/        ← progreso por metodología
    exploration/
      ExplorationCard/         ← tarjeta en dashboard
      FrictionCard/            ← selección de fricción
      OpportunitySuggestionCard/  ← tipo de oportunidad sugerida
      AutomationModuleCard/    ← módulo de automatización sugerido
      ROIScenarioCard/         ← escenario ROI (conservador/medio/optimista)
    workspace/
      ClientStoryBlock/        ← captura historia del cliente
      OperationCurrentStateBlock/  ← operación actual con rangos
      ROIInputPanel/           ← formulario de entradas ROI
      ExecutiveSummaryEditor/  ← resumen ejecutivo editable
      LiveInsightPanel/        ← panel de insight en tiempo real
  pages/
    DashboardPage/             ← lista de exploraciones + estado vacío
    NewExplorationPage/        ← wizard creación + selección plantilla
    EviarIntroPage/            ← introducción metodología EVIAR
    ExplorationWorkspacePage/  ← workspace principal (sidebar + centro + insight)
    SessionPreparationPage/    ← preparación de sesión
    AcademyPage/               ← Academia ROI
    KnowledgeBasePage/         ← base de conocimiento
    PresentationModePage/      ← modo presentación limpio
  App.tsx                      ← registro de rutas (React Router v6)
```

#### Componentes nuevos

| Componente | Archivo | Props principales | Descripción |
|------------|---------|-----------------|-------------|
| `ExplorationCard` | `components/exploration/ExplorationCard` | `exploration, onClick` | Tarjeta en dashboard |
| `FrictionCard` | `components/exploration/FrictionCard` | `friction, selected, onToggle` | Tarjeta seleccionable de fricción |
| `OpportunitySuggestionCard` | `components/exploration/OpportunitySuggestionCard` | `type, explanation` | Sugerencia de oportunidad |
| `AutomationModuleCard` | `components/exploration/AutomationModuleCard` | `module, onStatusChange` | Módulo de automatización |
| `ROIScenarioCard` | `components/exploration/ROIScenarioCard` | `scenario, result, isHighlighted` | Escenario ROI |
| `ClientStoryBlock` | `components/workspace/ClientStoryBlock` | `exploration, onChange` | Historia del cliente |
| `OperationCurrentStateBlock` | `components/workspace/OperationCurrentStateBlock` | `operation, onChange` | Operación actual |
| `ROIInputPanel` | `components/workspace/ROIInputPanel` | `inputs, onChange, warnings` | Entradas del motor ROI |
| `ExecutiveSummaryEditor` | `components/workspace/ExecutiveSummaryEditor` | `summary, onChange` | Resumen ejecutivo |
| `LiveInsightPanel` | `components/workspace/LiveInsightPanel` | `exploration` | Insight en tiempo real |
| `QualityWarning` | `components/shared/QualityWarning` | `warnings: string[]` | Alertas de calidad |
| `LearnerHint` | `components/shared/LearnerHint` | `text, visible` | Ayuda modo aprendiz |
| `DataBadge` | `components/shared/DataBadge` | `confidence: DataConfidence` | Badge confirmed/assumption/pending |

#### Páginas nuevas

| Página | Archivo | Ruta | Protegida |
|--------|---------|------|-----------|
| `DashboardPage` | `pages/DashboardPage` | `/` | no (MVP sin auth) |
| `NewExplorationPage` | `pages/NewExplorationPage` | `/explorations/new` | no |
| `EviarIntroPage` | `pages/EviarIntroPage` | `/explorations/:id/intro` | no |
| `ExplorationWorkspacePage` | `pages/ExplorationWorkspacePage` | `/explorations/:id` | no |
| `SessionPreparationPage` | `pages/SessionPreparationPage` | `/explorations/:id/preparation` | no |
| `AcademyPage` | `pages/AcademyPage` | `/academy` | no |
| `KnowledgeBasePage` | `pages/KnowledgeBasePage` | `/knowledge-base` | no |
| `PresentationModePage` | `pages/PresentationModePage` | `/explorations/:id/present` | no |

#### Hooks y State

| Hook | Archivo | Retorna | Descripción |
|------|---------|---------|-------------|
| `useExploration` | `hooks/useExploration.ts` | `{ exploration, loading, save, update, create }` | CRUD exploración con autosave |
| `useExplorations` | `hooks/useExplorations.ts` | `{ explorations, loading, create, remove }` | Lista del dashboard |
| `useROI` | `hooks/useROI.ts` | `{ results, warnings, calculate, isCalculating }` | Cálculo de ROI + validaciones |
| `useKnowledge` | `hooks/useKnowledge.ts` | `{ items, suggest, loadTemplate }` | Base de conocimiento |
| `useAppMode` | `hooks/useAppMode.ts` | `{ userMode, presentationMode, setUserMode, togglePresentation }` | Modos de la app |

#### Services (capa de abstracción)

| Función | Archivo | Descripción |
|---------|---------|-------------|
| `getExplorations()` | `services/explorationService.ts` | Lee lista de localStorage |
| `getExploration(id)` | `services/explorationService.ts` | Lee exploración por ID |
| `createExploration(data)` | `services/explorationService.ts` | Crea en localStorage |
| `updateExploration(id, data)` | `services/explorationService.ts` | Actualiza en localStorage |
| `deleteExploration(id)` | `services/explorationService.ts` | Elimina de localStorage |
| `calculateROI(inputs)` | `services/roiService.ts` | Llama domain/roi/roi-engine |
| `getSuggestions()` | `services/knowledgeService.ts` | Lee sugerencias |
| `createSuggestion(data)` | `services/knowledgeService.ts` | Crea sugerencia pending |

---

### Arquitectura y Dependencias

**Paquetes nuevos requeridos (MVP):**

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` | ^19 | Framework UI |
| `react-dom` | ^19 | Renderer |
| `typescript` | ^5 | Tipado estático |
| `vite` | ^6 | Build tool |
| `react-router-dom` | ^6 | Enrutamiento SPA |
| `tailwindcss` | ^4 | Estilos utilitarios (✅ aprobado override) |
| `@tailwindcss/vite` | ^4 | Plugin Vite para Tailwind v4 |
| `shadcn/ui` | latest | Componentes UI accesibles |
| `framer-motion` | ^11 | Animaciones y transiciones |
| `react-hook-form` | ^7 | Formularios |
| `zod` | ^3 | Validación de esquemas |
| `zustand` | ^5 | Estado global |
| `recharts` | ^2 | Gráficas de escenarios ROI |
| `lucide-react` | latest | Iconos |
| `uuid` | ^9 | Generación de IDs |
| `vitest` | ^2 | Tests unitarios |
| `@testing-library/react` | ^16 | Tests de componentes |
| `@playwright/test` | ^1.44 | Tests E2E |

**Servicios externos:**
- localStorage (MVP) — sin servicios externos
- Firebase: TBD para auth en fase posterior (GAPS-006)
- MongoDB + FastAPI: TBD para backend (GAPS-004)

**Impacto en punto de entrada:**
- `src/App.tsx`: registrar todas las rutas con React Router v6
- `src/main.tsx`: punto de entrada estándar Vite

### Notas de Implementación

> 1. El motor ROI (`domain/roi/roi-engine.ts`) debe ser 100% puro: sin imports de React, sin efectos secundarios, sin acceso a localStorage. Solo funciones que reciben datos y retornan resultados.
> 2. Los servicios (`services/`) son la única capa que accede a localStorage. Los hooks llaman a los servicios.
> 3. El autosave de exploraciones se implementa en `useExploration` con `useEffect + debounce`.
> 4. La plantilla Agroinsumos (`data/templates/agroinsumos.template.ts`) es un objeto TypeScript estático, no fetching externo.
> 5. El modo presentación se controla desde `useAppMode`. En `PresentationModePage`, los componentes de notas/historial/alertas privadas simplemente no se renderizan (no se ocultan con CSS, no aparecen en DOM).
> 6. GAPS a resolver antes de implementar: GAPS-027 (factores conservador/optimista), GAPS-025 (umbrales calidad de datos), GAPS-026 (umbral beneficio total vs ventas).

---

## 3. LISTA DE TAREAS

> Checklist accionable para todos los agentes.

### Domain — Motor ROI (PRIORIDAD MÁXIMA — bloqueante para HU-04)

#### Implementación
- [ ] Crear `src/domain/roi/roi-types.ts` — tipos ROIInputs, ROIResult, ROIScenarioResults, OperationData
- [ ] Crear `src/domain/roi/roi-engine.ts` — funciones puras: `calculateMonthlyHours`, `calculateSavedHours`, `calculateOperationalSavings`, `calculateCloseRateImprovement`, `calculateAdditionalSales`, `calculateCommercialBenefit`, `calculateTotalBenefit`, `calculateFinancialROI`, `calculateMultiplier`, `calculatePayback`, `calculateROI`
- [ ] Crear `src/domain/roi/roi-validations.ts` — funciones: `validateROIInputs`, `generateWarnings` (ROI>1000%, margin>80%, close>50%, close<current)
- [ ] Crear `src/domain/roi/roi-scenarios.ts` — función `calculateScenarios(inputs, operation)` → ROIScenarioResults con factores conservador/optimista
- [ ] Crear `src/domain/roi/roi-regression.fixtures.ts` — datos de prueba Fertilizantes Mix (medio, incompleto, exagerado)
- [ ] Crear `src/domain/methodology/eviar.ts` — estructura de pasos EVIAR
- [ ] Crear `src/domain/knowledge-base/knowledge-types.ts` — tipos Friction, RecommendedModule, KnowledgeSuggestion

#### Tests Domain ROI
- [ ] `test_calculateROI_fertilizantes_mix_medium_scenario` — CRITERIO-4.1 (caso de regresión DoD-027)
- [ ] `test_calculateCommercialBenefit_uses_margin_not_gross_sales` — DoD-012
- [ ] `test_calculatePayback_returns_null_when_totalBenefit_is_zero` — CRITERIO-4.5
- [ ] `test_calculateROI_returns_null_commercialBenefit_without_margin` — CRITERIO-4.4
- [ ] `test_generateWarnings_roi_over_1000_percent` — CRITERIO-4.6
- [ ] `test_generateWarnings_margin_over_80_percent` — CRITERIO-4.7
- [ ] `test_generateWarnings_expectedCloseRate_over_50_percent` — CRITERIO-4.8
- [ ] `test_generateWarnings_expectedCloseRate_less_than_current` — CRITERIO-4.9
- [ ] `test_calculateScenarios_returns_three_scenarios` — CRITERIO-4.3
- [ ] `test_calculateROI_exaggerated_data_triggers_warnings` — datos ROI exagerado (Inmobiliaria)
- [ ] `test_validateROIInputs_percentage_out_of_range` — porcentajes fuera de 0–1

---

### Data / Templates

#### Implementación
- [ ] Crear `src/data/templates/agroinsumos.template.ts` — fricciones precargadas, módulos sugeridos, supuestos iniciales del sector Agroinsumos
- [ ] Crear `src/data/templates/academy-content.ts` — contenido de Academia ROI: propósito, ROI, EVIAR, preguntas por etapa, errores comunes, frases, conceptos
- [ ] Crear `src/data/templates/practice-cases.ts` — casos de práctica (incluir Fertilizantes Mix)

---

### Services / Persistence

#### Implementación
- [ ] Crear `src/services/explorationService.ts` — interface + implementación localStorage: `getAll`, `getById`, `create`, `update`, `remove`
- [ ] Crear `src/services/knowledgeService.ts` — interface + implementación localStorage: `getTemplate`, `getSuggestions`, `createSuggestion`, `reviewSuggestion`
- [ ] Crear `src/services/roiService.ts` — wrapper sobre `domain/roi/roi-engine`: `calculate(exploration)` → ROIScenarioResults
- [ ] Crear `src/services/insumoService.ts` — CRUD localStorage para insumos de exploración

#### Tests Services
- [ ] `explorationService creates and retrieves from localStorage`
- [ ] `explorationService update preserves unmodified fields`
- [ ] `explorationService getById returns null for unknown id`
- [ ] `knowledgeService createSuggestion sets status pending_review`
- [ ] `knowledgeService suggestion does not modify template on review rejected`

---

### Frontend

#### Setup Base
- [ ] Inicializar proyecto Vite + React 19 + TypeScript
- [ ] Instalar dependencias: react-router-dom, uuid, recharts, vitest, @testing-library/react, @playwright/test
- [ ] Configurar `vitest.config.ts` con jsdom environment
- [ ] Configurar `playwright.config.ts` con baseURL localhost
- [ ] Crear estructura de carpetas: domain/, data/, services/, hooks/, components/, pages/
- [ ] Registrar rutas en `src/App.tsx`

#### Hooks
- [ ] Crear `src/hooks/useExploration.ts` — CRUD + autosave con debounce
- [ ] Crear `src/hooks/useExplorations.ts` — lista del dashboard
- [ ] Crear `src/hooks/useROI.ts` — llamada a roiService + manejo de warnings
- [ ] Crear `src/hooks/useKnowledge.ts` — base de conocimiento + sugerencias
- [ ] Crear `src/hooks/useAppMode.ts` — userMode + presentationMode + localStorage persistencia
- [ ] Crear `src/hooks/useInsumos.ts` — CRUD insumos + sugerencia automática de ticket promedio

#### Componentes Shared
- [ ] Crear `components/shared/QualityWarning` — renderiza lista de warnings
- [ ] Crear `components/shared/LearnerHint` — visible solo en modo aprendiz
- [ ] Crear `components/shared/DataBadge` — badge confirmed/assumption/pending
- [ ] Crear `components/shared/EviarProgressBar` — barra de progreso EVIAR

#### Componentes Exploration
- [ ] Crear `components/exploration/ExplorationCard` — tarjeta del dashboard
- [ ] Crear `components/exploration/FrictionCard` — tarjeta seleccionable con título, descripción, impacto
- [ ] Crear `components/exploration/OpportunitySuggestionCard` — tipo de oportunidad + explicación
- [ ] Crear `components/exploration/AutomationModuleCard` — módulo con selector de estado (mvp/opcional/fase2/no aplica)
- [ ] Crear `components/exploration/ROIScenarioCard` — escenario con todos los indicadores

#### Componentes Workspace
- [ ] Crear `components/workspace/ClientStoryBlock` — formulario historia cliente + generación narrativa
- [ ] Crear `components/workspace/OperationCurrentStateBlock` — formulario operación con rangos
- [ ] Crear `components/workspace/ROIInputPanel` — formulario datos ROI + DataBadge por campo
- [ ] Crear `components/workspace/ExecutiveSummaryEditor` — textarea editable + generación automática
- [ ] Crear `components/workspace/LiveInsightPanel` — panel de insight reactivo

#### Páginas
- [ ] Crear `pages/DashboardPage` — listado + filtros + estado vacío + botón nueva exploración
- [ ] Crear `pages/NewExplorationPage` — wizard: nombre cliente, sector, selección plantilla
- [ ] Crear `pages/EviarIntroPage` — introducción metodología EVIAR con pasos y botón iniciar
- [ ] Crear `pages/ExplorationWorkspacePage` — layout: EviarSidebar + contenido central (EVIAR steps) + LiveInsightPanel
- [ ] Crear `pages/SessionPreparationPage` — preparación de sesión por tipo
- [ ] Crear `pages/AcademyPage` — Academia ROI navegable por secciones
- [ ] Crear `pages/KnowledgeBasePage` — base de conocimiento + formulario de sugerencia
- [ ] Crear `pages/PresentationModePage` — vista limpia sin notas/historial/alertas privadas
- [ ] Crear `components/exploration/InsumoCard` — tarjeta de insumo con nombre, categoría, precio y badge de confianza
- [ ] Crear `components/workspace/InsumosList` — lista + formulario de agregar insumo + sugerencia de ticket
- [ ] Añadir sección "Insumos" al workspace (paso previo o paralelo a operación actual)

#### Tests Frontend — Unitarios
- [ ] `ExplorationCard renders client name and status`
- [ ] `FrictionCard toggles selection on click`
- [ ] `OpportunitySuggestionCard shows commercial when attendace < 80%`
- [ ] `ROIScenarioCard displays all indicators correctly`
- [ ] `QualityWarning renders all warning messages`
- [ ] `LearnerHint visible in learner mode, hidden in expert mode`
- [ ] `DataBadge shows correct label for confirmed/assumption/pending`
- [ ] `ROIInputPanel shows warning when grossMargin is empty and user submits`
- [ ] `useExploration loads exploration from localStorage on mount`
- [ ] `useExploration autosaves on data change`
- [ ] `useROI returns null payback when totalBenefit is zero`
- [ ] `useAppMode toggles presentation mode correctly`
- [ ] `useKnowledge createSuggestion sets status to pending_review`

#### Tests Frontend — Integración
- [ ] `NewExplorationPage creates exploration and redirects to workspace`
- [ ] `ExplorationWorkspacePage renders FrictionCards from Agroinsumos template`
- [ ] `ExplorationWorkspacePage suggests mixed opportunity on seguimiento+cotizacion+trazabilidad`
- [ ] `ExplorationWorkspacePage calculates ROI and shows 3 scenarios`
- [ ] `PresentationModePage does not render internal notes in DOM`
- [ ] `KnowledgeBasePage shows suggestion form and submits to pending_review`
- [ ] `DashboardPage renders empty state when no explorations exist`
- [ ] `DashboardPage renders list of explorations from localStorage`
- [ ] `InsumosList suggests ticket promedio from insumo avgPrice`
- [ ] `InsumoCard shows confidence badge correctly`
- [ ] `useInsumos createInsumo adds to exploration and marks as assumption`
- [ ] `Agroinsumos template preloads typical insumos marked as assumption`

---

### QA

- [ ] Ejecutar skill `/gherkin-case-generator` → cubrir CRITERIO-1.1 al CRITERIO-10.1
- [ ] Ejecutar skill `/risk-identifier` → clasificar riesgos ASD
- [ ] Ejecutar prueba E2E Playwright: flujo completo Dashboard → Nueva exploración Agroinsumos → EVIAR intro → Workspace (historia + operación + fricciones) → ROI → Presentación (DoD-025)
- [ ] Validar caso de regresión Fertilizantes Mix escenario medio pasa (DoD-027)
- [ ] Validar que modo presentación no expone notas internas en DOM (DoD-019)
- [ ] Validar que dashboard con 100 exploraciones mock no degrada performance (DoD-024 proxy)
- [ ] Validar UX manual: la UI no parece Excel, usa tarjetas y bloques narrativos (DoD-024)
- [ ] Revisar cobertura: Motor ROI ≥ 90%, Validaciones ≥ 90%, Reglas oportunidad ≥ 80%, Componentes críticos ≥ 70%
- [ ] Actualizar estado spec: `status: IMPLEMENTED`

---

## GAPS PENDIENTES (heredados del requerimiento)

> Resolver antes de marcar `status: APPROVED`. Los marcados ⚠️ son bloqueantes para implementación.

| ID | Gap | Bloquea |
|----|-----|---------|
| GAPS-003 | Stack: ¿Tailwind CSS aprobado o CSS Modules? | ✅ RESUELTO — Tailwind CSS aprobado |
| GAPS-004 | ¿Habrá backend en MVP? | ✅ RESUELTO — No (frontend-first localStorage) |
| GAPS-006 | ¿Autenticación en MVP? | ✅ RESUELTO — No en MVP |
| GAPS-007 | ¿Sistema de roles? (curador) | ✅ RESUELTO — No en MVP |
| GAPS-025 | Umbrales calidad de datos | ✅ RESUELTO — low<40%, medium 40-75%, high>75% |
| GAPS-026 | Umbral beneficio total vs ventas | ✅ RESUELTO — alerta si totalBenefit > 5× avgMonthlySales |
| GAPS-027 | Factores escenarios | ✅ RESUELTO — fijos 0.8×/1.0×/1.2×, display default: optimista |
| GAPS-008 | ¿Branding oficial Collab? | Pendiente — usar palette neutral premium para MVP |
| GAPS-009 | ¿Exportación PDF obligatoria? | Pendiente — dejar TODO documentado en componentes |
| GAPS-013 | ¿Nombre final "Academia ROI"? | Pendiente — usar como default |
| GAPS-014 | ¿Nombre final "EVIAR"? | Pendiente — usar como default |
