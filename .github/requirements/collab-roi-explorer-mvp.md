# Prompt de Desarrollo — Collab ROI Explorer

## 0. Metadatos

**Feature:** `collab-roi-explorer-mvp`

**Referencia:** Pendiente por asignar en JIRA / Linear / GitHub Issues.

**Repos / módulos involucrados:**
Pendiente por confirmar.
Si no existe repositorio definido, crear estructura inicial para una aplicación web MVP frontend-first, dejando preparada la separación futura de backend.

**Modo de trabajo esperado:**
Planear primero, implementar después.
Antes de escribir código, el agente debe:

1. Revisar este Prompt de Desarrollo completo.
2. Proponer arquitectura de carpetas.
3. Identificar componentes reutilizables existentes si el proyecto ya tiene base.
4. Confirmar plan de implementación por fases.
5. Solo después iniciar desarrollo.

**Cadencia esperada:**
Avance continuo con checkpoint por subtarea terminada.
Cada checkpoint debe indicar:

* Qué se completó.
* Qué archivos se tocaron.
* Qué pruebas se ejecutaron.
* Qué queda pendiente.
* Riesgos detectados.

**Política de compilación / validación:**

El feature no se considera completo si no se puede:

* Ejecutar la aplicación localmente.
* Navegar el flujo principal.
* Ejecutar pruebas unitarias del motor ROI.
* Ejecutar al menos una prueba E2E del flujo principal.
* Validar visualmente que la UI no parece Excel ni sistema administrativo antiguo.

---

## 1. Objetivo y Definición de Hecho 100%

### Objetivo de negocio

Construir un MVP llamado **Collab ROI Explorer**.

No es una calculadora simple de ROI.

Es una aplicación web premium, narrativa, pedagógica y profesional, diseñada para que el equipo Collab pueda:

* Preparar sesiones comerciales.
* Explorar nuevos clientes.
* Entender su operación.
* Identificar fricciones comerciales u operativas.
* Sugerir oportunidades de automatización con IA.
* Estimar ROI de forma prudente.
* Enseñar al equipo conceptos básicos de ROI, ventas y exploración.
* Generar una historia ejecutiva clara para presentar al cliente.
* Refinar la metodología con aprendizajes internos validados.

La app debe ayudar a que un equipo no experto en ROI, ventas o finanzas pueda conducir mejores conversaciones comerciales y generar confianza con los clientes.

### Objetivo funcional

Construir una aplicación web con estas áreas principales:

1. Dashboard de exploraciones.
2. Nueva exploración.
3. Preparación guiada de sesión.
4. Workspace de exploración basado en metodología EVIAR.
5. Motor ROI con escenarios.
6. Academia ROI / Guía de Exploración.
7. Base de conocimiento editable.
8. Modo aprendiz / modo experto.
9. Modo presentación.
10. QA automatizado mínimo.

### Definition of Done medible

El feature está al 100% cuando se cumpla todo lo siguiente:

| ID      | Criterio                                                                               | Evidencia requerida                                   |
| ------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| DoD-001 | Existe dashboard de exploraciones                                                      | Captura o test E2E mostrando listado de exploraciones |
| DoD-002 | Se puede crear una nueva exploración                                                   | Test E2E desde dashboard hasta creación               |
| DoD-003 | Se puede seleccionar plantilla `Agroinsumos`                                           | Test funcional o E2E validando precarga               |
| DoD-004 | Existe introducción al método EVIAR                                                    | Captura o test de renderizado                         |
| DoD-005 | Existe preparación guiada de sesión                                                    | Captura y validación funcional                        |
| DoD-006 | La exploración permite capturar historia del cliente                                   | Test de formulario y generación narrativa             |
| DoD-007 | La exploración permite seleccionar fricciones con tarjetas                             | Test de interacción                                   |
| DoD-008 | La app sugiere tipo de oportunidad: comercial, operativa o mixta                       | Test unitario de regla de negocio                     |
| DoD-009 | La app sugiere módulos según fricciones                                                | Test unitario o funcional                             |
| DoD-010 | El motor ROI calcula ahorro operativo                                                  | Test unitario                                         |
| DoD-011 | El motor ROI calcula beneficio comercial usando margen                                 | Test unitario                                         |
| DoD-012 | El motor ROI no usa ventas brutas como beneficio                                       | Test unitario de validación                           |
| DoD-013 | Se calculan escenarios conservador, medio y optimista                                  | Test unitario y captura                               |
| DoD-014 | Se muestran alertas para datos exagerados o incompletos                                | Test unitario y funcional                             |
| DoD-015 | Existe Academia ROI visible en navegación                                              | Captura o test                                        |
| DoD-016 | Academia ROI explica propósito de la app, ROI, EVIAR, preguntas, errores y frases      | Revisión de contenido                                 |
| DoD-017 | Existe modo aprendiz con ayudas pedagógicas                                            | Test funcional                                        |
| DoD-018 | Existe modo experto con menos ayudas                                                   | Test funcional                                        |
| DoD-019 | Existe modo presentación limpio                                                        | Captura y test de ocultamiento de datos internos      |
| DoD-020 | Existe Base de Conocimiento editable                                                   | Test funcional mínimo                                 |
| DoD-021 | Los usuarios pueden sugerir mejoras a la base de conocimiento                          | Test funcional                                        |
| DoD-022 | Las sugerencias quedan pendientes de revisión, no modifican plantillas automáticamente | Test funcional                                        |
| DoD-023 | Existe resumen ejecutivo editable                                                      | Test funcional                                        |
| DoD-024 | La UI no parece Excel                                                                  | Validación UX manual documentada                      |
| DoD-025 | El flujo completo tiene al menos una prueba E2E                                        | Playwright o herramienta equivalente                  |
| DoD-026 | El motor ROI tiene pruebas unitarias                                                   | Resultado de test                                     |
| DoD-027 | El caso de regresión Fertilizantes Mix escenario medio pasa                            | Test de regresión                                     |
| DoD-028 | README actualizado con instalación, ejecución y pruebas                                | Archivo README                                        |
| DoD-029 | Arquitectura documentada brevemente                                                    | Documento o sección README                            |
| DoD-030 | GAPS pendientes documentados                                                           | Sección `GAPS / PENDIENTES` actualizada               |

