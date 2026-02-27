---
description: 'Skill independiente: Genera o actualiza la configuración de pipeline CI/CD del proyecto.'
agent: 'agent'
---

Activa únicamente el skill `pipeline-config-generator` del Automation Agent.

Lee el skill en `.github/skills/skill_automation_pipeline-config-generator.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: stack del proyecto, plataforma CI/CD objetivo (GitHub Actions / GitLab CI / Jenkins) y ambientes de deploy (dev/stg/prod)]**

**Instrucciones:**
1. Generar pipeline con los stages mínimos obligatorios:
   - validate → lint, format, type-check
   - test → unit + integration + coverage threshold
   - security → dependency scan + SAST
   - build → artefacto reproducible y versionado
   - deploy-dev → automático en rama principal
   - deploy-stg → con aprobación manual
   - deploy-prod → con aprobación manual + pipeline verde
2. Incluir manejo de secretos (variables de entorno, no hardcoded)
3. Configurar caché de dependencias para optimizar tiempos

**Output esperado:** Archivo de configuración del pipeline completo y listo para usar
