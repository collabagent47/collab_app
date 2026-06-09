---
name: feedback
description: Auditoría completa del proyecto en 3 fases — Evaluación (Project Graph), Validación (análisis detallado de cada gap con impacto y riesgo), Ejecución (plan de skills recomendado con orden y justificación). Convierte el estado real del proyecto en acciones concretas y mejoras permanentes al framework ASDD.
argument-hint: "<nombre-proyecto> [--modo=sprint|cierre|rapido]"
---

# Skill: feedback [EVALUACIÓN · VALIDACIÓN · EJECUCIÓN]

Auditoría estructurada en 3 fases que parte del estado real del proyecto,
explica qué falta y por qué importa, y propone un plan de acción ejecutable
con los skills del framework en el orden correcto.

---

## Cuándo ejecutar

| Momento | Modo | Alcance |
|---------|------|---------|
| Al cerrar una fase ASDD | `--modo=sprint` | Solo la fase completada |
| Al terminar el proyecto | `--modo=cierre` | Ciclo completo |
| Al descubrir algo urgente | `--modo=rapido` | Un gap, acción inmediata |
| Sin argumento | `--modo=cierre` | Asume cierre por defecto |

---

## MODO RÁPIDO (`--modo=rapido`) — Para uso diario

Flujo de 3 pasos, sin Project Graph completo, sin 7 categorías.
Úsalo cuando descubres algo concreto que mejorar ahora mismo.

```
1. ¿Qué aprendiste o encontraste? (una frase)
2. ¿En qué archivo del framework lo corriges? (skill / rule / meta-prompt / CLAUDE.md)
3. Aplicar el cambio + agregar 2 líneas al framework-changelog.md
```

Formato de entrada:
```
/feedback --modo=rapido
"El skill X no cubre el caso Y — agregar sección Z"
```

Formato de salida:
```
[RAPIDO] Mejora aplicada
  Archivo: .claude/skills/X/SKILL.md
  Cambio:  [descripción en 1 línea]
  Razón:   [evidencia]
  Log:     docs/output/feedback/framework-changelog.md ✅
```

Cuándo NO usar rapido: cuando hay más de 1 gap o no sabes bien qué cambiar → usar `--modo=sprint` o `--modo=cierre`.

---

## FASE 1 — EVALUACIÓN (Project Graph)

**Objetivo:** construir el mapa de estado real del proyecto escaneando todos los artefactos.
No asumir nada — solo evidencia de archivos.

### 1.1 — Pipeline ASDD (`.github/specs/`)

Leer el frontmatter de cada `.spec.md`. Extraer `id`, `status`, `feature`, `updated`.

```
ASDD Pipeline — Estado actual
══════════════════════════════════════════════════════════
SPEC-001  [DRAFT]        conversiones            2026-03-13
SPEC-002  [IMPLEMENTED]  collab-roi-explorer     2026-06-03
SPEC-003  [APPROVED]     collab-roi-cicd         2026-06-03
══════════════════════════════════════════════════════════
Completadas: 1   Aprobadas sin cerrar: 1   Huérfanas: 1
```

### 1.2 — Framework instalado (`.claude/`)

Escanear `.claude/skills/*/SKILL.md`, `.claude/rules/*.md`, `.claude/meta-prompts/*.md`.

```
Skills:       N instalados  → [lista de nombres]
Rules:        N activas     → [lista de nombres]
Meta-prompts: N             → [lista de nombres]
```

### 1.3 — Cobertura de tests

Buscar `**/*.test.{ts,tsx,js,py}` y `**/*.spec.{ts,tsx}`. Contar por tipo y total de `it(` / `test(`.

```
Tests:
  unit/         N archivos   ~N tests
  integration/  N archivos   ~N tests
  e2e/          N archivos   ~N tests
  ──────────────────────────
  Total:        N archivos   ~N tests
  Coverage:     [% si existe report | desconocida si no]
```

### 1.4 — CI/CD

Verificar existencia de cada archivo:

```
CI/CD:
  .github/workflows/ci.yml            [✅ | ❌]
  .github/workflows/deploy-*.yml      [✅ | ❌]  rama: [nombre]
  vercel.json                         [✅ | ❌]
  netlify.toml                        [✅ | ❌]
  .env.example                        [✅ | ❌]
```

