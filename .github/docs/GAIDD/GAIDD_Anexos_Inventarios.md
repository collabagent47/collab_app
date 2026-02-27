# GAIDD — Anexos: Inventarios de Prompts y Archivos de Contexto

---

## Anexo A: Inventario de Prompts

### A.1. Convención de Nomenclatura

Todos los archivos de prompt siguen la convención:

`phase_{número}.{nombre-descriptivo}.prompt.md`

Donde el número identifica la fase de la metodología, y el nombre descriptivo indica la función específica del prompt en idioma inglés técnico. El contenido interno del prompt puede estar en español o inglés según las necesidades del equipo. El sufijo `.prompt.md` permite identificar inmediatamente que el archivo es una instrucción para un modelo de IA generativa, diferenciándolo de archivos de contexto (`.context.md`) y de documentación técnica convencional.

### A.2. Clasificación Funcional de Prompts

La metodología GAIDD utiliza tres tipos funcionales de prompts, cada uno con un propósito distinto dentro del ciclo de desarrollo:

**Prompts de Generación**: Producen un entregable nuevo a partir de entradas definidas. Son los prompts principales de cada fase y generan los artefactos que alimentan las fases siguientes. Toda fase de generación tiene exactamente un prompt principal, excepto la Fase 0 (que tiene dos variantes según tipo de artefacto) y la Fase 4 (que tiene tres subfases secuenciales más una subfase complementaria).

**Prompts de Validación**: Evalúan un entregable generado previamente contra criterios específicos. Producen un reporte de hallazgos categorizados por severidad (bloqueante, mayor, menor, informativo). Existen en las fases de validación (0.1, 2.1, 3.1, 4.1) y al final del proceso de implementación de pruebas (4.2).

**Prompts de Integración de Correcciones**: Toman el reporte de validación y lo aplican automáticamente sobre el entregable original, produciendo una versión corregida. Estos prompts son complementarios a los de validación y operan sobre el Principio de No Acumulación: las correcciones no se almacenan como documentos separados, sino que se integran directamente en el artefacto fuente.

### A.3. Inventario Completo por Fase

---

#### Fase 0 — Clasificación de Granularidad del Requerimiento

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 1 | `phase_0.evaluation_high_level_requirement.prompt.md` | Generación | ✅ Disponible |
| 2 | `phase_0.epic_vs_user-story_evaluation.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: La Fase 0 requiere dos prompts mutuamente excluyentes porque el tipo de artefacto de entrada determina los criterios de evaluación aplicables. El prompt de requerimientos aplica los ocho criterios IEEE 830/ISO 29148 con foco en el criterio "Específico" como determinante. El prompt de historias de usuario aplica los criterios INVEST con foco en el criterio "Small" como determinante. El desarrollador selecciona uno u otro según el formato del artefacto recibido.

---

#### Fase 0.1 — Validación de Completitud y Viabilidad Técnica

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 3 | `phase_0-1.requirement_validation.prompt.md` | Validación | ✅ Disponible |

**Descripción funcional**: Un único prompt unificado que realiza tanto la validación de completitud semántica (usando `business_domain_dictionary.context.md`) como la validación de viabilidad técnica (usando los archivos de arquitectura, stack y estructura del proyecto). Ejecuta la evaluación en orden secuencial: semántica → tecnológica → arquitectónica → dispersión. El umbral de rechazo es acumulativo: cualquier criterio activado detiene el avance.

---

#### Fase 1 — Análisis y Comprensión del Requerimiento

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 4 | `phase_1.requirement_analysis_and_understanding.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: Genera el documento de análisis técnico que incluye comprensión del alcance funcional, identificación de componentes afectados o a crear, mapeo del requerimiento contra bounded contexts, dependencias técnicas identificadas, riesgos y supuestos documentados. Este artefacto es el insumo fundamental para la planificación arquitectónica de Fase 2.

---

#### Fase 2 — Planificación Arquitectónica de Implementación

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 5 | `phase_2.architectural_implementation_planning.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: Genera el plan de implementación arquitectónica que define la estrategia de alto nivel: qué patrones aplicar, qué componentes crear o modificar, cómo se organizará la solución dentro de la arquitectura existente, y qué decisiones arquitectónicas nuevas se toman. No incluye detalles de implementación (eso es Fase 3).

---

#### Fase 2.1 — Validación del Plan Arquitectónico

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 6 | `phase_2-1.architectural_implementation_plan_validation.prompt.md` | Validación | ✅ Disponible |
| 7 | `phase_2-1.integration-corrections.prompt.md` | Integración | ❌ Pendiente |
| 8 | `phase_2-1.validate-integration.prompt.md` | Validación | ❌ Pendiente |

**Descripción funcional del prompt #6**: Evalúa el plan de Fase 2 contra la arquitectura existente, estándares de patrones y decisiones históricas (ADRs). Produce un reporte de hallazgos categorizados que el desarrollador revisa antes de proceder.

**Descripción funcional del prompt #7**: Recibe el plan de Fase 2 junto con el reporte de validación aprobado por el desarrollador y produce una versión integrada del plan donde las correcciones están incorporadas directamente. Aplica el Principio de No Acumulación: el resultado reemplaza al plan original.

**Descripción funcional del prompt #8**: Verifica que la integración realizada por el prompt #7 sea correcta: que todas las correcciones marcadas como necesarias fueron aplicadas, que no se introdujeron regresiones, y que el documento resultante es internamente consistente. Es una verificación breve y focalizada.

---

#### Fase 3 — Diseño Detallado de Implementación

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 9 | `phase_3.detailed_implementation_design.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: Genera la especificación técnica detallada que describe a nivel de componente exactamente qué crear: clases, métodos, parámetros, retornos, excepciones, lógica conceptual, integraciones con componentes existentes, queries de persistencia, y estrategia de manejo de errores. Este artefacto es el blueprint definitivo del que se derivarán las pruebas (Fase 4) y la implementación (Fase 5).

---

#### Fase 3.1 — Validación del Diseño Detallado

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 10 | `phase_3-1.detailed_implementation_design_validation.prompt.md` | Validación | ✅ Disponible |
| 11 | `phase_3-1.integration-corrections.prompt.md` | Integración | ❌ Pendiente |
| 12 | `phase_3-1.validate-integration.prompt.md` | Validación | ❌ Pendiente |

**Descripción funcional del prompt #10**: Evalúa la especificación de Fase 3 contra el plan arquitectónico de Fase 2 (ya corregido), los estándares de arquitectura, los contratos de APIs, el esquema de base de datos y las restricciones del stack tecnológico. Verifica completitud, consistencia interna, y viabilidad técnica del diseño.

**Descripción funcional del prompt #11**: Integra las correcciones del reporte de validación directamente en la especificación de Fase 3, produciendo una versión corregida que reemplaza al documento original.

**Descripción funcional del prompt #12**: Verifica que la integración de correcciones fue correcta y completa, sin regresiones ni inconsistencias introducidas.

---

#### Fase 4 — Desarrollo de Suite de Pruebas (Especificación)

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 13 | `phase_4.happy-path.prompt.md` | Generación | ✅ Disponible |
| 14 | `phase_4.edge-corner-cases.prompt.md` | Generación | ✅ Disponible |
| 15 | `phase_4.unhappy-path.prompt.md` | Generación | ✅ Disponible |
| 16 | `phase_4.mocking-strategy-specification.prompt.md` | Generación | ❌ Pendiente |

**Descripción funcional de los prompts #13-15**: La Fase 4 ejecuta tres subfases secuenciales obligatorias, cada una con un prompt dedicado. El prompt de Happy Path genera la especificación de pruebas para el flujo principal exitoso de la funcionalidad. El de Edge/Corner Cases genera especificaciones para condiciones límite, valores extremos y combinaciones atípicas. El de Unhappy Path genera especificaciones para flujos de error, validaciones fallidas, excepciones y condiciones de falla. La ejecución es secuencial porque cada subfase puede referenciar las anteriores para evitar duplicación de cobertura.

**Descripción funcional del prompt #16**: Genera la especificación de la estrategia de moqueo (mocking): qué dependencias se mockean, qué comportamiento simulan los mocks, qué datos de fixture se necesitan, y cómo se configuran los mocks para APIs externas, bases de datos, servicios internos y sistemas de archivos. Este prompt complementa a los tres anteriores proveyendo la infraestructura técnica necesaria para implementar las pruebas especificadas.

---

#### Fase 4.1 — Validación de Cobertura de Pruebas

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 17 | `phase_4-1.validation-happy-path.prompt.md` | Validación | ✅ Disponible |
| 18 | `phase_4-1.validation-edge-corner-cases.prompt.md` | Validación | ✅ Disponible |
| 19 | `phase_4-1.validation-unhappy-path.prompt.md` | Validación | ✅ Disponible |
| 20 | `phase_4-1.integration-corrections-happy-path.prompt.md` | Integración | ❌ Pendiente |
| 21 | `phase_4-1.integration-corrections-edge-cases.prompt.md` | Integración | ❌ Pendiente |
| 22 | `phase_4-1.integration-corrections-unhappy-path.prompt.md` | Integración | ❌ Pendiente |
| 23 | `phase_4-1.validate-integration.prompt.md` | Validación | ❌ Pendiente |

**Descripción funcional de los prompts #17-19**: Validan que cada documento de especificación de pruebas (Happy Path, Edge Cases, Unhappy Path) cubra el 100% de los comportamientos descritos en la especificación de Fase 3. La validación es secuencial: un documento por invocación, con énfasis diferente según el tipo de prueba.

**Descripción funcional de los prompts #20-22**: Integran las correcciones reportadas por los prompts de validación #17-19 directamente en cada documento de especificación de pruebas correspondiente. Son tres prompts separados porque cada documento de especificación de pruebas es un artefacto independiente.

