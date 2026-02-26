---
description: 'Ejecuta el Automation Agent para generar pipeline CI/CD, README y release notes del proyecto.'
mode: 'agent'
---

Ejecuta el Automation Agent para las tareas de automatización DevOps.

**Instrucciones para @automation-agent:**

1. Cargar `.github/guidelines/automation/automation-guidelines.md` como primer paso
   (Si no existe, usar estándares de la industria)
2. Detectar el stack tecnológico del proyecto
3. Analizar el estado actual del pipeline (si existe)
4. Detectar deuda técnica de automatización
5. Activar skills según el estado del proyecto:
   - `pipeline-config-generator` → si no hay pipeline o está incompleto
   - `readme-doc-writer` → si README está desactualizado o no existe
   - `release-notes-generator` → si se está preparando un release

**Solicitud específica:** [Describe aquí qué quieres automatizar o documentar]

Ejemplos de uso:
- "Genera el pipeline de CI/CD para este proyecto"
- "Actualiza el README con la documentación actual"
- "Genera las release notes para la versión 1.2.0"
