---
description: 'Skill independiente: Verifica accesibilidad (WCAG 2.1) de un componente o vista de usuario.'
agent: 'agent'
---

Activa únicamente el skill `accessibility-checker` del Frontend Agent.

Lee el skill en `.github/skills/skill_frontend_accessibility-checker.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: el código del componente o vista a verificar]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md`
2. Auditar contra estándares WCAG 2.1 nivel AA:
   - Roles ARIA correctos y semántica HTML
   - Contraste de color mínimo (4.5:1 texto normal, 3:1 texto grande)
   - Navegación por teclado (foco visible, orden lógico)
   - Textos alternativos en imágenes e iconos
   - Etiquetas en formularios
3. Clasificar cada hallazgo: Crítico / Importante / Recomendación
4. Proponer corrección concreta por cada hallazgo

**Output esperado:** Reporte de accesibilidad con severidad y correcciones aplicadas
