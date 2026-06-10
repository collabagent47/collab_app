---
id: SPEC-003
status: IMPLEMENTED
feature: collab-roi-cicd
created: 2026-06-03
updated: 2026-06-09
author: spec-generator
version: "1.0"
related-specs: []
---

# Spec: CI/CD Collab ROI Explorer

> **Estado:** `APPROVED` — pre-aprobado por Tech Lead, listo para implementación.
> **Ciclo de vida:** DRAFT → APPROVED → IN_PROGRESS → IMPLEMENTED → DEPRECATED

---

## 1. REQUERIMIENTOS

### Descripción
Configurar pipeline de integración continua y despliegue automático para Collab ROI Explorer con quality gate obligatorio antes de publicar. El sistema debe verificar linting, tipado TypeScript, tests unitarios y build exitoso antes de permitir cualquier merge o despliegue. Soportar múltiples plataformas de hosting: GitHub Pages, Netlify y Vercel.

### Requerimiento de Negocio
```
Feature: collab-roi-cicd

Objetivo: Configurar CI/CD completo para publicar Collab ROI Explorer en hosting gratuito 
con quality gate obligatorio.

Stack existente del proyecto:
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Zustand, React Hook Form, Zod, Recharts, Framer Motion
- Vitest + React Testing Library
- Playwright

Archivos a crear:
1. .github/workflows/ci.yml — quality gate en push/PR a main y develop
2. .github/workflows/deploy-github-pages.yml — deploy automático a GitHub Pages en push a main
3. netlify.toml — configuración para Netlify
4. vercel.json — configuración para Vercel
5. .env.example — variables de entorno sin secretos
6. Scripts adicionales en package.json
7. ESLint config si no existe

Smoke test E2E mínimo:
- Dashboard visible
- Nueva exploración visible
- Academia ROI visible

Criterios de aceptación:
- CI corre en push y PR
- No se hace deploy si quality gate falla
- Proyecto puede publicarse desde GitHub sin configuración adicional
- README documenta los comandos y opciones de deploy
```

### Historias de Usuario

#### HU-01: Ejecutar quality gate en push y PR a ramas principales

```
Como:        Desarrollador
Quiero:      Que se ejecute automáticamente lint, typecheck, tests y build en cada push/PR
Para:        Garantizar que solo código de calidad entra a las ramas principales

Prioridad:   Alta
Estimación:  M
Dependencias: Ninguna
Capa:        Backend / DevOps
```

#### Criterios de Aceptación — HU-01

**Happy Path**
```gherkin
CRITERIO-1.1: Quality gate completo ejecuta exitosamente
  Dado que:  Un desarrollador hace push a una rama de feature con código válido
  Cuando:    Se dispara el workflow de CI
  Entonces:  Lint, typecheck, tests y build se ejecutan sin errores
             El workflow termina con estado green
             El código está listo para merge
```

**Error Path**
```gherkin
CRITERIO-1.2: Quality gate falla y bloquea merge
  Dado que:  Un desarrollador hace push con código que tiene linting errors
  Cuando:    Se dispara el workflow de CI
  Entonces:  El paso de lint falla inmediatamente
             El workflow detiene ejecución (no continúa a typecheck ni tests)
             El status de la rama es red, bloqueando merge
             El desarrollador recibe notificación clara del error
```

**Edge Case**
```gherkin
CRITERIO-1.3: TypeScript errors detienen el build
  Dado que:  El código tiene tipos inválidos pero pasa linting
  Cuando:    Se ejecuta el paso typecheck
  Entonces:  tsc --noEmit detecta el error de tipos
             El workflow falla
             Build no inicia
```

#### HU-02: Desplegar automáticamente a GitHub Pages en push a main

```
Como:        Equipo de desarrollo
Quiero:      Que el proyecto se despliegue automáticamente en GitHub Pages cuando hago push a main
Para:        Tener siempre una versión publicada del proyecto sin pasos manuales

Prioridad:   Alta
Estimación:  M
Dependencias: HU-01 (quality gate debe pasar)
Capa:        Backend / DevOps
```

