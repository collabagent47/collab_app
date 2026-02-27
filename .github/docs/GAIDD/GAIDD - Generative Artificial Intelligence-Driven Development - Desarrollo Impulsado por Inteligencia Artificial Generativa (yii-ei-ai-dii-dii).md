# Desarrollo Impulsado por Inteligencia Artificial Generativa (GAIDD) - Generative AI-Driven Development

## Introducción

La presente metodología establece un proceso estructurado para el desarrollo de software utilizando inteligencia artificial generativa como herramienta de asistencia técnica. Este enfoque garantiza la aplicación de principios SOLID, patrones de diseño y prácticas de Clean Code, mientras mantiene la trazabilidad desde los requerimientos hasta la implementación final.

La metodología se fundamenta en **Test-Driven Development (TDD)** y en el principio crítico de **Human in the Loop**, donde el desarrollador es el único responsable de todos los entregables generados por la IA. La inteligencia artificial actúa como amplificador del proceso de desarrollo: si se le proporciona información correcta, amplificará esa calidad; si se le proporciona información deficiente, amplificará esos defectos.

### Principios Fundamentales

La metodología se basa en los siguientes principios de desarrollo ágil y sostenible:

- **SOLID**: Aplicación rigurosa de principios de responsabilidad única, abierto/cerrado, sustitución de Liskov, segregación de interfaces y inversión de dependencias
- **Clean Code**: Código legible, mantenible y expresivo que comunica claramente su intención
- **KISS (Keep It Simple, Stupid)**: Simplicidad como criterio rector en todas las decisiones de diseño
- **DRY (Don't Repeat Yourself)**: Eliminación sistemática de duplicaciones mediante abstracciones apropiadas
- **YAGNI (You Aren't Gonna Need It)**: Implementación exclusiva de funcionalidades explícitamente requeridas
- **TDD (Test-Driven Development)**: Las pruebas se desarrollan primero, seguidas por la implementación del código de producción
- **Human in the Loop**: Revisión y validación humana obligatoria en todas las salidas generadas por IA

### Responsabilidad del Desarrollador

**CRÍTICO**: El desarrollador es el **único responsable** de todos los documentos, código y decisiones técnicas generadas durante el proceso, independientemente de que la IA haya participado en su creación. Esto implica:

- Leer y validar todos los documentos generados por IA
- Modificar, corregir o rechazar salidas que no sean apropiadas
- Aportar su experiencia y conocimiento en patrones, buenas prácticas y adherencia a la documentación del proyecto
- Dar el aval final antes de pasar a la siguiente fase
- No proceder si existen dudas o inconsistencias

La IA es una herramienta de asistencia que amplifica el trabajo del desarrollador, pero no sustituye su criterio técnico ni su responsabilidad profesional.

---

## Fase 0: Clasificación de Granularidad del Requerimiento

### Objetivoprompt eng

Determinar si el requerimiento recibido —ya sea formulado como requerimiento tradicional o como historia de usuario— posee el nivel de especificidad apropiado para iniciar el proceso de validación técnica, o si constituye un elemento de alto nivel que requiere descomposición antes de proceder con actividades de desarrollo.

### Entrada

- Requerimiento en cualquier formato (especificación funcional/no funcional, historia de usuario, épica, ticket de trabajo)

**NOTA IMPORTANTE**: Esta fase NO requiere contexto del proyecto. Únicamente se analiza el documento del requerimiento o historia de usuario proporcionada.

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con prompts específicos para análisis asistido. El desarrollador debe seleccionar el prompt apropiado según esté trabajando con:

- **Requerimientos funcionales y no funcionales**: [`phase_0.evaluation_high_level_requirement.prompt.md`](0.phase_0.evaluation_high_level_requirement.prompt.md)
- **Historias de usuario (metodología Ágile)**: [`phase_0.epic_vs_user-story_evaluation.prompt.md`](0.phase_0.epic_vs_user-story_evaluation.prompt.md)

Ejecutar un análisis de granularidad según el formato del requerimiento recibido:

#### Para Requerimientos Tradicionales (Especificaciones Funcionales o No Funcionales)

Evaluar contra los ocho criterios de calidad establecidos por estándares IEEE 830 e ISO/IEC/IEEE 29148:

1. **Completo:** Verificar que contenga toda la información necesaria (actores, entradas, salidas, condiciones, restricciones)
2. **Correcto:** Confirmar que refleje una necesidad real y válida del negocio o usuario
3. **Sin ambigüedad:** Validar que tenga una única interpretación posible sin términos vagos
4. **Verificable:** Asegurar que pueda probarse objetivamente con criterios de aceptación medibles
5. **Factible:** Confirmar que sea técnica y económicamente implementable
6. **Necesario:** Validar que aporte valor real justificable
7. **Específico:** Determinar si posee detalle suficiente para diseñar e implementar directamente (criterio crítico de clasificación)
8. **Trazable:** Verificar que sea identificable y relacionable con objetivos de negocio

**Criterio decisivo:** Si el requerimiento NO cumple el criterio "Específico" —independientemente de su calificación en los otros siete criterios— se clasifica como **Requerimiento de Alto Nivel** que requiere descomposición obligatoria en Requerimientos Funcionales y No Funcionales específicos.

#### Para Historias de Usuario (Formato Agile)

Evaluar contra los criterios INVEST de calidad de historias de usuario:

1. **Independent (Independiente):** Verificar que pueda desarrollarse sin requerir completitud de otras historias. Debe ser independiente o depender únicamente de funcionalidades ya implementadas y disponibles
2. **Negotiable (Negociable):** Confirmar que describa QUÉ se necesita sin prescribir CÓMO implementarlo
3. **Valuable (Valiosa):** Validar que entregue valor tangible al usuario o negocio por sí misma
4. **Estimable (Estimable):** Asegurar que el equipo pueda estimar el esfuerzo con razonable confianza
5. **Small (Pequeña):** Determinar si puede completarse dentro de un sprint o iteración de 1-2 semanas (criterio crítico de clasificación)
6. **Testable (Verificable):** Confirmar que existan criterios claros para validar su completitud

**Criterio decisivo:** Si la historia NO cumple el criterio "Small" —especialmente si requiere múltiples sprints, abarca múltiples funcionalidades independientes, o involucra diversos subdominios del negocio— se clasifica como **Épica** que requiere descomposición obligatoria en Historias de Usuario derivadas.

### Criterios de Clasificación

**Requerimiento Tradicional Específico (Continuar a Fase 0.1):**

- Cumple los ocho criterios de calidad IEEE/ISO, especialmente el criterio "Específico"
- Posee detalle suficiente para que el equipo técnico pueda diseñar e implementar directamente
- Los criterios de aceptación son concretos, medibles y acotados
- No requiere investigación extensiva ni descomposición adicional para iniciar diseño técnico

**Requerimiento de Alto Nivel (Requiere Descomposición - NO PROCEDER):**

- NO cumple el criterio "Específico" de los estándares IEEE/ISO
- Utiliza lenguaje genérico o abstracto ("gestionar", "administrar", "sistema completo", "plataforma integral")
- Carece de cuantificación en aspectos críticos (tiempos de respuesta, volúmenes de datos, umbrales de rendimiento)
- Abarca múltiples funcionalidades o atributos de calidad que podrían especificarse independientemente
- Requiere refinamiento significativo para alcanzar nivel de detalle implementable
- **Acción requerida**: El desarrollador debe devolver el requerimiento inmediatamente indicando que no es viable para desarrollo y que requiere descomposición

**Historia de Usuario Válida (Continuar a Fase 0.1):**

- Cumple los seis criterios INVEST, especialmente el criterio "Small"
- Puede completarse dentro de un sprint estándar de 1-2 semanas
- Entrega valor independiente al usuario sin requerir otras historias
- Posee alcance acotado que permite estimación confiable del equipo

**Épica (Requiere Descomposición - NO PROCEDER):**

- NO cumple el criterio "Small" de la metodología INVEST
- Requiere múltiples sprints para su completitud
- Engloba múltiples objetivos de usuario que podrían priorizarse independientemente
- Contiene indicadores de amplitud excesiva ("completo", "integral", "todos los aspectos")
- Involucra múltiples actores, flujos de trabajo o subdominios del negocio que justifican separación
- **Acción requerida**: El desarrollador debe devolver la épica inmediatamente indicando que no es viable para desarrollo y que requiere descomposición en historias de usuario más pequeñas

### Entregable

Reporte de clasificación de granularidad que especifique:

**Para Requerimientos Tradicionales:**

- Evaluación sistemática de los ocho criterios IEEE/ISO con calificación individual
- Clasificación como "Requerimiento Específico" o "Requerimiento de Alto Nivel"
- Justificación técnica basada en evidencia del texto analizado
- **Si es Específico:** Aprobación para continuar a Fase 0.1 (Validación de Completitud)
- **Si es Alto Nivel:** Propuesta de descomposición en Requerimientos Funcionales (RF) y No Funcionales (RNF) con categorización apropiada, cuantificación de RNF, y solicitud de refinamiento formal

**Para Historias de Usuario:**

- Evaluación sistemática de los seis criterios INVEST con calificación individual
- Clasificación como "Historia de Usuario Válida" o "Épica"
- Justificación basada en evidencia del texto analizado
- **Si es Historia de Usuario:** Aprobación para continuar a Fase 0.1 (Validación de Completitud)
- **Si es Épica:** Propuesta de descomposición en Historias de Usuario derivadas que cumplan INVEST individualmente, con identificación de dependencias y sugerencias de priorización

### Responsabilidad del Desarrollador

El desarrollador debe:

- Aplicar rigurosamente los criterios de calidad establecidos por estándares internacionales (IEEE/ISO para requerimientos tradicionales, INVEST para historias de usuario) sin realizar suposiciones
- **Leer y validar** el reporte generado por la IA, verificando que la clasificación sea correcta
- Cuando se identifique un elemento de alto nivel o épica, **NO ACEPTAR** el requerimiento y documentar específicamente las deficiencias detectadas
- Solicitar formalmente al product owner, analista de negocio o responsable del backlog la descomposición necesaria antes de proceder con análisis técnico
- **Dar el aval final** al reporte antes de continuar o devolver el requerimiento

### Notas Importantes

**Flujos Divergentes**: Esta fase tiene dos caminos posibles:

1. **Camino Negativo (Unhappy Path)**: Si se detecta requerimiento de alto nivel o épica, la metodología termina aquí. El desarrollador debe comunicar: "Este requerimiento/historia no puede desarrollarse en su estado actual. Requiere descomposición porque tiene trabajo excesivo oculto."

2. **Camino Positivo (Happy Path)**: Si es un requerimiento específico o historia de usuario válida, se continúa a Fase 0.1.

**Human in the Loop**: El desarrollador debe revisar siempre la salida de la IA. Si algo no convence, debe modificarse o regenerarse. Si la salida es totalmente incorrecta, revisar el contexto proporcionado.

Esta fase constituye el primer filtro de calidad que previene el ingreso de elementos mal granulados al proceso de desarrollo. Un Requerimiento de Alto Nivel o una Épica que se intenten implementar sin descomposición apropiada generan inevitablemente:

- Diseños técnicos incompletos que no contemplan todas las funcionalidades implícitas
- Estimaciones erróneas que subestiman significativamente el esfuerzo real
- Implementaciones parciales sin valor demostrable para el negocio
- Cambios de alcance continuos durante el desarrollo cuando se descubren funcionalidades adicionales
- Entregas fragmentadas que no satisfacen las expectativas del usuario final
- Criterios de aceptación ambiguos que generan conflictos en la validación de completitud

El desarrollador debe actuar como validador objetivo de granularidad, aplicando criterios reconocidos internacionalmente sin ceder a presiones para iniciar desarrollo sobre elementos insuficientemente refinados. La descomposición de Requerimientos de Alto Nivel en Requerimientos Específicos, o de Épicas en Historias de Usuario, es responsabilidad del área de análisis de negocio o product ownership —no del equipo técnico durante la implementación.

---

## Fase 0.1: Validación de Completitud y Viabilidad Técnica del Requerimiento

### Objetivo

Asegurar que el artefacto recibido —requerimiento funcional, requerimiento no funcional o historia de usuario— sea completo, claro y técnicamente alcanzable antes de iniciar actividades de análisis técnico, aplicando criterios de validación específicos según el tipo de artefacto.

### Entrada

- Artefacto a validar (requerimiento funcional, requerimiento no funcional o historia de usuario) que haya sido aprobado en Fase 0

- **Para validación de completitud**: Únicamente el documento del requerimiento o historia de usuario (no requiere contexto del proyecto)
  - `business_domain_dictionary.context.md`: Glosario canónico de términos de negocio del dominio con definiciones precisas, sinónimos aceptados/rechazados, relaciones entre conceptos y ejemplos de uso correcto/incorrecto en contexto.
    - **Propósito**: Validar que el requerimiento/historia de usuario esté libre de ambigüedades terminológicas. Detectar términos vagos, polisémicos o indefinidos que impidan interpretación única. Verificar que el lenguaje del requerimiento es consistente con el lenguaje ubicuo establecido del dominio (principio DDD).
    - **Criterios de rechazo**:
      - Requerimiento usa términos **no definidos** en el diccionario sin contexto suficiente para inferir significado unívoco
      - Requerimiento usa **sinónimos rechazados** cuando existe término canónico (ej. usa "comprador" cuando el término oficial es "cliente")
      - Requerimiento contiene **ambigüedad semántica** (ej. "procesamiento" sin especificar qué tipo de procesamiento según taxonomía del dominio)
      - Términos de negocio se usan de manera **inconsistente** dentro del mismo requerimiento

- **Para validación de viabilidad técnica**: Stack tecnológico del proyecto, arquitectura existente, restricciones técnicas del proyecto:
  - `tech_stack_constraints.context.md`: Inventario exhaustivo y actualizado de tecnologías permitidas/prohibidas con versiones exactas, librerías aprobadas por categoría, antipatrones tecnológicos vetados y restricciones de deployment/infraestructura.
    - **Propósito**: Detectar tempranamente si el requerimiento solicita o implica uso de tecnologías no soportadas, versiones incompatibles, librerías no aprobadas o antipatrones prohibidos. Validar viabilidad técnica antes de invertir esfuerzo en diseño. Evitar requerimientos que demanden cambios de stack tecnológico (los cuales requieren proceso separado de evaluación arquitectónica estratégica).
    - **Criterios de rechazo**:
      - Requerimiento **menciona explícitamente** tecnología/framework/librería no listada en el stack aprobado (ej. "implementar con Django" cuando el stack es Spring Boot)
      - Requerimiento **implica necesidad** de tecnología no disponible (ej. "procesamiento de video en tiempo real" cuando el stack no incluye librerías de video)
      - Requerimiento demanda **versión específica incompatible** con la establecida (ej. "usar features de Java 21" cuando el proyecto está en Java 17)
      - Requerimiento describe solución que **requiere antipatrón prohibido** (ej. "crear singleton global para estado compartido")
      - Requisitos no funcionales **exceden capacidades** del stack (ej. "soportar 100K requests/segundo" cuando la infraestructura actual es monolítica sin capacidad de escalado horizontal)

  - `project_architecture.context.md`: Descripción de alto nivel (C4 Level 1-2) del estilo arquitectónico, módulos/componentes principales, responsabilidades de cada módulo, flujo de datos, patrones estructurales adoptados y restricciones de acoplamiento entre componentes.
    - **Propósito**: Determinar si el requerimiento es compatible con la arquitectura existente o si requiere refactorización arquitectónica significativa. Validar que el requerimiento respeta bounded contexts (DDD), no viola segregación de responsabilidades entre módulos, y se puede implementar sin introducir acoplamiento prohibido. Detectar requerimientos que son demasiado grandes porque tocan múltiples bounded contexts independientes.
    - **Criterios de rechazo**:
      - Requerimiento **viola bounded contexts** establecidos (ej. mezcla lógica de facturación con gestión de inventario cuando están en contextos separados)
      - Implementación requiere **refactor arquitectónico mayor** (ej. cambiar de arquitectura en capas a hexagonal, introducir nuevo patrón estructural no existente)
      - Requerimiento introduce **acoplamiento prohibido** entre módulos que deben permanecer independientes (ej. módulo de presentación accediendo directamente a base de datos)
      - Funcionalidad demandada **no encaja conceptualmente** en ningún módulo existente sin violar Single Responsibility Principle
      - Requerimiento abarca **múltiples módulos independientes** sin cohesión clara → señal de que debería descomponerse en múltiples requerimientos/historias (viola criterio "Small" de INVEST)

  - `project_structure_principles.context.md`: Convenciones de organización física del código en el sistema de archivos, estructura de carpetas por módulo/feature/capa, límites de profundidad de directorios, criterios de cohesión para agrupar archivos, nomenclatura de carpetas y criterios de dispersión aceptable para cambios.
    - **Propósito**: Estimar la dispersión del impacto del requerimiento en el código base. Validar el criterio "Small" de INVEST evaluando si la implementación estaría cohesionada en una ubicación/módulo específico o dispersa en múltiples features/módulos independientes. Detectar requerimientos que por su naturaleza dispersa indican que deberían dividirse en historias más pequeñas.
    - **Criterios de rechazo**:
      - Implementación del requerimiento requiere **modificar >3 features/módulos independientes** (umbral configurable según complejidad del proyecto)
      - Cambios necesarios **exceden límite de dispersión** definido para un solo sprint (ej. tocar >15 archivos en >5 carpetas diferentes)
      - Requerimiento viola **principios de cohesión** establecidos (ej. requiere mezclar código de diferentes capas arquitectónicas en misma ubicación)
      - Estimación de profundidad de cambios **excede capacidad de un sprint** (indicador de que el requerimiento es una épica disfrazada)
      - Requerimiento demanda crear **nueva estructura de carpetas** no contemplada en los principios → señal de feature arquitectónicamente significativa que requiere análisis separado

#### Notas de Implementación

**Orden de evaluación recomendado**:

1. Validación semántica con `business_domain_dictionary.context.md` (detectar ambigüedades)
2. Viabilidad tecnológica con `tech_stack_constraints.context.md` (rechazar incompatibilidades de stack)
3. Compatibilidad arquitectónica con `project_architecture.context.md` (validar encaje en arquitectura)
4. Estimación de dispersión con `project_structure_principles.context.md` (validar granularidad)

**Razón del orden**: No tiene sentido evaluar arquitectura si el stack tecnológico es incompatible. No tiene sentido evaluar dispersión si la arquitectura es incompatible. Cada nivel de validación presupone que el anterior fue exitoso.

**Umbral de rechazo acumulativo**: Si el requerimiento es rechazado por **cualquiera** de los cuatro archivos de contexto, debe devolverse al solicitante. No proceder a Fase 1 bajo ninguna circunstancia si existe al menos un criterio de rechazo activado.

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un único prompt para análisis asistido que realiza tanto la validación de completitud como de viabilidad técnica.

- **Prompt**: [`phase_0-1.requirement_validation.prompt.md`](0.phase_0-1.requirement_validation.prompt.md)

Ejecutar una validación sistemática adaptativa que incluya:

1. **Identificación del tipo de artefacto:** Determinar si es requerimiento funcional formal, requerimiento no funcional o historia de usuario, lo cual determina los criterios de validación específicos a aplicar
2. **Validación de completitud según tipo:**
   - **Requerimientos funcionales/no funcionales:** Descripción clara de funcionalidad, criterios de aceptación verificables, restricciones técnicas y de negocio documentadas, dependencias identificadas
   - **Historias de usuario:** Estructura narrativa completa (Como [rol] Quiero [funcionalidad] Para [beneficio]), valor de negocio explícito, criterios de aceptación en formato BDD (Dado-Cuando-Entonces) o equivalente estructurado, Definition of Done cuando aplique

3. **Análisis de claridad:** Confirmar ausencia de términos ambiguos, lenguaje técnicamente apropiado, criterios de aceptación inequívocos. Para historias de usuario: beneficio de negocio claro, rol bien definido, sin mezcla de múltiples funcionalidades

4. **Validación de criterios de calidad específicos:**
   - **Requerimientos formales:** Coherencia técnica, alineación con estándares arquitectónicos, trazabilidad con documentación existente
   - **Historias de usuario:** Validación detallada de criterios INVEST (Independiente, Negociable, Valiosa, Estimable, Small, Testeable) con evaluación individual de cada criterio

5. **Verificación de viabilidad técnica:** Validar viabilidad con infraestructura y stack tecnológico existente, ausencia de bloqueadores técnicos, granularidad apropiada (historias no demasiado grandes ni atómicamente pequeñas), estimación realizable dentro del ciclo de desarrollo

6. **Identificación de dependencias externas:** Detectar dependencias con sistemas, equipos o recursos externos, dependencias entre historias que afecten independencia, impacto en cronograma, recursos externos necesarios (APIs, permisos, datos). **Importante**: Si hay dependencias de funcionalidades no implementadas, el requerimiento no puede aceptarse

7. **Validación de criterios de aceptación:**
   - **Requerimientos formales:** Medibles, verificables, completos, técnicamente precisos
   - **Historias de usuario:** Formato BDD o estructurado equivalente, testables automática o manualmente, cobertura de escenarios (feliz, alternativos, excepciones)

### Criterios de Validación

**Completitud:**

- **Requerimientos:** Funcionalidad especificada, criterios de aceptación definidos, restricciones documentadas, dependencias identificadas
- **Historias de usuario:** Estructura narrativa completa, rol identificado, valor de negocio explícito, criterios BDD o estructurados presentes

**Claridad:**

- No existen términos ambiguos o sujetos a múltiples interpretaciones
- El lenguaje utilizado es preciso y técnicamente apropiado
- Los criterios de aceptación son inequívocos

**Calidad específica:**

- **Requerimientos:** Coherentes técnicamente, alineados con arquitectura
- **Historias de usuario:** Cumplen los seis criterios INVEST

**Viabilidad Técnica:**

- La solución es técnicamente viable con infraestructura y stack tecnológico existente
- No existen bloqueadores técnicos identificados
- Granularidad apropiada para el ciclo de desarrollo
- Las dependencias identificadas están satisfechas o son manejables

### Entregable

Reporte de validación estructurado con las siguientes secciones:

1. **Identificación del Artefacto:** Tipo detectado (RF/RNF/HU), identificador o título
2. **Resumen Ejecutivo de Validación:** Conclusión de cumplimiento, decisión CONTINUAR/DEVOLVER, nivel de criticidad
3. **Validación de Completitud:** Evaluación detallada según tipo con elementos faltantes específicos
4. **Análisis de Claridad:** Términos ambiguos identificados con ejemplos concretos, interpretaciones múltiples posibles
5. **Validación de Criterios de Calidad Específicos:** Coherencia técnica para RF/RNF, evaluación INVEST completa para historias
6. **Verificación de Viabilidad Técnica:** Viabilidad con stack tecnológico, bloqueadores identificados, evaluación de granularidad
7. **Identificación de Dependencias Críticas:** Dependencias detalladas, impacto en viabilidad y cronograma, riesgos asociados, estado de dependencias (satisfechas/no satisfechas)
8. **Evaluación de Criterios de Aceptación:** Análisis de medibilidad y verificabilidad, cobertura de escenarios, criterios faltantes
9. **Riesgos Potenciales Identificados:** Riesgos si se implementa en estado actual, probabilidad e impacto, mitigaciones recomendadas
10. **Decisión y Recomendaciones:** Decisión explícita CONTINUAR/DEVOLVER con justificación, recomendaciones específicas y accionables, priorización de correcciones

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer y validar** el reporte generado por la IA
- Determinar objetivamente si el artefacto cumple con los criterios de validación establecidos según su tipo
- Para historias de usuario, validar rigurosamente el cumplimiento de criterios INVEST
- Si identifica deficiencias, **NO PROCEDER** y documentarlas específicamente
- Solicitar refinamiento al analista de negocio, product owner o autor del requerimiento antes de proceder con la Fase 1
- **Dar el aval final** antes de continuar o devolver el artefacto
- Aplicar su criterio técnico para validar que la evaluación de la IA es correcta

### Notas Importantes

**Human in the Loop**: El desarrollador es el único responsable de la decisión final. Debe leer el reporte, evaluarlo, modificarlo si es necesario, y dar su aval técnico. Si algo no convence, debe regenerarse el análisis o corregirse manualmente.

**Contexto de Entrada**: Esta fase tiene dos tipos de validación con necesidades diferentes:

- **Completitud**: Solo requiere el documento del requerimiento
- **Viabilidad Técnica**: Requiere además el stack tecnológico y contexto del proyecto

Esta fase previene retrabajos costosos al filtrar artefactos deficientes antes del análisis técnico profundo. Un requerimiento mal definido o una historia de usuario que viola INVEST genera diseños incorrectos, estimaciones erróneas e implementaciones que no satisfacen necesidades del negocio.

Para historias de usuario específicamente: violaciones al criterio "Small" indican épicas que debieron descomponerse en Fase 0, violaciones a "Independiente" revelan dependencias que comprometen flexibilidad de priorización, violaciones a "Testeable" imposibilitan validación de completitud.

Si el artefacto no cumple criterios de validación, debe devolverse para refinamiento antes de iniciar cualquier actividad técnica. La inversión en esta fase se recupera exponencialmente al evitar cambios de alcance, rediseños y reimplementaciones en fases avanzadas del desarrollo.

---

## Fase 1: Análisis y Comprensión de Requerimiento

### Objetivo

Establecer una comprensión técnica completa y precisa del requerimiento, incluyendo sus implicaciones arquitectónicas, restricciones tecnológicas y criterios de aceptación. El desarrollador debe comprender exactamente qué se debe hacer, cómo se debe hacer y por dónde comenzar la implementación.

### Entrada

- **Artefacto Principal**: Especificación formal del requerimiento (funcional o no funcional) o historia de usuario **validado y aprobado en Fase 0.1**.

**Contexto del Sistema (Para Análisis de Impacto y Comprensión):**

#### Contexto Arquitectónico

- `project_architecture.context.md`: Arquitectura de alto nivel (C4 Level 1-2)
  - **Propósito**: Identificar qué módulos/componentes arquitectónicos se verán afectados lógicamente (ej. "Servicio de Pagos", "Módulo de Autenticación"). Mapear el requerimiento a bounded contexts existentes.
  - **Contenido clave**: Módulos principales, responsabilidades, flujo de datos, bounded contexts (DDD)

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados y decisiones de diseño
  - **Propósito**: Comprender qué patrones deben aplicarse al implementar el requerimiento (Repository, Service Layer, Factory, etc.). Garantizar que el análisis proponga soluciones consistentes con estándares establecidos.
  - **Contenido clave**: Patrones aprobados con ejemplos, antipatrones prohibidos, principios de acoplamiento, decisiones arquitectónicas vigentes

- `architecture_decision_records.context.md`: Historial de decisiones arquitectónicas
  - **Propósito**: Conocer el contexto histórico de por qué ciertas decisiones se tomaron. Evitar proponer análisis que contradigan ADRs activos. Identificar si el requerimiento afecta áreas con decisiones arquitectónicas críticas.
  - **Contenido clave**: ADRs relevantes al área afectada, decisiones activas vs obsoletas
  - **Optimización**: Cargar solo ADRs relacionados con módulos identificados como afectados

#### Contexto de Dominio

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito**: Comprender la semántica de términos de negocio en el requerimiento. Si dice "calcular churn", "procesar transacción" o "validar elegibilidad", la IA debe conocer el significado exacto en este dominio específico para analizar correctamente la lógica requerida.
  - **Contenido clave**: Definiciones canónicas, relaciones entre conceptos, reglas de negocio asociadas a cada término

#### Contexto de Estructura de Código y Componentes Existentes

- `project_structure_principles.context.md`: Convenciones de organización de código
  - **Propósito**: Entender las convenciones de estructura (por feature, por capa, híbrido) para analizar dónde ubicar nuevos componentes conceptualmente.
  - **Contenido clave**: Principios de organización, límites de profundidad, criterios de cohesión

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito**: Conocer la estructura real del proyecto para analizar impacto. Mientras `project_structure_principles` describe CÓMO se organizan las cosas (convenciones), este archivo muestra DÓNDE están realmente los componentes actuales.
  - **Uso en Fase 1**: Identificar qué directorios y archivos se verán afectados por el requerimiento. Mapear componentes existentes a ubicaciones concretas en el código base.
  - **Contenido clave**: Estructura de carpetas actual, ubicación de módulos, organización de archivos por feature/capa

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito**: Conocer los componentes existentes para identificar cuáles se verán afectados o requieren modificación. Sin este inventario es imposible cumplir el entregable de "Identificación de componentes afectados o a crear".
  - **Uso en Fase 1**: Listar componentes que deben modificarse vs. crearse. Identificar dependencias entre componentes existentes y la nueva funcionalidad.
  - **Contenido clave**: Nombre de clase/servicio, módulo, responsabilidad en 1-2 líneas, interfaces/métodos públicos principales
  - **Optimización**: Si el proyecto es muy grande, incluir solo componentes del área afectada por el requerimiento

#### Contexto Tecnológico

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito**: Asegurar que el análisis no asuma capacidades no disponibles (ej. usar features de Java 21 en proyecto Java 17). Garantizar que las dependencias/librerías propuestas están aprobadas.
  - **Contenido clave**: Versiones exactas de lenguaje/runtime, frameworks, librerías aprobadas

- `database_schema.context.md`: Estructura de base de datos
  - **Propósito**: Si el requerimiento implica persistencia de datos, conocer esquema existente para determinar si hay tablas/relaciones que respetar, modificar o crear. Analizar impacto en integridad referencial.
  - **Optimización**: Incluir solo esquema de tablas relacionadas al área del requerimiento (no todo el esquema)
  - **Contenido clave**: Tablas relevantes, columnas, tipos de datos, índices, constraints, relaciones FK

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas relevantes (solo si aplica)
  - **Propósito**: Si el requerimiento implica consumir o exponer APIs, conocer contratos existentes para analizar compatibilidad, necesidad de versionado, o creación de nuevos endpoints.
  - **Optimización**: Cargar solo contratos de APIs relacionadas al requerimiento
  - **Contenido clave**: Especificaciones OpenAPI/Swagger, formatos de request/response, autenticación, rate limits
  - **Carga condicional**: Solo incluir si el requerimiento menciona integraciones o se identifica necesidad en análisis preliminar

#### Contexto de Seguridad (solo si aplica)

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito**: Si el requerimiento maneja datos sensibles, autenticación/autorización, o tiene implicaciones de compliance, el análisis debe identificar restricciones de seguridad desde esta fase.
  - **Carga condicional**: Incluir si el requerimiento toca: autenticación, autorización, datos personales (PII), datos financieros, auditoría, o áreas reguladas
  - **Contenido clave**: Políticas de autenticación/autorización, manejo de secretos, requisitos de encriptación, compliance (GDPR, HIPAA, PCI-DSS)

#### Contexto de Infraestructura (solo si aplica)

- `deployment_and_infrastructure_context.context.md`: Infraestructura y deployment
  - **Propósito**: Si el requerimiento tiene implicaciones de infraestructura o restricciones de deployment, el análisis debe identificarlas desde esta fase para evitar proponer soluciones inviables.
  - **Carga condicional**: Incluir si el requerimiento implica procesamiento de alto volumen, restricciones de memoria, entornos serverless, o cualquier aspecto condicionado por la infraestructura
  - **Contenido clave**: Tipo de entorno (serverless, containers, on-premise), límites de recursos (memoria, CPU, tiempo de ejecución), restricciones de red, configuraciones de deployment

**NOTA IMPORTANTE**: En esta fase **NO** se incluyen archivos de implementación:

- ❌ `code_style_guide.context.md` (estándares de sintaxis)
- ❌ `testing_standards_and_patterns.context.md` (estrategias de testing)
- ❌ `reference_code_examples.context.md` (ejemplos de código)
- ❌ `error_handling_and_logging_standards.context.md` (patrones de error)

**Razón**: Fase 1 analiza el **QUÉ** (alcance funcional), **DÓNDE** (ubicación en arquitectura/código) y **POR QUÉ** (contexto de dominio/decisiones), **NO el CÓMO** (sintaxis, patrones de implementación). Los archivos de implementación se cargan en Fases 2-3 (diseño) y Fases 4-5 (implementación).

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt específico definido para análisis técnico asistido. El desarrollador proporciona el requerimiento y el contexto arquitectónico para que la IA realice el análisis de comprensión.

- **Prompt**: [`phase_1.requirement_analysis_and_understanding.prompt.md`](1.phase_1.requirement_analysis_and_understanding.prompt.md)

El desarrollador debe ejecutar (con asistencia de IA) un análisis exhaustivo que incluya:

1. **Análisis de alcance:** Identificación precisa de las funcionalidades a implementar y su delimitación
2. **Evaluación de impacto:** Determinación de componentes del sistema que serán afectados o creados
3. **Identificación de restricciones:** Análisis de limitaciones técnicas, de rendimiento y de negocio que condicionan la implementación
4. **Mapeo de dependencias:** Identificación de componentes, servicios y sistemas externos involucrados en la solución
5. **Definición de criterios de aceptación técnicos:** Establecimiento de métricas verificables de completitud desde perspectiva técnica

### Entregable

Documento de análisis técnico que contenga:

- **Interpretación técnica del requerimiento**: Explicación clara de qué se debe implementar desde perspectiva técnica
- **Identificación de componentes afectados o a crear**: Lista de módulos, clases, servicios, APIs que se verán impactados o que deben crearse
- **Restricciones y dependencias identificadas**: Limitaciones técnicas, dependencias de otros componentes o sistemas, restricciones de negocio que afectan la implementación
- **Criterios de aceptación técnicos definidos**: Métricas y condiciones técnicas que confirmarán que el requerimiento está completamente implementado

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer y validar** el documento de análisis técnico generado por la IA
- Garantizar la comprensión completa del requerimiento antes de proceder con el diseño de la solución
- Asegurar que no existan ambigüedades técnicas en el análisis
- **Aprobar explícitamente** el documento antes de continuar
- Si no está seguro de algún aspecto del análisis, **NO PROCEDER** hasta aclarar las dudas
- Modificar o complementar el documento si identifica omisiones o errores
- Aportar su experiencia técnica para validar que el análisis es correcto y completo

**CRÍTICO**: Es el desarrollador quien da el aval a este análisis y comprensión. Debe leer el documento resultante y dar su aval técnico explícito antes de avanzar. La IA amplifica el trabajo, pero el desarrollador es responsable del resultado.

### Notas Importantes

**Human in the Loop**: El desarrollador debe leer el documento completo generado por la IA y aprobarlo, indicando: "Sí, esto es lo que realmente se entiende y se comprende por el requerimiento que se va a realizar."

**Contexto del Proyecto**: A partir de esta fase, el contexto del proyecto es esencial. El desarrollador debe verificar si dentro del proyecto existente esto es factible técnicamente y cómo se integraría con lo que ya existe.

---

## Fase 2: Planificación Arquitectónica de la Implementación

### Objetivo

Generar un plan de implementación arquitectónico que respete la arquitectura existente o propuesta, aplique patrones de diseño apropiados y mantenga la coherencia con los principios establecidos del proyecto. Este es un documento de planificación, **sin código de programación**.

### Entrada

- **Artefacto Principal**: Especificación formal del requerimiento (funcional o no funcional) o historia de usuario **validado en Fase 0.1**

- **Análisis Previo**: Documento de análisis técnico de la Fase 1 (comprensión del requerimiento y análisis de impacto)

**Contexto Arquitectónico y de Diseño:**

#### Fundamentos Arquitectónicos (CRÍTICO)

- `project_architecture.context.md`: Arquitectura de alto nivel existente (C4 Level 1-2)
  - **Propósito**: Comprender la arquitectura actual en la que se integrará la nueva funcionalidad. Identificar módulos, bounded contexts, flujo de datos existente.
  - **Uso en Fase 2**: Validar que el plan propuesto no rompa la arquitectura existente, respete bounded contexts, y mantenga coherencia con decisiones arquitectónicas previas.

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos y decisiones de diseño obligatorias
  - **Propósito**: Conocer QUÉ patrones DEBEN aplicarse (Repository, Service Layer, Factory, Dependency Injection). Garantizar que el plan arquitectónico use únicamente patrones aprobados.
  - **Uso en Fase 2**: Seleccionar patrones apropiados para cada componente del plan. Justificar selección de patrones. Evitar antipatrones prohibidos.
  - **Contenido clave**: Patrones aprobados con diagramas, cuándo usar cada patrón, antipatrones vetados, ejemplos arquitectónicos de referencia

- `architecture_decision_records.context.md`: Historial de decisiones arquitectónicas (ADRs)
  - **Propósito**: Conocer el CONTEXTO HISTÓRICO de por qué la arquitectura es como es. Evitar proponer planes que contradigan ADRs activos sin justificación explícita.
  - **Uso en Fase 2**: Consultar ADRs relacionados con el área del requerimiento. Si el plan debe contradecir un ADR existente, documentar explícitamente por qué y crear nuevo ADR.
  - **Optimización**: Cargar solo ADRs del área afectada (filtrar por módulos/componentes identificados en Fase 1)

#### Contexto de Componentes Existentes

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito**: Conocer la estructura física real del proyecto para planificar dónde ubicar nuevos componentes y módulos.
  - **Uso en Fase 2**: Planificar ubicación de nuevos archivos y directorios según la estructura existente. Identificar módulos existentes que se verán afectados. Verificar que la organización propuesta es consistente con convenciones del proyecto.

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito**: Conocer componentes existentes SIN cargar todo el código fuente (optimización de tokens). Listar clases/servicios principales con responsabilidades e interfaces públicas.
  - **Uso en Fase 2**: Identificar componentes que deben modificarse vs crear nuevos. Planificar cómo nuevos componentes se integran con existentes.
  - **Contenido**: Nombre de clase/servicio, módulo, responsabilidad en 1-2 líneas, interfaces/métodos públicos principales
  - **Generación**: Puede generarse automáticamente con herramientas de análisis estático o mantener manualmente
  - **Optimización**: Si el proyecto es muy grande, incluir solo componentes del área afectada (identificada en Fase 1)

#### Contexto de Dominio

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito**: Garantizar que los nombres de componentes, interfaces y contratos del plan usen terminología canónica del dominio.
  - **Uso en Fase 2**: Nombrar servicios, entidades, value objects, repositorios, casos de uso según lenguaje ubicuo. Ej. si el diccionario define "Cliente" (no "Usuario"), el plan debe usar `ClienteRepository`, no `UsuarioRepository`.

#### Contexto de Persistencia e Integraciones

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes al requerimiento)
  - **Propósito**: Planificar estrategia de persistencia. ¿Se crean nuevas tablas? ¿Se modifican existentes? ¿Qué relaciones deben respetarse?
  - **Uso en Fase 2**: Especificar qué entidades/agregados se persisten, qué repositorios se necesitan, qué tablas se afectan. Diseñar estrategia de migración de esquema si aplica.
  - **Optimización**: Incluir solo esquema del bounded context afectado

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito**: Si el plan requiere consumir APIs existentes o exponer nuevas, conocer contratos actuales para garantizar compatibilidad.
  - **Uso en Fase 2**: Diseñar adapters/wrappers para APIs externas. Definir contratos de nuevos endpoints si se expone API. Planificar versionado de API si se modifica contrato existente.
  - **Carga condicional**: Solo incluir si Fase 1 identificó necesidad de integraciones
  - **Optimización**: Cargar solo contratos de APIs relacionadas al requerimiento

#### Contexto de Restricciones Técnicas

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito**: Asegurar que el plan use solo frameworks/librerías aprobadas. Validar que las soluciones propuestas son compatibles con versiones del stack.
  - **Uso en Fase 2**: Seleccionar librerías aprobadas para casos de uso específicos (ej. "Usar Jackson para serialización JSON", "Usar Hibernate como ORM"). Evitar proponer tecnologías no aprobadas.

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito**: Integrar seguridad en el diseño arquitectónico (security by design). Identificar componentes que manejan datos sensibles, requieren autenticación/autorización, o tienen implicaciones de compliance.
  - **Uso en Fase 2**: Planificar autenticación/autorización de nuevos endpoints. Diseñar manejo de secretos/credenciales. Identificar datos que requieren encriptación. Especificar logging de auditoría si aplica.
  - **Carga condicional**: Crítico si el requerimiento toca autenticación, autorización, PII, datos financieros, compliance

#### Contexto de Infraestructura

- `deployment_and_infrastructure_context.context.md`: Infraestructura y deployment
  - **Propósito**: Integrar restricciones de infraestructura en la planificación arquitectónica. El plan debe considerar el entorno de ejecución real para diseñar soluciones viables.
  - **Uso en Fase 2**: Si el entorno es serverless, planificar funciones stateless. Si hay límites de memoria, planificar procesamiento en chunks. Considerar restricciones de concurrencia, networking, timeouts. Diseñar estrategia de deployment para nuevos componentes.
  - **Ejemplo**: Si el entorno tiene límite de 512MB y el requerimiento implica procesamiento de archivos grandes → planificar procesamiento streaming, no cargar todo en memoria.

#### Contexto de Testabilidad

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks aprobados y estrategias de pruebas
  - **Propósito**: Diseñar arquitectura TESTABLE. El plan debe especificar qué componentes serán mockeables, qué interfaces se expondrán para testing, cómo se inyectarán dependencias.
  - **Uso en Fase 2**: Identificar seams para testing. Diseñar componentes con bajo acoplamiento para facilitar unit tests. Especificar estrategia de integration tests. Considerar testabilidad al seleccionar patrones (ej. Dependency Injection facilita mocking).
  - **NOTA IMPORTANTE**: Esta es la PRIMERA fase donde se considera testing. El diseño arquitectónico debe ser intrínsecamente testable.
  - **Contenido clave**: Frameworks de testing aprobados, estrategias de mocking/stubbing, niveles de testing esperados (unit, integration, e2e)

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS EN ESTA FASE:**

❌ **NO incluir** (se usan en Fases 3-5):

- `code_style_guide.context.md` → Detalles sintácticos, Fase 2 NO genera código
- `reference_code_examples.context.md` → Ejemplos de implementación, útiles en Fase 3-5
- `error_handling_and_logging_standards.context.md` → Detalles de implementación, Fase 3
- `performance_benchmarks_and_thresholds.context.md` → Optimización específica, Fase 6
- `refactoring_guidelines.context.md` → Específico de Fase 6
- `documentation_templates.context.md` → Generación de documentación, Fases posteriores

**RAZÓN DE EXCLUSIONES**: Fase 2 es PLANIFICACIÓN ARQUITECTÓNICA (QUÉ componentes, QUÉ patrones, CÓMO se integran conceptualmente). NO genera código, por lo tanto NO necesita guías de sintaxis, ejemplos de código, o detalles de implementación. Esos archivos se cargan en Fases 3-5 cuando se diseña e implementa código específicamente.

**NOTA CRÍTICA SOBRE "CÓDIGO FUENTE"**:
No se carga código fuente completo del proyecto (inviable por tokens). En su lugar, se usa:

- `existing_components_inventory.context.md` → Abstracciones de componentes existentes (nombres, responsabilidades, interfaces públicas)

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt específico definido para diseño arquitectónico asistido.

- **Prompt**: [`phase_2.architectural_implementation_planning.prompt.md`](2.phase_2.architectural_implementation_planning.prompt.md)

Utilizar inteligencia artificial para diseñar un plan que incluya:

1. **Análisis arquitectónico:** Evaluación del impacto en la arquitectura existente o propuesta, identificación de áreas afectadas
2. **Selección de patrones:** Identificación de patrones de diseño apropiados para la solución según el contexto del proyecto
3. **Diseño de interfaces:** Definición de contratos entre componentes nuevos y existentes (interfaces, no código)
4. **Estrategia de integración:** Planificación de cómo se integrará la nueva funcionalidad con el código existente
5. **Consideraciones de rendimiento y escalabilidad:** Identificación de aspectos críticos de performance que deben considerarse en el diseño

### Entregable

Plan de implementación arquitectónica que especifique:

- **Componentes a crear o modificar**: Lista detallada de elementos arquitectónicos que se verán afectados
- **Patrones de diseño a aplicar**: Patrones específicos que se utilizarán y justificación de su selección
- **Interfaces y contratos definidos**: Especificación de interfaces (sin código), contratos entre componentes, APIs internas
- **Estrategia de integración con código existente**: Plan de cómo se conectará con la arquitectura actual
- **Consideraciones de rendimiento y escalabilidad**: Aspectos críticos que afectan performance y capacidad de crecimiento

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer y validar** el plan de implementación arquitectónica generado por la IA
- Validar que el plan propuesto mantenga la integridad arquitectónica del proyecto
- Verificar que sea consistente con los estándares arquitectónicos establecidos
- **NO APROBAR** el plan si existen dudas o inconsistencias
- **Dar el aval final** explícito antes de continuar a Fase 2.1
- Aplicar su experiencia en arquitectura para validar la viabilidad del plan

**CRÍTICO**: El desarrollador no puede simplemente aceptar la salida de la IA sin revisión. Debe leer el plan completo y aprobarlo técnicamente antes de proceder.

### Notas Importantes

**Sin Código**: Esta fase NO genera código de programación. Todo es análisis, planificación y documentación arquitectónica.

**Documentación de Testing**: Si el proyecto tiene documentación sobre cómo se debe hacer testing (herramientas, enfoques, estrategias), es muy importante incluirla en esta fase, ya que el diseño arquitectónico debe considerar la testabilidad.

**Human in the Loop**: El documento debe ser leído y aprobado por el desarrollador antes de continuar. Si requiere correcciones, este es el momento de hacerlas.

---

## Fase 2.1: Validación del Plan de Implementación Arquitectónica

### Objetivo

Verificar que el plan de implementación arquitectónica sea completo, coherente y técnicamente viable, identificando posibles gaps o inconsistencias antes de proceder con el diseño detallado (Fase 3).

### Entrada

**PRINCIPIO**: Fase 2.1 requiere **TODO el contexto usado en Fase 2** para validar coherencia del plan contra ese mismo contexto.

- **Artefacto a Validar**: Plan de implementación arquitectónica generado en Fase 2

- **Documentos de Entrada Originales** (los mismos que alimentaron Fase 2):
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1

**Contexto Arquitectónico y de Diseño (IDÉNTICO a Fase 2):**

#### Fundamentos Arquitectónicos (CRÍTICO)

- `project_architecture.context.md`: Arquitectura de alto nivel existente (C4 Level 1-2)
  - **Propósito en Fase 2.1**: Validar que el plan respete la arquitectura existente, no introduzca acoplamientos prohibidos, y mantenga coherencia con bounded contexts establecidos.
  - **Uso específico**: Verificar que componentes propuestos en el plan encajen en módulos/bounded contexts correctos. Detectar violaciones de segregación de responsabilidades.

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 2.1**: Validar que el plan use ÚNICAMENTE patrones aprobados y NO proponga antipatrones prohibidos. Verificar que la justificación de selección de patrones sea apropiada.
  - **Uso específico**: Para cada patrón propuesto en el plan, verificar que esté en la lista de patrones aprobados y que su uso sea apropiado para el contexto. Identificar si el plan propone antipatrones inadvertidamente.
  - **Criterio de rechazo**: Plan propone patrón no aprobado → recomendar corrección o solicitar justificación explícita + aprobación arquitectónica

- `architecture_decision_records.context.md`: Historial de decisiones arquitectónicas
  - **Propósito en Fase 2.1**: Validar que el plan NO contradiga ADRs activos sin justificación explícita. Si el plan debe contradecir ADR existente, verificar que esto esté documentado y justificado.
  - **Uso específico**: Cruzar decisiones del plan contra ADRs del área afectada. Detectar contradicciones implícitas.
  - **Optimización**: Usar los mismos ADRs filtrados que se cargaron en Fase 2

#### Contexto de Componentes Existentes

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito en Fase 2.1**: Validar que las ubicaciones de archivos propuestas en el plan sean correctas y consistentes con la estructura existente del proyecto.
  - **Uso específico**: Si plan propone crear nuevo módulo en `src/services/payments/`, verificar que esa ubicación sea consistente con la organización existente. Detectar ubicaciones incorrectas.
  - **Criterio de rechazo**: Plan propone crear archivos en rutas que violan convenciones de estructura → recomendar ubicación correcta

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 2.1**: Validar que la estrategia de integración con componentes existentes sea factible. Verificar que interfaces de componentes existentes referenciadas en el plan sean correctas.
  - **Uso específico**: Si plan dice "Modificar `PaymentService` para agregar método X", validar que `PaymentService` existe y que agregar ese método sea coherente con su responsabilidad actual.
  - **Criterio de rechazo**: Plan referencia componentes inexistentes o propone modificaciones que violarían SRP del componente existente

#### Contexto de Dominio

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito en Fase 2.1**: Validar que nombres de componentes, interfaces y contratos propuestos usen terminología canónica del dominio consistentemente.
  - **Uso específico**: Verificar que nombres de servicios, entidades, value objects, repositorios sigan lenguaje ubicuo. Detectar inconsistencias terminológicas.
  - **Criterio de rechazo**: Plan usa términos inconsistentes con diccionario → recomendar renombrado según lenguaje ubicuo

#### Contexto de Persistencia e Integraciones

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes)
  - **Propósito en Fase 2.1**: Validar que la estrategia de persistencia propuesta sea compatible con esquema existente. Verificar que nuevas tablas/relaciones propuestas respeten integridad referencial.
  - **Uso específico**: Si plan propone crear nueva tabla o modificar existente, validar que diseño respete constraints, relaciones FK, y no introduzca redundancia innecesaria.
  - **Criterio de rechazo**: Plan propone cambios de esquema que violarían integridad referencial o principios de normalización sin justificación

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito en Fase 2.1**: Validar que contratos de APIs propuestos sean compatibles con existentes. Verificar que estrategia de versionado sea apropiada si se modifican contratos.
  - **Uso específico**: Si plan propone modificar contrato de API existente, validar que cambio sea backward-compatible o que estrategia de versionado esté especificada.
  - **Carga condicional**: Solo si Fase 2 cargó este archivo (hay integraciones en el plan)
  - **Criterio de rechazo**: Plan propone cambios breaking en API sin estrategia de versionado → recomendar versionado o cambio compatible

