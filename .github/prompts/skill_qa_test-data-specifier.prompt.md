---
description: 'Skill independiente: Especifica los datos de prueba necesarios para validar una funcionalidad.'
agent: 'agent'
---

Activa únicamente el skill `test-data-specifier` del QA Agent.

Lee el skill en `.github/skills/skill_qa_test-data-specifier.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción de la funcionalidad, casos Gherkin o reglas de negocio a cubrir]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Identificar entidades y atributos que requieren datos de prueba
3. Especificar datos para: casos válidos, inválidos, límites y edge cases
4. Indicar restricciones (unicidad, formato, rangos)
5. No incluir datos productivos reales

**Output esperado:** Catálogo `test-data-catalog.md` con sets de datos listos para usar
