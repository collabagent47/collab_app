---
description: 'Skill independiente: Genera casos de prueba en formato Gherkin a partir de criterios de aceptación o una funcionalidad descrita.'
agent: 'agent'
---

Activa únicamente el skill `gherkin-case-generator` del QA Agent.

Lee el skill en `.github/skills/skill_qa_gherkin-case-generator.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: criterios de aceptación, Historia de Usuario o descripción de la funcionalidad]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md` para respetar estándares
2. Transformar los criterios de aceptación en escenarios Gherkin
3. Cubrir: happy path, error paths y edge cases relevantes
4. Usar lenguaje de negocio (sin tecnicismos de implementación)
5. Generar el archivo `.feature` completo listo para usar

**Output esperado:** Archivo Gherkin con nombre `[dominio]-[funcionalidad].feature`