#### Contexto de Restricciones Técnicas

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 2.1**: Validar que todas las librerías/frameworks propuestos en el plan estén en la lista de aprobados. Verificar compatibilidad de versiones.
  - **Uso específico**: Para cada dependencia mencionada en el plan, verificar que esté aprobada. Detectar uso de antipatrones tecnológicos.
  - **Criterio de rechazo**: Plan usa librería no aprobada → recomendar alternativa aprobada o solicitar aprobación formal

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 2.1**: Validar que componentes que manejan datos sensibles tengan consideraciones de seguridad apropiadas en el plan. Verificar que no se introduzcan vulnerabilidades arquitectónicas.
  - **Uso específico**: Si plan propone endpoint que recibe PII, validar que incluya autenticación, autorización y logging de auditoría. Verificar que manejo de secretos esté contemplado.
  - **Carga condicional**: Si Fase 2 cargó este archivo (requerimiento toca seguridad)
  - **Criterio de rechazo**: Plan maneja datos sensibles sin consideraciones de seguridad → recomendar integración de controles de seguridad

#### Contexto de Infraestructura

- `deployment_and_infrastructure_context.context.md`: Infraestructura y deployment
  - **Propósito en Fase 2.1**: Validar que el plan arquitectónico sea compatible con restricciones de infraestructura. Verificar que no se planifiquen soluciones que asuman capacidades no disponibles en el entorno de deployment.
  - **Uso específico**: Si plan propone procesamiento batch pero entorno es serverless con límite de ejecución → detectar incompatibilidad. Verificar que el plan considere restricciones de concurrencia, networking y recursos.
  - **Carga condicional**: Si Fase 2 cargó este archivo
  - **Criterio de rechazo**: Plan asume capacidades de infraestructura no disponibles → recomendar adaptación a restricciones reales

#### Contexto de Testabilidad

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks y estrategias
  - **Propósito en Fase 2.1**: Validar que el plan arquitectónico sea testable. Verificar que componentes tengan bajo acoplamiento, dependencias inyectables, interfaces mockeables.
  - **Uso específico**: Verificar que plan especifique cómo se testearán componentes propuestos. Identificar componentes con alto acoplamiento que dificulten testing.
  - **Criterio de rechazo**: Plan propone componentes difíciles de testear (dependencias hardcoded, ausencia de interfaces) → recomendar inyección de dependencias y abstracción de dependencias externas

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS (igual que Fase 2):**

❌ **NO incluir**:

- `code_style_guide.context.md` → Sintaxis irrelevante para validación arquitectónica
- `reference_code_examples.context.md` → Ejemplos de implementación, no arquitectura
- `error_handling_and_logging_standards.context.md` → Detalles de implementación
- `refactoring_guidelines.context.md` → Específico de Fase 6
- `documentation_templates.context.md` → No aplica a validación arquitectónica
- `performance_benchmarks_and_thresholds.context.md` → Optimización específica

**RAZÓN DE EXCLUSIONES**: Fase 2.1 valida PLANIFICACIÓN ARQUITECTÓNICA (patrones, componentes, interfaces, integraciones), NO detalles de implementación. Los mismos archivos excluidos en Fase 2 deben excluirse en Fase 2.1.

**PRINCIPIO DE COHERENCIA**:
Fase 2.1 debe usar **EXACTAMENTE el mismo conjunto de archivos de contexto** que Fase 2. Si Fase 2 cargó archivo X, Fase 2.1 DEBE cargarlo. Si Fase 2 excluyó archivo Y, Fase 2.1 DEBE excluirlo. Esto garantiza que la validación evalúe el plan contra el mismo contexto que lo generó.

**NOTA SOBRE CARGA CONDICIONAL**:
Si Fase 2 cargó condicionalmente `api_integration_contracts.context.md` o `security_and_compliance_requirements.context.md` (porque el requerimiento tocaba esas áreas), Fase 2.1 DEBE cargar los mismos archivos. La condicionalidad se determina en Fase 2; Fase 2.1 replica esa decisión.

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt específico definido para validación arquitectónica asistida. Sin embargo, el desarrollador podría realizar esta validación completamente manual si lo prefiere.

- **Prompt**: [`phase_2-1.architectural_implementation_plan_validation.prompt.md`](2.phase_2-1.architectural_implementation_plan_validation.prompt.md)

**Prompts Faltantes**:

- `[phase_2-1.integration-corrections.prompt.md]` - Para integrar automáticamente las correcciones del reporte de validación en el plan arquitectónico de Fase 2
- `[phase_2-1.validate-integration.prompt.md]` - Para validar que las correcciones se integraron apropiadamente

Emplear inteligencia artificial para analizar:

1. **Coherencia arquitectónica:** Verificación de que el plan respete los principios arquitectónicos establecidos en el proyecto
2. **Viabilidad de patrones:** Validación de que los patrones de diseño seleccionados sean apropiados para el contexto específico
3. **Completitud de interfaces:** Confirmación de que todos los contratos necesarios estén definidos adecuadamente
4. **Consistencia de integración:** Verificación de que la estrategia de integración sea factible y completa
5. **Análisis de gaps:** Identificación de aspectos arquitectónicos no contemplados en el plan inicial que deberían considerarse

### Criterios de Validación

**Completitud**: El plan debe cubrir todos los aspectos arquitectónicos necesarios para la implementación

**Coherencia**: El plan debe ser consistente internamente y con la arquitectura existente

**Viabilidad**: Los componentes, patrones e integraciones propuestas deben ser técnicamente factibles

**Alineación**: El plan debe alinearse con los estándares y principios arquitectónicos del proyecto

### Entregable

Reporte de validación arquitectónica que incluya:

- **Evaluación de coherencia con la arquitectura existente**: Análisis de compatibilidad y consistencia
- **Confirmación de viabilidad de patrones propuestos**: Validación de que los patrones sean apropiados
- **Identificación de interfaces o contratos faltantes**: Listado de contratos que deben agregarse
- **Recomendaciones para completar o corregir el plan arquitectónico**: Sugerencias específicas de mejora
- **Validación de consideraciones de rendimiento y escalabilidad**: Evaluación de aspectos de performance

### Flujos Posibles

Esta fase tiene dos caminos divergentes:

**Camino 1 - Plan Completo y Viable (Happy Path)**:

- El reporte indica que el plan es completo, coherente y viable
- El desarrollador valida el reporte y aprueba continuar a Fase 3
- **Se procede directamente a Fase 3**

**Camino 2 - Plan Incompleto o con Deficiencias (Unhappy Path)**:

- El reporte identifica deficiencias, interfaces faltantes o recomendaciones de corrección
- El desarrollador debe:
  1. **Leer y validar** el reporte, eliminando recomendaciones de IA que no sean aplicables
  2. **Corregir el plan de Fase 2** incorporando las correcciones identificadas
  3. **Validar** que las correcciones se integraron apropiadamente al plan de Fase 2

**NOTA**: NO tenemos prompts documentados para:

- Integrar automáticamente las correcciones de Fase 2.1 en el documento de Fase 2
- Validar que esa integración se realizó correctamente

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer el reporte** de validación generado por la IA y **evaluar su validez**
- Aplicar criterio técnico para determinar qué recomendaciones de la IA son aplicables
- **NO aceptar a ciegas** todas las recomendaciones de la IA - algunas pueden no ser apropiadas
- Si el reporte indica deficiencias reales:
  - **Corregir el plan de Fase 2** con la información del reporte de Fase 2.1
  - **NO acumular documentos** - la Fase 2.1 corrige el documento de Fase 2, no se agrega como documento separado
  - Validar que las correcciones se integraron apropiadamente
- **Aprobar explícitamente** el plan corregido antes de continuar a Fase 3
- NO proceder si existen dudas sobre la completitud o viabilidad del plan

**CRÍTICO**: El desarrollador debe estar consciente de que la IA puede generar recomendaciones innecesarias o no aplicables. Es su responsabilidad filtrar y aplicar únicamente las mejoras realmente necesarias.

### Notas Importantes

**Human in the Loop Intensivo**: Esta fase requiere especial atención del desarrollador. La IA puede sugerir mejoras que no siempre son necesarias. El desarrollador debe leer, analizar, y decidir conscientemente qué aplicar y qué descartar.

**No Acumulación de Documentos**: El resultado de Fase 2.1 NO se agrega como documento adicional. Su propósito es **corregir y mejorar** el documento de Fase 2. El documento de Fase 2 debe quedar completo y refinado.

**Prompts Faltantes**: Actualmente se requiere trabajo manual para integrar las correcciones. Idealmente deberían existir prompts para:

1. Tomar el reporte de 2.1 y actualizar automáticamente el plan de Fase 2
2. Validar que esa actualización se realizó correctamente

**Validación Manual Aceptable**: Aunque la IA puede ayudar, el desarrollador puede realizar esta validación completamente manual si lo considera más apropiado para su contexto.

---

## Fase 3: Diseño Detallado de la Implementación

### Objetivo

Crear una especificación técnica detallada que defina paso a paso la implementación de la solución, **sin incluir código** pero con suficiente detalle para guiar la codificación. Este es el documento fundamental que guiará toda la implementación posterior - es el **pináculo** de la metodología.

### Entrada

**PRINCIPIO**: Fase 3 hereda TODO el contexto de Fase 2 + agrega archivos de IMPLEMENTACIÓN porque diseña detalles técnicos específicos.

- **Artefactos de Entrada Previos**:
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1
  - **Plan de implementación arquitectónica de la Fase 2** (ya corregido con base en Fase 2.1)

**NOTA IMPORTANTE**: El reporte de Fase 2.1 NO entra como entrada separada. Sus correcciones ya están integradas en el plan de Fase 2 que se usa aquí.

**Contexto Arquitectónico (HEREDADO de Fase 2):**

#### Fundamentos Arquitectónicos

- `project_architecture.context.md`: Arquitectura de alto nivel existente
  - **Uso en Fase 3**: Ubicar componentes detallados dentro de módulos arquitectónicos. Validar que diseño detallado respete bounded contexts.

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados
  - **Uso en Fase 3**: Especificar CÓMO implementar cada patrón en detalle. Diseñar responsabilidades específicas de cada componente según patrón seleccionado en Fase 2.
  - **Ejemplo**: Si Fase 2 eligió patrón Repository, Fase 3 especifica métodos exactos del repositorio, parámetros, retornos, manejo de transacciones.

- `architecture_decision_records.context.md`: Decisiones arquitectónicas históricas
  - **Uso en Fase 3**: Consultar ADRs para detalles de implementación acordados previamente.

#### Contexto de Componentes Existentes

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Uso en Fase 3**: Especificar rutas EXACTAS de archivos a crear/modificar. El diseño debe decir: "Crear clase `PaymentProcessor` en `src/services/payment/PaymentProcessor.java`"

- `existing_components_inventory.context.md`: Inventario de componentes existentes
  - **Uso en Fase 3**: Diseñar integraciones específicas con componentes existentes. Especificar qué métodos de qué clases existentes se invocarán.

#### Contexto de Dominio

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio
  - **Uso en Fase 3**: Nombrar métodos, parámetros, variables (conceptualmente, sin código) usando lenguaje ubicuo consistentemente.
  - **Ejemplo**: Diseño especifica método `calcularChurnMensual(Cliente cliente)` usando terminología exacta del diccionario.

**Contexto de Persistencia e Integraciones (HEREDADO de Fase 2):**

- `database_schema.context.md`: Estructura de base de datos
  - **Uso en Fase 3**: Diseñar queries específicas (sin SQL aún, pero describiendo operaciones). Especificar qué tablas se consultan, qué joins, qué índices se necesitan.
  - **CRÍTICO**: Diseñar migraciones de esquema si se crean/modifican tablas. Especificar DDL conceptual (qué columnas, tipos, constraints).

- `api_integration_contracts.context.md`: Contratos de APIs
  - **Uso en Fase 3**: Diseñar requests/responses específicos para integraciones. Especificar manejo de errores de API, timeouts, retries.
  - **Carga condicional**: Si Fase 2 cargó este archivo

