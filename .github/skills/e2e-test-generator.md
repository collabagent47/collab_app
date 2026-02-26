---
name: 'E2E Test Generator'
description: 'Genera pruebas End-to-End con Playwright o Cypress aplicando los lineamientos del proyecto'
---

## ⚠️ Prerrequisito

El agente debe haber cargado `.github/guidelines/guidelines.md` antes de ejecutar esta skill.
Aplica los estándares de **Sección 2 - Estándares de Testing**.

---

## Instrucciones de Ejecución

### Paso 1 - Detectar Framework E2E

Lee el proyecto con `codebase` e identifica qué usar:

| Condición | Herramienta |
|-----------|-------------|
| Existe configuración de Cypress | Usa Cypress |
| Proyecto React / Vue / Angular sin E2E | Usa Playwright |
| Proyecto con múltiples navegadores requeridos | Usa Playwright |
| Mobile web testing requerido | Usa Playwright |

### Paso 2 - Mapear Flujos Críticos

Identifica los flujos críticos del usuario que DEBEN tener cobertura E2E.
Prioridad de cobertura (en orden):

1. **Autenticación** → login, logout, registro, recuperación de contraseña
2. **Operaciones CRUD** → crear, ver, editar, eliminar del recurso principal
3. **Flujos de negocio críticos** → checkout, pago, aprobaciones, transacciones
4. **Navegación principal** → acceso a secciones principales del sistema

### Paso 3 - Estructura de Tests E2E

Nombra los tests siguiendo los lineamientos (given/when/then):
`given_[estado]_when_[acción]_then_[resultado]`

Cada test debe seguir el patrón AAA del lineamiento Sección 2:

```typescript
// Ejemplo Playwright - Login flow
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {

  test('given_validCredentials_when_login_then_redirectToDashboard', async ({ page }) => {
    // Arrange
    await page.goto('/login');

    // Act
    await page.getByTestId('email-input').fill('user@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('welcome-message')).toBeVisible();
  });

  test('given_invalidCredentials_when_login_then_showErrorMessage', async ({ page }) => {
    // Arrange
    await page.goto('/login');

    // Act
    await page.getByTestId('email-input').fill('wrong@example.com');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
```

### Paso 4 - Selectores Robustos (según best practices)

Usa selectores en este orden de preferencia:

| Prioridad | Selector | Ejemplo |
|-----------|----------|---------|
| 1️⃣ PREFERIDO | data-testid | `getByTestId('login-button')` |
| 2️⃣ | aria-label / role | `getByRole('button', { name: 'Login' })` |
| 3️⃣ | texto visible estable | `getByText('Iniciar Sesión')` |
| ❌ PROHIBIDO | clases CSS | `.btn-primary` |
| ❌ PROHIBIDO | posición en DOM | `nth-child(3)` |
| ❌ PROHIBIDO | XPath | `//div[@class='...']` |

### Paso 5 - Page Objects

Para elementos reutilizables, crea Page Objects:

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.getByTestId('email-input').fill(email);
    await this.page.getByTestId('password-input').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  async getErrorMessage() {
    return this.page.getByTestId('error-message').textContent();
  }
}
```

### Paso 6 - Configuración base

Si no existe configuración E2E, genera el archivo de configuración:

**Playwright (playwright.config.ts):**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
});
```

---

## Output Esperado

```
🔴 SKILL e2e-test-generator COMPLETADA
────────────────────────────────────────
Framework E2E usado:         [Playwright / Cypress]
Flujos críticos mapeados:    X
Tests E2E generados:         X
Page Objects creados:        X
Configuración generada:      [Sí / Ya existía]
Archivos creados:            [lista]
Lineamientos aplicados:      Sección 2 - Estándares de Testing ✅
```
