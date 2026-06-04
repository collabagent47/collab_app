# Retrospectiva — Collab ROI Explorer MVP · 2026-06-04
**Modo:** cierre
**Fase cubierta:** Completo (Spec → Implementación → Tests → QA → Deploy → Responsive)
**Ejecutado por:** feedback-skill v1.0

---

## Resumen ejecutivo

El primer proyecto completo con el framework ASDD entregó una app con 101 tests pasando, motor ROI correcto y pipeline CI/CD funcional en una sola sesión. El flujo Spec→Implementación→Tests→QA se respetó y los agentes paralelos funcionaron bien. En una segunda sesión se detectó y corrigió un problema crítico de Responsive Web Design (textos superpuestos en `ROIScenarioCard`, cálculo de altura incorrecto en el workspace, sidebar sin breakpoints mobile). **El aprendizaje más valioso del ciclo completo: los tests del motor ROI encontraron el bug `Math.round` antes de que lo viera la UI; los tests de responsividad los encontró el ojo humano — ambos son igualmente necesarios.**

---

## Resultados por categoría

### CATEGORÍA 1 — Proceso ASDD

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Spec APPROVED antes de código | ✅ | SPEC-002 status: APPROVED → IN_PROGRESS → IMPLEMENTED |
| GAPSs bloqueantes resueltos antes de implementar | ⚠️ | GAPS-027/025/026 resueltos mid-spec durante la sesión de aprobación |
| Fases paralelas ejecutadas | ✅ | domain-agent ∥ frontend-agent en Fase 2; test-agent ∥ cicd-agent en Fase 3 |
| Ciclo de vida respetado | ✅ | DRAFT → APPROVED → IN_PROGRESS → IMPLEMENTED |
| HU-11 Insumos añadida post-APPROVED | ⚠️ | Nueva HU agregada sin re-aprobación formal de spec |
| Prompt maestro con sistema de diseño llegó tarde | ⚠️ | Colores (#0F172A, #10B981) definidos después de iniciar implementación |
| Fase Deploy no estaba en el orquestador | ❌ | CI/CD + GitHub + workflows consumieron ~30% de la sesión sin plan previo |
| Fase Responsive no estaba en DoD | ❌ | Textos superpuestos y layout roto en mobile detectados en sesión posterior |

**Aprendizaje:** El orquestador ASDD no tiene Fase 6 "Deploy" ni Fase 7 "Responsive QA". Ambas surgieron como trabajo no planificado después del "IMPLEMENTED". La DoD debe incluir un checklist de responsividad antes de declarar 100%.

**Mejora propuesta:**
- Agregar Fase 6 "Deploy" al `asdd-orchestrate`: vercel.json / GitHub Pages workflow / push.
- Agregar checklist RWD obligatorio a la DoD de specs frontend: viewport 390px, 768px, 1280px, 1440px sin scroll horizontal.

---

### CATEGORÍA 2 — Calidad del Prompt de Desarrollo

**Qué funcionó:**
- 105 reglas de negocio explícitas — ninguna fue ambigua durante implementación
- DoD con 30 criterios medibles — permitió saber exactamente cuándo estaba al 100%
- Caso de regresión Fertilizantes Mix con inputs y outputs exactos — fue el test más valioso del ciclo
- Stack sugerido completo con justificación de cada librería

**Qué faltó:**
- ❌ No preguntó la versión mínima de Node.js → Node v10 en local era incompatible con Vite 6
- ❌ No preguntó si existe corpus de datos reales (documentos .docx, .xlsx) → binarios commiteados sin proceso
- ❌ No incluyó CI/CD como sección del prompt → fue necesaria una HU separada
- ❌ No preguntó el repositorio git destino → tres estrategias surgieron mid-session
- ❌ No incluyó breakpoints objetivo como requisito → responsividad rota en mobile no detectada hasta post-deploy
- ❌ No preguntó la rama de deploy (main vs testing) → cambio realizado manualmente post-deploy

**Pregunta que más tiempo hubiera ahorrado:** `"¿Cuál es la versión de Node.js instalada en local y en CI?"` — habría detectado incompatibilidad con Vite 6 / Vitest 2 antes de empezar.

**Segunda pregunta clave:** `"¿A qué breakpoints debe adaptarse la UI? ¿Mobile-first o desktop-first?"` — habría añadido RWD a la DoD desde el inicio.

**Mejoras P0 ya aplicadas a `gpt-dev-prompt-factory.md`:**
- Sección 10 "Entorno y publicación": Node.js version, corpus binarios, plataforma deploy, repo destino, CI/CD mínimo
- *(Pendiente P1)*: Agregar pregunta de breakpoints objetivo y rama de deploy

---

### CATEGORÍA 3 — Calidad de la Spec

**Criterios ambiguos encontrados:** 2
1. "Escenarios conservador/optimista" — factores no definidos (GAPS-027 → 0.8×/1.2×)
2. "Beneficio total supera demasiado las ventas actuales" — umbral no definido (GAPS-026 → 5×)

**Modificaciones post-APPROVED:** 5
1. Stack override Tailwind CSS aprobado (GAPS-003)
2. Factores de escenario definidos (GAPS-027)
3. Umbrales calidad de datos (GAPS-025)
4. Umbral beneficio excesivo (GAPS-026)
5. HU-11 Insumos añadida (HU no planificada)

**Problema detectado en tests:** `inferOpportunityType` era función privada de `ExplorationWorkspacePage` → tests replicaban la lógica. Al cambiar la implementación, los tests no lo detectan.

**Omisión en spec detectada post-deploy:** La spec no especificaba breakpoints ni comportamiento responsive de `ROIScenarioCard`, `AppShell` sidebar y `ExplorationWorkspacePage`. Esto causó textos superpuestos en mobile que solo se detectaron visualmente en sesión posterior.

**Mejoras propuestas:**
- Regla en spec-template: toda función con lógica de negocio testeable DEBE estar en `src/domain/` como exportación, nunca como función privada de un componente.
- Agregar sección "Entorno de ejecución" en spec-template (Node version, deploy platform).
- Agregar subsección "Responsividad" en diseño frontend: breakpoints objetivo, comportamiento en mobile, componentes que deben ser responsive.

---

### CATEGORÍA 4 — Decisiones técnicas

| Decisión | Resultó | Evidencia |
|----------|---------|-----------|
| Motor ROI como dominio puro (`src/domain/roi/`) | ✅ Correcta | Tests unitarios del motor independientes de React |
| localStorage para persistencia MVP | ✅ Correcta | Schema versioning agregado; migrable a API |
| `toPresentationViewModel()` mapper de seguridad | ✅ Correcta | Test `presentation-mode-security.test.tsx` confirma protección |
| `Math.round` en `calculateSavedHours` | ❌ Bug producción | Tests detectaron `21.6` vs `21.599...` — corregido |
| `vite.config.ts` con config de Vitest (`test:{}`) | ❌ Error TypeScript | Conflicto de tipos — separados en `vitest.config.ts` |
| Tailwind CSS v4 (`@tailwindcss/vite`) | ⚠️ Parcial | Warnings IDE: clases canónicas renombradas (break-words → wrap-break-word, bg-gradient-to-br → bg-linear-to-br) |
| `*.tsbuildinfo` commiteados | ❌ Revirtió | Rompió CI de GitHub Pages — removido con `git rm --cached` |
| `src/data/comercial/` binarios en repo | ⚠️ Riesgo | No causó error pero aumenta tamaño repo; debe ir a storage externo |
| Badge de confianza sin `shrink-0` en ROIScenarioCard | ❌ RWD bug | Badge se superponía con título en pantallas < 640px |
| `h-[calc(100dvh-64px)]` en ExplorationWorkspacePage | ❌ Incorrecto | Topbar = 56px + padding 32+32 = 120px; corrección: `h-full min-h-0` |
| Sidebar `AppShell` sin `hidden lg:flex` | ❌ Mobile roto | Sidebar siempre visible consumía espacio en tablet/mobile |
| Deploy branch `main` → `testing` | ✅ Correcto | Ajustado según necesidad de entorno de prueba |

**Decisión más valiosa:** Crear `src/lib/presentation.ts` con `toPresentationViewModel()` — forced explicitness sobre qué datos van al cliente.

**Decisión que cambiaría:** Hubiera separado `vite.config.ts` de `vitest.config.ts` desde el inicio Y hubiera añadido breakpoints responsive desde la primera versión de las cards ROI.

---

### CATEGORÍA 5 — Tests y calidad del código

**Bugs encontrados por tests antes de UI:** 1 crítico
- `calculateSavedHours(36, 0.6)` retornaba `22` (Math.round) → `operationalSavings` incorrecto. El caso de regresión DoD-027 lo detectó antes de que llegara a producción.

**Bugs encontrados por inspección visual (tests los perdieron):** 3
- Badge "Baja confianza" superpuesto sobre título de card en mobile
- `ExplorationWorkspacePage` con altura incorrecta (`h-[calc(100dvh-64px)]`)
- `AppShell` sidebar visible en mobile sin `hidden lg:flex`

**Lección:** los tests unitarios validan lógica; la inspección visual valida layout. Necesitamos ambas. Un test de snapshot o un test Playwright con viewport 390px hubiera capturado los 3 bugs de RWD automáticamente.

**Problemas de infraestructura de tests:** 3
- `@testing-library/dom` no estaba en devDependencies
- `screen` global de Vitest colisionaba con `window.screen`
- `*.tsbuildinfo` commiteados rompieron CI

**Cobertura:** ~90% motor ROI (27 tests), ~80% validaciones, ~70% componentes. Objetivo ≥80% alcanzado en áreas críticas. **Tests RWD: 0% — pendiente.**

**Deuda técnica documentada:**
- Bundle 280KB gzip (code splitting pendiente)
- Tests E2E solo smoke (3 tests) vs flujo completo
- `inferOpportunityType` privada en `ExplorationWorkspacePage`
- 0 tests de responsividad (Playwright multi-viewport)

---

### CATEGORÍA 6 — Corpus de datos y conocimiento del dominio

**Documentos reales usados:**
- `src/data/comercial/Fertilizantes Mix/Exploracion.docx` → fixture canónico DoD-027
- `src/data/comercial/Fertilizantes Mix/Insumos demo.docx` → insumos típicos Agroinsumos
- `src/data/comercial/Don Hidalgo/Exploración Don Hidalgo.docx` → template futuro Restaurante
- `src/data/comercial/Inmobiliaria JR/Inmobiliaria JR Exploración.docx` → template futuro + fixture ROI exagerado
- `src/data/comercial/Project travel/` → template futuro Viajes

**Fixtures basados en datos reales:** ✅ Sí — Fertilizantes Mix e Inmobiliaria JR usan datos reales del corpus.

**Casos edge descubiertos por datos reales:** El fixture "ROI exagerado" (Inmobiliaria ticket $180M) viene del corpus real `Proyección JR.xlsx` — validó que la alerta ROI > 1000% se dispara en un escenario realista, no solo en datos sintéticos.

**Proceso de actualización de templates:** ❌ No definido. Los `.docx` son la fuente de verdad pero la sincronización con `agroinsumos.template.ts` es manual y sin protocolo.

**Problema: binarios en repo.** Archivos .docx, .xlsx, .pdf, .pptx commiteados. En post-MVP deben moverse a Notion/Drive/SharePoint.

---

### CATEGORÍA 7 — UX, producto y publicación

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Deploy GitHub Pages | ❌ Primer intento | `*.tsbuildinfo` + vitest watch → corregido en segundo push |
| Deploy Vercel | ⏳ Pendiente | Código en GitHub ✅; usuario debe conectar en vercel.com |
| Modo presentación protege datos internos | ✅ | `toPresentationViewModel()` + test integración |
| UI no parece Excel | ✅ | Cards gradientes, colores premium, Framer Motion |
| Badge confianza superpuesto con título | ❌ Detectado post-deploy | Faltaba `shrink-0` y `min-w-0` — corregido |
| Workspace altura incorrecta | ❌ Detectado post-deploy | `h-[calc(100dvh-64px)]` → `h-full min-h-0` — corregido |
| Sidebar AppShell sin breakpoints | ❌ Detectado post-deploy | → `hidden lg:flex` — corregido |
| Mobile: sin navegación de pasos EVIAR | ❌ Detectado post-deploy | Nav de pills móvil añadida |
| Flujo completo en mobile verificado | ✅ | Corregido con fixes RWD de la sesión 2 |
| Node.js versión local incompatible | ❌ | Sistema tenía Node v10 → actualizado a v23 |
| Rama de deploy `main` → `testing` | ✅ | Ajustado en `.github/workflows/deploy-github-pages.yml` |

---

## Mejoras aplicadas al framework (P0)

| Archivo | Cambio | Razón |
|---------|--------|-------|
| `.claude/meta-prompts/gpt-dev-prompt-factory.md` | Sección 10 "Entorno y publicación" con preguntas Node.js, corpus, deploy, repo, CI/CD | Evitar 3 bloqueantes surgidos mid-session |
| `.claude/rules/testing.md` | Separar vitest.config.ts/vite.config.ts; `npx vitest run` en CI; peer deps testing-library; screen explícito | Evitar 3 bugs infraestructura de tests |
| `.github/skills/generate-spec/spec-template.md` | Sección "Entorno de ejecución" + regla dominio exportable + subsección "Responsividad" en diseño frontend | Evitar `inferOpportunityType` privada y RWD sin spec |
| `.claude/rules/frontend.md` | Sección "Override Tailwind CSS v4": clases canónicas + reglas RWD (min-w-0, shrink-0, wrap-break-word, breakpoints) | Evitar los 3 bugs RWD detectados post-deploy |
| `.claude/skills/asdd-orchestrate/SKILL.md` | Fase 6 "Deploy" agregada al flujo + regla: checklist RWD antes de marcar IMPLEMENTED | Deploy consumió ~30% de sesión sin plan previo |
| `.github/skills/asdd-orchestrate/SKILL.md` | Mirror del cambio anterior | Sincronización Claude Code ↔ GitHub Copilot |
| `.claude/skills/responsive-review/SKILL.md` | Nuevo skill: auditoría RWD sistemática de componentes React/Tailwind | 3 bugs RWD que solo el ojo humano detectó |
| `.github/skills/responsive-review/SKILL.md` | Mirror del skill anterior | Disponible para GitHub Copilot |

---

## Backlog de mejoras (P1/P2)

| Mejora | Prioridad | Esfuerzo estimado | Estado |
|--------|-----------|-------------------|--------|
| Agregar pregunta breakpoints + rama deploy a `gpt-dev-prompt-factory.md` | P1 | 20min | Pendiente |
| Agregar subsección RWD a la DoD de la spec-template | P1 | 30min | Pendiente |
| Tests Playwright multi-viewport (390px, 768px, 1280px) en flujo ROI | P1 | 2h | Pendiente |
| Extraer `inferOpportunityType` a `src/domain/` como función exportada | P1 | 30min | Pendiente |
| Protocolo corpus binarios → storage externo en post-MVP | P2 | 2h | Pendiente |
| Test E2E post-deploy en orquestador | P1 | 1h | Pendiente |
| Code splitting bundle 280KB → < 200KB | P2 | 3h | Pendiente |
| Conectar Vercel al repo de GitHub | P1 | 15min (manual) | Pendiente |

---

## Lección más valiosa de este proyecto

> **Los tests unitarios atrapan bugs de lógica antes de que lleguen a la UI; la revisión visual en mobile atrapa bugs de layout que los tests ignoran: un proyecto no está terminado hasta que pases ambos filtros.**