**Contexto Tecnológico (HEREDADO de Fase 2):**

- `tech_stack_constraints.context.md`: Stack tecnológico
  - **Uso en Fase 3**: Especificar librerías exactas a usar para cada funcionalidad. Ej: "Usar Jackson ObjectMapper para serialización JSON de PaymentResponse".

- `deployment_and_infrastructure_context.context.md`: Infraestructura
  - **Uso en Fase 3**: Diseñar considerando restricciones de deployment. Si es serverless, diseñar funciones stateless. Si hay límites de memoria, diseñar procesamiento en chunks.

- `security_and_compliance_requirements.context.md`: Seguridad y compliance
  - **Uso en Fase 3**: Diseñar validaciones específicas de entrada, autenticación/autorización de endpoints, encriptación de campos sensibles, logging de auditoría.
  - **Carga condicional**: Si Fase 2 cargó este archivo

**Contexto de Implementación (NUEVO en Fase 3):**

#### Estándares de Código y Estilo

- `code_style_guide.context.md`: Guía de estilo de código específica del stack
  - **Propósito**: Aunque Fase 3 NO genera código, especifica CÓMO debe estructurarse el código futuro. Necesita conocer convenciones para describir apropiadamente.
  - **Uso en Fase 3**: Especificar nombres de clases/métodos siguiendo convenciones (PascalCase, camelCase). Especificar organización de archivos. Describir estructura de imports que se necesitarán.
  - **Ejemplo**: Diseño dice "Crear clase `PaymentProcessor` (PascalCase) con método `processPayment` (camelCase) que retorna `PaymentResult`"
  - **Contenido clave**: Convenciones de nomenclatura, organización de archivos, límites de complejidad, estructura de clases

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito**: Usar ejemplos como guía para diseñar componentes similares. Few-shot learning para calidad de diseño.
  - **Uso en Fase 3**: Si se diseña un Repository, consultar ejemplos existentes de Repositories para mantener consistencia en estructura y responsabilidades.
  - **CRÍTICO**: Ejemplos informan el nivel de detalle esperado en el diseño. Si ejemplos muestran manejo exhaustivo de errores, diseño debe especificar nivel similar.
  - **Contenido clave**: Implementaciones ejemplares de cada patrón aprobado, casos de uso resueltos con código comentado

#### Manejo de Errores y Logging

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito**: Diseñar estrategia de errores específica cumpliendo estándares del proyecto.
  - **Uso en Fase 3**: Especificar qué excepciones se lanzan en qué condiciones, qué se loguea en cada nivel (DEBUG, INFO, WARN, ERROR), qué contexto incluir en logs.
  - **CRÍTICO**: Diseño debe especificar para cada operación: qué errores pueden ocurrir, cómo se manejan, qué se loguea, qué se propaga.
  - **Ejemplo**: "Si `PaymentGateway.charge()` lanza `PaymentDeclinedException`, loguear nivel WARN con transaction_id, user_id, amount; retornar `PaymentResult.failed()` al caller; NO propagar excepción."
  - **Contenido clave**: Jerarquía de excepciones, niveles de logging por contexto, formato de mensajes, información de contexto

#### Testabilidad

- `testing_standards_and_patterns.context.md`: Estándares de testing
  - **Uso en Fase 3**: Diseñar componentes considerando cómo se testearán. Especificar qué interfaces se expondrán para mocking, qué dependencias deben ser inyectables.
  - **CRÍTICO**: Diseño debe identificar seams para testing. Especificar qué componentes requieren mocks, qué fixtures se necesitarán.
  - **Ejemplo**: "PaymentProcessor depende de PaymentGateway (interfaz). En tests, se inyectará MockPaymentGateway. Diseñar constructor que acepte PaymentGateway como parámetro."

#### Documentación

- `documentation_templates.context.md`: Templates de documentación técnica
  - **Propósito**: Especificar qué documentación generará el código (JSDoc, Javadoc, docstrings).
  - **Uso en Fase 3**: Diseño especifica qué métodos requieren documentación detallada, qué información incluir en comentarios de clase.
  - **Ejemplo**: "Clase PaymentProcessor requiere Javadoc describiendo: propósito, dependencias, ejemplo de uso, excepciones que lanza."

**Contexto de Performance (OPCIONAL en Fase 3):**

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito**: Si el requerimiento tiene requisitos no funcionales de performance, diseñar considerando umbrales.
  - **Uso en Fase 3**: Especificar algoritmos apropiados (O(n) vs O(n²)), estrategias de caching, procesamiento asíncrono si necesario.
  - **Carga condicional**: Si requerimiento tiene RNF de performance o si Fase 1 identificó preocupaciones de performance

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS:**

❌ **NO incluir**:

- `refactoring_guidelines.context.md` → Específico de Fase 6, no aplica a diseño inicial
- `project_structure_principles.context.md` → Ya usado en Fase 0.1 para validación; Fase 3 usa `project_directory_tree.context.md` para ubicaciones específicas

**NOTA SOBRE DIAGRAMAS TÉCNICOS**:
La entrada original menciona "Diagramas técnicos existentes del proyecto". Esto debe especificarse:

- Si hay diagramas C4, UML, ERD relevantes → incluir como referencias en archivos de contexto apropiados
- `project_architecture.context.md` puede incluir diagramas C4
- `database_schema.context.md` debe incluir ERD
- NO crear archivo separado genérico de "diagramas"

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt específico definido para diseño detallado asistido.

- **Prompt**: `phase_3.detailed_implementation_design.prompt.md`

Solicitar a la inteligencia artificial la creación de una especificación que incluya:

1. **Secuencia de implementación paso a paso**: Orden lógico detallado de desarrollo de componentes, indicando qué crear primero, qué modificar, en qué capa implementar cada elemento
2. **Especificación detallada de responsabilidades**: Definición precisa de qué hace cada componente, método o módulo (sin código, pero con descripción exhaustiva)
3. **Diseño de estructuras de datos**: Modelos de datos, estructuras, relaciones entre entidades necesarias
4. **Estrategia de manejo de errores y excepciones**: Definición de cómo se gestionarán los errores en cada punto crítico
5. **Documentación de puntos de extensibilidad**: Identificación de áreas preparadas para futuras expansiones o modificaciones

### Características del Diseño Detallado

**Altamente Detallado**: Este documento debe ser extremadamente específico y profesional, especificando hasta el último detalle de la implementación.

**Sin Código**: No contiene código de programación, pero describe con precisión qué código debe escribirse y cómo debe estructurarse.

**Secuencia Clara**: Debe indicar paso a paso: "usted tiene que hacer esto, modificar aquí, crear acá, llevar aquí, crear esta capa, implementar en esta capa, hacer esto".

**Pilar de la Metodología**: Este es el documento más importante - es la base sobre la cual se construirá todo el código (pruebas y producción).

### Entregable

Especificación técnica detallada que contenga:

- **Secuencia de implementación paso a paso**: Guía detallada del orden de desarrollo
- **Responsabilidades específicas de cada componente**: Descripción exhaustiva de qué hace cada elemento
- **Diseño de estructuras de datos**: Modelos y relaciones de datos requeridos
- **Estrategia de manejo de errores**: Plan detallado de gestión de excepciones
- **Documentación de puntos de extensibilidad**: Áreas preparadas para futuro crecimiento

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer completamente** la especificación técnica generada
- Revisar la especificación para asegurar su **viabilidad técnica y completitud**
- Verificar que los puntos estén **completamente bien definidos** y sin ambigüedades
- **NO PROCEDER** si existen aspectos poco claros o incompletos
- **Aprobar explícitamente** la especificación antes de continuar a Fase 3.1
- Validar que la secuencia de implementación propuesta es lógica y factible

**CRÍTICO**: No es aceptable simplemente ver que "salió" el documento. El desarrollador debe estar pendiente de que cada punto esté completo y correcto, ya que este documento guiará todo el desarrollo posterior.

### Notas Importantes

**Importancia Crítica**: Esta es una de las fases más importantes de la metodología. La calidad de este diseño detallado determina la calidad de toda la implementación posterior.

**Sin Código**: Recordar que NO hay código de programación en esta fase, solo la especificación detallada de qué código debe escribirse.

**Human in the Loop**: El desarrollador debe leer y validar exhaustivamente este documento, ya que es el "blueprint" de toda la implementación.

---

## Fase 3.1: Validación del Diseño Detallado de Implementación

### Objetivo

Verificar que la especificación técnica detallada sea completa, coherente con el plan arquitectónico y cubra todos los aspectos necesarios para una implementación exitosa.

### Entrada

**PRINCIPIO**: Fase 3.1 requiere **TODO el contexto usado en Fase 3** para validar coherencia del diseño detallado contra ese mismo contexto.

- **Artefacto a Validar**: Especificación técnica detallada de implementación generada en Fase 3

- **Documentos de Entrada Originales** (los mismos que alimentaron Fase 3):
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1
  - **Plan de implementación arquitectónica de la Fase 2** (ya corregido con base en Fase 2.1)

**NOTA IMPORTANTE**: El reporte de Fase 2.1 NO entra como entrada separada. Sus correcciones ya están integradas en el plan de Fase 2 que se usa aquí (mismo principio que Fase 3).

**Contexto Arquitectónico y de Diseño (IDÉNTICO a Fase 3):**

#### Fundamentos Arquitectónicos

- `project_architecture.context.md`: Arquitectura de alto nivel existente (C4 Level 1-2)
  - **Propósito en Fase 3.1**: Validar que el diseño detallado ubique componentes dentro de los módulos/bounded contexts correctos según la arquitectura existente. Verificar que no se introduzcan acoplamientos entre bounded contexts que la arquitectura prohíbe.
  - **Uso específico**: Para cada componente diseñado en Fase 3, verificar que pertenezca al módulo correcto y que las interacciones diseñadas respeten flujos de datos establecidos.

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 3.1**: Validar que la implementación detallada de cada patrón (seleccionado en Fase 2) sea correcta según estándares. Verificar que el nivel de detalle del diseño no introduzca antipatrones sutiles en la implementación.
  - **Uso específico**: Si Fase 3 diseña un Repository con métodos específicos, validar que la estructura propuesta siga las convenciones del patrón Repository aprobadas. Si diseña un Service, verificar que no asuma responsabilidades de otra capa.
  - **Criterio de rechazo**: Diseño detallado distorsiona la intención del patrón arquitectónico → recomendar corrección de responsabilidades

- `architecture_decision_records.context.md`: Historial de decisiones arquitectónicas
  - **Propósito en Fase 3.1**: Validar que decisiones de diseño detallado no contradigan ADRs activos. Si el diseño detallado interpreta un ADR, verificar que la interpretación sea correcta.
  - **Uso específico**: Cruzar decisiones de implementación detallada contra ADRs relevantes. Detectar contradicciones que pueden surgir al pasar de plan abstracto a diseño concreto.
  - **Optimización**: Usar los mismos ADRs filtrados que se cargaron en Fase 3

#### Contexto de Componentes Existentes

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito en Fase 3.1**: Validar que las rutas de archivos especificadas en el diseño sean correctas y consistentes con la estructura existente del proyecto.
  - **Uso específico**: Verificar que cada archivo nuevo propuesto se ubique en el directorio correcto según convenciones. Detectar rutas incorrectas o inconsistentes en el diseño.
  - **Criterio de rechazo**: Diseño propone crear archivos en rutas que violan convenciones de estructura → recomendar ubicación correcta

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 3.1**: Validar que las integraciones diseñadas con componentes existentes sean factibles. Verificar que métodos, interfaces y contratos referenciados existan realmente.
  - **Uso específico**: Si diseño dice "invocar `PaymentGateway.charge(amount, currency)`", validar que ese método exista con esa firma. Detectar referencias a componentes o métodos inexistentes.
  - **Criterio de rechazo**: Diseño referencia métodos o interfaces inexistentes en componentes existentes → recomendar corrección basada en inventario real

#### Contexto de Dominio

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito en Fase 3.1**: Validar que nomenclatura de clases, métodos, parámetros y variables propuesta en el diseño use terminología canónica del dominio de forma consistente.
  - **Uso específico**: Verificar que nombres como `calcularChurnMensual`, `PaymentProcessor`, `TransactionResult` sean consistentes con lenguaje ubicuo. Detectar inconsistencias terminológicas entre diferentes partes del diseño.
  - **Criterio de rechazo**: Diseño usa términos inconsistentes con diccionario o mezcla terminología → recomendar renombrado según lenguaje ubicuo

#### Contexto de Persistencia e Integraciones

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes)
  - **Propósito en Fase 3.1**: Validar que operaciones de persistencia diseñadas sean compatibles con esquema existente. Verificar que migraciones de esquema propuestas respeten integridad referencial.
  - **Uso específico**: Si diseño especifica queries conceptuales o migraciones DDL, validar que tablas referenciadas existan, que tipos de datos sean compatibles, y que constraints se respeten.
  - **Criterio de rechazo**: Diseño propone operaciones incompatibles con esquema existente o migraciones que violarían integridad referencial → recomendar corrección

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito en Fase 3.1**: Validar que diseño de requests/responses para integraciones sea compatible con contratos existentes. Verificar que manejo de errores de API sea exhaustivo.
  - **Uso específico**: Si diseño especifica llamada a API externa con formato X, validar que contrato real acepte ese formato. Verificar que diseño contemple todos los códigos de error documentados.
  - **Carga condicional**: Solo si Fase 3 cargó este archivo (hay integraciones en el diseño)
  - **Criterio de rechazo**: Diseño asume formato de request/response incorrecto según contrato → recomendar corrección según especificación

#### Contexto Tecnológico

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 3.1**: Validar que librerías y features específicos mencionados en el diseño estén aprobados y sean compatibles con versiones del stack.
  - **Uso específico**: Si diseño dice "Usar Jackson ObjectMapper", verificar que Jackson esté aprobada. Si dice "usar records de Java", verificar que versión de Java lo soporte.
  - **Criterio de rechazo**: Diseño especifica librería no aprobada o feature no disponible en versión del stack → recomendar alternativa compatible

- `deployment_and_infrastructure_context.context.md`: Infraestructura y deployment
  - **Propósito en Fase 3.1**: Validar que diseño detallado sea compatible con restricciones de infraestructura. Verificar que no se diseñen soluciones que asuman capacidades no disponibles en el entorno de deployment.
  - **Uso específico**: Si diseño asume procesamiento con alta memoria pero entorno es serverless con límite de 512MB → detectar incompatibilidad. Verificar que diseño considere restricciones de concurrencia, networking, etc.
  - **Criterio de rechazo**: Diseño asume capacidades de infraestructura no disponibles → recomendar adaptación a restricciones reales

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 3.1**: Validar que diseño detallado incluya todas las consideraciones de seguridad necesarias. Verificar que manejo de datos sensibles cumpla requisitos de compliance.
  - **Uso específico**: Si diseño expone endpoint que recibe PII, verificar que incluya validación de entrada, autenticación, autorización, encriptación apropiada y logging de auditoría. Detectar gaps de seguridad.
  - **Carga condicional**: Si Fase 3 cargó este archivo (requerimiento toca seguridad)
  - **Criterio de rechazo**: Diseño maneja datos sensibles sin controles de seguridad apropiados → recomendar integración de controles específicos

**Contexto de Implementación (IDÉNTICO a Fase 3):**

#### Estándares de Código y Estilo

- `code_style_guide.context.md`: Guía de estilo de código específica del stack
  - **Propósito en Fase 3.1**: Validar que nomenclatura de clases, métodos, parámetros y organización de archivos propuesta en el diseño siga convenciones del proyecto.
  - **Uso específico**: Verificar PascalCase/camelCase/snake_case según convenciones. Validar que estructura de clases propuesta respete límites de complejidad. Detectar inconsistencias de nomenclatura dentro del propio diseño.
  - **Criterio de rechazo**: Diseño usa convenciones de nomenclatura incorrectas o propone estructura que excede límites de complejidad → recomendar ajuste según guía de estilo

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito en Fase 3.1**: Validar que nivel de detalle y estructura del diseño sea consistente con ejemplos de referencia aprobados. Verificar que diseño de patrones sea coherente con implementaciones ejemplares existentes.
  - **Uso específico**: Comparar diseño de un Repository propuesto contra ejemplos de Repositories existentes para detectar desviaciones significativas. Verificar que el nivel de detalle del diseño sea comparable al de los ejemplos.
  - **Criterio de rechazo**: Diseño tiene nivel de detalle significativamente inferior al esperado según ejemplos de referencia → recomendar ampliación de especificación

#### Manejo de Errores y Logging

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 3.1**: Validar que estrategia de errores diseñada sea completa y cumpla estándares. Verificar que para cada operación se especifique qué errores pueden ocurrir, cómo se manejan, qué se loguea y qué se propaga.
  - **Uso específico**: Para cada operación diseñada, verificar que el diseño contemple: excepciones posibles, nivel de logging apropiado, contexto incluido en logs, estrategia de propagación. Detectar operaciones sin manejo de errores especificado.
  - **CRÍTICO**: Fase 3 es el pináculo del diseño; gaps en manejo de errores aquí se propagarán directamente a implementación (Fase 5).
  - **Criterio de rechazo**: Diseño omite manejo de errores para operaciones críticas o no especifica logging apropiado → recomendar completar estrategia de errores

#### Testabilidad

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks y estrategias
  - **Propósito en Fase 3.1**: Validar que componentes diseñados sean testeables. Verificar que dependencias sean inyectables, interfaces sean mockeables, y seams de testing estén identificados.
  - **Uso específico**: Para cada componente, verificar que diseño especifique: interfaces para mocking, dependencias inyectables, fixtures necesarias. Detectar componentes con alto acoplamiento que dificultarán testing en Fases 4-4.2.
  - **Criterio de rechazo**: Diseño propone componentes con dependencias hardcoded o sin interfaces para mocking → recomendar inyección de dependencias y abstracción de dependencias externas

#### Documentación

- `documentation_templates.context.md`: Templates de documentación técnica
  - **Propósito en Fase 3.1**: Validar que diseño especifique requisitos de documentación apropiados para componentes públicos según templates del proyecto.
  - **Uso específico**: Verificar que métodos/clases públicos tengan especificación de documentación requerida (JSDoc, Javadoc, docstrings). Detectar componentes complejos sin requisitos de documentación.
  - **Criterio de rechazo**: Componentes públicos complejos sin especificación de documentación → recomendar agregar requisitos de documentación

**Contexto de Performance (CONDICIONAL - IDÉNTICO a Fase 3):**

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 3.1**: Validar que diseño cumpla con umbrales de performance establecidos. Verificar que algoritmos, estrategias de caching y procesamiento asíncrono sean apropiados para los requisitos.
  - **Uso específico**: Si requerimiento exige respuesta <200ms, verificar que diseño no proponga operaciones sincrónicas costosas sin justificación. Validar que estrategias de optimización diseñadas sean realistas y alcanzables.
  - **Carga condicional**: Si Fase 3 cargó este archivo (requerimiento tiene RNF de performance)
  - **Criterio de rechazo**: Diseño propone estrategias que difícilmente cumplirán umbrales de performance → recomendar optimización o replanteo de enfoque

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS (igual que Fase 3):**

❌ **NO incluir**:

- `refactoring_guidelines.context.md` → Específico de Fase 6, no aplica a validación de diseño
- `project_structure_principles.context.md` → Ya usado en Fase 0.1; Fase 3.1 usa `project_directory_tree.context.md` para validar ubicaciones específicas

**RAZÓN DE EXCLUSIONES**: Fase 3.1 valida DISEÑO DETALLADO DE IMPLEMENTACIÓN. Los mismos archivos excluidos en Fase 3 deben excluirse en Fase 3.1. Estos archivos no aportan información adicional relevante para la validación del diseño.

**PRINCIPIO DE COHERENCIA**:
Fase 3.1 debe usar **EXACTAMENTE el mismo conjunto de archivos de contexto** que Fase 3. Si Fase 3 cargó archivo X, Fase 3.1 DEBE cargarlo. Si Fase 3 excluyó archivo Y, Fase 3.1 DEBE excluirlo. Esto garantiza que la validación evalúe el diseño contra el mismo contexto que lo generó.

**NOTA SOBRE CARGA CONDICIONAL**:
Si Fase 3 cargó condicionalmente `api_integration_contracts.context.md`, `security_and_compliance_requirements.context.md` o `performance_benchmarks_and_thresholds.context.md` (porque el requerimiento tocaba esas áreas), Fase 3.1 DEBE cargar los mismos archivos. La condicionalidad se determina en Fase 3; Fase 3.1 replica esa decisión.

**VALIDACIÓN CRUZADA CON PLAN ARQUITECTÓNICO**:
Fase 3.1 tiene una responsabilidad adicional que no tiene Fase 2.1: debe validar que el diseño detallado sea **coherente con el plan arquitectónico de Fase 2**. Mientras Fase 2.1 valida plan vs. contexto, Fase 3.1 valida diseño detallado vs. contexto **Y** vs. plan arquitectónico. Si el diseño detallado se desvía del plan arquitectónico sin justificación explícita, es criterio de rechazo.

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt específico definido para validación del diseño detallado. Sin embargo, el desarrollador podría realizar esta validación completamente manual.

- **Prompt**: `phase_3-1.detailed_implementation_design_validation.prompt.md`

**Prompts Faltantes**:

- `[phase_3-1.integration-corrections.prompt.md]` - Para integrar automáticamente las correcciones del reporte de validación en la especificación técnica de Fase 3
- `[phase_3-1.validate-integration.prompt.md]` - Para validar que las correcciones se integraron apropiadamente

Emplear inteligencia artificial para analizar:

1. **Coherencia con arquitectura**: Verificación de que el diseño detallado implemente correctamente el plan arquitectónico de Fase 2
2. **Completitud de especificación**: Validación de que todos los componentes y métodos estén adecuadamente especificados con suficiente detalle
3. **Viabilidad de secuencia**: Confirmación de que el orden de implementación propuesto sea lógico, factible y sin dependencias circulares
4. **Robustez del manejo de errores**: Evaluación de que las estrategias de gestión de excepciones sean completas y apropiadas
5. **Análisis de gaps**: Identificación de aspectos técnicos no contemplados en la especificación que deberían incluirse

### Criterios de Validación

**Alineación Arquitectónica**: El diseño debe implementar fielmente el plan arquitectónico de Fase 2

**Completitud Técnica**: Todos los componentes necesarios deben estar especificados con suficiente detalle

**Viabilidad de Implementación**: La secuencia propuesta debe ser lógica y ejecutable

**Robustez**: El manejo de errores y casos límite debe estar adecuadamente considerado

### Entregable

Reporte de validación del diseño que incluya:

- **Evaluación de alineación con el plan arquitectónico**: Análisis de correspondencia con Fase 2
- **Confirmación de completitud de especificaciones técnicas**: Validación de que nada crítico falta
- **Identificación de componentes o métodos insuficientemente definidos**: Listado de áreas que requieren más detalle
- **Recomendaciones para fortalecer el manejo de excepciones**: Sugerencias de mejora (si son realmente necesarias)
- **Validación de viabilidad de la secuencia de implementación propuesta**: Confirmación de que el orden es factible

### Flujos Posibles

Esta fase tiene dos caminos divergentes:

**Camino 1 - Diseño Completo y Viable (Happy Path)**:

- El reporte indica que el diseño es completo, coherente y viable
- El desarrollador valida el reporte y aprueba continuar a Fase 4
- **Se procede directamente a Fase 4**

**Camino 2 - Diseño Incompleto o con Deficiencias (Unhappy Path)**:

- El reporte identifica componentes insuficientemente definidos, manejo de errores débil, o secuencias no viables
- El desarrollador debe:
  1. **Leer y validar** el reporte, aplicando criterio sobre qué recomendaciones son realmente necesarias
  2. **Corregir la especificación de Fase 3** incorporando las correcciones identificadas como necesarias
  3. **Validar** que las correcciones se integraron apropiadamente en la especificación de Fase 3

**NOTA**: NO tenemos prompts documentados para:

- Integrar automáticamente las correcciones de Fase 3.1 en el documento de Fase 3
- Validar que esa integración se realizó correctamente

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer el reporte** de validación y **aplicar criterio técnico** sobre su validez
- Tener especial cuidado con las recomendaciones de la IA - **no todo lo que sugiere es necesario**
- La IA puede sugerir fortalecer el manejo de excepciones incluso cuando no es necesario
- Si el reporte identifica deficiencias reales:
  - **Corregir la especificación de Fase 3** integrando la información del reporte de Fase 3.1
  - **NO acumular documentos** - la Fase 3.1 corrige el documento de Fase 3
  - Validar que las correcciones necesarias se integraron apropiadamente
- **Aprobar explícitamente** la especificación corregida antes de continuar a Fase 4
- NO proceder si existen dudas sobre la completitud del diseño

**CRÍTICO**: El desarrollador debe ser especialmente consciente de que la IA tiende a sugerir mejoras incluso cuando el diseño ya es adecuado. Es fundamental aplicar criterio profesional y no aceptar todas las sugerencias automáticamente.

### Notas Importantes

**Criterio Profesional Esencial**: Esta fase requiere que el desarrollador ejerza juicio técnico sólido. La IA puede sugerir "fortalecer el manejo de excepciones" o agregar validaciones innecesarias. El desarrollador debe evaluar caso por caso.

**No Acumulación de Documentos**: Similar a Fase 2.1, el resultado NO es un documento adicional sino correcciones al documento de Fase 3.

**Prompts Faltantes**: Se requieren prompts para automatizar la integración de correcciones y su validación.

**Casi Todo Perfecto es Válido**: Si el análisis indica que "casi todo está bien" y solo hay sugerencias menores no críticas, el desarrollador puede aprobar y continuar sin modificaciones.

---

## Fase 4: Desarrollo de Suite de Pruebas

### Objetivo

Implementar una suite completa de pruebas automatizadas que valide todos los aspectos del requerimiento, siguiendo las mejores prácticas de **Test-Driven Development (TDD)**. Esta es una de las fases más grandes y críticas, con múltiples subfases internas.

**Aquí es donde le damos vida al TDD**: Primero se desarrollan las pruebas (que fallarán porque no hay código de producción), y luego en Fase 5 se implementa el código que las hará pasar.

### Entrada

**PRINCIPIO**: Fase 4 marca un **CAMBIO DE ENFOQUE** en la metodología: de DISEÑO DE IMPLEMENTACIÓN a ESPECIFICACIÓN DE PRUEBAS. El contexto se ajusta para servir este nuevo objetivo, manteniendo archivos que informan QUÉ testear y CÓMO testear, y descartando archivos que solo eran relevantes para diseño de implementación.

**NATURALEZA DE FASE 4**: Esta fase genera DOCUMENTACIÓN de pruebas (tres documentos + estrategia de moqueo), NO código. Especifica QUÉ pruebas deben implementarse y POR QUÉ, organizadas en Happy Path, Edge/Corner Cases y Unhappy Path, cada una con pruebas unitarias, de integración y de sistema.

- **Artefactos de Fases Previas** (pipeline completo de diseño):
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1
  - Plan de implementación arquitectónica de la Fase 2 (ya corregido con base en Fase 2.1)
  - **Especificación técnica detallada de la Fase 3** (ya corregida con base en Fase 3.1) — **ES LA BASE PRINCIPAL DE LAS PRUEBAS**

**NOTA IMPORTANTE**: Los reportes de Fase 2.1 y Fase 3.1 NO entran como entradas separadas. Sus correcciones ya están integradas en los documentos de Fase 2 y Fase 3 respectivamente (Principio de No Acumulación de Documentos).

**NOTA SOBRE LA ESPECIFICACIÓN DE FASE 3**: Este es el insumo más crítico de Fase 4. La Fase 3 describe exhaustivamente cada componente, método, responsabilidad, flujo de datos, estrategia de errores y punto de extensibilidad. Las pruebas se derivan directamente de esta especificación. Si Fase 3 especificó que `PaymentProcessor.processPayment()` lanza `PaymentDeclinedException` cuando la tarjeta es rechazada, Fase 4 debe especificar una prueba unitaria del Unhappy Path que valide ese comportamiento.

---

**Contexto de Testing (PRIMARIO en Fase 4):**

#### Estándares y Estrategias de Pruebas

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks aprobados y estrategias de pruebas
  - **Propósito en Fase 4**: **EL ARCHIVO MÁS IMPORTANTE DE ESTA FASE**. Define la estructura, convenciones y estrategias que rigen toda la especificación de pruebas. Sin este archivo, las pruebas especificadas podrían no cumplir estándares del proyecto.
  - **Uso específico**: Determinar cómo organizar pruebas (unitarias vs integración vs sistema). Definir qué framework de testing usar (JUnit, Jest, pytest). Aplicar convenciones de nombrado de tests (`should_verb_when_condition`, `given_when_then`). Establecer niveles de cobertura esperados. Definir estrategias de mocking/stubbing aprobadas. Determinar qué tipo de prueba aplica para cada componente según su naturaleza.
  - **Ejemplo**: Si estándares dicen "usar patrón Arrange-Act-Assert para unitarias" y "usar TestContainers para integración con BD", la especificación de pruebas debe organizarse siguiendo esos patrones.
  - **Contenido clave**: Frameworks aprobados, estrategias de mocking/stubbing, niveles de testing esperados (unit, integration, e2e), convenciones de nombrado, patrones de test (AAA, Given-When-Then), umbrales de cobertura

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito en Fase 4**: Proveer ejemplos de cómo se especifican y estructuran pruebas en el proyecto (few-shot learning). Establecer el nivel de detalle y calidad esperado en la especificación de pruebas.
  - **Uso específico**: Consultar ejemplos de pruebas existentes para mantener consistencia en estructura y nivel de detalle. Si el proyecto tiene tests de referencia para un Repository, usar ese patrón para especificar pruebas de nuevos Repositories.
  - **Optimización**: **Filtrar para incluir SOLO ejemplos de tests**, no ejemplos de código de producción. Si el archivo contiene tanto ejemplos de producción como de tests, cargar únicamente la sección de tests.
  - **DECISIÓN PENDIENTE**: Si `reference_code_examples.context.md` no contiene ejemplos de tests suficientes, considerar crear `reference_test_examples.context.md` como archivo separado. Por ahora, se recomienda incluir ejemplos de tests dentro del mismo archivo existente.

---

**Contexto de Errores y Comportamiento Excepcional:**

#### Manejo de Errores

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 4**: **CRÍTICO PARA UNHAPPY PATH**. Define todas las categorías de errores, jerarquía de excepciones y estrategias de manejo que deben ser cubiertas por las pruebas del camino infeliz.
  - **Uso específico**: Para cada operación diseñada en Fase 3, derivar las pruebas de Unhappy Path: qué excepciones pueden ocurrir, qué debería suceder cuando ocurren, qué se debería loguear. Especificar pruebas que validen que cada tipo de error se maneja según estándares.
  - **Ejemplo**: Si estándares dicen "Toda `BusinessException` debe loguearse como WARN con transaction_id", especificar prueba que valide: "Dado que `PaymentGateway.charge()` lanza `PaymentDeclinedException`, verificar que se loguea WARN con transaction_id y que el caller recibe `PaymentResult.failed()`."
  - **Vinculación directa**: Cada estrategia de error especificada en Fase 3 debe tener AL MENOS una prueba correspondiente en Fase 4.

