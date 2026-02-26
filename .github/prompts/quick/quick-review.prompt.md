---
description: 'Quick: Revisión rápida de código limpio en el archivo o módulo indicado.'
mode: 'agent'
---

Realiza una revisión de código limpio en el archivo o módulo indicado.

**[INDICAR AQUÍ EL ARCHIVO O MÓDULO A REVISAR]**
Ejemplo: `src/services/user.service.ts` o `src/components/UserForm/`

**Instrucciones para @backend-agent o @frontend-agent (modo rápido):**

1. Cargar los lineamientos de dev-guidelines.md
2. Revisar solo el archivo/módulo indicado
3. Activar la skill `clean-code-reviewer` (o `component-reviewer` si es frontend)
4. Reportar violaciones encontradas con ubicación exacta
5. Aplicar los refactorings necesarios
6. Verificar que los tests siguen pasando

**Scope:** Solo el archivo/módulo indicado, no el proyecto completo.
