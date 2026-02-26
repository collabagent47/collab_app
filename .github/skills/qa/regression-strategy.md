---
description: 'Skill que define la estrategia de regresión del proyecto. Establece las suites de smoke y regresión completa, frecuencias de ejecución, criterios de inclusión y gestión del conjunto de regresión.'
---

# Skill: regression-strategy [QA]

## Responsabilidad
Definir qué, cuándo y cómo ejecutar regresión para detectar defectos
introducidos por cambios en un sistema funcional.

---

## Tipos de Suite de Regresión

### Suite Smoke (Humo)
```
Propósito:   Verificación rápida de que el sistema funciona básicamente
Duración:    < 10 minutos
Frecuencia:  En cada PR y en cada deploy a cualquier ambiente
Contenido:   Flujos críticos de alto impacto únicamente
Criterio:    Si falla → bloquear el merge o el deploy inmediatamente
```

**Criterios de inclusión en Smoke:**
- Flujos clasificados como FLUJO-XXX de criticidad Alta
- Tags: `@critico` + `@smoke`
- Máximo 15-20 escenarios para mantener duración < 10 min

### Suite Regresión Completa
```
Propósito:   Verificar que ninguna funcionalidad existente se rompió
Duración:    < 60 minutos (si supera, paralelizar o dividir)
Frecuencia:  Diariamente en rama principal + antes de cada release
Contenido:   Todos los escenarios estabilizados y no @wip
Criterio:    Si falla → investigar y resolver antes de release candidato
```

**Criterios de inclusión en Regresión:**
- Tags: `@regresion` (excluyendo `@wip` y `@manual`)
- Todos los flujos del mapa de flujos críticos
- Tests de integración de todos los endpoints

---

## Entregable: Plan de Regresión

Genera `docs/regression-plan.md`:

```markdown
# Plan de Regresión — [Nombre del Proyecto]
**Versión:** 1.0 | **Fecha:** [fecha] | **Generado por:** QA Agent

## 1. Suite Smoke

### Escenarios incluidos
| ID Escenario | HU     | Flujo Crítico | Duración Est. | Tag      |
|--------------|--------|---------------|---------------|----------|
| ESC-001      | HU-001 | FLUJO-001     | 30s           | @smoke   |
| ESC-002      | HU-002 | FLUJO-002     | 45s           | @smoke   |

**Duración total estimada:** X minutos
**Criterio de falla:** 0 escenarios fallando permitidos

### Ejecución automática
- En: cada PR a rama principal
- En: cada deploy a ambiente de testing o staging
- Comando: `npx playwright test --grep @smoke`

## 2. Suite Regresión Completa

### Escenarios incluidos
| ID Escenario | HU     | Tipo         | Duración Est. | Tag          |
|--------------|--------|--------------|---------------|--------------|
| ESC-001..N   | HU-001 | E2E          | Xm            | @regresion   |
| INT-001..N   | HU-002 | Integración  | Xm            | @regresion   |

**Duración total estimada:** X minutos
**Criterio de falla:** 0 escenarios fallando para aprobar release

### Ejecución automática
- En: push a rama principal (nightly)
- En: creación de release candidate
- Comando: `npx playwright test --grep @regresion`

## 3. Gestión del Conjunto de Regresión

### Criterios de entrada (nuevo escenario a regresión)
- [ ] Escenario aprobado y estabilizado (no @wip)
- [ ] Tasa de flakiness < 2% en las últimas 10 ejecuciones
- [ ] Revisado por QA Lead
- [ ] Tiempo de ejecución documentado

### Criterios de salida (remover escenario de regresión)
- [ ] Funcionalidad deprecada y eliminada
- [ ] Escenario con flakiness > 10% crónico (revisar)
- [ ] Cubierto por otro escenario más completo

### Métricas de Salud del Conjunto
| Métrica                      | Objetivo | Alerta   |
|------------------------------|----------|----------|
| Tasa de éxito (últimas 7d)   | >= 98%   | < 95%    |
| Duración promedio smoke      | < 8 min  | > 10 min |
| Duración promedio completa   | < 45 min | > 60 min |
| Escenarios @wip no resueltos | < 5      | > 10     |
```

---

## Proceso de Definición

```
PASO 1 → Revisar docs/critical-flows.md para identificar candidatos a smoke
PASO 2 → Seleccionar máximo 20 escenarios para smoke (flujos Alta criticidad)
PASO 3 → Definir conjunto completo de regresión (todos @critico y @regresion)
PASO 4 → Calcular duración estimada de cada suite
PASO 5 → Definir frecuencias de ejecución por suite
PASO 6 → Configurar comandos de ejecución en package.json / CI
PASO 7 → Generar docs/regression-plan.md
```

## Reporte

```
🔄 REGRESSION-STRATEGY [QA] — REPORTE
════════════════════════════════════════════════
SUITE SMOKE:
  Escenarios:                    X (objetivo: <= 20)
  Duración estimada:             X min (objetivo: <= 10 min)
  Cobertura flujos críticos:     X%

SUITE REGRESIÓN COMPLETA:
  Escenarios:                    X
  Duración estimada:             X min (objetivo: <= 60 min)
  Cobertura HU:                  X%

Documento generado: docs/regression-plan.md ✅
════════════════════════════════════════════════
```
