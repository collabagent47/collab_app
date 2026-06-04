---
name: feedback
description: Captura retrospectiva de un proyecto o fase y aplica los aprendizajes directamente al framework ASDD. Produce un documento de lecciones aprendidas, propone mejoras a skills/rules/meta-prompts y actualiza el changelog del framework. Convierte experiencia en mejora permanente.
argument-hint: "<nombre-proyecto | nombre-feature> [--modo=sprint|cierre|rapido]"
---

# Skill: feedback [FRAMEWORK EVOLUTION]

Retrospectiva estructurada que transforma aprendizajes del proyecto en mejoras
permanentes del framework ASDD. Cada vez que se ejecuta, el framework sale mejor
para el siguiente proyecto.

---

## Cuándo ejecutar

| Momento | Modo | Qué captura |
|---------|------|-------------|
| Al cerrar una fase ASDD | `--modo=sprint` | Aprendizajes de esa fase específica |
| Al terminar el proyecto | `--modo=cierre` | Retrospectiva completa del ciclo |
| Al descubrir algo importante | `--modo=rapido` | Una sola lección aplicada inmediatamente |
| Sin argumento | `--modo=cierre` | Asume cierre de proyecto por defecto |

---

## Proceso

```
1. Leer el contexto del proyecto
2. Ejecutar la retrospectiva por categorías
3. Priorizar mejoras por impacto
4. Aplicar mejoras al framework
5. Documentar en changelog
```

### Paso 1 — Leer contexto

```
.github/requirements/<proyecto>.md        ← requerimiento original
.github/specs/<proyecto>.spec.md          ← spec técnica
src/                                      ← implementación real
docs/output/qa/                           ← artefactos QA generados
docs/output/security/                     ← artefactos de seguridad (si existen)
src/data/comercial/ o equivalente         ← corpus de datos reales del proyecto
```

### Paso 2 — Retrospectiva por 7 categorías

Para cada categoría, extraer: **qué funcionó** · **qué falló** · **qué faltaba** · **mejora concreta propuesta**.

---

#### CATEGORÍA 1 — Framework y proceso ASDD

Preguntas a responder con evidencia del proyecto:

```
¿El flujo Spec → Implementación → Tests → QA se respetó?
¿Hubo código escrito sin spec APPROVED? ¿Por qué?
¿El Orchestrator coordinó bien las fases paralelas?
¿Alguna fase del flujo faltó o sobró?
¿El ciclo de vida DRAFT→APPROVED→IN_PROGRESS→IMPLEMENTED fue útil?
¿Cuántos GAPSs quedaron sin resolver al aprobar la spec?
```

Mejora tipo: agregar/quitar fase del orquestador, ajustar la Regla de Oro.

---

#### CATEGORÍA 2 — Calidad del Prompt de Desarrollo

Preguntas a responder:

```
¿El gpt-dev-prompt-factory.md produjo un requerimiento suficientemente preciso?
¿Qué secciones del requerimiento estuvieron incompletas o ambiguas?
¿Cuántas preguntas bloqueantes quedaron sin respuesta al arrancar?
¿El requerimiento cubrió mobile/PWA, seguridad, corpus de datos?
¿Qué pregunta faltaba en el factory y hubiera evitado un problema real?
```

Mejora tipo: agregar pregunta o sección al `gpt-dev-prompt-factory.md`.

---

#### CATEGORÍA 3 — Calidad de la Spec

Preguntas a responder:

```
¿Los criterios de aceptación Gherkin fueron suficientemente precisos?
¿Algún criterio fue ambiguo o imposible de testear?
¿Los modelos de datos reflejaron la realidad del dominio?
¿Los GAPSs documentados se resolvieron antes de implementar?
¿Hubo que modificar la spec después de APPROVED? ¿Cuántas veces?
```

Mejora tipo: agregar sección a la spec-template, ajustar el DoR.

---

#### CATEGORÍA 4 — Decisiones técnicas

Preguntas a responder:

