---
description: 'Flujo completo del ecosistema multi-agente. Ejecuta Spec Agent, presenta el menú de selección de agentes y coordina Backend, Frontend y QA según la selección.'
mode: 'agent'
---

Inicia el flujo completo del ecosistema multi-agente.

**Ejecuta el @orchestrator-agent con las siguientes instrucciones:**

1. Ejecutar el Spec Agent como primer paso obligatorio
2. Analizar los requerimientos del proyecto actual en el codebase
3. Generar la especificación completa en `docs/specs/specification.md`
4. Presentar el menú de selección de agentes al usuario
5. Coordinar la ejecución según la opción seleccionada (A/B/C)
6. Generar el reporte final consolidado

**Contexto del proyecto:** El proyecto se encuentra en el workspace actual.
Analiza todos los archivos existentes para entender el estado actual
antes de generar la especificación.