---

**Contexto Arquitectónico (HEREDADO - adaptado a testing):**

#### Fundamentos Arquitectónicos

- `project_architecture.context.md`: Arquitectura de alto nivel existente (C4 Level 1-2)
  - **Propósito en Fase 4**: Comprender los límites entre módulos/bounded contexts para diseñar pruebas de integración correctas. Identificar puntos de interacción entre componentes que requieren pruebas de integración y sistema.
  - **Uso específico**: Determinar qué interacciones entre módulos necesitan pruebas de integración. Identificar flujos end-to-end para pruebas de sistema. Entender qué componentes cruzan bounded contexts y requieren tests de contrato.
  - **Ejemplo**: Si arquitectura muestra que `OrderService` (bounded context Pedidos) invoca `PaymentService` (bounded context Pagos), especificar prueba de integración que valide esa interacción.

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 4**: Entender los patrones usados en el diseño para especificar pruebas apropiadas a cada patrón. Cada patrón arquitectónico tiene estrategias de testing específicas.
  - **Uso específico**: Si el diseño usa patrón Repository → especificar pruebas de integración con BD (o mock de BD). Si usa patrón Observer → especificar pruebas que validen notificación correcta a todos los observers. Si usa Dependency Injection → diseñar pruebas que aprovechen la inyección para mocking.
  - **Ejemplo**: Para patrón Repository, especificar: pruebas unitarias con mock del datasource, pruebas de integración con BD en memoria, pruebas de edge case con datos nulos/vacíos.

#### Contexto de Componentes Existentes

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 4**: **ESENCIAL PARA ESTRATEGIA DE MOQUEO**. Identificar qué componentes existentes son dependencias del código a testear, para definir qué se mockea y qué se usa real.
  - **Uso específico**: Para cada componente diseñado en Fase 3, identificar sus dependencias en el inventario existente. Determinar cuáles se mockean (externas, costosas, no determinísticas) y cuáles se usan reales (componentes internos estables). Verificar que las interfaces públicas referenciadas existen para poder diseñar mocks correctos.
  - **Ejemplo**: Si `PaymentProcessor` depende de `PaymentGateway` (interfaz existente con métodos `charge()`, `refund()`), la estrategia de moqueo debe especificar `MockPaymentGateway` que implemente esos mismos métodos.

---

**Contexto de Dominio:**

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito en Fase 4**: Usar terminología canónica del dominio en la descripción de pruebas para mantener consistencia y legibilidad. Identificar reglas de negocio del dominio que constituyen edge cases.
  - **Uso específico**: Nombrar tests usando lenguaje ubicuo: "Verificar que calcularChurnMensual retorna 0 cuando cliente tiene contrato activo" (no "Verificar que el método de cálculo retorna cero"). Identificar términos del dominio que implican reglas de negocio con casos borde (ej. "cliente moroso" → ¿qué días de atraso? ¿qué monto mínimo?).
  - **Ejemplo**: Si diccionario define "Transacción Reversada" como término canónico, usar ese término en la descripción de pruebas, no "transacción cancelada" o "transacción anulada".

---

**Contexto de Datos e Integraciones:**

#### Persistencia

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes)
  - **Propósito en Fase 4**: Diseñar datos de prueba (fixtures/test data) que sean compatibles con el esquema real. Identificar constraints de BD que generan edge cases. Definir estrategia de moqueo de persistencia.
  - **Uso específico**: Crear especificaciones de datos de prueba con tipos correctos, constraints respetados (NOT NULL, UNIQUE, FK). Identificar edge cases derivados del esquema: ¿qué pasa con campos nullable? ¿con valores en límites de tipo de dato? ¿con violaciones de unique constraints? Especificar pruebas de integración que validen operaciones CRUD contra esquema real.
  - **Ejemplo**: Si tabla `payments` tiene columna `amount DECIMAL(10,2) NOT NULL`, edge cases incluyen: amount = 0.00, amount = 99999999.99 (máximo), amount negativo (¿permitido?), amount con más de 2 decimales.
  - **Optimización**: Incluir solo esquema de tablas referenciadas en la especificación de Fase 3

#### Integraciones

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito en Fase 4**: Especificar mocks de API que sean fieles a los contratos reales. Diseñar pruebas que cubran todos los códigos de respuesta documentados.
  - **Uso específico**: Para cada integración con API, especificar: pruebas Happy Path con responses exitosos según contrato, pruebas Edge con responses en límites (pagination, rate limiting, datos vacíos), pruebas Unhappy con todos los códigos de error documentados (400, 401, 403, 404, 429, 500, timeout). Los mocks deben retornar payloads que respeten exactamente el formato del contrato.
  - **Carga condicional**: Solo si Fase 3 cargó este archivo (hay integraciones en el diseño)
  - **Ejemplo**: Si contrato de API de pagos documenta responses 200 (éxito), 402 (fondos insuficientes), 422 (datos inválidos) y 503 (servicio no disponible), especificar pruebas para CADA uno de estos códigos.

---

**Contexto Tecnológico:**

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 4**: Conocer qué frameworks y librerías de testing están disponibles y aprobados para especificar pruebas implementables. Asegurar que las pruebas especificadas sean compatibles con el stack.
  - **Uso específico**: Si stack usa Java + Spring → especificar pruebas compatibles con JUnit 5, Mockito, Spring Boot Test. Si usa Node.js → Jest, Supertest. Verificar que estrategias de mocking propuestas sean soportadas por librerías del stack. Confirmar disponibilidad de herramientas de testing de integración (TestContainers, embedded databases, etc.).
  - **Ejemplo**: No especificar "usar PowerMock para mockear métodos estáticos" si el stack solo aprueba Mockito. No especificar "usar test containers" si el entorno CI no soporta Docker.

---

**Contexto Condicional (cargar según necesidad — misma condicionalidad que Fase 3):**

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 4**: Especificar pruebas de seguridad que validen controles diseñados en Fase 3. Asegurar cobertura de testing para autenticación, autorización, validación de entrada y manejo de datos sensibles.
  - **Uso específico**: Especificar pruebas que validen: acceso sin autenticación retorna 401, acceso sin autorización retorna 403, inyección SQL/XSS es rechazada, datos sensibles no se exponen en logs ni responses, encriptación se aplica correctamente.
  - **Carga condicional**: Si Fase 3 cargó este archivo (requerimiento toca seguridad)
  - **Ejemplo**: Si diseño incluye endpoint que recibe PII, especificar prueba: "Verificar que intento de acceso sin token JWT válido retorna 401 y no expone datos del usuario en el response."

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 4**: Especificar pruebas de performance que validen cumplimiento de umbrales definidos.
  - **Uso específico**: Si requerimiento tiene RNF de performance, especificar: pruebas de tiempo de respuesta contra umbrales (ej. <200ms), pruebas de throughput (ej. >100 requests/sec), pruebas de concurrencia (ej. 50 usuarios simultáneos).
  - **Carga condicional**: Si Fase 3 cargó este archivo (requerimiento tiene RNF de performance)
  - **Ejemplo**: Si umbral dice "P95 de respuesta < 200ms", especificar prueba de sistema: "Ejecutar 1000 requests concurrentes y verificar que percentil 95 de tiempo de respuesta sea inferior a 200ms."

---

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS:**

❌ **NO incluir**:

- `code_style_guide.context.md` → Fase 4 genera DOCUMENTACIÓN de pruebas, no código. Las convenciones de nomenclatura y estilo de código se necesitan cuando se IMPLEMENTA el código de tests en **Fase 4.2**, no cuando se ESPECIFICA qué tests crear.

- `documentation_templates.context.md` → Templates de documentación técnica (JSDoc, Javadoc) no son relevantes para especificación de pruebas. Los entregables de Fase 4 son documentos de especificación de tests con formato propio.

- `project_directory_tree.context.md` → La estructura de directorios indica DÓNDE colocar archivos. Fase 4 especifica QUÉ testear, no DÓNDE ubicar los archivos de tests. La ubicación de archivos de tests es relevante en **Fase 4.2** cuando se implementa el código.

- `architecture_decision_records.context.md` → Las decisiones arquitectónicas ya están reflejadas en la especificación de Fase 3. Las pruebas se derivan del COMPORTAMIENTO especificado en Fase 3, no de las decisiones que llevaron a ese comportamiento. Si un ADR dictó "usar eventual consistency", Fase 3 ya especificó los componentes con ese comportamiento, y Fase 4 testea ese comportamiento.

- `deployment_and_infrastructure_context.context.md` → Las pruebas especifican comportamiento funcional, no restricciones de deployment. Si una restricción de infraestructura afecta el comportamiento (ej. timeout de 30s por limitación serverless), eso ya está reflejado en la especificación de Fase 3 como parte del diseño.

- `refactoring_guidelines.context.md` → Específico de Fase 6, no aplica a especificación de pruebas.

- `project_structure_principles.context.md` → Ya usado en Fase 0.1; no relevante para especificación de pruebas.

**RAZÓN DE EXCLUSIONES**: Fase 4 especifica QUÉ PRUEBAS crear y POR QUÉ. Los archivos excluidos aportan información sobre CÓMO escribir código (estilo), DÓNDE ubicar archivos (estructura), o POR QUÉ se tomaron decisiones (ADRs) — ninguna de estas dimensiones es relevante para la especificación de pruebas. La información necesaria para diseñar pruebas viene del comportamiento especificado en Fase 3 y de los estándares de testing.

---

**PRINCIPIO DE TRANSICIÓN DE CONTEXTO (Fase 3 → Fase 4):**

A diferencia de las transiciones anteriores (Fase 2 → Fase 3 que AGREGABA archivos), la transición Fase 3 → Fase 4 **REDUCE** el conjunto de archivos porque el objetivo cambia fundamentalmente:

| Aspecto                   | Fase 3 (Diseño)                  | Fase 4 (Testing)             |
| ------------------------- | -------------------------------- | ---------------------------- |
| Genera                    | Especificación de implementación | Especificación de pruebas    |
| Enfoque                   | CÓMO construir                   | CÓMO validar                 |
| Archivos clave            | Guías de implementación          | Estándares de testing        |
| Necesita estilo de código | Sí (describe estructura)         | No (describe comportamiento) |
| Necesita ADRs             | Sí (informa decisiones)          | No (ya reflejados en Fase 3) |
| Necesita estructura dirs  | Sí (ubica archivos)              | No (ubica en Fase 4.2)       |

Esta reducción es INTENCIONAL y justificada: el Principio de Evolución de Contexto permite descartar archivos con justificación explícita cuando el objetivo de la fase cambia fundamentalmente.

---

**NOTA SOBRE SUBFASES Y SECUENCIALIDAD:**

Fase 4 genera documentos SECUENCIALMENTE:

1. Happy Path → `phase_4.happy-path.prompt.md`
2. Edge/Corner Cases → `phase_4.edge-corner-cases.prompt.md`
3. Unhappy Path → `phase_4.unhappy-path.prompt.md`
4. Estrategia de Moqueo → `[phase_4.mocking-strategy-specification.prompt.md]` (prompt pendiente)

Cada subfase usa el MISMO conjunto de archivos de contexto, pero el ENFOQUE varía:

- **Happy Path**: Énfasis en la especificación funcional de Fase 3, arquitectura, dominio
- **Edge/Corner Cases**: Énfasis en esquema de BD (constraints, tipos de datos), contratos de API (límites), diccionario de dominio (reglas de negocio)
- **Unhappy Path**: Énfasis en `error_handling_and_logging_standards.context.md`, contratos de API (códigos de error), seguridad
- **Estrategia de Moqueo**: Énfasis en `existing_components_inventory.context.md`, contratos de API, esquema de BD

**OPTIMIZACIÓN POR SUBFASE**: Si la ventana de contexto es limitada, se puede priorizar los archivos según la subfase. Los archivos marcados como énfasis para cada subfase tienen prioridad ALTA; el resto tiene prioridad MEDIA y podría omitirse si hay restricciones de tokens.

---

**VINCULACIÓN FASE 3 → FASE 4 (Trazabilidad):**

Cada elemento de la especificación de Fase 3 debe generar AL MENOS una prueba en Fase 4:

| Elemento de Fase 3             | Tipo de Prueba en Fase 4                      |
| ------------------------------ | --------------------------------------------- |
| Método/operación especificada  | Prueba unitaria Happy Path                    |
| Validación de entrada definida | Prueba unitaria Edge Case + Unhappy Path      |
| Integración entre componentes  | Prueba de integración Happy Path              |
| Manejo de error especificado   | Prueba unitaria Unhappy Path                  |
| Flujo end-to-end descrito      | Prueba de sistema Happy Path                  |
| Restricción de seguridad       | Prueba de seguridad (Unhappy Path)            |
| Umbral de performance          | Prueba de performance (si condicional activo) |

**CRITERIO DE COMPLETITUD**: Si un elemento de Fase 3 no tiene prueba correspondiente en Fase 4, es un gap que debe corregirse (se detectará en Fase 4.1).

---

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con tres prompts específicos ya definidos para:

1. **Documentación de pruebas del Happy Path**: `phase_4.happy-path.prompt.md`
2. **Documentación de pruebas de borde y esquina**: `phase_4.edge-corner-cases.prompt.md`
3. **Documentación de pruebas del Unhappy Path**: `phase_4.unhappy-path.prompt.md`

**Prompt Faltante**:

- `[phase_4.mocking-strategy-specification.prompt.md]` - Para generar especificación de estrategia de moqueo (criterios, APIs externas, bases de datos, servicios, sistemas de archivos, datos de mocks)

**NOTA CRÍTICA**: Esta fase primero genera **documentación de las pruebas**, NO código directamente. Son tres documentos que especifican QUÉ pruebas deben implementarse y POR QUÉ.

#### Subfases de Fase 4

**Subfase 4.1 - Documentación de Pruebas del Happy Path:**

- Crear listado de pruebas unitarias para el camino feliz
- Crear listado de pruebas de integración para el camino feliz
- Crear listado de pruebas de sistema para el camino feliz
- **Cada prueba debe incluir su justificación** (por qué debe hacerse)

**Subfase 4.2 - Documentación de Pruebas de Borde y Esquina:**

- Crear listado de pruebas unitarias para casos límite
- Crear listado de pruebas de integración para casos límite
- Crear listado de pruebas de sistema para casos límite
- **Cada prueba debe incluir su justificación**

**Subfase 4.3 - Documentación de Pruebas del Unhappy Path:**

- Crear listado de pruebas unitarias para manejo de errores
- Crear listado de pruebas de integración para manejo de errores
- Crear listado de pruebas de sistema para manejo de errores
- **Cada prueba debe incluir su justificación**

**Subfase 4.4 - Especificación de Estrategia de Moqueo:**

- **PROMPT FALTANTE**: `[phase_4.mocking-strategy-specification.prompt.md]`
- Debe generar documento que especifique:
  - Criterios de moqueo (qué se debe moquear y por qué)
  - APIs externas a moquear
  - Bases de datos a moquear
  - Servicios externos a moquear
  - Sistemas de archivos a moquear
  - Estrategia de moqueo apropiada
  - Datos apropiados para los mocks

### Criterios de Mockeo

Los siguientes elementos deben ser mockeados en las pruebas:

- **APIs externas:** Simular todas las respuestas posibles incluyendo errores, timeouts y casos límite
- **Bases de datos:** Mockear operaciones de persistencia, consulta, transacciones
- **Servicios externos:** Simular latencias, fallos de conectividad, respuestas parciales
- **Sistemas de archivos:** Mockear operaciones de I/O cuando sea aplicable

### Entregable (Primera Parte - Documentación)

Tres documentos de especificación de pruebas que incluyan:

**Documento 1 - Happy Path (Camino Feliz):**

- Listado completo de pruebas unitarias con justificación
- Listado completo de pruebas de integración con justificación
- Listado completo de pruebas de sistema con justificación

**Documento 2 - Edge Cases (Casos de Borde y Esquina):**

- Listado completo de pruebas unitarias con justificación
- Listado completo de pruebas de integración con justificación
- Listado completo de pruebas de sistema con justificación

**Documento 3 - Unhappy Path (Camino Infeliz):**

- Listado completo de pruebas unitarias con justificación
- Listado completo de pruebas de integración con justificación
- Listado completo de pruebas de sistema con justificación

**Documento 4 - Estrategia de Moqueo** (cuando el prompt esté disponible):

- Especificación detallada de qué moquear y cómo
- Datos apropiados para los mocks
- Estrategias de simulación de fallos

### Responsabilidad del Desarrollador (Parte 1)

Después de generar los tres documentos de especificación de pruebas, el desarrollador debe:

- **Leer los tres documentos** completos
- **Validar** que las pruebas especificadas sean las correctas
- **Verificar** que los caminos elegidos (Happy, Edge, Unhappy) sean apropiados
- **Dar fe** de que esas son las pruebas que deben implementarse
- **NO APROBAR** si existen dudas sobre la cobertura o pertinencia de las pruebas
- **Aprobar explícitamente** antes de continuar a Fase 4.1

**CRÍTICO**: El desarrollador debe hacer el análisis correspondiente sobre la completitud y pertinencia de las pruebas especificadas.

### Notas Importantes (Parte 1)

**Sin Código Aún**: En esta primera parte de Fase 4, NO se genera código. Solo se generan tres documentos que especifican QUÉ pruebas deben implementarse.

**Estrategia de Moqueo Pendiente**: Falta el prompt para generar la especificación de moqueo. Esta documentación debería completar los tres documentos anteriores con información sobre cómo moquear dependencias.

**Orden de Documentos**: Se generan en orden: Happy Path → Borde y Esquina → Unhappy Path.

**Human in the Loop**: El desarrollador debe leer y validar los tres documentos, no simplemente aprobarlos automáticamente.

---

## Fase 4.1: Validación de Cobertura de Pruebas

### Objetivo

Verificar que los documentos de especificación de pruebas cubran completamente todos los aspectos del requerimiento y no presenten gaps de validación.

### Entrada

**PRINCIPIO**: Fase 4.1 requiere **TODO el contexto usado en Fase 4** para validar completitud y cobertura de las especificaciones de pruebas contra ese mismo contexto. Este es el mismo principio aplicado en Fase 2.1 (valida Fase 2) y Fase 3.1 (valida Fase 3).

**NATURALEZA DE FASE 4.1**: Esta fase valida los TRES documentos de especificación de pruebas generados en Fase 4, ejecutando la validación SECUENCIALMENTE (un documento por invocación). Genera tres reportes de análisis de cobertura. Sus correcciones se integran en los documentos de Fase 4 (Principio de No Acumulación de Documentos).

- **Artefactos a Validar**: Los tres documentos de especificación de pruebas generados en Fase 4:
  1. Especificación de pruebas del Happy Path (`phase_4.happy-path.prompt.md` output)
  2. Especificación de pruebas de Edge/Corner Cases (`phase_4.edge-corner-cases.prompt.md` output)
  3. Especificación de pruebas del Unhappy Path (`phase_4.unhappy-path.prompt.md` output)
  4. Especificación de estrategia de moqueo (cuando esté disponible)

- **Documentos de Entrada Originales** (los mismos que alimentaron Fase 4):
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1
  - Plan de implementación arquitectónica de la Fase 2 (ya corregido con base en Fase 2.1)
  - **Especificación técnica detallada de la Fase 3** (ya corregida con base en Fase 3.1) — **REFERENCIA PRINCIPAL PARA VALIDAR TRAZABILIDAD**

**NOTA IMPORTANTE**: Los reportes de Fase 2.1 y Fase 3.1 NO entran como entradas separadas. Sus correcciones ya están integradas en los documentos de Fase 2 y Fase 3 respectivamente (Principio de No Acumulación de Documentos).

**NOTA SOBRE EJECUCIÓN SECUENCIAL**: A diferencia de Fases 2.1 y 3.1 que validan UN artefacto, Fase 4.1 valida TRES documentos. Por limitaciones de ventana de respuesta del LLM, la validación DEBE ejecutarse secuencialmente: primero Happy Path, luego Edge Cases, luego Unhappy Path. Cada invocación recibe el mismo contexto completo pero solo UN documento a validar.

---

**Contexto de Testing (PRIMARIO — IDÉNTICO a Fase 4):**

#### Estándares y Estrategias de Pruebas

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks aprobados y estrategias de pruebas
  - **Propósito en Fase 4.1**: Validar que las pruebas especificadas en Fase 4 cumplan los estándares de testing del proyecto. Verificar que la organización (unitarias/integración/sistema), convenciones de nombrado, patrones de test y estrategias de mocking sigan lo establecido.
  - **Uso específico**: Para cada prueba especificada, verificar: ¿está clasificada correctamente (unitaria vs integración vs sistema)? ¿el nombrado sigue la convención aprobada? ¿la estrategia de mocking es consistente con estándares? Detectar pruebas mal clasificadas (ej. una prueba que requiere BD real clasificada como "unitaria"). Verificar que los umbrales de cobertura esperados se alcanzarían con las pruebas especificadas.
  - **Criterio de rechazo**: Especificación de pruebas no cumple convenciones de testing del proyecto o clasifica pruebas incorrectamente → recomendar reclasificación y ajuste según estándares

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito en Fase 4.1**: Comparar la especificación de pruebas contra ejemplos de tests existentes para verificar que el nivel de detalle y cobertura sea comparable.
  - **Uso específico**: Si los ejemplos de referencia muestran que para un Repository se especifican N tipos de pruebas, verificar que los nuevos Repositories diseñados tengan cobertura similar. Detectar desviaciones significativas en nivel de detalle.
  - **Optimización**: Filtrar para incluir SOLO ejemplos de tests, misma optimización que Fase 4
  - **Criterio de rechazo**: Especificación tiene nivel de cobertura significativamente inferior al de los ejemplos de referencia → recomendar ampliación

---

**Contexto de Errores y Comportamiento Excepcional (IDÉNTICO a Fase 4):**

#### Manejo de Errores

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 4.1**: **CRÍTICO PARA VALIDAR COBERTURA DEL UNHAPPY PATH**. Verificar que TODAS las categorías de errores definidas en estándares tengan pruebas correspondientes. Detectar gaps donde un tipo de error no tiene prueba asociada.
  - **Uso específico**: Cruzar jerarquía de excepciones del estándar contra lista de pruebas del Unhappy Path. Para cada tipo de excepción en estándares, verificar que exista AL MENOS una prueba que lo cubra. Verificar que pruebas de logging validen los niveles correctos según estándares.
  - **Ejemplo**: Si estándares definen jerarquía `BusinessException → PaymentException → {DeclinedException, TimeoutException, FraudException}`, verificar que el documento de Unhappy Path tenga pruebas para cada una de estas excepciones.
  - **Criterio de rechazo**: Categorías completas de errores sin pruebas en el Unhappy Path → recomendar agregar pruebas para excepciones faltantes

---

**Contexto Arquitectónico (HEREDADO — IDÉNTICO a Fase 4, adaptado a validación):**

#### Fundamentos Arquitectónicos

- `project_architecture.context.md`: Arquitectura de alto nivel existente (C4 Level 1-2)
  - **Propósito en Fase 4.1**: Validar que las pruebas de integración cubran TODOS los puntos de interacción entre módulos/bounded contexts relevantes al requerimiento. Detectar interacciones arquitectónicas sin pruebas de integración.
  - **Uso específico**: Mapear interacciones entre módulos en la arquitectura contra pruebas de integración especificadas. Si arquitectura muestra que el flujo pasa por módulos A → B → C, verificar que existan pruebas de integración para A↔B y B↔C. Detectar flujos end-to-end sin pruebas de sistema.
  - **Criterio de rechazo**: Interacciones entre bounded contexts sin pruebas de integración → recomendar agregar pruebas para cada punto de integración no cubierto

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 4.1**: Verificar que las estrategias de testing sean apropiadas para los patrones usados. Cada patrón tiene expectativas de testing específicas.
  - **Uso específico**: Si el diseño usa patrón Repository, verificar que haya pruebas de integración con BD (no solo unitarias con mock). Si usa Observer, verificar pruebas de notificación a múltiples observers. Si usa Strategy, verificar pruebas para cada estrategia concreta.
  - **Criterio de rechazo**: Patrón arquitectónico con estrategia de testing inadecuada (ej. Repository solo con mocks, sin prueba de integración real) → recomendar completar con tipo de prueba apropiado

#### Contexto de Componentes Existentes

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 4.1**: Validar que la estrategia de moqueo sea correcta y completa. Verificar que se mockeen las dependencias apropiadas y que los mocks reflejen interfaces reales.
  - **Uso específico**: Para cada mock especificado, verificar que la interfaz mockeada exista en el inventario con los métodos referenciados. Detectar dependencias que deberían mockearse pero no están en la estrategia. Detectar componentes internos estables que se mockean innecesariamente.
  - **Criterio de rechazo**: Mocks de interfaces inexistentes o con firmas incorrectas → recomendar corrección según inventario real. Dependencias externas no mockeadas → recomendar agregar mock.

---

**Contexto de Dominio (IDÉNTICO a Fase 4):**

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito en Fase 4.1**: Verificar que las descripciones de pruebas usen terminología canónica del dominio. Detectar inconsistencias terminológicas entre los tres documentos de pruebas.
  - **Uso específico**: Validar consistencia de términos entre documentos de Happy Path, Edge Cases y Unhappy Path. Si un documento dice "cliente moroso" y otro dice "usuario con deuda", detectar la inconsistencia. Verificar que reglas de negocio implícitas en términos del dominio tengan edge cases asociados.
  - **Criterio de rechazo**: Inconsistencia terminológica entre documentos de pruebas → recomendar unificación según lenguaje ubicuo

---

**Contexto de Datos e Integraciones (IDÉNTICO a Fase 4):**

#### Persistencia

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes)
  - **Propósito en Fase 4.1**: Validar que los edge cases derivados del esquema de BD estén cubiertos. Verificar que los datos de prueba propuestos sean compatibles con constraints reales.
  - **Uso específico**: Cruzar constraints del esquema (NOT NULL, UNIQUE, FK, CHECK, tipos de datos) contra pruebas de Edge Cases. Para cada constraint relevante, verificar que exista prueba que valide comportamiento en el límite. Detectar constraints sin pruebas (ej. campo UNIQUE sin prueba de duplicados).
  - **Ejemplo**: Si esquema tiene `email VARCHAR(255) UNIQUE NOT NULL`, verificar que Edge Cases incluyan: email vacío, email nulo, email duplicado, email con 255 caracteres, email con 256 caracteres.
  - **Optimización**: Incluir solo esquema de tablas referenciadas en la especificación de Fase 3
  - **Criterio de rechazo**: Constraints de BD sin pruebas de edge case correspondientes → recomendar agregar pruebas para cada constraint no cubierto

#### Integraciones

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito en Fase 4.1**: Validar que las pruebas cubran TODOS los códigos de respuesta documentados en los contratos. Verificar que mocks sean fieles a contratos reales.
  - **Uso específico**: Cruzar códigos de respuesta documentados en contrato contra pruebas especificadas. Para cada código de error en el contrato (400, 401, 403, 404, 422, 429, 500, 503, timeout), verificar que exista prueba correspondiente. Detectar códigos de error sin prueba.
  - **Carga condicional**: Solo si Fase 4 cargó este archivo (hay integraciones)
  - **Ejemplo**: Si contrato documenta 6 códigos de respuesta y las pruebas solo cubren 4, reportar los 2 faltantes como gap de cobertura.
  - **Criterio de rechazo**: Códigos de respuesta de API sin pruebas → recomendar agregar prueba para cada código no cubierto

---

**Contexto Tecnológico (IDÉNTICO a Fase 4):**

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 4.1**: Verificar que las pruebas especificadas sean implementables con el stack disponible. Detectar pruebas que asumen herramientas o librerías no disponibles.
  - **Uso específico**: Validar que estrategias de mocking especificadas sean soportadas por las librerías del stack. Verificar que pruebas de integración asuman herramientas disponibles (ej. no especificar TestContainers si Docker no está disponible en CI). Detectar incompatibilidades entre lo especificado y lo implementable.
  - **Criterio de rechazo**: Pruebas que requieren herramientas no aprobadas o no disponibles en el stack → recomendar alternativa compatible

---

**Contexto Condicional (cargar según necesidad — misma condicionalidad que Fase 4):**

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 4.1**: Verificar que TODOS los requisitos de seguridad relevantes tengan pruebas asociadas. Detectar gaps en cobertura de seguridad.
  - **Uso específico**: Cruzar cada requisito de seguridad contra pruebas especificadas. ¿Hay prueba de autenticación fallida? ¿De autorización insuficiente? ¿De inyección SQL? ¿De XSS? ¿De exposición de datos sensibles? Cada control de seguridad diseñado en Fase 3 debe tener prueba de validación.
  - **Carga condicional**: Si Fase 4 cargó este archivo
  - **Criterio de rechazo**: Requisito de seguridad sin prueba asociada → recomendar agregar prueba de seguridad específica

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 4.1**: Verificar que las pruebas de performance especificadas cubran TODOS los umbrales definidos.
  - **Uso específico**: Para cada umbral de performance (tiempo de respuesta, throughput, concurrencia), verificar que exista prueba que lo valide con parámetros correctos. Detectar umbrales sin pruebas.
  - **Carga condicional**: Si Fase 4 cargó este archivo
  - **Criterio de rechazo**: Umbral de performance sin prueba asociada → recomendar agregar prueba de performance

---

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS (igual que Fase 4):**

❌ **NO incluir**:

- `code_style_guide.context.md` → Fase 4.1 valida ESPECIFICACIONES de pruebas, no código. Estilo de código es relevante en Fase 4.2.
- `documentation_templates.context.md` → No relevante para validación de cobertura de pruebas.
- `project_directory_tree.context.md` → Ubicación de archivos no es relevante para validar cobertura. Se necesita en Fase 4.2.
- `architecture_decision_records.context.md` → Decisiones ya reflejadas en Fase 3; la validación de cobertura se hace contra comportamiento especificado, no contra ADRs.
- `deployment_and_infrastructure_context.context.md` → Restricciones de deployment ya incorporadas en diseño de Fase 3. Validación de pruebas no necesita contexto de infraestructura.
- `refactoring_guidelines.context.md` → Específico de Fase 6.
- `project_structure_principles.context.md` → No relevante para validación de cobertura.

**RAZÓN DE EXCLUSIONES**: Fase 4.1 valida COBERTURA DE PRUEBAS. Los mismos archivos excluidos en Fase 4 deben excluirse en Fase 4.1. Estos archivos no aportan información adicional relevante para validar si las especificaciones de pruebas son completas y correctas.

---

**PRINCIPIO DE COHERENCIA**:
Fase 4.1 debe usar **EXACTAMENTE el mismo conjunto de archivos de contexto** que Fase 4. Si Fase 4 cargó archivo X, Fase 4.1 DEBE cargarlo. Si Fase 4 excluyó archivo Y, Fase 4.1 DEBE excluirlo. Esto garantiza que la validación evalúe las especificaciones de pruebas contra el mismo contexto que las generó.

