---
description: 'Ejecuta el Spec Agent directamente para generar o actualizar la especificación técnica del proyecto.'
mode: 'agent'
---

Ejecuta el Spec Agent para generar la especificación técnica completa del proyecto.

**Instrucciones para @spec-agent:**

1. Analizar los requerimientos del proyecto en el codebase y la solicitud del usuario
2. Ejecutar los 6 pasos en orden:
   - PASO 1: Análisis de requerimientos (preguntar ante ambigüedades)
   - PASO 2: Generación de Historias de Usuario
   - PASO 3: Criterios de Aceptación en Gherkin
   - PASO 4: Contratos de API
   - PASO 5: Arquitectura Propuesta
   - PASO 6: Documento final en `docs/specs/specification.md`
3. No omitir ningún paso
4. Preguntar ante cualquier ambigüedad antes de asumir

**Nota:** Este prompt ejecuta solo el Spec Agent. Para el flujo completo usa `/full-flow`.
