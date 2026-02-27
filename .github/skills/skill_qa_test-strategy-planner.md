---
description: 'Skill que define la estrategia de testing completa del proyecto. Establece la pirámide de testing, tipos de pruebas necesarias, ambientes, criterios de entrada/salida y métricas de calidad.'
---

# Skill: test-strategy-planner [QA]

## Responsabilidad
Definir la estrategia integral de testing basada en el SPEC del proyecto,
estableciendo la pirámide de testing, proporciones y criterios de calidad.

---

## Pirámide de Testing (según qa-guidelines)

Para cada proyecto define la proporción según el tipo de arquitectura:

### Arquitectura Monolítica
```
         E2E (5%)
       ──────────────
      Integration (25%)
   ──────────────────────
        Unit (70%)
```

### Arquitectura de Microservicios
```
        E2E (5%)
     ──────────────
    Contract (20%)
  ────────────────────
  Integration (25%)
────────────────────────
      Unit (50%)
```

---

## Entregable: Plan de Estrategia

Genera el documento `docs/test-strategy.md` con esta estructura:

```markdown
# Test Strategy — [Nombre del Proyecto]
**Versión:** 1.0.0 | **Fecha:** [fecha] | **Generado por:** QA Agent

## 1. Alcance del Testing
[Qué se prueba y qué está fuera del alcance]

## 2. Tipos de Tests y Proporciones

| Tipo          | Proporción | Framework          | Responsable |
|---------------|------------|-------------------|-------------|
| Unitarios     | 70%        | Jest / Vitest     | Desarrollo  |
| Integración   | 25%        | Supertest / Jest  | Desarrollo  |
| E2E           | 5%         | Playwright        | QA          |
| Contract      | Si aplica  | Pact              | Desarrollo  |
| Performance   | Si aplica  | k6 / JMeter       | QA          |

## 3. Ambientes de Testing

| Ambiente | Propósito                    | Datos           | Automatizado |
|----------|------------------------------|-----------------|--------------|
| local    | Desarrollo y debugging       | Mock / Fixtures | No           |
| testing  | CI/CD, tests integración     | Seed de QA      | Sí           |
| staging  | E2E, acceptance, performance | Anonimizados    | Sí           |

## 4. Criterios de Entrada (Ready for Test)
- [ ] HU tiene criterios de aceptación definidos en Gherkin
- [ ] Código en ambiente de testing disponible
- [ ] Datos de prueba preparados
- [ ] Dependencias mockeadas o disponibles

## 5. Criterios de Salida (Done from QA)
- [ ] Cobertura de tests >= 80%
- [ ] 0 defectos críticos abiertos
- [ ] Todos los criterios de aceptación cubiertos
- [ ] Tests E2E de flujos críticos pasando
- [ ] Reporte de calidad generado

## 6. Métricas de Calidad

| Métrica                    | Objetivo  | Mínimo Aceptable |
|----------------------------|-----------|------------------|
| Cobertura de código        | 85%       | 80%              |
| Cobertura de HU            | 100%      | 95%              |
| Tasa de defectos por HU    | < 2       | < 5              |
| Tests fallando en pipeline | 0         | 0                |
| Defectos críticos abiertos | 0         | 0                |

## 7. Herramientas

| Propósito          | Herramienta       | Justificación              |
|--------------------|-------------------|-----------------------------|
| Unit/Integration   | Jest / Vitest     | [razón para este proyecto]  |
| E2E                | Playwright        | [razón para este proyecto]  |
| Contract Testing   | Pact              | Si arquitectura distribuida |
| Performance        | k6                | Si hay SLAs definidos       |
| Coverage           | Istanbul / V8     | Integrado con el framework  |

## 8. Riesgos de Calidad
[Identificados en el SPEC y el análisis de arquitectura]
```

---

## Proceso de Planificación

```
PASO 1 → Leer SPEC completo (HU, arquitectura, contratos)
PASO 2 → Determinar pirámide según tipo de arquitectura detectada
PASO 3 → Definir ambientes necesarios según el SPEC
PASO 4 → Establecer criterios de entrada y salida
PASO 5 → Definir métricas con umbrales concretos
PASO 6 → Seleccionar herramientas acordes al stack del proyecto
PASO 7 → Identificar riesgos de calidad iniciales
PASO 8 → Generar docs/test-strategy.md
```

## Reporte

```
📋 TEST-STRATEGY-PLANNER [QA] — REPORTE
════════════════════════════════════════════════
HU analizadas del SPEC:          X
Pirámide definida:               [Monolito / Microservicios]
Ambientes identificados:         X
Herramientas seleccionadas:      X
Riesgos iniciales identificados: X

Documento generado: docs/test-strategy.md ✅
════════════════════════════════════════════════
```
