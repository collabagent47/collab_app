# Requerimiento: CI/CD Collab ROI Explorer

## Feature: `collab-roi-cicd`

## Objetivo
Configurar CI/CD completo para publicar Collab ROI Explorer en hosting gratuito con quality gate obligatorio.

## Stack existente del proyecto
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Zustand, React Hook Form, Zod, Recharts, Framer Motion
- Vitest + React Testing Library
- Playwright

## Archivos a crear

### 1. `.github/workflows/ci.yml`
Quality gate en push/PR a main y develop
- Pasos: checkout, setup Node 20, npm ci, lint, typecheck, test, build
- Falla si cualquier paso falla

### 2. `.github/workflows/deploy-github-pages.yml`
Deploy automático a GitHub Pages en push a main
- Quality gate antes de deploy
- Usa actions/upload-pages-artifact@v3 y actions/deploy-pages@v4
- Requiere `base` en vite.config.ts configurado con GITHUB_PAGES env var

### 3. `netlify.toml`
Configuración para Netlify
- build command: npm run build
- publish: dist
- redirects SPA: /* → /index.html status 200

### 4. `vercel.json`
Configuración para Vercel
- buildCommand, outputDirectory, rewrites SPA

### 5. `.env.example`
Variables de entorno sin secretos
- VITE_APP_NAME=Collab ROI Explorer
- VITE_APP_ENV=development

### 6. Scripts adicionales en `package.json`
- "lint": "eslint ."
- "typecheck": "tsc --noEmit"
- "test:coverage": "vitest run --coverage"
- "quality": "npm run lint && npm run typecheck && npm run test && npm run build"

### 7. ESLint config
Si no existe

## Smoke test E2E mínimo
- Dashboard visible
- Nueva exploración visible
- Academia ROI visible

## Criterios de aceptación
- CI corre en push y PR
- No se hace deploy si quality gate falla
- Proyecto puede publicarse desde GitHub sin configuración adicional
- README documenta los comandos y opciones de deploy

## Notas
- Revisar si ESLint ya existe en el proyecto antes de configurar
- Asegúrar que vite.config.ts tenga soporte para GITHUB_PAGES env var
