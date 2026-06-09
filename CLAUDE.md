# Collab ROI Explorer — Context for Claude

## Qué es este proyecto

App pedagógica de habilitación comercial interna de **Collab**. Permite que el equipo
comercial prepare conversaciones con clientes estimando el ROI de automatizar con IA.
**No garantiza ventas** — es una herramienta de estimación prudente y presentación.

## Stack

```
React 19 + TypeScript + Vite 6
Tailwind CSS v4  (clases canónicas: wrap-break-word, bg-linear-to-br — NO break-words)
Zustand 5        (persistencia localStorage)
React Hook Form + Zod
Recharts         (gráficos ROI)
Framer Motion    (transiciones)
React Router v6
Vitest 2 + Testing Library + Playwright
```

## Estructura clave

```
src/
  domain/
    roi/           ← motor de cálculo puro (sin side effects)
    methodology/   ← EVIAR (Exploración · Valor · Impacto · Acción · Resultado)
    auth/          ← permisos y roles
    knowledge-base/
  components/
    exploration/   ← ROIScenarioCard, ExplorationWorkspace
    layout/        ← AppShell (sidebar hidden lg:flex), MobileBottomNav
    auth/
  pages/
    ExplorationWorkspacePage/
    DashboardPage/
  tests/
    unit/          ← lógica de dominio (roi-engine, roi-validations, roi-scenarios)
    integration/   ← flujos entre componentes
    e2e/           ← smoke.spec.ts (Playwright)
  data/
    comercial/     ← documentos reales de clientes (fuente de templates)
    templates/     ← agroinsumos, practice-cases, academy-content
```

## Comandos esenciales

```bash
npm run dev           # servidor de desarrollo
npm run typecheck     # tsc --noEmit (NO usar tsc -b — genera .tsbuildinfo)
npx vitest run        # tests en CI (NO npm run test — puede ser watch mode)
npm run test:coverage # cobertura real
npm run lint          # eslint
npm run build         # build producción
npm run quality       # lint + typecheck + test + build
```

## Deploy

- **GitHub Pages**: push a rama `testing` → `.github/workflows/deploy-github-pages.yml`
- **Vercel**: `vercel.json` existe, pendiente conectar repo manualmente en vercel.com
- **Netlify**: `netlify.toml` existe

## Dominio — Motor ROI

El motor ROI vive en `src/domain/roi/`. Funciones puras, sin side effects.

**Caso de regresión canónico — Fertilizantes Mix (Popayán):**
```
monthlyConversations: 270, minutesPerConversation: 8
automationPercentage: 0.60, hourlyCost: 15000
currentCloseRate: 0.10, expectedCloseRate: 0.13
averageTicket: 350000, grossMargin: 0.20, monthlyInvestment: 700000

→ savedHours: 21.6 (sin redondeo)
→ operationalSavings: 324000 (Math.round aquí)
→ commercialBenefit: 567000
→ totalBenefit: 891000
→ financialROI: ~27.29%
```
Cualquier cambio al motor debe pasar este caso exacto.

## Metodología EVIAR

Flujo de exploración comercial en 5 pasos:
- **E** — Exploración (contexto del cliente)
- **V** — Valor (propuesta de valor)
- **I** — Impacto (cálculo ROI)
- **A** — Acción (próximos pasos)
- **R** — Resultado (seguimiento)

## Convenciones importantes

- `tsc --noEmit` para typecheck, nunca `tsc -b`
- `npx vitest run` en CI, nunca `npm run test`
- Tests con estructura AAA: GIVEN / WHEN / THEN
- Tailwind v4: usar `wrap-break-word` no `break-words`
- Flex containers con texto largo: hijo necesita `min-w-0`, badge necesita `shrink-0`
- Altura de workspace: `h-full min-h-0 overflow-hidden`, nunca `h-[calc(...)]`
- Sidebar: `hidden lg:flex` para ocultar en mobile

## Framework ASDD instalado

Skills disponibles: `/asdd-orchestrate`, `/generate-spec`, `/deploy-setup`,
`/unit-testing`, `/responsive-review`, `/feedback`, `/init-framework`,
`/owasp-scan`, `/implement-frontend`, `/implement-backend`,
`/gherkin-case-generator`, `/risk-identifier`, `/performance-analyzer`,
`/automation-flow-proposer`

Specs en `.github/specs/` — pipeline actual:
- SPEC-001 `conversiones` → DEPRECATED
- SPEC-002 `collab-roi-explorer-mvp` → IMPLEMENTED
- SPEC-003 `collab-roi-cicd` → IMPLEMENTED

## Corpus de datos

`src/data/comercial/` contiene documentos reales de clientes (docx, xlsx, pdf).
Son **insumos históricos** para templates — no se leen en runtime.
Sectores disponibles para nuevas templates: Restaurante (Don Hidalgo),
Inmobiliaria (JR + Escobar), Viajes (Project Travel).
