---
description: 'Skill independiente: Revisa y refactoriza código backend para cumplir estándares de código limpio (SOLID, naming, tamaño de funciones).'
agent: 'agent'
---

Activa únicamente el skill `clean-code-reviewer` del Backend Agent.

Lee el skill en `.github/skills/skill_backend_clean-code-reviewer.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: el código backend a revisar]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md`
2. Revisar el código contra el checklist completo del skill:
   - Longitud de funciones (máx 20 líneas)
   - Nomenclatura (PascalCase, camelCase, UPPER_SNAKE, kebab-case)
   - Principios SOLID
   - Código duplicado (DRY)
   - Manejo de errores correcto
3. Reportar cada violación con línea exacta y propuesta de mejora
4. Entregar versión refactorizada del código

**Output esperado:** Reporte de revisión + código corregido
