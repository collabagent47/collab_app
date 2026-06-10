/**
 * Tests E2E Multi-viewport — Collab ROI Explorer MVP
 *
 * Valida que las rutas principales renderizan correctamente en los 3 breakpoints
 * estándar del proyecto: mobile (390px), tablet (768px) y desktop (1280px).
 * Requiere que el servidor de desarrollo esté corriendo (npm run dev).
 *
 * Para ejecutar: npx playwright test src/tests/e2e/viewport.spec.ts
 */

import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
]

for (const viewport of VIEWPORTS) {
  test.describe(`viewport ${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    test(`dashboard carga y muestra botón de acción en ${viewport.name}`, async ({ page }) => {
      // GIVEN: viewport configurado al tamaño del dispositivo
      // WHEN: se navega al dashboard
      await page.goto('/')

      // THEN: el nombre de la app y el CTA principal son visibles
      await expect(page.getByText(/collab roi explorer/i)).toBeVisible()
      await expect(page.getByText(/nueva exploración/i)).toBeVisible()
    })

    test(`navegación principal visible en ${viewport.name}`, async ({ page }) => {
      // GIVEN: viewport del dispositivo
      // WHEN: se carga el dashboard
      await page.goto('/')

      // THEN: los enlaces de academia y base de conocimiento son accesibles
      await expect(page.getByText(/academia/i)).toBeVisible()
      await expect(page.getByText(/base de conocimiento/i)).toBeVisible()
    })

    test(`layout no desborda el viewport en ${viewport.name}`, async ({ page }) => {
      // GIVEN: viewport configurado
      // WHEN: se carga el dashboard
      await page.goto('/')

      // THEN: el body no tiene scroll horizontal (no hay overflow-x)
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
      const clientWidth = await page.evaluate(() => document.body.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })
  })
}
