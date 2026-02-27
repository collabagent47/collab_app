---
description: 'Skill independiente: Define la estrategia base de pruebas para una funcionalidad o módulo específico.'
agent: 'agent'
---

Activa únicamente el skill `test-strategy-planner` del QA Agent.

Lee el skill en `.github/skills/skill_qa_test-strategy-planner.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción de la funcionalidad, HU o módulo a analizar]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Definir la estrategia de pruebas: tipos, niveles, coberturas mínimas
3. Indicar enfoque por capa: unitarios, integración, E2E
4. Priorizar según riesgo y criticidad del negocio

**Output esperado:** Documento `test-strategy.md` con la estrategia completa
