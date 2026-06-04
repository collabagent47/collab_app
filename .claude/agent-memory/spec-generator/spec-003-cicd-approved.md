---
name: spec-003-cicd-approved
description: SPEC-003 CI/CD para Collab ROI Explorer — status APPROVED, listo para implementar
metadata:
  type: project
---

**SPEC-003: CI/CD Collab ROI Explorer**

**Status:** APPROVED (pre-aprobado por Tech Lead)

**Generado:** 2026-06-03

**Ubicación:** `d:\Estudio\studyVue\pokemon-game\src\node_modules\asd\.github\specs\collab-roi-cicd.spec.md`

**Archivos relacionados creados:**
- `.github/requirements/collab-roi-cicd.md` — Requerimiento original

**Contenido clave:**
- HU-01: Quality gate en push/PR (lint, typecheck, tests, build)
- HU-02: Deploy automático a GitHub Pages en push a main
- HU-03: Configuración Netlify y Vercel como alternativas
- HU-04: Variables de entorno y scripts de build

**Configuraciones a crear:**
1. `.github/workflows/ci.yml`
2. `.github/workflows/deploy-github-pages.yml`
3. `netlify.toml`
4. `vercel.json`
5. `.env.example`
6. ESLint config (`.eslintrc.cjs`)
7. Smoke test E2E (`e2e/smoke.spec.ts`)

**Scripts npm a agregar:**
- "lint": "eslint ."
- "typecheck": "tsc --noEmit"
- "test:coverage": "vitest run --coverage"
- "quality": "npm run lint && npm run typecheck && npm run test && npm run build"

**Notas de implementación:**
- Quality gate bloqueante: si lint/typecheck/tests/build fallan, no continúa
- vite.config.ts debe leer `GITHUB_PAGES` env var para `base` dinámico
- Node.js 20.x versión fija
- 3 smoke tests Playwright mínimo: Dashboard, Nueva Exploración, Academia ROI