#### Criterios de Aceptación — HU-02

**Happy Path**
```gherkin
CRITERIO-2.1: Deploy a GitHub Pages se ejecuta automáticamente en main
  Dado que:  Quality gate completó exitosamente
  Cuando:    El commit se hace a la rama main
  Entonces:  El workflow de deploy se dispara automáticamente
             Genera los artifacts usando actions/upload-pages-artifact@v3
             Despliega usando actions/deploy-pages@v4
             El sitio está accesible en https://<usuario>.github.io/<repo>/
```

**Error Path**
```gherkin
CRITERIO-2.2: Deploy no ocurre si quality gate falla
  Dado que:  Quality gate falló (tests no pasaron)
  Cuando:    El commit llega a main
  Entonces:  El workflow de deploy no se dispara
             El sitio en producción mantiene versión anterior
             Se envía notificación del fallo de CI
```

#### HU-03: Configurar Netlify y Vercel para deploy alternativo

```
Como:        Equipo de desarrollo
Quiero:      Poder desplegar el proyecto en Netlify o Vercel como alternativas a GitHub Pages
Para:        Tener flexibilidad en la plataforma de hosting y no estar atados a una sola solución

Prioridad:   Media
Estimación:  S
Dependencias: HU-01 (quality gate)
Capa:        Backend / DevOps
```

#### Criterios de Aceptación — HU-03

**Happy Path**
```gherkin
CRITERIO-3.1: netlify.toml configura deploy en Netlify
  Dado que:  El archivo netlify.toml existe en la raíz del proyecto
  Cuando:    Se conecta el repositorio a Netlify
  Entonces:  Build command es "npm run build"
             Publish directory es "dist"
             Redirects SPA están configurados: /* → /index.html 200
             Deploy ocurre automáticamente en push a main
```

**Happy Path**
```gherkin
CRITERIO-3.2: vercel.json configura deploy en Vercel
  Dado que:  El archivo vercel.json existe en la raíz del proyecto
  Cuando:    Se conecta el repositorio a Vercel
  Entonces:  buildCommand apunta a "npm run build"
             outputDirectory es "dist"
             Rewrites SPA están configurados para router
             Deploy ocurre automáticamente
```

#### HU-04: Documentar variables de entorno y scripts de build

```
Como:        Nuevo desarrollador o colaborador
Quiero:      Tener un archivo .env.example que liste todas las variables necesarias
Para:        Poder configurar el proyecto sin consultar a otros miembros del equipo

Prioridad:   Media
Estimación:  XS
Dependencias: Ninguna
Capa:        Frontend
```

#### Criterios de Aceptación — HU-04

**Happy Path**
```gherkin
CRITERIO-4.1: .env.example existe con variables iniciales
  Dado que:  Un nuevo desarrollador clona el repositorio
  Cuando:    Lee .env.example
  Entonces:  Encuentra VITE_APP_NAME=Collab ROI Explorer
             Encuentra VITE_APP_ENV=development
             Puede copiar el archivo a .env.local y ajustar valores
```

**Happy Path**
```gherkin
CRITERIO-4.2: Scripts de build documentados en package.json
  Dado que:  Un desarrollador ejecuta "npm run"
  Cuando:    Revisa los scripts disponibles
  Entonces:  Encuentra:
             - lint: eslint .
             - typecheck: tsc --noEmit
             - test:coverage: vitest run --coverage
             - quality: npm run lint && typecheck && test && build
```