### 1.5 — Artefactos de calidad (`docs/output/`)

```
docs/output/qa/                [✅ N archivos | ❌ vacío]
docs/output/security/          [✅ N archivos | ❌ vacío]
docs/output/responsive-review/ [✅ N archivos | ❌ vacío]
docs/output/feedback/          [✅ N retrospectivas | ❌ vacío]
```

### 1.6 — Corpus de datos

Buscar `src/data/`, `data/`, `corpus/` o equivalente:

```
Corpus:
  [ruta]/comercial/   N archivos (docx, xlsx, pdf, pptx)
  [ruta]/templates/   N archivos (ts, json)
  [ruta]/fixtures/    N archivos (ts, json)
```

### 1.7 — Mostrar Project Graph y confirmar

Presentar el resumen visual al usuario y esperar confirmación antes de FASE 2.

```
╔═══════════════════════════════════════════════════════════╗
║           PROJECT GRAPH — [nombre-proyecto]               ║
╠═══════════════════════════════════════════════════════════╣
║  PIPELINE ASDD         [resumen de specs y estados]       ║
║  FRAMEWORK .claude/    Skills: N  Rules: N  Prompts: N    ║
║  TESTS                 unit: N  integration: N  e2e: N    ║
║  CI/CD                 [checkmarks o gaps]                ║
║  ARTEFACTOS QA         [checkmarks o gaps]                ║
║  CORPUS                [N archivos encontrados]           ║
╚═══════════════════════════════════════════════════════════╝

Gaps detectados: N críticos · N medios · N bajos

¿Continuar con FASE 2 — Validación? (s/n)
```

---

## FASE 2 — VALIDACIÓN (Análisis detallado por gap)

**Objetivo:** para cada gap detectado en FASE 1, entregar un análisis completo
con descripción, impacto real y riesgo si no se corrige.

El formato de cada gap es:

```
─────────────────────────────────────────────────────────
GAP-[N] · [CRÍTICO | MEDIO | BAJO]
─────────────────────────────────────────────────────────
Qué es:
  [Descripción precisa del gap con referencia al archivo o artefacto]

Por qué es un problema:
  [Explicación de qué falla o se degrada cuando este gap existe.
   Ser concreto: "sin esto, X ocurre" no "podría causar problemas"]

Riesgo si no se corrige:
  [Qué podría fallar en producción, en el próximo proyecto, o en el equipo.
   Incluir probabilidad: alta / media / baja y consecuencia específica]

Evidencia:
  [Ruta del archivo o artefacto que confirma el gap. Citar línea si aplica]

Skill que lo resuelve:
  [nombre del skill ASDD que corrige este gap, o "acción manual"]
─────────────────────────────────────────────────────────
```

### Categorías a cubrir en la validación

Además de los gaps técnicos del Project Graph, analizar cada categoría con sus preguntas.
Para cada una extraer: **qué funcionó · qué falló · qué faltaba · mejora concreta**.

**A — Proceso ASDD**
- ¿El flujo Spec → Implementación → Tests → QA → Deploy se respetó?
- ¿Hubo código escrito sin spec APPROVED? ¿Por qué?
- ¿El orquestador coordinó bien las fases paralelas?
- ¿Alguna fase del flujo faltó o sobró?
- ¿El ciclo DRAFT→APPROVED→IN_PROGRESS→IMPLEMENTED fue útil?
- ¿Cuántos GAPSs quedaron sin resolver al aprobar la spec?
- *Mejora tipo:* agregar/quitar fase del orquestador, ajustar la Regla de Oro.

**B — Calidad del prompt de desarrollo**
- ¿El gpt-dev-prompt-factory.md produjo un requerimiento suficientemente preciso?
- ¿Qué secciones del requerimiento estuvieron incompletas o ambiguas?
- ¿Cuántas preguntas bloqueantes quedaron sin respuesta al arrancar?
- ¿El requerimiento cubrió mobile/PWA, seguridad, corpus de datos, entorno de deploy?
- ¿Qué pregunta faltaba y hubiera evitado un problema real?
- *Mejora tipo:* agregar pregunta o sección al `gpt-dev-prompt-factory.md`.