---

## 2. Refinamiento — Preguntas abiertas y Asunciones

### PREGUNTAS BLOQUEANTES

1. ¿Cuál es el repositorio final donde se implementará el MVP?
2. ¿Existe ya una aplicación base o se debe crear desde cero?
3. ¿Cuál será el stack obligatorio del proyecto?
4. ¿Habrá backend desde el MVP o persistencia local/mock?
5. ¿Se requiere autenticación en el MVP?
6. ¿Quiénes serán los roles reales del sistema?
7. ¿El MVP debe soportar multiusuario desde la primera versión?
8. ¿Qué sistema de diseño o librería UI debe usarse si ya existe una definida?
9. ¿La exportación PDF es obligatoria para el MVP o puede quedar para fase posterior?
10. ¿La base de conocimiento debe persistir en base de datos real o en mock/local storage durante el MVP?
11. ¿La app debe funcionar en ambiente web público, intranet o local?
12. ¿Existe branding oficial de Collab para colores, logo y tipografía?

### PREGUNTAS NO BLOQUEANTES

1. ¿El cliente verá la app en vivo o solo el modo presentación?
2. ¿Qué nombre final tendrá el módulo educativo: `Academia ROI`, `Guía de Exploración` u otro?
3. ¿Qué nombre final tendrá la metodología EVIAR?
4. ¿Se manejarán monedas distintas a COP en el MVP?
5. ¿Qué otros sectores deben tener plantilla después de Agroinsumos?
6. ¿Se desea historial completo de cambios en la primera versión o solo registro básico?
7. ¿Se desea modo oscuro en el MVP?
8. ¿El resumen ejecutivo debe exportar Markdown?
9. ¿El resumen ejecutivo debe exportar PDF?
10. ¿Se requiere integración futura con CRM?

### ASUNCIONES

| ID     | Asunción                                                           | Default aplicado                                            | Cómo confirmarla                       |
| ------ | ------------------------------------------------------------------ | ----------------------------------------------------------- | -------------------------------------- |
| AS-001 | El MVP será frontend-first                                         | React + TypeScript + persistencia local/mock                | Confirmar con líder técnico            |
| AS-002 | No habrá investigación automática externa                          | Solo información ingresada por Collab y plantillas internas | Confirmar con producto                 |
| AS-003 | La app será usada internamente y en modo presentación con clientes | Edición interna + presentación limpia                       | Validar con equipo comercial           |
| AS-004 | El primer sector funcional será Agroinsumos                        | Plantilla Fertilizantes Mix                                 | Confirmar prioridad                    |
| AS-005 | El ROI se calcula mensual                                          | Mostrar mensual como base                                   | Confirmar si también se requiere anual |
| AS-006 | La app trabajará con supuestos y datos pendientes                  | Clasificación: confirmado / supuesto / pendiente            | Validar UX                             |
| AS-007 | Cualquier miembro puede sugerir mejoras, pero solo curador aprueba | Flujo de sugerencias pendientes                             | Confirmar roles                        |
| AS-008 | La UI debe priorizar laptop y tablet                               | Responsive en desktop/tablet                                | Validar dispositivos objetivo          |

---

## 3. Reglas de negocio

