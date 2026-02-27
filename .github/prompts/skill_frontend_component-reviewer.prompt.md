---
description: 'Skill independiente: Revisa un componente de UI para verificar calidad, buenas prácticas y consistencia con el design system.'
agent: 'agent'
---

Activa únicamente el skill `component-reviewer` del Frontend Agent.

Lee el skill en `.github/skills/skill_frontend_component-reviewer.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: el código del componente a revisar]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md`
2. Revisar el componente contra los criterios del skill:
   - Responsabilidad única (no mezclar lógica + presentación)
   - Props correctamente tipadas
   - Manejo de estados y efectos
   - Reutilización y composabilidad
   - Consistencia con el design system
3. Reportar cada problema con propuesta de mejora
4. Entregar versión mejorada del componente

**Output esperado:** Reporte de revisión + componente corregido
