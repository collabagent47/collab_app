# Framework ASDD — Changelog de Mejoras

---

## 2026-06-04 — Proyecto: collab-roi-explorer-mvp

### Cambios aplicados (P0)

- **`.claude/meta-prompts/gpt-dev-prompt-factory.md`**: Agregadas 4 preguntas críticas a la sección de entorno y CI/CD
  - Razón: Node v10 en local bloqueó tests; corpus binarios commiteados sin proceso; repo destino ambiguo
  - Aprendizaje: sin estas preguntas se pierden ~30% de la sesión en problemas de entorno

- **`.claude/rules/testing.md`**: Agregadas reglas para vitest.config.ts, `npx vitest run` en CI y peer deps de testing-library
  - Razón: 3 bugs de infraestructura de tests encontrados: DOM collision, @testing-library/dom faltante, vite+vitest types conflict
  - Aprendizaje: separar vite.config.ts de vitest.config.ts desde el inicio evita un error de TypeScript mid-build

- **`.github/skills/generate-spec/spec-template.md`**: Agregada sección "Entorno de ejecución" y regla de dominio exportable
  - Razón: `inferOpportunityType` era privada → tests tuvieron que replicar lógica localmente
  - Aprendizaje: toda función con lógica de negocio testeable debe vivir en `src/domain/` como exportación

### Backlog agregado

- Fase 6 "Deploy" en `asdd-orchestrate` SKILL — P1
- Estándar `.gitignore` con `*.tsbuildinfo` en framework — P1
- Regla override Tailwind CSS en `frontend.md` — P1
- Protocolo corpus binarios → storage externo — P2
- Test E2E post-deploy en orquestador — P1
