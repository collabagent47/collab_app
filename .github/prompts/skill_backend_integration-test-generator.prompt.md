---
description: 'Skill independiente: Genera tests de integración para un endpoint o servicio backend específico.'
agent: 'agent'
---

Activa únicamente el skill `integration-test-generator` del Backend Agent.

Lee el skill en `.github/skills/skill_backend_integration-test-generator.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: definición del endpoint (método, ruta, payload, respuestas) o descripción del servicio]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md`
2. Generar tests de integración que cubran:
   - Happy path (respuesta 200/201 con datos válidos)
   - Errores de validación (400)
   - No encontrado (404)
   - No autorizado (401/403)
   - Edge cases relevantes del negocio
3. Incluir setup/teardown de datos de prueba
4. Los tests deben ser ejecutables sin mocks (integración real)

**Output esperado:** Archivo de tests de integración listo para ejecutar