```
¿Qué decisiones de arquitectura resultaron correctas en la práctica?
¿Qué decisiones se tuvieron que revertir o ajustar durante el desarrollo?
¿Qué decisión habría cambiado el resultado más positivamente?
¿Hubo conflictos entre las rules del framework y los requerimientos del proyecto?
¿El stack elegido fue el adecuado para el caso?
```

Mejora tipo: agregar Architectural Decision Record (ADR), actualizar rules.

---

#### CATEGORÍA 5 — Tests y calidad del código

Preguntas a responder:

```
¿Los tests encontraron bugs reales antes de la UI? (o ¿los bugs los encontró la UI?)
¿Hubo tests que pasaban pero cubrían mal el comportamiento real?
¿El caso de regresión principal (si existe) se definió con datos reales?
¿La cobertura mínima acordada se alcanzó?
¿Hubo deuda técnica introducida conscientemente? ¿Está documentada?
```

Mejora tipo: ajustar unit-testing SKILL, agregar patrones a rules/testing.md.

---

#### CATEGORÍA 6 — Corpus de datos y conocimiento del dominio

Preguntas a responder:

```
¿Existía documentación real del dominio (docs comerciales, exploraciones, Excel)?
¿Esa documentación se usó para construir las plantillas y fixtures?
¿Los datos reales permitieron encontrar casos edge que los datos hipotéticos no habrían revelado?
¿El equipo sabe dónde están los documentos fuente de cada template?
¿Existe un proceso para actualizar las plantillas cuando cambia la realidad del cliente?
```

Mejora tipo: agregar sección "Corpus" al gpt-dev-prompt-factory.md, documentar protocolo de actualización de templates.

---

#### CATEGORÍA 7 — UX, producto y publicación

Preguntas a responder:

```
¿El producto se pudo publicar sin bloqueos técnicos?
¿El flujo completo funciona en mobile/tablet sin regresiones?
¿El modo presentación (o equivalente) protege datos internos correctamente?
¿El CI/CD funcionó desde el primer deploy?
¿Un usuario nuevo puede usar el producto sin instrucciones?
¿La UI alcanzó el estándar de calidad definido (no parece Excel, no parece formulario)?
```

Mejora tipo: agregar checklist UX a la DoD del framework, agregar test E2E de presentación a smoke suite base.

---

### Paso 3 — Priorización de mejoras

Para cada mejora propuesta, clasificar:

| Impacto | Esfuerzo | Prioridad |
|---------|---------|-----------|
| Alto (afecta todos los proyectos futuros) | Bajo (< 1 hora) | P0 — aplicar ahora |
| Alto | Alto (> 1 hora) | P1 — próximo sprint |
| Medio | Bajo | P2 — backlog framework |
| Bajo | Cualquiera | P3 — registro, sin compromiso |

---

### Paso 4 — Aplicar mejoras P0 al framework

El skill aplica directamente los cambios P0 a:

| Archivo | Cuándo modificar |
|---------|-----------------|
| `.claude/meta-prompts/gpt-dev-prompt-factory.md` | Cuando faltó una pregunta crítica |
| `.claude/skills/<skill>/SKILL.md` | Cuando un skill produjo resultados insuficientes |
| `.claude/rules/testing.md` | Cuando se descubrió un antipatrón de testing |
| `.claude/rules/frontend.md` | Cuando el stack necesita una regla nueva |
| `.github/skills/<skill>/SKILL.md` | Sincronizar con Claude Code (mismo contenido) |
| `CLAUDE.md` del proyecto | Cuando hay contexto de dominio que no debe perderse |

---

### Paso 5 — Documentar en changelog y retrospectiva

**Generar dos archivos:**

#### `docs/output/feedback/<proyecto>-retrospective.md`
Documento completo de la retrospectiva. Se comparte con el equipo.

#### `docs/output/feedback/framework-changelog.md`
Log acumulativo de todas las mejoras aplicadas al framework. Se actualiza con cada ejecución de `/feedback`.

---

## Entregable: `docs/output/feedback/<proyecto>-retrospective.md`

