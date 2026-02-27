---
description: 'Ejecuta el Frontend Agent directamente con el contexto del SPEC existente.'
agent: 'agent'
---

Ejecuta el Frontend Agent usando el SPEC disponible en `docs/specs/specification.md`.

**Instrucciones para @frontend-agent:**

1. Cargar `.github/docs/lineamientos/dev-guidelines.md` como primer paso
2. Leer el contexto del SPEC desde `docs/specs/specification.md`
3. Ejecutar el flujo completo de implementación frontend:
   - Componentes reutilizables según design system
   - Conexión con APIs usando contratos exactos del SPEC
   - Gestión de estados (loading, error, empty, success)
   - Navegación y rutas
   - Validaciones de formularios
   - Autenticación en el cliente
   - Observabilidad
4. Activar skills según se detecte la necesidad:
   - `component-reviewer` para componentes generados
   - `accessibility-checker` para todos los componentes de UI
   - `ui-test-generator` para flujos críticos de usuario
5. Preparar PR con checklist completo

**Prerequisito:** Debe existir `docs/specs/specification.md`. Si no existe, ejecutar `/spec` primero.
