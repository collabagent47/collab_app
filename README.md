# Collab ROI Explorer

Plataforma web para que el equipo Collab prepare sesiones comerciales, explore clientes, detecte fricciones y estime ROI de forma pedagógica usando la metodología EVIAR.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS v4 |
| Estado | Zustand |
| Formularios | React Hook Form + Zod |
| Animaciones | Framer Motion |
| Gráficas | Recharts |
| Iconos | Lucide React |
| Tests unitarios | Vitest + React Testing Library |
| Tests E2E | Playwright |
| Persistencia MVP | localStorage |

---

## Instalación

```bash
# Requiere Node.js >= 18
npm ci
```

## Ejecución local

```bash
npm run dev
# http://localhost:5173
```

---

## Scripts disponibles

```bash
npm run dev           # Servidor de desarrollo
npm run build         # Build de producción (dist/)
npm run preview       # Preview del build de producción
npm run lint          # ESLint (flat config v9)
npm run typecheck     # TypeScript sin emitir archivos
npm run test          # Tests unitarios (Vitest)
npm run test:watch    # Tests en modo watch
npm run test:coverage # Tests con reporte de cobertura
npm run test:e2e      # Tests E2E con Playwright
npm run quality       # lint + typecheck + test + build (gate completo)
```

---

## Tests

### Unitarios y regresión

```bash
npm run test
```

**Prueba de regresión obligatoria DoD-027** — caso Fertilizantes Mix escenario medio:

| Indicador | Valor esperado |
|-----------|---------------|
| Ahorro operativo | $324.000 |
| Beneficio comercial | $567.000 |
| Beneficio total | $891.000 |
| ROI financiero | ~27,28% |
| Multiplicador | ~1,27x |
| Payback | ~0,78 meses |

### E2E

```bash
npx playwright install   # una vez
npm run test:e2e
```

---

## Deploy en Vercel (opción principal)

Vercel detecta automáticamente Vite. La configuración ya está en `vercel.json`.

### Pasos

1. **Subir repositorio a GitHub**

```bash
git init
git add .
git commit -m "feat: Collab ROI Explorer MVP"
git branch -M main
git remote add origin https://github.com/<usuario>/collab-roi-explorer.git
git push -u origin main
```

2. **Importar en Vercel**
   - Ir a [vercel.com](https://vercel.com) → **Add New Project**
   - Seleccionar el repositorio `collab-roi-explorer`
   - Vercel detecta Vite automáticamente

3. **Verificar configuración** (Vercel la lee de `vercel.json`, pero confirmar):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

4. **Deploy** → clic en **Deploy**

5. **Validar URL pública**
   - Abrir la URL generada (ej. `https://collab-roi-explorer.vercel.app`)
   - Navegar el flujo completo: Dashboard → Nueva exploración → Agroinsumos → EVIAR → Fricciones → ROI → Resumen ejecutivo → Modo presentación
   - Verificar que no hay pantalla blanca ni errores en consola

6. **Deploys automáticos**
   - Cada push a `main` despliega automáticamente en producción
   - Cada PR genera un preview deployment con URL propia

---

## Alternativa — GitHub Pages

Solo usar si no se quiere conectar un servicio externo.

1. Ir a **Settings → Pages → Source: GitHub Actions**
2. Hacer push a `main`
3. El workflow `.github/workflows/deploy-github-pages.yml` despliega automáticamente

> **Nota:** GitHub Pages requiere configurar la variable `GITHUB_PAGES=true` para que el `base` en `vite.config.ts` use `/collab-roi-explorer/`. Vercel NO necesita esto.

---

## Variables de entorno

Crear `.env.local` basado en `.env.example`:

```env
VITE_APP_NAME=Collab ROI Explorer
VITE_APP_ENV=production
```

En Vercel: **Project Settings → Environment Variables** → agregar las variables.

---

## CI/CD

El quality gate corre automáticamente en cada push y pull request a `main` y `develop`:

```
lint → typecheck → test (101 tests, incluye regresión DoD-027) → build
```

Un fallo en cualquier paso **bloquea el merge**.

---

## Arquitectura

```
src/
  domain/
    roi/                ← Motor ROI puro (sin dependencias de UI)
    methodology/        ← Metodología EVIAR
    knowledge-base/     ← Tipos de base de conocimiento
  data/
    templates/          ← Plantillas por sector (Agroinsumos, etc.)
    comercial/          ← Documentos reales de clientes (insumos históricos)
  lib/
    presentation.ts     ← DTO mapper seguro para modo presentación
    storage.ts          ← localStorage con schema versioning
  services/             ← CRUD localStorage (interfaz migrable a API)
  stores/               ← Zustand stores (explorations, app, knowledge)
  hooks/                ← Lógica de UI (wraps de stores + services)
  components/
    shared/             ← QualityWarning, LearnerHint, DataBadge, ProgressRing
    exploration/        ← ExplorationCard, FrictionCard, ROIScenarioCard
    workspace/          ← ClientStoryBlock, ROIInputPanel, InsumosList
    layout/             ← AppShell, Sidebar, Topbar
  pages/                ← DashboardPage, ExplorationWorkspacePage, AcademyPage, etc.
  tests/
    unit/               ← Motor ROI (27 tests), validaciones (9), componentes (18), etc.
    integration/        ← Flujos + seguridad modo presentación
    e2e/                ← Playwright smoke tests
```

---

## GAPS / Pendientes

| Gap | Estado |
|-----|--------|
| Backend real (FastAPI + MongoDB) | Post-MVP |
| Autenticación y roles | Post-MVP |
| Exportación PDF | TODO documentado en componentes |
| Modo oscuro | Post-MVP |
| Templates adicionales (Restaurante, Inmobiliaria, Viajes) | Post-MVP — fuentes en `src/data/comercial/` |
| Tests E2E completos (solo smoke por ahora) | Post-MVP |
| Code splitting (bundle actual ~280KB gzipped) | Recomendado antes de escalar |
| ESLint reglas más estrictas (react/recommended) | Backlog |

---

## Troubleshooting

| Problema | Solución |
|---------|---------|
| `npm ci` falla | Verificar Node.js >= 18: `node --version` |
| Pantalla blanca en Vercel | Verificar que `vercel.json` tiene el rewrite `/* → /index.html` |
| Pantalla blanca en GitHub Pages | Verificar `GITHUB_PAGES=true` en el workflow de deploy |
| Rutas SPA no funcionan | El `vercel.json` y `netlify.toml` ya incluyen los rewrites correctos |
| Tests fallan | Requiere Node.js >= 18 |
| `Playwright` no encuentra navegadores | Ejecutar `npx playwright install` |
| ESLint falla en CI | Verificar que `eslint.config.js` existe y tiene flat config v9 |