**Descripción funcional del prompt #23**: Verifica que la integración de correcciones fue correcta en los tres documentos de especificación de pruebas. Puede ejecutarse una vez por documento o en una sola invocación verificando los tres, dependiendo del token budget disponible.

---

#### Fase 4.2 — Implementación del Código de Pruebas

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 24 | `phase_4-2.implementation-unit-tests.prompt.md` | Generación | ✅ Disponible |
| 25 | `phase_4-2.verify-implementation-coverage.prompt.md` | Validación | ❌ Pendiente |

**Descripción funcional del prompt #24**: Genera el código ejecutable de las pruebas unitarias, de integración y de sistema a partir de las especificaciones documentadas en Fase 4 (ya corregidas por Fase 4.1). Esta es la primera fase de la metodología que genera código. El prompt traduce especificaciones de pruebas escritas en lenguaje técnico a código de testing siguiendo los estándares y frameworks del stack del proyecto.

**Descripción funcional del prompt #25**: Verifica que el código de pruebas implementado cubre el 100% de las especificaciones documentadas. Cruza cada caso de prueba especificado en los documentos de Happy Path, Edge Cases y Unhappy Path contra el código implementado, identificando especificaciones no implementadas o implementadas incorrectamente.

---

#### Fase 5 — Implementación del Código de Producción

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 26 | `phase_5.implementation.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: Genera el código de producción que implementa la funcionalidad diseñada en Fase 3 y que debe hacer pasar las pruebas implementadas en Fase 4.2. Sigue el principio TDD Green Phase: el objetivo es hacer pasar todas las pruebas con la implementación más directa posible. La calidad del código no es la prioridad en esta fase (eso es Fase 6); la prioridad es funcionalidad correcta validada por tests.

---

#### Fase 6 — Refactorización y Optimización

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 27 | `phase_6.refactoring-and-optimization.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: Toma el código funcional de Fase 5 y lo mejora en calidad sin alterar su comportamiento. Identifica code smells, aplica técnicas de refactoring aprobadas, optimiza rendimiento donde sea necesario, mejora documentación inline y verifica métricas de calidad. Cada refactorización debe ser seguida por ejecución de la suite de pruebas para confirmar que el comportamiento es idéntico (invariante funcional). 

---

#### Fase 7 — Verificación Técnica Integral

| # | Archivo | Tipo | Estado |
|---|---------|------|--------|
| 28 | `phase_7.comprehensive-technical-verification.prompt.md` | Generación | ✅ Disponible |

**Descripción funcional**: Ejecuta una certificación final multi-dimensional del código que verifica cinco aspectos: cumplimiento funcional completo del requerimiento, calidad de código contra métricas y estándares, adherencia a estándares técnicos del proyecto, rendimiento contra umbrales establecidos, y seguridad contra vulnerabilidades comunes. Produce un reporte de certificación con veredicto por dimensión (PASS/FAIL) y acciones correctivas requeridas si existen hallazgos bloqueantes.

---

### A.4. Resumen de Estado

| Categoría | Cantidad | Porcentaje |
|-----------|:--------:|:----------:|
| Prompts disponibles | 18 | 64% |
| Prompts pendientes de desarrollo | 10 | 36% |
| **Total requerido** | **28** | **100%** |

**Distribución por tipo funcional:**

| Tipo | Disponibles | Pendientes | Total |
|------|:-----------:|:----------:|:-----:|
| Generación | 13 | 1 | 14 |
| Validación | 5 | 3 | 8 |
| Integración de correcciones | 0 | 6 | 6 |
| **Total** | **18** | **10** | **28** |

### A.5. Análisis de Prompts Pendientes

Los prompts pendientes se concentran en dos patrones funcionales claramente definidos:

**Patrón de integración de correcciones (6 prompts)**: Fases 2.1, 3.1 y 4.1 comparten el mismo patrón de trabajo: validar → reportar → integrar correcciones → verificar integración. Los prompts de integración de correcciones y de verificación de integración son altamente similares entre sí; la diferencia principal radica en el tipo de artefacto que manipulan (plan arquitectónico, especificación de diseño, o especificación de pruebas). Existe la oportunidad de crear un meta-prompt parametrizable que genere cada variante, o bien crear un prompt genérico de integración de correcciones que reciba como parámetro el tipo de artefacto.

**Patrón de especificación complementaria (1 prompt)**: El prompt de estrategia de moqueo (`phase_4.mocking-strategy-specification.prompt.md`) es único y no comparte patrón con otros. Su desarrollo requiere conocimiento específico de las necesidades de mocking del stack tecnológico del proyecto.

**Patrón de verificación de cobertura de implementación (1 prompt)**: El prompt de verificación de cobertura de Fase 4.2 (`phase_4-2.verify-implementation-coverage.prompt.md`) valida que el código generado cubra las especificaciones. Es un patrón de validación cruzada entre documentos y código.

**Prompts de validación post-integración (2 prompts)**: Los prompts `phase_2-1.validate-integration.prompt.md` y `phase_3-1.validate-integration.prompt.md` verifican que correcciones fueron aplicadas correctamente. Son verificaciones breves y focalizadas.

### A.6. Nota sobre el Prompt `phase_4-1.validate-integration.prompt.md`

Este prompt se aplica a la validación de integración de los tres documentos de especificación de pruebas (Happy Path, Edge Cases, Unhappy Path). A diferencia de las Fases 2.1 y 3.1 donde hay un solo artefacto a verificar, en Fase 4.1 hay tres artefactos. El prompt debe ser capaz de operar sobre cualquiera de los tres documentos o, si el token budget lo permite, verificar los tres en una sola invocación.

---
---

## Anexo B: Inventario de Archivos de Contexto

### B.1. Propósito General de los Archivos de Contexto

Los archivos de contexto son documentos técnicos vivos que proporcionan al modelo de IA generativa la información necesaria sobre el proyecto para generar artefactos (documentos, diseños, código) consistentes con la realidad técnica del sistema existente. Sin estos archivos, la IA genera contenido genérico desconectado de las decisiones, restricciones y convenciones específicas del proyecto.

Cada archivo de contexto sigue la convención de nomenclatura `{nombre_descriptivo}.context.md` y se almacena en el repositorio del proyecto, preferentemente en una carpeta dedicada (por ejemplo: `.ai/context/`, `docs/ai-context/`, o la ruta que el equipo defina). El formato Markdown permite que los archivos sean legibles tanto por humanos como por modelos de IA.

### B.2. Principios Rectores

**Principio de Verdad Única**: Cada archivo de contexto es la fuente canónica de la información que contiene. Si hay un `database_schema.context.md`, ese archivo es la referencia definitiva del esquema de base de datos para efectos de la metodología GAIDD. Cualquier discrepancia entre el archivo de contexto y la realidad del proyecto indica que el archivo debe actualizarse.

**Principio de Actualización Continua**: Los archivos de contexto no son documentos estáticos. Deben actualizarse cada vez que ocurra un cambio significativo en el aspecto que documentan. Una arquitectura nueva, una librería agregada al stack, un componente creado o eliminado, una decisión arquitectónica tomada — todos estos eventos requieren actualización del archivo correspondiente.

**Principio de Alcance Acotado**: Cada archivo cubre un aspecto técnico específico y no debe duplicar información contenida en otros archivos. Si `project_architecture.context.md` describe la arquitectura de alto nivel y `project_architecture_standards.context.md` describe los patrones aprobados, ninguno debe incluir el contenido del otro.

**Principio de Concreción sobre Abstracción**: Los archivos de contexto deben contener información concreta, específica y accionable. "Usar buenas prácticas" no es contenido válido; "Aplicar patrón Repository para toda operación de persistencia, con interfaz en el paquete `domain.ports` e implementación en `infrastructure.adapters.persistence`" sí lo es.

### B.3. Clasificación por Dominio

Los 20 archivos de contexto se agrupan en siete dominios funcionales:

| Dominio | Archivos | Foco |
|---------|:--------:|------|
| Arquitectura y Estructura | 5 | Organización del sistema y del código |
| Dominio de Negocio | 1 | Lenguaje y conceptos del negocio |
| Tecnología y Stack | 2 | Restricciones tecnológicas e infraestructura |
| Persistencia e Integraciones | 2 | Base de datos y APIs |
| Estándares de Código | 4 | Convenciones de escritura y documentación |
| Calidad y Testing | 3 | Pruebas y refactorización |
| Seguridad y Rendimiento | 2 | Requisitos transversales |
| Referencia | 2 | Ejemplos de implementación |

### B.4. Inventario Detallado

---

### B.4.1. `project_architecture.context.md` — Arquitectura de Alto Nivel del Proyecto

**Dominio**: Arquitectura y Estructura

**Fases donde se utiliza**: 0.1 (viabilidad), 1 (análisis de impacto), 2 (planificación), 2.1 (validación), 3 (diseño detallado), 3.1 (validación de diseño), 4 (especificación de pruebas), 4.1 (validación de cobertura), 4.2 (implementación de tests), 5 (implementación), 7 (verificación final)

**Fases donde se excluye explícitamente**: 6 (refactorización — la arquitectura ya está materializada en el código)

**Descripción**: Este archivo contiene la representación de alto nivel de la arquitectura del sistema, expresada en notación C4 Model niveles 1 (System Context) y 2 (Container). Es el mapa general que describe cómo está organizado el sistema en términos de sus componentes principales, sus responsabilidades, y cómo se comunican entre sí.

**Contenido requerido**:

El archivo debe comenzar con la identificación del estilo arquitectónico adoptado por el proyecto (monolítico en capas, microservicios, hexagonal, event-driven, serverless, u otro) junto con la justificación técnica de esa elección. Esta declaración establece el marco de referencia para todas las decisiones de diseño.

A continuación debe incluir el catálogo de módulos o componentes principales del sistema. Cada módulo debe documentar su nombre canónico, su responsabilidad expresada en una o dos oraciones concisas, su bounded context en terminología DDD si aplica, los módulos con los que se comunica (dependencias directas), y el mecanismo de comunicación utilizado (llamada síncrona, eventos, mensajería, REST, gRPC u otros).

