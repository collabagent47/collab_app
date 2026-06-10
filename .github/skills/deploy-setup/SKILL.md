---
name: deploy-setup
description: Configura CI/CD completo (GitHub Actions + Vercel + Netlify) para proyectos Vite/React o Vite/Vue. Genera todos los archivos necesarios, parchea vite.config.ts para GitHub Pages, verifica scripts de package.json y agrega .gitignore entries críticos. Zero-bug — incorpora todos los aprendizajes de collab-roi-explorer-mvp.
argument-hint: "[--branch=main|testing] [--node=22] [--repo=nombre-repo] [--framework=react|vue]"
---

# Skill: deploy-setup [CI/CD COMPLETO]

Configura CI/CD + deploy en **3 plataformas** (GitHub Pages, Vercel, Netlify) para cualquier proyecto Vite desde cero.

Incorpora todos los fixes aprendidos en `collab-roi-explorer-mvp` para que no fallen en tu proyecto.

---

## Cuándo ejecutar

- Al iniciar un proyecto nuevo antes del primer commit a main
- Al querer activar CI/CD en un proyecto existente sin pipelines
- Como Fase 6 del skill `asdd-orchestrate` cuando hay deploy configurado

---

## Proceso

```
1. Recopilar datos del proyecto (5 preguntas)
2. Leer archivos existentes (package.json, vite.config.ts, .gitignore)
3. Generar archivos de CI/CD
4. Parchear vite.config.ts para GitHub Pages
5. Parchear package.json con scripts faltantes
6. Parchear .gitignore con entradas críticas
7. Verificar coherencia y reportar
```

---

## Paso 1 — Recopilar datos del proyecto

Antes de generar ningún archivo, preguntar:

| # | Pregunta | Default | Ejemplo |
|---|----------|---------|---------|
| 1 | ¿Nombre exacto del repositorio en GitHub? | (ninguno) | `collab-roi-explorer` |
| 2 | ¿Rama de deploy a producción? | `main` | `testing`, `main` |
| 3 | ¿Ramas protegidas por CI (separar con coma)? | `main,develop` | `main,testing` |
| 4 | ¿Versión de Node.js del proyecto? | `22` | `20`, `22` |
| 5 | ¿El proyecto tiene Vitest? | `sí` | `sí` / `no` |

Si el usuario pasa argumentos (e.g. `--branch=testing --repo=my-app`), usarlos directamente sin preguntar.

---

## Paso 2 — Leer archivos existentes

### Leer `package.json`
Detectar qué scripts YA existen:
- `"lint"` → si existe, usar `npm run lint` en CI; si no, omitir paso lint
- `"typecheck"` → si existe, usar; si no, agregar `"typecheck": "tsc --noEmit"`
- `"build"` → debe existir; si no, error bloqueante
- `"test"` / `"test:unit"` → ignorar en CI; **siempre usar `npx vitest run`** si Vitest está instalado

### Leer `vite.config.ts`
Verificar si ya tiene la propiedad `base`. Si NO la tiene, hay que parcharla.

### Leer `.gitignore`
Verificar si ya tiene `*.tsbuildinfo`. Si no, agregar.

---

## Paso 3 — Generar `.github/workflows/ci.yml`

```yaml
name: CI — Quality Gate

on:
  pull_request:
    branches: [RAMA_1, RAMA_2]
  push:
    branches: [RAMA_1, RAMA_2]

env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

jobs:
  validate:
    name: Validate application
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: NODE_VERSION
          cache: npm

      - name: Install dependencies
        run: npm ci

      # Incluir SOLO si el script "lint" existe en package.json
      - name: Lint
        run: npm run lint

      - name: Typecheck
        run: npm run typecheck

      # Incluir SOLO si Vitest está instalado
      - name: Unit tests
        run: npx vitest run

      - name: Build production app
        run: npm run build
```

**Sustituciones obligatorias:**
- `RAMA_1, RAMA_2` → ramas protegidas del proyecto
- `NODE_VERSION` → versión de Node del proyecto

**Regla crítica:** `npx vitest run`, NO `npm run test`.
Razón: `vitest` sin `run` = watch mode; puede colgar en CI si `CI=true` no se detecta.

---

## Paso 4 — Generar `.github/workflows/deploy-github-pages.yml`

```yaml
name: Deploy — GitHub Pages

on:
  push:
    branches: [DEPLOY_BRANCH]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

jobs:
  build:
    name: Build static site
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: NODE_VERSION
          cache: npm

      - run: npm ci

      - name: Typecheck
        run: npm run typecheck

      # Incluir SOLO si Vitest está instalado
      - name: Tests
        run: npx vitest run

      - name: Build
        run: npm run build
        env:
          GITHUB_PAGES: 'true'

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Deploy to GitHub Pages
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

**Sustituciones:** `DEPLOY_BRANCH`, `NODE_VERSION`.

---

## Paso 5 — Generar `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "framework": "vite",
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Nota crítica:** `rewrites` en lugar de `redirects` para SPAs en Vercel.
Razón: `redirects` cambia la URL visible; `rewrites` sirve index.html sin cambiar la URL (necesario para React Router / Vue Router).

