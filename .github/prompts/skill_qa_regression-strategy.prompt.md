---
description: 'Skill independiente: Define la estrategia de pruebas de regresión para un módulo o release.'
agent: 'agent'
---

Activa únicamente el skill `regression-strategy` del QA Agent.

Lee el skill en `.github/skills/skill_qa_regression-strategy.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción del módulo, cambios realizados o alcance del release]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Identificar áreas de impacto de los cambios
3. Definir qué casos existentes deben re-ejecutarse
4. Determinar prioridad de regresión: crítica, alta, normal
5. Proponer frecuencia y trigger de ejecución (por PR, por deploy, programado)

**Output esperado:** Plan `regression-plan.md` con suite de regresión priorizada
