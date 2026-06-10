# Framework ASDD — Changelog de Mejoras

---

## 2026-06-09 (sesión 4) — Proyecto: collab-roi-explorer-mvp — Dominio + Viewport + Framework

### Cambios aplicados (P0)

- **`src/domain/roi/opportunity-type.ts`**: Extraída `inferOpportunityType` de ExplorationWorkspacePage
  - Razón: función con lógica de negocio era privada → tests replicaban código de producción (antipatrón)
  - Ahora: exportada como módulo de dominio, importada desde la página y los tests
  - Regla aplicada: toda función testeable vive en `src/domain/` (ver rules/backend.md)

- **`src/tests/unit/opportunity-rules.test.ts`**: Eliminada réplica local, ahora importa desde dominio
  - Razón: con la extracción, la réplica local era duplicación sin valor; si la función cambia, el test lo detecta automáticamente

- **`src/tests/e2e/viewport.spec.ts`**: Tests Playwright multi-viewport creados (390px, 768px, 1280px)
  - 3 suites × 3 viewports = 9 tests
  - Cubre: CTA visible, navegación accesible, sin scroll horizontal (overflow-x)
  - Razón: smoke.spec.ts solo validaba desktop por defecto; bugs de layout no son detectables sin viewport tests

- **`.claude/meta-prompts/gpt-dev-prompt-factory.md`**: Sección 10 ampliada con 3 preguntas
  - Agrega: ¿rama de deploy? ¿breakpoints obligatorios? ¿tests E2E en 3 viewports desde inicio?
  - Razón: sin estas preguntas se asumió `main` como rama deploy (era `testing`) y no se planificaron viewport tests desde el inicio

### Skills nuevos (sesión 3, completados en sesión 4)

- **`.claude/skills/deploy-setup/SKILL.md`** + mirror: Skill de CI/CD en 3 plataformas
- **`.claude/skills/init-framework/SKILL.md`** + mirror: Skill de copia de framework ASDD completo
- **`.claude/skills/feedback/SKILL.md`** + mirror: Reescrito con 3 fases + modo rápido
- **`CLAUDE.md`**: Contexto permanente del proyecto creado en raíz
- **`.env.example`**: Template de variables de entorno

### Backlog actualizado

- Conectar Vercel al repo GitHub (collab-roi) — P1 (15min manual, pendiente)
- Code splitting bundle 280KB → < 200KB — P2 (pendiente)
- `npm run test:coverage` bloqueado por Node v10.24.1 local — requiere Node 22+ o correr en CI

---

## 2026-06-05 (sesión 3) — Proyecto: collab-roi-explorer-mvp — Skill deploy-setup

### Cambios aplicados (P0)

- **`.claude/skills/deploy-setup/SKILL.md`** + mirror `.github/`: Nuevo skill creado
  - Razón: setup de CI/CD era manual cada proyecto, generando bugs recurrentes (watch mode, .tsbuildinfo, base faltante)
  - Cubre 3 plataformas: GitHub Pages + Vercel + Netlify
  - Detecta y corrige 8 anti-patrones antes de que ocurran (tabla incluida en el skill)
  - Parchea automáticamente: vite.config.ts (base), package.json (scripts), .gitignore (*.tsbuildinfo)
  - Hace las 5 preguntas mínimas antes de generar nada

- **`.claude/skills/asdd-orchestrate/SKILL.md`** + mirror `.github/`: Fase 6 actualizada
  - Razón: Fase 6 decía "deploy-validator" (skill inexistente); ahora apunta a `/deploy-setup`
  - Lógica condicional: sin CI/CD existente → crear; con CI/CD → verificar coherencia

### Anti-patrones cubiertos por deploy-setup

| Anti-patrón | Frecuencia real |
|-------------|----------------|
| `npm run test` en CI (watch mode) | 1 vez collab-roi |
| `tsc -b` genera .tsbuildinfo commiteados | 1 vez collab-roi |
| Sin `base` en vite.config.ts (GitHub Pages 404) | 1 vez collab-roi |
| `redirects` en Vercel SPA (URL visible cambia) | documentado como aprendizaje |
| Sin `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` | documentado como aprendizaje |
| `npm install` en CI (ignora lockfile) | prevenido |
| Sin `concurrency` en deploy workflow | 1 vez detectado |
| `*.tsbuildinfo` en gitignore | 1 vez collab-roi |

### Backlog actualizado

- Agregar preguntas breakpoints + rama deploy a `gpt-dev-prompt-factory.md` — P1 (pendiente)
- Tests Playwright multi-viewport (390px, 768px, 1280px) en flujo ROI — P1 (pendiente)
- Extraer `inferOpportunityType` a `src/domain/` como exportación — P1 (pendiente)
- Conectar Vercel al repo GitHub (collab-roi) — P1 (15min manual, pendiente)
- Code splitting bundle 280KB → < 200KB — P2 (pendiente)

---

## 2026-06-04 (sesión 2) — Proyecto: collab-roi-explorer-mvp — Fase Responsive + P1 aplicados

### Cambios aplicados (P0)

- **`.claude/rules/frontend.md`**: Sección "Override Tailwind CSS v4" agregada al final
  - Razón: 3 bugs RWD detectados post-deploy (badge superpuesto, h-calc incorrecto, sidebar sin breakpoints)
  - Aprendizaje: los bugs de layout no los detectan los unit tests; necesitan inspección visual o tests Playwright multi-viewport

- **`.claude/skills/asdd-orchestrate/SKILL.md`** + mirror `.github/`: Fase 6 "Deploy" agregada al flujo
  - Razón: deploy consumió ~30% de la sesión sin estar en el plan del orquestador
  - Incluye: CI/CD pipeline, URL verification, checklist RWD mínimo (390px, 768px, 1280px)

- **`.github/skills/generate-spec/spec-template.md`**: Sección "Entorno de ejecución" + "Notas de arquitectura" agregadas
  - Razón: P0 documentado en changelog anterior pero nunca aplicado al archivo
  - Agrega: Node version, deploy platform, repo destino, corpus, rama de deploy
  - Agrega: regla dominio exportable, regla RWD en cards, regla alturas workspace

- **`.claude/skills/responsive-review/SKILL.md`** + mirror `.github/`: Nuevo skill creado
  - Razón: 3 bugs RWD encontrados solo por inspección visual — no existe skill para detectarlos sistemáticamente
  - Detecta 7 anti-patrones: badge sin shrink-0, min-w-0 faltante, h-calc incorrecto, sidebar sin hidden lg:flex, absolute en cards, alturas fijas, break-words obsoleto
  - Output: reporte en `docs/output/responsive-review/`

### Cambios confirmados de sesión anterior (P0 verificado aplicado)

- ✅ **`.claude/meta-prompts/gpt-dev-prompt-factory.md`**: Sección 10 "Entorno y publicación" — APLICADO
- ✅ **`.claude/rules/testing.md`**: vitest.config.ts, npx vitest run, peer deps — APLICADO
- ✅ **`.gitignore`**: `*.tsbuildinfo` — APLICADO (ya existía en el archivo)

### Backlog actualizado

- Agregar preguntas breakpoints + rama deploy a `gpt-dev-prompt-factory.md` — P1
- Tests Playwright multi-viewport (390px, 768px, 1280px) en flujo ROI — P1
- Extraer `inferOpportunityType` a `src/domain/` como exportación — P1
- Conectar Vercel al repo GitHub — P1 (15min manual)
- Protocolo corpus binarios → storage externo — P2
- Code splitting bundle 280KB → < 200KB — P2

---

## 2026-06-04 (sesión 1) — Proyecto: collab-roi-explorer-mvp

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