1. La app no debe ser una calculadora simple de ROI.
2. La app debe funcionar como herramienta pedagógica, narrativa y comercial.
3. La app debe guiar al equipo mediante metodología EVIAR.
4. EVIAR significa: Entender, Ver fricciones, Identificar oportunidades, Automatizar con criterio y Retorno estimado.
5. La app no debe investigar automáticamente en internet.
6. La app no debe afirmar información externa del cliente o sector como verdad.
7. Toda información debe venir del usuario, de plantillas internas o quedar marcada como supuesto pendiente por validar.
8. La app debe diferenciar entre dato confirmado, supuesto y pendiente por validar.
9. La app debe permitir preparar sesiones comerciales antes de hablar con el cliente.
10. La preparación de sesión debe incluir objetivo, preguntas sugeridas, datos pendientes, supuestos y checklist.
11. La app debe enseñar al equipo por qué es necesario hablar de ROI.
12. La app debe explicar que ROI no es una promesa de ventas.
13. La app debe explicar que ROI es una estimación para entender si el valor generado puede superar la inversión.
14. La app debe explicar para qué existe Collab ROI Explorer.
15. La app debe explicar que no reemplaza criterio humano.
16. La app debe explicar que no inventa datos.
17. La app debe explicar que no garantiza ventas.
18. La app debe permitir modo aprendiz.
19. La app debe permitir modo experto.
20. En modo aprendiz, la app debe mostrar ayudas pedagógicas adicionales.
21. En modo experto, la app debe reducir ayudas y permitir flujo más rápido.
22. La app debe tener una Academia ROI o Guía de Exploración visible en el menú.
23. Academia ROI debe explicar qué es ROI.
24. Academia ROI debe explicar por qué importa.
25. Academia ROI debe explicar cómo hablar con clientes.
26. Academia ROI debe explicar el método EVIAR.
27. Academia ROI debe incluir conceptos básicos: ROI, payback, ticket promedio, margen, tasa de cierre, escenario conservador, escenario medio y escenario optimista.
28. Academia ROI debe incluir preguntas recomendadas por etapa.
29. Academia ROI debe incluir errores comunes.
30. Academia ROI debe incluir frases listas para usar.
31. Academia ROI debe incluir casos de práctica.
32. La app debe permitir crear exploraciones para nuevos clientes.
33. La app debe permitir seleccionar plantillas por sector.
34. La primera plantilla base debe ser Agroinsumos / Fertilizantes Mix.
35. La app debe precargar fricciones comunes según plantilla.
36. La app debe precargar módulos sugeridos según plantilla.
37. La app debe precargar supuestos iniciales según plantilla.
38. La app debe permitir capturar historia del cliente.
39. La app debe generar una narrativa editable a partir de la información capturada.
40. La app debe capturar operación actual con rangos.
41. La app debe permitir conversaciones mensuales mínimas, probables y máximas.
42. La app debe permitir capturar atención actual.
43. La app debe permitir capturar personas involucradas.
44. La app debe permitir capturar ventas mensuales mínimas y máximas.
45. La app debe permitir capturar tiempo promedio por conversación.
46. Las fricciones deben seleccionarse mediante tarjetas, no checkboxes simples.
47. Cada fricción debe tener título, descripción breve, impacto y automatización relacionada.
48. La app debe sugerir oportunidad comercial si atención actual es menor a 80%.
49. La app debe sugerir oportunidad operativa si atención actual es mayor o igual a 90% y existen tareas repetitivas.
50. La app debe sugerir oportunidad mixta si hay fricciones de seguimiento, cotización, trazabilidad o conversión.
51. La app debe explicar en lenguaje simple por qué sugiere el tipo de oportunidad.
52. La app debe sugerir módulos de automatización según fricciones.
53. Cada módulo debe poder marcarse como incluido en MVP, opcional, fase 2 o no aplica.
54. La app debe explicar por qué sugiere cada módulo.
55. El ROI debe calcularse con beneficio estimado, no con ventas brutas.
56. El beneficio comercial debe calcularse con margen.
57. Si falta margen, la app no debe calcular beneficio comercial definitivo.
58. La app debe mostrar alerta si se intenta calcular ROI con ventas brutas.
59. El motor ROI debe separar ahorro operativo y beneficio comercial.
60. El motor ROI debe calcular beneficio total.
61. El motor ROI debe calcular ROI financiero.
62. El motor ROI debe calcular multiplicador.
63. El motor ROI debe calcular payback.
64. Si el beneficio total es cero, payback debe ser infinito o no disponible.
65. La app debe calcular escenarios conservador, medio y optimista.
66. Antes de mostrar números, la app debe explicar narrativamente qué se está midiendo.
67. La app debe mostrar primero narrativa y luego indicadores.
68. La app debe alertar si ROI financiero supera 1000%.
69. La app debe alertar si margen supera 80%.
70. La app debe alertar si tasa de cierre esperada supera 50%.
71. La app debe alertar si tasa de cierre esperada es menor que tasa de cierre actual.
72. La app debe alertar si beneficio total supera demasiado las ventas actuales.
73. La app debe alertar si faltan datos críticos.
74. La app debe generar resumen ejecutivo editable.
75. El resumen ejecutivo debe incluir contexto, fricciones, oportunidad, automatización sugerida, valor estimado, nivel de confianza y siguiente paso.
76. La app debe tener modo presentación.
77. Modo presentación debe ocultar notas internas.
78. Modo presentación debe ocultar campos técnicos.
79. Modo presentación debe ocultar historial.
80. Modo presentación debe ocultar alertas privadas.
81. Modo presentación debe mostrar contexto, fricciones, oportunidad, automatización sugerida, valor estimado, ROI explicado y siguiente paso.
82. La app debe tener base de conocimiento editable.
83. Base de conocimiento debe permitir definir sectores.
84. Base de conocimiento debe permitir definir fricciones frecuentes.
85. Base de conocimiento debe permitir definir preguntas sugeridas.
86. Base de conocimiento debe permitir definir módulos recomendados.
87. Base de conocimiento debe permitir definir supuestos iniciales.
88. Base de conocimiento debe permitir definir frases recomendadas.
89. Base de conocimiento debe permitir definir errores comunes.
90. Base de conocimiento debe permitir definir casos de práctica.
91. Cualquier miembro puede sugerir mejoras si se confirma la asunción AS-007.
92. Las sugerencias no deben alterar automáticamente la plantilla oficial.
93. Las sugerencias deben quedar pendientes de revisión.
94. Un curador debe aprobar mejoras antes de incorporarlas.
95. La app debe registrar versionamiento al modificar plantillas.
96. El versionamiento debe registrar quién modificó, qué modificó, fecha, versión anterior, versión nueva y comentario del cambio.
97. Cada pregunta, frase o fricción debe poder indicar origen: plantilla base, caso real, sugerencia aprobada o creado por curador.
98. La app debe tener UI premium.
99. La UI no debe parecer Excel.
100. La UI no debe parecer sistema administrativo antiguo.
101. La UI debe usar tarjetas, bloques narrativos, ayudas contextuales y feedback inmediato.
102. La UI debe ser clara para personas no técnicas.
103. La UI debe ser presentable ante clientes.
104. La app debe sentirse como producto profesional, no como maqueta.
105. Se debe priorizar claridad, confianza, orden, simplicidad, profesionalismo y aprendizaje.