El archivo debe describir los flujos de datos principales del sistema: cómo fluye la información desde el punto de entrada (API, interfaz de usuario, evento externo) a través de los módulos hasta su destino final (base de datos, servicio externo, respuesta al cliente). Estos flujos deben ser representados de forma textual describiendo la secuencia de módulos que la información atraviesa en cada caso de uso principal.

Debe incluir las restricciones de acoplamiento entre módulos: qué módulos pueden comunicarse directamente y cuáles deben hacerlo exclusivamente a través de interfaces públicas, eventos o mediadores. Estas restricciones son críticas porque definen los límites que ningún requerimiento debe violar.

Finalmente, debe documentar los bounded contexts del dominio si el proyecto aplica Domain-Driven Design: qué contextos existen, qué entidades pertenecen a cada uno, y cuáles son los contratos de comunicación entre contextos (anti-corruption layers, shared kernels, o customer-supplier relationships).

**Nota sobre diagramas**: Si el equipo mantiene diagramas C4 (como archivos PlantUML, Mermaid, Structurizr o imágenes), pueden referenciarse desde este archivo. Sin embargo, el contenido textual debe ser autosuficiente para que el modelo de IA pueda interpretar la arquitectura sin depender de imágenes.

---

### B.4.2. `project_architecture_standards.context.md` — Estándares y Patrones Arquitectónicos

**Dominio**: Arquitectura y Estructura

**Fases donde se utiliza**: 1 (análisis), 2 (planificación), 2.1 (validación), 3 (diseño), 3.1 (validación), 4 (especificación de pruebas), 4.1 (validación), 4.2 (implementación de tests), 5 (implementación), 6 (refactorización), 7 (verificación)

**Descripción**: Define las reglas prescriptivas de cómo debe diseñarse e implementarse el código dentro de la arquitectura del proyecto. Mientras `project_architecture.context.md` describe QUÉ es el sistema (mapa), este archivo prescribe CÓMO debe construirse (reglas de construcción). Es el documento normativo que todo código generado debe cumplir.

**Contenido requerido**:

Debe comenzar con el catálogo de patrones de diseño aprobados para el proyecto. Cada patrón debe documentarse con su nombre (Repository, Service, Factory, Strategy, Observer, etc.), las situaciones donde debe aplicarse (cuándo usar), las situaciones donde está prohibido aplicarlo (cuándo no usar), y la estructura esperada de la implementación en el stack tecnológico del proyecto (qué clases, interfaces, paquetes, y relaciones de dependencia se esperan).

Debe incluir el catálogo de antipatrones prohibidos: patrones de diseño o prácticas que están explícitamente vetados en el proyecto. Cada antipatrón debe documentar su nombre, por qué está prohibido en el contexto del proyecto, y cuál es la alternativa aprobada. Antipatrones típicos incluyen God Class, Service Locator (si no está aprobado), Circular Dependencies, Anemic Domain Model (si se usa DDD rico), y acceso directo a base de datos desde controladores.

Debe documentar las reglas de dependencia entre capas arquitectónicas: qué capa puede depender de cuál. Si el proyecto usa arquitectura hexagonal, las reglas de puertos y adaptadores deben estar aquí. Si usa capas tradicionales, la regla de que controladores no pueden depender de repositorios directamente debe estar documentada. Estas reglas se expresan de forma prescriptiva: "La capa X puede depender de la capa Y" y "La capa X no debe depender de la capa Z bajo ninguna circunstancia".

Debe incluir las convenciones de organización de responsabilidades: qué lógica pertenece a cada tipo de componente. La lógica de validación de entrada debe estar en un lugar determinado, la lógica de negocio en otro, la transformación de datos en otro. Estas convenciones eliminan ambigüedad cuando el desarrollador o la IA deben decidir dónde colocar una nueva funcionalidad.

Debe documentar los principios de acoplamiento y cohesión adoptados: nivel máximo de dependencias directas permitido por componente, criterios para determinar cuándo un componente debe dividirse, y métricas de referencia si existen (fan-in/fan-out máximo, profundidad de herencia máxima, etc.).

---

### B.4.3. `architecture_decision_records.context.md` — Registro de Decisiones Arquitectónicas

**Dominio**: Arquitectura y Estructura

**Fases donde se utiliza**: 1 (comprensión de contexto histórico), 2 (planificación), 2.1 (validación), 3 (diseño), 3.1 (validación), 7 (verificación de cumplimiento de ADRs)

**Fases donde se excluye explícitamente**: 4 a 6 (las decisiones ya están reflejadas en la especificación de Fase 3; las fases de implementación siguen la especificación, no las decisiones que la originaron)

**Descripción**: Contiene el historial de decisiones arquitectónicas significativas del proyecto en formato ADR (Architecture Decision Record). A diferencia de `project_architecture_standards.context.md` que prescribe reglas generales, este archivo documenta decisiones específicas tomadas en momentos concretos, con su contexto, alternativas consideradas, y justificación.

**Contenido requerido**:

Cada decisión arquitectónica debe documentarse como un registro individual que contenga los siguientes elementos: un identificador único secuencial (ADR-001, ADR-002, etc.), la fecha de la decisión, el estado actual de la decisión (activo, obsoleto, reemplazado por ADR-XXX), el contexto o problema que motivó la decisión, las opciones consideradas con sus pros y contras resumidos, la decisión tomada expresada de forma clara y prescriptiva, la justificación técnica de por qué esa opción fue seleccionada sobre las demás, y las consecuencias conocidas (positivas y negativas) de la decisión.

El archivo debe organizarse cronológicamente, con las decisiones más recientes al final. Debe mantener decisiones obsoletas marcadas como tal pero no eliminadas, porque el historial de por qué se cambió una decisión es información valiosa para la IA cuando analiza requerimientos que tocan esas áreas.

Debe incluir una sección de decisiones activas agrupadas por área del sistema (persistencia, comunicación, seguridad, interfaz) que permita filtrar rápidamente qué decisiones aplican a un área específica. Cuando un requerimiento toca un área, solo los ADRs de esa área necesitan cargarse en el contexto del modelo, optimizando el uso de tokens.

Las decisiones deben ser específicas del proyecto, no reafirmaciones de buenas prácticas genéricas. "Usar HTTPS para toda comunicación" no es un ADR válido a menos que haya habido una discusión específica sobre protocolo. "Usar comunicación asíncrona entre el módulo de Pagos y el módulo de Notificaciones porque el tiempo de envío de email no debe bloquear la confirmación de pago" sí es un ADR válido.

---

### B.4.4. `project_directory_tree.context.md` — Árbol de Directorios del Proyecto

**Dominio**: Arquitectura y Estructura

**Fases donde se utiliza**: 1 (mapeo de impacto), 2 (planificación de ubicaciones), 2.1 (validación), 3 (rutas exactas de archivos), 3.1 (validación), 4.2 (ubicación de archivos de tests), 5 (ubicación de código), 7 (verificación de estructura)

**Fases donde se excluye explícitamente**: 4 y 4.1 (especifican QUÉ testear, no DÓNDE ubicar archivos), 6 (el árbol ya es visible en el código existente)

**Descripción**: Representa la estructura real del sistema de archivos del proyecto en su estado actual. Es la fotografía de cómo está organizado el código fuente y todos los archivos relacionados. Mientras `project_structure_principles.context.md` define las reglas de CÓMO organizar, este archivo muestra DÓNDE están las cosas realmente.

**Contenido requerido**:

Debe incluir el árbol de directorios completo del código fuente del proyecto en formato textual (tipo tree de Unix), mostrando la jerarquía de carpetas y archivos hasta un nivel de profundidad que sea útil sin ser excesivo. Para proyectos grandes, se recomienda incluir el árbol hasta el nivel de paquetes/módulos principales mostrando los archivos más representativos (clases principales, interfaces, configuraciones), y omitir archivos generados automáticamente, dependencias descargadas, archivos de build, y otros artefactos que no son código fuente.

Cada directorio principal debe incluir una anotación breve que explique su propósito si no es evidente por su nombre. Estas anotaciones son especialmente importantes para que la IA entienda la convención del proyecto. Si `src/main/java/com/empresa/proyecto/` tiene subdirectorios `application/`, `domain/`, `infrastructure/`, la anotación debe indicar que corresponden a las capas de una arquitectura hexagonal.

Debe incluir las convenciones de ubicación de archivos de pruebas en relación con el código de producción: si las pruebas están en una estructura espejo (`src/test/` espejando `src/main/`), si están colocadas al lado del código fuente, o si siguen otra convención.

Debe documentar las carpetas de configuración, scripts, migraciones de base de datos, archivos de infraestructura como código (Terraform, Docker, Kubernetes), pipelines de CI/CD y cualquier otra estructura que afecte decisiones de desarrollo.

El archivo debe actualizarse cada vez que se cree un nuevo módulo, paquete o estructura significativa, y al menos una vez por sprint como práctica de mantenimiento.

---

### B.4.5. `project_structure_principles.context.md` — Principios de Organización de Código

**Dominio**: Arquitectura y Estructura

**Fases donde se utiliza**: 0.1 (estimación de dispersión y validación de granularidad), 1 (comprensión de convenciones de organización)

**Fases donde se excluye explícitamente**: 3 en adelante (reemplazado por `project_directory_tree.context.md` que es más concreto y específico para ubicar archivos)

**Descripción**: Define las reglas y convenciones abstractas que rigen cómo se organiza el código en el sistema de archivos del proyecto. Es un documento de reglas de organización, no una fotografía del estado actual (eso es `project_directory_tree.context.md`). Se utiliza principalmente en las fases tempranas de la metodología para evaluar si un requerimiento tiene un alcance razonable en términos de dispersión de impacto.

**Contenido requerido**:

Debe documentar la estrategia de organización adoptada por el proyecto: por feature (vertical slicing), por capa técnica (horizontal slicing), híbrida, o cualquier otra. La estrategia debe estar justificada y deben documentarse las consecuencias prácticas de esa elección (un requerimiento que toca una feature afecta una sola carpeta; un requerimiento que toca una capa afecta múltiples carpetas).

Debe incluir las convenciones de nomenclatura de carpetas y paquetes: reglas de naming (camelCase, kebab-case, snake_case), prefijos o sufijos significativos, jerarquía de paquetes por dominio o función técnica, y restricciones de profundidad de directorios (si existen).

Debe documentar los criterios de cohesión para agrupar archivos: qué determina que dos archivos deben estar en la misma carpeta/paquete y qué determina que deben estar en carpetas/paquetes separados. Estos criterios suelen basarse en responsabilidad compartida, módulo de dominio, o capa técnica.

Debe definir los umbrales de dispersión aceptable para cambios: cuántos módulos, paquetes o archivos se considera razonable modificar para un solo requerimiento o historia de usuario antes de considerar que el requerimiento es demasiado amplio. Este umbral es configurable por proyecto y se utiliza en Fase 0.1 como criterio de rechazo por dispersión excesiva.

Debe documentar las reglas de creación de nuevas estructuras: bajo qué condiciones se justifica crear un nuevo paquete, módulo o carpeta, y cuál es el proceso para hacerlo (si requiere revisión arquitectónica, si puede hacerse autónomamente, etc.).

---

### B.4.6. `business_domain_dictionary.context.md` — Diccionario de Dominio de Negocio

**Dominio**: Dominio de Negocio

**Fases donde se utiliza**: 0.1 (validación semántica), 1 (comprensión de terminología), 2 (planificación), 2.1 (validación), 3 (naming de componentes), 3.1 (validación de naming), 4 (especificación de pruebas), 4.1 (validación), 4.2 (implementación de tests), 5 (implementación)

**Fases donde se excluye explícitamente**: 6 (naming ya establecido en el código), 7 (terminología ya validada en fases anteriores)

**Descripción**: Es el glosario canónico de términos de negocio del dominio del proyecto, implementando el concepto de Lenguaje Ubicuo (Ubiquitous Language) de Domain-Driven Design. Garantiza que toda la comunicación entre personas, documentación y código utilice exactamente la misma terminología, eliminando ambigüedades semánticas que son una de las causas más frecuentes de defectos en software.

**Contenido requerido**:

Debe contener un catálogo completo de términos de negocio organizados alfabéticamente o agrupados por subdominios/bounded contexts. Cada término debe incluir los siguientes elementos: el término canónico (la forma oficial en que debe usarse en código, documentación y comunicación), la definición precisa en el contexto del proyecto (no una definición de diccionario genérica, sino lo que el término significa específicamente en este negocio), los sinónimos aceptados (si existen formas alternativas válidas), los sinónimos rechazados (formas que se usan coloquialmente pero que no deben aparecer en código ni documentación porque generan ambigüedad), las relaciones con otros términos del diccionario (un Cliente tiene Pedidos, un Pedido contiene Productos), y las reglas de negocio directamente asociadas al término (un Pedido no puede cancelarse después de ser despachado).

Debe documentar las restricciones terminológicas: términos que son polisémicos en lenguaje natural pero que tienen un significado único en el contexto del proyecto (la palabra "cuenta" puede significar "cuenta bancaria", "cuenta de usuario" o "cálculo" — el diccionario debe especificar cuál aplica y en qué contexto).

Debe incluir los términos técnicos que se comparten con el dominio de negocio: si el negocio habla de "transacciones", "workflows", "pipelines" u otros términos que también tienen significado técnico, el diccionario debe aclarar cuándo se usa en sentido de negocio y cuándo en sentido técnico.

Debe documentar las entidades principales del dominio con sus atributos clave, sus estados posibles (si aplican máquinas de estado), y las transiciones válidas entre estados. Esta información es crítica para que la IA genere código que respete las reglas de negocio.

El diccionario debe mantenerse sincronizado con el lenguaje que usa el equipo de producto y los stakeholders. Cualquier término nuevo que aparezca en un requerimiento y no esté en el diccionario debe agregarse antes de proceder con la implementación.

---

### B.4.7. `tech_stack_constraints.context.md` — Stack Tecnológico y Restricciones

**Dominio**: Tecnología y Stack

**Fases donde se utiliza**: 0.1 (viabilidad tecnológica), 1 (análisis), 2 (planificación), 2.1 (validación), 3 (diseño), 3.1 (validación), 4 (especificación de pruebas), 4.1 (validación), 4.2 (implementación de tests), 5 (implementación), 7 (verificación de stack)

**Fases donde se excluye explícitamente**: 6 (no introduce tecnologías nuevas, mejora uso de las existentes)

**Descripción**: Es el inventario exhaustivo y normativo de todas las tecnologías permitidas y prohibidas en el proyecto, con versiones exactas, librerías aprobadas por categoría funcional, y restricciones técnicas derivadas del entorno. Funciona como un filtro estricto: cualquier tecnología no listada explícitamente como aprobada se considera no disponible.

**Contenido requerido**:

Debe comenzar con el runtime principal del proyecto: lenguaje de programación con versión exacta (Java 17, Python 3.11, Node.js 20.x, .NET 8, etc.), runtime/VM con versión, y sistema operativo objetivo para producción.

Debe incluir el catálogo de frameworks principales con versiones exactas: framework web (Spring Boot 3.2.x, Django 5.0, Express 4.x, ASP.NET Core 8), framework de ORM/persistencia (Hibernate 6.x, SQLAlchemy 2.x, Prisma 5.x, Entity Framework Core 8), framework de testing (JUnit 5, pytest, Jest, xUnit), framework de mocking (Mockito, unittest.mock, Jest mocks, Moq), y cualquier otro framework estructural.

Debe documentar el catálogo de librerías aprobadas organizadas por categoría funcional: serialización/deserialización (Jackson, Gson, etc.), logging (SLF4J+Logback, Log4j2, etc.), validación (Bean Validation, Joi, Zod, FluentValidation), manejo de fechas (java.time, dayjs, NodaTime), HTTP client (OkHttp, Axios, HttpClient), y todas las demás categorías relevantes para el proyecto. Cada librería debe indicar su versión aprobada.

Debe incluir el listado explícito de tecnologías y librerías prohibidas: aquellas que alguna vez se usaron o que podrían considerarse pero están vetadas por razones técnicas, de seguridad, de licenciamiento o de mantenibilidad. Cada prohibición debe incluir la razón. Esto es particularmente importante para la IA que podría sugerir librerías populares pero no aprobadas para el proyecto.

Debe documentar las restricciones de versión y compatibilidad: versión mínima y máxima de dependencias, incompatibilidades conocidas entre librerías, y features específicos del lenguaje/framework que están prohibidos (features experimentales, APIs deprecated que aún funcionan pero no deben usarse, etc.).

Debe incluir las herramientas de build, empaquetado y deployment: sistema de build (Maven, Gradle, pip, npm, dotnet CLI), gestor de dependencias, herramientas de análisis estático (SonarQube, ESLint, Checkstyle, Roslyn analyzers), formateadores de código (Prettier, Black, google-java-format), y herramientas de CI/CD.

---

### B.4.8. `deployment_and_infrastructure_context.context.md` — Infraestructura y Deployment

**Dominio**: Tecnología y Stack

**Fases donde se utiliza**: 1 (restricciones de infraestructura en análisis), 2 (planificación), 2.1 (validación), 3 (diseño considerando restricciones), 3.1 (validación), 7 (verificación de deployability)

**Fases donde se excluye explícitamente**: 4, 4.1 (tests especifican comportamiento funcional, no restricciones de deployment), 4.2 (tests se ejecutan en entorno de desarrollo/CI), 5 (restricciones ya incorporadas en diseño de Fase 3), 6 (no relevante para refactorización)

**Carga condicional**: En Fases 1, 2 y 3 se carga condicionalmente solo si el requerimiento implica procesamiento de alto volumen, restricciones de memoria, entornos serverless, o cualquier aspecto condicionado por la infraestructura. En Fase 7 se carga siempre para verificación de deployability.

**Descripción**: Documenta el entorno de ejecución de producción y las restricciones técnicas que impone la infraestructura sobre el código. Es el archivo que evita que se diseñe o implemente código incompatible con el entorno real de ejecución.

**Contenido requerido**:

Debe documentar el tipo de entorno de ejecución: servidores on-premise con características específicas, contenedores Docker con imágenes base y límites de recursos, plataformas serverless con restricciones de tiempo de ejecución y memoria, clusters Kubernetes con configuraciones de pods y escalado, o cualquier combinación.

Debe incluir los límites de recursos por unidad de ejecución: memoria máxima disponible (RAM por instancia/contenedor/función), CPU disponible, tiempo máximo de ejecución (especialmente crítico en serverless donde hay hard limits), espacio en disco temporal disponible, y límites de conexiones de red concurrentes.

Debe documentar la topología de red relevante para el código: si los servicios se comunican dentro de una VPC, si hay firewalls entre servicios, si hay latencias significativas entre componentes, restricciones de DNS, y configuraciones de load balancing que afecten el diseño (sticky sessions, round-robin).

Debe incluir la estrategia de deployment: mecanismo de deploy (blue-green, canary, rolling update), proceso de rollback, ventanas de mantenimiento si existen, y cualquier restricción temporal sobre releases.

Debe documentar la infraestructura de observabilidad: sistema de logging centralizado (ELK, CloudWatch, Datadog), formato de logs requerido (JSON structured, plain text), sistema de métricas (Prometheus, CloudWatch Metrics), sistema de trazas distribuidas (Jaeger, X-Ray), y requisitos de alertas.

Debe incluir las restricciones de estado: si el entorno es stateless (serverless, containers efímeros) y no se puede asumir estado en memoria entre invocaciones, o si hay estado compartido disponible (Redis, Memcached) y cómo acceder a él.