---

## Paso 6 — Generar `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "NODE_VERSION"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Nota:** En Netlify SÍ se usan `redirects` (no `rewrites`). El `status = 200` es lo que hace el "rewrite" silencioso.

---

## Paso 7 — Generar `.env.example`

```
# Copia este archivo como .env.local y rellena los valores
VITE_APP_NAME=NOMBRE_APP
VITE_APP_ENV=development
```

Nunca poner secrets reales en este archivo.

---

## Paso 8 — Parchear `vite.config.ts` (GitHub Pages)

Si `vite.config.ts` NO tiene `base`, agregar:

```typescript
// Antes de defineConfig({...}):
// DESPUÉS de los imports existentes

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/REPO_NAME/' : '/',
  // ... resto de la config existente
})
```

**IMPORTANTE:** 
- `REPO_NAME` = nombre exacto del repositorio en GitHub (sensible a mayúsculas)
- Si la config usa `plugins: [react()]` o `plugins: [vue()]`, NO tocarlos
- Solo agregar `base` al inicio del objeto de config
- Si ya existe `base`, NO sobrescribir

---

## Paso 9 — Parchear `package.json` con scripts faltantes

Agregar SOLO los scripts que no existen:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "quality": "npm run lint && npm run typecheck && npx vitest run && npm run build"
  }
}
```

**Regla:** `tsc --noEmit`, NO `tsc -b`.
Razón: `tsc -b` genera archivos `.tsbuildinfo` que se commitean accidentalmente y rompen el build en CI.

---

## Paso 10 — Parchear `.gitignore`

Verificar y agregar si faltan:

```
# TypeScript build cache — never commit
*.tsbuildinfo

# Environment secrets
.env.local
.env.*.local
```

---

## Paso 11 — Verificación final

Reportar al usuario:

```
✅ .github/workflows/ci.yml         — Quality gate en ramas: [X, Y]
✅ .github/workflows/deploy-*.yml   — Deploy automático en rama: [Z]
✅ vercel.json                       — SPA rewrites configurados
✅ netlify.toml                      — Redirects SPA + Node NODE_VERSION
✅ .env.example                      — Template de variables
✅ vite.config.ts                    — base: '/REPO_NAME/' para GitHub Pages
✅ package.json                      — Scripts agregados: [lista]
✅ .gitignore                        — *.tsbuildinfo agregado

⚙️  Acción manual requerida en GitHub:
   1. Settings → Pages → Source: GitHub Actions
   2. Esperar primer push a [DEPLOY_BRANCH] para ver URL

⚙️  Acción manual requerida en Vercel (opcional):
   1. vercel.com → Add New Project → Import Git Repository
   2. Vercel detecta Vite automáticamente con vercel.json

🚀 URL esperada GitHub Pages:
   https://[github-user].github.io/[REPO_NAME]/
```

---

## Anti-patrones que este skill evita

| Anti-patrón | Por qué falla | Fix aplicado |
|-------------|--------------|--------------|
| `npm run test` en CI | Puede ser watch mode | `npx vitest run` siempre |
| `tsc -b` en typecheck | Genera `.tsbuildinfo` commiteados | `tsc --noEmit` |
| Sin `base` en vite.config.ts | Assets 404 en GitHub Pages (rutas relativas rotas) | `base: process.env.GITHUB_PAGES ? '/repo/' : '/'` |
| `redirects` en Vercel SPA | Cambia URL visible en el browser | `rewrites` en Vercel |
| Sin `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` | Warnings/errors en Actions con Node 22 | env global en workflow |
| `npm install` en CI | Puede ignorar lockfile | `npm ci` siempre |
| Sin `concurrency` en deploy | Deploys paralelos corruptos | `group: pages, cancel-in-progress: true` |
| Sin `.tsbuildinfo` en .gitignore | Build cache commiteada, errores en CI | Agregado automáticamente |

---

## Dependencias de este skill

- El proyecto debe tener `package.json` con `"build"` script
- `vite.config.ts` debe existir (Vite project)
- El repositorio debe estar en GitHub para GitHub Pages
- Para Vercel/Netlify: solo se crea el config; la conexión al repo es manual

---

## Output esperado

Archivos generados/modificados (máximo 8):
```
.github/workflows/ci.yml               [NUEVO]
.github/workflows/deploy-github-pages.yml  [NUEVO]
vercel.json                            [NUEVO o existente sin cambios si ya era correcto]
netlify.toml                           [NUEVO]
.env.example                           [NUEVO]
vite.config.ts                         [PARCHEADO — solo si faltaba base]
package.json                           [PARCHEADO — solo scripts faltantes]
.gitignore                             [PARCHEADO — solo entradas faltantes]
```
