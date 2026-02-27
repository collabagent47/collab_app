---
description: 'Skill independiente: Identifica riesgos técnicos y funcionales de una funcionalidad o módulo.'
agent: 'agent'
---

Activa únicamente el skill `risk-identifier` del QA Agent.

Lee el skill en `.github/skills/skill_qa_risk-identifier.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción de la funcionalidad, HU o requerimiento a analizar]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Identificar riesgos técnicos (integración, datos, concurrencia, seguridad)
3. Identificar riesgos funcionales (flujos alternativos, reglas de negocio críticas)
4. Asignar probabilidad e impacto a cada riesgo
5. Proponer mitigaciones

**Output esperado:** Matriz de riesgos `risk-matrix.md` con probabilidad, impacto y mitigación
