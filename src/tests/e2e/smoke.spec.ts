/**
 * Tests E2E Smoke — Collab ROI Explorer MVP
 *
 * Valida que las rutas principales de la aplicación renderizan correctamente.
 * Requiere que el servidor de desarrollo esté corriendo (npm run dev).
 *
 * Para ejecutar: npx playwright test src/tests/e2e/smoke.spec.ts
 */

import { test, expect } from '@playwright/test'

test('dashboard carga correctamente', async ({ page }) => {
  // GIVEN: la aplicación está corriendo en localhost
  // WHEN: se navega al dashboard
  await page.goto('/')

  // THEN: el nombre de la aplicación y el botón de nueva exploración son visibles
  await expect(page.getByText(/collab roi explorer/i)).toBeVisible()
  await expect(page.getByText(/nueva exploración/i)).toBeVisible()
})

test('academia ROI existe en navegación', async ({ page }) => {
  // GIVEN: la aplicación está corriendo
  // WHEN: se navega al dashboard
  await page.goto('/')

  // THEN: el enlace/botón de academia está visible en la navegación
  await expect(page.getByText(/academia/i)).toBeVisible()
})

test('base de conocimiento existe en navegación', async ({ page }) => {
  // GIVEN: la aplicación está corriendo
  // WHEN: se navega al dashboard
  await page.goto('/')

  // THEN: el enlace/botón de base de conocimiento está visible
  await expect(page.getByText(/base de conocimiento/i)).toBeVisible()
})