---

## 4. Diseño técnico esperado

### Stack sugerido

Si no existe stack obligatorio, usar:

* React.
* TypeScript.
* Vite.
* Tailwind CSS.
* shadcn/ui.
* Framer Motion.
* React Hook Form.
* Zod.
* Zustand.
* Recharts.
* Lucide Icons.
* Vitest.
* React Testing Library.
* Playwright.

Si el proyecto ya tiene stack definido, reutilizarlo y documentar diferencias.

### Arquitectura sugerida

```text
src/
  app/
    routes/
    layout/
  components/
    ui/
    shared/
  domain/
    roi/
      roi-engine.ts
      roi-types.ts
      roi-validations.ts
      roi-scenarios.ts
      roi-regression.fixtures.ts
    methodology/
      eviar.ts
    knowledge-base/
      knowledge-types.ts
  features/
    dashboard/
    explorations/
    preparation/
    academy/
    knowledge-base/
    presentation/
  data/
    templates/
      agroinsumos.template.ts
      academy-content.ts
      practice-cases.ts
  tests/
    unit/
    integration/
    e2e/
```

### Modelos de datos

```typescript
type ExplorationStatus =
  | "draft"
  | "in_progress"
  | "incomplete_data"
  | "roi_calculated"
  | "summary_generated"
  | "proposal_sent"
  | "closed_won"
  | "closed_lost"
  | "discarded";

type OpportunityType = "commercial" | "operational" | "mixed";

type DataConfidence = "confirmed" | "assumption" | "pending";

type Exploration = {
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
  dataQuality?: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  sessionPreparations: SessionPreparation[];
  operation: OperationData;
  frictionIds: string[];
  recommendedModules: RecommendedModule[];
  roiInputs: ROIInputs;
  roiResults?: ROIScenarioResults;
  executiveSummary?: string;
  notes?: InternalNote[];
};

type SessionPreparation = {
  id: string;
  sessionType: "first_meeting" | "follow_up" | "data_validation" | "proposal_presentation";
  objective: string;
  questions: string[];
  pendingData: string[];
  assumptions: string[];
  checklist: string[];
  createdAt: string;
};

type OperationData = {
  monthlyConversationsMin?: number;
  monthlyConversationsLikely?: number;
  monthlyConversationsMax?: number;
  currentAttentionRate?: number;
  teamSize?: number;
  monthlySalesMin?: number;
  monthlySalesMax?: number;
  minutesPerConversation?: number;
  averageClosingTimeDays?: number;
};

type ROIInputs = {
  averageTicket?: number;
  grossMargin?: number;
  currentCloseRate?: number;
  expectedCloseRate?: number;
  monthlyInvestment?: number;
  hourlyCost?: number;
  automationPercentage?: number;
};

type ROIResult = {
  monthlyHours: number;
  savedHours: number;
  operationalSavings: number;
  closeRateImprovement: number;
  additionalSales: number;
  commercialBenefit: number;
  totalBenefit: number;
  financialROI: number;
  multiplier: number;
  paybackMonths: number | null;
  warnings: string[];
  confidence: "low" | "medium" | "high";
};

type ROIScenarioResults = {
  conservative: ROIResult;
  medium: ROIResult;
  optimistic: ROIResult;
};

type Friction = {
  id: string;
  title: string;
  description: string;
  impactType: OpportunityType;
  relatedModuleIds: string[];
  origin: "base_template" | "real_case" | "approved_suggestion" | "curator_created";
};

type RecommendedModule = {
  id: string;
  name: string;
  description: string;
  status: "included_mvp" | "optional" | "phase_2" | "not_applicable";
  relatedFrictionIds: string[];
  explanation: string;
};

type KnowledgeSuggestion = {
  id: string;
  type: "friction" | "question" | "module" | "phrase" | "assumption" | "practice_case";
  content: string;
  sourceExplorationId?: string;
  status: "pending_review" | "approved" | "rejected";
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  reviewedAt?: string;
};
```

### Fórmulas del motor ROI

```typescript
monthlyHours = monthlyConversations * minutesPerConversation / 60;

savedHours = monthlyHours * automationPercentage;

operationalSavings = savedHours * hourlyCost;

closeRateImprovement = expectedCloseRate - currentCloseRate;

additionalSales = monthlyConversations * closeRateImprovement * averageTicket;

commercialBenefit = additionalSales * grossMargin;

totalBenefit = operationalSavings + commercialBenefit;

financialROI = ((totalBenefit - monthlyInvestment) / monthlyInvestment) * 100;

multiplier = totalBenefit / monthlyInvestment;

paybackMonths = monthlyInvestment / totalBenefit;
```

Si `totalBenefit === 0`, `paybackMonths` debe ser `null`.

### Componentes frontend esperados

