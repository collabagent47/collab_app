---
description: 'Skill independiente: Genera o actualiza el README del proyecto o de un módulo específico.'
agent: 'agent'
---

Activa únicamente el skill `readme-doc-writer` del Automation Agent.

Lee el skill en `.github/skills/skill_automation_readme-doc-writer.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: descripción del proyecto/módulo, stack técnico, instrucciones de instalación conocidas o código fuente relevante]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md` para respetar estándares de documentación
2. Generar README con las secciones estándar:
   - Descripción del proyecto/módulo
   - Requisitos previos
   - Instalación y configuración
   - Uso / Comandos disponibles
   - Estructura del proyecto
   - Variables de entorno
   - Cómo contribuir (si aplica)
3. Usar lenguaje claro, conciso y en el idioma configurado en `config.yaml`

**Output esperado:** Archivo `README.md` completo y actualizado
