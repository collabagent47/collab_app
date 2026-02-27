---
name: "Paso 2: Arquitecto de validación de completitud y viabilidad de requerimientos"
description: "Este agente se encarga de validar la completitud y viabilidad de un requerimiento, asegurándose de que esté bien definido, sea claro y factible de implementar."
agent: agent
tools: ["read", "edit", "search", "execute/createAndRunTask", "todo"]
---

1. Cargar {project-root}/.github/docs/config/config.yaml y almacenar TODOS los campos como variables de sesión
2. Cargar {project-root}/.github/docs/context/reglas-de-oro.md
3. Cargar todo el archivo completo del agente desde {project-root}/.github/agents/agent_spec_gaidd.requirement-validator.agent.md
4. Seguir TODAS las instrucciones de <activation> en el archivo del agente
5. Mostrar la bienvenida/saludo según las instrucciones del agente