Debe documentar las configuraciones de bases de datos en producción: tipo de conexión (pool, serverless connections), límites de conexiones concurrentes, estrategia de read replicas si existen, y timeouts de queries.

---

### B.4.9. `database_schema.context.md` — Esquema de Base de Datos

**Dominio**: Persistencia e Integraciones

**Fases donde se utiliza**: 1 (análisis de impacto en datos), 2 (planificación), 2.1 (validación), 3 (diseño de queries y migraciones), 3.1 (validación), 4 (especificación de pruebas de persistencia), 4.1 (validación), 4.2 (implementación de tests de persistencia), 5 (implementación de repositorios)

**Fases donde se excluye explícitamente**: 6 (refactorización no cambia operaciones de BD — invariante de comportamiento), 7 (tests de integración ya verifican compatibilidad con esquema)

**Descripción**: Documenta la estructura de la base de datos del proyecto: tablas, columnas, tipos de datos, relaciones, índices, constraints y cualquier otro elemento del esquema que sea relevante para el desarrollo. Es la referencia canónica para toda operación de persistencia.

**Contenido requerido**:

Debe documentar cada tabla relevante con todos sus elementos estructurales: nombre de la tabla, propósito o descripción funcional (qué entidad de negocio representa), listado completo de columnas con nombre, tipo de dato con precisión (VARCHAR(255), DECIMAL(10,2), TIMESTAMP WITH TIME ZONE), restricción de nulabilidad (NOT NULL / NULLABLE), valor por defecto si existe, y descripción funcional de cada columna.

Debe incluir las primary keys, unique constraints y check constraints de cada tabla, documentando qué regla de negocio implementa cada constraint. Las foreign keys deben documentar la tabla referenciada, la columna referenciada, y el comportamiento de CASCADE (ON DELETE CASCADE, ON DELETE SET NULL, ON DELETE RESTRICT) con la justificación de ese comportamiento.

Debe documentar los índices existentes: nombre del índice, columnas que cubre (incluyendo orden), si es único o no único, si es parcial (con condición WHERE), y el propósito funcional (optimizar búsqueda por fecha, garantizar unicidad de email, soportar queries de reporting). Los índices compuestos deben documentar el orden de columnas y por qué ese orden fue elegido.

Debe incluir las vistas, funciones almacenadas y triggers si existen, documentando su propósito y su lógica a alto nivel.

Debe documentar el diagrama entidad-relación (ERD) de forma textual: las relaciones entre tablas expresadas como asociaciones con cardinalidad (un Cliente tiene muchos Pedidos — 1:N, un Pedido contiene muchos Productos y un Producto puede estar en muchos Pedidos — N:M a través de tabla intermedia `order_items`).

Debe incluir información sobre particionamiento, sharding o cualquier estrategia de distribución de datos si aplica.

Para proyectos con esquema extenso, se permite dividir este archivo en secciones por dominio funcional e incluir solo las secciones relevantes al requerimiento en proceso. El archivo debe indicar cómo está organizado para facilitar esta carga selectiva.

---

### B.4.10. `api_integration_contracts.context.md` — Contratos de Integración de APIs

**Dominio**: Persistencia e Integraciones

**Fases donde se utiliza**: 1 (análisis de integraciones), 2 (planificación), 2.1 (validación), 3 (diseño de integraciones), 3.1 (validación), 4 (especificación de pruebas con mocks), 4.1 (validación), 4.2 (implementación de tests con mocks), 5 (implementación de integraciones)

**Fases donde se excluye explícitamente**: 6 (integraciones ya implementadas — invariante de comportamiento), 7 (tests verifican cumplimiento de contratos)

**Carga condicional**: Se carga solo cuando el requerimiento involucra consumo o exposición de APIs, o cuando se identifica necesidad de integración durante el análisis.

**Descripción**: Documenta los contratos técnicos de todas las APIs con las que el sistema interactúa (tanto APIs externas que consume como APIs propias que expone). Es la fuente de verdad para toda integración, definiendo exactamente qué datos se envían, qué datos se reciben, qué errores pueden ocurrir, y bajo qué condiciones.

**Contenido requerido**:

Para cada API documentada debe incluir: la identificación de la API (nombre, proveedor, versión), la URL base o el mecanismo de descubrimiento de servicios, el protocolo de comunicación (REST, gRPC, GraphQL, SOAP, WebSocket), y el mecanismo de autenticación requerido (API key, OAuth2, JWT, mTLS, sin autenticación).

Para cada endpoint o operación específica debe documentar: la ruta del endpoint con sus path parameters, el método HTTP (GET, POST, PUT, DELETE, PATCH), los headers requeridos y opcionales, la estructura del request body con tipos de datos y validaciones (campos obligatorios, formatos, rangos), la estructura del response body para cada código de estado posible (200, 201, 400, 401, 403, 404, 500), y los posibles códigos de error con su significado específico.

Debe incluir las restricciones operacionales de cada API: rate limits (requests por segundo/minuto/hora), timeouts recomendados para conexión y lectura, políticas de retry (qué errores son retryable, cuántos reintentos, backoff strategy), límites de tamaño de payload, y paginación (mecanismo, tamaño de página por defecto y máximo).

Debe documentar los contratos de datos compartidos: DTOs o esquemas que se comparten entre APIs, formatos de fecha y hora usados, codificación de caracteres, y convenciones de serialización (camelCase, snake_case, formato de enums).

Para APIs propias que el proyecto expone, debe documentar adicionalmente: la especificación OpenAPI/Swagger si existe (o una descripción equivalente), las políticas de versionado, y los contratos de backward compatibility.

Debe incluir una sección de dependencias críticas: qué APIs son esenciales para la operación (si la API de pagos no responde, la operación falla) versus cuáles son opcionales o degradables (si la API de notificaciones falla, el pago se procesa pero la notificación se encola para reintento).

---

### B.4.11. `code_style_guide.context.md` — Guía de Estilo de Código

**Dominio**: Estándares de Código

**Fases donde se utiliza**: 3 (especificación de naming y estructura), 3.1 (validación de naming), 4.2 (implementación de código de tests), 5 (implementación), 6 (verificación rigurosa de estilo), 7 (verificación final)

**Fases donde se excluye explícitamente**: 0.1 a 2.1 (no se genera código ni se especifican nombres de componentes aún), 4 y 4.1 (especifican pruebas en lenguaje técnico, no código)

**Descripción**: Define todas las convenciones de escritura de código del proyecto: cómo nombrar variables, métodos, clases, paquetes; cómo organizar los archivos internamente; qué formato usar; y qué límites de complejidad respetar. Es la guía que garantiza uniformidad visual y estructural en todo el código base, independientemente de quién lo escriba (persona o IA).

**Contenido requerido**:

Debe documentar las convenciones de nomenclatura para cada tipo de elemento del lenguaje: clases (PascalCase/camelCase según lenguaje), interfaces (con o sin prefijo "I"), métodos (camelCase, verbos de acción), variables locales (camelCase, sustantivos descriptivos), constantes (UPPER_SNAKE_CASE), enums (convención específica del proyecto), paquetes/módulos (lowercase, con o sin separadores), archivos (convención de nombre de archivo versus nombre de clase).

Debe incluir las convenciones de organización interna de archivos: orden de secciones dentro de una clase (constantes, campos, constructores, métodos públicos, métodos privados, inner classes), orden de imports (estándar del lenguaje, terceros, internos del proyecto), separación de secciones (líneas en blanco, comentarios de sección si se usan).

Debe documentar los límites cuantitativos de complejidad: número máximo de líneas por método (habitualmente 20-30), número máximo de líneas por clase/archivo, profundidad máxima de anidamiento (habitualmente 3-4 niveles), número máximo de parámetros por método (habitualmente 3-5), complejidad ciclomática máxima permitida por método.

Debe incluir las convenciones de formato: indentación (espacios vs tabs, cantidad), longitud máxima de línea, estilo de llaves (mismo renglón vs siguiente renglón), espaciado alrededor de operadores, formato de cadenas multilínea, y cualquier otra regla de formato que no sea manejada automáticamente por el formateador de código del proyecto.

Debe documentar las convenciones de comentarios y documentación inline: cuándo es obligatorio documentar (toda clase pública, todo método público, lógica compleja), cuándo es innecesario o prohibido (comentarios que solo repiten lo que el código dice), formato de documentación (JSDoc, Javadoc, docstrings, XML docs), y qué información incluir (propósito, parámetros, retorno, excepciones, ejemplos).

Debe incluir las convenciones de manejo de imports: si se permite wildcard import, si se requieren imports estáticos para ciertas clases (assertions de testing), orden de agrupación de imports, y herramientas de organización automática configuradas.

---

### B.4.12. `error_handling_and_logging_standards.context.md` — Estándares de Manejo de Errores y Logging

**Dominio**: Estándares de Código

**Fases donde se utiliza**: 3 (diseño de estrategia de errores), 3.1 (validación), 4 (especificación de pruebas de error), 4.1 (validación), 4.2 (implementación de tests de error), 5 (implementación), 6 (mejora de calidad de error handling), 7 (verificación)

**Fases donde se excluye explícitamente**: 0.1 a 2.1 (detalles de implementación no relevantes para análisis y planificación de alto nivel)

**Descripción**: Define las estrategias prescriptivas de manejo de excepciones y logging del proyecto. Establece qué excepciones usar, cómo propagarlas, qué loguear en cada nivel, qué contexto incluir en los mensajes, y qué prácticas están prohibidas. Es uno de los archivos más críticos para la calidad del código porque el manejo deficiente de errores y logging son las causas más frecuentes de dificultad en la depuración de incidentes en producción.

**Contenido requerido**:

Debe documentar la jerarquía de excepciones del proyecto: si existe una excepción base del proyecto de la cual derivan todas las demás, cuáles son las categorías principales de excepciones (de negocio, técnicas, de infraestructura, de validación), y qué excepción concreta debe usarse en cada situación. Debe ser explícito sobre si se permite crear excepciones nuevas y bajo qué criterios.

Debe incluir las reglas de propagación de excepciones: qué excepciones se capturan y manejan localmente (retornando un resultado de error), cuáles se capturan, envuelven y re-lanzan (wrapping), cuáles se dejan propagar sin captura, y cuáles nunca deben capturarse (errores fatales del runtime). Debe prohibir explícitamente las prácticas dañinas: catch genérico de `Exception`/`Throwable` sin justificación, excepciones silenciadas (catch vacío), uso de excepciones para control de flujo, y creación de excepciones sin contexto informativo.

Debe documentar la estrategia de logging con la definición de cuándo usar cada nivel: TRACE (detalle extremo solo para debugging profundo), DEBUG (información útil para desarrollo), INFO (eventos significativos de negocio), WARN (situaciones anómalas que no impiden operación), ERROR (fallas que impiden completar una operación), FATAL (fallas que comprometen la estabilidad del sistema).

Debe incluir las reglas de contenido de mensajes de log: qué información contextual es obligatoria en cada nivel (identificadores de transacción, identificadores de usuario, timestamps, información de la operación), qué formato usar (structured JSON, texto plano con patrón), y qué información está prohibida en logs (contraseñas, tokens, números de tarjeta, datos PII sin enmascarar).

Debe documentar las convenciones de logging transaccional: si se usa correlation ID para trazar requests a través de servicios, cómo se propaga ese ID, y qué información debe incluirse al inicio y fin de cada operación de negocio significativa.

Debe incluir las reglas de logging de performance: si se deben loguear tiempos de ejecución de operaciones críticas, umbrales para logging de queries lentas, y métricas de negocio que deben registrarse.

---

### B.4.13. `documentation_templates.context.md` — Templates de Documentación Técnica

**Dominio**: Estándares de Código

**Fases donde se utiliza**: 3 (especificación de documentación requerida), 3.1 (validación), 5 (implementación de documentación inline), 6 (mejora de documentación), 7 (verificación de completitud)

**Fases donde se excluye explícitamente**: 0.1 a 2.1 (documentación inline no relevante para análisis y planificación), 4, 4.1 (tests tienen su propia convención de documentación cubierta por `testing_standards_and_patterns.context.md`), 4.2 (tests no requieren el mismo nivel de documentación formal que código de producción)

**Descripción**: Define los templates y convenciones de documentación técnica que debe tener el código del proyecto. Establece qué elementos del código requieren documentación formal, qué formato debe usarse, y qué información es obligatoria en cada caso. Cubre documentación inline (JSDoc, Javadoc, docstrings, XML docs) y documentación técnica complementaria (READMEs, wikis, guías de contribución).

**Contenido requerido**:

Debe incluir el template de documentación de clase/módulo: qué información debe contener la documentación de toda clase pública (propósito de la clase, responsabilidad principal, dependencias requeridas, ejemplo de uso si la clase es compleja, autor y fecha de creación si es convención del proyecto, notas de thread-safety si aplica).

Debe documentar el template de documentación de método/función: qué información es obligatoria para métodos públicos (descripción del propósito, descripción de cada parámetro con tipo y restricciones, descripción del valor de retorno con posibles estados, documentación de cada excepción que puede lanzar con las condiciones que la causan, y ejemplo de invocación si el método tiene lógica no trivial).

Debe incluir las reglas de documentación de interfaces y contratos: las interfaces y clases abstractas tienen requisitos de documentación más estrictos porque definen contratos que múltiples implementaciones deben cumplir. Deben documentar pre-condiciones, post-condiciones y invariantes.

Debe documentar las convenciones de comentarios inline: cuándo es apropiado agregar un comentario dentro del código (lógica de negocio no obvia, workarounds con referencia al issue/ticket, decisiones de implementación contra-intuitivas con justificación), cuándo es inapropiado (parafrasear lo que el código ya dice, comentarios obvios, bloques de código comentados que deben eliminarse), y el formato de comentarios especiales (TODO, FIXME, HACK, con convención de referencia a ticket).

Debe incluir las convenciones de documentación de configuración: qué documentación requieren los archivos de configuración (application.properties, .env, docker-compose), variables de entorno, y cualquier parámetro configurable del sistema.

---

### B.4.14. `reference_code_examples.context.md` — Ejemplos de Código de Referencia

**Dominio**: Referencia

**Fases donde se utiliza**: 3 (guía para nivel de detalle del diseño), 3.1 (validación contra ejemplos), 4 (referencia de estilo de tests), 4.1 (validación), 4.2 (few-shot learning para código de tests), 5 (few-shot learning para código de producción), 6 (norte de calidad para refactorización)

**Fases donde se excluye explícitamente**: 0.1 a 2.1 (nivel de abstracción demasiado alto para necesitar ejemplos de código), 7 (verificación contra estándares/reglas, no contra ejemplos)

**Descripción**: Contiene un catálogo curado de implementaciones ejemplares del proyecto que representan el nivel de calidad objetivo. Funciona como mecanismo de few-shot learning: al proporcionarle a la IA ejemplos concretos de código bien escrito del proyecto, la IA genera código que sigue los mismos patrones, convenciones y nivel de calidad. Es el archivo que conecta las reglas abstractas de los estándares con implementaciones concretas.

**Contenido requerido**:

Debe incluir al menos un ejemplo representativo de cada patrón arquitectónico aprobado en el proyecto, implementado en el stack tecnológico real del proyecto. Si el proyecto usa patrón Repository, debe incluir un Repository completo que demuestre la implementación correcta. Si usa Services, debe incluir un Service ejemplar. Cada ejemplo debe ser código real del proyecto (no código hipotético) que el equipo considere como "gold standard" de calidad.

Cada ejemplo debe ir precedido de una anotación que explique por qué es un ejemplo de referencia: qué principios demuestra, qué patrones implementa, qué convenciones sigue, y qué aspectos de calidad exhibe (manejo de errores granular, documentación completa, testing apropiado, naming expresivo, etc.).

Debe incluir ejemplos de manejo de errores bien implementado: cómo se ve un try-catch correcto en el contexto del proyecto, cómo se propagan excepciones, cómo se estructura el logging contextual.

Debe incluir ejemplos de tests bien escritos: al menos un test unitario, uno de integración (si aplica), y uno de componente/sistema (si aplica), que demuestren el estilo de testing del proyecto. Estos ejemplos deben mostrar: estructura AAA (Arrange-Act-Assert) o equivalente, naming descriptivo de tests, uso correcto de mocks/stubs, assertions significativas y completas, y manejo de setup/teardown.

**Nota sobre `reference_test_examples.context.md`**: Si el volumen de ejemplos de tests es significativo y su inclusión dentro de `reference_code_examples.context.md` incrementa excesivamente el tamaño del archivo, el equipo puede optar por crear un archivo separado `reference_test_examples.context.md` exclusivamente con ejemplos de tests. Esta decisión debe tomarse cuando los ejemplos de tests superan aproximadamente el 40% del contenido total del archivo. Si se crea el archivo separado, debe seguir la misma estructura y convenciones que `reference_code_examples.context.md`.

Debe incluir ejemplos de integración con APIs (si el proyecto consume APIs): cómo se implementa un client HTTP correctamente, cómo se manejan errores de red, cómo se configuran retries y timeouts.

Debe incluir ejemplos de operaciones de persistencia (si el proyecto usa bases de datos): cómo se implementa un query correctamente, cómo se manejan transacciones, cómo se gestionan conexiones.

El archivo debe actualizarse periódicamente para incorporar nuevos ejemplos de calidad y retirar ejemplos que ya no representen las mejores prácticas actuales del proyecto.

---

### B.4.15. `testing_standards_and_patterns.context.md` — Estándares de Testing y Patrones de Pruebas

**Dominio**: Calidad y Testing

**Fases donde se utiliza**: 2 (planificación de estrategia de testing), 2.1 (validación), 3 (diseño orientado a testabilidad), 3.1 (validación), 4 (especificación de pruebas), 4.1 (validación de cobertura), 4.2 (implementación de tests), 7 (meta-verificación de calidad de la suite de tests)

**Fases donde se excluye explícitamente**: 5 (escribe código de producción, no tests — los tests son criterio de aceptación, no guía de implementación), 6 (ejecuta tests como red de seguridad, no escribe tests nuevos)

**Descripción**: Define la estrategia integral de testing del proyecto: qué tipos de tests se escriben, qué framework y herramientas se utilizan, qué patrones de testing se aplican, qué nivel de cobertura se requiere, y qué convenciones deben seguir los tests. Es el documento normativo para todo lo relacionado con pruebas.

**Contenido requerido**:

Debe documentar la pirámide de testing del proyecto (o la forma que haya adoptado): proporción esperada entre tests unitarios, de integración, de componente/sistema, y end-to-end. Debe indicar cuántos de cada tipo se esperan aproximadamente y qué comportamiento verifica cada nivel.

Debe incluir el framework de testing aprobado con su configuración recomendada: nombre del framework (JUnit 5, pytest, Jest, xUnit), versión, plugins o extensiones aprobados, y configuración base que deben heredar o aplicar todos los tests.

Debe documentar el framework de mocking aprobado con sus convenciones: librería de mocking (Mockito, unittest.mock, Jest mocks, Moq), cuándo usar mocks vs stubs vs fakes vs spies, qué componentes deben mockearse y cuáles deben usar implementaciones reales, y cómo organizar los mocks (inline, setup methods, ficheros de fixtures separados).

Debe incluir la convención de naming de tests: cómo nombrar clases de test (ClassNameTest, ClassNameSpec, test_module_name), cómo nombrar métodos de test (should_doX_when_Y, test_behavior_condition, descriptive sentence), y qué información debe transmitir el nombre del test (el comportamiento esperado, las condiciones, y el resultado).