### Reglas de Negocio
1. **Quality Gate Bloqueante**: Si cualquier paso (lint, typecheck, tests, build) falla, el workflow se detiene inmediatamente y no continúa. Merge bloqueado.
2. **Cobertura Mínima**: Tests deben ejecutarse con cobertura calculada (vitest run --coverage), aunque no hay gate de % en esta versión.
3. **Base URL para GitHub Pages**: vite.config.ts debe leer `process.env.GITHUB_PAGES` para configurar `base: "/<repo>/"` solo cuando se despliega en GH Pages.
4. **Smoke Test E2E**: Mínimo 3 tests Playwright verificando Dashboard, Nueva Exploración, y Academia ROI son accesibles.
5. **Artifacts Limpios**: Cada build debe limpiar `dist/` antes de iniciar y generar assets frescos.
6. **Node 20**: Versión fija de Node.js 20.x para reproducibilidad entre desarrolladores y CI.

---

## 2. DISEÑO

### Modelos de Datos
No aplica — feature es puramente de infraestructura/DevOps.

### API Endpoints
No aplica — feature es puramente de CI/CD.

### Configuración e Infraestructura

#### GitHub Actions Workflows

**`.github/workflows/ci.yml`** — Quality Gate
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run typecheck
      
      - name: Tests
        run: npm run test
      
      - name: Build
        run: npm run build
```

**`.github/workflows/deploy-github-pages.yml`** — Deploy a GitHub Pages
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run typecheck
      
      - name: Tests
        run: npm run test
      
      - name: Build
        env:
          GITHUB_PAGES: 'true'
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Archivos de Configuración

**`netlify.toml`** — Netlify
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**`vercel.json`** — Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**`.env.example`**
```
VITE_APP_NAME=Collab ROI Explorer
VITE_APP_ENV=development
```

#### Actualizaciones a `package.json`

Scripts adicionales a agregar:
```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test:coverage": "vitest run --coverage",
    "quality": "npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

#### ESLint Configuration

Si no existe, crear `.eslintrc.cjs`:
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
```

Agregar devDependencies si no existen:
```json
{
  "devDependencies": {
    "eslint": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint-plugin-react-hooks": "^4.0.0"
  }
}
```

#### Actualización a `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/pokemon-game/' : '/',
})
```

### Smoke Test E2E (Playwright)

**`e2e/smoke.spec.ts`**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Dashboard is visible', async ({ page }) => {
    const dashboard = page.locator('[data-testid="dashboard-home"]')
    await expect(dashboard).toBeVisible()
  })

  test('Nueva Exploración button is visible', async ({ page }) => {
    const newExplorationBtn = page.locator('button:has-text("Nueva Exploración")')
    await expect(newExplorationBtn).toBeVisible()
  })

  test('Academia ROI section is visible', async ({ page }) => {
    const academySection = page.locator('[data-testid="academy-section"]')
    await expect(academySection).toBeVisible()
  })
})
```

### Arquitectura y Dependencias

**Nuevos paquetes requeridos:**
- `eslint` ^8.0.0
- `@typescript-eslint/eslint-plugin` ^7.0.0
- `@typescript-eslint/parser` ^7.0.0
- `eslint-plugin-react-hooks` ^4.0.0

**Servicios externos:**
- GitHub Actions (CI/CD)
- GitHub Pages (hosting)
- Netlify (hosting alternativo)
- Vercel (hosting alternativo)

**Impacto en punto de entrada:**
- `vite.config.ts` — agregar lógica de base URL condicional

### Notas de Implementación
- ESLint debe correrse como segundo paso después de checkout/install para detectar problemas de estilo rápidamente
- TypeScript check (tsc --noEmit) es más rápido que build completo y debe ejecutarse antes de tests
- Tests deben ejecutarse con cobertura para tener visibilidad de áreas no cubiertas
- Build Vite es el paso final y más lento — solo se ejecuta si tests pasan
- GitHub Pages requiere `base: "/<repo>/"` porque se sirve desde subdirectorio, no root domain
- Netlify y Vercel pueden detectar el repositorio automáticamente y no requieren mucha configuración adicional
- Playwright smoke tests son ejecutables localmente (`npm run test:e2e`) antes de commit

---

## 3. LISTA DE TAREAS