**NOTA SOBRE CARGA CONDICIONAL**:
Si Fase 4 cargó condicionalmente `api_integration_contracts.context.md`, `security_and_compliance_requirements.context.md` o `performance_benchmarks_and_thresholds.context.md`, Fase 4.1 DEBE cargar los mismos archivos. La condicionalidad se determina en Fase 3; Fase 4 la replica; Fase 4.1 la hereda.

---

**RESPONSABILIDAD ÚNICA DE FASE 4.1 — VALIDACIÓN DE TRAZABILIDAD:**

Fase 4.1 tiene una responsabilidad que NO tienen las fases de validación anteriores (2.1 y 3.1): debe validar **TRAZABILIDAD BIDIRECCIONAL** entre Fase 3 y Fase 4.

**Trazabilidad hacia adelante (Fase 3 → Fase 4):**
Cada elemento de la especificación de Fase 3 debe tener AL MENOS una prueba correspondiente:

| Elemento de Fase 3                | Prueba esperada                                    | Documento donde buscar      |
| --------------------------------- | -------------------------------------------------- | --------------------------- |
| Método/operación especificada     | Prueba unitaria que valide comportamiento correcto | Happy Path                  |
| Validación de entrada definida    | Prueba con datos en límites y datos inválidos      | Edge Cases + Unhappy Path   |
| Integración entre componentes     | Prueba de integración del flujo completo           | Happy Path                  |
| Manejo de error especificado      | Prueba que provoque el error y valide manejo       | Unhappy Path                |
| Flujo end-to-end descrito         | Prueba de sistema del flujo completo               | Happy Path                  |
| Restricción de seguridad diseñada | Prueba que valide control de seguridad             | Unhappy Path                |
| Umbral de performance             | Prueba de carga/tiempo de respuesta                | Happy Path (si condicional) |

**Trazabilidad inversa (Fase 4 → Fase 3):**
Cada prueba especificada en Fase 4 debe estar JUSTIFICADA por un elemento de la especificación de Fase 3. Pruebas que no corresponden a ningún elemento de Fase 3 son sospechosas (pueden ser innecesarias o revelar que Fase 3 tiene gaps).

**CRITERIO DE RECHAZO POR TRAZABILIDAD**: Si más del 10% de los elementos de Fase 3 no tienen prueba correspondiente, el documento de pruebas tiene un gap significativo de cobertura → recomendar completar con pruebas faltantes.

---

**VALIDACIÓN POR DOCUMENTO (ejecución secuencial):**

Cada invocación del LLM valida UN documento contra el contexto completo, con énfasis diferente:

#### Validación 1: Happy Path

- **Archivo a validar**: Especificación de pruebas del Happy Path
- **Enfoque de validación**:
  - ¿Cada operación/método de Fase 3 tiene prueba unitaria de camino feliz?
  - ¿Cada integración entre componentes tiene prueba de integración?
  - ¿Cada flujo end-to-end tiene prueba de sistema?
  - ¿Los datos de prueba son realistas y compatibles con esquema de BD?
- **Archivos de contexto con énfasis**: Fase 3 spec, `project_architecture.context.md`, `testing_standards_and_patterns.context.md`

#### Validación 2: Edge/Corner Cases

- **Archivo a validar**: Especificación de pruebas de Edge/Corner Cases
- **Enfoque de validación**:
  - ¿Cada constraint de BD tiene prueba de caso límite? (nullable, unique, tipos de dato)
  - ¿Cada validación de entrada tiene pruebas con valores en límites?
  - ¿Cada integración con API tiene pruebas de casos límite? (pagination, rate limits, datos vacíos)
  - ¿Las reglas de negocio del dominio tienen edge cases cubiertos?
- **Archivos de contexto con énfasis**: `database_schema.context.md`, `api_integration_contracts.context.md`, `business_domain_dictionary.context.md`

#### Validación 3: Unhappy Path

- **Archivo a validar**: Especificación de pruebas del Unhappy Path
- **Enfoque de validación**:
  - ¿Cada categoría de excepción en estándares tiene prueba correspondiente?
  - ¿Cada código de error de API tiene prueba?
  - ¿Los controles de seguridad tienen pruebas de violación?
  - ¿Los escenarios de fallo (timeout, conexión perdida, datos corruptos) están cubiertos?
- **Archivos de contexto con énfasis**: `error_handling_and_logging_standards.context.md`, `api_integration_contracts.context.md`, `security_and_compliance_requirements.context.md`

---

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con prompts específicos definidos, pero **DEBE EJECUTARSE PUNTO POR PUNTO**, no todos los documentos simultáneamente.

- **Validación Happy Path**: `phase_4-1.validation-happy-path.prompt.md`
- **Validación Edge Cases**: `phase_4-1.validation-edge-corner-cases.prompt.md`
- **Validación Unhappy Path**: `phase_4-1.validation-unhappy-path.prompt.md`

**Prompts Faltantes**:

- `[phase_4-1.integration-corrections-happy-path.prompt.md]` - Para integrar correcciones al documento de Happy Path
- `[phase_4-1.integration-corrections-edge-cases.prompt.md]` - Para integrar correcciones al documento de Edge Cases
- `[phase_4-1.integration-corrections-unhappy-path.prompt.md]` - Para integrar correcciones al documento de Unhappy Path
- `[phase_4-1.validate-integration.prompt.md]` - Para validar que las correcciones se integraron apropiadamente

**IMPORTANTE - Limitación de Ventana de Respuesta**: La IA tiene una ventana de contexto limitada para respuestas. Analizar los tres documentos simultáneamente generaría una respuesta incompleta. Por tanto, **se debe ejecutar la validación secuencialmente**:

1. Primero: Validar documento de Happy Path
2. Segundo: Validar documento de Edge Cases
3. Tercero: Validar documento de Unhappy Path

Para cada documento, emplear inteligencia artificial para analizar:

1. **Cobertura funcional:** Verificación de que todos los casos de uso del documento estén cubiertos
2. **Cobertura de casos límite:** Validación de escenarios extremos y de error (para documentos de Edge y Unhappy)
3. **Cobertura de integración:** Verificación de todas las interacciones entre componentes
4. **Análisis de gaps:** Identificación de aspectos no cubiertos por las pruebas especificadas en ese documento

### Criterios de Validación

**Completitud Funcional**: Todos los aspectos del requerimiento deben tener pruebas asociadas

**Cobertura de Escenarios**: Happy Path, Edge Cases y Unhappy Path deben estar adecuadamente cubiertos

**Ausencia de Gaps**: No deben existir áreas del requerimiento sin validación

### Entregable

**Tres reportes de análisis de cobertura** (uno por cada documento), cada uno incluyendo:

- **Evaluación de completitud** de ese conjunto específico de pruebas
- **Identificación de gaps de cobertura** en ese documento específico
- **Recomendaciones para pruebas adicionales** necesarias en ese documento

### Flujos Posibles

Esta fase tiene dos caminos divergentes:

**Camino 1 - Cobertura Completa (Happy Path)**:

- Los tres reportes indican que la cobertura es completa
- El desarrollador valida los reportes y aprueba continuar
- **Se procede directamente a Fase 4.2** (Implementación del código de pruebas)

**Camino 2 - Gaps de Cobertura Identificados (Unhappy Path)**:

- Uno o más reportes identifican gaps o pruebas adicionales necesarias
- El desarrollador debe:
  1. **Leer y validar cada reporte**, eliminando recomendaciones no aplicables
  2. **Corregir los documentos de Fase 4** integrando las pruebas adicionales necesarias
  3. **Validar** que las correcciones se integraron apropiadamente

**NOTA**: NO tenemos prompts documentados para:

- Integrar automáticamente las correcciones de Fase 4.1 en los documentos de Fase 4
- Validar que esa integración se realizó correctamente

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Ejecutar la validación secuencialmente** (punto por punto), no simultáneamente
- **Leer cada reporte** y aplicar criterio técnico sobre su validez
- **Ser crítico** con las recomendaciones de la IA - no todas son necesarias
- Si se identifican gaps reales:
  - **Corregir los documentos de Fase 4** con pruebas adicionales necesarias
  - **NO acumular documentos** - la Fase 4.1 corrige los documentos de Fase 4
  - Validar que las pruebas adicionales se integraron apropiadamente
- **Aprobar explícitamente** los documentos corregidos antes de continuar a Fase 4.2
- NO proceder si existen dudas sobre la cobertura de pruebas

**CRÍTICO**: Similar a fases de validación anteriores, la IA puede sugerir pruebas adicionales innecesarias. El desarrollador debe evaluar cada recomendación con criterio profesional.

### Notas Importantes

**Ejecución Secuencial Obligatoria**: NO se pueden validar los tres documentos en una sola ejecución por limitaciones de ventana de respuesta de la IA. Esto generaría análisis incompletos y pérdida de información.

**Analogía del Hablante**: "No es lo mismo hablar en cinco minutos de una persona a hablar en cinco minutos de tres personas. Obviamente va a quedar mucha información por fuera."

**No Acumulación de Documentos**: Los reportes de Fase 4.1 NO se agregan como documentos separados. Su propósito es corregir y completar los documentos de Fase 4.

**Prompts Faltantes**: Se requieren prompts para automatizar la integración de pruebas adicionales y su validación.

**Human in the Loop Intensivo**: El desarrollador debe organizar y tunear cada uno de los tres reportes antes de integrar correcciones.

---

## Fase 4.2: Implementación del Código de Pruebas

### Objetivo

Implementar en código todas las pruebas especificadas en los documentos de Fase 4 (ya validados y corregidos con base en Fase 4.1). Aquí es donde **sí se desarrolla código** - el código de las pruebas automatizadas.

### Entrada

**PRINCIPIO**: Fase 4.2 es la **PRIMERA FASE QUE GENERA CÓDIGO** en toda la metodología GAIDD. Este cambio fundamental requiere REINCORPORAR archivos de contexto de implementación que fueron excluidos en Fases 4 y 4.1 (donde solo se generaba documentación). Fase 4.2 hereda el contexto de Fase 4 y AGREGA archivos necesarios para escribir código.

**NATURALEZA DE FASE 4.2**: Esta fase implementa en CÓDIGO EJECUTABLE todas las pruebas especificadas en los documentos de Fase 4 (ya validados y corregidos por Fase 4.1). Genera código de tests unitarios, de integración, de sistema, e implementaciones de mocks. La ejecución es SECUENCIAL: Happy Path → Edge Cases → Unhappy Path.

**PRINCIPIO TDD**: Todas las pruebas implementadas DEBEN FALLAR. No existe código de producción aún (se implementa en Fase 5). Si alguna prueba pasa, es un indicador de que está mal escrita.

- **Artefactos de Fases Previas**:
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1
  - Plan de implementación arquitectónica de la Fase 2 (ya corregido con base en Fase 2.1)
  - **Especificación técnica detallada de la Fase 3** (ya corregida con base en Fase 3.1) — Define el comportamiento que las pruebas deben validar

- **Artefactos Primarios (la BASE para implementar)**:
  - **Los tres documentos de especificación de pruebas de Fase 4** (ya corregidos con base en Fase 4.1):
    1. Especificación de pruebas del Happy Path
    2. Especificación de pruebas de Edge/Corner Cases
    3. Especificación de pruebas del Unhappy Path
    4. Especificación de estrategia de moqueo (cuando esté disponible)

**NOTA IMPORTANTE**: Los reportes de Fase 4.1 NO entran como entradas separadas. Sus correcciones ya están integradas en los documentos de Fase 4 (Principio de No Acumulación de Documentos).

**RELACIÓN ENTRE ARTEFACTOS**: Los documentos de Fase 4 dicen QUÉ pruebas implementar y POR QUÉ. La especificación de Fase 3 dice QUÉ COMPORTAMIENTO validan esas pruebas (necesario para entender el contexto de cada test). Los archivos de contexto dicen CÓMO escribir el código.

---

**Contexto de Testing y Código de Referencia (PRIMARIO en Fase 4.2):**

#### Estándares de Pruebas

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks aprobados y estrategias de pruebas
  - **Propósito en Fase 4.2**: **ARCHIVO MÁS IMPORTANTE**. Define CÓMO implementar las pruebas: qué framework usar, cómo estructurar archivos de test, cómo nombrar clases y métodos de test, cómo configurar fixtures, cómo implementar mocks.
  - **Uso específico**: Determinar imports y setup necesarios para cada tipo de test. Implementar patrón Arrange-Act-Assert o Given-When-Then según estándares. Configurar test runners. Implementar test fixtures y data builders. Aplicar convenciones de nombrado de tests en código (`test_should_return_X_when_Y`, `@DisplayName("should...")`, etc.).
  - **Ejemplo**: Si estándares dicen "usar `@SpringBootTest` para integration tests con slice `@DataJpaTest` para repository tests", implementar las anotaciones correctas en cada clase de test.
  - **Contenido clave**: Framework API (JUnit 5, Jest, pytest), lifecycle hooks (@BeforeEach, @AfterAll), assertion libraries (AssertJ, Chai), mocking frameworks (Mockito, jest.mock), test runners, configuración de test contexts

#### Ejemplos de Referencia

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito en Fase 4.2**: **CRÍTICO PARA FEW-SHOT LEARNING**. Proveer ejemplos reales de código de tests del proyecto para que el LLM genere código consistente con el estilo existente. Este es donde el few-shot learning tiene máximo impacto.
  - **Uso específico**: Copiar estructura, imports, patrones de setup/teardown, estilo de assertions de tests existentes. Si el proyecto tiene un `BaseIntegrationTest` o un `TestDataBuilder`, usar esos mismos patrones. Mantener consistencia con el estilo de tests que ya existe en el codebase.
  - **Optimización**: **Filtrar para incluir PRIMORDIALMENTE ejemplos de tests**. Si el archivo contiene ejemplos de producción y tests, priorizar los tests. Incluir al menos: un ejemplo de unit test, un ejemplo de integration test, un ejemplo de mock setup.
  - **DECISIÓN PENDIENTE**: Si `reference_code_examples.context.md` no contiene suficientes ejemplos de tests, considerar crear `reference_test_examples.context.md` separado. En Fase 4.2 es donde esta decisión tiene mayor impacto.
  - **Ejemplo**: Si tests existentes usan `TestDataFactory.createPayment(overrides)` para crear datos de prueba, el LLM debe usar el mismo patrón, no crear objetos manualmente en cada test.

---

**Contexto de Código y Estilo (REINCORPORADO en Fase 4.2):**

#### Estándares de Código

- `code_style_guide.context.md`: Guía de estilo de código específica del stack
  - **Propósito en Fase 4.2**: **REINCORPORADO** — fue excluido en Fases 4/4.1 porque generaban documentación. Ahora que se genera CÓDIGO, es indispensable para que el código de tests siga las convenciones del proyecto.
  - **Uso específico**: Aplicar convenciones de nomenclatura (PascalCase para clases de test, camelCase para métodos). Respetar organización de imports. Cumplir límites de complejidad ciclomática incluso en tests. Aplicar formato de código consistente (indentación, espaciado, longitud de línea).
  - **Ejemplo**: Si guía dice "máximo 20 líneas por método", y un test requiere setup extenso, extraer el setup a métodos helper `@BeforeEach` o factory methods.
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: El Principio de Evolución de Contexto permite agregar archivos cuando el objetivo de la fase lo requiere. Fase 4.2 genera código → necesita guía de estilo. Esta es la misma razón por la que `code_style_guide.context.md` apareció por primera vez en Fase 3 (que describe código sin generarlo) y ahora reaparece en Fase 4.2 (que genera código de tests).

#### Estructura del Proyecto

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito en Fase 4.2**: **REINCORPORADO** — fue excluido en Fases 4/4.1 porque la ubicación de archivos no era relevante para especificar pruebas. Ahora que se CREAN archivos de test, es necesario saber DÓNDE ubicarlos.
  - **Uso específico**: Determinar dónde crear archivos de test según convenciones del proyecto. ¿Tests junto al código fuente (`src/services/__tests__/`)? ¿En directorio separado (`test/unit/services/`)? ¿Mirror de la estructura de producción? Respetar convenciones de nombrado de archivos de test (`*.test.ts`, `*Test.java`, `test_*.py`).
  - **Ejemplo**: Si proyecto tiene estructura `src/main/java/.../services/PaymentService.java`, los tests deben ir en `src/test/java/.../services/PaymentServiceTest.java` (Java convention). Si es Node.js con `src/services/payment.service.ts`, los tests en `src/services/__tests__/payment.service.test.ts` o `tests/unit/services/payment.service.test.ts`.
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: Generar código requiere saber dónde colocarlo. En Fases 4/4.1 (documentación), la ubicación era irrelevante. En Fase 4.2 (código), es esencial.

---

**Contexto de Errores (HEREDADO de Fase 4):**

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 4.2**: Implementar correctamente las pruebas del Unhappy Path. Conocer la jerarquía de excepciones para importarlas y usarlas en assertions. Saber cómo verificar logging en tests.
  - **Uso específico**: Importar clases de excepción correctas (`assertThrows(PaymentDeclinedException.class, ...)`). Implementar verificación de logging usando test appenders o log capturers según estándares. Configurar mocks para lanzar excepciones específicas.
  - **Ejemplo**: Si estándares definen `BusinessException` como clase base, implementar `assertThat(thrown).isInstanceOf(PaymentDeclinedException.class).hasMessage("Payment declined: insufficient funds")` usando la jerarquía correcta.

---

**Contexto Arquitectónico (HEREDADO de Fase 4):**

#### Fundamentos Arquitectónicos

- `project_architecture.context.md`: Arquitectura de alto nivel existente (C4 Level 1-2)
  - **Propósito en Fase 4.2**: Entender los límites entre módulos para implementar correctamente la configuración de tests de integración. Saber qué contextos de Spring/módulos levantar para cada tipo de test.
  - **Uso específico**: Configurar test contexts apropiados para pruebas de integración (ej. `@SpringBootTest(classes = {PaymentModule.class})` en lugar de levantar toda la aplicación). Entender qué módulos interactúan para configurar mocks de módulos externos.
  - **Ejemplo**: Si prueba de integración valida interacción entre módulo Pedidos y módulo Pagos, saber que debe levantar ambos módulos pero mockear módulo Notificaciones.

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 4.2**: Implementar tests que respeten la arquitectura de patrones. Si se usa Dependency Injection, implementar la inyección de mocks correctamente. Si se usa Repository pattern, implementar tests con el nivel de abstracción correcto.
  - **Uso específico**: Configurar inyección de mocks según patrón DI del proyecto (`@MockBean`, `@InjectMocks`, constructor injection). Implementar test doubles apropiados: mocks para verificar interacciones, stubs para proveer datos, fakes para simular comportamiento complejo.
  - **Ejemplo**: Si el proyecto usa constructor injection, inyectar mocks vía constructor en tests: `new PaymentService(mockGateway, mockNotifier)` en lugar de usar reflection.

#### Contexto de Componentes Existentes

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 4.2**: **ESENCIAL PARA IMPLEMENTAR MOCKS**. Conocer las interfaces y firmas de métodos reales para crear mocks fieles. Saber qué componentes ya tienen test utilities existentes (factories, builders, fixtures).
  - **Uso específico**: Crear mocks que implementen las interfaces correctas con las firmas exactas. Si existe `PaymentGateway` con `CompletableFuture<PaymentResult> charge(PaymentRequest request)`, el mock debe respetar esta firma incluyendo tipo de retorno. Reutilizar test utilities existentes si las hay.
  - **Ejemplo**: `when(mockPaymentGateway.charge(any(PaymentRequest.class))).thenReturn(CompletableFuture.completedFuture(PaymentResult.success()))` — la firma debe coincidir exactamente con la interfaz real.

---

**Contexto de Dominio (HEREDADO de Fase 4):**

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito en Fase 4.2**: Nombrar clases de test, métodos de test, variables de test data y fixtures usando lenguaje ubicuo. Crear datos de prueba con valores del dominio realistas.
  - **Uso específico**: Nombres de test: `should_calculate_monthly_churn_when_client_has_active_contract()` usando terminología del dominio. Variables de test: `validPayment`, `declinedTransaction`, `activeClient` con nombres del diccionario. Test data factories que generen objetos con atributos realistas del dominio.
  - **Ejemplo**: Si diccionario dice "Monto mínimo de transacción = 1.00 USD", el test data builder debe usar valores realistas: `TestPayment.builder().amount(150.00).currency("USD").build()`, no `amount(999999)`.

---

**Contexto de Datos e Integraciones (HEREDADO de Fase 4):**

#### Persistencia

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes)
  - **Propósito en Fase 4.2**: Crear scripts de datos de prueba (SQL inserts, migrations de test) compatibles con el esquema real. Configurar bases de datos en memoria para integration tests.
  - **Uso específico**: Crear archivos `test-data.sql` o programmatic setup con datos que respeten constraints reales (NOT NULL, FK, UNIQUE). Configurar H2/SQLite/TestContainers con esquema compatible. Implementar cleanup entre tests (transactional rollback o truncate).
  - **Ejemplo**: Si tabla `payments` tiene FK a `users`, el test data setup debe crear primero el user antes de crear el payment. `INSERT INTO users (id, email) VALUES (1, 'test@test.com'); INSERT INTO payments (user_id, amount) VALUES (1, 100.00);`
  - **Optimización**: Incluir solo esquema de tablas referenciadas en las especificaciones de pruebas

#### Integraciones

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito en Fase 4.2**: Implementar mocks de API que retornen payloads exactamente en el formato documentado. Implementar stubs de servidor para integration tests de API.
  - **Uso específico**: Crear mock responses con la estructura JSON/XML exacta del contrato. Implementar WireMock/MockServer stubs para tests de integración. Configurar mock servers que simulen latencia, timeouts y errores según contrato.
  - **Carga condicional**: Solo si Fase 4 cargó este archivo
  - **Ejemplo**: Si contrato dice `{"status": "declined", "error_code": "INSUFFICIENT_FUNDS", "message": "..."}`, el mock debe retornar exactamente esa estructura, no una simplificada.

---

**Contexto Tecnológico (HEREDADO de Fase 4):**

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 4.2**: **MÁS CRÍTICO QUE EN FASE 4** porque ahora necesitamos conocer las APIs exactas de los frameworks de testing. No solo qué framework usar, sino CÓMO usarlo.
  - **Uso específico**: Importar correctamente las librerías de testing aprobadas. Usar la versión correcta de la API (ej. JUnit 5 `@Test` de `org.junit.jupiter.api`, no JUnit 4 `@Test` de `org.junit`). Configurar build files (pom.xml, package.json) con dependencias de test correctas si necesario.
  - **Ejemplo**: Si stack dice "Mockito 5.x", usar API de Mockito 5: `Mockito.lenient().when(...)` si necesario, no API deprecated de versiones anteriores.

---

**Contexto Condicional (misma condicionalidad que Fase 4):**

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 4.2**: Implementar pruebas de seguridad con las herramientas y técnicas apropiadas. Configurar test contexts con autenticación/autorización para security tests.
  - **Uso específico**: Implementar tests con tokens JWT de prueba, configurar mock authentication providers, crear test users con diferentes roles/permisos, implementar tests de inyección con payloads reales pero seguros.
  - **Carga condicional**: Si Fase 4 cargó este archivo
  - **Ejemplo**: `mockMvc.perform(get("/api/payments").header("Authorization", "Bearer " + invalidToken)).andExpect(status().isUnauthorized())`

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 4.2**: Implementar tests de performance con las herramientas y umbrales correctos.
  - **Uso específico**: Configurar test de carga con herramientas aprobadas (JMeter, k6, Gatling). Implementar assertions de tiempo de respuesta. Configurar paralelismo y ramp-up apropiados.
  - **Carga condicional**: Si Fase 4 cargó este archivo
  - **Ejemplo**: `assertTimeout(Duration.ofMillis(200), () -> paymentService.processPayment(request))` para validar umbral de P95 < 200ms.

---

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS:**

❌ **NO incluir**:

- `documentation_templates.context.md` → Templates de documentación técnica (JSDoc, Javadoc) para código de producción. Los requisitos de documentación de código de test (si los hay) están cubiertos por `testing_standards_and_patterns.context.md`. El código de tests no requiere el mismo nivel de documentación formal que el código de producción.

- `architecture_decision_records.context.md` → Las decisiones arquitectónicas ya están reflejadas en la especificación de Fase 3 y en las especificaciones de pruebas de Fase 4. El código de tests implementa lo especificado, no necesita consultar por qué se tomaron decisiones.

- `deployment_and_infrastructure_context.context.md` → El código de tests se ejecuta en entorno de desarrollo/CI, no en producción. Las restricciones de deployment no aplican a implementación de tests. Si hay restricciones de CI (ej. no Docker disponible), eso debería estar reflejado en `tech_stack_constraints.context.md`.

- `refactoring_guidelines.context.md` → Específico de Fase 6, no aplica a implementación de pruebas.

- `project_structure_principles.context.md` → Reemplazado por `project_directory_tree.context.md` que es más específico y concreto para ubicar archivos.

**RAZÓN DE EXCLUSIONES**: Fase 4.2 implementa CÓDIGO DE TESTS basándose en especificaciones ya validadas. Los archivos excluidos no aportan información necesaria para la implementación. La información arquitectónica y de diseño ya está destilada en los artefactos de Fase 3 y Fase 4.

---

**PRINCIPIO DE REINCORPORACIÓN DE CONTEXTO (Fase 4 → Fase 4.2):**

Fase 4.2 es un caso especial en la metodología: REINCORPORA archivos que fueron excluidos en su fase padre (Fase 4). Esto no viola el Principio de Coherencia porque Fase 4.2 NO es una fase de validación de Fase 4 (esa es Fase 4.1). Fase 4.2 es una fase de IMPLEMENTACIÓN con objetivo propio.

| Archivo                          | Fase 4 (Documentación) | Fase 4.1 (Validación) | Fase 4.2 (Código) | Razón                                       |
| -------------------------------- | :--------------------: | :-------------------: | :---------------: | ------------------------------------------- |
| `testing_standards_and_patterns` |           ✅           |          ✅           |        ✅         | Siempre necesario para testing              |
| `reference_code_examples`        |           ✅           |          ✅           |        ✅         | Few-shot learning, máximo impacto en 4.2    |
| `error_handling_and_logging`     |           ✅           |          ✅           |        ✅         | Unhappy path en todas las subfases          |
| `code_style_guide`               |           ❌           |          ❌           |        ✅         | **Solo necesario cuando se genera código**  |
| `project_directory_tree`         |           ❌           |          ❌           |        ✅         | **Solo necesario cuando se crean archivos** |
| `documentation_templates`        |           ❌           |          ❌           |        ❌         | Tests no requieren documentación formal     |
| `architecture_decision_records`  |           ❌           |          ❌           |        ❌         | Decisiones ya en Fase 3 spec                |

El patrón es claro: archivos de implementación de código entran cuando se genera código (Fase 3, 4.2, 5, 6) y se excluyen cuando se genera documentación (Fase 4, 4.1).

---

**NOTA SOBRE EJECUCIÓN SECUENCIAL:**

La implementación se ejecuta SECUENCIALMENTE por documento:

1. **Primero**: Implementar pruebas del Happy Path (unitarias + integración + sistema + mocks base)
2. **Segundo**: Implementar pruebas de Edge Cases (reutilizando mocks y fixtures del paso 1)
3. **Tercero**: Implementar pruebas del Unhappy Path (extendiendo mocks para escenarios de error)

Cada invocación del LLM recibe:

- El mismo conjunto de archivos de contexto
- UN documento de especificación de pruebas (el que se está implementando)
- Los artefactos de fases previas (priorizando Fase 3)
- **Código de tests ya implementado en pasos anteriores** (para reutilizar fixtures, helpers, mocks)

**NOTA CRÍTICA**: A partir del segundo paso, el LLM también necesita ver el código de tests ya generado en pasos anteriores para reutilizar factories, fixtures, mocks y helpers. Esto añade tokens al contexto pero evita duplicación de código.

---

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt para implementación de código de pruebas.

- **Prompt**: `phase_4-2.implementation-unit-tests.prompt.md`

**Prompt Faltante**:

- `[phase_4-2.verify-implementation-coverage.prompt.md]` - Para verificar que el código de pruebas implementado cubre el 100% de las especificaciones documentadas

**Orden de Implementación**:

1. **Primero: Implementar pruebas del Happy Path**
   - La IA implementa TODAS las pruebas unitarias especificadas
   - La IA implementa TODAS las pruebas de integración especificadas
   - La IA implementa TODAS las pruebas de sistema especificadas
   - Incluye implementación de mocks necesarios

2. **Segundo: Implementar pruebas de Edge Cases**
   - Implementación de pruebas unitarias de casos límite
   - Implementación de pruebas de integración de casos límite
   - Implementación de pruebas de sistema de casos límite

3. **Tercero: Implementar pruebas del Unhappy Path**
   - Implementación de pruebas unitarias de manejo de errores
   - Implementación de pruebas de integración de manejo de errores
   - Implementación de pruebas de sistema de manejo de errores

### Validación de Implementación

Después de implementar cada conjunto de pruebas (Happy Path, Edge Cases, Unhappy Path), se debe:

1. **Verificar que el código implementado cubra el 100%** de las especificaciones del documento correspondiente
2. **NOTA**: NO TENEMOS PROMPT DOCUMENTADO para esta verificación

### Comportamiento Esperado de las Pruebas

**CRÍTICO - Principio TDD**: En esta fase, **TODAS las pruebas deben FALLAR**. Esto es el comportamiento esperado y correcto porque:

- Aún no existe código de producción (se implementa en Fase 5)
- Las pruebas validan funcionalidad que todavía no está implementada
- Si las pruebas pasan en esta fase, algo está mal - probablemente estén mal escritas

### Entregable

Suite completa de pruebas automatizadas implementadas en código que incluya:

- **Código de pruebas unitarias** implementadas (con cobertura objetivo 90%+)
- **Código de pruebas de integración** para todos los puntos de interacción
- **Código de pruebas end-to-end** para flujos críticos
- **Mocks implementados** apropiados para todas las dependencias externas
- **Documentación de casos de prueba** (si no está ya en los documentos de Fase 4)

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Revisar el código de pruebas** generado por la IA
- **Ejecutar todas las pruebas** para verificar que fallen apropiadamente (comportamiento esperado en TDD)
- **Validar que las pruebas implementan correctamente** las especificaciones de los documentos de Fase 4
- Si las pruebas pasan (cuando no deberían), **investigar y corregir** - probablemente están mal escritas
- **Aprobar explícitamente** el código de pruebas antes de continuar a Fase 5
- Verificar que los mocks estén implementados correctamente
- NO proceder si existen dudas sobre la calidad o completitud del código de pruebas

**CRÍTICO**: El desarrollador es responsable del código de pruebas generado, no la IA. Debe revisar, validar y aprobar.

### Notas Importantes

**Prompts Faltantes**: Esta fase requiere desarrollo de prompts para:

1. Implementar código de pruebas basado en especificaciones
2. Verificar que la implementación cubre 100% de las especificaciones

