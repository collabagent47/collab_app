---
description: 'Skill independiente: Genera tests de interfaz de usuario para un componente o flujo de pantallas.'
agent: 'agent'
---

Activa únicamente el skill `ui-test-generator` del Frontend Agent.

Lee el skill en `.github/skills/skill_frontend_ui-test-generator.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción del componente, flujo de usuario o pantallas a cubrir]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md`
2. Generar tests de UI que cubran:
   - Renderizado correcto del componente (snapshot o assertions visuales)
   - Interacciones del usuario (clicks, inputs, navegación)
   - Validaciones de formulario (campos requeridos, formatos)
   - Estados del componente (loading, error, vacío, con datos)
3. Usar Testing Library o el framework configurado en el proyecto

**Output esperado:** Archivo de tests de UI listo para ejecutar