| Componente                   | Propósito                                 |
| ---------------------------- | ----------------------------------------- |
| `ExplorationDashboard`       | Listar exploraciones                      |
| `NewExplorationFlow`         | Crear exploración y seleccionar plantilla |
| `EviarIntro`                 | Explicar método EVIAR                     |
| `SessionPreparationPanel`    | Preparar sesión                           |
| `ExplorationWorkspace`       | Contenedor principal                      |
| `EviarSidebar`               | Progreso por metodología                  |
| `LiveInsightPanel`           | Insight vivo                              |
| `ClientStoryBlock`           | Historia del cliente                      |
| `OperationCurrentStateBlock` | Operación actual                          |
| `FrictionCard`               | Tarjeta de fricción                       |
| `OpportunitySuggestionCard`  | Tipo de oportunidad                       |
| `AutomationModuleCard`       | Módulo sugerido                           |
| `ROIInputPanel`              | Captura de datos ROI                      |
| `ROIScenarioCard`            | Escenarios ROI                            |
| `ExecutiveSummaryEditor`     | Resumen editable                          |
| `AcademyHome`                | Academia ROI                              |
| `KnowledgeBaseManager`       | Base de conocimiento                      |
| `PresentationMode`           | Vista limpia para cliente                 |
| `LearnerHint`                | Ayudas modo aprendiz                      |
| `QualityWarning`             | Alertas de calidad                        |

### Contratos / APIs

Para MVP frontend-first, no se requiere API real.
Si se implementa backend, usar contratos REST equivalentes:

| Método | Ruta                                      | Propósito                      |
| ------ | ----------------------------------------- | ------------------------------ |
| GET    | `/explorations`                           | Listar exploraciones           |
| POST   | `/explorations`                           | Crear exploración              |
| GET    | `/explorations/{id}`                      | Consultar exploración          |
| PUT    | `/explorations/{id}`                      | Actualizar exploración         |
| POST   | `/explorations/{id}/calculate-roi`        | Calcular ROI                   |
| POST   | `/explorations/{id}/summary`              | Generar resumen                |
| GET    | `/knowledge-base`                         | Consultar base de conocimiento |
| POST   | `/knowledge-base/suggestions`             | Crear sugerencia               |
| PUT    | `/knowledge-base/suggestions/{id}/review` | Aprobar o rechazar sugerencia  |

### Tabla cerrada: qué se crea / qué se reutiliza / qué NO aplica

| Elemento              | Acción                     | Regla reuse-first                                  |
| --------------------- | -------------------------- | -------------------------------------------------- |
| App web               | Crear o extender existente | Si ya existe app React, extender                   |
| Componentes UI base   | Reutilizar antes de crear  | Revisar si existe sistema UI                       |
| Motor ROI             | Crear nuevo módulo aislado | No mezclar con UI                                  |
| Academia ROI          | Crear feature nuevo        | Reusar layout y componentes existentes             |
| Base de conocimiento  | Crear MVP simple           | Si hay CMS interno, evaluar reuso                  |
| Backend               | No obligatorio en MVP      | Solo crear si proyecto lo exige                    |
| Investigación externa | NO aplica                  | No implementar búsqueda web                        |
| Integración WhatsApp  | NO aplica                  | Fuera del MVP                                      |
| CRM completo          | NO aplica                  | Fuera del MVP                                      |
| Exportación PDF       | Condicional                | Si stack lo permite; si no, dejar TODO documentado |
| Autenticación         | Pendiente                  | Depende de pregunta bloqueante                     |

---

## 5. Plan por fases mapeado a la orquestación ASDD

### Fase 1 — Spec

#### Subtarea 1.1 — Revisar insumos y GAPS

**Entrada:** Prompt de Desarrollo.
**Salida:** Spec inicial con alcance, GAPS y asunciones.
**Completo cuando:** Toda pregunta bloqueante esté identificada y no se haya inventado información.

#### Subtarea 1.2 — Definir arquitectura

**Entrada:** Stack confirmado o asumido.
**Salida:** Árbol de carpetas y responsabilidades por capa.
**Completo cuando:** Se separe dominio ROI, features UI, data templates y tests.

#### Subtarea 1.3 — Definir modelo funcional

**Entrada:** Reglas de negocio.
**Salida:** Modelos de datos, estados y flujos.
**Completo cuando:** Exploración, preparación, academia, base de conocimiento y ROI estén modelados.

#### Subtarea 1.4 — Definir criterios QA

**Entrada:** Definition of Done.
**Salida:** Matriz de pruebas.
**Completo cuando:** Cada DoD tenga evidencia asociada.

---

### Fase 2 — Implementación

#### Backend ∥ Frontend ∥ DB

##### Frontend 2.1 — Setup base

**Entrada:** Stack definido.
**Salida:** App ejecutable con rutas base.
**Completo cuando:** Dashboard, navegación y layout cargan.

##### Frontend 2.2 — Dashboard de exploraciones

**Entrada:** Mock data.
**Salida:** Listado de exploraciones con estados.
**Completo cuando:** Se pueda iniciar nueva exploración.

##### Frontend 2.3 — Nueva exploración y plantilla Agroinsumos

**Entrada:** Plantilla Fertilizantes Mix.
**Salida:** Creación de exploración con datos precargados.
**Completo cuando:** Agroinsumos cargue fricciones, módulos y supuestos.

##### Frontend 2.4 — Introducción EVIAR

**Entrada:** Contenido pedagógico.
**Salida:** Pantalla introductoria.
**Completo cuando:** Usuario puede iniciar workspace.

##### Frontend 2.5 — Workspace de exploración