**C — Calidad de la spec**
- ¿Los criterios de aceptación Gherkin fueron suficientemente precisos?
- ¿Algún criterio fue ambiguo o imposible de testear?
- ¿Los modelos de datos reflejaron la realidad del dominio?
- ¿Los GAPSs documentados se resolvieron antes de implementar?
- ¿Hubo que modificar la spec después de APPROVED? ¿Cuántas veces?
- *Mejora tipo:* agregar sección a la spec-template, ajustar el DoR.

**D — Decisiones técnicas**
- ¿Qué decisiones de arquitectura resultaron correctas en la práctica?
- ¿Qué decisiones se tuvieron que revertir o ajustar durante el desarrollo?
- ¿Qué decisión habría cambiado el resultado más positivamente?
- ¿Hubo conflictos entre las rules del framework y los requerimientos del proyecto?
- ¿El stack elegido fue el adecuado para el caso?
- *Mejora tipo:* agregar ADR (Architectural Decision Record), actualizar rules.

**E — Tests y cobertura**
- ¿Los tests encontraron bugs reales antes de la UI? ¿O los bugs los encontró la UI?
- ¿Hubo tests que pasaban pero cubrían mal el comportamiento real?
- ¿El caso de regresión principal se definió con datos reales?
- ¿La cobertura mínima acordada (≥80%) se alcanzó?
- ¿Hubo deuda técnica introducida conscientemente? ¿Está documentada?
- *Mejora tipo:* ajustar unit-testing SKILL, agregar patrones a rules/testing.md.

**F — Corpus y dominio**
- ¿Existía documentación real del dominio (docs comerciales, exploraciones, Excel)?
- ¿Esa documentación se usó para construir las plantillas y fixtures?
- ¿Los datos reales permitieron encontrar casos edge que datos hipotéticos no habrían revelado?
- ¿El equipo sabe dónde están los documentos fuente de cada template?
- ¿Hay documentos en el corpus sin template correspondiente aún?
- *Mejora tipo:* agregar sección "Corpus" al gpt-dev-prompt-factory.md.

**G — UX, deploy y publicación**
- ¿El producto se pudo publicar sin bloqueos técnicos?
- ¿El flujo completo funciona en mobile/tablet sin regresiones?
- ¿El modo presentación (o equivalente) protege datos internos correctamente?
- ¿El CI/CD funcionó desde el primer deploy?
- ¿Un usuario nuevo puede usar el producto sin instrucciones?
- ¿La UI alcanzó el estándar de calidad definido (no parece Excel, no parece formulario)?
- *Mejora tipo:* agregar checklist UX a la DoD, agregar test E2E a smoke suite.

### Priorización de mejoras

Para cada mejora propuesta, asignar prioridad:

| Impacto | Esfuerzo | Prioridad | Acción |
|---------|----------|-----------|--------|
| Alto — afecta todos los proyectos futuros | Bajo < 1h | **P0** | Aplicar en esta sesión |
| Alto | Alto > 1h | **P1** | Próximo sprint de framework |
| Medio | Bajo | **P2** | Backlog framework |
| Bajo | Cualquiera | **P3** | Registro sin compromiso |

**Archivos del framework que puede modificar este skill (P0 únicamente):**

| Archivo | Cuándo modificar |
|---------|-----------------|
| `.claude/meta-prompts/gpt-dev-prompt-factory.md` | Faltó una pregunta crítica |
| `.claude/skills/<skill>/SKILL.md` | Un skill produjo resultados insuficientes |
| `.claude/rules/testing.md` | Se descubrió un antipatrón de testing |
| `.claude/rules/frontend.md` | El stack necesita una regla nueva |
| `.github/skills/<skill>/SKILL.md` | Sincronizar mirror (mismo contenido) |
| `CLAUDE.md` | Hay contexto de dominio que no debe perderse entre sesiones |

### Cierre de FASE 2

Terminar con tabla de priorización:

```
Resumen de validación
══════════════════════════════════════════════════════════
GAP-N  [CRÍTICO]  [descripción corta]  → /skill-que-resuelve
GAP-N  [MEDIO]    [descripción corta]  → /skill-que-resuelve
GAP-N  [BAJO]     [descripción corta]  → acción manual
══════════════════════════════════════════════════════════
Total: N gaps  |  Críticos: N  Medios: N  Bajos: N

¿Continuar con FASE 3 — Plan de ejecución? (s/n)
```

