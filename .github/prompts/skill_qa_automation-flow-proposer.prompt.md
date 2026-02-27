---
description: 'Skill independiente: Propone los flujos candidatos para automatización de pruebas con criterios de viabilidad.'
agent: 'agent'
---

Activa únicamente el skill `automation-flow-proposer` del QA Agent.

Lee el skill en `.github/skills/skill_qa_automation-flow-proposer.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: lista de flujos, casos de prueba o mapa de flujos críticos]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Evaluar cada flujo según criterios: frecuencia, estabilidad, costo manual, ROI
3. Clasificar: Automatizar AHORA / A FUTURO / NO automatizar
4. Proponer herramienta y nivel de automatización por flujo
5. Estimar esfuerzo de implementación

**Output esperado:** Roadmap `automation-roadmap.md` con flujos priorizados y justificación