**Entrada:** Modelo Exploration.
**Salida:** Layout con sidebar, centro y panel insight.
**Completo cuando:** Se pueda capturar historia, operación y fricciones.

##### Frontend 2.6 — Preparación de sesión

**Entrada:** Modelo SessionPreparation.
**Salida:** Pantalla/bloque de preparación.
**Completo cuando:** Se puedan registrar objetivo, preguntas, pendientes, supuestos y checklist.

##### Frontend 2.7 — Automatización sugerida

**Entrada:** Fricciones seleccionadas.
**Salida:** Módulos sugeridos.
**Completo cuando:** Cada módulo explique por qué se sugiere.

##### Frontend 2.8 — ROI UI

**Entrada:** Motor ROI.
**Salida:** Captura de datos y escenarios.
**Completo cuando:** Se muestren escenarios conservador, medio y optimista.

##### Frontend 2.9 — Academia ROI

**Entrada:** Contenido educativo.
**Salida:** Sección navegable.
**Completo cuando:** Incluya propósito, ROI, EVIAR, preguntas, errores, frases y casos.

##### Frontend 2.10 — Base de conocimiento

**Entrada:** Modelo KnowledgeSuggestion.
**Salida:** Gestión mínima de contenido y sugerencias.
**Completo cuando:** Se pueda crear sugerencia pendiente de revisión.

##### Frontend 2.11 — Modo presentación

**Entrada:** Exploración con diagnóstico.
**Salida:** Vista limpia para cliente.
**Completo cuando:** No muestre notas internas ni campos técnicos.

##### Domain 2.12 — Motor ROI

**Entrada:** Fórmulas.
**Salida:** Módulo testeable.
**Completo cuando:** Funciones estén desacopladas de UI.

##### DB 2.13 — Persistencia

**Entrada:** Decisión de backend/local.
**Salida:** Persistencia mock/local o real.
**Completo cuando:** Se pueda guardar y continuar exploración.

---

### Fase 3 — Tests

#### Backend ∥ Frontend

##### Test 3.1 — Unit tests ROI

**Entrada:** `roi-engine.ts`.
**Salida:** Pruebas unitarias.
**Completo cuando:** Cubran fórmulas, warnings y caso Fertilizantes Mix.

##### Test 3.2 — Unit tests reglas de oportunidad

**Entrada:** reglas de oportunidad.
**Salida:** Pruebas para comercial, operativa, mixta.
**Completo cuando:** Reglas pasen con datos controlados.

##### Test 3.3 — Integration tests UI

**Entrada:** componentes principales.
**Salida:** Pruebas de render e interacción.
**Completo cuando:** Crear exploración, seleccionar fricciones y calcular ROI funcionen.

##### Test 3.4 — E2E

**Entrada:** App ejecutable.
**Salida:** Flujo completo Playwright.
**Completo cuando:** Dashboard → nueva exploración → Agroinsumos → fricciones → ROI → presentación pase.

---

### Fase 4 — QA

#### QA 4.1 — Gherkin

**Entrada:** Criterios aceptación.
**Salida:** Escenarios Gherkin.
**Completo cuando:** Happy path, error y borde estén cubiertos.

#### QA 4.2 — UX manual

**Entrada:** App visual.
**Salida:** Checklist UX.
**Completo cuando:** Se confirme que no parece Excel y se entiende por usuario no experto.

#### QA 4.3 — Riesgos y performance

**Entrada:** Matriz riesgos.
**Salida:** Validación de carga mínima.
**Completo cuando:** Dashboard con 100 exploraciones mock siga siendo usable.

---

### Fase 5 — Cierre

#### Cierre 5.1 — Evidencias

**Entrada:** Tests y capturas.
**Salida:** Evidencias de DoD.
**Completo cuando:** Cada DoD tenga evidencia.

#### Cierre 5.2 — README

**Entrada:** Arquitectura y comandos.
**Salida:** README actualizado.
**Completo cuando:** Incluya instalación, ejecución y pruebas.

#### Cierre 5.3 — Feedback

**Entrada:** Demo interna.
**Salida:** Lista de mejoras.
**Completo cuando:** Feedback quede documentado como backlog, no como cambios ocultos.

---

## 6. Requisitos no funcionales

| Atributo       | Requisito concreto                                                                 | Cómo se valida                   |
| -------------- | ---------------------------------------------------------------------------------- | -------------------------------- |
| Seguridad      | Validar entradas numéricas con límites: porcentajes 0-100, valores monetarios >= 0 | Tests Zod / unitarios            |
| Seguridad      | No almacenar secretos en frontend                                                  | Revisión de código               |
| Seguridad      | Si hay auth, proteger rutas de base de conocimiento y curaduría                    | Test de autorización             |
| Seguridad      | No exponer notas internas en modo presentación                                     | Test funcional                   |
| Seguridad      | No implementar investigación externa ni scraping                                   | Revisión de alcance              |
| Disponibilidad | Si falta un dato, la app no debe romper flujo; debe marcarlo como pendiente        | Test funcional                   |
| Disponibilidad | ROI no debe fallar si beneficio total es cero                                      | Unit test                        |
| Disponibilidad | Manejar estados vacíos en dashboard, academia y base de conocimiento               | Tests UI                         |
| Escalabilidad  | Dashboard debe soportar al menos 100 exploraciones mock sin degradación visible    | QA manual/performance            |
| Escalabilidad  | Si se implementa backend, listar exploraciones con paginación                      | Test API                         |
| Performance    | Cálculo ROI debe ser inmediato en cliente                                          | Unit/performance simple          |
| Performance    | Transiciones UI no deben bloquear interacción                                      | QA manual                        |
| Observabilidad | Registrar cambios relevantes en exploraciones                                      | Verificación historial/local log |
| Observabilidad | Registrar warnings generados por ROI                                               | Test funcional                   |
| Observabilidad | Registrar origen de contenido en base de conocimiento                              | Test de datos                    |
| Mantenibilidad | Motor ROI debe estar separado de UI                                                | Revisión arquitectura            |
| Mantenibilidad | Plantillas deben estar en archivos separados                                       | Revisión estructura              |
| Mantenibilidad | Documentar asunciones, GAPS y deuda técnica                                        | README / docs                    |
| Calidad        | Pruebas unitarias del motor ROI obligatorias                                       | Resultado test                   |
| Calidad        | Prueba E2E del flujo principal obligatoria                                         | Resultado Playwright             |
| Calidad        | Componentes deben tener nombres claros y consistentes                              | Revisión código                  |