**Implementación Secuencial**: Similar a validación en Fase 4.1, la implementación debe hacerse documento por documento (Happy → Edge → Unhappy) para mantener claridad y evitar problemas de ventana de contexto.

**Moqueo Incluido**: La implementación de mocks debe realizarse en esta fase según la estrategia de moqueo definida (cuando el prompt de Fase 4.4 esté disponible).

**Pruebas Deben Fallar**: Si las pruebas pasan en esta fase, es un indicador de problema. El desarrollador debe investigar por qué están pasando cuando no deberían.

**Dependencia de LLM**: La capacidad de "correr las pruebas automáticamente" depende del LLM utilizado. Algunos LLMs pueden ejecutar las pruebas, otros requieren que el desarrollador las ejecute manualmente.

---

## Fase 5: Implementación del Código de Local

### Objetivo

Desarrollar la implementación funcional que satisfaga completamente el requerimiento y **haga que todas las pruebas pasen de forma exitosa**. El objetivo principal es que el código **funcione correctamente y pase las pruebas**, sin importar si está óptimamente codificado (eso se mejora en Fase 6).

### Entrada

**PRINCIPIO**: Fase 5 genera CÓDIGO DE PRODUCCIÓN guiado por la especificación de Fase 3 (el "pináculo" de la metodología) y validado por la suite de pruebas de Fase 4.2. El contexto se enfoca en archivos necesarios para ESCRIBIR CÓDIGO DE PRODUCCIÓN de calidad: estilo, ejemplos, patrones, componentes existentes, esquema de datos, y manejo de errores.

**NATURALEZA DE FASE 5**: Esta fase implementa la funcionalidad completa que satisface el requerimiento. El objetivo es que el código **funcione y pase todas las pruebas**. La calidad óptima del código no es el foco principal — eso se aborda en Fase 6. El proceso es ITERATIVO: generar código → ejecutar tests → corregir → repetir hasta que todos los tests pasen.

**PRINCIPIO TDD (Green Phase)**: Fase 4.2 creó tests que FALLAN. Fase 5 escribe el código que los hace PASAR. Este es el paso "Green" del ciclo Red-Green-Refactor de TDD.

- **Artefactos de Fases Previas**:
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1
  - Documento de análisis técnico de la Fase 1
  - Plan de implementación arquitectónica de la Fase 2 (ya corregido con base en Fase 2.1)
  - **Especificación técnica detallada de la Fase 3** (ya corregida con base en Fase 3.1) — **EL ARTEFACTO PRINCIPAL: dice QUÉ implementar y CÓMO**

- **Suite de Pruebas Ejecutable**:
  - **Código de pruebas implementado en Fase 4.2** (ya ejecutable — las pruebas están programadas)
  - Incluye: tests unitarios, de integración, de sistema, mocks implementados

**EXCLUSIÓN EXPLÍCITA DE DOCUMENTACIÓN DE PRUEBAS**: Los tres documentos de especificación de Fase 4 (Happy Path, Edge Cases, Unhappy Path) **NO se incluyen**. Las pruebas ya están programadas en código ejecutable (Fase 4.2). El LLM no necesita la documentación de lo que ya está implementado — necesita el código de tests para entender qué debe pasar.

**NOTA SOBRE LOS TESTS**: En Fase 5, el desarrollador **no debería tener en el horizonte el tema de pruebas activamente**. Las pruebas ya existen y sirven como criterio de aceptación automático. El LLM debe enfocarse en implementar la funcionalidad basándose en la especificación de Fase 3; los tests simplemente validan que la implementación es correcta.

---

**Contexto de Código y Estilo (PRIMARIO en Fase 5):**

#### Estándares de Código

- `code_style_guide.context.md`: Guía de estilo de código específica del stack
  - **Propósito en Fase 5**: **CRÍTICO**. Todo el código de producción debe seguir las convenciones del proyecto. Nomenclatura, organización de archivos, límites de complejidad, formato de imports — todo aplica.
  - **Uso específico**: Nombrar clases, métodos, variables y paquetes según convenciones (PascalCase, camelCase, snake_case). Organizar archivos según estructura esperada. Respetar límites de complejidad ciclomática y longitud de métodos. Aplicar formato de código consistente.
  - **Ejemplo**: Si guía dice "métodos públicos máximo 15 líneas, extraer a métodos privados si excede", el LLM debe generar código que respete ese límite, incluso en esta fase donde la calidad no es el foco principal.
  - **NOTA**: Aunque Fase 5 prioriza funcionalidad sobre calidad, el código DEBE cumplir estándares básicos. "Sin importar si está óptimamente codificado" no significa ignorar convenciones — significa que la optimización profunda se deja para Fase 6.

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito en Fase 5**: **MÁXIMO IMPACTO DE FEW-SHOT LEARNING**. Proveer ejemplos reales de código de producción del proyecto para que el LLM genere código estilísticamente consistente con el codebase existente.
  - **Uso específico**: Seguir estructura de clases, patrones de imports, estilo de manejo de errores, patrones de logging de los ejemplos existentes. Si el proyecto tiene un estilo particular de implementar Repositories, Services, Controllers — seguir ese mismo estilo.
  - **Optimización**: **Filtrar para incluir PRIMORDIALMENTE ejemplos de código de producción**, no de tests. Incluir ejemplos de: servicios, repositorios, controladores, adaptadores, entidades — los tipos de componentes que se van a implementar según Fase 3.
  - **Ejemplo**: Si ejemplos muestran que Services del proyecto siempre reciben dependencias por constructor y logean al inicio y fin de cada operación pública, el nuevo código debe seguir ese mismo patrón.

#### Estructura del Proyecto

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito en Fase 5**: Saber DÓNDE crear los archivos de producción. Respetar la estructura existente del proyecto y convenciones de organización de código.
  - **Uso específico**: Crear archivos en las rutas exactas especificadas en Fase 3 (que fueron diseñadas consultando este mismo árbol). Verificar que las rutas son consistentes con la estructura existente. Colocar cada clase/módulo en su paquete/directorio correcto.
  - **Ejemplo**: Si Fase 3 dice "Crear `PaymentProcessor` en `src/main/java/com/project/payments/services/`", verificar que ese directorio existe (o crearlo según convenciones).

---

**Contexto Arquitectónico (REDUCIDO respecto a Fase 3):**

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 5**: Implementar correctamente los patrones seleccionados en Fase 2 y detallados en Fase 3. Asegurar que la implementación concreta respete las convenciones de cada patrón.
  - **Uso específico**: Si implementando un Repository, seguir convenciones del patrón Repository aprobadas (separación de concerns, manejo de transacciones, abstracción de BD). Si implementando un Service, no asumir responsabilidades de otra capa. Evitar antipatrones prohibidos (God Class, Service Locator si no está aprobado, etc.).
  - **Ejemplo**: Si estándares dicen "Services no deben acceder directamente a la BD, siempre a través de Repositories", implementar `paymentRepository.save(payment)` en el Service, no `jdbcTemplate.update(...)`.

**ARCHIVOS ARQUITECTÓNICOS EXCLUIDOS**:

- `project_architecture.context.md` (C4 Level 1-2): La arquitectura de alto nivel ya está destilada en la especificación de Fase 3. El implementador sigue la Fase 3 que dice exactamente qué crear y dónde — no necesita consultar el diagrama C4 para escribir código.
- `architecture_decision_records.context.md`: Las decisiones arquitectónicas ya están reflejadas en el diseño de Fase 3 y en el plan de Fase 2. El código implementa lo especificado, no necesita saber POR QUÉ se decidió usar ese patrón.

**JUSTIFICACIÓN**: Fase 5 sigue INSTRUCCIONES CONCRETAS de Fase 3. La Fase 3 ya consultó la arquitectura y los ADRs para producir una especificación detallada. Fase 5 implementa esa especificación — es un nivel de abstracción diferente. Incluir la arquitectura de alto nivel y ADRs consumiría tokens sin aportar información accionable para la implementación.

---

**Contexto de Componentes Existentes:**

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 5**: Conocer las interfaces y firmas exactas de componentes existentes con los que el nuevo código debe integrarse. Reutilizar utilities y helpers existentes en lugar de reimplementar.
  - **Uso específico**: Importar y usar componentes existentes correctamente. Si se necesita invocar `PaymentGateway.charge()`, conocer la firma exacta, tipos de parámetros y retorno. Reutilizar factories, builders, utilities del codebase. No crear duplicados de funcionalidad existente.
  - **Ejemplo**: Si inventario muestra que existe `DateUtils.formatISO8601(date)`, usar ese utility en lugar de implementar formateo de fechas manualmente.

---

**Contexto de Dominio:**

- `business_domain_dictionary.context.md`: Diccionario de términos de negocio (Lenguaje Ubicuo - DDD)
  - **Propósito en Fase 5**: Nombrar clases, métodos, variables y constantes en el código de producción usando terminología canónica del dominio de forma consistente.
  - **Uso específico**: Implementar `calcularChurnMensual()` (no `calculateMonthlyChurn()` si el proyecto es en español). Usar nombres de entidades del dominio: `Transaccion`, `Pago`, `ClientePreferencial` según diccionario. Mantener consistencia con el naming usado en tests (que también siguió el diccionario).
  - **Ejemplo**: Si diccionario define "Monto Bruto" y "Monto Neto" como términos canónicos, las variables deben ser `montoBruto` y `montoNeto`, no `grossAmount` o `totalBeforeTax`.

---

**Contexto de Persistencia e Integraciones:**

#### Persistencia

- `database_schema.context.md`: Estructura de base de datos (tablas relevantes)
  - **Propósito en Fase 5**: Implementar operaciones de persistencia correctas. Escribir queries/ORM mappings que sean compatibles con el esquema real. Implementar migraciones de BD si Fase 3 las especificó.
  - **Uso específico**: Mapear entidades a tablas correctas con tipos de datos compatibles. Implementar queries que respeten constraints (FK, UNIQUE, NOT NULL). Si Fase 3 especificó migraciones DDL, implementarlas con tipos, constraints y índices correctos. Configurar ORM mappings (JPA annotations, Sequelize models, etc.).
  - **Ejemplo**: Si esquema tiene `payments(id BIGINT PK, user_id BIGINT FK, amount DECIMAL(10,2), status VARCHAR(20))`, la entidad JPA debe mapear: `@Column(precision = 10, scale = 2) private BigDecimal amount;`
  - **Optimización**: Incluir solo esquema de tablas referenciadas en la especificación de Fase 3

#### Integraciones

- `api_integration_contracts.context.md`: Contratos de APIs externas/internas existentes
  - **Propósito en Fase 5**: Implementar integraciones con APIs que respeten contratos exactos. Construir requests con formato correcto, parsear responses según especificación, manejar todos los códigos de error.
  - **Uso específico**: Implementar HTTP clients con headers, body y query params según contrato. Parsear responses con la estructura exacta documentada. Implementar manejo de errores para CADA código de error del contrato. Implementar timeouts, retries y circuit breakers según diseño de Fase 3.
  - **Carga condicional**: Solo si Fase 3 cargó este archivo (hay integraciones)
  - **Ejemplo**: Si contrato dice `POST /api/v2/charges` con body `{"amount": 100, "currency": "USD", "source": "tok_..."}`, implementar exactamente esa estructura, no una interpretación diferente.

---

**Contexto de Manejo de Errores y Logging:**

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 5**: Implementar manejo de errores y logging según lo diseñado en Fase 3 y según estándares del proyecto. Cada operación debe tener su estrategia de errores correctamente codificada.
  - **Uso específico**: Importar y lanzar las excepciones correctas de la jerarquía. Implementar logging en los niveles correctos (DEBUG, INFO, WARN, ERROR) con el contexto apropiado. Implementar try-catch con la granularidad diseñada en Fase 3. Asegurar que logs incluyan información de contexto (transaction_id, user_id, timestamps).
  - **Ejemplo**: Implementar exactamente: `log.warn("Payment declined for transaction={}, user={}, amount={}", txId, userId, amount); throw new PaymentDeclinedException("Insufficient funds", txId);` — según lo especificado en Fase 3 y alineado con estándares de logging.

---

**Contexto de Documentación:**

- `documentation_templates.context.md`: Templates de documentación técnica
  - **Propósito en Fase 5**: **REINCORPORADO** — fue excluido en Fases 4/4.1/4.2 porque tests no requieren documentación formal. Ahora que se genera código de producción, las clases y métodos públicos necesitan documentación según templates del proyecto.
  - **Uso específico**: Generar JSDoc/Javadoc/docstrings para clases y métodos públicos según templates. Incluir: propósito del componente, parámetros con tipos y descripción, retorno, excepciones que lanza, ejemplo de uso si es complejo.
  - **Ejemplo**: Si template dice "toda clase pública debe tener Javadoc con @author, @since, descripción de propósito y dependencias", implementar esa documentación.
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: El código de producción tiene requisitos de documentación que el código de tests no tiene. Este archivo reaparece en cada fase que genera código de producción (5, 6, 7).

---

**Contexto Tecnológico:**

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 5**: **CRÍTICO**. Conocer las APIs exactas de los frameworks y librerías para implementar correctamente. No solo QUÉ usar, sino CÓMO usarlo según la versión aprobada.
  - **Uso específico**: Usar la versión correcta de APIs de frameworks (Spring Boot 3.x, Express 4.x, Django 4.x). Importar módulos/packages correctos. Configurar beans/middleware/dependencies según convenciones del framework. Usar librerías aprobadas para cada funcionalidad (serialización, validación, caching, etc.).
  - **Ejemplo**: Si stack dice "Spring Boot 3.2 + Java 21", usar features de Java 21 (records, pattern matching) y Spring 3.2 (virtual threads si aprobado), no APIs deprecated de versiones anteriores.

---

**Contexto Condicional (misma condicionalidad que Fase 3):**

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 5**: Implementar controles de seguridad especificados en Fase 3. Codificar autenticación, autorización, validación de entrada, encriptación y logging de auditoría.
  - **Uso específico**: Implementar filtros de autenticación, verificación de roles/permisos, validación de input contra inyección, encriptación de campos sensibles, sanitización de output, logging de auditoría para operaciones sensibles.
  - **Carga condicional**: Si Fase 3 cargó este archivo
  - **Ejemplo**: Implementar `@PreAuthorize("hasRole('PAYMENT_ADMIN')")` en endpoints sensibles y `auditLog.info("Payment processed: txId={}, userId={}, amount={}", ...)` para auditoría.

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 5**: Implementar con conciencia de performance donde Fase 3 lo especificó. Usar algoritmos y estrategias apropiadas para cumplir umbrales.
  - **Uso específico**: Si Fase 3 diseñó caching, implementar cache con TTL correcto. Si diseñó procesamiento asíncrono, implementar con `CompletableFuture`/`async-await`/workers según stack. Si diseñó paginación, implementar con límites correctos.
  - **Carga condicional**: Si Fase 3 cargó este archivo
  - **Ejemplo**: Si umbral es P95 < 200ms y Fase 3 diseñó cache para consultas frecuentes, implementar `@Cacheable("payments", key = "#userId", ttl = 300)` o equivalente.

---

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS:**

❌ **NO incluir**:

- `project_architecture.context.md` → La arquitectura de alto nivel (C4 Level 1-2) ya está destilada en la especificación de Fase 3. Fase 5 sigue las instrucciones concretas de Fase 3, no necesita consultar la arquitectura abstracta para escribir código. Incluir este archivo consumiría ~5,000 tokens sin aportar información accionable adicional.

- `architecture_decision_records.context.md` → Las decisiones ya están reflejadas en Fase 3. El implementador no necesita saber POR QUÉ se eligió Repository pattern — necesita saber CÓMO implementar el Repository (que está en Fase 3 + `project_architecture_standards.context.md`).

- `testing_standards_and_patterns.context.md` → Fase 5 escribe código de PRODUCCIÓN. Los tests ya están implementados (Fase 4.2) y sirven como criterio de aceptación automático. El LLM no necesita estándares de testing para escribir código de producción. "El desarrollador no debería tener en el horizonte el tema de pruebas" — son un mecanismo de validación, no de guía de implementación.

- `deployment_and_infrastructure_context.context.md` → Las restricciones de deployment ya fueron consideradas en Fase 3 al diseñar la solución. Si Fase 3 diseñó funciones stateless para entorno serverless, la especificación dice "implementar función stateless" — no necesita saber que es por limitaciones de Lambda.

- `refactoring_guidelines.context.md` → Específico de Fase 6.

- `project_structure_principles.context.md` → Reemplazado por `project_directory_tree.context.md`.

**RAZÓN DE EXCLUSIONES**: Fase 5 es IMPLEMENTACIÓN GUIADA POR ESPECIFICACIÓN. La especificación de Fase 3 es el "pináculo" que ya contiene toda la información arquitectónica, de diseño y de infraestructura destilada en instrucciones concretas. Incluir archivos de alto nivel que ya fueron procesados por Fase 3 es redundante y consume tokens que se necesitan para el código de tests y los archivos de implementación.

---

**COMPARACIÓN DE CONTEXTO: Fase 4.2 vs Fase 5:**

Ambas fases generan código, pero con diferencias significativas:

| Aspecto                          |  Fase 4.2 (Código de Tests)  |  Fase 5 (Código de Producción)   |
| -------------------------------- | :--------------------------: | :------------------------------: |
| `testing_standards_and_patterns` |   ✅ (cómo escribir tests)   |      ❌ (no escribe tests)       |
| `documentation_templates`        | ❌ (tests no requieren docs) |  ✅ (producción requiere docs)   |
| `reference_code_examples`        | Filtrado: ejemplos de TESTS  | Filtrado: ejemplos de PRODUCCIÓN |
| `project_architecture`           |   ✅ (para test contexts)    |      ❌ (ya en Fase 3 spec)      |
| Input principal                  |    Docs de pruebas Fase 4    |      Especificación Fase 3       |
| Criterio de éxito                |   Tests compilan y fallan    |           Tests pasan            |

---

**CICLO ITERATIVO Y GESTIÓN DE CONTEXTO:**

Fase 5 es inherentemente ITERATIVA. El contexto varía según la iteración:

**Iteración 1 (Generación inicial):**

- Input primario: Especificación de Fase 3 (COMPLETA)
- Tests: Suite completa de Fase 4.2 (para entender qué debe pasar)
- Contexto: Todos los archivos listados arriba
- Output: Código de producción inicial

**Iteraciones 2+ (Correcciones):**

- Input primario: **Resultados de tests fallidos** (qué falló y por qué)
- Input secundario: Código generado en iteración anterior
- Tests: Solo los tests FALLIDOS (para focalizar corrección)
- Contexto: Puede reducirse a archivos relevantes al error específico
- Output: Código corregido

**OPTIMIZACIÓN ITERATIVA**: En iteraciones de corrección, el contexto puede reducirse significativamente. Si un test de persistencia falla, solo se necesitan `database_schema.context.md`, `error_handling_and_logging_standards.context.md` y el código relevante — no todo el conjunto de archivos.

---

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt para implementación de código de producción.

- **Prompt**: `phase_5.implementation.prompt.md`

**Nota sobre Testing**: En este punto, el desarrollador **no debería tener en el horizonte el tema de pruebas** activamente, porque las pruebas ya se desarrollaron en Fase 4. La IA debe enfocarse en implementar la funcionalidad basándose en la especificación técnica detallada de Fase 3.

El sistema (IA) debe:

1. **Programar la funcionalidad completa**: Implementación que satisfaga todos los requisitos de la Fase 3
2. **Aplicar principios SOLID**: Código que respete los principios de diseño establecidos
3. **Implementar manejo apropiado de errores**: Gestión robusta de excepciones según lo especificado en Fase 3
4. **Incluir documentación inline cuando sea necesario**: Comentarios técnicos que expliquen decisiones de diseño complejas
5. **Cumplir con estándares del proyecto**: Adherencia a las guías de codificación establecidas

### Ciclo Iterativo de Desarrollo

Después de que la IA genera el código:

1. **Ejecutar las pruebas**: Correr la suite de pruebas de Fase 4.2
2. **Verificar resultados**:
   - Si todas las pruebas pasan → **Aprobar y continuar a Fase 6**
   - Si algunas pruebas fallan → **Iniciar interacción desarrollador-IA**

3. **Interacción Desarrollador-IA** (si las pruebas fallan):
   - El desarrollador analiza qué pruebas están fallando y por qué
   - Interactúa con la IA para corregir la implementación
   - Repite el ciclo hasta que todas las pruebas pasen

**NOTA**: La capacidad de ejecutar automáticamente las pruebas y ver resultados depende del LLM utilizado. Algunos LLMs pueden hacer esto, otros requieren que el desarrollador ejecute las pruebas manualmente.

### Criterios de Éxito

**OBLIGATORIO**:

- **Todas las pruebas deben pasar sin excepciones**
- El código debe compilar sin errores ni advertencias
- La implementación debe ser funcionalmente completa según Fase 3

**IMPORTANTE PERO NO CRÍTICO EN ESTA FASE**:

- Calidad del código (se mejora en Fase 6)
- Optimización (se realiza en Fase 6)
- Refactorización (se ejecuta en Fase 6)

**Principio Clave**: En Fase 5, **lo importante es que pase las pruebas y que el sistema funcione de acuerdo al requerimiento**. La calidad del código, aunque debería cumplir con exigencias básicas del proyecto, no es el foco principal - eso se aborda en Fase 6.

### Entregable

Implementación completa que incluya:

- **Código de producción funcional y completo**
- Documentación técnica inline apropiada
- **Cumplimiento verificado de todos los casos de prueba** (todas las pruebas pasando)
- Adherencia a estándares de codificación establecidos

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Revisar el código** generado por la IA
- **Ejecutar la suite de pruebas** completa
- **Verificar que TODAS las pruebas pasen**
- Si las pruebas fallan, **interactuar con la IA** para corregir la implementación
- **Aplicar su experiencia** para guiar las correcciones necesarias
- Verificar que la implementación **satisfaga funcionalmente el requerimiento**
- **Aprobar explícitamente** el código antes de continuar a Fase 6
- NO proceder si algunas pruebas aún fallan

**CRÍTICO**: El desarrollador es responsable del código de producción generado. Aunque la IA lo escriba, el desarrollador debe validarlo y aprobarlo.

### Notas Importantes

**Prompt Faltante**: Esta fase requiere desarrollo de un prompt especializado que guíe apropiadamente la implementación con enfoque TDD.

**Prioridad: Funcionalidad sobre Calidad**: En esta fase, el objetivo es que el código **funcione y pase todas las pruebas**. Si el código funciona pero no está óptimamente escrito, es aceptable - se mejorará en Fase 6.

**Sin Importar Cómo Esté Codificado**: "Sin importar si está bien codificado o mal codificado, pues se supone que debería estar cumpliendo con las exigencias del proyecto a nivel de desarrollo de software. Pero digamos que en la fase cinco esa parte no es tan importante. Lo importante es que pase las pruebas."

**Interacción Iterativa**: Es normal y esperado que haya iteraciones entre la IA y el desarrollador hasta lograr que todas las pruebas pasen.

**Dependencia del LLM**: La ejecución automática de pruebas depende del LLM seleccionado.

---

## Fase 6: Refactorización y Optimización

### Objetivo

Mejorar la calidad del código aplicando técnicas de refactorización mientras se mantiene la funcionalidad y se preserva el pase de todas las pruebas. El código debe quedar **optimizado, limpio y adherido a buenas prácticas**, sin perder funcionalidad.

### Entrada

**PRINCIPIO**: Fase 6 marca otro **CAMBIO DE ENFOQUE** en la metodología: de IMPLEMENTACIÓN FUNCIONAL a MEJORA DE CALIDAD. El código ya funciona y pasa todas las pruebas (Fase 5). Ahora el objetivo es que sea LIMPIO, ÓPTIMO y MANTENIBLE. El contexto se reduce drásticamente porque ya no se necesitan artefactos de diseño ni datos de integración — solo se necesita el código, los tests como red de seguridad, y archivos orientados a CALIDAD DE CÓDIGO.

**NATURALEZA DE FASE 6**: Esta fase aplica refactorización y optimización al código de producción de Fase 5. Trabaja POR SECCIONES/MÓDULOS (no todo de una vez). Después de CADA refactorización, se ejecuta la suite de pruebas completa para garantizar que no se rompe funcionalidad. Es el paso "Refactor" del ciclo Red-Green-Refactor de TDD.

**RESTRICCIÓN FUNDAMENTAL**: La funcionalidad debe permanecer IDÉNTICA. Las pruebas son la red de seguridad. Si una refactorización rompe un test, se revierte inmediatamente.

- **Artefactos de Entrada (solo código y tests)**:
  - **Código de producción funcional de Fase 5** (que pasa todas las pruebas) — **EL ARTEFACTO PRINCIPAL A REFACTORIZAR**
  - **Suite de pruebas implementada de Fase 4.2** (red de seguridad — se ejecuta después de CADA refactorización)

**EXCLUSIÓN DE ARTEFACTOS DE FASES ANTERIORES**: A diferencia de todas las fases previas (0.1 a 5), Fase 6 **NO necesita** la especificación del requerimiento, el análisis de Fase 1, el plan de Fase 2, ni la especificación de Fase 3. Estos artefactos definían QUÉ construir — eso ya está construido. Fase 6 mejora CÓMO está escrito, no QUÉ hace.

**JUSTIFICACIÓN**: El código de Fase 5 ya encapsula todas las decisiones de diseño de fases anteriores. Los tests de Fase 4.2 ya validan que el comportamiento es correcto. Refactorizar solo requiere entender el código actual, los estándares de calidad, y tener los tests como guardia. Cargar Fase 3 para refactorizar sería redundante — el código ya ES la materialización de Fase 3.

---

**Contexto de Calidad de Código (PRIMARIO en Fase 6):**

#### Refactorización

- `refactoring_guidelines.context.md`: Code smells, técnicas de refactoring aprobadas, métricas de calidad
  - **Propósito en Fase 6**: **INTRODUCIDO POR PRIMERA VEZ**. Este es el archivo estrella de Fase 6 — define QUÉ mejorar y CÓMO mejorarlo. Identifica code smells a buscar en el código de Fase 5 y las técnicas de refactoring apropiadas para cada uno.
  - **Uso específico**: Identificar code smells en el código de Fase 5: métodos largos, clases con demasiadas responsabilidades, duplicación, feature envy, shotgun surgery, código muerto. Para cada smell detectado, aplicar la técnica de refactoring aprobada: Extract Method, Extract Class, Move Method, Replace Conditional with Polymorphism, Introduce Parameter Object, etc. Verificar mejoras en métricas: complejidad ciclomática, cohesión, acoplamiento, LOC por método.
  - **Ejemplo**: Si código tiene método de 50 líneas con 3 niveles de anidamiento → identificar como "Long Method" + "Deep Nesting" → aplicar Extract Method para separar en submétodos con nombres descriptivos → verificar que complejidad ciclomática baja de 12 a 4.
  - **Contenido clave**: Catálogo de code smells con ejemplos del stack, técnicas de refactoring aprobadas con antes/después, umbrales de métricas de calidad (máximo complejidad ciclomática, máximo LOC por método, mínimo cohesión), priorización de mejoras
  - **NOTA**: Este archivo era EXPLÍCITAMENTE EXCLUIDO en todas las fases anteriores (0.1 a 5) porque la refactorización es específica de esta fase. Su primera aparición aquí es intencional.

#### Estándares de Código

- `code_style_guide.context.md`: Guía de estilo de código específica del stack
  - **Propósito en Fase 6**: Verificar y corregir adherencia a convenciones que pudieron relajarse en Fase 5 (donde la prioridad era funcionalidad). Fase 6 es donde se aplica el estilo con máximo rigor.
  - **Uso específico**: Revisar nomenclatura de variables, métodos, clases para consistencia total. Verificar organización de imports. Asegurar que la estructura de archivos sigue convenciones estrictas. Corregir formato, indentación, espaciado. Verificar que cada método respeta límites de longitud y complejidad.
  - **Ejemplo**: Si Fase 5 creó `processPaymentAndSendNotificationAndUpdateLog()` por pragmatismo, Fase 6 lo refactoriza en `processPayment()`, `sendNotification()`, `updateAuditLog()` según principio de responsabilidad única y convenciones de naming.

- `reference_code_examples.context.md`: Catálogo de ejemplos de implementación de referencia
  - **Propósito en Fase 6**: Comparar el código refactorizado contra los mejores ejemplos del proyecto. El objetivo es que el código refactorizado sea COMPARABLE EN CALIDAD a los ejemplos de referencia.
  - **Uso específico**: Usar ejemplos como "norte" de calidad: ¿el código refactorizado se parece a los mejores ejemplos del proyecto? ¿Sigue los mismos patrones de organización, manejo de errores, documentación? Detectar desviaciones significativas.
  - **Optimización**: Filtrar para incluir ejemplos de código de PRODUCCIÓN de alta calidad. Priorizar ejemplos de componentes similares a los que se están refactorizando.
  - **Ejemplo**: Si el mejor ejemplo de Service del proyecto tiene métodos de máximo 10 líneas, documentación Javadoc completa, y manejo de errores granular — el código refactorizado debe aspirar a ese nivel.

---

**Contexto Arquitectónico (REDUCIDO):**

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 6**: Verificar que la refactorización no introduzca antipatrones y que mantenga la correcta implementación de patrones. Si Fase 5 implementó un patrón de forma subóptima, Fase 6 lo corrige según estándares.
  - **Uso específico**: Verificar separación de responsabilidades por capa. Detectar si un Service asumió responsabilidades de Repository. Verificar que Dependency Injection se usa correctamente (no Service Locator encubierto). Corregir violaciones de patrones que Fase 5 pudo introducir por pragmatismo.
  - **Ejemplo**: Si código de Fase 5 tiene un Controller que hace queries directas a BD (porque "funcionaba"), Fase 6 refactoriza para que el Controller delegue al Service y el Service al Repository, según estándares.

#### Componentes Existentes

- `existing_components_inventory.context.md`: Inventario de componentes/clases principales existentes
  - **Propósito en Fase 6**: Identificar oportunidades de consolidación con componentes existentes. Detectar código duplicado que podría reutilizar utilities existentes. Identificar código que debería extraerse como componente reutilizable.
  - **Uso específico**: Si el código nuevo tiene un `DateFormatter` que hace lo mismo que el `DateUtils` existente → consolidar. Si el código nuevo tiene un patrón de retry que ya existe como utility → reutilizar. Si el código nuevo tiene un helper útil para otros componentes → considerar promoverlo a utility compartida.
  - **Ejemplo**: Si inventario muestra `StringUtils.sanitizeInput(String)` y el código de Fase 5 tiene su propia sanitización inline → refactorizar para usar el utility existente.

---