---

## FASE 3 — EJECUCIÓN DE SKILLS (Plan de acción)

**Objetivo:** convertir los gaps validados en un plan de skills concreto
con orden recomendado, justificación y output esperado por cada uno.

### 3.1 — Construir el plan de ejecución

Para cada skill recomendado, generar:

```
┌─────────────────────────────────────────────────────────┐
│  PASO [N] — /[nombre-skill]                             │
│  Prioridad: CRÍTICO | MEDIO | BAJO                      │
├─────────────────────────────────────────────────────────┤
│  Por qué ahora:                                         │
│    [Gap específico que resuelve, referenciando GAP-N]   │
│                                                         │
│  Qué produce:                                           │
│    [Output concreto: archivo generado, fix aplicado,    │
│     reporte creado, etc.]                               │
│                                                         │
│  Depende de:                                            │
│    [Skills que deben ejecutarse antes, o "ninguno"]     │
│                                                         │
│  Esfuerzo estimado:                                     │
│    [< 5 min | 5–15 min | 15–30 min | > 30 min]         │
└─────────────────────────────────────────────────────────┘
```

### 3.2 — Orden recomendado

Los skills se ordenan según estas reglas:

1. **Primero:** fixes de estado inconsistente (specs con status incorrecto, .gitignore faltante)
2. **Segundo:** gaps de CI/CD y deploy (bloquean todo lo demás si fallan)
3. **Tercero:** gaps de calidad — tests, cobertura, security
4. **Cuarto:** gaps de documentación — responsive-review, QA artefactos
5. **Último:** mejoras al framework (rules, skills, meta-prompts)

### 3.3 — Presentar el plan al usuario

```
PLAN DE EJECUCIÓN — [nombre-proyecto]
══════════════════════════════════════════════════════════════
PASO 1  /deploy-setup        [CRÍTICO]  ~5 min   sin deps
        → Crea .env.example, verifica ci.yml coherencia

PASO 2  acción manual        [CRÍTICO]  ~2 min   sin deps
        → Actualizar SPEC-003 status: IMPLEMENTED

PASO 3  /unit-testing        [MEDIO]    ~15 min  sin deps
        → Genera coverage report + tests faltantes

PASO 4  /owasp-scan          [MEDIO]    ~10 min  sin deps
        → Reporte seguridad para proyecto con auth + datos PII

PASO 5  /responsive-review   [BAJO]     ~5 min   sin deps
        → Genera reporte RWD en docs/output/responsive-review/

PASO 6  (mejoras framework)  [BAJO]     ~10 min  requiere PASOS 1–5
        → Actualiza changelog + aplica P0 al framework
══════════════════════════════════════════════════════════════
Tiempo total estimado: ~47 min
Críticos resueltos: 2  Medios: 2  Bajos: 2

¿Ejecutar el plan completo, seleccionar pasos, o exportar como checklist?
  [1] Ejecutar todo en orden
  [2] Seleccionar pasos
  [3] Exportar como checklist en docs/output/feedback/
```

### 3.4 — Ejecutar según elección del usuario

**Si elige [1] — Ejecutar todo:**
Ejecutar cada skill en el orden del plan. Reportar resultado antes de pasar al siguiente.
Si un paso falla: pausar, informar el error, preguntar si continuar con el siguiente.

**Si elige [2] — Seleccionar pasos:**
El usuario indica qué pasos ejecutar (e.g. "1, 3, 4").
Ejecutar solo esos, en el orden del plan.

**Si elige [3] — Exportar checklist:**
Generar `docs/output/feedback/[proyecto]-action-plan.md` con el plan como lista de tareas.
El usuario lo ejecuta manualmente cuando quiera.

### 3.5 — Cierre y documentación

Después de ejecutar los skills seleccionados, generar o actualizar estos dos archivos:

#### Template: `docs/output/feedback/[proyecto]-retrospective.md`

