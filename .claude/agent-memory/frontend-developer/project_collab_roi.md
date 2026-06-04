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

**Feature/ROI — Sesión Rápida (rama feature/ROI, 2026-06-04) implementada:**
- `src/services/followUpLossService.ts` — wrapper de calculateFollowUpOpportunity()
- `src/hooks/useFollowUpLoss.ts` — hook con calculate/reset/result/inputs
- `src/components/quick-session/GuidedQuestionCard/` — tarjeta con textarea + pills confirmed/assumption/pending
- `src/components/quick-session/GuidedQuestionsPanel/` — orquesta 5 preguntas del paso understand
- `src/components/quick-session/FollowUpLossCalculator/` — React Hook Form + Zod, 4 inputs type=text inputMode=numeric
- `src/components/quick-session/FollowUpLossResultCard/` — muestra expectedLostSales SIN mencionar ROI, con QualityWarning
- `src/components/quick-session/MiniProposalEditor/` — exporta MiniProposalData + generateProposal()
- `src/pages/QuickSessionPage/` — wizard 3 pasos, AnimatePresence, h-dvh, usa useExplorationStore
- `src/App.tsx` — ruta /session/quick dentro de AppShell
- `src/lib/presentation.ts` — guidedAnswers excluido explícitamente del DTO de presentación
- Typecheck: pasa 0 errores con Node 23 (Node 10 local incompatible con tsc moderno)

**Feature/auth — Auth mock + protección de rutas (rama feature/auth, 2026-06-04) implementada:**
- `src/domain/auth/` — ya existía: auth-types, permissions, mock-users, auth-service (NO recrear)
- `src/stores/authStore.ts` — Zustand store: currentUser, isAuthenticated, login, logout, initFromStorage
- `src/hooks/useAuth.ts` — llama initFromStorage en useEffect; devuelve currentUser/isAuthenticated/login/logout
- `src/hooks/usePermissions.ts` — wrappers tipados sobre todas las funciones de permissions.ts
- `src/domain/roi/roi-types.ts` — Exploration ahora incluye ownerId? y visibility?; re-exporta User/UserRole
- `src/lib/presentation.ts` — toPresentationViewModel acepta user?: User|null; viewer/learner reciben subset reducido
- `src/components/auth/ProtectedRoute/` — redirige a /login si no autenticado; muestra AccessDeniedPage si sin permiso de ruta
- `src/components/auth/AccessGate/` — renderiza children solo si el usuario tiene el Permission dado
- `src/components/auth/RoleBadge/` — badge de rol con colores por rol
- `src/components/auth/UserMenu/` — dropdown con nombre, RoleBadge, y botón de logout
- `src/pages/LoginPage/` — selector de usuario mock con motion, ROLE_LABELS/ROLE_COLORS
- `src/pages/AccessDeniedPage/` — pantalla de error con ShieldX de lucide-react
- `src/pages/UsersPage/` — lista de MOCK_USERS con RoleBadge (solo admin puede acceder)
- `src/components/layout/AppShell/` — sidebar filtra NAV_LINKS por hasPermission; Topbar incluye UserMenu
- `src/components/layout/MobileBottomNav/` — filtra NAV_ITEMS por hasPermission
- `src/App.tsx` — Login y PresentationMode son públicas; demás rutas bajo ProtectedRoute; initFromStorage en App
- 178 tests pasan; tsc --noEmit sin errores
