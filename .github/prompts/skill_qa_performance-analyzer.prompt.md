---
description: 'Skill independiente: Analiza requerimientos de performance y define SLAs, métricas y plan de pruebas de carga.'
agent: 'agent'
---

Activa únicamente el skill `performance-analyzer` del QA Agent.

Lee el skill en `.github/skills/skill_qa_performance-analyzer.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción del endpoint, flujo o módulo a analizar con contexto de carga esperada]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/qa-guidelines.md`
2. Identificar requerimientos de performance (explícitos e implícitos)
3. Definir SLAs: tiempo de respuesta, throughput, concurrencia máxima
4. Proponer escenarios de prueba: carga, estrés, volumen, spike
5. Indicar herramientas recomendadas (k6, JMeter, Locust)

**Output esperado:** Plan `performance-plan.md` con SLAs, escenarios y configuración de herramienta
