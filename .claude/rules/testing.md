---
description: Principios de testing. Aplica a cualquier framework. Framework: pytest (backend) + Vitest (frontend).
paths:
  - "**/tests/**"
  - "**/__tests__/**"
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/test_*.py"
---

# Reglas de Testing

## Referencia de Stack
Lee `.claude/rules/backend.md` para:
- Framework de testing del proyecto (pytest, Jest, Vitest, JUnit, etc.)
- Herramientas de mock y fixtures
- Comandos para ejecutar tests

## Principios Universales (independiente del framework)

### Estructura AAA obligatoria
```
// GIVEN — preparar datos y contexto
// WHEN  — ejecutar la acción bajo prueba
// THEN  — verificar el resultado esperado
```

### Pirámide de Testing
| Nivel | % recomendado | Qué cubre |
|-------|--------------|-----------|
| **Unitarios** | ~70% | Lógica de negocio aislada con mocks |
| **Integración** | ~20% | Flujos entre capas, endpoints HTTP |
| **E2E** | ~10% | Flujos críticos de usuario |

### Reglas de Oro del Testing
- **Independencia** — cada test se puede ejecutar solo, en cualquier orden
- **Aislamiento** — mockear SIEMPRE dependencias externas (DB, APIs, auth, tiempo)
- **Determinismo** — sin `sleep()`, sin dependencia de fechas reales, sin datos de producción
- **Cobertura mínima ≥ 80%** en lógica de negocio (quality gate bloqueante en CI)
- **Nombres descriptivos** — `test_<función>_<escenario>_<resultado_esperado>`
- **Un assert lógico por test** — si necesitas varios, separar en tests distintos

### Por cada unidad cubrir
- ✅ Happy path — datos válidos, flujo exitoso
- ❌ Error path — excepción esperada, respuesta de error
- 🔲 Edge case — vacío, duplicado, límites, permisos

## Configuración de Vitest (React + TypeScript)

### Separar siempre vite.config.ts de vitest.config.ts

```typescript
// vitest.config.ts — SEPARADO de vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    include: ['src/tests/**/*.test.{ts,tsx}'],
  },
})
```

Razón: usar `defineConfig` de `vitest/config` en el mismo archivo que usa `defineConfig` de `vite`
genera un conflicto de tipos de Plugin que rompe `tsc -b`. (Aprendizaje: collab-roi-explorer-mvp)

### Usar `npx vitest run` en CI, no `npm run test`

```yaml
# ci.yml — correcto
- run: npx vitest run

# Incorrecto — puede ser watch mode si CI=true no se detecta
- run: npm run test   # solo si el script dice "vitest run" explícitamente
```

Razón: `vitest` sin argumentos = watch mode. En CI puede colgar si hay problemas de detección.

### Peer dependencies obligatorias de testing

```json
"devDependencies": {
  "@testing-library/dom": "^10.0.0",    // peer dep de @testing-library/react
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.5.0",
  "@types/node": "^24.0.0"              // para process.env en vite.config.ts y playwright.config.ts
}
```

Razón: `@testing-library/dom` es peer dep de react pero no se instala automáticamente.
`@types/node` es necesario para cualquier uso de `process.env` en configs.
(Aprendizaje: collab-roi-explorer-mvp — ambos causaron fallos en CI)

### screen vs window.screen — importar explícitamente

```typescript
// CORRECTO — importar screen desde testing-library
import { render, screen } from '@testing-library/react'

// INCORRECTO — con Vitest globals: true, 'screen' resuelve a window.screen (DOM API)
// No usar screen como global cuando globals: true está activo
```

### Excluir tests de tsconfig.app.json

```json
// tsconfig.app.json
{
  "include": ["src"],
  "exclude": ["src/tests"]
}
```

Razón: los tests usan tipos de vitest/testing-library que no deben contaminar la compilación
de producción. `tsc -b` fallará si los tests tienen imports de vitest globals en tsconfig de producción.

## Anti-patrones Prohibidos
- Tests que dependen del orden de ejecución
- Llamadas reales a servicios externos (DB, APIs, auth)
- `console.log` / `print` permanentes en tests
- Lógica condicional dentro de un test (if/else)
- Datos de producción real en fixtures

## Estrategia de Regresión
- **Smoke suite** (`@smoke`): happy paths críticos → corre en cada PR
- **Regresión completa** (`@regression`): todo → corre nightly o pre-release
- Un test con `@critico` entra automáticamente al smoke suite