```markdown
# Retrospectiva — [Proyecto] · [Fecha]
**Modo:** cierre | sprint | rápido
**Fase cubierta:** [Fase 1–N o Completo]
**Ejecutado por:** feedback-skill v1.0

---

## Resumen ejecutivo
[2–3 líneas: qué salió bien, qué cambiaría, cuál fue el aprendizaje más valioso]

---

## Resultados por categoría

### Proceso ASDD
| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Spec APPROVED antes de código | ✅ / ❌ | [evidencia] |
| GAPSs resueltos antes de implementar | ✅ / ❌ | [número de GAPS abiertos] |
| Fases paralelas ejecutadas | ✅ / ❌ | [qué se ejecutó en paralelo] |

**Aprendizaje:** [texto libre]
**Mejora propuesta:** [acción concreta]

### Calidad del Prompt de Desarrollo
**Qué funcionó:** [lista]
**Qué faltó:** [lista]
**Pregunta que hubiera salvado tiempo:** [texto]
**Mejora propuesta a gpt-dev-prompt-factory.md:** [sección/pregunta a agregar]

### Calidad de la Spec
**Criterios ambiguos encontrados:** [número + descripción]
**Modificaciones post-APPROVED:** [número + razón]
**Mejora propuesta a spec-template:** [texto]

### Decisiones técnicas
| Decisión | Resultó | Evidencia |
|----------|---------|-----------|
| [stack/arquitectura] | ✅ Correcta / ❌ Se revirtió / ⚠️ Parcial | [evidencia] |

**Decisión más valiosa:** [texto]
**Decisión que cambiaría:** [texto + alternativa]

### Tests y calidad
**Bugs encontrados por tests (antes de UI):** [número]
**Bugs encontrados por UI (tests los perdieron):** [número]
**Tests con lógica incorrecta descubiertos:** [número + descripción]
**Cobertura alcanzada:** [%] vs objetivo [%]

### Corpus de datos
**Documentos reales usados:** [lista]
**Fixtures basados en datos reales:** [sí/no]
**Casos edge descubiertos por datos reales:** [descripción]

### UX y publicación
**Deploy exitoso en primer intento:** ✅ / ❌
**Flujo completo funcional en mobile:** ✅ / ❌
**UI sin regresiones del estándar premium:** ✅ / ❌

---

## Mejoras aplicadas al framework (P0)

| Archivo modificado | Cambio aplicado | Razón |
|-------------------|-----------------|-------|
| [archivo] | [cambio] | [por qué era necesario] |

## Backlog de mejoras (P1/P2)

| Mejora | Prioridad | Esfuerzo estimado |
|--------|-----------|-------------------|
| [mejora] | P1 | [tiempo] |

---

## Lección más valiosa de este proyecto

> [Una frase. El insight más importante que todo el equipo debe recordar para el próximo proyecto.]
```

---

## Entregable: `docs/output/feedback/framework-changelog.md`

```markdown
# Framework ASDD — Changelog de Mejoras

## [YYYY-MM-DD] — Proyecto: [nombre]
### Cambios aplicados
- **[archivo]**: [descripción del cambio]
  - Razón: [por qué se hizo]
  - Aprendizaje origen: [qué falló o funcionó en el proyecto]

### Backlog agregado
- [mejora pendiente] — P[1/2]
```

---

## Reglas

- Solo proponer mejoras que tengan evidencia concreta del proyecto — sin mejoras hipotéticas
- No modificar implementación del proyecto — solo archivos del framework (`.claude/`, `.github/`)
- Si una mejora P0 rompe retrocompatibilidad con proyectos en curso, crear versión nueva del skill en lugar de editar el existente
- El changelog es acumulativo — nunca borrar entradas, solo agregar
- La lección más valiosa debe ser UNA sola frase — si no se puede sintetizar en una frase, la retrospectiva no fue suficientemente profunda

---

## Restricciones

- No modificar specs ni código fuente del proyecto
- No inventar problemas que no tuvieron evidencia real
- Si el proyecto está en estado IN_PROGRESS, usar `--modo=sprint` — no `--modo=cierre`