Debe documentar la estructura interna de cada test: patrón AAA (Arrange-Act-Assert), Given-When-Then, o la variante adoptada por el proyecto. Debe especificar qué va en cada sección, cuántas assertions son aceptables por test (habitualmente una assertion lógica), y cuándo es válido tener múltiples assertions.

Debe incluir los criterios de cobertura requeridos: porcentaje mínimo de cobertura de líneas, porcentaje mínimo de cobertura de branches/condiciones, exclusiones aceptadas de la medición de cobertura (código generado, DTOs simples, configuración), y herramienta de medición de cobertura aprobada (JaCoCo, coverage.py, Istanbul, Coverlet).

Debe documentar las convenciones de datos de prueba: cómo se crean objetos de prueba (builders, factories, object mothers), cómo se gestionan fixtures de datos (archivos JSON/YAML, builders programáticos, bases de datos en memoria), y cómo se manejan datos sensibles en tests.

Debe incluir las convenciones de tests de integración: cómo se configura el entorno de integración (bases de datos en memoria, contenedores Docker con Testcontainers, servicios mock), cómo se aíslan tests de integración de tests unitarios, y cuándo se ejecutan (en cada build, solo en CI, periódicamente).

---

### B.4.16. `refactoring_guidelines.context.md` — Directrices de Refactorización

**Dominio**: Calidad y Testing

**Fases donde se utiliza**: 6 (uso primario — define qué mejorar y cómo), 7 (verificación de ausencia de code smells residuales)

**Fases donde se excluye explícitamente**: 0.1 a 5 (la refactorización es específica de Fase 6; introducir estas directrices antes contaminaría el enfoque de fases cuyo objetivo es funcionalidad, no calidad estética)

**Descripción**: Es el documento estrella de la Fase 6. Define el catálogo de code smells a detectar, las técnicas de refactoring aprobadas para corregirlos, las métricas de calidad objetivo, y los criterios de priorización de mejoras. Este archivo aparece exclusivamente en Fase 6 (como herramienta primaria) y Fase 7 (como criterio de verificación), siendo explícitamente excluido de todas las fases anteriores.

**Contenido requerido**:

Debe incluir el catálogo de code smells a detectar, adaptado al stack tecnológico del proyecto. Cada code smell debe documentar: nombre (Long Method, God Class, Feature Envy, Shotgun Surgery, Primitive Obsession, Data Clumps, Refused Bequest, etc.), descripción de cómo se manifiesta en el código del stack del proyecto, criterios cuantitativos para su detección (un método se considera "largo" a partir de cuántas líneas, una clase se considera "God Class" a partir de cuántas responsabilidades), y severidad (crítico, mayor, menor) que determina si su corrección es obligatoria u opcional.

Debe documentar las técnicas de refactoring aprobadas para cada code smell: la técnica recomendada (Extract Method, Extract Class, Move Method, Inline Method, Replace Conditional with Polymorphism, Introduce Parameter Object, Replace Temp with Query, etc.), las condiciones de aplicación (cuándo aplicar esta técnica y cuándo no), y las verificaciones post-refactoring (qué tests deben ejecutarse, qué métricas deben verificarse).

Debe incluir las métricas de calidad objetivo con sus umbrales: complejidad ciclomática máxima por método (habitualmente entre 5 y 10), número máximo de líneas por método, número máximo de líneas por clase/archivo, cohesión mínima aceptable (LCOM, LCOM4), acoplamiento máximo aceptable (Ce, Ca), profundidad máxima de herencia, y cualquier otra métrica que el proyecto haya adoptado. Cada umbral debe indicar si es un hard limit (violación bloqueante) o un soft limit (objetivo deseable).

Debe documentar los criterios de priorización de refactorización: cómo decidir qué smells corregir primero cuando hay múltiples hallazgos. Los criterios típicos incluyen severidad del smell, frecuencia de modificación del código afectado (código que se cambia frecuentemente se beneficia más de la refactorización), impacto en legibilidad, y riesgo de introducir regresiones.

Debe incluir la regla de oro de la refactorización en el contexto de GAIDD: toda refactorización debe preservar el comportamiento funcional verificado por la suite de tests de Fase 4.2. Si después de una refactorización algún test falla, la refactorización debe revertirse o corregirse hasta que todos los tests pasen nuevamente. La suite de tests es la red de seguridad absoluta.

Debe documentar las refactorizaciones prohibidas o restringidas: tipos de refactorización que requieren aprobación arquitectónica (cambiar la herencia de un componente, mover componentes entre módulos, alterar interfaces públicas de componentes compartidos), y refactorizaciones que están fuera del alcance de Fase 6 (cambios de arquitectura, migración de librerías, refactoring de esquema de base de datos).

---

### B.4.17. `existing_components_inventory.context.md` — Inventario de Componentes Existentes

**Dominio**: Arquitectura y Estructura (complementario)

**Fases donde se utiliza**: 1 (identificación de componentes afectados), 2 (planificación de modificaciones), 2.1 (validación), 3 (diseño de integraciones), 3.1 (validación), 4 (especificación de pruebas de integración), 4.1 (validación), 4.2 (implementación de tests), 5 (integración con existentes), 6 (identificación de consolidación)

**Fases donde se excluye explícitamente**: 7 (integraciones ya validadas por tests)

**Descripción**: Contiene el catálogo de los componentes principales del proyecto: clases, servicios, módulos, utilities y otros elementos de código que existen actualmente en el sistema. Mientras `project_directory_tree.context.md` muestra DÓNDE están los archivos, este archivo describe QUÉ son, qué responsabilidad tienen, y qué interfaces públicas ofrecen. Es el mapa del código existente a nivel de abstracción de componente.

**Contenido requerido**:

Debe documentar cada componente principal con: nombre completo de la clase/módulo (incluyendo paquete), módulo o bounded context al que pertenece, responsabilidad descrita en una o dos oraciones concisas (qué hace, no cómo lo hace), tipo de componente (Controller, Service, Repository, Utility, Factory, EventHandler, Middleware, etc.), e interfaces públicas principales (métodos públicos más importantes con sus firmas simplificadas: nombre, parámetros de entrada con tipos, tipo de retorno).

Debe organizar los componentes por módulo o bounded context para facilitar la navegación y la carga selectiva. Cuando un requerimiento afecta solo un módulo específico, el desarrollador puede cargar solo la sección relevante del inventario.

Debe documentar las dependencias directas entre componentes: qué componentes usa cada componente para cumplir su responsabilidad. Esta información permite a la IA entender el grafo de dependencias y proponer diseños que se integren correctamente con lo existente.

Debe incluir los utilities y componentes compartidos que están disponibles para reutilización: helpers de fecha, formatters, validators, clases base, mixins, traits o cualquier otro elemento de código diseñado para ser reutilizado por múltiples componentes. Estos elementos son especialmente importantes para evitar que la IA genere código duplicado cuando ya existe un utility que cumple esa función.

Debe indicar el estado de cada componente: activo (en uso), deprecated (aún funciona pero está siendo reemplazado), o legacy (funciona pero no se recomienda para nuevo código). Esta información evita que la IA integre nuevas funcionalidades con componentes que están en proceso de retiro.

Para proyectos muy grandes, el inventario puede incluir solo componentes del nivel más significativo (Services, Repositories, componentes principales de dominio) y omitir clases internas, DTOs simples y otras clases que no tienen lógica de negocio significativa. El criterio es: si un componente podría ser afectado por un requerimiento o podría ser reutilizado, debe estar en el inventario.

---

### B.4.18. `security_and_compliance_requirements.context.md` — Requisitos de Seguridad y Compliance

**Dominio**: Seguridad y Rendimiento

**Fases donde se utiliza**: 1 (identificación de restricciones de seguridad), 2 (planificación), 2.1 (validación), 3 (diseño de controles de seguridad), 3.1 (validación), 4 (especificación de pruebas de seguridad), 4.1 (validación), 4.2 (implementación de tests de seguridad), 5 (implementación de controles), 7 (verificación de seguridad)

**Fases donde se excluye explícitamente**: 6 (controles de seguridad ya implementados — invariante de funcionalidad)

**Carga condicional**: Se carga cuando el requerimiento involucra autenticación, autorización, datos personales (PII), datos financieros, auditoría, o áreas reguladas. En Fase 7 se recomienda cargar siempre para verificación básica de seguridad (OWASP top 5).

**Descripción**: Documenta todos los requisitos de seguridad y cumplimiento regulatorio que el código del proyecto debe satisfacer. Es el documento que garantiza que el software no solo funcione correctamente, sino que proteja los datos, los usuarios y la organización contra amenazas y violaciones normativas.

**Contenido requerido**:

Debe documentar la estrategia de autenticación del proyecto: mecanismo (JWT, sesiones, OAuth2, SAML, API keys), implementación (librería utilizada, flujo de autenticación), gestión de tokens (duración, renovación, revocación), y reglas de manejo de credenciales (almacenamiento de hashes, algoritmo de hashing aprobado, política de rotación de secretos).

Debe incluir la estrategia de autorización: modelo (RBAC, ABAC, ACL), roles definidos con sus permisos, cómo se implementa la verificación de permisos en el código (annotations, middleware, decorators), y reglas de escalación de privilegios (cómo se manejan operaciones administrativas).

Debe documentar las reglas de protección de datos: qué datos son considerados sensibles (PII, datos financieros, datos de salud), cómo deben encriptarse en reposo y en tránsito, qué algoritmos de encriptación están aprobados, cómo se manejan las claves de encriptación, y qué datos nunca deben aparecer en logs, respuestas de error, URLs o cualquier otro canal no seguro.

Debe incluir las reglas de validación de entrada: qué validaciones de seguridad son obligatorias para toda entrada de usuario (sanitización contra XSS, prevención de SQL injection, validación de tipos y rangos, límites de tamaño de payload), dónde debe implementarse la validación (en la capa de entrada, nunca confiando en validación del cliente), y qué librería o mecanismo usar.

