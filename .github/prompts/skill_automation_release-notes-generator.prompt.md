---
description: 'Skill independiente: Genera las notas de release (changelog) para un conjunto de cambios o versión.'
agent: 'agent'
---

Activa únicamente el skill `release-notes-generator` del Automation Agent.

Lee el skill en `.github/skills/skill_automation_release-notes-generator.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: lista de commits, PRs mergeados, tickets resueltos o descripción de los cambios de la versión]**

**Instrucciones:**
1. Clasificar los cambios por tipo:
   - ✨ **Nuevas funcionalidades**
   - 🐛 **Corrección de errores**
   - ⚡ **Mejoras de performance**
   - 🔒 **Seguridad**
   - 💥 **Breaking changes** (destacar en rojo si los hay)
   - 🔧 **Cambios técnicos / Deuda técnica**
2. Usar lenguaje orientado al usuario final (no tecnicismos internos)
3. Incluir: versión, fecha, impacto y si aplica instrucciones de migración

**Output esperado:** Archivo `RELEASE-NOTES.md` o entrada de CHANGELOG lista para publicar
