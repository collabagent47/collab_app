---
description: 'Ejecuta el QA Agent con todos sus 8 skills para generar el plan de calidad completo del proyecto.'
mode: 'agent'
---

Ejecuta el QA Agent completo con todos sus 8 skills en secuencia.

**Instrucciones para @qa-agent:**

1. Cargar `.github/guidelines/qa/qa-guidelines.md` como primer paso
2. Leer el contexto completo del SPEC desde `docs/specs/specification.md`
3. Ejecutar los 8 skills en orden estricto:
   - SKILL 1: `test-strategy-planner` → generar `docs/test-strategy.md`
   - SKILL 2: `gherkin-case-generator` → generar features en `tests/features/`
   - SKILL 3: `risk-identifier` → generar `docs/risk-matrix.md`
   - SKILL 4: `test-data-specifier` → generar `tests/data/test-data-catalog.md`
   - SKILL 5: `critical-flow-mapper` → generar `docs/critical-flows.md`
   - SKILL 6: `regression-strategy` → generar `docs/regression-plan.md`
   - SKILL 7: `automation-flow-proposer` → generar `docs/automation-roadmap.md`
   - SKILL 8: `performance-analyzer` → generar `docs/performance-plan.md`
4. Generar reporte consolidado de calidad al finalizar

**Prerequisito:** Debe existir `docs/specs/specification.md`. Si no existe, ejecutar `/spec` primero.
