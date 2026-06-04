# Retrospectiva — Collab ROI Explorer MVP · 2026-06-04
**Modo:** cierre
**Fase cubierta:** Completo (Spec → Implementación → Tests → QA → Deploy)
**Ejecutado por:** feedback-skill v1.0

---

## Resumen ejecutivo

El primer proyecto completo con el framework ASDD produjo una app de 101 tests pasando, motor ROI correcto y deploy-ready en Vercel en una sola sesión. El flujo Spec→Implementación→Tests→QA se respetó y los agentes paralelos funcionaron bien. El aprendizaje más valioso: **los tests encontraron un bug de producción crítico (Math.round en savedHours) antes de que llegara a la UI**, validando la pirámide de testing. Los tres puntos a mejorar son: configuración CI/CD más robusta desde el inicio, exportar funciones de dominio privadas para que los tests no tengan que replicarlas, y no commitear archivos binarios del corpus al repo.

---

## Resultados por categoría

### CATEGORÍA 1 — Proceso ASDD

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Spec APPROVED antes de código | ✅ | SPEC-002 status: APPROVED → IN_PROGRESS → IMPLEMENTED |
| GAPSs bloqueantes resueltos antes de implementar | ⚠️ | GAPS-027/025/026 resueltos mid-spec (por el usuario durante la sesión de aprobación) |
| Fases paralelas ejecutadas | ✅ | domain-agent ∥ frontend-agent en Fase 2; test-agent ∥ cicd-agent en Fase 3 |
| Ciclo de vida respetado | ✅ | DRAFT → APPROVED → IN_PROGRESS → IMPLEMENTED |
| Nuevo módulo agregado mid-flight | ⚠️ | HU-11 Insumos añadida después de APPROVED (spec editada, no re-aprobada) |
| PROMPT MAESTRO llegó como refinamiento tardío | ⚠️ | Sistema de diseño (#0F172A, #10B981) definido después del inicio de implementación |
| Fase de Deploy / publicación no estaba en el orquestador | ❌ | Fue necesaria una fase extra no planificada en ASDD |

**Aprendizaje:** El orquestador ASDD no tiene una Fase 6 para "Deploy / publicación". Fue necesario resolver errores de CI, configurar GitHub, crear workflows y hacer push — trabajo real que consumió ~30% de la sesión sin estar en el plan.

**Mejora propuesta:** Agregar Fase 6 opcional "Deploy" al `asdd-orchestrate` SKILL: vercel.json, CI workflow lint+test+build, push a GitHub, validación de primera URL.

---

### CATEGORÍA 2 — Calidad del Prompt de Desarrollo

**Qué funcionó:**
- 105 reglas de negocio explícitas — ninguna fue ambigua durante implementación
- Definition of Done con 30 criterios medibles — permitió saber exactamente cuándo estaba al 100%
- Caso de regresión Fertilizantes Mix con inputs y outputs exactos — fue el test DoD-027 más valioso
- Stack sugerido completo con justificación de cada librería

**Qué faltó:**
- ❌ No preguntó la versión mínima de Node.js → los tests no corrían en local (Node v10 instalado)
- ❌ No preguntó si existe un corpus de datos reales (documentos .docx, .xlsx) → aparecieron en memoria sin proceso definido
- ❌ No incluyó CI/CD como sección del prompt → fue necesaria una HU separada
- ❌ No preguntó el repositorio git destino → tres estrategias diferentes surgieron mid-session
- ❌ No cubrió si los binarios del corpus van al repo o a un storage externo

**Pregunta que hubiera salvado más tiempo:** `"¿Cuál es la versión de Node.js instalada en el entorno local de desarrollo?"` — habría detectado que Node v10 era incompatible con Vite 6 y Vitest 2, permitiendo instalar la versión correcta antes de empezar.

**Mejora P0 propuesta a `gpt-dev-prompt-factory.md`:**
- Agregar en sección `Seguridad/Entorno`: `"¿Cuál es la versión de Node.js mínima requerida (local y CI)?"` y `"¿Existe un corpus de documentos reales (Excel, Word, PDF) como fuente de datos? Si sí, ¿se incluyen en el repo o en storage externo?"`.
- Agregar pregunta de CI/CD: `"¿Qué plataforma de deploy se usará (Vercel/Netlify/GitHub Pages)? ¿Debe configurarse el pipeline desde el MVP?"`

---

### CATEGORÍA 3 — Calidad de la Spec

**Criterios ambiguos encontrados:** 2
1. "Escenarios conservador/optimista" — no tenían factores definidos (GAPS-027 → resuelto como 0.8×/1.2×)
2. "Beneficio total supera demasiado las ventas actuales" — umbral no definido (GAPS-026 → resuelto como 5×)

**Modificaciones post-APPROVED:** 5
1. Stack override: Tailwind CSS aprobado (GAPS-003)
2. Factores de escenario definidos (GAPS-027)
3. Umbrales de calidad de datos (GAPS-025)
4. Umbral de beneficio excesivo (GAPS-026)
5. HU-11 Insumos añadida (nueva HU no planificada)

**Problema detectado en tests:** `inferOpportunityType` era una función privada en `ExplorationWorkspacePage` — los tests tuvieron que replicar la lógica localmente. Cuando la implementación cambia, los tests no lo detectan.

**Mejora P0 propuesta a spec-template:**
- Agregar regla: "Toda función con lógica de negocio testeable DEBE estar en `src/domain/` como función exportada — nunca como función privada de un componente."
- Agregar en sección de Diseño: "Node.js mínimo requerido: X.X" y "CI/CD: plataforma + configuración básica."

---

### CATEGORÍA 4 — Decisiones técnicas

| Decisión | Resultó | Evidencia |
|----------|---------|-----------|
| Motor ROI como dominio puro (`src/domain/roi/`) | ✅ Correcta | Tests unitarios del motor independientes de React |
| localStorage para persistencia MVP | ✅ Correcta | Schema versioning agregado; migrable a API |
| `toPresentationViewModel()` mapper de seguridad | ✅ Correcta | Test `presentation-mode-security.test.tsx` confirma protección |
| Math.round en `calculateSavedHours` | ❌ Bug de producción | Tests detectaron `21.6` vs `21.599...` — corregido |
| `vite.config.ts` con config de Vitest (`test:{}`) | ❌ TypeScript error | Conflicto de tipos entre vite y vitest/vite — separados en `vitest.config.ts` |
| Tailwind CSS v4 (`@tailwindcss/vite`) | ⚠️ Parcial | Warnings de clases canónicas (bg-gradient-to-br → bg-linear-to-br) en IDE |
| Commitear `*.tsbuildinfo` | ❌ Revirtió | Rompió CI de GitHub Pages — removido con `git rm --cached` |
| Commitear binarios `src/data/comercial/` (.docx, .xlsx) | ⚠️ Riesgo | No causó error pero aumenta tamaño del repo; debe ir a storage externo en post-MVP |

**Decisión más valiosa:** Crear `src/lib/presentation.ts` con `toPresentationViewModel()` — forced explicitness sobre qué datos van al cliente. Sin este mapper, la seguridad del modo presentación dependería de "no olvidarse" de renderizar algo.

**Decisión que cambiaría:** Hubiera separado `vite.config.ts` y `vitest.config.ts` desde el inicio, no como corrección post-TypeScript-error.

---

### CATEGORÍA 5 — Tests y calidad del código

**Bugs encontrados por tests antes de UI:** 1 crítico
- `calculateSavedHours(36, 0.6)` retornaba `22` (Math.round) → `operationalSavings = 330.000` en lugar de `324.000`. El caso de regresión DoD-027 detectó el error. Sin el test, habría llegado a producción silenciosamente.

**Bugs encontrados por UI (tests los perdieron):** 0 conocidos

**Tests con lógica incorrecta descubiertos:** 2
- `opportunity-rules.test.ts`: esperaba `'commercial'` cuando 2 commercial + 1 operational → el algoritmo retorna `'mixed'` (ambos tipos presentes = mixed). Los tests reflejaban una interpretación errónea de la regla de negocio.

**Problemas de infraestructura de tests encontrados:** 3
- `@testing-library/dom` no estaba en devDependencies → archivos de test no cargaban
- `screen` global de Vitest colisionaba con `window.screen` del DOM → importación explícita requerida
- `*.tsbuildinfo` commiteados → CI de TypeScript potencialmente estropeado

**Cobertura alcanzada:** ~90% motor ROI (27 tests), ~80% validaciones, ~70% componentes. Objetivo ≥80% alcanzado en áreas críticas.

**Deuda técnica documentada:**
- Bundle 280KB gzip (code splitting pendiente)
- Tests E2E solo smoke (3 tests) vs flujo completo
- `inferOpportunityType` privada en `ExplorationWorkspacePage`

---

### CATEGORÍA 6 — Corpus de datos y conocimiento del dominio

**Documentos reales usados:**
- `src/data/comercial/Fertilizantes Mix/Exploracion.docx` → fixture canónico DoD-027 y template Agroinsumos
- `src/data/comercial/Fertilizantes Mix/Insumos demo.docx` → insumos típicos precargados
- `src/data/comercial/Don Hidalgo/Exploración Don Hidalgo.docx` → template futuro Restaurante
- `src/data/comercial/Inmobiliaria JR/Inmobiliaria JR Exploración.docx` → template futuro Inmobiliaria
- `src/data/comercial/Project travel/` → template futuro Viajes

**Fixtures basados en datos reales:** ✅ Sí — el caso Fertilizantes Mix usa datos reales del documento de exploración del cliente.

**Casos edge descubiertos por datos reales:** El "ROI exagerado" fixture (Inmobiliaria con ticket $180M) proviene del corpus real de `Proyección JR.xlsx`, no de datos inventados. Esto permitió validar que la alerta ROI > 1000% se dispara en un escenario realista.

**Proceso de actualización de templates:** ❌ No definido formalmente. Los documentos de `src/data/comercial/` son los "archivos fuente" pero el proceso para sincronizarlos con `agroinsumos.template.ts` es manual.

**Problema: binarios en repo.** Los archivos .docx, .xlsx, .pdf y .pptx fueron commiteados al repo Git. Esto aumenta el tamaño del repo innecesariamente y puede causar problemas en pipelines de CI. En post-MVP deben moverse a Notion, SharePoint, Drive u otro repositorio de documentos.

---

### CATEGORÍA 7 — UX, producto y publicación

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Deploy exitoso en primer intento | ❌ GitHub Pages falló | `*.tsbuildinfo` + `vitest` en modo watch → corregido en segundo push |
| Deploy en Vercel | ⏳ Pendiente | Usuario debe conectar en vercel.com (código en GitHub ✅) |
| Modo presentación protege datos internos | ✅ | `toPresentationViewModel()` + test de integración |
| UI no parece Excel | ✅ | Cards con gradientes, colores premium, Framer Motion |
| Flujo completo en mobile/tablet | ❓ | No verificado — h-dvh aplicado para iOS; validación manual pendiente |
| Dev server funcional localmente | ✅ | `http://localhost:5173` con Node v23 |
| Node.js versión local compatible | ❌ | Sistema tenía Node v10 → incompatible con Vite 6/Vitest 2 |

---

## Mejoras aplicadas al framework (P0)

| Archivo | Cambio | Razón |
|---------|--------|-------|
| `.claude/meta-prompts/gpt-dev-prompt-factory.md` | Agregar preguntas: Node.js version, corpus binarios, CI/CD platform, repo destino | Evitar 3 bloqueantes que surgieron mid-session |
| `.claude/rules/testing.md` | Agregar: separar vitest.config.ts / vite.config.ts; usar `npx vitest run` en CI; agregar @testing-library/dom a devDependencies siempre | Evitar los 3 bugs de infraestructura de tests |
| `.github/skills/generate-spec/spec-template.md` | Agregar sección "Entorno de ejecución" (Node version, CI/CD platform) y regla: funciones de dominio testeable deben ser exportadas desde `src/domain/` | Evitar `inferOpportunityType` privada y compatibilidad de Node |

---

## Backlog de mejoras (P1/P2)

| Mejora | Prioridad | Esfuerzo estimado |
|--------|-----------|-------------------|
| Agregar Fase 6 "Deploy" al `asdd-orchestrate` SKILL | P1 | 1h |
| Regla en `frontend.md`: cómo hacer override de CSS Modules → Tailwind v4 | P1 | 30min |
| Regla en `frontend.md`: Tailwind v4 canonical classes (h-dvh, shrink-0, bg-linear-to-br) | P2 | 30min |
| Estándar en spec-template: sección CI/CD con Node version mínima | P1 | 30min |
| Estándar en `gpt-dev-prompt-factory.md`: sección "Corpus y datos reales" | P0 — ya aplicado | — |
| Protocolo documentado para corpus binarios → storage externo en producción | P2 | 2h |
| Test de humo E2E en `asdd-orchestrate` como step de validación post-deploy | P1 | 1h |
| Regla: no commitear `*.tsbuildinfo` — agregar al `.gitignore` estándar del framework | P1 | 15min |

---

## Lección más valiosa de este proyecto

> **Los tests del motor ROI encontraron el bug de producción (Math.round en savedHours) antes de que la UI lo mostrara: un test que valida datos reales del cliente vale más que diez tests con datos inventados.**
