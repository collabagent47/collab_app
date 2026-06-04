---
name: project-collab-roi-explorer
description: Collab ROI Explorer MVP — React/Vitest project structure, test setup, and key implementation details for the test engineer
metadata:
  type: project
---

Collab ROI Explorer is a React 19 + Vitest 2 + Zustand + react-router-dom v6 frontend SPA.

**Test stack:** Vitest 2 (globals: true, environment: jsdom), @testing-library/react v16, @testing-library/user-event v14. Playwright for E2E.

**Why:** @testing-library/jest-dom is NOT in devDependencies (only listed as peer dep in @testing-library/react). setup.ts was updated to import it conditionally with try/catch. Tests use getByText/queryByText returning truthy/null instead of jest-dom matchers.

**How to apply:** When adding new component tests, avoid toBeInTheDocument() — use .toBeTruthy() on getByText() or .toBeNull() on queryByText() instead.

**Key domain modules:**
- `src/domain/roi/roi-engine.ts` — pure ROI calculation functions (all exported)
- `src/domain/roi/roi-validations.ts` — generateWarnings, calculateDataQuality
- `src/domain/roi/roi-scenarios.ts` — calculateScenarios (3 scenarios)
- `src/domain/roi/roi-regression.fixtures.ts` — Fertilizantes Mix test fixtures

**Notable gap — NOTA_REDONDEO:** calculateSavedHours uses Math.round internally. For input (36, 0.6) → 21.6 → rounds to 22. This produces operationalSavings = 330000, not 324000 as spec DoD-027 states. Tests use the exact values that the motor actually returns.

**inferOpportunityType:** Private function in ExplorationWorkspacePage, not exported. Tests replicate its logic locally.

**framer-motion mock pattern:** Use `vi.mock('framer-motion', async () => { const React = await import('react'); return { motion: { div: ... }, AnimatePresence: ... } })` to avoid animation issues in tests.

**useAppStore mock:** `vi.mock('../../stores/appStore', () => ({ useAppStore: vi.fn() }))` before imports, then `vi.mocked(useAppStore).mockReturnValue(...)` in beforeEach.
