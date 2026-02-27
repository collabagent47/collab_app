---
description: 'Quick: Genera tests rápidamente para un endpoint o componente específico.'
mode: 'agent'
---

Genera tests para el siguiente endpoint o componente:

**[INDICAR AQUÍ EL ENDPOINT O COMPONENTE]**
Ejemplos:
- Endpoint: `POST /api/v1/users` (backend)
- Componente: `src/components/LoginForm/LoginForm.tsx` (frontend)

**Instrucciones (modo rápido):**

Para **endpoints de backend** → @backend-agent:
1. Cargar dev-guidelines.md
2. Activar `integration-test-generator` solo para el endpoint indicado
3. Generar: happy path + error paths + edge cases relevantes
4. Ejecutar los tests y reportar resultado

Para **componentes de frontend** → @frontend-agent:
1. Cargar dev-guidelines.md
2. Activar `ui-test-generator` solo para el componente indicado
3. Generar: flujo principal + validaciones de formulario si aplica
4. Verificar accesibilidad básica con `accessibility-checker`

**Scope:** Solo el endpoint o componente indicado.