**Contexto de Manejo de Errores y Logging:**

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 6**: Verificar y mejorar la calidad del manejo de errores y logging. Fase 5 pudo implementar error handling funcional pero subóptimo. Fase 6 lo lleva a calidad de producción.
  - **Uso específico**: Verificar que la jerarquía de excepciones se use correctamente (no catch genérico `Exception`). Verificar que niveles de logging sean apropiados (no todo como `INFO`). Verificar que el contexto en logs sea suficiente para debugging. Simplificar bloques try-catch complejos. Eliminar logging redundante o excesivo.
  - **Ejemplo**: Si Fase 5 tiene `catch (Exception e) { log.error("Error", e); throw e; }`, refactorizar a `catch (PaymentException e) { log.warn("Payment failed: txId={}, reason={}", txId, e.getReason()); throw new PaymentProcessingException(e); }` — más específico, mejor logging, excepción apropiada.

---

**Contexto de Documentación:**

- `documentation_templates.context.md`: Templates de documentación técnica
  - **Propósito en Fase 6**: Completar y mejorar la documentación inline del código. Fase 5 pudo generar documentación mínima. Fase 6 la lleva al nivel requerido por los templates del proyecto.
  - **Uso específico**: Verificar que todas las clases públicas tengan documentación según template. Completar JSDoc/Javadoc con parámetros, retornos, excepciones, y ejemplos de uso. Agregar comentarios en lógica compleja que lo requiera. Eliminar comentarios redundantes que solo repiten lo que el código dice.
  - **Ejemplo**: Si método público `processPayment(PaymentRequest)` solo tiene `/** Process payment */`, completar con: descripción detallada, `@param request` con descripción, `@return PaymentResult` con estados posibles, `@throws PaymentException` con condiciones, `@example` si es complejo.

---

**Contexto de Performance (CONDICIONAL):**

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 6**: Aplicar optimizaciones de rendimiento donde Fase 5 priorizó funcionalidad sobre performance. Verificar que el código refactorizado no degrade performance por debajo de umbrales.
  - **Uso específico**: Identificar hot paths que deben optimizarse (queries N+1, serialización ineficiente, llamadas sincrónicas que deberían ser async). Optimizar algoritmos si la complejidad excede lo necesario. Implementar caching donde sea beneficioso. Verificar que optimizaciones no comprometan legibilidad (legibilidad tiene PRIORIDAD según metodología).
  - **Carga condicional**: Si Fase 3 cargó este archivo (requerimiento tiene RNF de performance). También cargar si el desarrollador detecta problemas de performance durante Fase 5.
  - **Ejemplo**: Si código tiene `for (Order order : orders) { User user = userRepository.findById(order.getUserId()); }` (N+1 query) → refactorizar a `Map<Long, User> users = userRepository.findAllById(orderUserIds);` — mejora performance sin comprometer legibilidad.

---

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS:**

❌ **NO incluir**:

- `project_architecture.context.md` → Arquitectura de alto nivel no relevante para refactorización de código. El código ya está integrado correctamente en la arquitectura (validado en Fase 5 + tests).

- `architecture_decision_records.context.md` → Las decisiones ya están materializadas en el código. No se necesita saber POR QUÉ se eligió un patrón para refactorizar CÓMO se implementó.

- `business_domain_dictionary.context.md` → El naming del dominio ya está establecido en el código desde Fase 5. Si se renombran métodos durante refactorización, el código existente ya usa los términos correctos como referencia. **NOTA**: Si la refactorización involucra renombrado extensivo, el desarrollador puede optar por cargar este archivo excepcionalmente.

- `tech_stack_constraints.context.md` → El stack ya está en uso. La refactorización no introduce nuevas tecnologías — mejora el uso de las existentes. Las APIs de los frameworks ya están en el código como referencia.

- `project_directory_tree.context.md` → La refactorización puede mover archivos, pero no crea estructura nueva. El árbol ya es visible en el código de Fase 5. Si se reestructuran módulos significativamente, el desarrollador puede optar por cargarlo.

- `database_schema.context.md` → La refactorización no cambia operaciones de BD (comportamiento inmutable). Si se optimizan queries, el esquema ya está referenciado en el código de repository existente.

- `api_integration_contracts.context.md` → La refactorización no cambia integraciones con APIs (comportamiento inmutable). Los contratos ya están implementados en el código.

- `security_and_compliance_requirements.context.md` → Los controles de seguridad ya están implementados. La refactorización no debe alterarlos (invariante de funcionalidad).

- `testing_standards_and_patterns.context.md` → Fase 6 no escribe tests nuevos. Ejecuta los existentes como validación, pero no necesita conocer estándares de testing.

- `deployment_and_infrastructure_context.context.md` → No relevante para refactorización de código.

- `project_structure_principles.context.md` → Reemplazado por `project_directory_tree` cuando es necesario.

**RAZÓN DE EXCLUSIONES**: Fase 6 refactoriza CÓDIGO EXISTENTE que ya funciona. No necesita saber QUÉ construir (Fase 3), QUÉ testear (Fase 4), ni restricciones externas (BD, APIs, deployment). Solo necesita saber CÓMO debe verse el código de calidad (estilo, patrones, ejemplos, refactoring guidelines) y tener los tests como red de seguridad. Esta es la fase con el conjunto de contexto más FOCALIZADO de toda la metodología.

---

**PRINCIPIO DE REDUCCIÓN DE CONTEXTO (Fase 5 → Fase 6):**

La transición Fase 5 → Fase 6 produce la **reducción más drástica de contexto** en toda la metodología:

| Aspecto                         |    Fase 5 (Implementación)     |        Fase 6 (Refactorización)         |
| ------------------------------- | :----------------------------: | :-------------------------------------: |
| Artefactos previos              |       Req + F1 + F2 + F3       |           Solo código + tests           |
| Genera                          |          Código nuevo          |             Código mejorado             |
| Enfoque                         |   QUÉ hacer (funcionalidad)    |        CÓMO mejorarlo (calidad)         |
| Archivos de contexto            |       10-13 obligatorios       |     7 obligatorios + 1 condicional      |
| Necesita Fase 3 spec            |         Sí (blueprint)         |     No (ya materializada en código)     |
| Necesita BD/APIs                | Sí (implementar integraciones) |      No (integraciones ya hechas)       |
| Necesita refactoring guidelines |               No               |          **Sí (INTRODUCIDO)**           |
| Criterio de éxito               |          Tests pasan           | Tests siguen pasando + métricas mejoran |

**Archivo NUEVO**: `refactoring_guidelines.context.md` aparece por PRIMERA y PRINCIPAL vez. Fue explícitamente excluido de todas las fases anteriores porque la refactorización es específica de esta fase.

---

**EJECUCIÓN POR SECCIONES Y GESTIÓN DE CONTEXTO:**

La metodología REQUIERE refactorización por secciones/módulos, no todo de una vez. Esto tiene implicaciones para la gestión de contexto:

**Por cada sección a refactorizar:**

1. Incluir SOLO el código de esa sección
2. Incluir tests relevantes a esa sección
3. Incluir el conjunto completo de archivos de contexto de calidad
4. Aplicar refactorización
5. Ejecutar suite de pruebas COMPLETA (no solo tests de esa sección)
6. Si tests pasan → siguiente sección
7. Si tests fallan → revertir y corregir

**ORDEN SUGERIDO DE REFACTORIZACIÓN:**

1. Primero: Correcciones de naming y estilo (bajo riesgo)
2. Segundo: Extract Method / Extract Class (riesgo medio)
3. Tercero: Reorganización de responsabilidades entre clases (riesgo alto)
4. Cuarto: Optimizaciones de performance (riesgo variable)

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt para refactorización asistida.

- **Prompt**: `phase_6.refactoring-and-optimization.prompt.md`

**IMPORTANTE - Limitación de Ventana de Salida**: La IA tiene una ventana limitada para respuestas. Por tanto, **la refactorización debe hacerse POR PARTES**, no todo de un solo tiro.

Solicitar a la inteligencia artificial la refactorización enfocada en:

1. **Eliminación de duplicación**: Aplicación del principio DRY mediante abstracciones apropiadas
2. **Mejora de legibilidad**: Optimización de nombres de variables, métodos y clases para máxima claridad
3. **Simplificación de complejidad**: Reducción de complejidad ciclomática y cognitiva
4. **Optimización de rendimiento**: Mejoras que no comprometan la legibilidad (legibilidad tiene prioridad)
5. **Aplicación de patrones**: Implementación de patrones de diseño cuando sean beneficiosos y apropiados
6. **Análisis de calidad**: Revisión contra estándares y métricas del proyecto

### Estrategia de Ejecución

**Por Partes, No Todo Junto**: Debido a la ventana de salida limitada de la IA:

1. Identificar secciones o módulos del código a refactorizar
2. Refactorizar una sección a la vez
3. Ejecutar pruebas después de cada refactorización
4. Continuar con la siguiente sección solo si las pruebas pasan
5. Repetir hasta completar toda la refactorización

**Analogía**: "No todo de un solo tiro porque es que recordemos que la IA tiene una ventana de contexto para temas de respuesta, una ventana de salida."

### Restricciones de Refactorización

**OBLIGATORIAS**:

- **Comportamiento inmutable**: La funcionalidad debe permanecer exactamente igual
- **Pruebas invariantes**: TODAS las pruebas deben continuar pasando después de cada refactorización
- **Interfaces estables**: Los contratos públicos no deben modificarse sin justificación válida
- **Legibilidad prioritaria**: La claridad del código tiene precedencia sobre optimizaciones prematuras

### Ciclo de Refactorización

Para cada sección del código:

1. Aplicar refactorización
2. **Ejecutar suite de pruebas completa**
3. **Verificar que todas las pruebas pasan**
4. Si alguna prueba falla → revertir o corregir la refactorización
5. Si todas las pruebas pasan → aprobar y continuar con siguiente sección

### Entregable

Código refactorizado que demuestre:

- **Aplicación consistente de principios Clean Code**
- Eliminación de duplicaciones identificadas
- **Mejora medible en métricas de calidad** (complejidad, cohesión, acoplamiento)
- **Mantenimiento de funcionalidad completa** (verificado con pruebas)
- **Preservación del pase de todas las pruebas**

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Ejecutar la suite de pruebas después de CADA refactorización** para garantizar que no se introdujeron regresiones
- **Revisar cada cambio** propuesto por la IA antes de aplicarlo
- **NO aceptar refactorizaciones** que fallen las pruebas
- Guiar la refactorización por secciones/módulos
- **Verificar mejoras en métricas de calidad**
- Aplicar criterio sobre qué optimizaciones son realmente necesarias
- **Aprobar explícitamente** el código refactorizado antes de continuar a Fase 7
- **Velar porque el código cumpla** con todos los estándares del proyecto

**CRÍTICO**: Ejecutar pruebas después de cada refactorización es fundamental. Una refactorización que rompe funcionalidad debe revertirse inmediatamente.

### Notas Importantes

**Prompt Faltante**: Esta fase requiere desarrollo de un prompt especializado para refactorización asistida por IA.

**Por Partes es Obligatorio**: NO intentar refactorizar todo el código en una sola ejecución. Esto generará respuestas incompletas o superficiales.

**Pruebas como Red de Seguridad**: Las pruebas de Fase 4.2 son la red de seguridad que garantiza que la refactorización no rompe funcionalidad.

**Legibilidad Primero**: Si una optimización compromete la legibilidad, no debe aplicarse. Clean Code prioriza código claro sobre código "cleverly optimized".

**Responsabilidad del Desarrollador**: Aunque la IA proponga las refactorizaciones, es el desarrollador quien debe aprobarlas y verificar que mejoran realmente la calidad sin romper funcionalidad.

---

## Fase 7: Verificación Técnica Integral

### Objetivo

Realizar una validación técnica comprehensiva que confirme el **cumplimiento 100% del requerimiento** y la **adherencia a los estándares de calidad establecidos** en el código. Esta es la certificación final antes de considerar el desarrollo completo.

### Entrada

**PRINCIPIO**: Fase 7 es la **CERTIFICACIÓN FINAL** de la metodología. Realiza una verificación técnica comprehensiva MULTI-DIMENSIONAL: funcionalidad, calidad, estándares, rendimiento y seguridad. Para ello, REINTRODUCE archivos de contexto de estándares y restricciones que estuvieron ausentes en Fases 5-6, porque la verificación final necesita validar contra TODOS los estándares del proyecto, no solo los de calidad de código.

**NATURALEZA DE FASE 7**: Esta fase genera un REPORTE DE VERIFICACIÓN, no código. Certifica que el código refactorizado cumple 100% del requerimiento, adhiere a todos los estándares, y está listo para considerarse completo. Es el "aval final" técnico.

**DIFERENCIA FUNDAMENTAL CON FASES ANTERIORES**: Mientras Fases 5-6 trabajaban EN el código (implementar, refactorizar), Fase 7 evalúa el código CONTRA múltiples dimensiones de calidad. Es una auditoría, no una acción de construcción.

- **Artefactos de Fases Previas**:
  - Especificación formal del requerimiento (funcional o no funcional) o historia de usuario validado en Fase 0.1 — **REINTRODUCIDO para verificar cumplimiento 100%**
  - Documento de análisis técnico de la Fase 1 — **REINTRODUCIDO para verificar que todos los impactos identificados fueron abordados**
  - **Código refactorizado y optimizado de la Fase 6** — **EL ARTEFACTO PRINCIPAL A VERIFICAR**
  - **Suite de pruebas completa de Fase 4.2** (debe estar pasando al 100%)

**NOTA SOBRE REINTRODUCCIÓN DE ARTEFACTOS**: El requerimiento y el análisis de Fase 1 regresan después de estar ausentes en Fase 6. Fase 6 no los necesitaba porque no cambiaba funcionalidad. Fase 7 sí los necesita porque debe VERIFICAR que la funcionalidad completa del requerimiento original está implementada — es una validación "de punta a punta" desde el requerimiento hasta el código final.

**EXCLUSIÓN DE FASES 2 Y 3**: El plan arquitectónico (Fase 2) y la especificación detallada (Fase 3) NO se incluyen. Su contenido ya está materializado en el código (Fase 6) y validado por los tests (Fase 4.2). Si los tests pasan y el código cumple estándares, las especificaciones están satisfechas. Incluirlos consumiría ~15K-30K tokens sin aportar verificación adicional significativa.

**EXCLUSIÓN DE DOCUMENTOS DE PRUEBAS**: Los tres documentos de Fase 4 NO se incluyen. Las pruebas ya están implementadas como código ejecutable en Fase 4.2.

---

**Dimensiones de Verificación y Contexto Asociado:**

Fase 7 verifica el código contra CINCO dimensiones. Cada dimensión requiere archivos de contexto específicos:

| Dimensión       | Qué verifica                      | Archivos clave                                                  |
| --------------- | --------------------------------- | --------------------------------------------------------------- |
| **Funcional**   | Requerimiento 100% implementado   | Requerimiento, Fase 1, tests                                    |
| **Calidad**     | Código limpio, métricas, patrones | code_style, refactoring_guidelines, architecture_standards      |
| **Estándares**  | Adherencia a guías del proyecto   | code_style, error_handling, documentation_templates, tech_stack |
| **Rendimiento** | Eficiencia y umbrales cumplidos   | performance_benchmarks, tech_stack                              |
| **Seguridad**   | Sin vulnerabilidades              | security_and_compliance, deployment                             |

---

**Contexto de Calidad de Código:**

#### Estándares y Guías

- `code_style_guide.context.md`: Guía de estilo de código específica del stack
  - **Propósito en Fase 7**: Verificar que el código final cumple TODAS las convenciones de estilo del proyecto. Es la verificación definitiva — cualquier desviación que sobrevivió Fases 5-6 se detecta aquí.
  - **Uso específico**: Revisar nomenclatura de clases, métodos, variables, paquetes. Verificar organización de imports, estructura de archivos, formato de código. Validar que ningún método excede límites de complejidad. Detectar inconsistencias de estilo entre diferentes partes del código.
  - **Criterio de verificación**: El código cumple el 100% de las convenciones de estilo → PASS. Violaciones menores → documentar como mejora futura. Violaciones significativas → corrección requerida antes de aprobar.

- `refactoring_guidelines.context.md`: Code smells, técnicas de refactoring, métricas de calidad
  - **Propósito en Fase 7**: Verificar que NO quedan code smells significativos después de Fase 6. Validar que las métricas de calidad están dentro de los rangos aceptables.
  - **Uso específico**: Escanear código buscando smells residuales: métodos largos, clases God, duplicación, feature envy, dead code. Verificar métricas: complejidad ciclomática, cohesión, acoplamiento, LOC por método. Comparar métricas contra umbrales establecidos.
  - **Criterio de verificación**: No hay code smells críticos y métricas están en rango → PASS. Smells menores → documentar. Smells críticos o métricas fuera de rango → corrección en Fase 6 antes de aprobar.

#### Patrones Arquitectónicos

- `project_architecture_standards.context.md`: Patrones arquitectónicos aprobados, antipatrones prohibidos
  - **Propósito en Fase 7**: Verificar que la implementación final respeta correctamente todos los patrones arquitectónicos. Detectar antipatrones que pudieron introducirse durante implementación o refactorización.
  - **Uso específico**: Verificar separación de capas (Controller → Service → Repository). Detectar violaciones de dependency rules (capas internas no deben depender de externas). Validar que cada componente tiene la responsabilidad correcta según su patrón. Detectar antipatrones: God Class, Circular Dependencies, Service Locator no aprobado.
  - **Criterio de verificación**: Patrones correctamente implementados y sin antipatrones → PASS. Violaciones de patrón → corrección requerida.

---

**Contexto de Estándares Técnicos:**

#### Stack y Tecnología

- `tech_stack_constraints.context.md`: Stack tecnológico y restricciones
  - **Propósito en Fase 7**: **REINTRODUCIDO** (ausente en Fase 6). Verificar que el código final usa exclusivamente librerías aprobadas en versiones compatibles. Detectar dependencias no autorizadas o uso de APIs deprecated.
  - **Uso específico**: Verificar que cada import/dependencia está en la lista aprobada. Validar que no se usan APIs deprecated del framework. Confirmar compatibilidad de versiones entre dependencias. Detectar librerías de test que se filtren a código de producción.
  - **Criterio de verificación**: Solo librerías aprobadas, sin APIs deprecated → PASS. Uso de librería no aprobada → corrección requerida.
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: Fase 6 no necesitaba este archivo porque no introducía librerías nuevas. Pero la verificación final debe confirmar que todo el stack es correcto y aprobado.

#### Estructura del Proyecto

- `project_directory_tree.context.md`: Árbol de directorios del proyecto
  - **Propósito en Fase 7**: **REINTRODUCIDO** (ausente en Fase 6). Verificar que todos los archivos creados están en las ubicaciones correctas según convenciones del proyecto.
  - **Uso específico**: Verificar que cada clase/módulo creado está en el paquete/directorio correcto. Detectar archivos en ubicaciones incorrectas. Validar que la estructura de tests espeja la estructura de producción si esa es la convención. Verificar que no hay archivos temporales, backups o artifacts de desarrollo olvidados.
  - **Criterio de verificación**: Estructura de archivos consistente con convenciones → PASS. Archivos mal ubicados → corrección requerida.

#### Manejo de Errores y Logging

- `error_handling_and_logging_standards.context.md`: Estrategias de manejo de excepciones y logging
  - **Propósito en Fase 7**: Verificar que el manejo de errores y logging en el código final cumple estándares. Detectar catch genéricos, logging insuficiente, excepciones silenciadas, o información sensible en logs.
  - **Uso específico**: Verificar que no hay `catch (Exception e)` genéricos donde debería haber excepciones específicas. Validar que niveles de logging son apropiados (no todo ERROR). Detectar excepciones silenciadas (catch vacíos). Verificar que logs incluyen contexto suficiente. Validar que no se loguea información sensible (passwords, tokens, PII).
  - **Criterio de verificación**: Error handling completo y logging apropiado → PASS. Excepciones silenciadas o información sensible en logs → corrección CRÍTICA requerida.

#### Documentación

- `documentation_templates.context.md`: Templates de documentación técnica
  - **Propósito en Fase 7**: Verificar que la documentación inline del código cumple con los templates requeridos. Detectar clases/métodos públicos sin documentación o con documentación incompleta.
  - **Uso específico**: Verificar que toda clase pública tiene documentación según template (propósito, autor, fecha). Verificar que métodos públicos tienen documentación de parámetros, retorno, excepciones. Detectar documentación desactualizada (que no refleja el código actual). Verificar que lógica compleja tiene comentarios explicativos.
  - **Criterio de verificación**: Documentación completa según templates → PASS. Componentes públicos sin documentación → corrección requerida.

---

**Contexto de Decisiones y Deployment (REINTRODUCIDOS):**

- `architecture_decision_records.context.md`: Historial de decisiones arquitectónicas
  - **Propósito en Fase 7**: **REINTRODUCIDO** (ausente desde Fase 3.1). Verificar que el código final no viola ningún ADR activo. Detectar decisiones de implementación que contradigan ADRs sin justificación documentada.
  - **Uso específico**: Cruzar ADRs del área afectada contra la implementación final. Si ADR dice "toda comunicación entre módulos debe ser asíncrona vía eventos", verificar que no hay llamadas síncronas entre módulos. Si ADR dice "usar PostgreSQL para persistencia financiera", verificar que no se usa otra BD.
  - **Optimización**: Cargar solo ADRs del área afectada por el requerimiento (mismos que se filtraron en Fases 2-3)
  - **Criterio de verificación**: Código cumple todos los ADRs aplicables → PASS. Violación de ADR sin justificación → corrección requerida o nuevo ADR necesario.
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: Los ADRs se excluyeron en Fases 5-6 porque el código seguía la especificación de Fase 3 (que ya incorporaba ADRs). Pero en la verificación FINAL, un chequeo directo contra ADRs detecta desviaciones sutiles que pudieron introducirse durante implementación o refactorización.

- `deployment_and_infrastructure_context.context.md`: Infraestructura y deployment
  - **Propósito en Fase 7**: **REINTRODUCIDO** (ausente desde Fase 3.1). Verificar que el código final es compatible con el entorno de deployment. Detectar asunciones de infraestructura incorrectas.
  - **Uso específico**: Verificar que no se asume estado en memoria si el entorno es stateless. Validar que uso de memoria/CPU es compatible con límites de la plataforma. Confirmar que la estrategia de logging es compatible con la infraestructura de observabilidad. Detectar dependencias de filesystem que no existen en contenedores.
  - **Criterio de verificación**: Código compatible con entorno de deployment → PASS. Incompatibilidades → corrección requerida.
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: Fases 5-6 siguieron la especificación de Fase 3 que ya consideró infraestructura. Pero la verificación final confirma que no se introdujeron incompatibilidades durante implementación/refactorización (ej. un refactoring que introduce estado en memoria en entorno serverless).

---

**Contexto de Testing (REINTRODUCIDO):**

- `testing_standards_and_patterns.context.md`: Estándares de testing, frameworks y estrategias
  - **Propósito en Fase 7**: **REINTRODUCIDO** (ausente en Fases 5-6). Verificar que la suite de tests es ADECUADA: cobertura suficiente, tipos de tests apropiados, calidad de assertions. Esta es una META-VERIFICACIÓN — verifica la calidad de los tests, no solo que pasen.
  - **Uso específico**: Verificar que cobertura de código cumple umbrales establecidos (ej. >90% líneas, >80% branches). Validar que la distribución de tests es apropiada (no solo unitarias, también integración y sistema). Verificar que assertions son significativas (no solo `assertNotNull`). Detectar tests frágiles (que dependen de orden de ejecución o estado compartido).
  - **Criterio de verificación**: Cobertura adecuada, distribución correcta, assertions significativas → PASS. Cobertura insuficiente o tests frágiles → recomendación de mejora (puede ser no bloqueante si la funcionalidad está validada).
  - **JUSTIFICACIÓN DE REINCORPORACIÓN**: Fases 5-6 no escribían tests, así que no necesitaban estándares de testing. Fase 7 EVALÚA la calidad de los tests como parte de la verificación integral.

---

**Contexto Condicional:**

- `security_and_compliance_requirements.context.md`: Requisitos de seguridad y compliance
  - **Propósito en Fase 7**: Verificar que TODOS los controles de seguridad requeridos están implementados correctamente. Detectar vulnerabilidades OWASP comunes. Verificar compliance con requisitos regulatorios.
  - **Uso específico**: Verificar: validación de entrada contra inyección (SQL, XSS, command injection). Autenticación correcta en todos los endpoints. Autorización granular según roles. Datos sensibles encriptados en reposo y tránsito. No hay información sensible en logs. Headers de seguridad configurados. CORS restringido apropiadamente.
  - **Carga condicional**: Si Fase 3 cargó este archivo (requerimiento toca seguridad). **RECOMENDACIÓN**: Incluso si no fue cargado condicionalmente, una verificación básica de seguridad (OWASP top 5) es buena práctica en la certificación final.
  - **Criterio de verificación**: Controles de seguridad completos y sin vulnerabilidades → PASS. Vulnerabilidad detectada → corrección CRÍTICA requerida (BLOQUEANTE).

- `performance_benchmarks_and_thresholds.context.md`: Umbrales de performance
  - **Propósito en Fase 7**: Verificar que el código final cumple todos los umbrales de performance establecidos. Detectar regresiones de performance introducidas durante refactorización.
  - **Uso específico**: Verificar tiempo de respuesta contra umbrales. Validar throughput. Confirmar que optimizaciones de Fase 6 no introdujeron nuevos bottlenecks. Verificar que no hay queries N+1, memory leaks, o resource leaks.
  - **Carga condicional**: Si Fase 3 cargó este archivo
  - **Criterio de verificación**: Umbrales cumplidos → PASS. Umbral no cumplido → corrección requerida (puede requerir volver a Fase 6).

---

**ARCHIVOS EXPLÍCITAMENTE EXCLUIDOS:**

❌ **NO incluir**:

- `project_architecture.context.md` → La arquitectura de alto nivel (C4 Level 1-2) ya fue validada en Fases 2.1 y 3.1. El código que pasa los tests y cumple `project_architecture_standards.context.md` respeta la arquitectura. El nivel C4 no aporta verificación adicional sobre el código.

- `business_domain_dictionary.context.md` → La terminología de dominio fue validada en Fases 3.1 y usada consistentemente en Fases 5-6. Si el código pasó por esas fases, el naming es correcto. Verificar naming no justifica ~4,000 tokens adicionales en la fase más cargada.

- `existing_components_inventory.context.md` → La integración con componentes existentes fue implementada en Fase 5 y validada por tests. Los tests verifican que las integraciones funcionan. El inventario no aporta verificación adicional.

- `database_schema.context.md` → Las operaciones de BD fueron implementadas en Fase 5, validadas por tests de integración, y no modificadas en Fase 6 (comportamiento inmutable). Los tests de integración verifican compatibilidad con esquema.

- `api_integration_contracts.context.md` → Las integraciones con APIs fueron implementadas en Fase 5, validadas por tests (con mocks basados en contratos), y no modificadas en Fase 6. Los tests verifican cumplimiento de contratos.

- `reference_code_examples.context.md` → Los ejemplos de referencia son útiles para GENERAR código (few-shot learning en Fases 3-6). Fase 7 VERIFICA código contra ESTÁNDARES (reglas), no contra EJEMPLOS (patrones). La verificación se hace con `code_style_guide`, `project_architecture_standards`, y `refactoring_guidelines`.

- `project_structure_principles.context.md` → Reemplazado por `project_directory_tree.context.md`.

**RAZÓN DE EXCLUSIONES**: Fase 7 verifica contra ESTÁNDARES Y REGLAS, no contra diseños previos ni datos de integración. Los archivos excluidos aportan contexto de DISEÑO (cómo construir) o DATOS (qué integrar), no ESTÁNDARES (cómo debe verse el resultado). La verificación funcional se cubre con el requerimiento + tests; la verificación de calidad se cubre con los 12 archivos de estándares incluidos.

---

**PRINCIPIO DE AMPLIFICACIÓN DE CONTEXTO (Fase 6 → Fase 7):**

La transición Fase 6 → Fase 7 AMPLIFICA el contexto después de la reducción drástica de Fase 6:

| Fase       | Archivos de contexto |      Artefactos previos       | Enfoque            |
| ---------- | :------------------: | :---------------------------: | ------------------ |
| Fase 5     |        10-13         |  Req + F1 + F2 + F3 + Tests   | Implementar        |
| Fase 6     |         7-8          |      Solo código + tests      | Refactorizar       |
| **Fase 7** |        **12**        | **Req + F1 + código + tests** | **Verificar TODO** |

**Archivos que REGRESAN en Fase 7** (ausentes en Fase 6):

- `tech_stack_constraints.context.md` — verificar uso correcto del stack
- `project_directory_tree.context.md` — verificar estructura de archivos
- `architecture_decision_records.context.md` — verificar cumplimiento de ADRs
- `deployment_and_infrastructure_context.context.md` — verificar deployability
- `testing_standards_and_patterns.context.md` — verificar calidad de test suite

**Archivo que se RETIRA en Fase 7** (presente en Fase 6):

- `existing_components_inventory.context.md` — integraciones ya validadas por tests

---

**EJECUCIÓN POR DIMENSIONES:**

Si el contexto completo excede los límites del LLM, Fase 7 puede ejecutarse en MÚLTIPLES INVOCACIONES por dimensión:

**Invocación 1 — Verificación Funcional:**

- Inputs: Requerimiento, Fase 1, código, tests
- Contexto: `testing_standards_and_patterns` (meta-verificación de tests)
- Pregunta: ¿El código implementa 100% del requerimiento? ¿Todos los impactos de Fase 1 fueron abordados? ¿La suite de tests es adecuada?

**Invocación 2 — Verificación de Calidad y Estándares:**

- Inputs: Código
- Contexto: `code_style_guide`, `refactoring_guidelines`, `project_architecture_standards`, `error_handling_and_logging_standards`, `documentation_templates`
- Pregunta: ¿El código cumple estándares de calidad? ¿Hay code smells? ¿Los patrones están correctos? ¿La documentación es completa?

**Invocación 3 — Verificación de Compliance Técnico:**

- Inputs: Código
- Contexto: `tech_stack_constraints`, `project_directory_tree`, `architecture_decision_records`, `deployment_and_infrastructure_context`, `security_and_compliance_requirements`, `performance_benchmarks_and_thresholds`
- Pregunta: ¿El código es seguro? ¿Cumple ADRs? ¿Es deployable? ¿Cumple umbrales de performance? ¿Usa solo tecnología aprobada?

**Reporte Final**: Consolidar los tres reportes parciales en un reporte de verificación integral.

---

### Proceso

**Uso de IA Generativa**: Esta fase cuenta con un prompt para verificación integral.

- **Prompt**: `phase_7.comprehensive-technical-verification.prompt.md`

Emplear inteligencia artificial para ejecutar una verificación que incluya:

1. **Validación funcional**: Confirmación de que **todos los aspectos del requerimiento están implementados**
2. **Análisis de calidad**: Evaluación de métricas de complejidad, cohesión y acoplamiento
3. **Verificación de estándares**: Confirmación de adherencia a guías de codificación del proyecto
4. **Análisis de rendimiento**: Evaluación de eficiencia algorítmica y uso de recursos
5. **Revisión de seguridad**: Identificación de vulnerabilidades potenciales

### Aspectos de Verificación

**Completitud Funcional:**