> Checklist accionable para todos los agentes. Marcar cada ítem (`[x]`) al completarlo.
> El Orchestrator monitorea este checklist para determinar el progreso.

### Backend / DevOps

#### Configuración de CI/CD
- [ ] Crear `.github/workflows/ci.yml` con pasos: checkout, setup Node 20, install, lint, typecheck, test, build
- [ ] Crear `.github/workflows/deploy-github-pages.yml` con deploy a GitHub Pages
- [ ] Usar `actions/upload-pages-artifact@v3` y `actions/deploy-pages@v4`
- [ ] Configurar `vite.config.ts` para leer `GITHUB_PAGES` env var y ajustar `base` dinámicamente
- [ ] Crear `netlify.toml` con build command, publish dir y redirects SPA
- [ ] Crear `vercel.json` con buildCommand, outputDirectory y rewrites SPA

#### Configuración de Linting y Type Checking
- [ ] Crear o actualizar `.eslintrc.cjs` si no existe
- [ ] Instalar devDependencies de ESLint (eslint, @typescript-eslint/eslint-plugin, @typescript-eslint/parser, eslint-plugin-react-hooks)
- [ ] Agregar script "lint": "eslint ." en package.json
- [ ] Agregar script "typecheck": "tsc --noEmit" en package.json

#### Configuración de Environment
- [ ] Crear `.env.example` con VITE_APP_NAME y VITE_APP_ENV
- [ ] Documentar en README.md las variables de entorno y cómo configurarlas

#### Scripts en package.json
- [ ] Agregar "test:coverage": "vitest run --coverage"
- [ ] Agregar "quality": "npm run lint && npm run typecheck && npm run test && npm run build"

### Frontend

#### Smoke Test E2E
- [ ] Crear `e2e/smoke.spec.ts` con tests Playwright
- [ ] Test 1: Dashboard es visible (data-testid="dashboard-home")
- [ ] Test 2: Botón "Nueva Exploración" es visible
- [ ] Test 3: Sección Academia ROI es visible (data-testid="academy-section")
- [ ] Todos los tests E2E corren exitosamente con `npm run test:e2e`

#### Integración con CI/CD
- [ ] Confirmar que componentes Dashboard, NuevaExploración y Academia tienen data-testid correctos
- [ ] Asegurar que rutas de la aplicación están correctamente configuradas en React Router

### QA

#### Validación de Workflows
- [ ] Ejecutar manualmente `.github/workflows/ci.yml` en una PR de feature
- [ ] Confirmar que lint falla si hay errores de estilo (intentar agregar error deliberado)
- [ ] Confirmar que typecheck falla si hay errores de tipos
- [ ] Confirmar que tests se ejecutan y reportan cobertura
- [ ] Confirmar que build genera `dist/` correctamente
- [ ] Confirmar que merge es bloqueado si algún paso falla

#### Validación de Deploy
- [ ] Hacer push a main y verificar que deploy a GitHub Pages se ejecuta automáticamente
- [ ] Confirmar que sitio está accesible en https://<usuario>.github.io/pokemon-game/
- [ ] Verificar que Dashboard, Nueva Exploración y Academia ROI cargan correctamente en producción

#### Validación de Alternativas de Hosting
- [ ] Conectar repositorio a Netlify y verificar que deploy se ejecuta automáticamente
- [ ] Confirmar que SPA redirects funcionan (navegar directamente a /exploration/)
- [ ] Conectar repositorio a Vercel y repetir validación
- [ ] Documentar pasos en README.md para cada plataforma

#### Documentación
- [ ] Actualizar README.md con sección "CI/CD Setup"
- [ ] Documentar comandos: npm run lint, typecheck, test:coverage, quality
- [ ] Documentar opciones de deploy: GitHub Pages, Netlify, Vercel
- [ ] Documentar pasos para configurar variables de entorno

#### Actualizar Estado Spec
- [ ] Cuando todos los items estén completados y aprobados por Tech Lead, cambiar `status: IMPLEMENTED`