---

## 7. Estrategia de pruebas

### Escenarios Gherkin

#### Escenario 1 — Crear exploración Agroinsumos

```gherkin
Feature: Crear exploración

Scenario: Crear una exploración desde plantilla Agroinsumos
  Given el usuario está en el dashboard
  When selecciona "Nueva exploración"
  And selecciona la plantilla "Agroinsumos"
  Then el sistema crea una exploración en estado "Borrador"
  And precarga fricciones sugeridas
  And precarga módulos sugeridos
  And muestra introducción al método EVIAR
```

#### Escenario 2 — Seleccionar fricciones

```gherkin
Feature: Ver fricciones

Scenario: Seleccionar fricciones comerciales y operativas
  Given existe una exploración Agroinsumos
  When el usuario selecciona "No hay seguimiento comercial"
  And selecciona "Cotizaciones manuales"
  And selecciona "No hay trazabilidad"
  Then el sistema sugiere oportunidad "Mixta"
  And actualiza el insight vivo
```

#### Escenario 3 — Calcular ROI medio Fertilizantes Mix

```gherkin
Feature: Motor ROI

Scenario: Calcular escenario medio
  Given una exploración con 270 conversaciones mensuales
  And 8 minutos por conversación
  And 60% automatizable
  And costo hora de 15000
  And ticket promedio de 350000
  And margen de 20%
  And tasa actual de 10%
  And tasa esperada de 13%
  And inversión mensual de 700000
  When el usuario calcula ROI
  Then el ahorro operativo debe ser 324000
  And el beneficio comercial debe ser 567000
  And el beneficio total debe ser 891000
  And el ROI financiero debe ser aproximadamente 27.28%
  And el multiplicador debe ser aproximadamente 1.27
  And el payback debe ser aproximadamente 0.78 meses
```

#### Escenario 4 — Datos incompletos

```gherkin
Feature: Datos incompletos

Scenario: Falta margen para calcular beneficio comercial
  Given una exploración con ticket promedio
  And sin margen estimado
  When el usuario intenta calcular beneficio comercial
  Then el sistema no debe calcular ROI definitivo
  And debe mostrar alerta indicando que falta margen
  And debe permitir continuar marcando el dato como pendiente
```

#### Escenario 5 — ROI exagerado

```gherkin
Feature: Validaciones ROI

Scenario: Detectar ROI demasiado alto
  Given una exploración con ticket muy alto
  And mejora de cierre elevada
  When el usuario calcula ROI
  Then el sistema muestra alerta de posible sobreestimación
  And recomienda revisar ticket, margen o tasa esperada
```

#### Escenario 6 — Modo presentación

```gherkin
Feature: Modo presentación

Scenario: Ocultar datos internos
  Given una exploración con resumen ejecutivo
  When el usuario activa modo presentación
  Then no debe ver notas internas
  And no debe ver historial
  And no debe ver alertas privadas
  And debe ver contexto, fricciones, oportunidad, solución y valor estimado
```

#### Escenario 7 — Sugerencia a base de conocimiento

```gherkin
Feature: Base de conocimiento

Scenario: Crear sugerencia desde exploración
  Given el usuario terminó una exploración
  When registra un aprendizaje nuevo
  Then el aprendizaje queda en estado "pendiente de revisión"
  And no modifica la plantilla oficial automáticamente
```

### Matriz de riesgos

| Riesgo                                   | Nivel | Mitigación                                  |
| ---------------------------------------- | ----- | ------------------------------------------- |
| ROI mal calculado                        | Alto  | Motor separado + unit tests + regresión     |
| Usuario interpreta ROI como promesa      | Alto  | Microcopy pedagógico + disclaimers          |
| UI parece Excel                          | Alto  | Validación UX manual + diseño por tarjetas  |
| Datos inventados                         | Alto  | Confirmado/supuesto/pendiente               |
| Sugerencias contaminan base oficial      | Medio | Flujo de revisión por curador               |
| Modo presentación muestra datos internos | Alto  | Test funcional específico                   |
| Falta de datos bloquea flujo             | Medio | Permitir continuar con pendientes           |
| ROI exagerado genera desconfianza        | Alto  | Warnings y calidad de datos                 |
| App se vuelve demasiado compleja         | Medio | Fallback por MVP                            |
| Sin backend no hay persistencia real     | Medio | Documentar asunción y preparar arquitectura |

