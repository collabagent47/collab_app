---
description: 'Ejecuta el Backend Agent directamente con el contexto del SPEC existente.'
agent: 'agent'
---

Ejecuta el Backend Agent usando el SPEC disponible en `docs/specs/specification.md`.

**Instrucciones para @backend-agent:**

1. Cargar `.github/docs/lineamientos/dev-guidelines.md` como primer paso
2. Leer el contexto del SPEC desde `docs/specs/specification.md`
3. Ejecutar el flujo completo de implementación backend:
   - Lógica de negocio por HU asignadas al backend
   - Endpoints según contratos del SPEC
   - Capa de persistencia
   - Manejo de errores del dominio
   - Observabilidad
   - Validación y seguridad
4. Activar skills según se detecte la necesidad:
   - `clean-code-reviewer` para código generado
   - `integration-test-generator` para endpoints implementados
   - `contract-test-generator` si la arquitectura lo requiere
5. Preparar PR con checklist completo

**Prerequisito:** Debe existir `docs/specs/specification.md`. Si no existe, ejecutar `/spec` primero.