```markdown
# Retrospectiva — [Proyecto] · [Fecha]
**Modo:** cierre | sprint | rápido
**Fase cubierta:** Completo | Fase N
**Skills ejecutados:** [lista de /skills corridos]

---

## Resumen ejecutivo
[2–3 líneas: qué salió bien, qué cambiaría, cuál fue el aprendizaje más valioso]

---

## Project Graph al momento del feedback

| Dimensión | Estado | Gaps encontrados |
|-----------|--------|-----------------|
| Pipeline ASDD | N specs — N IMPLEMENTED | [gaps] |
| Framework | N skills, N rules | [gaps] |
| Tests | N tests — cobertura N% | [gaps] |
| CI/CD | [estado] | [gaps] |
| Artefactos QA | [estado] | [gaps] |

---

## Validación por categoría

### A — Proceso ASDD
**Qué funcionó:** [lista]
**Qué falló:** [lista]
**Evidencia:** [archivos / líneas]
**Mejora aplicada:** [cambio P0] | **Backlog:** [cambio P1/P2]

### B — Calidad del prompt de desarrollo
**Pregunta que faltó en gpt-dev-prompt-factory:** [texto]
**Mejora aplicada:** [cambio P0] | **Backlog:** [cambio P1/P2]

### C — Calidad de la spec
**Criterios ambiguos encontrados:** N — [descripción]
**Modificaciones post-APPROVED:** N — [razón]
**Mejora aplicada:** [cambio P0] | **Backlog:** [cambio P1/P2]

### D — Decisiones técnicas
| Decisión | Resultó | Evidencia |
|----------|---------|-----------|
| [stack/arquitectura] | ✅ Correcta / ❌ Revertida / ⚠️ Parcial | [evidencia] |

**Decisión más valiosa:** [texto]
**Decisión que cambiaría:** [texto + alternativa]

### E — Tests y cobertura
**Bugs encontrados por tests (antes de UI):** N
**Bugs encontrados por UI (tests los perdieron):** N
**Cobertura alcanzada:** N% vs objetivo 80%

### F — Corpus y dominio
**Documentos reales usados:** [lista]
**Templates pendientes de crear:** [lista de sectores sin template]

### G — UX y publicación
**Deploy exitoso en primer intento:** ✅ / ❌
**Flujo funcional en mobile:** ✅ / ❌
**UI alcanzó estándar premium:** ✅ / ❌

---

## Plan de ejecución ejecutado

| Paso | Skill | Estado | Output |
|------|-------|--------|--------|
| 1 | /nombre-skill | ✅ / ❌ / ⏭ skipped | [archivo generado] |

---

## Mejoras aplicadas al framework (P0)

| Archivo modificado | Cambio | Razón |
|-------------------|--------|-------|
| [archivo] | [descripción] | [evidencia del proyecto] |

## Backlog (P1/P2)

| Mejora | Prioridad | Esfuerzo |
|--------|-----------|---------|
| [mejora] | P1 | ~N min |

---

## Lección más valiosa

> [Una sola frase. El insight que todo el equipo debe recordar para el próximo proyecto.]
```

#### Template: entrada en `docs/output/feedback/framework-changelog.md`

```markdown
## [YYYY-MM-DD] (sesión N) — Proyecto: [nombre]

### Cambios aplicados (P0)
- **[archivo]**: [descripción del cambio]
  - Razón: [evidencia concreta del proyecto]
  - Aprendizaje: [qué falló o funcionó]

### Backlog agregado
- [mejora] — P1
```

#### Reporte final en consola

```
FEEDBACK COMPLETADO — [nombre-proyecto] · [fecha]
══════════════════════════════════════════════════════════
Gaps resueltos:              N/N
Skills ejecutados:           [lista]
Archivos generados/actualizados: [lista]
Mejoras P0 al framework:     N
══════════════════════════════════════════════════════════
Lección más valiosa:
  "[Una frase que todo el equipo debe recordar]"
```

---

## Reglas

- FASE 1 es obligatoria — nunca saltar directo a la retrospectiva
- FASE 2 solo describe gaps con evidencia real del proyecto; no inventar problemas hipotéticos
- FASE 3 solo recomienda skills que existen en `.claude/skills/`
- El plan de ejecución respeta siempre el orden de dependencias
- El changelog es acumulativo — nunca borrar entradas, solo agregar
- Si el modo es `--modo=sprint`, la validación (FASE 2) cubre solo la fase completada, no el proyecto completo
- No modificar código fuente del proyecto — solo artefactos de framework (`.claude/`, `.github/skills/`, `docs/output/`)