### Datos de prueba sintéticos

#### Fertilizantes Mix — Medio

```json
{
  "clientName": "Fertilizantes Mix",
  "sector": "Agroinsumos",
  "monthlyConversations": 270,
  "minutesPerConversation": 8,
  "automationPercentage": 0.6,
  "hourlyCost": 15000,
  "currentCloseRate": 0.1,
  "expectedCloseRate": 0.13,
  "averageTicket": 350000,
  "grossMargin": 0.2,
  "monthlyInvestment": 700000
}
```

#### Cliente con datos incompletos

```json
{
  "clientName": "Cliente Datos Pendientes",
  "sector": "Agroinsumos",
  "monthlyConversations": 200,
  "averageTicket": 300000,
  "monthlyInvestment": 700000
}
```

#### ROI exagerado

```json
{
  "clientName": "Inmobiliaria Alto Ticket",
  "sector": "Inmobiliaria",
  "monthlyConversations": 1200,
  "minutesPerConversation": 10,
  "automationPercentage": 0.45,
  "hourlyCost": 15000,
  "currentCloseRate": 0.01,
  "expectedCloseRate": 0.06,
  "averageTicket": 180000000,
  "grossMargin": 0.03,
  "monthlyInvestment": 900000
}
```

### Cobertura mínima esperada

| Área                 | Cobertura esperada  |
| -------------------- | ------------------- |
| Motor ROI            | 90%                 |
| Validaciones ROI     | 90%                 |
| Reglas oportunidad   | 80%                 |
| Componentes críticos | 70%                 |
| E2E flujo principal  | 1 flujo obligatorio |

---

## 8. Riesgos, mitigaciones y fallback

### Riesgos técnicos conocidos

| Riesgo                                           | Mitigación                                                            |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| Alcance demasiado amplio                         | Priorizar dashboard, exploración, ROI, academia básica y presentación |
| Falta backend                                    | Usar mock/local storage con arquitectura migrable                     |
| Fórmulas mezcladas con UI                        | Mantener dominio ROI aislado                                          |
| UI inconsistente                                 | Crear componentes base y tokens visuales                              |
| Datos incompletos                                | Estados `pending` y `assumption`                                      |
| Resultado ROI negativo causa mala interpretación | Explicación pedagógica                                                |
| Resultado ROI alto causa desconfianza            | Warnings y calidad de datos                                           |
| Base conocimiento desordenada                    | Sugerencias pendientes + curaduría                                    |

### Estrategia de fallback si alcance se desborda

#### Entregar sí o sí

1. Dashboard básico.
2. Crear exploración.
3. Plantilla Agroinsumos.
4. Workspace con EVIAR.
5. Selección de fricciones.
6. Motor ROI.
7. Escenario medio + conservador + optimista.
8. Resumen ejecutivo.
9. Academia ROI básica.
10. Modo presentación básico.
11. Tests unitarios ROI.
12. Test E2E principal.

#### Puede quedar como esqueleto con TODO documentado

1. Exportación PDF.
2. Historial avanzado.
3. Roles reales.
4. Backend real.
5. Versionamiento completo de plantillas.
6. Casos de práctica avanzados.
7. Modo oscuro.
8. Multiusuario.
9. Auditoría avanzada.

#### Bloqueante

1. Motor ROI sin pruebas.
2. UI que no permita completar exploración.
3. Modo presentación mostrando notas internas.
4. Cálculo ROI con ventas brutas.
5. App que invente información externa.
6. Falta de separación entre confirmado, supuesto y pendiente.

---

## 9. GAPS / PENDIENTES

1. No se ha definido repositorio final.
2. No se ha definido ticket/JIRA.
3. No se ha confirmado stack obligatorio.
4. No se ha confirmado si habrá backend en MVP.
5. No se ha confirmado mecanismo de persistencia.
6. No se ha confirmado si habrá autenticación.
7. No se ha confirmado sistema de roles.
8. No se ha confirmado branding oficial de Collab.
9. No se ha confirmado si PDF es obligatorio.
10. No se ha confirmado si modo oscuro aplica.
11. No se ha confirmado si se requieren monedas distintas a COP.
12. No se ha confirmado si el cliente verá la app en vivo o solo modo presentación.
13. No se ha confirmado si `Academia ROI` será el nombre final.
14. No se ha confirmado si `EVIAR` será el nombre final de la metodología.
15. No se ha confirmado quién será curador de la base de conocimiento.
16. No se ha confirmado si todos pueden sugerir mejoras.
17. No se ha confirmado si se requiere historial completo desde MVP.
18. No se ha confirmado si habrá exportación Markdown.
19. No se ha confirmado si habrá integración futura con CRM.
20. No se ha confirmado si las pruebas E2E deben ejecutarse en CI.
21. No se han validado fórmulas con financiero experto.
22. No se ha validado flujo con vendedor senior.
23. No se ha validado UX con usuario no experto.
24. No se ha validado caso real con cliente.
25. No se han definido umbrales exactos para calidad de datos baja/media/alta.
26. No se ha definido umbral exacto de "beneficio total supera demasiado las ventas actuales".
27. No se ha definido si los escenarios conservador y optimista usan porcentajes fijos o configurables.
28. No se ha definido si plantillas adicionales deben implementarse en MVP o solo Agroinsumos.
29. No se ha definido si la app debe incluir logo y material visual de Collab.
30. No se ha definido si debe existir onboarding inicial para nuevos usuarios.