Debe documentar los requisitos de auditoría: qué operaciones deben registrarse en log de auditoría (accesos, modificaciones de datos sensibles, cambios de permisos, operaciones financieras), qué información incluir en cada registro de auditoría (quién, qué, cuándo, desde dónde, resultado), y cuánto tiempo deben conservarse los registros.

Debe incluir los requisitos de cumplimiento regulatorio si aplican: GDPR (derecho al olvido, consentimiento, portabilidad de datos), HIPAA (protección de datos de salud), PCI-DSS (manejo de datos de tarjetas), SOX (controles financieros), o cualquier otra regulación aplicable al proyecto. Cada requisito regulatorio debe traducirse en reglas técnicas concretas que el código debe implementar.

Debe documentar los headers de seguridad HTTP requeridos: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security, y otros headers que deben configurarse, junto con sus valores aprobados.

Debe incluir la política de CORS: qué orígenes están permitidos, qué métodos y headers se aceptan, y si se permiten credenciales en solicitudes cross-origin.

---

### B.4.19. `performance_benchmarks_and_thresholds.context.md` — Umbrales de Rendimiento

**Dominio**: Seguridad y Rendimiento

**Fases donde se utiliza**: 3 (diseño considerando performance), 3.1 (validación), 4 (especificación de pruebas de performance), 4.1 (validación), 4.2 (implementación de tests de performance), 5 (implementación optimizada), 6 (optimización de rendimiento), 7 (verificación de cumplimiento de umbrales)

**Fases donde se excluye explícitamente**: 0.1 a 2.1 (optimización específica no relevante para análisis y planificación de alto nivel)

**Carga condicional**: Se carga cuando el requerimiento tiene requisitos no funcionales de performance, cuando la Fase 1 identifica preocupaciones de rendimiento, o cuando el desarrollador detecta problemas de performance durante implementación.

**Descripción**: Define los umbrales cuantitativos de rendimiento que el código debe cumplir, los benchmarks de referencia, y las estrategias de optimización aprobadas. Es el documento que convierte requisitos no funcionales abstractos ("debe ser rápido") en métricas medibles y verificables.

**Contenido requerido**:

Debe documentar los umbrales de tiempo de respuesta por tipo de operación: tiempo máximo aceptable para operaciones síncronas de lectura (queries simples, búsquedas), tiempo máximo para operaciones de escritura (inserciones, actualizaciones), tiempo máximo para operaciones complejas (reportes, agregaciones), y tiempo objetivo (el ideal a alcanzar, no solo el máximo aceptable). Los umbrales deben expresarse en percentiles: P50 (mediana), P95 y P99 son los más comunes.

Debe incluir los umbrales de throughput: cuántas operaciones por segundo debe soportar el sistema en condiciones normales y en pico, para los flujos más críticos del negocio.

Debe documentar los umbrales de uso de recursos: consumo máximo de memoria por operación o por instancia, uso máximo de CPU, conexiones máximas simultáneas a base de datos, y cualquier otro recurso que tenga límites conocidos.

Debe incluir las estrategias de optimización aprobadas: qué técnicas de caching están permitidas (in-memory, Redis, HTTP cache), cuándo usar procesamiento asíncrono versus síncrono, cuándo usar paginación y con qué tamaños de página, cuándo usar lazy loading versus eager loading, y cuándo usar batch processing.

Debe documentar los antipatrones de performance que deben evitarse: queries N+1, serialización innecesaria de objetos grandes, polling cuando se puede usar push/events, procesamiento síncrono de operaciones que no requieren respuesta inmediata, y carga completa de colecciones cuando se necesitan pocos elementos.

Debe incluir los criterios de medición: cómo se mide el rendimiento (herramientas de profiling aprobadas, configuración de tests de carga), bajo qué condiciones se mide (volumen de datos en la base de datos, número de usuarios concurrentes simulados), y con qué frecuencia se ejecutan benchmarks.

---

### B.4.20. `reference_test_examples.context.md` — Ejemplos de Tests de Referencia (Archivo Opcional)

**Dominio**: Referencia

**Fases donde se utilizaría**: Las mismas que `reference_code_examples.context.md` donde se involucran tests: 4, 4.1, 4.2, 6, 7.

**Estado**: Opcional. Se crea solo si el volumen de ejemplos de tests justifica un archivo separado.

**Descripción**: Archivo complementario a `reference_code_examples.context.md` que contiene exclusivamente ejemplos de tests de referencia. Su creación es una decisión del equipo basada en volumen: si los ejemplos de tests dentro de `reference_code_examples.context.md` superan aproximadamente el 40% del contenido total del archivo, la separación es recomendable para optimizar la carga de contexto en fases que necesitan solo ejemplos de código de producción o solo ejemplos de tests.

**Contenido requerido** (si se crea):

Debe seguir la misma estructura y convenciones que `reference_code_examples.context.md` pero focalizado exclusivamente en tests. Debe incluir: un test unitario ejemplar que demuestre el naming correcto, la estructura AAA o Given-When-Then, assertions significativas, y manejo de mocks/stubs según los estándares del proyecto; un test de integración ejemplar que demuestre configuración de entorno de integración, manejo de datos de prueba, y limpieza post-test; y si aplica, un test de componente o end-to-end que demuestre la estructura y convenciones adoptadas para ese nivel.

---

### B.5. Matriz de Uso por Fase

La siguiente matriz resume qué archivos de contexto se cargan en cada fase de la metodología. La lectura de esta matriz debe complementarse con las notas de carga condicional documentadas en cada archivo.

**Leyenda**: ● = Obligatorio | ◐ = Condicional | ○ = Excluido explícitamente | — = No aplica

| Archivo de Contexto | 0 | 0.1 | 1 | 2 | 2.1 | 3 | 3.1 | 4 | 4.1 | 4.2 | 5 | 6 | 7 |
|---------------------|:-:|:---:|:-:|:-:|:---:|:-:|:---:|:-:|:---:|:---:|:-:|:-:|:-:|
| `project_architecture` | — | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| `project_architecture_standards` | — | — | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| `architecture_decision_records` | — | — | ● | ● | ● | ● | ● | ○ | ○ | ○ | ○ | ○ | ● |
| `project_directory_tree` | — | — | ● | ● | ● | ● | ● | ○ | ○ | ● | ● | ○ | ● |
| `project_structure_principles` | — | ● | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| `business_domain_dictionary` | — | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| `tech_stack_constraints` | — | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● |
| `deployment_and_infrastructure_context` | — | — | ◐ | ◐ | ◐ | ◐ | ◐ | ○ | ○ | ○ | ○ | ○ | ● |
| `database_schema` | — | — | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| `api_integration_contracts` | — | — | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ○ | ○ |
| `code_style_guide` | — | — | ○ | ○ | ○ | ● | ● | ○ | ○ | ● | ● | ● | ● |
| `error_handling_and_logging_standards` | — | — | ○ | ○ | ○ | ● | ● | ● | ● | ● | ● | ● | ● |
| `documentation_templates` | — | — | ○ | ○ | ○ | ● | ● | ○ | ○ | ○ | ● | ● | ● |
| `reference_code_examples` | — | — | ○ | ○ | ○ | ● | ● | ● | ● | ● | ● | ● | ○ |
| `testing_standards_and_patterns` | — | — | ○ | ● | ● | ● | ● | ● | ● | ● | ○ | ○ | ● |
| `refactoring_guidelines` | — | — | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● | ● |
| `existing_components_inventory` | — | — | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ |
| `security_and_compliance_requirements` | — | — | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ○ | ◐ |
| `performance_benchmarks_and_thresholds` | — | — | ○ | ○ | ○ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ |

**Totales por fase** (obligatorios + condicionales máximos):

| Fase | 0 | 0.1 | 1 | 2 | 2.1 | 3 | 3.1 | 4 | 4.1 | 4.2 | 5 | 6 | 7 |
|------|:-:|:---:|:-:|:-:|:---:|:-:|:---:|:-:|:---:|:---:|:-:|:-:|:-:|
| Obligatorios | 0 | 4 | 9 | 9 | 9 | 13 | 13 | 8 | 8 | 10 | 9 | 7 | 9 |
| Condicionales | 0 | 0 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 1 | 3 |
| Máximo total | 0 | 4 | 12 | 12 | 12 | 16 | 16 | 11 | 11 | 13 | 11 | 8 | 12 |

### B.6. Principios de Evolución de Contexto entre Fases

La matriz anterior refleja cinco principios que gobiernan cómo evoluciona el contexto a lo largo de la metodología:

**Principio de Herencia**: Las fases de validación (x.1) cargan exactamente los mismos archivos que su fase de generación correspondiente (x). Si Fase 2 cargó condicionalmente `api_integration_contracts.context.md`, Fase 2.1 también debe cargarlo.

**Principio de Acumulación Progresiva (Fases 0.1 → 3)**: El contexto crece a medida que se avanza de análisis a diseño. Fase 0.1 usa 4 archivos, Fase 1 usa 12, y Fase 3 alcanza el máximo con 16 archivos.

**Principio de Transición de Contexto (Fases 3 → 4)**: Al pasar del diseño a la especificación de pruebas, se excluyen archivos de diseño abstracto (ADRs, directory tree, structure principles) y se mantienen los de comportamiento concreto.

**Principio de Reducción Drástica (Fases 5 → 6)**: La refactorización produce la reducción más significativa de contexto en toda la metodología, pasando de 11 archivos a 8. Se eliminan todos los archivos de datos e integración porque el comportamiento ya está implementado e inmutable.

**Principio de Amplificación Final (Fases 6 → 7)**: La verificación integral reintroduce archivos que estuvieron ausentes en las fases intermedias (ADRs, deployment, testing standards, tech stack) para una certificación multi-dimensional completa.

