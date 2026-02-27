---
description: 'Skill independiente: Mapea los flujos críticos del sistema para priorizar cobertura de pruebas.'
agent: 'agent'
---

Activa únicamente el skill `critical-flow-mapper` del QA Agent.

Lee el skill en `.github/skills/skill_qa_critical-flow-mapper.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción del módulo, flujos de usuario o diagrama de proceso]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Identificar todos los flujos del sistema (happy paths y alternos)
3. Clasificar cada flujo por criticidad: Alta / Media / Baja
4. Indicar qué flujos deben cubrirse con pruebas automatizadas
5. Mapear dependencias entre flujos

**Output esperado:** Documento `critical-flows.md` con mapa de flujos priorizados