- Implementación de todos los casos de uso requeridos
- Manejo apropiado de casos límite y errores
- Cumplimiento de criterios de aceptación técnicos

**Calidad Técnica:**

- Adherencia a principios SOLID
- Aplicación de patrones de diseño apropiados
- Mantenimiento de métricas de calidad dentro de rangos aceptables
- Código limpio y mantenible

**Estándares de Proyecto:**

- Cumplimiento de guías de codificación establecidas
- Consistencia con arquitectura existente
- Apropiada documentación técnica donde sea necesaria

**Calidad del Código:**

- Evaluación de complejidad ciclomática
- Análisis de acoplamiento y cohesión
- Identificación de code smells si existen

### Entregable

**Reporte de verificación técnica** que contenga:

- **Confirmación de completitud funcional**: Verificación de que el requerimiento está 100% implementado
- **Evaluación de calidad técnica**: Análisis detallado de métricas y adherencia a buenas prácticas
- **Identificación de áreas de mejora potencial**: Sugerencias de mejoras futuras (no bloqueantes)
- **Recomendaciones para mantenimiento futuro**: Guías para evolución del código
- **Certificación de cumplimiento de estándares**: Confirmación de que el código cumple todos los estándares establecidos en el proyecto

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Leer y validar** el reporte de verificación completo
- **Revisar todas las secciones** del reporte con criterio técnico
- Implementar **cualquier corrección identificada como crítica** antes de considerar la implementación como completa
- **NO aprobar** si existen problemas críticos de calidad, funcionalidad o adherencia a estándares
- **Dar el aval final** al requerimiento implementado
- Documentar las áreas de mejora potencial para futuras iteraciones (si existen)

**CRÍTICO**: "Todo esto es responsabilidad del desarrollador. Es decir, la IA está desarrollando, pero es el desarrollador como tal quien da la prueba, el aval final."

### Notas Importantes

**Prompt Faltante**: Esta fase requiere desarrollo de un prompt especializado para verificación técnica integral. El experto mencionó que verificaría si existe.

**Aval Final del Desarrollador**: Aunque la IA realice el análisis de verificación, **es el desarrollador quien da el aval final** de que el código está listo para considerarse completo.

**No es Responsabilidad de la IA**: "No es que digamos que el desarrollador verá si va a programar él o no. No, la intención es que la programación la haga la IA y que sea el desarrollador con su experiencia y conocimiento de patrones, de buenas prácticas, y adherirse a toda la documentación, y velar porque el código cumpla con lo pactado dentro del proyecto."

**Rol del Desarrollador**: El desarrollador debe usar su experiencia en:

- Patrones de diseño
- Buenas prácticas
- Adherencia a documentación del proyecto
- Estándares de calidad

**Correcciones Críticas vs. Mejoras Opcionales**: El reporte puede identificar:

- **Correcciones críticas**: Deben implementarse antes de aprobar
- **Áreas de mejora potencial**: Pueden documentarse para futuras iteraciones

**Certificación Final**: Esta fase representa la certificación de que el requerimiento está completamente implementado con la calidad esperada.

---

## Fase 8: Actualización de Documentación de Contexto del Proyecto

### Objetivo

Garantizar que todos los archivos de contexto del proyecto reflejen con precisión el estado actual del sistema después de completar un ciclo de desarrollo (Fases 0-7). Esta fase cierra el ciclo metodológico actualizando la documentación que alimenta futuros ciclos, previniendo la degradación progresiva de la calidad de información proporcionada a la IA.

**Principio rector**: Si se proporciona información desactualizada a la IA en futuros ciclos, esta amplificará esa desactualización — generando planes arquitectónicos contra componentes inexistentes, diseños que ignoran interfaces recién creadas, o integraciones con contratos obsoletos. Esta fase existe para romper ese ciclo de degradación.

### Entrada

- **Código refactorizado y verificado de la Fase 6** (estado final del código de producción)
- **Suite de pruebas completa de Fase 4.2** (estado final del código de pruebas)
- **Reporte de verificación técnica de la Fase 7** (certificación de completitud)
- **Especificación formal del requerimiento** (funcional o no funcional) implementado
- **Documento de análisis técnico de la Fase 1** (para trazar cambios contra análisis original)
- **Plan de implementación arquitectónica de la Fase 2** (para identificar decisiones arquitectónicas tomadas)
- **Especificación técnica detallada de la Fase 3** (para validar completitud de cambios)
- **Todos los archivos de contexto del proyecto** actualmente vigentes

### Clasificación de Archivos de Contexto por Criticidad

Los archivos de contexto del proyecto se clasifican en tres niveles de criticidad de actualización. Esta clasificación guía la priorización del análisis y la obligatoriedad de actualización en cada ciclo.

#### Actualización Obligatoria (Alta Criticidad)

Estos archivos contienen información que queda inevitablemente desactualizada tras cualquier ciclo de desarrollo que introduzca código nuevo. Su desactualización causa impacto directo e inmediato en la calidad de futuros ciclos:

- **`existing_components_inventory.context.md`**: Inventario de componentes/clases existentes. Se utiliza en Fases 2, 2.1 y 3 para que la IA conozca componentes existentes sin cargar código fuente completo. Tras la Fase 7, este inventario es incorrecto: se habrán creado componentes nuevos, modificado responsabilidades, cambiado interfaces públicas o eliminado componentes. Si no se actualiza, la IA planificará arquitectura con un mapa de componentes incorrecto.

- **`project_directory_tree.context.md`**: Árbol de directorios del proyecto. Se utiliza desde la Fase 1 y es crítico en Fase 3 para especificar rutas exactas de archivos a crear o modificar. Tras la Fase 7, la estructura de directorios ha cambiado con archivos y carpetas nuevas. Puede regenerarse automáticamente con `tree -L 3 -I 'node_modules|.git|target|build'` desde la raíz del proyecto.

- **`database_schema.context.md`**: Esquema de base de datos. Se utiliza en Fases 1, 2, 2.1 y 3 para planificar estrategia de persistencia. Si el requerimiento completado involucró cambios de esquema (tablas nuevas, columnas, índices, constraints, relaciones FK, migraciones), este archivo está desactualizado. El riesgo es que la IA proponga diseños de persistencia incompatibles con el esquema actual.

- **`api_integration_contracts.context.md`**: Contratos de APIs externas/internas. Se utiliza condicionalmente en Fases 1, 2, 2.1 y 3 cuando hay integraciones. Si el requerimiento completado expuso nuevos endpoints, modificó contratos existentes o introdujo versionado de API, estos cambios deben reflejarse.

#### Actualización Condicional (Criticidad Media)

Estos archivos requieren actualización solo cuando el ciclo completado introdujo cambios que afectan su contenido. La necesidad se determina en el Paso 8.1:

- **`architecture_decision_records.context.md`**: Solo si se tomaron decisiones arquitectónicas nuevas o se desviaron ADRs existentes durante el ciclo. La omisión causa pérdida de conocimiento institucional.

- **`project_architecture.context.md`**: Solo si se introdujo un módulo nuevo, un bounded context nuevo, o se modificó significativamente el flujo de datos entre componentes. Una funcionalidad dentro de un módulo existente generalmente no altera la arquitectura de alto nivel.

- **`business_domain_dictionary.context.md`**: Solo si emergieron nuevos términos de dominio, se refinaron definiciones existentes o se establecieron sinónimos. El impacto de no actualizar es sutil pero acumulativo: degradación progresiva de la consistencia terminológica.

- **`reference_code_examples.context.md`**: Solo si el código completado en Fases 5-6 constituye un ejemplo ejemplar de implementación de un patrón — particularmente si se implementó un patrón por primera vez en el proyecto o la implementación representa una mejora significativa sobre los ejemplos existentes.

#### Actualización Excepcional (Criticidad Baja)

Estos archivos solo requieren actualización en circunstancias específicas y poco frecuentes:

- **`tech_stack_constraints.context.md`**: Solo si durante el ciclo se aprobó formalmente una nueva librería, se deprecó una existente, o se actualizó una versión del stack.

- **`security_and_compliance_requirements.context.md`**: Solo si el requerimiento completado estableció nuevos patrones de seguridad replicables o descubrió requisitos de compliance no documentados.

- **`testing_standards_and_patterns.context.md`**: Solo si durante las Fases 4-4.2 se establecieron nuevos patrones de testing, estrategias de moqueo novedosas, o se adoptaron convenciones que deban ser estándar del proyecto.

### Proceso

Esta fase se ejecuta en **tres pasos secuenciales obligatorios**, cada uno con su propio prompt y entregable.

---

#### Paso 8.1: Informe de Análisis de Impacto en Documentación de Contexto

**Uso de IA Generativa**: Este paso requiere un prompt específico para análisis de impacto.

- **Prompt**: `phase_8-1.context-impact-analysis.prompt.md`

**NOTA CRÍTICA**: Este paso es exclusivamente analítico. NO se actualiza ningún archivo. Se genera un informe que el desarrollador debe validar antes de proceder con cualquier modificación.

Solicitar a la inteligencia artificial un análisis exhaustivo que determine qué archivos de contexto requieren actualización, mediante:

1. **Análisis diferencial de componentes**: Comparar el inventario de componentes existentes (`existing_components_inventory.context.md`) contra los componentes efectivamente creados, modificados o eliminados durante la implementación. Identificar clases nuevas, interfaces modificadas, servicios refactorizados y componentes obsoletos.
2. **Análisis diferencial de estructura**: Comparar el árbol de directorios documentado (`project_directory_tree.context.md`) contra la estructura resultante de la implementación. Identificar archivos nuevos, carpetas creadas, archivos reubicados o eliminados.
3. **Análisis diferencial de persistencia**: Comparar el esquema de base de datos documentado (`database_schema.context.md`) contra los cambios de esquema implementados. Identificar tablas nuevas, columnas agregadas, índices creados, constraints modificados, migraciones ejecutadas.
4. **Análisis diferencial de contratos**: Comparar los contratos de API documentados (`api_integration_contracts.context.md`) contra endpoints creados, modificados o deprecados durante la implementación. Identificar cambios en contratos existentes y nuevos contratos introducidos.
5. **Análisis de decisiones arquitectónicas**: Evaluar si durante el ciclo se tomaron decisiones arquitectónicas significativas que deban registrarse como nuevos ADRs en `architecture_decision_records.context.md`. Identificar desviaciones justificadas de ADRs existentes.
6. **Análisis de impacto arquitectónico**: Determinar si la implementación introdujo módulos nuevos, bounded contexts nuevos o modificaciones significativas al flujo de datos que requieran actualización de `project_architecture.context.md`.
7. **Análisis terminológico**: Identificar si emergieron nuevos términos de dominio, se refinaron definiciones existentes o se establecieron sinónimos durante el desarrollo que deban incorporarse a `business_domain_dictionary.context.md`.
8. **Análisis de ejemplos de referencia**: Evaluar si el código completado en Fases 5-6 constituye un ejemplo ejemplar de implementación de un patrón que deba incorporarse a `reference_code_examples.context.md` — particularmente si se implementó un patrón por primera vez en el proyecto o si la implementación representa una mejora significativa sobre los ejemplos existentes.
9. **Análisis de restricciones técnicas**: Determinar si durante el ciclo se aprobaron nuevas librerías, se deprecaron existentes o se actualizaron versiones del stack que requieran actualización de `tech_stack_constraints.context.md`.
10. **Análisis de seguridad y compliance**: Evaluar si el requerimiento completado estableció nuevos patrones de seguridad replicables o descubrió requisitos de compliance no documentados que deban reflejarse en `security_and_compliance_requirements.context.md`.
11. **Análisis de estándares de testing**: Determinar si durante las Fases 4-4.2 se establecieron nuevos patrones de testing, estrategias de moqueo novedosas o convenciones que deban estandarizarse en `testing_standards_and_patterns.context.md`.

**Requisitos de Calidad del Informe**:

- Cada archivo identificado para actualización **debe incluir justificación técnica específica** con evidencia trazable al código implementado
- La justificación debe referenciar archivos concretos, clases específicas, métodos modificados o artefactos creados — no afirmaciones genéricas
- El informe debe clasificar cada archivo en una de tres categorías de actualización:
  - **Obligatoria**: El archivo contiene información factualmente incorrecta respecto al estado actual del sistema
  - **Condicional**: El archivo se beneficiaría de actualización pero no contiene información incorrecta
  - **No requerida**: El archivo no fue afectado por la implementación

**NOTA SOBRE ALUCINACIÓN**: La exigencia de justificaciones con evidencia trazable existe para mitigar el riesgo de que la IA sugiera actualizaciones innecesarias o identifique cambios inexistentes. Si la IA no puede proporcionar evidencia concreta (nombre de archivo, clase, método, tabla, endpoint), la recomendación de actualización **debe descartarse**.

##### Entregable (Paso 8.1)

Informe de análisis de impacto en documentación de contexto que contenga:

- **Inventario clasificado de archivos**: Lista completa de archivos de contexto del proyecto con su categoría de actualización (Obligatoria, Condicional, No requerida)
- **Justificación técnica por archivo**: Para cada archivo clasificado como Obligatoria o Condicional, descripción específica de qué información está desactualizada y qué debe actualizarse, con referencias concretas al código implementado
- **Orden de actualización recomendado**: Secuencia sugerida para actualizar los archivos, priorizando los de categoría Obligatoria
- **Estimación de alcance**: Para cada archivo, indicación de si la actualización es menor (agregar/modificar entradas puntuales) o mayor (reestructuración significativa del contenido)

##### Responsabilidad del Desarrollador (Paso 8.1)

El desarrollador debe:

- **Leer el informe completo** y validar cada recomendación de actualización contra su conocimiento de la implementación realizada
- **Verificar las justificaciones** — si una justificación no referencia evidencia concreta, **descartar la recomendación**
- **Reclasificar archivos** si considera que la IA ha sobre-estimado o sub-estimado la necesidad de actualización
- **Agregar archivos omitidos** si identifica documentos de contexto afectados que la IA no detectó
- **Aprobar explícitamente** el informe corregido antes de proceder al Paso 8.2
- NO proceder si existen dudas sobre la completitud o precisión del análisis

**CRÍTICO**: Este informe es la hoja de ruta para las actualizaciones. Si el informe es incorrecto, las actualizaciones serán incorrectas. El desarrollador debe aplicar su conocimiento directo de la implementación para validar cada punto.

---

#### Paso 8.2: Actualización Iterativa de Archivos de Contexto

**Uso de IA Generativa**: Este paso requiere un prompt específico para actualización de archivos de contexto individuales.

- **Prompt**: `phase_8-2.context-file-update.prompt.md`

**PRINCIPIO**: Cada archivo se actualiza individualmente en una ejecución separada. NO se actualizan múltiples archivos en una sola ejecución por limitaciones de ventana de contexto y para garantizar precisión en cada actualización.

**Entrada por ejecución**:

- El archivo de contexto específico a actualizar (en su estado actual)
- El informe de análisis de impacto aprobado en Paso 8.1 (sección correspondiente al archivo)
- El código fuente implementado relevante al archivo (clases, interfaces, configuraciones, migraciones según corresponda)
- Documentación de fases anteriores que proporcione contexto sobre los cambios realizados

**Proceso de actualización por archivo**:

1. **Identificar secciones afectadas**: Localizar las secciones específicas del archivo de contexto que requieren modificación según el informe del Paso 8.1
2. **Extraer información del código**: Obtener la información actualizada directamente del código implementado — nombres de clases, interfaces públicas, métodos expuestos, esquemas de tablas, contratos de API, rutas de archivos
3. **Aplicar actualización**: Integrar la información extraída en el archivo de contexto, respetando el formato, estructura y convenciones existentes del archivo
4. **Preservar contenido no afectado**: Mantener intacta toda la información del archivo que no fue impactada por la implementación

**Restricciones de actualización**:

- **Solo información derivada del código**: La IA debe actualizar archivos **exclusivamente** con información verificable en el código implementado. Prohibido agregar información especulativa o inferida
- **Respetar formato existente**: Las actualizaciones deben seguir exactamente el formato y convenciones del archivo de contexto original
- **No eliminar sin justificación**: Si un componente, tabla o contrato debe eliminarse del archivo, la justificación debe ser explícita (componente eliminado del código, tabla deprecada con migración)
- **Marcar incertidumbre**: Si la IA no puede determinar con certeza un valor o estado, debe marcarlo explícitamente para revisión del desarrollador en lugar de asumir

**Orden de ejecución recomendado** (archivos de actualización obligatoria primero):

1. `existing_components_inventory.context.md` — Mayor impacto en planificación futura
2. `project_directory_tree.context.md` — Regenerable automáticamente con `tree`; validar contra implementación
3. `database_schema.context.md` — Si hubo cambios de esquema
4. `api_integration_contracts.context.md` — Si hubo cambios de contratos
5. Archivos de actualización condicional según priorización del informe

**NOTA SOBRE `project_directory_tree.context.md`**: Este archivo puede regenerarse automáticamente ejecutando `tree -L 3 -I 'node_modules|.git|target|build'` desde la raíz del proyecto. Si el desarrollador opta por regeneración automática, no requiere asistencia de IA para este archivo específico. La validación del desarrollador sigue siendo obligatoria.

##### Entregable (Paso 8.2)

Para cada archivo actualizado:

- **Archivo de contexto actualizado**: Versión completa del archivo con las modificaciones integradas
- **Resumen de cambios**: Lista concisa de qué se agregó, modificó o eliminó en el archivo, con referencia al código fuente que respalda cada cambio

##### Responsabilidad del Desarrollador (Paso 8.2)

El desarrollador debe, **para cada archivo actualizado**:

- **Comparar el archivo actualizado contra el original** para verificar que solo se modificaron las secciones identificadas
- **Validar cada cambio contra el código fuente** — confirmar que los nombres de clases, interfaces, métodos, tablas, endpoints y demás elementos coinciden exactamente con la implementación
- **Verificar que no se eliminó información válida** inadvertidamente
- **Verificar que el formato y convenciones del archivo se mantienen** consistentes
- **Aprobar explícitamente** cada archivo actualizado antes de proceder al siguiente
- Si un archivo requiere correcciones, **corregirlo antes de continuar** con el siguiente archivo

**CRÍTICO**: El desarrollador debe validar cada archivo individualmente. Aprobar archivos sin revisión introduce riesgo de información incorrecta que degradará la calidad de futuros ciclos de desarrollo.

---

#### Paso 8.3: Auditoría y Verificación Final de Coherencia

**Uso de IA Generativa**: Este paso requiere un prompt específico para auditoría de coherencia.

- **Prompt**: `phase_8-3.context-coherence-audit.prompt.md`

**PRINCIPIO**: Este paso es un control de calidad final que verifica la coherencia del conjunto completo de archivos de contexto actualizados contra el estado real de la implementación. Su función es análoga a las fases de validación (2.1, 3.1, 4.1) — detectar gaps, inconsistencias o errores introducidos durante la actualización.

**Entrada**:

- **Todos los archivos de contexto actualizados** en el Paso 8.2
- **Archivos de contexto no modificados** (para validar coherencia cruzada)
- **Código de producción refactorizado** de la Fase 6
- **Suite de pruebas** de la Fase 4.2
- **Reporte de verificación técnica** de la Fase 7
- **Informe de análisis de impacto** aprobado en Paso 8.1 (como referencia de cambios esperados)

Solicitar a la inteligencia artificial una auditoría que incluya:

1. **Verificación de coherencia cruzada**: Validar que la información sea consistente **entre** archivos de contexto. Por ejemplo: si `existing_components_inventory.context.md` lista un nuevo servicio `PaymentProcessor`, entonces `project_directory_tree.context.md` debe reflejar su archivo, y si persiste datos, `database_schema.context.md` debe reflejar las tablas correspondientes.
2. **Verificación de completitud**: Confirmar que **todos** los cambios identificados en el informe del Paso 8.1 (categoría Obligatoria) fueron efectivamente implementados en los archivos actualizados. Detectar actualizaciones que se aprobaron pero no se ejecutaron.
3. **Detección de omisiones**: Realizar un escaneo independiente del código de producción y la suite de pruebas para identificar cambios que **no fueron detectados** en el Paso 8.1 y que por tanto no fueron actualizados en el Paso 8.2. Este escaneo funciona como red de seguridad contra omisiones del análisis inicial.
4. **Validación de precisión factual**: Verificar mediante muestreo que los datos en los archivos actualizados (nombres de clases, firmas de métodos, esquemas de tablas, contratos de API) coinciden exactamente con el código fuente. Detectar errores de transcripción o inexactitudes.
5. **Verificación de formato y convenciones**: Confirmar que los archivos actualizados mantienen la estructura, formato y convenciones del proyecto de documentación de contexto.

### Flujos Posibles (Paso 8.3)

**Camino 1 — Coherencia Confirmada (Happy Path)**:

- La auditoría no detecta inconsistencias, omisiones ni errores
- El desarrollador valida el reporte y aprueba la finalización de la Fase 8
- **El ciclo de desarrollo se declara completo**

**Camino 2 — Inconsistencias Detectadas (Unhappy Path)**:

- La auditoría identifica inconsistencias, omisiones o errores específicos
- El desarrollador debe:
  1. **Leer y validar el reporte**, descartando hallazgos incorrectos de la IA
  2. **Corregir los archivos afectados** directamente o regresar al Paso 8.2 para los archivos que requieran re-actualización
  3. **Verificar las correcciones** antes de declarar el ciclo completo

#### Entregable (Paso 8.3)

Reporte de auditoría de coherencia que contenga:

- **Estado de coherencia cruzada**: Resultado de verificación de consistencia entre archivos de contexto
- **Estado de completitud**: Confirmación de que todas las actualizaciones obligatorias se ejecutaron
- **Omisiones detectadas**: Lista de cambios no capturados previamente, si existen, con evidencia del código fuente
- **Errores de precisión**: Inexactitudes detectadas en archivos actualizados, si existen
- **Dictamen final**: Declaración explícita de si los archivos de contexto están alineados con la implementación o si requieren correcciones adicionales

##### Responsabilidad del Desarrollador (Paso 8.3)

El desarrollador debe:

- **Leer el reporte de auditoría** y evaluar la validez de cada hallazgo
- **Aplicar criterio técnico** — la IA puede reportar falsos positivos o inconsistencias que no son relevantes
- Si se detectan inconsistencias reales:
  - **Corregir los archivos afectados** antes de declarar el ciclo completo
  - **NO declarar el ciclo completo** si existen inconsistencias pendientes en archivos de categoría Obligatoria
- **Dar el aval final** confirmando que los archivos de contexto están alineados con la implementación
- Documentar cualquier decisión de no actualizar archivos de categoría Condicional con justificación

**CRÍTICO**: Esta auditoría es la última línea de defensa contra documentación de contexto desactualizada. El desarrollador debe tratarla con la misma seriedad que la verificación de Fase 7.

### Entregable (Fase 8 Completa)

Conjunto actualizado de archivos de contexto del proyecto que incluya:

- **Archivos de contexto actualizados** que reflejan el estado real del sistema post-implementación
- **Informe de análisis de impacto** (Paso 8.1) como registro de qué cambios se identificaron y por qué
- **Resúmenes de cambios por archivo** (Paso 8.2) como registro de qué se modificó en cada archivo
- **Reporte de auditoría de coherencia** (Paso 8.3) como certificación de que los archivos están alineados

### Responsabilidad del Desarrollador

El desarrollador debe:

- **Ejecutar los tres pasos secuencialmente** — no omitir pasos ni alterar el orden
- **Validar cada entregable intermedio** antes de proceder al siguiente paso
- **Mantener la disciplina de actualización** incluso cuando la tentación sea iniciar un nuevo ciclo de desarrollo inmediatamente
- **Reconocer que esta fase protege la calidad de futuros ciclos** — omitirla degrada progresivamente la efectividad de la metodología
- **Dar el aval final** al conjunto completo de archivos actualizados

**CRÍTICO**: La omisión sistemática de esta fase es la forma más efectiva de degradar la calidad del proceso GAIDD a largo plazo. Cada ciclo completado sin actualizar archivos de contexto reduce la calidad de la información que recibirá la IA en ciclos posteriores, contradiciendo directamente el principio de que la IA amplifica la calidad de la información que recibe.

### Notas Importantes

**Documentación del Código vs. Documentación de Contexto**: Esta fase NO se ocupa de la documentación inline del código (Javadoc, JSDoc, docstrings, comentarios). Esa documentación se genera y refactoriza orgánicamente durante las Fases 5 y 6. La Fase 8 se ocupa exclusivamente de los **archivos de contexto del proyecto** que alimentan las fases de análisis y diseño (Fases 0.1-3) en futuros ciclos.

**No Todos los Ciclos Impactan Todos los Archivos**: Un requerimiento pequeño contenido en un módulo existente puede requerir actualizar solo `existing_components_inventory.context.md` y `project_directory_tree.context.md`. El informe del Paso 8.1 existe precisamente para determinar el alcance real de actualización — no se asume actualización universal.

**Regeneración Automática cuando sea Posible**: Archivos como `project_directory_tree.context.md` pueden regenerarse automáticamente con herramientas de línea de comandos. El desarrollador debe preferir regeneración automática sobre actualización manual cuando la herramienta exista y sea confiable.

**Human in the Loop Intensivo**: Cada paso de esta fase requiere validación del desarrollador. La IA puede sugerir actualizaciones innecesarias, omitir cambios relevantes o introducir inexactitudes durante la actualización. El desarrollador, que realizó la implementación, es quien tiene el conocimiento más preciso del estado real del sistema.

**Prompts Faltantes**: Esta fase requiere desarrollo de tres prompts especializados:

1. `phase_8-1.context-impact-analysis.prompt.md` — Análisis de impacto en documentación de contexto
2. `phase_8-2.context-file-update.prompt.md` — Actualización individual de archivo de contexto
3. `phase_8-3.context-coherence-audit.prompt.md` — Auditoría de coherencia final

---

## Consideraciones de Implementación

### Principios Rectores

**Human in the Loop en Todas las Fases:**

- El desarrollador **debe revisar** la salida de la IA en cada fase
- **No confiar a ciegas** en las salidas de la IA
- El desarrollador **debe leer los informes** que la IA genera
- Si algo no convence, **debe modificarse** o regenerarse
- Si la salida es incorrecta, **revisar el contexto** proporcionado a la IA

**Responsabilidad Única del Desarrollador:**

- El desarrollador es el **único responsable** de todos los entregables
- La IA es un **amplificador del proceso** de desarrollo
- Si se proporciona **mala información** a la IA, amplificará esa mala información
- Si se proporciona **buena información** a la IA, amplificará esa buena información
- El desarrollador debe **avalarlo todo** con su experiencia técnica

**Simplicidad sobre complejidad:**

- Favorecer soluciones simples y directas sobre implementaciones sofisticadas innecesarias
- Seguir el principio KISS en todas las decisiones de diseño

**Funcionalidad específica:**

- Implementar exclusivamente las funcionalidades explícitamente requeridas
- Adherirse al principio YAGNI sin agregar funcionalidad especulativa

**Código expresivo:**

- Priorizar la claridad y expresividad del código sobre optimizaciones prematuras que comprometan la legibilidad

### Test-Driven Development (TDD)

**Principio Fundamental:**

- Las **pruebas se desarrollan primero** (Fase 4)
- Luego se implementa el **código de producción** (Fase 5)
- Las pruebas **deben fallar inicialmente** (no hay código de producción)
- La implementación **hace que las pruebas pasen**
- La refactorización **mantiene las pruebas pasando**

**Beneficios del Enfoque TDD:**

- Garantiza que el código es testeable desde el diseño
- Proporciona red de seguridad para refactorizaciones
- Documenta el comportamiento esperado del sistema
- Detecta regresiones tempranamente

### Gestión de la Calidad

**Automatización de pruebas:**

- Mantener una suite de pruebas automatizadas que permita refactorizaciones seguras
- Ejecutar pruebas después de cada cambio significativo

**Métricas continuas:**

- Establecer umbrales de calidad para métricas como complejidad ciclomática, cobertura de pruebas y duplicación de código

**Revisión sistemática:**

- El desarrollador debe revisar el código generado por IA
- Validar adherencia a estándares antes de aprobar
- Aplicar criterio técnico sobre las sugerencias de la IA

### Uso Efectivo de IA Generativa

**Contexto es Crítico:**

- Proporcionar toda la documentación relevante del proyecto
- Incluir estándares, arquitectura, librerías, restricciones
- Contexto incompleto genera salidas incorrectas

**Ventana de Contexto y Salida:**

- La IA tiene limitaciones de ventana de respuesta
- Trabajar por partes en fases grandes (Fase 4.1, Fase 6)
- No intentar procesar múltiples documentos grandes simultáneamente

**Iteración y Refinamiento:**

- Es normal iterar con la IA para mejorar resultados
- No esperar perfección en el primer intento
- Guiar a la IA con correcciones específicas

**Criterio Técnico del Desarrollador:**

- La IA puede sugerir mejoras innecesarias
- No aceptar todas las recomendaciones automáticamente
- Evaluar cada sugerencia con experiencia profesional

### Escalabilidad del Proceso

**Reutilización de componentes:**

- Favorecer la reutilización de componentes existentes que cumplan con los estándares de calidad establecidos

**Documentación evolutiva:**

- Mantener documentación técnica que evolucione junto con el código
- Facilitar el mantenimiento futuro

**Prompts y Plantillas:**

- Desarrollar y mantener biblioteca de prompts efectivos
- Documentar qué prompts funcionan mejor para cada fase
- Iterar y mejorar prompts con base en experiencia

### Gestión de Dependencias

**Fases 0 y 0.1 - Sin Contexto del Proyecto:**

- Estas fases validan el requerimiento de forma aislada
- No requieren información del proyecto para clasificación y validación básica

**Desde Fase 1 en Adelante - Contexto Completo:**

- Requieren toda la documentación del proyecto
- Arquitectura, estándares, librerías, restricciones técnicas
- El contexto completo es esencial para análisis y diseño apropiado

**Documentos No Se Acumulan:**

- Las fases de validación (2.1, 3.1, 4.1) **corrigen** documentos previos
- NO se agregan como documentos adicionales
- El documento corregido es el que se usa en fases posteriores

**Prompts Faltantes - Trabajo Pendiente:**

- Varias fases requieren desarrollo de prompts especializados
- Estos están documentados como **[FALTA INFORMACIÓN: ...]**
- Deben desarrollarse para automatización completa del proceso

### Consideraciones Finales

**No Proceder con Dudas:**

- Si el desarrollador no está seguro, **NO PROCEDER** a siguiente fase
- Es mejor detenerse y aclarar que continuar con incertidumbre
- Cada fase es filtro de calidad que previene retrabajos

**Inversión en Fases Tempranas:**

- El tiempo invertido en análisis y diseño (Fases 0-3) se recupera exponencialmente
- Previene rediseños, reimplementaciones y cambios de alcance
- Garantiza que lo que se implementa es realmente lo necesario

**IA como Amplificador, No Sustituto:**

- La IA amplifica las capacidades del desarrollador
- NO sustituye el criterio técnico profesional
- NO reemplaza la responsabilidad del desarrollador
- Es una herramienta poderosa que requiere guía humana experta

