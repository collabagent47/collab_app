---
name: project-collab-roi-explorer
description: Collab ROI Explorer MVP — frontend React 19+Vite+Tailwind v4, CI/CD con GitHub Actions, design system con tokens CSS, AppShell con sidebar.
metadata:
  type: project
---

El frontend completo del Collab ROI Explorer MVP fue construido sobre el dominio existente.

**Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4 (@tailwindcss/vite), Zustand 5, Recharts 2, React Router v6, React Hook Form + Zod, Framer Motion, Lucide React, @hookform/resolvers.

**Why:** MVP de habilitación comercial para el equipo Collab, con metodología EVIAR para exploración de clientes y cálculo de ROI.

**How to apply:** No recrear archivos en src/domain/ ni src/data/templates/ — ya existen. El @hookform/resolvers es una dependencia adicional necesaria.

**CI/CD (SPEC-003) implementado:**
- `.github/workflows/ci.yml` — quality gate en PRs hacia main/develop (typecheck + test + build)
- `.github/workflows/deploy-github-pages.yml` — deploy automático a GitHub Pages en push a main
- `netlify.toml` — configuración de build para Netlify con SPA redirect
- `vercel.json` — configuración de build para Vercel con SPA rewrite
- `.env.example` — variables de entorno documentadas (VITE_APP_NAME, VITE_APP_ENV)
- `.gitignore` — excluye node_modules, dist, .env, coverage, playwright-report
- `vite.config.ts` actualizado con `base` dinámico: `/collab-roi-explorer/` cuando GITHUB_PAGES=true

**Design System (SPEC-003 Bloque B) implementado:**
- `src/styles/design-tokens.css` — tokens CSS globales (colores, sombras, radios)
- `src/index.css` — solo importa design-tokens.css (reemplaza @import tailwindcss directo)
- `src/components/layout/AppShell/index.tsx` — sidebar 240px + topbar 56px + Outlet
- `src/components/shared/ProgressRing/index.tsx` — SVG ring de progreso circular con props value/size/color/label
- `src/App.tsx` — refactorizado: AppShell como layout wrapper con Outlet, PresentationModePage fuera del shell

**Nota de entorno:** El entorno local tiene Node.js v10.24.1, incompatible con Vite 6 y TypeScript 5. El build real debe ejecutarse en CI (Node 20). Build previo confirmado exitoso en sesión anterior.

**TODO:** ESLint no está instalado como devDependency. El script `lint` está en package.json pero se omite del `quality` gate hasta que se instale (`npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks`).
